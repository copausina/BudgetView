from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import create_db_and_tables, engine
from app.seed import seed_categories
from sqlmodel import Session



@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup code
    create_db_and_tables()
    with Session(engine) as session:
        seed_categories(session)
    yield
    # shutdown code


app = FastAPI(lifespan=lifespan)


@app.get("/")
def root():
    return {"message": "BudgetView API running"}
