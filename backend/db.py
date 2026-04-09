from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["multi_disease_db"]

predictions = db["predictions"]