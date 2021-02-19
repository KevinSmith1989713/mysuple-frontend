import React from 'react';
import './CuratingPostedCard.scss';
import NoImage from '../../static/images/Card/no_image@3x.png'

const CuratingPostedCard = ({ gameInfo, }) => {
  return (
    <div className="CuratingPostedCard">
      <div className="CuratingPostedCard--poster">
        <img className="poster" src={NoImage}/>
      </div>
      <div className="CuratingPostedCard--info">
        <div className="explain">이 게임은 영국에서 시작되었으며 플레이 하는 사람들에게 행운을 가져다 주었습니다 당신도 이 게임을 플레이 해 보세요</div>
        <div className="tag">#어쩌고</div>
      </div>
    </div>
  )
}


export default CuratingPostedCard;
