from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class GryKomputerowe(Base):
    __tablename__ = "gry_komputerowe"

    id = Column(Integer, primary_key=True, index=True)
    
    nazwa_gry = Column(String(255), unique=True, nullable=False)
    
    gatunek = Column(String(100), nullable=False)
    
    czas_przejscia_h = Column(Integer, nullable=False)
    
    czy_ukonczona = Column(Boolean, default=False) 

    def __repr__(self):
        return f"<GryKomputerowe(id={self.id}, nazwa='{self.nazwa_gry}')>"