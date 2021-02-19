import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Media from 'react-media';
import { useHistory } from 'react-router-dom';

import {
	changeMenu,
	changeProfileSubMenu,
} from '../../../store/Layout/Layout.store';

import favorites from '../../../static/images/League/favorites.svg';
import share from '../../../static/images/League/share-social.svg';
import trophy from '../../../static/images/League/trophy.svg';
import grayPeople from '../../../static/images/League/grayPeople.svg';
import grayPath from '../../../static/images/League/grayPath.svg';
import settingImg from '../../../static/images/League/leageSetting.svg';
import noImg from '../../../static/images/League/league_noImage.svg';

import moment from 'moment';

import './LeagueBanner.scss';
const getUserInfo = JSON.parse(localStorage.getItem('data'));
const getUserInfo2 = JSON.parse(localStorage.getItem('data2'));

const LeagueBanner = ({
	insertLeagueInfo,
	attendModal,
	setAttendModal,
	shareModal,
	setShareModal,
	supportModal,
	setSupportModal,
	leagueParticipantsList,
	changeMenu,
	changeProfileSubMenu,
}) => {
	let history = useHistory();

	const date = moment(insertLeagueInfo.start_date).format('YYYY.MM.DD a h:mm ');

	const isPeople = () => {
		const arr = [];
		const result = leagueParticipantsList.map(item => {
			return item.join_type;
		});
		result.forEach(ele => {
			if (ele === 1) {
				arr.push(ele);
			}
		});
		return arr.length;
	};

	const checkId = () => {
		const result = leagueParticipantsList.map(item => {
			return item.nickname;
		});
		const idx = result.indexOf(getUserInfo.nickName);
		return idx;
	};

	const [day, setDay] = useState(0);
	const [hour, setHour] = useState(0);
	const [minute, setMinute] = useState(0);
	const [second, setSecond] = useState(0);

	const startDate = new Date(insertLeagueInfo.start_date);
	startDate.setDate(startDate.getDate() + 1);

	// 리그 신청일
	const applyStart = new Date(insertLeagueInfo.apply_start);

	// 리그 신청 마감일
	const applyEnd = new Date(insertLeagueInfo.apply_end);

	// 리그 시작일
	const start = new Date(insertLeagueInfo.start_date);

	let intervalId;

	// useEffect(() => {
	// 	intervalId = setInterval(() => {
	// 		countDayFN(applyEnd);
	// 	}, 1000);
	// }, [applyEnd]);

	const countDayFN = toDate => {
		const now = new Date(); // 현재의 날짜 객체를 생성해줍니다.
		let amount = toDate.getTime() - now.getTime(); // 목표날짜와 현재의 날짜의 gap 을 계산해줍니다.

		// time is already past
		if (amount < 0) {
			setDay(0);
			setHour(0);
			setMinute(0);
			setSecond(0);
			// 일, 시, 분, 초를 모두 0으로 셋팅해주고,
			clearInterval(intervalId);
			// intervalId 를 삭제시켜줌으로써 더이상의 함수 호출을 멈춰줍니다.
		} else {
			let day = 0;
			let hour = 0;
			let min = 0;
			let sec = 0;

			// 일, 시, 분, 초 를 모두 0으로 초기화시켜줍니다.
			amount = Math.floor(amount / 1000); // milliseconds 모두 지워줍니다.

			day = Math.floor(amount / 86400);
			// 하루는 총 86400 초이기 때문에 86400 으로 나눈 값이 d-day와의 남은 일수를 나타내줍니다.
			amount = amount % 86400;
			// 나머지값만 받아와줍니다.

			hour = Math.floor(amount / 3600);
			// 1시간은 총 3600 초이기 때문에 3600 으로 나눈 값이 d-day와의 남은 시간수를 나타내줍니다.
			amount = amount % 3600;
			// 나머지값만 받아와줍니다.

			min = Math.floor(amount / 60);
			// 1분은 총 60 초이기 때문에 60 으로 나눈 값이 d-day와의 남은 분 수를 나타내줍니다.
			amount = amount % 60;
			// 나머지값만 받아와줍니다.

			sec = Math.floor(amount);
			// 나머지 값은 남은 초가 됩니다.
			setDay(day);
			setHour(hour);
			setMinute(min);
			setSecond(sec);
		}
	};
	// console.log(applyEnd);

	// console.log(day);
	// console.log(hour);
	// console.log(minute);
	// console.log(second);

	const endDate = moment(insertLeagueInfo.apply_end).format(
		'YYYY.MM.DD a h:mm ',
	);
	const infoList = [
		{
			key: '종목',
			value: insertLeagueInfo.game_title_kr,
			id: 'leagueInfo',
		},
		{
			key: '구분',
			value: insertLeagueInfo.league_type === 1 ? '팀전' : '개인전',
			id: 'layout',
		},
		{
			key: '주최자',
			value: insertLeagueInfo.user_nickname,
			id: 'recruit',
		},
		{
			key: '신청마감',
			value: day > 0 ? `D - ${day}` : `${hour} : ${minute} : ${second}`,
			value: endDate,
			id: 'leaderBoard',
		},
		{
			key: '리그 시작일자',
			value: date,
			id: 'leaderBoard',
		},
		{
			key: '우승패스',
			value: `${insertLeagueInfo.reward} 개`,
			id: 'recruit',
			img: trophy,
		},
		{
			key: '총인원',
			value: `( ${isPeople()} / ${insertLeagueInfo.limit_people} )`,
			id: 'recruit',
			img: grayPeople,
		},
	];

	return (
		<React.Fragment>
			<div className="LeagueBannerContainer">
				<div className="title--box">
					<div>
						<div className="title">{insertLeagueInfo.league_title}</div>
						<div className="sub--box">
							<div className="participant">{isPeople()} 명 신청</div>
							<div className="date">
								{insertLeagueInfo.start_date
									.substring(5, 10)
									.replace()
									.replace(/-/g, '.')}
								&nbsp;&nbsp;
								{insertLeagueInfo.start_date.substring(11, 13) >= 12
									? 'PM'
									: 'AM'}{' '}
								{insertLeagueInfo.start_date.substring(11, 16)}
							</div>
							<div
								className={
									(new Date() > start &&
										new Date() < startDate &&
										'state recuit') ||
									(applyStart > new Date() && 'state') ||
									(new Date() > applyStart &&
										new Date() < applyEnd &&
										'state') ||
									(new Date() > startDate && 'state end') ||
									(new Date() > applyEnd && new Date() < start && 'state')
								}
							>
								{(new Date() > start && new Date() < startDate && '진행중') ||
									(applyStart > new Date() && '모집 예정') ||
									(new Date() > applyStart &&
										new Date() < applyEnd &&
										'모집중') ||
									(new Date() > startDate && '종료') ||
									(new Date() > applyEnd &&
										new Date() < start &&
										'진행 대기중')}
							</div>
						</div>
					</div>
					{insertLeagueInfo.user_nickname ===
						(getUserInfo === null ? '' : getUserInfo.nickName) && (
						<button
							type="button"
							className="leagueManaging"
							onClick={() => {
								history.push(
									`/leagueManage/${insertLeagueInfo.league_id}/participantManage`,
								);
							}}
						>
							리그 관리 <img src={settingImg} />
						</button>
					)}
				</div>
				<div className="main">
					<div className="mainImg--box">
						<img
							className="img"
							src={
								insertLeagueInfo.league_main_img === 'null' ||
								insertLeagueInfo.league_main_img === null
									? noImg
									: insertLeagueInfo.league_main_img
							}
						/>
						<button
							type="button"
							className="sponsorButton"
							onClick={() => setSupportModal(!supportModal)}
						>
							후원하기
						</button>
					</div>
					<div className="infoBox">
						{infoList.map((item, index) => {
							return (
								<div className="info" key={index}>
									<div className="key">
										{item.img !== undefined ? (
											<img className="infoImg" src={item.img} />
										) : (
											''
										)}
										{item.key}
									</div>
									<div
										className={item.img !== undefined ? 'value bold' : 'value'}
									>
										{item.value}
									</div>
								</div>
							);
						})}
						<div className="consumption">
							<img className="grayPathImg" src={grayPath} />
							참여 시 티켓 <strong>{insertLeagueInfo.join_pass}</strong>개 소모
						</div>
						<div className="btnBox">
							<button
								className="goBtn"
								type="button"
								onClick={() => {
									if (getUserInfo === null) {
										alert('로그인 후, 이용할 수 있습니다.');
									} else if (
										getUserInfo === null ? '' : getUserInfo.certified === null
									) {
										alert('본인인증이 필요합니다.');
										changeProfileSubMenu('account');
										changeMenu('profile');
										history.push('/');
									} else if (
										new Date() < new Date(insertLeagueInfo.apply_start) ||
										new Date() > new Date(insertLeagueInfo.apply_end) ||
										new Date() > new Date(insertLeagueInfo.start_date)
									) {
										alert('모집기간이 아닙니다.');
									} else if (checkId() > -1) {
										alert('이미 참가 되었습니다. ');
									} else {
										setAttendModal(!attendModal);
									}
								}}
							>
								참가하기
							</button>
							<button
								className="btn"
								type="button"
								onClick={() => setShareModal(!shareModal)}
							>
								<img src={share} />
							</button>
							<button className="btn">
								<img src={favorites} />
							</button>
						</div>
					</div>
				</div>
			</div>
			<Media query={{ maxWidth: 768 }}>
				<main className="leagueBannerMobile--box">
					<article className="box-banner">
						<img
							className="thumbnail"
							src={
								insertLeagueInfo.league_main_img === 'null' ||
								insertLeagueInfo.league_main_img === null
									? noImg
									: insertLeagueInfo.league_main_img
							}
						/>
						<div className="box-groupInfo">
							<div className="box--sponsorButton">
								<button className="sponsorButton" type="button">
									후원하기
								</button>
							</div>
							<div className="box-groupInfoInner">
								<div className="groupInfoInner__title">
									<h1>{insertLeagueInfo.league_title}</h1>
									<button
										type="button"
										onClick={() =>
											history.push(
												`/leagueManage/${insertLeagueInfo.league_id}/participantManage`,
											)
										}
									>
										{insertLeagueInfo.user_nickname ===
											(getUserInfo === null ? '' : getUserInfo.nickName) && (
											<button
												type="button"
												onClick={() => {
													history.push(
														`/leagueManage/${insertLeagueInfo.league_id}/participantManage`,
													);
												}}
											>
												<img src={settingImg} />
											</button>
										)}
									</button>
								</div>
								<div className="sub--box">
									<div className="participant">{isPeople()} 명 신청</div>
									<div className="groupInfoInner__date">
										{insertLeagueInfo.start_date
											.substring(5, 10)
											.replace()
											.replace(/-/g, '.')}
										&nbsp;&nbsp;
										{insertLeagueInfo.start_date.substring(11, 13) >= 12
											? 'PM'
											: 'AM'}{' '}
										{insertLeagueInfo.start_date.substring(11, 16)}
									</div>
									<div
										className={
											(new Date() > start &&
												new Date() < startDate &&
												'state recuit') ||
											(applyStart > new Date() && 'state') ||
											(new Date() > applyStart &&
												new Date() < applyEnd &&
												'state') ||
											(new Date() > startDate && 'state end') ||
											(new Date() > applyEnd && new Date() < start && 'state')
										}
									>
										{(new Date() > start &&
											new Date() < startDate &&
											'진행중') ||
											(applyStart > new Date() && '모집 예정') ||
											(new Date() > applyStart &&
												new Date() < applyEnd &&
												'모집중') ||
											(new Date() > startDate && '종료') ||
											(new Date() > applyEnd &&
												new Date() < start &&
												'진행 대기중')}
									</div>
								</div>

								<div className="infoBox">
									{infoList.map((item, index) => {
										return (
											<div className="info" key={index}>
												<div className="key">
													{item.img !== undefined ? (
														<img className="infoImg" src={item.img} />
													) : (
														''
													)}
													{item.key}
												</div>
												<div
													className={
														item.img !== undefined ? 'value bold' : 'value'
													}
												>
													{item.value}
												</div>
											</div>
										);
									})}
									<div className="consumption">
										<img className="grayPathImg" src={grayPath} />
										참여 시 티켓 <strong>{insertLeagueInfo.join_pass}</strong>개
										소모
									</div>
								</div>
							</div>
						</div>
					</article>
				</main>
			</Media>
		</React.Fragment>
	);
};

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		changeProfileSubMenu: menu => dispatch(changeProfileSubMenu(menu)),
		changeMenu: menu => dispatch(changeMenu(menu)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueBanner);
