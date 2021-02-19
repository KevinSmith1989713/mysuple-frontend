import React,{ useState } from 'react';
import './GoodBye.scss';
import Title from '../../../components/Title/Title';
import WithdrawImage from '../../../static/images/Withdraw/withdrawPoster.png';

const GoodBye = ({ userInfo, onClick }) => {
	return (
		<div className="GoodBye">
  		<div className="GoodBye--Header">
				<div className="title">자동처리 방지를 위해</div>
				<div className="title"><span className="blue">‘슈퍼플레이어 그만할래요’</span> 를 쳐 주세요</div>
      </div>
			<div className="GoodBye--Input">
				<input type="text" className="withdraw--text"/>
      </div>
			<div className="GoodBye--Btn" onClick={()=>onClick('withdraw')}>
				회원탈퇴
      </div>
			<div className="GoodBye--Poster">
				<img src={WithdrawImage}/>
      </div>

		</div>
	);
};

export default GoodBye;

