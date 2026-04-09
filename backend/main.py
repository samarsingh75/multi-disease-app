from fastapi import FastAPI
import joblib
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime


app = FastAPI()
client = MongoClient("mongodb://localhost:27017/")
db = client["multi_disease_db"]
predictions = db["predictions"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # 🔥 FIX
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# =========================
# BASE PATH (VERY IMPORTANT)
# =========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =========================
# LOAD MODELS
# =========================
models = {
    "diabetes": joblib.load(os.path.join(BASE_DIR, "models/diabetes_model.pkl")),
    "heart": joblib.load(os.path.join(BASE_DIR, "models/heart_model.pkl")),
    "kidney": joblib.load(os.path.join(BASE_DIR, "models/kidney_model.pkl")),
    "alzheimer": joblib.load(os.path.join(BASE_DIR, "models/alzheimer_model.pkl"))
}

# =========================
# LOAD SCALERS & IMPUTERS
# =========================
scalers = {
    "kidney": joblib.load(os.path.join(BASE_DIR, "models/kidney_scaler.pkl"))
}

imputers = {
    "kidney": joblib.load(os.path.join(BASE_DIR, "models/kidney_imputer.pkl"))
}

# =========================
# LOAD ACCURACY
# =========================
accuracies = {
    "diabetes": joblib.load(os.path.join(BASE_DIR, "models/diabetes_accuracy.pkl")),
    "heart": joblib.load(os.path.join(BASE_DIR, "models/heart_accuracy.pkl")),
    "kidney": joblib.load(os.path.join(BASE_DIR, "models/kidney_accuracy.pkl")),
    "alzheimer": joblib.load(os.path.join(BASE_DIR, "models/alzheimer_accuracy.pkl"))
}

# =========================
# COLUMN MAP
# =========================
columns_map = {
    "diabetes": [
        "Pregnancies","Glucose","BloodPressure","SkinThickness",
        "Insulin","BMI","DiabetesPedigreeFunction","Age"
    ],
    
    "heart": [
        "age","sex","cp","trestbps","chol",
        "thalch","exang","oldpeak"
    ],

    "kidney": [
        "age","bp","sg","al","su","rbc","pc","pcc","ba"
    ],

    "alzheimer": [
        "Gender","mmse","ageAtEntry","cdr","memory"
    ]
}

# =========================
# ROOT
# =========================
@app.get("/")
def home():
    return {"message": "Multi Disease API Running"}

# =========================
# MODEL INFO
# =========================
@app.get("/model-info/{disease}")
def model_info(disease: str):
    if disease not in models:
        return {"error": "Invalid disease"}

    return {
        "disease": disease,
        "accuracy": round(float(accuracies[disease]) * 100, 2)
    }

# =========================
# PREDICT
# =========================
@app.post("/predict/{disease}")
def predict(disease: str, data: dict):

    if disease not in models:
        return {"error": "Invalid disease"}

    columns = columns_map[disease]
    input_df = pd.DataFrame([list(data.values())], columns=columns)

    model = models[disease]

    if disease in ["diabetes", "heart", "alzheimer"]:
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]

    elif disease == "kidney":
        scaler = scalers["kidney"]
        imputer = imputers["kidney"]

        input_imputed = imputer.transform(input_df)
        input_scaled = scaler.transform(input_imputed)

        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][1]

    # ✅ MOVE THIS INSIDE FUNCTION
    record = {
        "disease": disease,
        "input": data,
        "prediction": int(prediction),
        "probability": float(probability),
        "timestamp": datetime.utcnow()
    }

    try:
        predictions.insert_one(record)
    except Exception as e:
        print("MongoDB Error:", e)

    # ✅ RESPONSE
    if probability < 0.3:
        level = "Low"
    elif probability < 0.7:
        level = "Medium"
    else:
        level = "High"

    return {
        "disease": disease,
        "prediction": int(prediction),
        "risk_level": level,
        "probability": round(float(probability), 2)
    }