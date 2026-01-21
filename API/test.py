from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from mymodel import GryKomputerowe, Base

SQLALCHEMY_DATABASE_URL = (
    "mssql+pyodbc:///?odbc_connect="
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=(localdb)\\MSSQLLocalDB;"
    "Database=Gamming;"
    "Trusted_Connection=yes;"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)

def add_game_record():
    with Session(engine) as session:
        nowa_gra = GryKomputerowe(
            nazwa_gry="Hogwarts Legacy",
            gatunek="Action RPG",
            czas_przejscia_h=40,
            czy_ukonczona=False
        )
        
        try:
            session.add(nowa_gra)
            session.commit()
            session.refresh(nowa_gra)
            
            print("--- Dodano rekord do tabeli gry_komputerowe ---")
            print(f"ID rekordu: {nowa_gra.id}")
            print(f"Gra: {nowa_gra.nazwa_gry}")
            print(f"Ukończona: {nowa_gra.czy_ukonczona}")
        except Exception as e:
            session.rollback()
            print(f"Błąd podczas dodawania rekordu (możliwie duplikat nazwy): {e}")

if __name__ == "__main__":
    add_game_record()