import React from 'react';
import './Pagination.scss';

const Pagination = ({perPage, status, listCnt, changePage, children}) => {
  const listNum = Math.ceil(listCnt/perPage);

  return (
    <div className="Pagination">
      <div className="children__lists">{children}</div>
      <div className="pagination__num">
        {
          makeList(listNum).map(
            (pagination,index) => <span className={status===pagination ? 'page__seleccted' : 'page'}
            onClick={()=>changePage(pagination)} key={index}>{pagination}</span>)
        }
      </div>
    </div>
  )
}

const makeList = ( listNum ) => {
  const listArr = [];
  for( var i = 1; i<=listNum; i++){
    listArr.push(i)
  }
  return listArr;
}

export default Pagination;