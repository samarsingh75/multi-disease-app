from fastapi import FastAPI
import joblib
import pandas as pd
from tensorflow.keras.models import load_model

app = FastAPI()

# =========================
# LOAD MODELS
# =========================
models = {
    "diabetes": joblib.load("models/diabetes_model.pkl"),
    "heart": load_model("models/heart_ann_model.h5"),
    "kidney": joblib.load("models/kidney_model.pkl"),
    "alzheimer": joblib.load("models/alzheimer_model.pkl")
}

# =========================
# LOAD SCALERS & IMPUTERS
# =========================
scalers = {
    "heart": joblib.load("models/heart_scaler.pkl"),
    "kidney": joblib.load("models/kidney_scaler.pkl")
}

imputers = {
    "kidney": joblib.load("models/kidney_imputer.pkl")
}

# =========================
# LOAD ACCURACY
# =========================
accuracies = {
    "diabetes": joblib.load("models/diabetes_accuracy.pkl"),
    "heart": joblib.load("models/heart_accuracy.pkl"),
    "kidney": joblib.load("models/kidney_accuracy.pkl"),
    "alzheimer": joblib.load("models/alzheimer_accuracy.pkl")
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

    # DIABETES
    if disease == "diabetes":
        model = models[disease]
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]

    # HEART (ANN)
    elif disease == "heart":
        model = models[disease]
        scaler = scalers["heart"]

        input_scaled = scaler.transform(input_df)
        prob = model.predict(input_scaled)[0][0]

        probability = float(prob)
        prediction = 1 if prob > 0.5 else 0

    # KIDNEY
    elif disease == "kidney":
        model = models[disease]
        scaler = scalers["kidney"]
        imputer = imputers["kidney"]

        input_imputed = imputer.transform(input_df)
        input_scaled = scaler.transform(input_imputed)

        prediction = model.predict(input_scaled)[0]
        probability = model.predict_proba(input_scaled)[0][1]

    # ALZHEIMER
    elif disease == "alzheimer":
        model = models[disease]
        prediction = model.predict(input_df)[0]
        probability = model.predict_proba(input_df)[0][1]

    # =========================
    # RISK LEVEL
    # =========================
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