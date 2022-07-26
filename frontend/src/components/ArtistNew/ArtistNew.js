import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import ArtistForm from '../ArtistForm/ArtistForm';

function ArtistNew() {
  const navigate = useNavigate()
  const [data, setData] = useState({});

  const createArtist = () => {
    const url = new URL('http://localhost:3001/artist/')
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then((response) => {
        if (response.error) {
          return alert(response.error)
        }
        navigate(-1)
      })
      .catch(console.error);
  }

  return (
    <div>
      {<ArtistForm data={data} setData={setData}></ArtistForm>}
      <div className='actions'>
        <button onClick={() => navigate(-1)}>Назад</button>
        <button onClick={() => createArtist()}>Создать</button>
      </div>
    </div>
  )
}

export default ArtistNew
