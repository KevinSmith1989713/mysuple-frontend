import React, { useState } from 'react';
import classNames from "classnames";
import "./ShowHide.scss";

import Upper from '../../static/images/iconbox/UpperArrow.svg'
import Lower from '../../static/images/iconbox/LowerArrow.svg'

const ShowHide = ({ children, className, fold, arrowPosition, text }) => {
  const [ folding, setFolding ] = useState(fold)
  
  const setFold = () => {
    setFolding(folding=>!folding);
  }

  return (
    <div className={classNames("ShowHide", fold, arrowPosition, className, text)}>
      <div className="text" onClick={setFold}>
        {arrowPosition==="left" && <img src={folding ? Upper : Lower}/>}
        {text}
        {arrowPosition==="right" && <img src={folding ? Upper : Lower}/>}
      </div>
      {folding && children}
    </div>
  );
};

ShowHide.defaultProps = {
  arrowPosition: 'left',
  fold: true,
  text: "If you want to change here, set 'text' class name:))"
};

export default ShowHide;
