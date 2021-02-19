import React, { useEffect, useState } from 'react';

import closeBtnGray from '../../static/images/closeBtnGray.svg';
import { ReactComponent as LogoS } from '../../static/images/Logo_S.svg';
import myInfo1 from '../../static/images/MobileMenu/mobileMenuImg1.svg';
import myInfo2 from '../../static/images/MobileMenu/mobileMenuImg2.svg';
import myInfo3 from '../../static/images/MobileMenu/mobileMenuImg3.svg';
import home from '../../static/images/MobileMenu/home.svg';
import gameInfo from '../../static/images/MobileMenu/gameInfo.svg';
import league from '../../static/images/MobileMenu/league.svg';
import findColleague from '../../static/images/MobileMenu/findColleague.svg';
import profile from '../../static/images/MobileMenu/profile-img.svg';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';
import community from '../../static/images/MobileMenu/community.png';

import { Link, useHistory } from 'react-router-dom';
import './MenuMobile.scss';

const MenuMobile = ({
	close,
	// userInfo,
	changeMenu,
	sessionKey,
	mobileMenuOpen,
	myContantsList,
	changeProfileSubMenu,
	reqMyContantsList,
	participatList,
	getParticipatList,
	passCount,
}) => {
	let history = useHistory();
	const getUserInfo = JSON.parse(localStorage.getItem('data'));

	useEffect(() => {
		getUserInfo === null ? '' : getParticipatList();
	}, []);

	const data = [
		{
			img: myInfo2,
			info: passCount,
			function: () => {},
		},
		{
			img: myInfo1,
			info: participatList.length,
			function: () => {},
		},
		{
			img: myInfo3,
			info: myContantsList && myContantsList.length,
			function: () => {
				changeMenu('profile');
				changeProfileSubMenu('myWriting');
			},
		},
	];

	const pageData = [
		{
			img: home,
			name: '홈',
			functions: () => {
				changeMenu('home');
				close();
			},
			href: '/',
		},
		{
			img: league,
			name: '게임정보',
			functions: () => {
				close();
			},
			href: '/info',
		},
		{
			img: gameInfo,
			name: '리그',
			functions: () => {
				close();
			},
			href: '/league',
		},
		{
			img: findColleague,
			name: '동료찾기',
			functions: () => {
				close();
			},
			href: '/colleague',
		},
		{
			img: community,
			name: '커뮤니티',
			functions: () => {
				close();
			},
			href: '/community',
		},
	];

	useEffect(() => {
		reqMyContantsList();
	}, []);

	return (
		<div className="mobile-menu--wrapper " onClick={() => close()}>
			<div className={`menu--wrapper`}>
				<header>
					<img src={closeBtnGray} onClick={() => close()} />
					<div className="mobile-logo">
						SUPER PLAYER
						<LogoS className="logo" />
					</div>
				</header>
				<main>
					{getUserInfo === null ? (
						<div className="basic-view">
							<div className="img--box">
								<img src={profile} />
								<div>
									<div className="text1">안녕하세요</div>
									<div className="text2">슈퍼플레이어님</div>
								</div>
							</div>
							<button
								onClick={() => {
									history.push('/');
									changeMenu('join');
									close();
								}}
							>
								로그인
							</button>
							<button
								onClick={() => {
									history.push('/');
									changeMenu('join');
									close();
								}}
							>
								회원가입
							</button>
						</div>
					) : (
						<div className="myInfo--wrapper">
							<div className="myInfo--box">
								<Link to={'/'}>
									<img
										className="myImg"
										src={
											!!getUserInfo && getUserInfo.avatarUrl
												? getUserInfo.avatarUrl
												: defaultAvatar
										}
										onClick={() => {
											changeMenu('profile');
											close();
										}}
									/>
								</Link>
								<div className="name--box">
									<div className="name-title">Name/성명</div>
									<Link to={'/'}>
										<div
											className="name"
											onClick={() => {
												changeMenu('profile');
												close();
											}}
										>
											{!!getUserInfo && getUserInfo.nickName}
										</div>
									</Link>
									<div className="selected-info--box">
										{data.map((item, index) => {
											return (
												<>
													<Link to={'/'}>
														<div
															className="img--box"
															key={index}
															onClick={() => item.function()}
														>
															<img
																className="myInfo-img"
																src={item.img}
																alt="myInfoImg"
															/>
															{item.info}
														</div>
													</Link>
												</>
											);
										})}
									</div>
								</div>
							</div>
							<button onClick={() => history.push('/pay')}>
								패스 충전하기
							</button>
						</div>
					)}

					{pageData.map((item, index) => {
						return (
							<Link to={item.href} key={index}>
								<div className="pageMove--box" onClick={() => item.functions()}>
									<img className="page-img" src={item.img} alt="pageImg" />
									{item.name}
								</div>
							</Link>
						);
					})}
				</main>
			</div>
		</div>
	);
};

export default MenuMobile;
