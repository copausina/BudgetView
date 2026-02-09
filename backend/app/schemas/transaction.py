from sqlmodel import SQLModel
from datetime import datetime
from app.models.transaction import TransactionType

class TransactionRead(SQLModel):
    id: int
    description: str
    amount: float
    date: datetime
    type: TransactionType
    category_id: int | None
    created_at: datetime
    updated_at: datetime

class TransactionCreate(SQLModel):
    description: str
    amount: float
    date: datetime
    type: TransactionType
    category_id: int | None

class TransactionUpdate(SQLModel):
    description: str | None = None
    amount: float | None = None
    date: datetime | None = None
    type: TransactionType | None = None
    category_id: int | None = None
