import React from 'react';
import './Account.scss';
import Passport from '../../../components/Passport/Passport';

import Google_L from '../../../static/images/SNSLogin/google.png';

const Account = ({
	userInfo,
	onClick,
	reqProfileUpdate,
	onClickChangeMenu,
	myContantsList,
	reqMyContantsList,
	changeProfileSubMenu,
	changeMenu,
}) => {
	return (
		<div className="Account">
			<div className="Border">
				<Passport
					onClickChangeMenu={onClickChangeMenu}
					myContantsList={myContantsList}
					onClick={onClick}
					reqProfileUpdate={reqProfileUpdate}
					reqMyContantsList={reqMyContantsList}
					changeProfileSubMenu={changeProfileSubMenu}
					changeMenu={changeMenu}
				/>
				{/* <div className="path--content">
					<div className="path--box">
						<div className="text--box">
							<div className="text">
								<img src={Google_L} alt="path" />
								보유중인 패스
							</div>
							<div className="text">
								<strong>1</strong> 개
							</div>
						</div>
						<button>패스 충천하기</button>
					</div>
					<div className="path--box">
						<div className="text--box">
							<div className="text">
								<img src={Google_L} alt="path" />
								나의 상금액
							</div>
							<div className="text">
								<strong>20,000</strong> 원
							</div>
						</div>
						<button>상금 환전하기</button>
					</div>
				</div>
				<div className="path-mobile--content">
					<div className="text--box">
						<div className="text">
							<img src={Google_L} alt="path" />
							나의 보유 패스
						</div>
						<div className="btn--box">
							<div className="text">
								<strong>1</strong> 개
							</div>
							<button>충천</button>
						</div>
					</div>
					<div className="text--box">
						<div className="text">
							<img src={Google_L} alt="path" />
							나의 상금액
						</div>
						<div className="btn--box">
							<div className="text">
								<strong>20,000</strong> 원
							</div>
							<button>환전</button>
						</div>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default Account;
