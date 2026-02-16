from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from .transactiontype import TransactionType
from .base import TimestampMixin
from pydantic import field_validator
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from .category import Category

class Transaction(TimestampMixin, SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    description: str
    amount: float
    date: datetime
    type: TransactionType
    category_id: int = Field(foreign_key="category.id")
    category: Optional["Category"] = Relationship(
        back_populates="transactions"
    )

    @field_validator("amount")
    @classmethod
    def amount_must_be_positive(cls, v):
        if v < 0:
            raise ValueError("Amount must be positive")
        return v
    