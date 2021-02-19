import React from 'react';
import './CrewMainPage.scss';

import People from '../../static/images/GameInfo/player@3x.png';

const CrewMainPage = ({ crew }) => {
	return (
		<div className="CrewMainPage">
			<div className="CrewMainPage--Header">
				<div className="header--left">
					<div className="title">{!!crew && crew.name}</div>
					<div className="cnt">
						<img src={People} />
						{!!crew && crew.crew_cnt}명
					</div>
				</div>
				<div className="header--right">
					<div className="signup">가입하기</div>
				</div>
			</div>
			<div className="CrewMainPage--Introduce">
				<div className="bold--title">크루 설명</div>
				<div className="text">크루 설명이 없습니다</div>
			</div>
			<div className="CrewMainPage--Setting">
				<div className="bold--title">게임설정</div>
				<div className="text">게임설정이 없습니다</div>
			</div>
		</div>
	);
};

export default CrewMainPage;
