import React, { useState, useEffect, useCallback } from 'react';
import Calendar from 'react-calendar';
import { useHistory } from 'react-router-dom';

import Title from '../../../components/Title/Title';
import { StepProgressBar } from '../../../components/StepProgressBar/StepProgressBar';
import {
	recommendGames,
	auto,
	type,
	step1Time,
} from '../../../assets/dummyData/AuthData';
import FroalaEditor from '../../../components/FroalaEditor/FroalaEditor';

import flag from '../../../static/images/League/flag.svg';
import calendar from '../../../static/images/League/calendar.svg';
import question from '../../../static/images/League/question.svg';
import search from '../../../../src/static/images/Chatting/search.svg';
import pc from '../../../static/images/Colleague/pc.svg';
import mobile from '../../../static/images/Colleague/mobile.svg';
import consol from '../../../static/images/Colleague/consol.svg';

import 'react-calendar/dist/Calendar.css';
import './MakeLeaguePageStep1.scss';

const MakeLeaguePageStep1 = ({
	gameInfo,
	gameCheck,
	gameChoice,
	choiceGame,
	getStep1Info,
	insertLeagueInfo,
	temporayModal,
	openTemporaryModal,
	makeTemporaryLeague,
	leagueTemporaryList,
}) => {
	const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

	let history = useHistory();

	// 리그 제목
	const [title, setTitle] = useState('' || insertLeagueInfo.league_title);

	// 같이 하고싶은 게임
	const [gameName, setGameName] = useState('');
	const [open, setOpen] = useState(false);
	const [selectedGame, setSelectedGame] = useState(
		null || {
			img_src: insertLeagueInfo.img_src,
			id: insertLeagueInfo.game_id,
			name: insertLeagueInfo.game_title_kr,
			game_class: insertLeagueInfo.game_class,
		},
	);

	const [searchGame, setSearchGame] = useState(null);
	const [gameId, setGameId] = useState(null || insertLeagueInfo.game_id);
	const [gameTitle, setGameTitle] = useState('' || insertLeagueInfo.game_title);
	const [gameTitleKr, setGameTitleKr] = useState(
		'' || insertLeagueInfo.game_title_kr,
	);
	const [gameClass, setGameClass] = useState(0);

	// 썸네일
	const [thumbnail, setThumbnail] = useState(
		null || insertLeagueInfo.league_main_img,
	);

	// 자동 참여 여부
	const [permit, setPermit] = useState('1' || insertLeagueInfo.auto_join);

	// 리그 구분
	const [gameType, setGameType] = useState(0 || insertLeagueInfo.league_type);
	useEffect(() => {
		if (insertLeagueInfo.league_type !== undefined) {
			setGameType(insertLeagueInfo.league_type);
		}
	}, []);

	const [singleCount, setSingleCount] = useState(
		0 || insertLeagueInfo.limit_people,
	);
	const reTeamPeopleCount =
		insertLeagueInfo.limit_people / insertLeagueInfo.member_count;

	const [teamCount, setTeamCount] = useState(
		0 || insertLeagueInfo.member_count,
	);

	const [teamPeopleCount, setTeamPeopleCount] = useState(
		
		0 || isNaN(reTeamPeopleCount) ? 0 : reTeamPeopleCount,
	);

	// 대기 인원
	const [waitingCount, setWaitingCount] = useState(
		0 || insertLeagueInfo.waiting_people,
	);

	// 리그 신청 기간, 리그 시작 일자
	const [openCalendar, setOpenCalendar] = useState(false);
	const [openCalendarBy, setOpenCalendarBy] = useState(false);
	const [openCalendarStartDate, setOpenCalendarStartDate] = useState(false);

	const [fromDate, setFromDate] = useState(
		new Date(
			String(
				insertLeagueInfo.apply_start &&
					insertLeagueInfo.apply_start.split('T')[0],
			),
		),
	);
	const [fromDateDummy, setFromDateDummy] = useState(new Date());
	const [byDate, setByDate] = useState(
		new Date(
			String(
				insertLeagueInfo.apply_end && insertLeagueInfo.apply_end.split('T')[0],
			),
		),
	);
	const [byDateDummy, setByDateDummy] = useState(new Date());
	const [startDate, setStartDate] = useState(
		new Date(
			String(
				insertLeagueInfo.start_date &&
					insertLeagueInfo.start_date.split('T')[0],
			),
		),
	);
	const [startDateDummy, setStartDateDummy] = useState(new Date());

	const [openHoursFrom, setOpenHoursFrom] = useState(false);
	const [openHoursBy, setOpenHoursBy] = useState(false);
	const [openHoursStart, setOpenHoursStart] = useState(false);
	const [fromHours, setFromHours] = useState({
		time: insertLeagueInfo.fromHours && insertLeagueInfo.fromHours.time,
		value: insertLeagueInfo.fromHours && insertLeagueInfo.fromHours.value,
		id: insertLeagueInfo.fromHours && insertLeagueInfo.fromHours.id,
	});
	const [fromHoursDummy, setFromHoursDummy] = useState({
		time: '오후 12:00',
		value: 'T12:00:00',
		id: 48,
	});

	const [byHours, setByHours] = useState({
		time: insertLeagueInfo.byHours && insertLeagueInfo.byHours.time,
		value: insertLeagueInfo.byHours && insertLeagueInfo.byHours.value,
		id: insertLeagueInfo.byHours && insertLeagueInfo.byHours.id,
	});
	const [byHoursDummy, setByHoursDummy] = useState({
		time: '오후 12:00',
		value: 'T12:00:00',
		id: 48,
	});
	const [startHours, setStartHours] = useState({
		time: insertLeagueInfo.startHours && insertLeagueInfo.startHours.time,
		value: insertLeagueInfo.startHours && insertLeagueInfo.startHours.value,
		id: insertLeagueInfo.startHours && insertLeagueInfo.startHours.id,
	});

	const [startHoursDummy, setStartHoursDummy] = useState({
		time: '오후 12:00',
		value: 'T12:00:00',
		id: 48,
	});

	const isMonth = e => {
		return e.getMonth() + 1 < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1;
	};
	const isDay = e => {
		return e.getDate() + 1 <= 10 ? `0${e.getDate()}` : e.getDate();
	};

	// 소개
	const [editor, setEditor] = useState('' || insertLeagueInfo.desc);

	const changeTitle = e => {
		let emoji = e.target.value.replace(
			/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
			'',
		);
		setTitle(emoji);
	};
	const submitGame = useCallback(
		e => {
			setOpen(!open);
			e.preventDefault();
			gameCheck(gameName);
		},
		[gameName],
	);
	const changeGameName = e => {
		setGameName(e.target.value);
	};

	const onSelectGame = item => {
		!!selectedGame && selectedGame.id === item.id
			? setSelectedGame(null)
			: setSelectedGame(item);
		choiceGame(false);
		setGameId(item.game_id);
		setGameTitle(item.game_title);
		setGameTitleKr(item.game_title_kr);
		setGameClass(item.game_class);
		setGameName('');
	};

	const onSearchGame = item => {
		!!searchGame && searchGame.id === item.game_id
			? setSearchGame(null)
			: setSearchGame(item);
		setOpen(false);
		setGameId(item.game_id);
		setGameTitle(item.game_title);
		setGameTitleKr(item.game_title_kr);
		setGameClass(item.game_class);
		setGameName('');
	};

	const uploadFile = e => {
		e.preventDefault();
		let reader = new FileReader();
		let file1 = e.target.files[0];
		reader.onloadend = () => {
			setThumbnail(file1);
		};
		reader.readAsDataURL(file1);
	};

	useEffect(() => {
		setOpenCalendar(false);
	}, [fromDate]);

	useEffect(() => {
		setOpenCalendarBy(false);
	}, [byDate]);

	useEffect(() => {
		setOpenCalendarStartDate(false);
	}, [startDate]);

	const nextStep = () => {
		// if (title === undefined) {
		// 	alert('리그 제목을 입력해 주세요.');
		// } else if (gameId === undefined) {
		// 	alert('게임을 설정해 주세요.');
		// } else if (gameType === '0' && singleCount <= 0) {
		// 	alert('총 인원을 설정해 주세요.');
		// } else if (gameType === '1' && teamCount <= 0) {
		// 	alert('총 팀수를 설정해 주세요.');
		// } else if (gameType === '1' && teamPeopleCount <= 0) {
		// 	alert('팀당 멤버 수를 설정해 주세요.');
		// } else if (
		// 	insertLeagueInfo.start_date === undefined
		// 		? (fromDateDummy.getMonth() === byDateDummy.getMonth() &&
		// 				fromDateDummy.getDate() === byDateDummy.getDate() &&
		// 				fromHoursDummy.id >= byHoursDummy.id) ||
		// 		  (fromDateDummy.getMonth() > byDateDummy.getMonth() &&
		// 				fromDateDummy.getDate() < byDateDummy.getDate() &&
		// 				fromHoursDummy.id <= byHoursDummy.id) ||
		// 		  (fromDateDummy.getMonth() === byDateDummy.getMonth() &&
		// 				fromDateDummy.getDate() > byDateDummy.getDate())
		// 		: (fromDate.getMonth() === byDate.getMonth() &&
		// 				fromDate.getDate() === byDate.getDate() &&
		// 				fromHours.id >= byHours.id) ||
		// 		  (fromDate.getMonth() > byDate.getMonth() &&
		// 				fromDate.getDate() < byDate.getDate() &&
		// 				fromHours.id <= byHours.id) ||
		// 		  (fromDate.getMonth() === byDate.getMonth() &&
		// 				fromDate.getDate() > byDate.getDate())
		// ) {
		// 	alert('리그 신청 기간을 설정해주세요.');
		// } else if (
		// 	insertLeagueInfo.start_date === undefined
		// 		? (byDateDummy.getMonth() === startDateDummy.getMonth() &&
		// 				byDateDummy.getDate() === startDateDummy.getDate() &&
		// 				byHoursDummy.id >= startHoursDummy.id) ||
		// 		  (byDateDummy.getMonth() > startDateDummy.getMonth() &&
		// 				byDateDummy.getDate() < startDateDummy.getDate() &&
		// 				byHoursDummy.id <= startHoursDummy.id) ||
		// 		  (byDateDummy.getMonth() === startDateDummy.getMonth() &&
		// 				byDateDummy.getDate() > startDateDummy.getDate())
		// 		: (byDate.getMonth() === startDate.getMonth() &&
		// 				byDate.getDate() === startDate.getDate() &&
		// 				byHours.id >= startHours.id) ||
		// 		  (byDate.getMonth() > startDate.getMonth() &&
		// 				byDate.getDate() < startDate.getDate() &&
		// 				byHours.id <= startHours.id) ||
		// 		  (byDate.getMonth() === startDate.getMonth() &&
		// 				byDate.getDate() > startDate.getDate())
		// ) {
		// 	alert('리그 시작 일자를 설정해주세요.');
		// }
		// if (gameId === undefined) {
		// 	alert('게임을 설정해 주세요.');
		// } else if (gameType === '0' && singleCount <= 0) {
		// 	alert('총 인원을 설정해 주세요.');
		// } else if (gameType === '1' && teamCount <= 0) {
		// 	alert('총 팀수를 설정해 주세요.');
		// } else if (gameType === '1' && teamPeopleCount <= 0) {
		// 	alert('팀당 멤버 수를 설정해 주세요.');
		// } else {

		getStep1Info(
			title,
			gameId,
			gameClass,
			gameTitle,
			gameTitleKr,
			gameType,
			permit,
			'0',
			gameType === 0 ? singleCount : teamCount * teamPeopleCount,
			gameType === 0 ? 1 : teamCount,
			waitingCount,
			thumbnail,
			null,
			insertLeagueInfo.start_date === undefined
				? `${fromDateDummy.getFullYear()}-${isMonth(fromDateDummy)}-${isDay(
						fromDateDummy,
				  )}${fromHoursDummy.value}`
				: `${fromDate.getFullYear()}-${isMonth(fromDateDummy)}-${isDay(
						fromDateDummy,
				  )}${fromHoursDummy.value}`,
			insertLeagueInfo.start_date === undefined
				? `${byDateDummy.getFullYear()}-${isMonth(byDateDummy)}-${isDay(
						byDateDummy,
				  )}${byHoursDummy.value}`
				: `${byDate.getFullYear()}-${isMonth(byDateDummy)}-${isDay(
						byDateDummy,
				  )}${byHoursDummy.value}`,
			insertLeagueInfo.start_date === undefined
				? `${startDateDummy.getFullYear()}-${isMonth(startDateDummy)}-${isDay(
						startDateDummy,
				  )}${startHoursDummy.value}`
				: `${startDate.getFullYear()}-${isMonth(startDateDummy)}-${isDay(
						startDateDummy,
				  )}${startHoursDummy.value}`,
			editor,
			!!selectedGame && selectedGame.img_src,
			!!selectedGame && selectedGame.name,
			insertLeagueInfo.fromHours === undefined ? fromHoursDummy : fromHours,
			insertLeagueInfo.fromHours === undefined ? byHoursDummy : byHours,
			insertLeagueInfo.fromHours === undefined ? startHoursDummy : startHours,
			singleCount,
			teamCount,
			teamPeopleCount,
		);
		history.push('./step2');
		// }
	};

	const saveTemporary = () => {
		const reward_ratio = { '1등': 100, '2등': 0 };

		makeTemporaryLeague(
			title === undefined ? null : title,
			gameId === undefined ? null : gameId,
			gameTitle === undefined ? null : gameTitle,
			gameTitleKr === undefined ? null : gameTitleKr,
			gameType,
			permit,
			'0',
			gameType === 0 ? singleCount : teamCount * teamPeopleCount,
			gameType === 0 ? 1 : teamCount,
			waitingCount,
			thumbnail === undefined ? null : thumbnail,
			null,
			insertLeagueInfo.start_date === undefined
				? `${fromDateDummy.getFullYear()}-${isMonth(fromDateDummy)}-${isDay(
						fromDateDummy,
				  )}${fromHoursDummy.value}`
				: `${fromDate.getFullYear()}-${isMonth(fromDateDummy)}-${isDay(
						fromDateDummy,
				  )}${fromHoursDummy.value}`,
			insertLeagueInfo.start_date === undefined
				? `${byDateDummy.getFullYear()}-${isMonth(byDateDummy)}-${isDay(
						byDateDummy,
				  )}${byHoursDummy.value}`
				: `${byDate.getFullYear()}-${isMonth(byDateDummy)}-${isDay(
						byDateDummy,
				  )}${byHoursDummy.value}`,
			insertLeagueInfo.start_date === undefined
				? `${startDateDummy.getFullYear()}-${isMonth(startDateDummy)}-${isDay(
						startDateDummy,
				  )}${startHoursDummy.value}`
				: `${startDate.getFullYear()}-${isMonth(startDateDummy)}-${isDay(
						startDateDummy,
				  )}${startHoursDummy.value}`,
			editor === undefined ? null : editor,
			null,
			null,
			'0',
			'0',
			reward_ratio,
		);
	};

	return (
		<main className="MakeLeaguePageStep1">
			{getUserInfo === null ? (
				<>{alert('로그인 후 이용 가능합니다.')}</>
			) : (
				<>
					{window.innerWidth < 768 ? (
						''
					) : (
						<Title border="thick" size="large">
							리그 생성하기
						</Title>
					)}
					<header className="mobile__header--box">
						<button
							type="button"
							className="homeBtn"
							onClick={() => {
								history.push('/');
							}}
						>
							{'<'}
						</button>
						<span className="title">리그 만들기</span>
						<button
							className="temporaryBtn"
							type="button"
							onClick={() => {
								openTemporaryModal(!temporayModal);
							}}
						>
							{/* <span className="text">임시 저장</span> */}
							{/* <span className="text number">{leagueTemporaryList.length}</span> */}
						</button>
					</header>
					<article className="MakeLeaguePageStep1--inner">
						<div>
							<StepProgressBar step={1} />
						</div>
						<div className="infoContainer">
							<header className="info__header--box">
								<img src={flag} />
								<div className="header__title">League</div>
								<div className="header__subTitle">리그</div>
							</header>
							<div className="infoInner">
								<div className="info--box">
									{/* ** */}
									{/* 리그 제목 */}
									<div className="writeTitleInputBox">
										<div className="tab--title">
											리그 제목 <b>*</b>
										</div>
										<input
											className="input"
											type="text"
											placeholder="제목"
											value={title}
											onChange={changeTitle}
										/>
									</div>

									{/* ** */}
									{/* 같이 하고싶은 게임 */}
									<div className="selectGameInputBox">
										<div className="tab--title">
											같이 하고싶은 게임 <b>*</b>
										</div>
										<form onSubmit={submitGame}>
											<div className="search-input">
												<input
													className="input"
													type="text"
													value={gameName}
													onChange={changeGameName}
												/>
												<img src={search} onClick={submitGame} />
											</div>
										</form>

										{/* ** */}
										{/* 같이 하고싶은 게임 아래 추천 게임 리스트 */}
										<div className="tab--recommend">
											{recommendGames.map((game, index) => {
												return (
													<div
														className={
															!gameChoice &&
															!!selectedGame &&
															selectedGame.id === game.id
																? 'game__selected'
																: 'game'
														}
														key={index}
														onClick={() => onSelectGame(game)}
													>
														{game.name}
													</div>
												);
											})}
										</div>

										{/* ** */}
										{/* 검색했을 때 나오는 데이터 목록 */}
										<div className="data--wrapper">
											<div className="data--box">
												{open &&
													gameInfo.data &&
													gameInfo.data.data.map((item, index) => {
														return (
															<div
																className="game--box"
																onClick={() => {
																	onSearchGame(item);
																}}
																key={index}
															>
																<div className="img--box">
																	<img className="backImg" src={item.img_src} />
																	<img
																		className="icon"
																		src={
																			item.game_class === '0'
																				? pc
																				: '' || item.game_class === '1'
																				? pc
																				: '' || item.game_class === '2'
																				? mobile
																				: consol
																		}
																	/>
																</div>
																<span>{item.game_title_kr}</span>
															</div>
														);
													})}
											</div>
										</div>
										{(gameId && !gameChoice && !!selectedGame && (
											<div className="tag--selected">
												<div className="img--box">
													<img
														className="backImg"
														src={
															selectedGame.img_src || insertLeagueInfo.img_src
														}
													/>

													<img
														className="icon"
														src={
															selectedGame.game_class === '0'
																? pc
																: '' || selectedGame.game_class === '1'
																? pc
																: '' || selectedGame.game_class === '2'
																? mobile
																: consol
														}
													/>
												</div>
												<div className="title">
													{selectedGame.name || insertLeagueInfo.game_title_kr}
												</div>
											</div>
										)) ||
											(!!searchGame && (
												<div className="tag--selected">
													<div className="img--box">
														<img
															className="backImg"
															src={
																searchGame.img_src || insertLeagueInfo.img_src
															}
														/>
														<img
															className="icon"
															src={
																searchGame.game_class === '0'
																	? pc
																	: '' || searchGame.game_class === '1'
																	? pc
																	: '' || searchGame.game_class === '2'
																	? mobile
																	: consol
															}
														/>
													</div>
													<div className="title">
														{searchGame.game_title_kr ||
															insertLeagueInfo.game_title_kr}
													</div>
												</div>
											))}
									</div>

									{/* ** */}
									{/* 리그 썸네일 */}
									<div className="thumbnailBox">
										<div className="tab--title">
											리그 썸네일
											<div className="imgBox">
												<img src={question} />
												<div className="board">
													<div className="textBox">
														<img src={question} />
														<div className="text"></div>
													</div>
												</div>
											</div>
										</div>
										<div className="thumbnail-img">
											<input
												className="img__input"
												onChange={() => setThumbnail(!thumbnail)}
												value={
													!!thumbnail
														? thumbnail.name ||
														  (insertLeagueInfo.league_main_img &&
																insertLeagueInfo.league_main_img.substring(
																	64,
																)) ||
														  (insertLeagueInfo.league_main_img &&
																insertLeagueInfo.league_main_img.name)
														: '이미지'
												}
											/>
											<div className="upload--btn">
												<label htmlFor="uploadBtn" className="btn_file">
													찾아보기
												</label>
												<input
													type="file"
													id="uploadBtn"
													className="uploadBtn"
													accept="image/gif,image/jpeg,image/png"
													onChange={e => uploadFile(e)}
												/>
											</div>
										</div>
									</div>

									{/* ** */}
									{/* 자동 참여 여부 */}
									<div className="activeParticipationBox">
										<div className="tab--title">자동 참여 여부</div>
										<div className="radio">
											<div className="text ">
												<label
													htmlFor={'permit'}
													onClick={() => setPermit('1')}
												>
													허용
													<input
														type="radio"
														id={'permit'}
														name="auto"
														value={'permit'}
														defaultChecked={
															permit === '1' ||
															insertLeagueInfo.auto_join === '1'
														}
													/>
												</label>
											</div>
											<div className="text ">
												<label
													htmlFor={'notAllowed'}
													onClick={() => setPermit('0')}
												>
													비허용
													<input
														type="radio"
														id={'notAllowed'}
														name="auto"
														value={'notAllowed'}
														defaultChecked={insertLeagueInfo.auto_join === '0'}
													/>
												</label>
											</div>
										</div>
									</div>
								</div>

								{/* ** */}
								{/* 리그 구분 */}
								<div className="info--box">
									<div className="divisionBox">
										<div className="tab--title">
											리그 구분 <b>*</b>
										</div>
										<div className="radio">
											<div className="text ">
												<label
													htmlFor={'single'}
													onClick={() => {
														setGameType(0);
														setTeamCount(0);
														setTeamPeopleCount(0);
													}}
												>
													개인전
													<input
														type="radio"
														id={'single'}
														name="type"
														value={'single'}
														defaultChecked={
															gameType === 0 ||
															insertLeagueInfo.league_type === 0
														}
													/>
												</label>
											</div>
											<div className="text ">
												<label
													htmlFor={'multy'}
													onClick={() => {
														setGameType(1);
														setSingleCount(0);
													}}
												>
													팀전
													<input
														type="radio"
														id={'multy'}
														name="type"
														value={'multy'}
														defaultChecked={insertLeagueInfo.league_type === 1}
													/>
												</label>
											</div>
										</div>

										{gameType === 0 && (
											<div className="count--box">
												<div className="count">
													<div className="text">총 인원</div>
													<div className="countBar">
														<button
															className="sign"
															type="button"
															onClick={() => {
																singleCount < 1
																	? 0
																	: setSingleCount(singleCount - 1);
															}}
														>
															-
														</button>
														<input
															type="number"
															className="number"
															value={singleCount}
															onChange={e => {
																setSingleCount(Number(e.target.value));
															}}
														/>
														<button
															className="sign"
															type="button"
															onClick={() => {
																setSingleCount(singleCount + 1);
															}}
														>
															+
														</button>
													</div>
												</div>
											</div>
										)}
										{gameType === 1 && (
											<>
												<div className="count--box">
													<div className="count">
														<div className="text">총 팀수</div>
														<div className="countBar">
															<button
																type="button"
																className="sign"
																// onClick={() => {
																// 	teamCount < 1
																// 		? 0
																// 		: setTeamCount(teamCount - 1);
																// }}
																onClick={() => {
																	teamPeopleCount < 1
																		? 0
																		: setTeamPeopleCount(teamPeopleCount - 1);
																}}
															>
																-
															</button>
															<input
																type="number"
																className="number"
																// value={teamCount}
																value={teamPeopleCount}
																onChange={e =>
																	setTeamCount(Number(e.target.value))
																}
															/>
															<button
																type="button"
																className="sign"
																// onClick={() => {
																// 	setTeamCount(teamCount + 1);
																// }}
																onClick={() => {
																	setTeamPeopleCount(teamPeopleCount + 1);
																}}
															>
																+
															</button>
														</div>
													</div>
												</div>
												<div className="count--box marginTop">
													<div className="count">
														<div className="text">팀당 멤버 수</div>
														<div className="countBar">
															<button
																className="sign"
																// onClick={() => {
																// 	teamPeopleCount < 1
																// 		? 0
																// 		: setTeamPeopleCount(teamPeopleCount - 1);
																// }}
																onClick={() => {
																	teamCount < 1
																		? 0
																		: setTeamCount(teamCount - 1);
																}}
															>
																-
															</button>
															<input
																className="number"
																// value={teamPeopleCount}
																value={teamCount}
																onChange={e =>
																	setTeamPeopleCount(Number(e.target.value))
																}
																type="number"
															/>
															<button
																className="sign"
																// onClick={() => {
																// 	setTeamPeopleCount(teamPeopleCount + 1);
																// }}
																onClick={() => {
																	setTeamCount(teamCount + 1);
																}}
															>
																+
															</button>
														</div>
													</div>
												</div>
											</>
										)}
									</div>

									{/* ** */}
									{/* 대기 인원 */}

									<div className="waitingBox">
										<div className="tab--title">
											대기 인원
											<div className="imgBox">
												<img src={question} />
												<div className="board">
													<div className="textBox">
														<img src={question} />
														<div className="text">
															대기인원이란, 참여자가 참여하지 못하거나 부재한
															경우 .. 어쩌구 ㅎ
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="countBar waiting">
											<button
												type="button"
												className="sign"
												onClick={() => {
													waitingCount < 1
														? 0
														: setWaitingCount(waitingCount - 1);
												}}
											>
												-
											</button>
											<input
												type="number"
												className="number waitingNum"
												value={waitingCount}
												onChange={e => setWaitingCount(Number(e.target.value))}
											/>
											<button
												type="button"
												className="sign"
												onClick={() => {
													setWaitingCount(waitingCount + 1);
												}}
											>
												+
											</button>
										</div>
									</div>

									{/* ** */}
									{/* 대기 신청 기간*/}
									<div className="applyDateBox">
										<div className="tab--title">
											리그 신청 기간 <b>*</b>
										</div>
										<div className="calendar">
											<img src={calendar} />
											<div className="dateBox1">
												<div className="from">
													{openCalendar ? (
														<>
															<Calendar
																className="calendarBorad"
																onChange={date => {
																	setFromDate(date);
																	setFromDateDummy(date);
																}}
																// defaultValue={fromDate}
															/>
															<div
																className="closeBord"
																onClick={() => setOpenCalendar(!openCalendar)}
															/>
														</>
													) : (
														''
													)}
													{openHoursFrom ? (
														<>
															<div className="timeBord">
																{step1Time.map((item, index) => {
																	return (
																		<div
																			className="time"
																			key={index}
																			onClick={() => {
																				setFromHours(item);
																				setFromHoursDummy(item);
																				setOpenHoursFrom(!openHoursFrom);
																			}}
																		>
																			{item.time}
																		</div>
																	);
																})}
															</div>
															<div
																className="closeBord"
																onClick={() => setOpenHoursFrom(!openHoursFrom)}
															/>
														</>
													) : (
														''
													)}
													<button
														className="dayBox"
														onClick={() => {
															setOpenCalendar(!openCalendar);
														}}
													>
														{/* {`${fromDate.getFullYear()}년 ${fromDate.getMonth() +
													1}월 ${fromDate.getDate()}일`} */}
														{insertLeagueInfo.apply_start === undefined ||
														(insertLeagueInfo.apply_start &&
															insertLeagueInfo.apply_start.substring(0, 1) ===
																'N') ? (
															<>
																{`${fromDateDummy.getFullYear()}년 ${fromDateDummy.getMonth() +
																	1}월 ${fromDateDummy.getDate()}일`}
															</>
														) : (
															<>
																{`${fromDate.getFullYear()}년 ${fromDate.getMonth() +
																	1}월 ${fromDate.getDate()}일`}
															</>
														)}
													</button>
													<button
														className="hoursBox"
														onClick={() => setOpenHoursFrom(!openHoursFrom)}
													>
														{insertLeagueInfo.fromHours === undefined ||
														insertLeagueInfo.fromHours.time === undefined ? (
															<>{fromHoursDummy.time}</>
														) : (
															<>{fromHours.time}</>
														)}
													</button>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 부터
												</div>
												<div className="by">
													{openCalendarBy ? (
														<>
															<Calendar
																className="calendarBorad"
																onChange={date => {
																	setByDate(date);
																	setByDateDummy(date);
																}}
															/>
															<div
																className="closeBord"
																onClick={() =>
																	setOpenCalendarBy(!openCalendarBy)
																}
															/>
														</>
													) : (
														''
													)}
													{openHoursBy ? (
														<>
															<div className="timeBord">
																{step1Time.map((item, index) => {
																	return (
																		<div
																			className="time"
																			key={index}
																			onClick={() => {
																				setByHours(item);
																				setByHoursDummy(item);
																				setOpenHoursBy(!openHoursBy);
																			}}
																		>
																			{item.time}
																		</div>
																	);
																})}
															</div>
															<div
																className="closeBord"
																onClick={() => setOpenHoursBy(!openHoursBy)}
															/>
														</>
													) : (
														''
													)}
													<div className="bar" />
													<button
														className="dayBox"
														onClick={() => {
															setOpenCalendarBy(!openCalendarBy);
														}}
													>
														{insertLeagueInfo.apply_end === undefined ||
														(insertLeagueInfo.apply_end &&
															insertLeagueInfo.apply_end.substring(0, 1) ===
																'N') ? (
															<>
																{`${byDateDummy.getFullYear()}년 ${byDateDummy.getMonth() +
																	1}월 ${byDateDummy.getDate()}일`}
															</>
														) : (
															<>
																{`${byDate.getFullYear()}년 ${byDate.getMonth() +
																	1}월 ${byDate.getDate()}일`}
															</>
														)}
													</button>
													<button
														className="hoursBox"
														onClick={() => setOpenHoursBy(!openHoursBy)}
													>
														{insertLeagueInfo.byHours === undefined ||
														insertLeagueInfo.byHours.time === undefined ? (
															<>{byHoursDummy.time}</>
														) : (
															<>{byHours.time}</>
														)}
													</button>
												</div>
											</div>
										</div>
									</div>

									{/* ** */}
									{/* 리그시작 일자*/}
									<div className="applyDateBox">
										<div className="tab--title">
											리그 시작 일자 <b>*</b>
										</div>
										<div className="calendar">
											<img src={calendar} />
											<div className="dateBox1">
												<div className="from">
													{openCalendarStartDate ? (
														<>
															<Calendar
																className="calendarBorad"
																onChange={date => {
																	setStartDate(date);
																	setStartDateDummy(date);
																}}
															/>
															<div
																className="closeBord"
																onClick={() =>
																	setOpenCalendarStartDate(
																		!openCalendarStartDate,
																	)
																}
															/>
														</>
													) : (
														''
													)}
													{openHoursStart ? (
														<>
															<div className="timeBord">
																{step1Time.map((item, index) => {
																	return (
																		<div
																			className="time"
																			key={index}
																			onClick={() => {
																				setStartHours(item);
																				setStartHoursDummy(item);
																				setOpenHoursStart(!openHoursStart);
																			}}
																		>
																			{item.time}
																		</div>
																	);
																})}
															</div>
															<div
																className="closeBord"
																onClick={() =>
																	setOpenHoursStart(!openHoursStart)
																}
															/>
														</>
													) : (
														''
													)}
													<button
														className="dayBox"
														onClick={() => {
															setOpenCalendarStartDate(!openCalendarStartDate);
														}}
													>
														{insertLeagueInfo.start_date === undefined ||
														(insertLeagueInfo.start_date &&
															insertLeagueInfo.start_date.substring(0, 1) ===
																'N') ? (
															<>
																{`${startDateDummy.getFullYear()}년 ${startDateDummy.getMonth() +
																	1}월 ${startDateDummy.getDate()}일`}
															</>
														) : (
															<>
																{`${startDate.getFullYear()}년 ${startDate.getMonth() +
																	1}월 ${startDate.getDate()}일`}
															</>
														)}
													</button>
													<button
														className="hoursBox"
														onClick={() => setOpenHoursStart(!openHoursStart)}
													>
														{insertLeagueInfo.startHours === undefined ||
														insertLeagueInfo.startHours.time === undefined ? (
															<>{startHoursDummy.time}</>
														) : (
															<>{startHours.time}</>
														)}
													</button>
													&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 시작
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* ** */}
							{/* 소개 */}
							<div className="editorBox">
								<div className="tab--title">소개</div>
								<FroalaEditor editorValue={e => setEditor(e)} editor={editor} />
							</div>
							<div className="btn">
								{/* <button type="button">
									<span
										className="text"
										type="button"
										onClick={() => {
											saveTemporary();
										}}
									>
										임시 저장
									</span>
									<span
										className="text number"
										onClick={() => openTemporaryModal(!temporayModal)}
									>
										{leagueTemporaryList.length}
									</span>
								</button> */}
								<button onClick={nextStep}>다음 단계</button>
							</div>
						</div>
						<footer className="mobileBtn--box">
							<button
								onClick={() => {
									history.push('/league');
								}}
							>
								이전
							</button>
							<button onClick={nextStep}>다음 단계</button>
						</footer>
					</article>
				</>
			)}

			{/* {!temporayModal && (
				<TemporayModal
					openTemporaryModal={openTemporaryModal}
					temporayModal={temporayModal}
				/>
			)} */}
		</main>
	);
};

export default MakeLeaguePageStep1;
