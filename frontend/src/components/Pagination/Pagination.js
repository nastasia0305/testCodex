import React, {useState, useEffect} from "react";

import './index.css';

function Pagination(props) {
  const { total, limit, offset, onChange } = props;

  const [currentPage, setCurrentPage] = useState(Math.ceil(offset / limit) || 1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const tmpPages = []
    const totalPages = Math.ceil(total / limit);
    const chunk = 1;
    const from = Math.max(1, currentPage - chunk);
    const to = Math.min(totalPages, currentPage + chunk);
    for (let i = from; i <= to; i++) {
      tmpPages.push(i);
    }
    setPages(tmpPages);
  }, [total, limit, currentPage]);

  const renderArrow = (direction) => {
    const arrow = direction === 'left' ? '<' : '>';
    return (
      <span className="arrow">{arrow}</span>
    );
  }

  const changePage = (direction) => {
    const page = currentPage + (direction === 'left' ? -1 : 1);
    if (page >= 1 && page <= Math.ceil(total / limit)) {
      setCurrentPage(page);
      onChange((page - 1) * limit);
    }
  }

  const renderPages = () => {
    return pages.map((page, index) => {
      return (
        <li 
          key={index}
          className={page === currentPage ? 'active' : ''}
          onClick={() => {
            onChange((page - 1) * limit)
            setCurrentPage(page)
          }}
        >
          {page}
        </li>
      )
    })
  }

  return (
    <ul className="pagination">
      <li onClick={() => changePage('left')}>
        {renderArrow('left')}
      </li>
      {renderPages()}
      <li onClick={() => changePage('right')}>
        {renderArrow('right')}
      </li>
    </ul>
  )
}

export default Pagination;
