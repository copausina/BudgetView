from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import create_db_and_tables, engine
from app.seed import seed_categories
from sqlmodel import Session
from app.api.transactions import router as transaction_router
from app.api.categories import router as category_router
from app.api.analytics import router as analytics_router
from fastapi.middleware.cors import CORSMiddleware


@asynccontextmanager
async def lifespan(app: FastAPI):
    # startup code
    create_db_and_tables()
    with Session(engine) as session:
        seed_categories(session)
    yield
    # shutdown code

app = FastAPI(lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(transaction_router)  
app.include_router(category_router)    
app.include_router(analytics_router)

@app.get("/")
def root():
    return {"message": "BudgetView API running"}
