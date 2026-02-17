from sqlmodel import SQLModel

class CategoryTotal(SQLModel):
    category: str
    total: float
    
class CashflowOverTime(SQLModel):
    month: str
    income: float
    expense: float
    