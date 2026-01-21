import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import GameList from './components/GameList';
import GameForm from './components/GameForm';
import Loader from './components/Loader';
import { LoaderContext } from './context/LoaderContext';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      <BrowserRouter>
        <div className="App">
          {isLoading && <Loader />}
          
          <ToastContainer autoClose={3000} position="top-right" />

          <Routes>
            <Route path="/" element={<GameList />} />
            <Route path="/add" element={<GameForm />} />
            <Route path="/edit/:id" element={<GameForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LoaderContext.Provider>
  );
}

export default App;