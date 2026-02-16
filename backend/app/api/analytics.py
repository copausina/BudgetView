from sqlmodel import Session
from fastapi import Depends, APIRouter

from app.schemas.analytics import CategoryTotal
from app.database import get_session
from app.crud.analytics import category_totals
from app.models.transaction import TransactionType

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/category-totals", response_model=list[CategoryTotal])
def get_category_totals(
    type: TransactionType = TransactionType.expense, 
    session: Session = Depends(get_session)
):
    return category_totals(session, type)