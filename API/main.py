from fastapi import FastAPI, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware 
from sqlalchemy.orm import Session
from typing import List, Optional

from mymodel import GryKomputerowe 
from schemas import GraKomputerowa, GraKomputerowaCreate
from database import get_db

app = FastAPI(title="Gaming API CRUD")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/gry/", response_model=List[GraKomputerowa])
def read_all_games(
    ukonczona: Optional[bool] = Query(None), 
    db: Session = Depends(get_db)
):
    query = db.query(GryKomputerowe)
    
    if ukonczona is not None:
        query = query.filter(GryKomputerowe.czy_ukonczona == ukonczona)
        
    return query.all()

@app.get("/gry/{gra_id}", response_model=GraKomputerowa)
def read_game(gra_id: int, db: Session = Depends(get_db)):
    gra = db.query(GryKomputerowe).filter(GryKomputerowe.id == gra_id).first()
    if gra is None:
        raise HTTPException(status_code=404, detail="Gra nie znaleziona")
    return gra

@app.post("/gry/", response_model=GraKomputerowa, status_code=status.HTTP_201_CREATED)
def create_game(gra: GraKomputerowaCreate, db: Session = Depends(get_db)):
    if db.query(GryKomputerowe).filter(GryKomputerowe.nazwa_gry == gra.nazwa_gry).first():
        raise HTTPException(status_code=400, detail="Gra o tej nazwie już istnieje")
    
    db_gra = GryKomputerowe(**gra.model_dump())
    db.add(db_gra)
    db.commit()
    db.refresh(db_gra)
    return db_gra

@app.put("/gry/{gra_id}", response_model=GraKomputerowa)
def update_game(gra_id: int, gra_data: GraKomputerowaCreate, db: Session = Depends(get_db)):
    db_gra = db.query(GryKomputerowe).filter(GryKomputerowe.id == gra_id).first()
    if db_gra is None:
        raise HTTPException(status_code=404, detail="Gra nie znaleziona")

    if gra_data.czas_przejscia_h > 100 and gra_data.czy_ukonczona is False:
         raise HTTPException(status_code=400, detail="Gry powyżej 100h muszą być oznaczone jako ukończone (Server Check)")

    update_data = gra_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_gra, key, value)
    
    db.commit()
    db.refresh(db_gra)
    return db_gra

@app.delete("/gry/{gra_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_game(gra_id: int, db: Session = Depends(get_db)):
    db_gra = db.query(GryKomputerowe).filter(GryKomputerowe.id == gra_id).first()
    
    if not db_gra:
        raise HTTPException(status_code=404, detail="Gra nie znaleziona")

    if db_gra.czy_ukonczona is False:
        raise HTTPException(status_code=400, detail="Nie można usunąć gry, która nie została ukończona!")

    db.delete(db_gra)
    db.commit()
    return