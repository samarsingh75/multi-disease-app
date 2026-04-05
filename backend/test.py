import joblib

model = joblib.load("models/diabetes_model.pkl")

sample = [[2,120,70,20,85,28.5,0.5,30]]

print("Prediction:", model.predict(sample))
print("Probability:", model.predict_proba(sample))