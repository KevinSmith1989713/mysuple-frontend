import React, { useState, useEffect } from 'react';
import './HomeContainer.scss';

import { connect } from 'react-redux';
import Media from 'react-media';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';
import Slider from 'react-slick';
import moment from 'moment';

import { changeMenu } from '../../store/Layout/Layout.store';
import { getPassCount } from '../../store/Auth/Auth.store';
import { searchLeague } from '../../store/League/League.store';

import CarouselClass from '../../components/Carousel/CarouselClass';
import { useHistory } from 'react-router-dom';

import FigureModal from '../../components/FigureModal/FigureModal';

import { logPageView } from '../../Utils/analytics';
import adminService from '../../services/administerService';

import BlueStar from '../../static/images/Card/blue-star@3x.png';
import vedioLogo from '../../static/images/main-vedio-logo.svg';
import trophy from '../../static/images/League/blueTrophy.svg';
import alone from '../../static/images/League/bluePeople.svg';
import team from '../../static/images/League/leagueTeam.svg';
import noImg from '../../static/images/League/league_noImage.svg';

import banner1 from '../../static/images/Carousel/banner1_img.png';
import banner2 from '../../static/images/Carousel/banner2_img.png';
import banner3 from '../../static/images/Carousel/banner3_img.png';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

const date = e =>
	`${e.substring(5, 10).replace(/-/g, '.')} ${
		e.substring(11, 13) >= 12 ? 'PM' : 'AM'
	} ${e.substring(11, 16)}`;

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

const HomeContainer = ({
	leagueList,
	changeMenu,
	searchLeague,
	getPassCount,
}) => {
	let history = useHistory();
	const [text, setText] = useState('');
	const [gameId, setGameId] = useState([]);
	const [carouselInfo, setCarouselInfo] = useState([]);
	const [videoContents, setVideoContents] = useState([]);
	const [review, setReview] = useState([]);
	const bannerList = [
		{
			text: '베타서비스 오픈!',
			// subText1: '슈퍼플레이어가 베타서비스를 오픈했어요! 짝짝짝',
			// subText2: '새싹 같은 슈퍼플레이어 잘 부탁드려요!',
			img: banner2,
			href: '/',
			banner: 'banner2',
		},
		{
			text: '동료를 찾아서',
			subText1: '너 내 동료가 되라!',
			subText2: '슈플에서 같이 게임 고고!',
			img: banner1,
			href: '/colleague',
			banner: 'banner1',
		},
		{
			text: '서비스, 어떠신가요?',
			subText1: '서비스에 대해 제안 사항이 있나요?',
			subText2: '지금 바로 고객센터에서 문의해주세요! ',
			img: banner3,
			href: '/inquiry',
			banner: 'banner3',
		},
	];

	useEffect(() => {
		logPageView('플랫폼 페이지');
		let array = [];
		const className = {
			0: 'Carousel-button button1 selected',
			1: 'Carousel-button button2 nextTarget',
			2: 'Carousel-button button3 prevTarget',
		};

		adminService.getMainBanner().then(res => {
			res.Info.map((item, index) => {
				array.push({
					...item,
					buttonClassName: className[index],
					dataValue: (index + 1).toString(),
				});
			});
			setCarouselInfo(array);
		});

		const API_KEY = 'AIzaSyBprPa4ihwZq5vaXI0vWuNCpULc1BMJvUk';
		const LIST = 'PLeNCHKJ8JClo7LBDM2HEpa593PCygaBgR';
		axios
			.get(
				`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${LIST}&key=${API_KEY}&maxResults=50`,

				{ contentType: 'application/json' },
			)
			.then(res => {
				setVideoContents(res.data.items);
			})
			.catch(e => console.log(e));
		searchLeague(1, text, gameId, [], null, [], []);

		axios
			.get(`${url.file}/RecentReview`, { contentType: 'application/json' })
			.then(res => {
				setReview(res.data.Info.recent_review);
			});
		getPassCount();
	}, []);

	// useEffect(() => {}, []);

	const settings = {
		// centerMode: true,
		infinite: true,
		slidesToShow: 3.2,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
	};

	const settingsMobile = {
		infinite: true,
		slidesToShow: 1.3,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
	};
	const banner = {
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
		dots: true,
	};

	const DeskPopular = {
		infinite: true,
		slidesToShow: 4.7,
		// slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
	};

	const popular = {
		infinite: true,
		slidesToShow: 1.6,
		slidesToScroll: 1,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
	};

	return (
		<div className="HomeContainer">
			<FigureModal />
			<Media query={{ maxWidth: 768 }}>
				{matches =>
					matches ? (
						// ******************
						// ******************
						// 배너
						<div className="HomeContainer--subHeader">
							{/* <img  src={banner}/> */}
							<Slider {...banner}>
								{bannerList.map((item, index) => {
									return (
										<div className={`inner ${item.banner}`}>
											<div
												className="Banner"
												key={index}
												onClick={() => history.push(item.href)}
											>
												<div className="content--box">
													<div
														className={
															item.banner === 'banner' ? 'text black' : 'text'
														}
													>
														{item.text}
														<span
															className={
																item.banner === 'banner'
																	? 'text2 black'
																	: 'text2'
															}
														>
															{item.subText1}
														</span>
														<span
															className={
																item.banner === 'banner'
																	? 'text2 black'
																	: 'text2'
															}
														>
															{item.subText2}
														</span>
													</div>
													<a target="blank">
														<div className="img" />
													</a>
												</div>
											</div>
										</div>
									);
								})}
							</Slider>

							<div className="HomeContainer--subHeader--title">
								안녕하세요!
								<br />
								<span>
									{getUserInfo && getUserInfo.id
										? getUserInfo.nickName
										: '슈퍼플레이어'}
								</span>
								님!
								<p
									onClick={() =>
										changeMenu(
											getUserInfo && getUserInfo.id ? 'profile' : 'login',
										)
									}
								>
									{getUserInfo && getUserInfo.id
										? '내 프로필 가기 >'
										: '로그인 하러가기 >'}
								</p>
							</div>
						</div>
					) : (
						<div className="HomeContainer--Carousel">
							{carouselInfo.length > 0 && (
								<CarouselClass carousel2={carouselInfo} />
							)}
						</div>
					)
				}
			</Media>
			<div className="popular__league__desk--wrapper">
				<div className="title--box">
					<span className="popular__title">
						현재 <strong>인기리그</strong>
					</span>
				</div>
				<div className="tag--box">
					<span
						className="allBtn"
						type="button"
						onClick={() => {
							searchLeague(1, [], [], [], null, [], []);
						}}
					>
						전체
					</span>
					<button
						className="gameBtn"
						onClick={() => {
							searchLeague(1, [], [], '리그 오브 레전드', null, [], []);
						}}
					>
						리그 오브 레전드
					</button>
					<button
						className="gameBtn"
						onClick={() => {
							searchLeague(1, [], [], '배틀그라운드', null, [], []);
						}}
					>
						배틀그라운드
					</button>
					<button className="gameBtn" onClick={() => history.push('/league')}>
						더보기
					</button>
				</div>
				<Slider {...DeskPopular}>
					{leagueList.map((item, index) => {
						// 리그 시작일 +1
						const startDate = new Date(item.start_date);
						startDate.setDate(startDate.getDate() + 1);
						startDate.setHours(startDate.getHours() - 9);
						// 리그 신청일
						const applyStart = new Date(item.apply_start);
						applyStart.setHours(applyStart.getHours() - 9);
						// 리그 신청 마감일
						const applyEnd = new Date(item.apply_end);
						applyEnd.setHours(applyEnd.getHours() - 9);
						// 리그 시작일
						const start = new Date(item.start_date);
						start.setHours(start.getHours() - 9);
						return (
							<div className="popular__league" key={index}>
								<div className="content--box">
									<div className="content">
										<button
											type="button"
											className="contants--box"
											key={index}
											onClick={() => history.push(`/league/${item.league_id}`)}
										>
											<img
												className={
													new Date() > startDate
														? 'thumbnail endImg'
														: 'thumbnail '
												}
												src={
													item.league_main_img === 'null'
														? noImg
														: item.league_main_img
												}
												alt="thumbnail"
											/>
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
													(new Date() > applyEnd &&
														new Date() < start &&
														'state expected2')
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
											<div className="info--box">
												<div className="reward__info">
													<div className="reward--box">
														<div className="trophy--box">
															<img src={trophy} />
															<span className="text">{`${item.join_pass} 패스`}</span>
														</div>
														<div className="pople--box">
															{item.league_type === 0 ? (
																<img src={alone} />
															) : (
																<img src={team} />
															)}
															{item.league_type === 0 ? (
																<span className="text">
																	개인전{' '}
																	<b>
																		{item.participants}/{item.limit_people}
																	</b>
																</span>
															) : (
																<span className="text">
																	단체전
																	<b>
																		{item.participants}/{item.limit_people}
																	</b>
																</span>
															)}
														</div>
													</div>
												</div>
												<div className="title">
													{item.league_title.length > 31
														? `${item.league_title.substring(0, 32)}...`
														: item.league_title}
												</div>
												<div className="sub__title">
													<p className="game__name">{item.game_title_kr}</p>
													<p className="date">
														{moment(item.start_date)
															.add(-9, 'h')
															.format('MM.DD a h:mm')}
													</p>
												</div>
											</div>
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</Slider>
			</div>

			<div className="review__desk--wrapper">
				<div className="review__title">
					방금 이런게임이 <b>평가</b>되었어요
				</div>
				{review.map((item, idx) => {
					return (
						<div
							className="review--box"
							key={idx}
							onClick={() => {
								history.push(`/info/${item.game_id}`);
							}}
						>
							<div className="first--box">
								<span className="game">{item.game_title_kr}</span>
								<span>{timeForToday(item.createdAt)}</span>
							</div>
							<div className="second--box">
								<span className="star">
									<img src={BlueStar} /> {item.total_score}
								</span>
								<span>{item.nickname}</span>
							</div>
							<div>
								{item.evaluation_content.length > 45
									? `${item.evaluation_content.substring(0, 45)}...`
									: item.evaluation_content}
							</div>
						</div>
					);
				})}
			</div>

			{window.outerWidth < 768 ? (
				<>
					<div className="video--container_mobile">
						<div className="bar" />
						{/* 인기리그 */}
						{/* *************** */}

						<div className="popular__league--wrapper">
							<div className="title--box">
								<span className="popular__title">
									현재 <strong>인기리그</strong>
								</span>
								<button
									className="moreBtn"
									onClick={() => history.push('/league')}
								>
									더보기
								</button>
							</div>
							<div className="tag--box">
								<span
									className="allBtn"
									type="button"
									onClick={() => {
										searchLeague(1, [], [], [], null, [], []);
									}}
								>
									전체
								</span>
								<button
									className="gameBtn"
									onClick={() => {
										searchLeague(1, [], [], '리그 오브 레전드', null, [], []);
									}}
								>
									리그 오브 레전드
								</button>
								<button
									className="gameBtn"
									onClick={() => {
										searchLeague(1, [], [], '배틀그라운드', null, [], []);
									}}
								>
									배틀그라운드
								</button>
							</div>
							<Slider {...popular}>
								{leagueList.map((item, index) => {
									// 리그 시작일 +1
									const startDate = new Date(item.start_date);
									startDate.setDate(startDate.getDate() + 1);
									startDate.setHours(startDate.getHours() - 9);
									// 리그 신청일
									const applyStart = new Date(item.apply_start);
									applyStart.setHours(applyStart.getHours() - 9);
									// 리그 신청 마감일
									const applyEnd = new Date(item.apply_end);
									applyEnd.setHours(applyEnd.getHours() - 9);
									// 리그 시작일
									const start = new Date(item.start_date);
									start.setHours(start.getHours() - 9);
									return (
										<div className="popular__league" key={index}>
											<div className="content--box">
												<div className="content">
													<button
														type="button"
														className="contants--box"
														key={index}
														onClick={() =>
															history.push(`/league/${item.league_id}`)
														}
													>
														<img
															className={
																new Date() > startDate
																	? 'thumbnail endImg'
																	: 'thumbnail '
															}
															src={
																item.league_main_img === 'null'
																	? noImg
																	: item.league_main_img
															}
															alt="thumbnail"
														/>
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
																(new Date() > applyEnd &&
																	new Date() < start &&
																	'state expected2')
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
														<div className="info--box">
															<div className="reward__info">
																<div className="reward--box">
																	<div className="trophy--box">
																		<img src={trophy} />
																		<span className="text">{`${item.join_pass} 패스`}</span>
																	</div>
																	<div className="pople--box">
																		{item.league_type === 0 ? (
																			<img src={alone} />
																		) : (
																			<img src={team} />
																		)}
																		{item.league_type === 0 ? (
																			<span className="text">
																				개인전{' '}
																				<b>
																					{item.participants}/
																					{item.limit_people}
																				</b>
																			</span>
																		) : (
																			<span className="text">
																				단체전
																				<b>
																					{item.participants}/
																					{item.limit_people}
																				</b>
																			</span>
																		)}
																	</div>
																</div>
															</div>
															<div className="title">
																{item.league_title.length > 31
																	? `${item.league_title.substring(0, 32)}...`
																	: item.league_title}
															</div>
															<div className="sub__title">
																<p className="game__name">
																	{item.game_title_kr}
																</p>
																<p className="date">
																	{moment(item.start_date)
																		.add(-9, 'h')
																		.format('MM.DD a h:mm')}
																</p>
															</div>
														</div>
													</button>
												</div>
											</div>
										</div>
									);
								})}
							</Slider>
						</div>
					</div>
					<div className="bar" />
					<div className="review--wrapper">
						<div className="review__title">
							방금 이런게임이 <b>평가</b>되었어요
						</div>
						{review.map((item, idx) => {
							return (
								<div
									className="review--box"
									key={idx}
									onClick={() => {
										history.push(`/info/${item.game_id}`);
									}}
								>
									<div className="first--box">
										<span className="game">{item.game_title_kr}</span>
										<span>{timeForToday(item.createdAt)}</span>
									</div>
									<div className="second--box">
										<span className="star">
											<img src={BlueStar} /> {item.total_score}
										</span>
										<span>{item.nickname}</span>
									</div>
									<div>
										{item.evaluation_content.length > 45
											? `${item.evaluation_content.substring(0, 45)}...`
											: item.evaluation_content}
									</div>
								</div>
							);
						})}
					</div>
					<div className="bar" />
					<div className="viedo--box">
						<div className="title--box">
							<img src={vedioLogo} />
							<div className="title">슈플 TV</div>
						</div>
						<Slider {...settingsMobile}>
							{videoContents.map((item, index) => {
								return (
									<div className="content--wrapper" key={index}>
										<div className="content--box">
											<a
												href={`https://youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
												target="blank"
											>
												<img
													className="content"
													src={
														item.snippet.thumbnails.maxres &&
														item.snippet.thumbnails.maxres.url
													}
												/>
												<div className="text">{item.snippet.title}</div>
											</a>
											<div className="date">
												{item.snippet.publishedAt.substring(0, 10)}
											</div>
										</div>
									</div>
								);
							})}
						</Slider>
					</div>
				</>
			) : (
				<div className="video--container">
					<div className="title--box">
						<img src={vedioLogo} />
						<div className="title">슈플 TV</div>
					</div>
					<Slider {...settings}>
						{videoContents.map((item, index) => {
							return (
								<div className="content--wrapper" key={index}>
									<div className="content--box">
										<a
											href={`https://youtube.com/watch?v=${item.snippet.resourceId.videoId}`}
											target="blank"
										>
											<img
												className="content"
												src={
													item.snippet.thumbnails.maxres &&
													item.snippet.thumbnails.maxres.url
												}
											/>
											<div className="text">{item.snippet.title}</div>
										</a>
										<div className="date">
											{item.snippet.publishedAt.substring(0, 10)}
										</div>
									</div>
								</div>
							);
						})}
					</Slider>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		userInfo: state.auth.userInfo,
		mainEditorPick: state.editorPick.mainEditorPick,
		leagueList: state.league.leagueList,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		searchLeague: (
			count,
			league_type,
			game_id,
			text,
			join_pass,
			date_tag,
			ban,
		) =>
			dispatch(
				searchLeague(
					count,
					league_type,
					game_id,
					text,
					join_pass,
					date_tag,
					ban,
				),
			),
		getPassCount: () => dispatch(getPassCount()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
