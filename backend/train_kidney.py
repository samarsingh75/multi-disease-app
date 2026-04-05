import pandas as pd
import numpy as np
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.impute import KNNImputer
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score

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

# Clean classification column
df["classification"] = df["classification"].astype(str).str.strip()

# Map values
df["classification"] = df["classification"].map({
    "ckd": 1,
    "notckd": 0
})

# DROP rows where target is missing
df = df.dropna(subset=["classification"])

# =========================
# SPLIT
# =========================
X = df.drop("classification", axis=1)
y = df["classification"]

# =========================
# IMPUTATION (KNN 🔥)
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
    X_scaled, y, test_size=0.2, random_state=42
)

# =========================
# MODEL COMPARISON
# =========================
rf = RandomForestClassifier(n_estimators=150, max_depth=5)
gb = GradientBoostingClassifier()

rf.fit(X_train, y_train)
gb.fit(X_train, y_train)

rf_acc = accuracy_score(y_test, rf.predict(X_test))
gb_acc = accuracy_score(y_test, gb.predict(X_test))

print("RandomForest Accuracy:", rf_acc)
print("GradientBoost Accuracy:", gb_acc)

# =========================
# SELECT BEST MODEL
# =========================
if rf_acc > gb_acc:
    model = rf
    accuracy = rf_acc
    print("Using RandomForest")
else:
    model = gb
    accuracy = gb_acc
    print("Using GradientBoosting")

# =========================
# SAVE
# =========================
joblib.dump(model, "models/kidney_model.pkl")
joblib.dump(scaler, "models/kidney_scaler.pkl")
joblib.dump(imputer, "models/kidney_imputer.pkl")
joblib.dump(accuracy, "models/kidney_accuracy.pkl")

print("Final Kidney Accuracy:", accuracy)
print("✅ Kidney model saved")