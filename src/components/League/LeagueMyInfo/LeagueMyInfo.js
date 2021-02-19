import React, { useState, useEffect } from 'react';

import myInfoPath from '../../../static/images/MobileMenu/mobileMenuImg2.svg';
import pc from '../../../static/images/Colleague/pc.svg';

import './LeagueMyInfo.scss';

const LeagueMyinfo = ({}) => {
	return (
		<div className="LeagueMyInfo">
			<div className="MyInfo--box">
				<div className="text">
					<img src={myInfoPath} />
					보유중인 패스
				</div>
			</div>
			<div className="MyInfo--box">
				<div className="text">
					<strong>1</strong>개
				</div>
			</div>
			<div className="MyInfo--box">
				<div className="text">
					<img src={pc} />
					나의 상금액
				</div>
			</div>
			<div className="MyInfo--box">
				<div className="text">
					<strong>20,000</strong>원
				</div>
			</div>
			<div className="MyInfo--box">
				<button>상금 환전하기</button>
				<button>패스 충전하기</button>
			</div>
			<div className="MyInfo__mobile">
				<div className="MyInfo__mobile--box">
					<img src={myInfoPath} />
					<div className="text">나의 보유 패스</div>
					<div className="count">
						<strong>1</strong>개
					</div>
					<button>충천</button>
				</div>
				<div className="MyInfo__mobile--box">
					<img src={pc} />
					<div className="text">나의 상금액</div>
					<div className="count">
						<strong>20,000</strong> 원
					</div>
					<button>충천</button>
				</div>
			</div>
		</div>
	);
};

export default LeagueMyinfo;
