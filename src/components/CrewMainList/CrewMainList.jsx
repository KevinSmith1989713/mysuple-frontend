import React from 'react';
import './CrewMainList.scss';

import { ReactComponent as Voice } from '../../static/images/Chatting/Notice.svg'
import { ReactComponent as Posts } from '../../static/images/Chatting/NoticeBox.svg'
import { ReactComponent as Home } from '../../static/images/Chatting/HomeGray.svg'
import People from '../../static/images/GameInfo/player@3x.png'

const CrewMainList = ({ crewList, onClickRow }) => {
  return (
    <div className="CrewMainList">
      <div className="CrewMainList--Info" onClick={()=>onClickRow("crewMain")}>
        <div className="name"><Home/>{crewList.name}</div>
        <div className="cnt"><img src={People}/>{crewList.crew_cnt}</div>
      </div>
      <div className="CrewMainList--List">
        {
          crewList.crew_main.map( (row, index) => {
            return (
              <div className="crew--row" onClick={()=>onClickRow(row.type)}>
                {row.type === 'voice' && <span className="notice"><Voice/></span>}
                {row.type === 'chatting' && <span className="channel">#</span>}
                {row.type === 'notice' && <span className="channel"><Posts/></span>}
                {row.title}
              </div>
            )
          })
        }
      </div>

      
    </div>
  )
}

export default CrewMainList;