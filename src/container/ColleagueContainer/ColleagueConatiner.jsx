import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';

import ReportModal from '../../components/ReportModal/ReportModal';
import { isReportModalState } from '../../store/Auth/Auth.store';

import {
	getFastCrewList,
	searchFastCrewList,
	filterGameID,
	isSelctGameName,
	filterGame,
	getCrewInfo,
	getCrewList,
	searchCrewList,
} from '../../store/Colleague/Colleague.store';
import { changeMenu, changeJoinSubMenu } from '../../store/Layout/Layout.store';
import { reqLocalSignIn, reqSocialSignIn } from '../../store/Auth/Auth.store';

import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import FilterTable from '../../components/FilterTable/FilterTable';
import ShowHide from '../../components/ShowHide/ShowHide';
import ColleagueModal from '../../components/ColleagueModal/ColleagueModal';
import ColleagueCrewModal from '../../components/ColleagueCrewModal/ColleagueCrewModal';
import MyMatche from '../../components/MyMatche/MyMatche';
import ColleagueLinkModal from '../../components/ColleagueLinkModal/ColleagueLinkModal';

import pc from '../../static/images/Colleague/pc.svg';
import mobile from '../../static/images/Colleague/mobile.svg';
import consol from '../../static/images/Colleague/consol.svg';
import Lower from '../../static/images/iconbox/LowerArrow.svg';
import NoImage from '../../static/images/Card/no_image@3x.png';

import './ColleagueConatiner.scss';

const ColleagueContainer = ({
	changeMenu,
	filteredList,
	filterGame,
	getFastCrewList,
	fastCrewList,
	searchFastCrewList,
	gameId,
	filterGameID,
	selectGameName,
	isSelctGameName,
	getCrewInfo,
	getCrewList,
	searchCrewList,
	crewList,
	reportModalState,
	isReportModalState,
}) => {
	const getUserInfo = JSON.parse(localStorage.getItem('data'));

	const [crewModal, setCrewModal] = useState(false);
	const [crewSelectModal, setCrewSelectModal] = useState(false);
	const [text, setText] = useState('');

	const [filterData, setFilterData] = useState([]);
	const [flag, setFlag] = useState(false);

	const [count, setCount] = useState(1);

	const [linkModalOpen, setLinkModalOpen] = useState(false);
	const [linkInfo, setLinkInfo] = useState('');
	const [linkUrl, setLinkUrl] = useState('');

	const bringData = gameName => {
		setFilterData(gameName);
	};

	const bringFlag = item => {
		setFlag(item);
	};

	const closeTag = e => {
		if (filteredList.indexOf(e.target.id) != -1) {
			const newArr = filteredList;
			const itemToFind = newArr.find(function(item) {
				return item === e.target.id;
			});
			const idx = newArr.indexOf(itemToFind);
			if (idx > -1) newArr.splice(idx, 1);
		}
		if (gameId.indexOf(e.target.className.substring(4)) === -1) {
			const newArr = gameId;
			const itemToFind = newArr.find(function(item) {
				return item;
			});
			const idx = newArr.indexOf(itemToFind);

			if (idx > -1) newArr.splice(idx, 1);
		}

		if (selectGameName.indexOf(e.target.id) != -1) {
			const newArr = selectGameName;
			const itemToFind = newArr.find(function(item) {
				return item === e.target.id;
			});

			const idx = newArr.indexOf(itemToFind);
			if (idx > -1) newArr.splice(idx, 1);
		}
		setFlag(!flag);
	};

	const checkId = () => {
		const recentSearch = getUserInfo && getUserInfo.id;
		if (recentSearch !== null) {
			return setCrewModal(true);
		} else {
			alert('로그인 이후에 이용 가능합니다');
		}
	};

	const selectCrew = item => {
		getCrewInfo(item);
		setCrewSelectModal(true);
	};

	const onChange = e => {
		setText(e.target.value);
	};

	const onClickSubmit = () => {
		searchFastCrewList(text, gameId, 1, selectGameName);
		searchCrewList(text, gameId, 1, selectGameName);
	};

	useEffect(() => {
		getFastCrewList(count);
		getCrewList(count);
	}, [count]);

	useEffect(() => {
		if (filteredList.length > 0) {
			setCount(1);
		}
	}, [filteredList]);

	const timeForToday = value => {
		const today = new Date();
		const timeValue = new Date(value);

		const betweenTime = Math.floor(
			(today.getTime() - timeValue.getTime()) / 1000 / 60,
		);
		if (betweenTime < 1) return '방금전';
		if (betweenTime < 60) {
			return `${betweenTime}분전`;
		}

		const betweenTimeHour = Math.floor(betweenTime / 60);
		if (betweenTimeHour < 24) {
			return `${betweenTimeHour}시간전`;
		}

		const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
		if (betweenTimeDay < 365) {
			return `${betweenTimeDay}일전`;
		}
		return `${Math.floor(betweenTimeDay / 365)}년전`;
	};

	const settings = {
		centerMode: true,
		infinite: true,
		slidesToShow: 3.2,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
	};
	const settingsMobile = {
		centerMode: true,
		infinite: true,
		centerPadding: '30px',
		slidesToShow: 1.1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
	};

	useEffect(() => {}, [flag]);

	const [matcheList, setMatcheList] = useState([]);
	const [reviewModal, setReviewModal] = useState(false);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/MatchSelect`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					notyet: true,
				})
				.then(res => {
					setMatcheList(res.data.Info && res.data.Info.match);
				});
		} catch (e) {
			console.error(e);
		}
	}, [linkModalOpen, reviewModal, flag]);

	return (
		<div className="ColleagueContainer">
			<ColleagueModal
				isOpen={crewModal}
				close={() => setCrewModal(false)}
				changeMenu={changeMenu}
				parentFlag={flag}
				bringFlag={bringFlag}
			/>
			{linkModalOpen && (
				<ColleagueLinkModal
					linkModalOpen={linkModalOpen}
					setLinkModalOpen={setLinkModalOpen}
					linkInfo={linkInfo}
					linkUrl={linkUrl}
					flag={flag}
					setFlag={setFlag}
					isReportModalState={isReportModalState}
					reportModalState={reportModalState}
				/>
			)}

			<ColleagueCrewModal
				isOpen={crewSelectModal}
				close={() => setCrewSelectModal(false)}
			/>
			{reportModalState && (
				<ReportModal
					isReportModalState={isReportModalState}
					reportModalState={reportModalState}
					linkInfo={linkInfo}
				/>
			)}
			<div className="ColleagueContainer--Title">
				<Title border="thick" size="large">
					동료찾기
				</Title>
				<button className="makeCrew" onClick={checkId}>
					<div className="colleague--img" />
					동료 만들기
				</button>
			</div>
			<div className="ColleagueContainer--Input">
				<Input
					view="search"
					placeholder="검색어를 입력하세요"
					onChange={onChange}
					value={text}
					onClick={onClickSubmit}
				/>
			</div>
			<div className="tag--box">
				{filteredList.map((item, index) => {
					return (
						<div
							className={`tag ${gameId}`}
							key={index}
							id={item}
							onClick={e => closeTag(e)}
						>
							{item}
							<div className="close" id={item}>
								x
							</div>
						</div>
					);
				})}
			</div>
			<div className="ColleagueContainer--ShowHide">
				<ShowHide arrowPosition="right" text="동료 검색필터">
					<div className="ColleagueContainer--Filter">
						<FilterTable
							filteredList={filteredList}
							filterGame={filterGame}
							gameId={gameId}
							filterGameID={filterGameID}
							changeMenu={changeMenu}
							bringData={bringData}
							selectGameName={selectGameName}
							isSelctGameName={isSelctGameName}
							searchCrewList={searchCrewList}
							searchFastCrewList={searchFastCrewList}
						/>
					</div>
				</ShowHide>
			</div>
			<div className="makeCrew-mobile" onClick={checkId}>
				<div className="colleague--img" />
				동료 만들기
			</div>

			<MyMatche
				linkModalOpen={linkModalOpen}
				matcheList={matcheList}
				setMatcheList={setMatcheList}
				reviewModal={reviewModal}
				setReviewModal={setReviewModal}
			/>

			{filteredList.find(e => e === '크루') !== '크루' &&
			filteredList.find(e => e === '빠른매칭') !== '빠른매칭' ? (
				<>
					<div className="ColleagueContainer--subTitle">실시간 크루 홍보</div>
					{window.outerWidth < 768 ? (
						<Slider {...settingsMobile}>
							{crewList.map((item, index) => {
								return (
									<div className="ColleagueContainer--crew" key={index}>
										<div className="crew--box">
											{item.link === '' ? (
												<img
													src={item.crew_image ? item.crew_image : NoImage}
												/>
											) : (
												<a href={item.link} target="blank">
													<img
														src={item.crew_image ? item.crew_image : NoImage}
													/>
												</a>
											)}
											<div
												className="text--box"
												onClick={() => selectCrew(item)}
											>
												<div className="crew__title">
													{item.crew_title.length > 20
														? `${item.crew_title.substring(0, 21)}...`
														: item.crew_title}
												</div>
												<div className="crew__subtitle">
													{item.game_title_kr.map(item => {
														return item.split(',').map(item => {
															return `*${item}`;
														});
													})}
												</div>
												<div className="crew__subtitle crew__tag">
													{item.crew_tag.split(',').map(item => {
														return `${item} `;
													})}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</Slider>
					) : (
						<Slider {...settings}>
							{crewList.map((item, index) => {
								return (
									<div className="ColleagueContainer--crew" key={index}>
										<div className="crew--box">
											{item.link === '' ? (
												<img
													src={item.crew_image ? item.crew_image : NoImage}
												/>
											) : (
												<a href={item.link} target="blank">
													<img
														src={item.crew_image ? item.crew_image : NoImage}
													/>
												</a>
											)}

											<div
												className="text--box"
												onClick={() => selectCrew(item)}
											>
												<div className="crew__title">
													{item.crew_title.length > 20
														? `${item.crew_title.substring(0, 23)}...`
														: item.crew_title}
												</div>
												<div className="crew__subtitle">
													{!!item &&
														item.game_title_kr.map(item => {
															return item.split(',').map(item => {
																return `*${item} `;
															});
														})}
												</div>
												<div className="crew__subtitle crew__tag">
													{item.crew_tag.split(',').map(item => {
														return `${item} `;
													})}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</Slider>
					)}

					<div className="ColleagueContainer--subTitle subTitle-margin">
						실시간 빠른매칭
					</div>
					{fastCrewList.map((item, index) => {
						return (
							<>
								<div className="ColleagueContainer--Link" key={index}>
									<div className="link--wrapper">
										<img
											src={
												item.game_class === '0' || 0
													? pc
													: '' || item.game_class === '1' || 1
													? pc
													: '' || item.game_class === '2' || 2
													? mobile
													: consol
											}
										/>
										<div className="game--name">
											{item && item.game_title_kr}
										</div>
										<div className="contents--wrapper">
											<div
												className="title"
												type="button"
												onClick={() => {
													setLinkModalOpen(!linkModalOpen);
													setLinkInfo(item);
													setLinkUrl(
														item.link === null ? '' : item.link && item.link[0],
													);
												}}
											>
												{item.crew_title}
												<span className="colleague--img" />
												<span className="time">
													{timeForToday(item.createdAt)}
												</span>
											</div>
										</div>
										<div className="nick">
											{item.nickname === undefined ? 'unkown' : item.nickname}
										</div>
									</div>
									<div className="link--wrapper__mobile">
										<div className="mobile-title-box">
											<img
												src={
													item.game_class === '0' || 0
														? pc
														: '' || item.game_class === '1' || 1
														? pc
														: '' || item.game_class === '2' || 2
														? mobile
														: consol
												}
											/>
											<div className="game--name">
												{item && item.game_title_kr}
											</div>
										</div>
										<div className="contents--wrapper">
											<div
												className="title"
												type="button"
												onClick={() => {
													setLinkModalOpen(!linkModalOpen);
													setLinkInfo(item);
													setLinkUrl(item.link[0]);
												}}
											>
												{item.crew_title}
												<span className="colleague--img" />
												<span className="time">
													{timeForToday(item.createdAt)}
												</span>
											</div>
											<div className="nick">
												{item.nickname === undefined ? 'unkown' : item.nickname}
											</div>
										</div>
									</div>
								</div>
							</>
						);
					})}
				</>
			) : (
				''
			)}

			{filteredList.find(e => e === '크루') === '크루' &&
			filteredList.find(e => e === '빠른매칭') === '빠른매칭' ? (
				<>
					<div className="ColleagueContainer--subTitle">실시간 크루 홍보</div>
					{window.outerWidth < 768 ? (
						<Slider {...settingsMobile}>
							{crewList.map((item, index) => {
								return (
									<div className="ColleagueContainer--crew" key={index}>
										<div className="crew--box">
											{item.link === '' ? (
												<img
													src={item.crew_image ? item.crew_image : NoImage}
												/>
											) : (
												<a href={item.link} target="blank">
													<img
														src={item.crew_image ? item.crew_image : NoImage}
													/>
												</a>
											)}
											<div
												className="text--box"
												onClick={() => selectCrew(item)}
											>
												<div className="crew__title ">
													{item.crew_title.length > 20
														? `${item.crew_title.substring(0, 23)}...`
														: item.crew_title}
												</div>
												<div className="crew__subtitle">
													{item.game_title_kr.map(item => {
														return item.split(',').map(item => {
															return `*${item} `;
														});
													})}
												</div>
												<div className="crew__subtitle crew__tag">
													{item.crew_tag.split(',').map(item => {
														return `${item} `;
													})}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</Slider>
					) : (
						<Slider {...settings}>
							{crewList.map((item, index) => {
								return (
									<div className="ColleagueContainer--crew" key={index}>
										<div className="crew--box">
											{item.link === '' ? (
												<img
													src={item.crew_image ? item.crew_image : NoImage}
												/>
											) : (
												<a href={item.link} target="blank">
													<img
														src={item.crew_image ? item.crew_image : NoImage}
													/>
												</a>
											)}
											<div
												className="text--box"
												onClick={() => selectCrew(item)}
											>
												<div className="crew__title">
													{item.crew_title.length > 20
														? `${item.crew_title.substring(0, 23)}...`
														: item.crew_title}
												</div>
												<div className="crew__subtitle">
													{item.game_title_kr.map(item => {
														return item.split(',').map(item => {
															return `*${item} `;
														});
													})}
												</div>
												<div className="crew__subtitle crew__tag">
													{item.crew_tag.split(',').map(item => {
														return `${item} `;
													})}
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</Slider>
					)}

					<div className="ColleagueContainer--subTitle subTitle-margin">
						실시간 빠른매칭
					</div>
					{fastCrewList.map((item, index) => {
						return (
							<>
								<div className="ColleagueContainer--Link" key={index}>
									<div className="link--wrapper">
										<img
											src={
												item.game_class === '0' || 0
													? pc
													: '' || item.game_class === '1' || 1
													? pc
													: '' || item.game_class === '2' || 2
													? mobile
													: consol
											}
										/>
										<div className="game--name">
											{item && item.game_title_kr}
										</div>
										<div className="contents--wrapper">
											<div
												className="title"
												type="button"
												onClick={() => {
													setLinkModalOpen(!linkModalOpen);
													setLinkInfo(item);
													setLinkUrl(item.link === null ? '' : item.link[0]);
												}}
											>
												{item.crew_title}
												<span className="colleague--img" />
												<span className="time">
													{timeForToday(item.createdAt)}
												</span>
											</div>
										</div>
										<div className="nick">
											{item.nickname === undefined ? 'unkown' : item.nickname}
										</div>
									</div>
									<div className="link--wrapper__mobile">
										<div className="mobile-title-box">
											<img
												src={
													item.game_class === '0' || 0
														? pc
														: '' || item.game_class === '1' || 1
														? pc
														: '' || item.game_class === '2' || 2
														? mobile
														: consol
												}
											/>
											<div className="game--name">
												{item && item.game_title_kr}
											</div>
										</div>
										<div className="contents--wrapper">
											<div
												className="title"
												type="button"
												onClick={() => {
													setLinkModalOpen(!linkModalOpen);
													setLinkInfo(item);
													setLinkUrl(item.link === null ? '' : item.link[0]);
												}}
											>
												{item.crew_title}
												<span className="colleague--img" />
												<span className="time">
													{timeForToday(item.createdAt)}
												</span>
											</div>
										</div>
										<div className="nick">
											{item.nickname === undefined ? 'unkown' : item.nickname}
										</div>
									</div>
								</div>
							</>
						);
					})}
				</>
			) : (
				''
			)}

			{filteredList.find(e => e === '빠른매칭') === '빠른매칭' &&
			filteredList.find(e => e === '크루') !== '크루' ? (
				<>
					<div className="ColleagueContainer--subTitle ">실시간 빠른매칭</div>
					{fastCrewList.map((item, index) => {
						return (
							<>
								<div className="ColleagueContainer--Link" key={index}>
									<div className="link--wrapper">
										<img
											src={
												item.game_class === '0' || 0
													? pc
													: '' || item.game_class === '1' || 1
													? pc
													: '' || item.game_class === '2' || 2
													? mobile
													: consol
											}
										/>
										<div className="game--name">
											{item && item.game_title_kr}
										</div>
										<div className="contents--wrapper">
											<div
												className="title"
												type="button"
												onClick={() => {
													setLinkModalOpen(!linkModalOpen);
													setLinkInfo(item);
													setLinkUrl(item.link === null ? '' : item.link[0]);
												}}
											>
												{item.crew_title}
												<span className="colleague--img" />
												<span className="time">
													{timeForToday(item.createdAt)}
												</span>
											</div>
										</div>
										<div className="nick">
											{item.nickname === undefined ? 'unkown' : item.nickname}
										</div>
									</div>
									<div className="link--wrapper__mobile">
										<div className="mobile-title-box">
											<img
												src={
													item.game_class === '0' || 0
														? pc
														: '' || item.game_class === '1' || 1
														? pc
														: '' || item.game_class === '2' || 2
														? mobile
														: consol
												}
											/>
											<div className="game--name">
												{item && item.game_title_kr}
											</div>
										</div>
										<div className="contents--wrapper">
											<div
												className="title"
												type="button"
												onClick={() => {
													setLinkModalOpen(!linkModalOpen);
													setLinkInfo(item);
													setLinkUrl(item.link === null ? '' : item.link[0]);
												}}
											>
												{item.crew_title}
												<span className="colleague--img" />
												<span className="time">
													{timeForToday(item.createdAt)}
												</span>
											</div>
										</div>
										<div className="nick">
											{item.nickname === undefined ? 'unkown' : item.nickname}
										</div>
									</div>
								</div>
							</>
						);
					})}
				</>
			) : (
				''
			)}

			{filteredList.find(e => e === '크루') === '크루' &&
			filteredList.find(e => e === '빠른매칭') !== '빠른매칭' ? (
				<>
					<div className="ColleagueContainer--subTitle">실시간 크루 홍보</div>
					<div className="crew--container">
						{crewList.map((item, index) => {
							return (
								<div className="ColleagueContainer--crew " key={index}>
									<div className="crew--box crew-other-size">
										{item.link === '' ? (
											<img src={item.crew_image ? item.crew_image : NoImage} />
										) : (
											<a href={item.link} target="blank">
												<img
													src={item.crew_image ? item.crew_image : NoImage}
												/>
											</a>
										)}
										<div className="text--box" onClick={() => selectCrew(item)}>
											{window.outerWidth < 768 ? (
												<div className="crew__title">
													{item.crew_title.length > 12
														? `${item.crew_title.substring(0, 13)}...`
														: item.crew_title}
												</div>
											) : (
												<div className="crew__title">
													{item.crew_title.length > 28
														? `${item.crew_title.substring(0, 29)}...`
														: item.crew_title}
												</div>
											)}
											<div className="crew__subtitle">
												{item.game_title_kr.map(item => {
													return item.split(',').map(item => {
														return `*${item} `;
													});
												})}
											</div>
											<div className="crew__subtitle crew__tag">
												{item.crew_tag.split(',').map(item => {
													return `${item} `;
												})}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</>
			) : (
				''
			)}

			<div
				className="more"
				onClick={() => {
					setCount(count + 1);
				}}
			>
				<div>더보기</div>
				<img src={Lower} />
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		menu: state.layout.menu,
		filteredList: state.colleague.filteredList,
		gameId: state.colleague.gameId,
		fastCrewList: state.colleague.fastCrewList,
		crewList: state.colleague.crewList,
		selectGameName: state.colleague.selectGameName,
		reportModalState: state.auth.reportModalState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		changeJoinSubMenu: menu => dispatch(changeJoinSubMenu(menu)),
		reqLocalSignIn: (email, password) =>
			dispatch(reqLocalSignIn(email, password)),
		reqSocialSignIn: email => dispatch(reqSocialSignIn(email)),
		filterGame: info => dispatch(filterGame(info)),
		getFastCrewList: count => dispatch(getFastCrewList(count)),
		getCrewList: count => dispatch(getCrewList(count)),
		searchFastCrewList: (text, game_id, count, search_tags) =>
			dispatch(searchFastCrewList(text, game_id, count, search_tags)),
		searchCrewList: (text, game_id, count, search_tags) =>
			dispatch(searchCrewList(text, game_id, count, search_tags)),
		filterGameID: info => dispatch(filterGameID(info)),
		isSelctGameName: info => dispatch(isSelctGameName(info)),
		getCrewInfo: info => dispatch(getCrewInfo(info)),
		isReportModalState: info => dispatch(isReportModalState(info)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ColleagueContainer);
