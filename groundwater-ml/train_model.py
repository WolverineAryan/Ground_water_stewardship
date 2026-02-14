import pandas as pd
import joblib

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error

# -----------------------------
# LOAD DATASET
# -----------------------------
df = pd.read_csv("dataset/groundwater_Nashik.csv")

# -----------------------------
# DATE PROCESSING
# -----------------------------
df["date"] = pd.to_datetime(df["date"])

df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month

# sort chronologically
df = df.sort_values("date")

# -----------------------------
# CLEAN DATA
# -----------------------------
df = df.dropna(subset=["currentlevel"])

# -----------------------------
# STATION ENCODING
# -----------------------------
df["station_id"] = df["station_name"].astype("category").cat.codes

# -----------------------------
# CREATE LAG FEATURES
# -----------------------------
df["lag1"] = df["currentlevel"].shift(1)
df["lag2"] = df["currentlevel"].shift(2)
df["lag3"] = df["currentlevel"].shift(3)

df = df.dropna()

# -----------------------------
# FEATURES & TARGET
# -----------------------------
X = df[[
    "year",
    "month",
    "latitude",
    "longitude",
    "level_diff",
    "station_id",
    "lag1",
    "lag2",
    "lag3"
]]

y = df["currentlevel"]

# -----------------------------
# TIME-BASED SPLIT
# -----------------------------
split_index = int(len(df) * 0.8)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]

y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]

# -----------------------------
# TRAIN MODEL (UPGRADED)
# -----------------------------
model = RandomForestRegressor(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

model.fit(X_train, y_train)

# -----------------------------
# EVALUATION
# -----------------------------
predictions = model.predict(X_test)

r2 = r2_score(y_test, predictions)
mae = mean_absolute_error(y_test, predictions)

print(f"\n✅ Model Accuracy (R² Score): {r2:.3f}")
print(f"✅ Mean Absolute Error: {mae:.2f} meters")

# -----------------------------
# SAVE MODEL
# -----------------------------
joblib.dump(model, "groundwater_model.pkl")

print("✅ Model saved successfully")
