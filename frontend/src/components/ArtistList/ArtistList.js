import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination/Pagination";

const direction = {
  asc: 'ASC',
  desc: 'DESC'
};

function ArtistList() {

  const navigate = useNavigate()
  const [data, setData] = useState({ data: [], total: 0 });
  const [where, setWhere] = useState({ field: '', search: '' })
  const [order, setOrder] = useState({ field: '', direction: '' })
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

  const toggleDirection = field => {
    if (order.field === field) {
      return order.direction === direction.asc ? direction.desc : direction.asc;
    }
    return direction.asc;
  }

  useEffect(() => {
    const fetchArtists = async () => {
      const url = new URL('http://localhost:3001/artist')
      const params = new URLSearchParams();
      if (where.field && where.search) {
        params.append('where', JSON.stringify(where))
      }
      if (order.field && order.direction) {
        params.append('order', JSON.stringify(order))
      }
      if (offset > 0) {
        params.append('offset', offset)
      }
      if (limit) {
        params.append('limit', limit)
      }
      url.search = params
      const response = await fetch(url)
      const data = await response.json();
      setData(data);
    }
    fetchArtists().catch(console.error);
  }, [where, order, offset, limit]);

  const renderHeader = () => {
    return <thead>
      <tr>
        <th><div className="link" onClick={() => setOrder({ field: 'fullname', direction: toggleDirection('fullname') })}>Исполнитель</div></th>
        <th>Описание</th>
        <th><div className="link" onClick={() => setOrder({ field: 'createdAt', direction: toggleDirection('createdAt') })}>Дата внесения записи</div></th>
        <th>Примечание</th>
      </tr>
    </thead>
  }

  const renderItem = (item) => {
    return <tr key={'artist-' + item.id}>
      <td>{item.fullname}</td>
      <td>{item.description}</td>
      <td>{new Date(item.createdAt).toLocaleDateString('ru')}</td>
      <td>
        <Link to={'/artist/' + item.id}>Подробнее</Link>
      </td>
    </tr>
  }

  const renderList = () => {
    return <tbody>{data.data.map(item => renderItem(item))}</tbody>
  }

  const renderContent = () => {
    if (data.total) {
      return <table className="table">{renderHeader()}{renderList()}</table>
    }

    return <div><h3>Исполнителей нет</h3></div>
  }

  return (
    <div className="container">
      <div className="title">Исполнители</div>
      <Filter role='artist' onChange={setWhere} />
      {renderContent()}
      <button onClick={() => navigate(`/artist/create`)} className="button">Добавить исполнителя</button>
      <Pagination  
        total={data.total} 
        limit={data.limit} 
        offset={data.offset}
        onChange={setOffset}/>
    </div>
  )
}

export default ArtistList
