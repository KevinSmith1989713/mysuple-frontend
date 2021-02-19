
import React, { useState } from 'react';

import './CommunityHeader.scss';
import Title from '../../components/Title/Title';
import People from '../../static/images/GameInfo/player@3x.png'
import { ReactComponent as BlueGear } from '../../static/images/Community/Bluegear.svg'
import { Link } from "react-router-dom"
import {ReactComponent as Alarm} from '../../static/images/Card/Alarm.svg'
import {ReactComponent as Alarmd} from '../../static/images/Card/Alarmd.svg'

const CommunityHeader = ({
  communityInfo,
  headerBackImg,
  match,
  ...rest
}) => {
  const [ subscribe, setSubscribe ] = useState(false);
	return (
		<Link to={`/community/official/${match.id}`} className="CommunityHeader">
      <div className="CommunityHeader--background">
        <div className="bg--opacity"/>
        <img src={headerBackImg} className="bg--img"/>
      </div>
      <div className="CommunityHeader--info">
        <div className="logo">
          <img src= {communityInfo.logo} className="bg--img"/>  
        </div>
        <div className="info">
          <div className="title">
            <Title size="large" border="no">
              {communityInfo.community_title}
            </Title>
          </div>
          <div className="official">
            {communityInfo.isOfficial ? '공식 커뮤니티' : '비공식 커뮤니티'}
          </div>
          <div className="cnt">
            <img className="cnt__player" src={People}/>
            {communityInfo.community_join_cnt} 명
          </div>
        </div>
        <div className="CommunityHeader--buttons">
          <div className="alarm--btn" onClick={()=>{setSubscribe(!subscribe)}}>
            {
              subscribe ? <Alarmd/> : <Alarm/>
            }
          </div>
          <Link to={`/community/official/${match.id}/setting`} className="setting--btn">
            <BlueGear/>
          </Link>
        </div>
      </div>
    </Link>
	);
};

export default CommunityHeader;
