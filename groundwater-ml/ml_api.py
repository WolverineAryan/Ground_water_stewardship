from fastapi import FastAPI
import pandas as pd
import joblib

app = FastAPI()

# -----------------------------
# LOAD MODEL ONCE
# -----------------------------
model = joblib.load("groundwater_model.pkl")

# -----------------------------
# FORECAST ENDPOINT
# -----------------------------
@app.get("/forecast")
def forecast():

    df = pd.read_csv("dataset/groundwater_Nashik.csv")

    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values("date")

    df["station_id"] = df["station_name"].astype("category").cat.codes

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

    min_level = df["currentlevel"].min()
    max_level = df["currentlevel"].max()

    def risk_label(v):
        if v < 30:
            return "Critical"
        elif v < 60:
            return "Warning"
        return "Safe"

    results = []

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

        health_index = (
            (pred - min_level) /
            (max_level - min_level)
        ) * 100

        results.append({
            "year": int(year),
            "month": int(month),
            "predicted_level": float(pred),
            "health_index": float(health_index),
            "risk": risk_label(health_index)
        })

        lag3 = lag2
        lag2 = lag1
        lag1 = pred

    return {"forecast": results}
