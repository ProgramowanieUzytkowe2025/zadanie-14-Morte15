import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import apiClient, { setupInterceptors } from '../api/axiosClient';
import { LoaderContext } from '../context/LoaderContext';
import { toast } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState('all');  
  const [deleteId, setDeleteId] = useState(null); 
  const { setIsLoading } = useContext(LoaderContext);

  useEffect(() => {
    setupInterceptors(setIsLoading);
    fetchGames();
  }, [filter]);

  const fetchGames = async () => {
    let url = '/gry/';
    if (filter === 'true') url += '?ukonczona=true';
    if (filter === 'false') url += '?ukonczona=false';

    try {
      const res = await apiClient.get(url);
      setGames(res.data);
    } catch (err) {
      toast.error("Nie udało się pobrać listy");
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/gry/${deleteId}`);
      toast.success("Poprawnie zapisano zmiany"); 
      setDeleteId(null);
      fetchGames();
    } catch (err) {
      const msg = err.response?.data?.detail || "Wystąpił błąd";
      toast.error("Wystąpił błąd: " + msg);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <h1>Lista Gier</h1>
      
      <div className="filter-section">
        <label>Filtruj: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">Wszystkie</option> 
          <option value="true">Tylko Ukończone</option> 
          <option value="false">Tylko Nieukończone</option> 
        </select>
      </div>

      <Link to="/add" className="btn-add">Dodaj nowy rekord</Link> 

      <div className="tiles-grid">
        {games.map(game => (
          <div key={game.id} className="tile">
            <h3>{game.nazwa_gry}</h3>
            <p>Gatunek: {game.gatunek}</p>
            <p>Czas: {game.czas_przejscia_h}h</p>
            <p>Ukończona: {game.czy_ukonczona ? 'TAK' : 'NIE'}</p>
            
            <div className="tile-actions">
              <button onClick={() => setDeleteId(game.id)} className="btn-del">Usuń</button>
              
              <Link to={`/edit/${game.id}`} className="btn-edit">Edytuj</Link>
            </div>
          </div>
        ))}
      </div>


      {deleteId && (
        <ConfirmationModal 
          onConfirm={handleDelete} 
          onCancel={() => setDeleteId(null)} 
        />
      )}
    </div>
  );
};

export default GameList;