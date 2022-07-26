import React, {useEffect, useState} from "react";

function Filter(props) {
  const { role, onChange } = props;

  const [field, setField] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    switch (role) {
      case 'artist':
        setField('fullname');
        break;
      case 'song':
        setField('title');
        break;
      default:
        break;
    }
  }, [role])

  const renderSearchField = () => {
    return <input type={field === 'createdAt' ? 'date' : 'text'} placeholder='Поиск' name="search" value={search} onChange={(event) => setSearch(event.target.value)} />
  }

  const renderSearchButton = () => {
    return <button onClick={() => onChange({field, search})}>Поиск</button>
  }
  const renderResetButton = () => {
    return <button onClick={() => {
      onChange({field: '', search: ''})
      setSearch('')
    }}>Очистить</button>
  }

  switch (role) {
    case 'artist': {
      return <div className="filter">
        <select name="field" onChange={(event) => setField(event.target.value)}>
          <option value="fullname">Исполнитель</option>
          <option value="createdAt">Дата внесения</option>
        </select>
        {renderSearchField()}
        {renderSearchButton()}
        {renderResetButton()}
      </div>
    }

    case 'song': {
      return <div className="filter">
        <select name="field" onChange={(event) => setField(event.target.value)}>
          <option value="title">Название</option>
          <option value="createdAt">Дата внесения</option>
        </select>
        {renderSearchField()}
        {renderSearchButton()}
        {renderResetButton()}
      </div>
    }

    default: {
      break;
    }
  }
}

export default Filter
