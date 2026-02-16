from sqlmodel import SQLModel

class CategoryTotal(SQLModel):
    category: str
    total: float
    