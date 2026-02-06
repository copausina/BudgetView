from sqlmodel import SQLModel
from datetime import datetime
from app.models.transaction import TransactionType


class TransactionCreate(SQLModel):
    description: str
    amount: float
    date: datetime
    type: TransactionType
    category_id: int | None


class TransactionRead(SQLModel):
    id: int
    description: str
    amount: float
    date: datetime
    type: TransactionType
    category_id: int | None
