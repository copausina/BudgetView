from sqlmodel import Session, select, func, case
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

def cashflow_over_time(session):
    statement = (
        select(
            func.strftime("%Y-%m", Transaction.date).label("month"),

            func.sum(
                case(
                    (Transaction.type == "income", Transaction.amount),
                    else_=0,
                )
            ).label("income"),

            func.sum(
                case(
                    (Transaction.type == "expense", Transaction.amount),
                    else_=0,
                )
            ).label("expense"),
        )
        .group_by("month")
        .order_by("month")
    )

    results = session.exec(statement).all()

    return [
        {
            "month": month,
            "income": income or 0,
            "expense": expense or 0,
        }
        for month, income, expense in results
    ]