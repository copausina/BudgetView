from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.database import get_session
from app.models.category import Category

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/", response_model=list[Category])
def get_categories(session: Session = Depends(get_session)):
    return session.exec(select(Category)).all()