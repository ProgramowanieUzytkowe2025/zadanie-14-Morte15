from pydantic import BaseModel, Field

class GraKomputerowaBase(BaseModel):
    nazwa_gry: str = Field(..., max_length=255)
    gatunek: str = Field(..., max_length=100)
    czas_przejscia_h: int = Field(..., ge=1)
    czy_ukonczona: bool = False

class GraKomputerowaCreate(GraKomputerowaBase):
    pass

class GraKomputerowa(GraKomputerowaBase):
    id: int 

    class Config:
        from_attributes = True