from sqlmodel import Session, select
from app.models.category import Category
from app.models.transaction import TransactionType


DEFAULT_CATEGORIES = [
    # Expenses
    {"name": "Groceries", "type": TransactionType.expense},
    {"name": "Rent", "type": TransactionType.expense},
    {"name": "Transportation", "type": TransactionType.expense},
    {"name": "Utilities", "type": TransactionType.expense},
    {"name": "Restaurants", "type": TransactionType.expense},
    {"name": "Bars", "type": TransactionType.expense},
    {"name": "Vice", "type": TransactionType.expense},
    {"name": "Clothes", "type": TransactionType.expense},
    {"name": "Subscriptions", "type": TransactionType.expense},
    {"name": "Investments", "type": TransactionType.expense},
    {"name": "Misc.", "type": TransactionType.expense},

    # Income
    {"name": "Salary", "type": TransactionType.income},
    {"name": "Gift", "type": TransactionType.income},
    {"name": "Repayment", "type": TransactionType.income},
    {"name": "Surveys", "type": TransactionType.income},
    {"name": "Odd Jobs", "type": TransactionType.income},
    {"name": "Misc.", "type": TransactionType.income},
]

def seed_categories(session: Session):
    existing = session.exec(select(Category)).first()

    # If categories already exist, do nothing
    if existing:
        return

    for cat in DEFAULT_CATEGORIES:
        session.add(Category(**cat))

    session.commit()
