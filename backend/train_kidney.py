import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.impute import KNNImputer
from sklearn.metrics import accuracy_score
from xgboost import XGBClassifier




# =========================
# LOAD DATA
# =========================
df = pd.read_csv("data/kidney.csv")
df.replace("?", np.nan, inplace=True)

# Drop id
df = df.drop("id", axis=1)

# =========================
# SELECT IMPORTANT FEATURES
# =========================
features = [
    "age","bp","sg","al","su",
    "rbc","pc","pcc","ba"
]

df = df[features + ["classification"]]

# =========================
# ENCODE
# =========================
df["rbc"] = df["rbc"].map({"normal":1, "abnormal":0})
df["pc"] = df["pc"].map({"normal":1, "abnormal":0})
df["pcc"] = df["pcc"].map({"present":1, "notpresent":0})
df["ba"] = df["ba"].map({"present":1, "notpresent":0})

df["classification"] = df["classification"].astype(str).str.strip()
df["classification"] = df["classification"].map({
    "ckd": 1,
    "notckd": 0
})

# Drop missing target
df = df.dropna(subset=["classification"])

# =========================
# SPLIT
# =========================
X = df.drop("classification", axis=1)
y = df["classification"]

# =========================
# IMPUTATION
# =========================
imputer = KNNImputer(n_neighbors=5)
X_imputed = imputer.fit_transform(X)

# =========================
# SCALING
# =========================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_imputed)

# =========================
# TRAIN TEST SPLIT
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# =========================
# XGBOOST MODEL 🔥
# =========================
model = XGBClassifier(
    n_estimators=150,
    max_depth=3,
    learning_rate=0.05,
    subsample=0.8,
    colsample_bytree=0.8,
    reg_alpha=0.5,
    reg_lambda=1,
    eval_metric="logloss",
)

# =========================
# TRAIN
# =========================
model.fit(X_train, y_train)

# =========================
# EVALUATE
# =========================
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print("XGBoost Test Accuracy:", accuracy)

# Cross-validation
cv_score = cross_val_score(model, X_scaled, y, cv=5).mean()
print("XGBoost CV Score:", cv_score)

# =========================
# SAVE
# =========================
joblib.dump(model, "models/kidney_model.pkl")
joblib.dump(scaler, "models/kidney_scaler.pkl")
joblib.dump(imputer, "models/kidney_imputer.pkl")
joblib.dump(accuracy, "models/kidney_accuracy.pkl")

print("Final Kidney Accuracy:", accuracy)
print("✅ XGBoost Kidney model saved")

