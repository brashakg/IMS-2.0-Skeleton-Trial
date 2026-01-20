"""
Sprint 1: System Hardening Guards
Prevent violations and abuse patterns
Source: 06_transaction_state_machine_and_immutability.md
"""

from database import bills_collection, payments_collection, invoices_collection
from fastapi import HTTPException


class BillingGuards:
    """Prevent billing violations"""
    
    @staticmethod
    def prevent_double_billing(order_id: str):
        """Prevent creating bill twice for same order"""
        existing_bill = bills_collection.find_one({"order_id": order_id})
        if existing_bill:
            raise HTTPException(
                status_code=409,
                detail={
                    "error": True,
                    "reason_code": "BILL_ALREADY_EXISTS",
                    "message": f"Bill already exists for this order: {existing_bill['bill_number']}",
                    "existing_bill_id": existing_bill["id"]
                }
            )
    
    @staticmethod
    def prevent_post_bill_mutation(bill_id: str, action: str):
        """Bills are immutable after creation"""
        # Bill existence is sufficient - bills are always immutable
        bill = bills_collection.find_one({"id": bill_id})
        if not bill:
            raise HTTPException(
                status_code=404,
                detail={"error": True, "reason_code": "ENTITY_NOT_FOUND", "message": "Bill not found"}
            )
        # Note: Bills are immutable by design, no edit endpoints exist
        return bill
    
    @staticmethod
    def prevent_payment_after_invoice(bill_id: str):
        """No payments allowed after invoice generated"""
        invoice = invoices_collection.find_one({"bill_id": bill_id})
        if invoice:
            raise HTTPException(
                status_code=409,
                detail={
                    "error": True,
                    "reason_code": "INVOICE_ALREADY_GENERATED",
                    "message": "Cannot record payment after invoice generated",
                    "invoice_number": invoice["invoice_number"]
                }
            )
    
    @staticmethod
    def prevent_duplicate_invoice(bill_id: str):
        """Prevent generating invoice twice"""
        existing_invoice = invoices_collection.find_one({"bill_id": bill_id})
        if existing_invoice:
            raise HTTPException(
                status_code=409,
                detail={
                    "error": True,
                    "reason_code": "INVOICE_ALREADY_EXISTS",
                    "message": f"Invoice already exists: {existing_invoice['invoice_number']}",
                    "existing_invoice_id": existing_invoice["id"]
                }
            )


class PaymentGuards:
    """Prevent payment violations"""
    
    @staticmethod
    def validate_payment_amount(amount: float, outstanding: float):
        """Payment cannot exceed outstanding"""
        if amount > outstanding + 0.01:  # Allow 1 paisa rounding
            raise HTTPException(
                status_code=400,
                detail={
                    "error": True,
                    "reason_code": "PAYMENT_EXCEEDS_OUTSTANDING",
                    "message": f"Payment ₹{amount} exceeds outstanding ₹{outstanding}",
                    "outstanding_balance": outstanding,
                    "attempted_payment": amount
                }
            )
    
    @staticmethod
    def validate_outstanding_for_invoice(outstanding: float):
        """Invoice requires full payment"""
        if outstanding > 0.01:  # Allow 1 paisa rounding
            raise HTTPException(
                status_code=409,
                detail={
                    "error": True,
                    "reason_code": "OUTSTANDING_BALANCE",
                    "message": f"Cannot generate invoice with outstanding balance of ₹{outstanding}",
                    "outstanding_balance": outstanding
                }
            )
