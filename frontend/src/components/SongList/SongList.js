import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Filter from "../Filter/Filter";
import Pagination from "../Pagination/Pagination";

const direction = {
  asc: 'ASC',
  desc: 'DESC'
};

function SongList() {

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
    const fetchSongs = async () => {
      const url = new URL('http://localhost:3001/song')
      const params = new URLSearchParams();
      console.log(where)
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
    fetchSongs().catch(console.error);
  }, [where, order, offset, limit]);

  const renderHeader = () => {
    return <thead>
      <tr>
        <th><div className="link" onClick={() => setOrder({ field: 'title', direction: toggleDirection('title') })}>Название</div></th>
        <th><div>Исполнитель</div></th>
        <th><div className="link" onClick={() => setOrder({ field: 'createdAt', direction: toggleDirection('createdAt') })}>Дата внесения записи</div></th>

        <th>Примечание</th>
      </tr>
    </thead>
  }

  const renderItem = (item) => {
    return <tr key={'song-' + item.id}>
      <td>{item.title}</td>
      <td>{item.Artist.fullname}</td>
      <td>{new Date(item.createdAt).toLocaleDateString('ru')}</td>
      <td>
        <Link to={'/song/' + item.id}>Подробнее</Link>
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

    return <div><h3>Песен нет</h3></div>
  }

  return (
    <div className="container">
      <div className="title">Песни</div>
      <Filter role='song' onChange={setWhere} />
      {renderContent()}
      <Pagination  
        total={data.total} 
        limit={data.limit} 
        offset={data.offset}
        onChange={setOffset}/>
    </div>
  )
}

export default SongList
