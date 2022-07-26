import React from 'react';

function ArtistForm(props) {
  const { data, setData } = props

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return (
    <form className='form'>
      <div className='col'>
        <label>Исполнитель</label>
        <input type="text" name="fullname" placeholder="Исполнитель" defaultValue={data.fullname} onChange={onChangeHandler} />
      </div>
      <div className='col'>
        <label>Описание</label>
        <input type="text" name="description" placeholder="Описание" defaultValue={data.description} onChange={onChangeHandler} />
      </div>
    </form>
  )
}

export default ArtistForm
