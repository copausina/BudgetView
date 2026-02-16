from sqlmodel import Session, select, func
from app.models.transaction import Transaction, TransactionType
from app.models.category import Category
from app.schemas.analytics import CategoryTotal

def category_totals(session: Session, type: TransactionType):
    statement = (
        select(
            Category.name.label("category"),
            func.sum(Transaction.amount).label("total")
        )
        .join(Transaction)
        .where(Transaction.type == type)
        .group_by(Category.name)
    )

    results = session.exec(statement).all()

    return [
        CategoryTotal.model_validate(row)
        for row in results
    ]


