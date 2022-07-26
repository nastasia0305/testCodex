import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import ArtistForm from '../ArtistForm/ArtistForm';

function ArtistCard() {
  const navigate = useNavigate()

  const {id} = useParams();

  const [data, setData] = useState({});
  const [songData, setSongData] = useState({artist_id: id, title: ''});


  const fetchArtist = async () => {
    const url = new URL(id, 'http://localhost:3001/artist/')
    const response = await fetch(url)
    const data = await response.json();
    setData(data);
  }

  useEffect(() => {
    fetchArtist().catch(console.error);
  }, [id]);

  const createSong = () => {
    const url = new URL('http://localhost:3001/song/')
    console.log(songData)
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(songData)
    })
      .then(() => {
        fetchArtist().catch(console.error);
      })
      .catch(console.error);
  }

  const renderSongs = () => {
    if (Array.isArray(data.Songs) && data.Songs.length) {
      return data.Songs.map(song =>
        <li key={song.id}>
          <Link to={`/song/${song.id}`}>{song.title}</Link>
        </li>
      )
    } else {
      return <li>Нет песен</li>
    }
  }

  const renderAddSong = () => {
    return <div className='row row--end'>
      <div className='col'>
        <label>Название</label>
        <input type="text" name="title" placeholder="Название песни"  onChange={(event) => setSongData({...songData, title: event.target.value})} />
      </div>
      <button onClick={() => createSong()}>Добавить песню</button>
    </div>
  }
      

  const removeArtist = () => {
    const url = new URL(id, 'http://localhost:3001/artist/')
    fetch(url, {method: 'DELETE'})
    .then(() => navigate(-1))
    .catch(console.error);
  }
  const updateArtist = () => {
    const url = new URL(id, 'http://localhost:3001/artist/')
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => navigate(-1))
    .catch(console.error);
  }

  return (
    <div className='container'>
      {<ArtistForm data={data} setData={setData}></ArtistForm>}
      {renderAddSong()}
      <p>Все песни исполнителя:</p>
      <ul>{renderSongs()}</ul>
      <div className='actions'>
        <button onClick={() => navigate(-1)}>Назад</button>
        <button onClick={() => updateArtist()}>Обновить</button>
        <button onClick={() => removeArtist()}>Удалить</button>
      </div>
    </div>
  )
}

export default ArtistCard
