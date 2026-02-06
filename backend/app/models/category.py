from sqlmodel import SQLModel, Field
from .transactiontype import TransactionType

class Category(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    type: TransactionType

