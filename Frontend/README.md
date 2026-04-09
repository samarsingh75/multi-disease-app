🧠 Multi Disease Prediction System

An AI-powered web application that predicts the risk of multiple diseases using Machine Learning models.
Built with a modern full-stack architecture using React + FastAPI + ML models + MongoDB.

---

🚀 Features

- 🔬 Predicts multiple diseases:
  
  - Diabetes
  - Heart Disease
  - Kidney Disease
  - Alzheimer’s

- 📊 Displays:
  
  - Risk Level (Low / Medium / High)
  - Probability Score
  - Model Accuracy

- 🎨 Modern UI with animations (TailwindCSS)

- ⚡ Fast backend using FastAPI

- 🧠 ML models integrated using joblib

- 🗄️ MongoDB integration for storing predictions

---

🛠️ Tech Stack

Frontend

- React.js
- Tailwind CSS
- Axios

Backend

- FastAPI
- Python (Scikit-learn, Pandas, Joblib)

Database

- MongoDB (Local / Atlas)

---

📂 Project Structure

multi-disease-app/

│

├── frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── pages/

│   │   └── hooks/

├── backend/

│   ├── models/

│   ├── main.py

│   ├── requirements.txt

│

└── README.md

---

⚙️ Setup Instructions

1️⃣ Clone the repository

git clone https://github.com/your-username/multi-disease-app.git
cd multi-disease-app

---

2️⃣ Backend Setup

cd backend
pip install -r requirements.txt

Run server:

python -m uvicorn main:app --reload

Backend will run at:
👉 http://127.0.0.1:8000

---

3️⃣ Frontend Setup

cd frontend
npm install
npm start

Frontend will run at:
👉 http://localhost:3000

---

🗄️ MongoDB Setup (Optional but Recommended)

1. Install MongoDB
2. Start MongoDB server
3. Default connection:

mongodb://localhost:27017/

Database used:

multi_disease_db

Collection:

predictions

---

🔌 API Endpoints

➤ Get Model Info

GET /model-info/{disease}

➤ Predict Disease

POST /predict/{disease}

Example:

POST /predict/kidney

---

📊 Example Output

{
  "disease": "kidney",
  "prediction": 1,
  "risk_level": "Medium",
  "probability": 0.58
}

---

🌐 Deployment

- Backend: Render / Railway
- Frontend: Vercel / Netlify
- Database: MongoDB Atlas

---

⚠️ Disclaimer

This project is for educational purposes only.
It is not a substitute for professional medical diagnosis.

---

🙌 Future Improvements

- User authentication
- History tracking dashboard
- More disease models
- Model optimization
- Real-time analytics

---

👨‍💻 Author

Samar Singh
MCA(Data Scinece) Mini Project
AI-Based Healthcare System

---

⭐ Support

If you like this project, give it a ⭐ on GitHub!
