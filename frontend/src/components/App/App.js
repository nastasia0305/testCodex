import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from '../Header/Header';
import ArtistList from '../ArtistList/ArtistList';
import ArtistCard from '../ArtistCard/ArtistCard';
import ArtistNew from '../ArtistNew/ArtistNew';
import SongList from '../SongList/SongList';
import SongCard from '../SongCard/SongCard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/artist" replace />} />
          <Route path="/artist/:id" element={<ArtistCard />} />
          <Route path="/artist/create" element={<ArtistNew />} />
          <Route path="/artist" element={<ArtistList />} />

          <Route path="/song/:id" element={<SongCard />} />
          <Route path="/song" element={<SongList />} /> 

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
