from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from app.database import get_session
from app.schemas.transaction import TransactionCreate, TransactionRead, TransactionUpdate
from app.crud.transaction import (
    create_transaction,
    get_transactions,
    get_transaction,
    update_transaction,
    delete_transaction,
)

router = APIRouter(prefix="/transactions", tags=["transactions"])

@router.get("/", response_model=list[TransactionRead])
def read_all(session: Session = Depends(get_session)):
    return get_transactions(session)

@router.get("/{transaction_id}", response_model=TransactionRead)
def read_one(transaction_id: int,
             session: Session = Depends(get_session)):

    transaction = get_transaction(session, transaction_id)

    if not transaction:
        raise HTTPException(status_code=404, detail="Not found")

    return transaction

@router.post("/", response_model=TransactionRead)
def create(transaction: TransactionCreate,
           session: Session = Depends(get_session)):
    return create_transaction(session, transaction)

@router.patch("/{transaction_id}", response_model=TransactionRead)
def update(transaction_id: int,
           transaction_update: TransactionUpdate,
           session: Session = Depends(get_session)):
    db_transaction = get_transaction(session, transaction_id)
    return update_transaction(session, db_transaction, transaction_update)

@router.delete("/{transaction_id}")
def delete(transaction_id: int,
           session: Session = Depends(get_session)):

    transaction = delete_transaction(session, transaction_id)

    if not transaction:
        raise HTTPException(status_code=404, detail="Not found")

    return {"ok": True}