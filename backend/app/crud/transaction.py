from sqlmodel import Session, select
from app.models.transaction import Transaction


def create_transaction(session: Session, transaction):
    db_transaction = Transaction.model_validate(transaction)

    session.add(db_transaction)
    session.commit()
    session.refresh(db_transaction)

    return db_transaction

def get_transactions(session: Session):
    return session.exec(select(Transaction)).all()

def get_transaction(session: Session, transaction_id: int):
    return session.get(Transaction, transaction_id)

def delete_transaction(session: Session, transaction_id: int):
    transaction = session.get(Transaction, transaction_id)

    if not transaction:
        return None

    session.delete(transaction)
    session.commit()
    return transaction
