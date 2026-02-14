import pandas as pd
import joblib

# -----------------------------
# LOAD TRAINED MODEL
# -----------------------------
model = joblib.load("groundwater_model.pkl")

# -----------------------------
# LOAD DATA
# -----------------------------
df = pd.read_csv("dataset/groundwater_Nashik.csv")

df["date"] = pd.to_datetime(df["date"])
df = df.sort_values("date")

df["station_id"] = df["station_name"].astype("category").cat.codes

# lag features
df["lag1"] = df["currentlevel"].shift(1)
df["lag2"] = df["currentlevel"].shift(2)
df["lag3"] = df["currentlevel"].shift(3)

df = df.dropna()

last = df.iloc[-1]

year = last["date"].year
month = last["date"].month

latitude = last["latitude"]
longitude = last["longitude"]
station_id = last["station_id"]
level_diff = last["level_diff"]

lag1 = last["lag1"]
lag2 = last["lag2"]
lag3 = last["lag3"]

# normalization bounds
min_level = df["currentlevel"].min()
max_level = df["currentlevel"].max()

# -----------------------------
# RISK FUNCTION
# -----------------------------
def risk_label(v):
    if v < 30:
        return "Critical"
    elif v < 60:
        return "Warning"
    return "Safe"

future_predictions = []

# -----------------------------
# FORECAST NEXT 12 MONTHS
# -----------------------------
for i in range(12):

    month += 1
    if month > 12:
        month = 1
        year += 1

    input_data = pd.DataFrame([[
        year,
        month,
        latitude,
        longitude,
        level_diff,
        station_id,
        lag1,
        lag2,
        lag3
    ]], columns=[
        "year",
        "month",
        "latitude",
        "longitude",
        "level_diff",
        "station_id",
        "lag1",
        "lag2",
        "lag3"
    ])

    pred = model.predict(input_data)[0]

    # convert to health index
    health_index = (
        (pred - min_level) /
        (max_level - min_level)
    ) * 100

    future_predictions.append({
        "year": int(year),
        "month": int(month),
        "predicted_level": float(pred),
        "health_index": float(health_index),
        "risk": risk_label(health_index)
    })

    # update lag values
    lag3 = lag2
    lag2 = lag1
    lag1 = pred

# -----------------------------
# OUTPUT
# -----------------------------
print("\n📈 Next 12 Months Groundwater Forecast:\n")

for p in future_predictions:
    print(p)
