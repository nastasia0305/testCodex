import React from 'react'

import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <Link to="/artist">Исполнители</Link>
      <Link to="/song">Песни</Link>
    </header>
  )
}

export default Header
