import numpy as np
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# =========================
# LOAD DATA
# =========================
df = pd.read_csv("data/heart.csv")

# Clean column names
df.columns = df.columns.str.strip().str.lower()

# =========================
# ENCODING
# =========================
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

# =========================
# TARGET
# =========================
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
# SCALING
# =========================
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# =========================
# SPLIT
# =========================
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
)

# =========================
# ANN MODEL
# =========================
model = Sequential()

model.add(Dense(16, activation='relu', input_dim=8))
model.add(Dense(8, activation='relu'))
model.add(Dense(1, activation='sigmoid'))

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# =========================
# TRAIN
# =========================
model.fit(
    X_train, y_train,
    epochs=60,
    batch_size=10,
    validation_split=0.2,
    verbose=1
)

# =========================
# EVALUATE
# =========================
y_pred_prob = model.predict(X_test)
y_pred = (y_pred_prob > 0.5).astype(int)

accuracy = accuracy_score(y_test, y_pred)

print("Heart ANN Accuracy:", accuracy)

# =========================
# SAVE MODEL + SCALER
# =========================
model.save("models/heart_ann_model.h5")
joblib.dump(scaler, "models/heart_scaler.pkl")
joblib.dump(accuracy, "models/heart_accuracy.pkl")

print("✅ Heart ANN model saved")