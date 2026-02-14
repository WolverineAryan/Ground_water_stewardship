from fastapi import FastAPI, UploadFile, File
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

app = FastAPI()

model = None

@app.post("/train")
async def train_model(file: UploadFile = File(...)):

    global model

    df = pd.read_csv(file.file)

    X = df[["year"]]
    y = df["depth"]

    model = LinearRegression()
    model.fit(X, y)

    joblib.dump(model, "model.pkl")

    return {"message": "Model trained successfully"}
    

@app.get("/predict/{year}")
def predict(year: int):

    global model

    if model is None:
        model = joblib.load("model.pkl")

    prediction = model.predict([[year]])

    return {
        "year": year,
        "predicted_depth": float(prediction[0])
    }
