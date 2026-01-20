"""
Inventory Service - Stock Management
Sprint 2: Inventory Execution
Source: SYSTEM_INTENT.md - Stock moves ONLY after billing
"""

from database import db
from fastapi import HTTPException
from datetime import datetime
from uuid import uuid4

stock_collection = db["stock"]
stock_movements_collection = db["stock_movements"]


class InventoryService:
    """Inventory management - moves ONLY after billing"""
    
    @staticmethod
    def get_stock(product_id: str, location_id: str):
        """Get current stock for product at location"""
        stock = stock_collection.find_one({
            "product_id": product_id,
            "location_id": location_id
        })
        
        return stock.get("quantity", 0) if stock else 0
    
    @staticmethod
    def deduct_stock_on_billing(bill_id: str, order_id: str, order_items: list, location_id: str):
        """
        Deduct stock after successful billing
        Called automatically when bill is created
        """
        for item in order_items:
            product_id = item.get("product_id")
            quantity = item.get("quantity", 0)
            
            # Update stock
            stock = stock_collection.find_one({
                "product_id": product_id,
                "location_id": location_id
            })
            
            if stock:
                new_qty = stock.get("quantity", 0) - quantity
                stock_collection.update_one(
                    {"product_id": product_id, "location_id": location_id},
                    {"$set": {"quantity": max(0, new_qty), "updated_at": datetime.utcnow()}}
                )
            else:
                # Initialize stock if not exists
                stock_collection.insert_one({
                    "id": str(uuid4()),
                    "product_id": product_id,
                    "location_id": location_id,
                    "quantity": 0,  # Already negative scenario
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                })
            
            # Record movement
            stock_movements_collection.insert_one({
                "id": str(uuid4()),
                "product_id": product_id,
                "location_id": location_id,
                "quantity": -quantity,
                "movement_type": "SALE",
                "reference_type": "BILL",
                "reference_id": bill_id,
                "created_at": datetime.utcnow()
            })
    
    @staticmethod
    def stock_in(product_id: str, location_id: str, quantity: int, reference_type: str, reference_id: str):
        """Add stock"""
        stock = stock_collection.find_one({
            "product_id": product_id,
            "location_id": location_id
        })
        
        if stock:
            new_qty = stock.get("quantity", 0) + quantity
            stock_collection.update_one(
                {"product_id": product_id, "location_id": location_id},
                {"$set": {"quantity": new_qty, "updated_at": datetime.utcnow()}}
            )
        else:
            stock_collection.insert_one({
                "id": str(uuid4()),
                "product_id": product_id,
                "location_id": location_id,
                "quantity": quantity,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            })
        
        # Record movement
        stock_movements_collection.insert_one({
            "id": str(uuid4()),
            "product_id": product_id,
            "location_id": location_id,
            "quantity": quantity,
            "movement_type": "STOCK_IN",
            "reference_type": reference_type,
            "reference_id": reference_id,
            "created_at": datetime.utcnow()
        })
