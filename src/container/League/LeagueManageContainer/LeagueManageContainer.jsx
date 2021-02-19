import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Bubble from '../../../static/images/League/bubbleChat.svg';
import Photo from '../../../static/images/League/photo.svg';
import Receipt from '../../../static/images/League/receipt.svg';
import People from '../../../static/images/League/peopleGray.svg';

import MenuBar from '../../../static/images/MobileMenu/menuBar_black.svg';
import closeBtnGray from '../../../static/images/closeBtnGray.svg';

import './LeagueManageContainer.scss';

const Menus = [
	{
		name: '리그정보',
		icon: Photo,
		sub: [
			{
				id: 'leagueInfo',
				name: '리그정보',
			},
		],
	},
	{
		name: '공지사항',
		icon: Receipt,
		sub: [
			{
				id: 'leagueNotice',
				name: '공지사항 관리',
			},
		],
	},
	{
		name: '배치도',
		icon: Receipt,
		sub: [
			{
				id: 'leagueTournament',
				name: '배치도 관리',
			},
		],
	},
	{
		name: '참가자 관리',
		icon: Bubble,
		sub: [
			{
				id: 'participantManage',
				name: '참가자 관리',
			},
		],
	},
	// {
	// 	name: '리그관리',
	// 	icon: People,
	// 	sub: [
	// 		{
	// 			id: 'leageueManageManage',
	// 			name: '리그관리',
	// 		},
	// 	],
	// },
];
const LeagueManageContainer = ({ children, insertLeagueInfo }) => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return (
		<div className="LeagueManageContainer">
			{window.innerWidth < 769 ? (
				<header className="LeagueManageContainer__header__mobile">
					<Link to={`/league/${window.location.pathname.split('/')[2]}`}>
						<button className="manage__back">{'<'}</button>
					</Link>
					<Link to={`/league/${window.location.pathname.split('/')[2]}`}>
						<button className="header_-button">
							{!insertLeagueInfo &&
							insertLeagueInfo.league_titlet &&
							insertLeagueInfo &&
							insertLeagueInfo.league_title.length > 29
								? `${!!insertLeagueInfo &&
										insertLeagueInfo.league_title &&
										insertLeagueInfo &&
										insertLeagueInfo.league_title.substring(0, 30)}...`
								: insertLeagueInfo && insertLeagueInfo.league_title}
						</button>
						<b>관리자 페이지</b>
					</Link>
					<button>
						<img
							className="menuBar"
							src={MenuBar}
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						/>
					</button>
				</header>
			) : (
				<header className="LeagueManageContainer__header">
					<Link to={`/league/${window.location.pathname.split('/')[2]}`}>
						<button className="header_-button">
							{insertLeagueInfo && insertLeagueInfo.league_title}{' '}
							<b>관리자 페이지</b>
						</button>
					</Link>
				</header>
			)}

			<div className="main">
				<div className="menuBoard">
					{Menus.map((menu, index) => {
						return (
							<div className="Menu" key={index}>
								<div className="Menu--top">
									<img className="img" src={menu.icon} />
									{menu.name}
								</div>
								<div className="Menu--bottoms">
									{menu.sub.map((sub, index) => {
										return (
											<Link
												to={`./${sub.id}`}
												className={
													window.location.pathname.split('/')[3] === `${sub.id}`
														? 'Menu--buttom selected'
														: 'Menu--buttom '
												}
												key={index}
											>
												{sub.name}
											</Link>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>

				<div className="contantsBoard">
					<div className="board">
						<div className="title">
							{window.location.pathname.split('/')[3] === 'participantManage' &&
								'참가자 관리'}
							{window.location.pathname.split('/')[3] ===
								'participantApplication' && '참가 신청'}
							{window.location.pathname.split('/')[3] === 'leagueTournament' &&
								'배치도 관리'}
							{window.location.pathname.split('/')[3] === 'leagueNotice' &&
								'공지사항 관리'}
							{window.location.pathname.split('/')[3] === 'leagueInfo' &&
								'리그 정보'}
						</div>
						{children}
					</div>
				</div>
			</div>
			{mobileMenuOpen ? (
				<div
					className="manage-menu--wrapper "
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					<div className={`menu--wrapper`}>
						<header>
							<div className="mobile-logo">
								{!insertLeagueInfo &&
								insertLeagueInfo.league_titlet &&
								insertLeagueInfo &&
								insertLeagueInfo.league_title.length > 29
									? `${!!insertLeagueInfo &&
											insertLeagueInfo.league_title &&
											insertLeagueInfo &&
											insertLeagueInfo.league_title.substring(0, 30)}...`
									: insertLeagueInfo && insertLeagueInfo.league_title}
							</div>
							<b>관리자 페이지</b>
							<img
								src={closeBtnGray}
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							/>
						</header>
						<main>
							<div className="mobile-menuBoard">
								{Menus.map((menu, index) => {
									return (
										<div className="Menu" key={index}>
											<div className="Menu--top">
												<img className="img" src={menu.icon} />
												{menu.name}
											</div>
											<div className="Menu--bottoms">
												{menu.sub.map((sub, index) => {
													return (
														<Link
															to={`./${sub.id}`}
															className={
																window.location.pathname.split('/')[3] ===
																`${sub.id}`
																	? 'Menu--buttom selected'
																	: 'Menu--buttom '
															}
															key={index}
														>
															{sub.name}
														</Link>
													);
												})}
											</div>
										</div>
									);
								})}
							</div>
						</main>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default LeagueManageContainer;
