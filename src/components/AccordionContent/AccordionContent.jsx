import React, { useState } from "react";
import classNames from "classnames";

import "./AccordionContent.scss";

const AccordionContent = ({ type, title, content, className }) => {
  
  // const [currentRow, setCurrentRow] = useState(false);

  return (
    <div className={classNames('AccordionContent',className)}>
        {
          type === "reward" && (
            <>
              <div className="AccordionContent--reward_title">{title}</div>
              <div className="AccordionContent--reward_content">{content}</div>
            </>
          )
        }
        {
          type === "inquirey" && (
            <>
              <div className="AccordionContent--inquirey_title">
                <div className="tag">123</div>
                <div className="title"><span>Q.</span></div>
                <div className="date"></div>
              </div>
              <div className="AccordionContent--inquirey_content">
              </div>
            </>
          )
        }
  </div>
  );
};

AccordionContent.defaultProps = {
  date: "YYYY-MM-DD", 
};

export default AccordionContent;


// <div className="AccordionContent-info">
        //   <div className="info-title">{title}</div>
        //   <div className="info-text">{text}</div>
        // </div>
        