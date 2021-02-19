import React, { useState } from 'react';
import './MypageSubHeader.scss';

const MypageSubHeader = ({ children, tabs, parentCallback }) => {
  const [selected, isSelected] = useState(0);
	return (
		<div className="MypageSubHeader" >
			<div className="MypageSubHeader--nav">
        {
          tabs.map((tab, index) => {
            return (
              <div className={selected === index ? "nav-btn__selected" : "nav-btn"} 
                id={tab.id}
                onClick={()=>{isSelected(index); parentCallback(index);}}
                key={index}>
                {tab.title}
              </div> 
            )
          })
        }
         
        </div>
		</div>);
};

export default MypageSubHeader;
