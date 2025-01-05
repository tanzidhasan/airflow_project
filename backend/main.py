from fastapi import FastAPI, HTTPException, Depends
from typing import List, Annotated
from core.config import settings
from db.session import engine, SessionLocal
from db.base import Base
from sqlalchemy.orm import Session
from apis.base import api_router
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "localhost:5173"
]


def create_tables():         
	Base.metadata.create_all(bind=engine)


def include_router(app):   
	app.include_router(api_router)
        

def start_application():
    app = FastAPI(title=settings.PROJECT_NAME,version=settings.PROJECT_VERSION)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )
    create_tables()
    include_router(app)
    return app


app = start_application()


@app.get("/")
def home():
    return {"msg":"Hello FastAPI"}


