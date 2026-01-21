from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from mymodel import Base

SQLALCHEMY_DATABASE_URL = (
    "mssql+pyodbc:///?odbc_connect="
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=(localdb)\\MSSQLLocalDB;"
    "Database=Gamming;"
    "Trusted_Connection=yes;"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()