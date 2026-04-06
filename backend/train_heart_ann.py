import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# =========================
# LOAD DATA
# =========================
df = pd.read_csv("data/heart.csv")

# Clean column names
df.columns = df.columns.str.strip().str.lower()

# =========================
# DATA PREPROCESSING
# =========================

# Convert categorical → numeric
df['sex'] = df['sex'].astype(str).str.lower().map({'male':1, 'female':0})

df['exang'] = df['exang'].astype(str).str.upper().map({
    'TRUE':1, 'FALSE':0
})

df['cp'] = df['cp'].astype(str).str.lower().map({
    'typical angina':0,
    'atypical angina':1,
    'non-anginal':2,
    'asymptomatic':3
})

# Target
df['target'] = df['num'].apply(lambda x: 1 if x > 0 else 0)

# =========================
# FEATURES
# =========================
features = [
    'age','sex','cp','trestbps','chol',
    'thalch','exang','oldpeak'
]

df = df[features + ['target']]
df = df.dropna()

X = df[features]
y = df['target']

# =========================
# SPLIT
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================
# MODEL (RANDOM FOREST)
# =========================
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)

model.fit(X_train, y_train)

# =========================
# EVALUATION
# =========================
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("Accuracy:", accuracy)
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# =========================
# SAVE MODEL
# =========================
joblib.dump(model, "models/heart_model.pkl")
joblib.dump(accuracy, "models/heart_accuracy.pkl")

print("✅ Heart RF model saved")