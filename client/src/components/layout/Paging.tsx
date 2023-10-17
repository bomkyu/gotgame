import React, { useState } from 'react'
import { PagingProps } from '../../interface';
import style from './paging.module.css'
const Paging = ({totalPages, currentPage, goToPreviousPage, goToNextPage, displayedPages, setCurrentPage} : PagingProps) => {

    
  return (
    <div className={style.pagination}>
    
    {currentPage > 1 && (<button onClick={goToPreviousPage} className={style['btn-previous']}></button>)}

    {displayedPages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={pageNumber === currentPage ? style['active'] : ''}
        >
          {pageNumber}
        </button>
      ))
    }

    {currentPage < totalPages && (<button onClick={goToNextPage} className={style['btn-next']}></button>)}
      
    </div>
  );
}

export default Paging