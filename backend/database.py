from pymongo import MongoClient
from pymongo.database import Database
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/ims2")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ims2")

client = MongoClient(MONGO_URL)
db: Database = client[DATABASE_NAME]

# Collections (Phase 2 scope)
orders_collection = db["orders"]
order_items_collection = db["order_items"]
discount_requests_collection = db["discount_requests"]
discount_approvals_collection = db["discount_approvals"]
discount_applications_collection = db["discount_applications"]
audit_logs_collection = db["audit_logs"]

# Phase 4 collections
bills_collection = db["bills"]
payments_collection = db["payments"]
invoices_collection = db["invoices"]

# Reference collections (read-only for Phase 2)
users_collection = db["users"]
roles_collection = db["roles"]
user_roles_collection = db["user_roles"]
locations_collection = db["locations"]
products_collection = db["products"]
prescriptions_collection = db["prescriptions"]
customers_collection = db["customers"]
patients_collection = db["patients"]
discount_rules_collection = db["discount_rules"]


def get_database():
    """Dependency for FastAPI routes"""
    return db
