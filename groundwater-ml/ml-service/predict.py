from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()

model = joblib.load("groundwater_model.pkl")

@app.post("/predict")
def predict(year: int):

    prediction = model.predict(pd.DataFrame([[year]], columns=["year"]))

    return {
        "predicted_depth": float(prediction[0])
    }
