import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# =========================
# 1. LOAD DATA
# =========================
df = pd.read_csv("data/Alzheimers.csv")

# =========================
# CLEAN DATA
# =========================

# Replace '?' with NaN
df.replace("?", pd.NA, inplace=True)

# Remove unwanted quotes from dx1
df["dx1"] = df["dx1"].astype(str).str.replace("'", "").str.strip()

# Drop Subject
df = df.drop("Subject", axis=1)

# Encode Gender
df["Gender"] = df["Gender"].map({
    "male": 1,
    "female": 0
})

# Convert numeric columns properly
numeric_cols = ["mmse", "ageAtEntry", "cdr", "memory"]

for col in numeric_cols:
    df[col] = pd.to_numeric(df[col], errors="coerce")

# =========================
# TARGET
# =========================
df["target"] = df["dx1"].apply(lambda x: 1 if x == "AD Dementia" else 0)
df = df.drop("dx1", axis=1)

# =========================
# HANDLE MISSING
# =========================
df = df.dropna()

# =========================
# 5. FEATURES & LABEL
# =========================
X = df.drop("target", axis=1)
y = df["target"]

# =========================
# 6. SPLIT
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# =========================
# 7. MODEL
# =========================
pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", RandomForestClassifier(
        n_estimators=150,
        max_depth=5,
        random_state=42
    ))
])

# =========================
# 8. TRAIN
# =========================
pipeline.fit(X_train, y_train)

# =========================
# 9. EVALUATE
# =========================
y_pred = pipeline.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("Alzheimer Accuracy:", accuracy)

# =========================
# 10. SAVE
# =========================
joblib.dump(pipeline, "models/alzheimer_model.pkl")
joblib.dump(accuracy, "models/alzheimer_accuracy.pkl")

print("✅ Alzheimer model saved successfully")