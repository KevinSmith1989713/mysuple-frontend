import React, { useState, useEffect } from 'react';

import './HeaderMenu.scss';
import { ReactComponent as Logo } from '../../static/images/Superplayer_L.svg';
import { ReactComponent as LogoS } from '../../static/images/Logo_S.svg';
import { ReactComponent as Logo_mobile } from '../../static/images/Superplayer_L_Mobile.svg';
import { ReactComponent as Logo_White } from '../../static/images/Superplayer_L_Mobile_W.svg';

import { Link, useHistory } from 'react-router-dom';

import { connect, useSelector } from 'react-redux';

import { ReactComponent as Message } from '../../static/images/Header/WhiteMessage.svg';

import image1 from '../../static/images/Header/component-41-2.png';
import image3 from '../../static/images/Header/component-44-2.png';
import image2 from '../../static/images/Header/component-45-2.png';

import profile from '../../static/images/iconbox/Profile.svg';
import Messenger from '../../static/images/MobileMenu/messenger.svg';
import SearchIcon from '../../static/images/MobileMenu/search.svg';
import SearchIconWhite from '../../static/images/MobileMenu/search_white.svg';

import MenuBar from '../../static/images/MobileMenu/menuBar.svg';
import MenuBarWhite from '../../static/images/MobileMenu/menuBar_white.svg';

import ModalBullon from '../ModalBullon/ModalBullon';
import SearchModal from '../SearchModal/SearchModal';

import HeaderChattingModal from '../HeaderChattingModal/HeaderChattingModal';
import MenuMobile from '../MenuMobile';
import {
	changeMenu,
	showHamburgur,
	changeProfileSubMenu,
} from '../../store/Layout/Layout.store';
import { getParticipatList } from '../../store/League/League.store';
import { reqMyContantsList } from '../../store/MyPage/MyPage.store';
import { signOut } from '../../store/Auth/Auth.store';
import { initCount, reqAllSearch } from '../../store/GameInfo/GameInfo.store';
import { isChatModalState } from '../../store/Chatting/Chatting.store';
import Media from 'react-media';

const HeaderMenu = ({
	changeMenu,
	showHamburgur,
	match,
	pathname,
	sessionKey,
	signOut,
	initCount,
	changeProfileSubMenu,
	reqAllSearch,
	myContantsList,
	reqMyContantsList,
	participatList,
	getParticipatList,
	passCount,
	isChatModalState,
	chatModalState,
}) => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isChatOpen, setChatOpen] = useState(false);
	const [isSearchOpen, setSearchOpen] = useState(false);
	// const userInfo = useSelector(state => state.auth.userInfo, []);

	const menus = [
		{
			id: 1,
			name: '게임정보',
			key: 'info',
			href: '/info',
		},
		{
			id: 2,
			name: '리그',
			key: 'league',
			href: '/league',
		},
		{
			id: 3,
			name: '동료찾기',
			key: 'colleague',
			href: '/colleague',
		},
		{
			id: 4,
			name: '커뮤니티',
			key: 'community',
			href: '/community',
		},
	];

	const icons = [
		{
			id: 1,
			key: 'chat',
			functions: () => null,
			href: pathname,
		},
		{
			id: 2,
			key: 'login',
			isLoginKey: 'profile',
			image: profile,
			href: '/',
		},
		{
			id: 3,
			image: SearchIcon,
			functions: () => null,
			href: pathname,
		},
	];
	const reloadWindow = href => {
		if (window.location.pathname === href) {
			window.location.reload();
		}
	};

	let history = useHistory();

	useEffect(() => {
		if (sessionKey) {
			try {
				localStorage.setItem('sessionKey', JSON.stringify(sessionKey));
			} catch (e) {
				console.log(e);
			}
		}
	}, [sessionKey]);

	const getUserInfo = JSON.parse(localStorage.getItem('data'));

	return (
		<>
			<div className="HeaderMenu">
				{!pathname.split('/')[3] && (
					<>
						<img src={image1} className="HEADERMENU-image HEADERMENU-image1" />
						<img src={image2} className="HEADERMENU-image HEADERMENU-image2" />
						<img src={image3} className="HEADERMENU-image HEADERMENU-image3" />
					</>
				)}

				<div className="HeaderMenu--menu">
					<img
						src={window.location.pathname === '/' ? MenuBarWhite : MenuBar}
						onClick={() => {
							!!sessionKey ? setMobileMenuOpen(true) : changeMenu('login');
							history.push('/');
						}}
						onClick={() => {
							setMobileMenuOpen(true);
						}}
					/>
					{mobileMenuOpen && (
						<MenuMobile
							close={() => setMobileMenuOpen(!mobileMenuOpen)}
							changeMenu={changeMenu}
							mobileMenuOpen={mobileMenuOpen}
							changeProfileSubMenu={changeProfileSubMenu}
							myContantsList={myContantsList}
							reqMyContantsList={reqMyContantsList}
							participatList={participatList}
							getParticipatList={getParticipatList}
							passCount={passCount}
						/>
					)}
				</div>
				<Link to="/" className="Logos" onClick={() => changeMenu('home')}>
					<LogoS className="LOGOS logos" />

					{window.innerWidth < 769 ? (
						window.location.pathname === '/' ? (
							<Logo_White className="LOGOS logo" />
						) : (
							<Logo_mobile className="LOGOS logo" />
							// <Logo_White className="LOGOS logo" />
						)
					) : (
						<Logo className="LOGOS logo" />
					)}
				</Link>
				<div className="HeaderMenu--search">
					<img
						src={Messenger}
						onClick={() => {
							return !!getUserInfo && getUserInfo.id
								? isChatModalState(!chatModalState)
								: changeMenu('login');
						}}
					/>
				</div>
				<ul>
					{menus.map(item => {
						return (
							<Link to={item.href} key={item.id}>
								<li
									onClick={() => {
										initCount();
										changeMenu(item.key);
										reloadWindow(item.href);
									}}
								>
									{item.name}
								</li>
							</Link>
						);
					})}
				</ul>
				<div className="HeaderMenu--iconbox">
					{icons.map((item, idx) => {
						return (
							<>
								{!!getUserInfo && getUserInfo.id ? (
									<>
										{item.id === 1 ? (
											<Message
												key={idx}
												onClick={() => {
													!!getUserInfo && getUserInfo.id
														? isChatModalState(!chatModalState)
														: changeMenu('login');
												}}
											/>
										) : (
											<img
												className="img"
												onClick={item.functions}
												src={item.image}
												onClick={
													!!item.key && !!getUserInfo && getUserInfo.id
														? () => setMenuOpen(!isMenuOpen)
														: !!item.key && !sessionKey
														? () => changeMenu(item.key)
														: () => setSearchOpen(!isSearchOpen)
												}
											/>
										)}
									</>
								) : (
									<>
										<Link to={item.href} key={item.id}>
											{item.id === 1 ? (
												<Message
													onClick={() => {
														!!getUserInfo && getUserInfo.id
															? isChatModalState(!chatModalState)
															: changeMenu('login');
													}}
												/>
											) : (
												<img
													className="img"
													onClick={item.functions}
													src={item.image}
													onClick={
														!!item.key && !!getUserInfo && getUserInfo.id
															? () => setMenuOpen(!isMenuOpen)
															: !!item.key && !sessionKey
															? () => changeMenu(item.key)
															: () => setSearchOpen(!isSearchOpen)
													}
												/>
											)}
										</Link>
									</>
								)}
							</>
						);
					})}
					<ModalBullon
						sessionKey={sessionKey}
						visible={isMenuOpen}
						changeMenu={changeMenu}
						signOut={signOut}
						setMenuOpen={setMenuOpen}
						changeProfileSubMenu={changeProfileSubMenu}
						// userInfo={userInfo}
					/>
					<HeaderChattingModal
						visible={chatModalState}
						close={() => setChatOpen(false)}
					/>
				</div>
				<SearchModal
					isOpen={isSearchOpen}
					close={() => isChatModalState(false)}
					reqAllSearch={reqAllSearch}
				/>
			</div>
			<Media query={{ maxWidth: 768 }}>
				<>
					<div className={`SubHeader ${pathname !== '/' ? 'null' : 'none'}`}>
						{menus.map(item => {
							return (
								<Link to={item.href} key={item.id}>
									<div
										onClick={() => {
											initCount();
											changeMenu(item.key);
										}}
										className={
											pathname === item.href
												? 'menu--Mobile selected'
												: 'menu--Mobile'
										}
									>
										{item.name}
									</div>
								</Link>
							);
						})}
					</div>
					<HeaderChattingModal
						visible={chatModalState}
						close={() => isChatModalState(false)}
					/>
				</>
			</Media>
		</>
	);
};

const mapStateToProps = state => {
	return {
		// userInfo: state.auth.userInfo,
		pathname: state.router.location.pathname,
		sessionKey: state.auth.sessionKey,
		myContantsList: state.myPage.myContantsList,
		participatList: state.league.participatList,
		passCount: state.auth.passCount,
		chatModalState: state.chatting.chatModalState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		showHamburgur: isHamburgur => dispatch(showHamburgur(isHamburgur)),
		signOut: () => dispatch(signOut()),
		initCount: () => dispatch(initCount()),
		changeProfileSubMenu: menu => dispatch(changeProfileSubMenu(menu)),
		reqAllSearch: text => dispatch(reqAllSearch(text)),
		reqMyContantsList: () => dispatch(reqMyContantsList()),
		getParticipatList: () => dispatch(getParticipatList()),
		isChatModalState: info => dispatch(isChatModalState(info)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu);
