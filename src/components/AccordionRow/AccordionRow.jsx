import React, { useState } from "react";
import classNames from "classnames";

import "./AccordionRow.scss";

const AccordionRow = ({ type, date, category, title, content, state, rewardType, children, className, }) => {
  
  const [currentRow, setCurrentRow] = useState(false);

  return (
    <div className={classNames('AccordionRow',className)}>
      <div className={classNames('AccordionRow--row', `row-`+type)} onClick={()=>setCurrentRow(!currentRow)}>
        {
          type === "reward" && (
            <>
            <div className="row-date">{date}</div>
            <div className="row-content">{content}</div>
            <div className="row-rewardType">{rewardType}</div>
            <div className="row-state">
              <span className={ `state-`+state}>{state ? '답변완료' : '접수중' }</span>
            </div>
            </>
          )
        }
        {
          type === "inquirey" && (
            <>
            <div className="row-date">{date}</div>
            <div className="row-category">{category}</div>
            <div className="row-title">{title}</div>
            <div className="row-state">
              <span className={ `state-`+state}>{state ? '보상완료' : '보상취소' }</span>
            </div>
            </>
          )
        }
      </div>
      {
        currentRow && children
      }
  </div>
  );
};

AccordionRow.defaultProps = {
  date: "YYYY-MM-DD", 
};

export default AccordionRow;


// <div className="AccordionRow-info">
        //   <div className="info-title">{title}</div>
        //   <div className="info-text">{text}</div>
        // </div>
        