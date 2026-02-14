import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

def train_model(csv_path):

    df = pd.read_csv(csv_path)

    # Filter Nashik (or selected district)
    df = df[df["location"] == "Nashik"]

    X = df[["year"]]
    y = df["depth"]

    model = LinearRegression()
    model.fit(X, y)

    joblib.dump(model, "groundwater_model.pkl")

    return "Model trained successfully"
