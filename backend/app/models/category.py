from sqlmodel import SQLModel, Field, Relationship
from .transactiontype import TransactionType
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .transaction import Transaction

class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    type: TransactionType

    transactions: list["Transaction"] = Relationship(back_populates="category")

