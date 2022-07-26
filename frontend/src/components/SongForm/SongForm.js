import React from 'react';

function SongForm(props) {
  const { data, setData } = props

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const renderArtist = () => {
    if (data.Artist) {
      return <div className='col'>
        <label>Исполнитель</label>
        <div>{data.Artist.fullname}</div>
      </div>
    }
  }

  return (
    <form className='form'>
      {renderArtist()}
      <div className='col'>
        <label>Название</label>
        <input type="text" name="title" placeholder="Название" defaultValue={data.title} onChange={onChangeHandler} />
      </div>
    </form>
  )
}

export default SongForm
