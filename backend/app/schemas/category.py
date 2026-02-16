from sqlmodel import SQLModel

class CategoryRead(SQLModel):
    id: int
    name: str
