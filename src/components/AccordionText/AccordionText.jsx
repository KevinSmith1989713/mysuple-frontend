import React, { useState } from "react";
import classNames from "classnames";

import "./AccordionText.scss";

const AccordionText = ({ type, className, children}) => {
  
  const [expand, setExpand] = useState(false);

  return (
    <div className={classNames('AccordionText',className)}>
      <div className={expand ? 'expand--text' : 'text'}>
        {children}
      </div>
      <div className='more' onClick={()=>setExpand(!expand)}>
        { expand ? '접기' : '더 보기' }
      </div>
    </div>
  );
};

AccordionText.defaultProps = {
  date: "YYYY-MM-DD", 
};

export default AccordionText;


// <div className="AccordionText-info">
        //   <div className="info-title">{title}</div>
        //   <div className="info-text">{text}</div>
        // </div>
        