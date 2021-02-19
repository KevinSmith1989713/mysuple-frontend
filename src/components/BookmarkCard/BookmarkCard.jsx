import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import Tag from '../../static/images/Card/tag@3x.png';
import {ReactComponent as WhiteCheck} from '../../static/images/Card/WhiteCheck.svg';

import './BookmarkCard.scss';

const BookmarkCard = ({
	info, mode, selected
}) => {

  // const [modeState, setMode] = useState(mode);
  const [checked, setChecked] = useState(false);

  
  const onClickCard = () => {
    if(mode) {
      setChecked(!checked)
      selected(info.id, !checked)
    }
  }
  

  function checkedIcon () {
    return(
      <div className="checked-icon">
        <WhiteCheck/>
      </div>
    )
  }

	return (
		<div className='BookmarkCard'
         onClick={ ()=>{ onClickCard()}}
         style={{ backgroundImage:`url(https://4.bp.blogspot.com/-gXeRoUFP2sc/WSwBfZ3zJbI/AAAAAAAAEvA/111096qV2Ekxs3ulwVLqjMJQs9jh_7CLQCLcB/s1600/prey%25281%2529.jpg)`
                 ,backgroundSize:'cover'
                 ,backgroundPosition:'center'  
                }} >
      {
        mode === true
          ? checked 
            ? checkedIcon() 
            : <div className="blur"/> 
          : null
      }
      <div className="BookmarkCard--title">
        {info.title}
      </div>
    
		</div>
	);
};


export default BookmarkCard;
