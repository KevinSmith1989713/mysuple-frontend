import React,{ useState } from 'react';
import './RewardRow.scss';

const RewardRow = ({ date, title, rewardType, etc, text }) => {

  const [currentRow, setCurrentRow] = useState(false);

  return (
    <>
      <div className="RewardRow-row" onClick={()=>setCurrentRow(!currentRow)}>
        <div className="date">{date}</div>
        <div className="text">{title}</div>
        <div className="reward">{rewardType}</div>
        <div className="remark">{etc}</div>
      </div>
      {
        currentRow ? (
        <div className="RewardRow-row-info">
          <div className="info-title">{title}</div>
          <div className="info-text">{text}</div>
        </div>
        )
        : null
      }
  </>

  );
};

export default RewardRow;
