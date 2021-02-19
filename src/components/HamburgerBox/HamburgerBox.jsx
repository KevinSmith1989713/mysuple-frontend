import React, { Fragment } from 'react';
import './HamburgerBox.scss';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoS } from '../../static/images/Logo_S.svg';
import { ReactComponent as Close } from '../../static/images/whiteClose.svg';

import { connect } from 'react-redux';
import { changeMenu, showHamburgur } from '../../store/Layout/Layout.store';

const HamburgurBox = ({ userInfo, sessionKey, isHamburgur, showHamburgur, changeMenu }) => {
	const menus = [
		{
			id: 0,
			name: '홈',
			key: 'home',
			href: '/',
		},
		{
			id: 1,
			name: '게임정보',
			key: 'info',
			href: '/info',
		},
		{
			id: 2,
			name: '추천',
			key: 'recommend',
			href: '/recommend',
		},
		{
			id: 3,
			name: '커뮤니티',
			key: 'community',
			href: '/community',
		},
	];
	// targetElement.ontouchend = (e) => {
  //   e.preventDefault();
	// }
	return (
		isHamburgur && (
			<Fragment>
				<div className="HamburgurBox--BG" onClick={()=>showHamburgur(false)}></div>
				<div className="HamburgurBox">
					<div className="HamburgurBox--Header">
						<div className="Header--close" onClick={()=> showHamburgur(false)}>
							<Close className="CLOSE"/>
						</div>
						<div className="Header--logo">SUPER PLAYER<LogoS className="LOGO"/></div>
						
					</div>
						{
							!!sessionKey ? (
								<div className="HamburgurBox--Profile">
									<div className="HamburgurBox--info">
										<img className="info--profile" src={userInfo.avatarUrl}/>
										<div className="info--name">
											<p className="blue--title">Name/성명</p>
											<div className="name">{userInfo.nickName}</div>
										</div>
									</div>
									<div className="HamburgurBox--stamp">ㅊ
										<div className="stamp--Btn attendance">
											출석체크 
											<span className="cnt">
												(<span className="blue">{userInfo.compensation.attendance%10}</span>/10)
											</span>
										</div>
										<div className="stamp--Btn stamp">
											<span className="stamp">
												우표
											</span>
											<span className="cnt">
												(<span className="blue">{(userInfo.compensation.attendance/10).toFixed(0)}</span>/10)
											</span>
										</div>
										
									</div>
								</div>		
							) : (
								<div className="HamburgurBox--Profile">
									<Link to='/'>
										<div className="HamburgurBox--info" onClick={()=>{changeMenu('login');showHamburgur(false);}}>
											<div className="info--name">
												<div className="name">로그인이 필요해요!</div>
												<p className="blue--title">로그인 하기 ></p>
											</div>
										</div>
									</Link>
								</div>
							)
						}
						
							
					<div className="HamburgurBox--Menus">
						{
							menus.map(menu => {
								return (
									<Link to={menu.href} onClick={()=> {changeMenu(menu.key);showHamburgur(false)}}>
										<div className="menu">{menu.name}</div>
									</Link>
								)
							})
						}
					</div>
				</div>
			</Fragment>
		)	
	);
};

const mapStateToProps = state => {
	return {
		isHamburgur: state.layout.isHamburgur,
		sessionKey: state.auth.sessionKey,
		userInfo : state.auth.userInfo,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		showHamburgur: isHamburgur => dispatch(showHamburgur(isHamburgur)),	
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(HamburgurBox);
