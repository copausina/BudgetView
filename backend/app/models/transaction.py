from sqlmodel import SQLModel, Field
from datetime import datetime
from .transactiontype import TransactionType
from .base import TimestampMixin

class Transaction(TimestampMixin, SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    description: str
    amount: float
    date: datetime
    type: TransactionType
    category_id: int | None = Field(foreign_key="category.id")
    