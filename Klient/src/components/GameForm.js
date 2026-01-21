import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient, { setupInterceptors } from '../api/axiosClient';
import { LoaderContext } from '../context/LoaderContext';
import { toast } from 'react-toastify';

const GameForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoaderContext);
  const isEdit = !!id;

  const [form, setForm] = useState({
    nazwa_gry: '',
    gatunek: '',
    czas_przejscia_h: 0,
    czy_ukonczona: false
  });
  const [errorMsg, setErrorMsg] = useState(''); 

  useEffect(() => {
    setupInterceptors(setIsLoading);
    if (isEdit) fetchGame();
  }, [id]);

  const fetchGame = async () => {
    try {
      const res = await apiClient.get(`/gry/${id}`);
      setForm(res.data);
    } catch (err) {
      toast.error("Błąd pobierania danych");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    try {
      if (isEdit) {
        await apiClient.put(`/gry/${id}`, form);
      } else {
        await apiClient.post('/gry/', form);
      }
      
      toast.success("Poprawnie zapisano zmiany");
      navigate('/'); 
      
    } catch (err) {
      const msg = err.response?.data?.detail || "Wystąpił błąd zapisu";
      setErrorMsg(msg); 
      toast.error("Wystąpił błąd"); // 
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? "Edycja rekordu" : "Dodawanie rekordu"}</h2>
      
      {errorMsg && <div className="error-box">{errorMsg}</div>}

      <form onSubmit={handleSubmit}>
        <label>Nazwa gry (tekst):</label> 
        <input 
          type="text" 
          value={form.nazwa_gry} 
          onChange={e => setForm({...form, nazwa_gry: e.target.value})} 
          required 
        />

        <label>Gatunek (tekst):</label>
        <input 
          type="text" 
          value={form.gatunek} 
          onChange={e => setForm({...form, gatunek: e.target.value})} 
          required 
        />

        <label>Czas przejścia (liczba):</label> 
        <input 
          type="number" 
          value={form.czas_przejscia_h} 
          onChange={e => setForm({...form, czas_przejscia_h: parseInt(e.target.value)})} 
          required 
        />

        <label>
          Czy ukończona (bool): 
          <input 
            type="checkbox" 
            checked={form.czy_ukonczona} 
            onChange={e => setForm({...form, czy_ukonczona: e.target.checked})} 
          />
        </label>

        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
};

export default GameForm;