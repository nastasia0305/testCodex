import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import SongForm from '../SongForm/SongForm';


function SongCard() {
  const navigate = useNavigate()
  const [data, setData] = useState({});

  const {id} = useParams();

  useEffect(() => {
    const fetchSong = async () => {
      const url = new URL(id, 'http://localhost:3001/song/')
      const response = await fetch(url)
      const data = await response.json();
      setData(data);
    }
    fetchSong().catch(console.error);
  }, [id]);


  const removeSong = () => {
    const url = new URL(id, 'http://localhost:3001/song/')
    fetch(url, {method: 'DELETE'})
    .then(() => navigate(-1))
    .catch(console.error);
  }
  const updateSong = () => {
    const url = new URL(id, 'http://localhost:3001/song/')
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
    <div>
      {<SongForm data={data} setData={setData}></SongForm>}
      <div className='actions'>
        <button onClick={() => navigate(-1)}>Назад</button>
        <button onClick={() => updateSong()}>Обновить</button>
        <button onClick={() => removeSong()}>Удалить</button>
      </div>
    </div>
  )
}

export default SongCard
