import React, { useState, useEffect, useRef } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';

import {
	leagueFilterGame,
	deleteLeagueInfo,
	searchLeague,
	getLeagueType,
	getLeagueState,
	getTierInfo,
	getLeagueBanList,
} from '../../../store/League/League.store';
import moment from 'moment';

import { startLoading } from '../../../store/Layout/Layout.store';
import { filterGameID } from '../../../store/Colleague/Colleague.store';
import Input from '../../../components/Input/Input';
import Title from '../../../components/Title/Title';

import LeagueFilterTable from '../../../components/League/LeagueFilterTable/LeagueFilterTable';
import ShowHide from '../../../components/ShowHide/ShowHide';

import trophy from '../../../static/images/League/blueTrophy.svg';
import alone from '../../../static/images/League/bluePeople.svg';
import team from '../../../static/images/League/leagueTeam.svg';
import noImg from '../../../static/images/League/league_noImage.svg';
import Search from '../../../static/images/Chatting/search_sky.svg';
import tool from '../../../static/images/League/tool.svg';

import './LeagueMainContainer.scss';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

const date = e =>
	`${e.substring(5, 10).replace(/-/g, '.')} ${
		e.substring(11, 13) >= 12 ? 'PM' : 'AM'
	} ${e.substring(11, 16)}`;

const LeagueContainer = ({
	leagueFilterGameList,
	leagueFilterGame,
	deleteLeagueInfo,
	searchLeague,
	leagueList,
	filterGameID,
	gameId,
	getLeagueType,
	getLeagueState,
	leagueFilterType,
	leagueFilterState,
	getTierInfo,
	getLeagueBanList,
	leagueFilterBanList,
	insertLeagueInfo,
	form,
	isSuccess,
}) => {
	let history = useHistory();
	const [text, setText] = useState('');
	const [flag, setFlag] = useState(false);
	const [flag2, setFlag2] = useState(false);
	const [count, setCount] = useState(1);
	const [bringFilterDataList, setBringFilterDataList] = useState([]);
	const [filterState, setFilterState] = useState(false);

	const onChange = e => {
		setText(e.target.value);
	};

	const renderFilter = e => {
		setFlag(e);
	};

	const bringFilterData = e => {
		bringFilterDataList.push(e);
	};

	const closeTag = e => {
		// console.log(e.target.id);
		if (leagueFilterGameList.indexOf(e.target.id) != -1) {
			const newArr = leagueFilterGameList;
			const itemToFind = newArr.find(function(item) {
				return item === e.target.id;
			});
			const idx = newArr.indexOf(itemToFind);
			if (idx > -1) {
				newArr.splice(idx, 1);
			}
		}
		setFlag(!flag);
		searchLeague(count, null, null, text, null, leagueFilterState, null);

		setFlag2(!flag2);
	};
	useEffect(() => {}, [flag]);
	useEffect(() => {}, [flag2]);

	useEffect(() => {
		searchLeague(
			count,
			leagueFilterType,
			gameId,
			text,
			null,
			leagueFilterState,
			leagueFilterBanList,
		);
	}, [count, isSuccess]);
	const submit = () => {
		searchLeague(
			count,
			leagueFilterType,
			gameId,
			text,
			null,
			leagueFilterState,
			leagueFilterBanList,
		);
		setCount(1);
	};

	const lastCardRef = useRef(null);

	const intersectionObserver = new IntersectionObserver((entries, observer) => {
		const lastCard = entries[0];

		if (lastCard.intersectionRatio > 0) {
			observer.unobserve(lastCard.target);
			lastCardRef.current = null;
			setCount(count + 1);
		}
	});

	useEffect(() => {
		if (lastCardRef.current) {
			intersectionObserver.observe(lastCardRef.current);
		}
	});

	return (
		<div className="LeagueContainer">
			{!filterState && (
				<div
					className="makeLeagueBtn__mobile"
					onClick={() => {
						getUserInfo === null
							? alert('로그인 이후에 진행해 주세요.')
							: history.push(`/makeLeague/step1`);
						deleteLeagueInfo();
					}}
				>
					+
				</div>
			)}
			<div className="LeagueContainer--Title">
				<Title border="thick" size="large">
					리그
				</Title>
				<button
					className="makeLeague__btn"
					type="button"
					onClick={() => {
						getUserInfo === null
							? alert('로그인 이후에 진행해 주세요.')
							: history.push(`/makeLeague/step1`);
						deleteLeagueInfo();
					}}
				>
					리그 만들기
				</button>
			</div>
			<div className="LeagueContainer--Input">
				<input
					className="search"
					placeholder="검색어를 입력하세요"
					onChange={onChange}
					value={text}
					onKeyPress={e => {
						if (e.charCode === 13) {
							submit();
						}
					}}
				/>
				<div className="img--box">
					<img
						className="img"
						src={tool}
						onClick={() => setFilterState(!filterState)}
						type="button"
					/>
					<img className="img" src={Search} onClick={submit} type="button" />
				</div>
			</div>
			<div className="tag--box">
				{leagueFilterGameList.map((item, index) => {
					return (
						<div
							className={`tag`}
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
			<div className="LeagueContainer--ShowHide">
				{/* <ShowHide arrowPosition="right" fold={true} text="게임 필터검색"> */}

				{window.innerWidth < 769 ? (
					filterState ? (
						<div className="LeagueFilterTable">
							<LeagueFilterTable
								leagueFilterGameList={leagueFilterGameList}
								leagueFilterGame={leagueFilterGame}
								renderFilter={renderFilter}
								searchLeague={searchLeague}
								text={text}
								gameId={gameId}
								filterGameID={filterGameID}
								getLeagueType={getLeagueType}
								getLeagueState={getLeagueState}
								leagueFilterType={leagueFilterType}
								leagueFilterState={leagueFilterState}
								getTierInfo={getTierInfo}
								bringFilterData={bringFilterData}
								getLeagueBanList={getLeagueBanList}
								leagueFilterBanList={leagueFilterBanList}
								insertLeagueInfo={insertLeagueInfo}
								filterState={filterState}
								setFilterState={setFilterState}
								onChange={onChange}
								setCount={setCount}
								count={count}
							/>
						</div>
					) : (
						''
					)
				) : !filterState ? (
					<div className="LeagueFilterTable">
						<LeagueFilterTable
							leagueFilterGameList={leagueFilterGameList}
							leagueFilterGame={leagueFilterGame}
							renderFilter={renderFilter}
							searchLeague={searchLeague}
							text={text}
							gameId={gameId}
							filterGameID={filterGameID}
							getLeagueType={getLeagueType}
							getLeagueState={getLeagueState}
							leagueFilterType={leagueFilterType}
							leagueFilterState={leagueFilterState}
							getTierInfo={getTierInfo}
							bringFilterData={bringFilterData}
							getLeagueBanList={getLeagueBanList}
							leagueFilterBanList={leagueFilterBanList}
							insertLeagueInfo={insertLeagueInfo}
							filterState={filterState}
							setFilterState={setFilterState}
							onChange={onChange}
							setCount={setCount}
							count={count}
						/>
					</div>
				) : (
					''
				)}

				{/* </ShowHide> */}
			</div>
			<div className="LeagueContainer--Contants">
				{leagueList.map((item, index) => {
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
						<button
							type="button"
							className="contants--box"
							key={index}
							onClick={() => history.push(`/league/${item.league_id}`)}
						>
							<img
								ref={lastCardRef}
								className={
									new Date() > startDate ? 'thumbnail endImg' : 'thumbnail '
								}
								src={
									item.league_main_img === 'null' ? noImg : item.league_main_img
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
							<div className="info--box">
								<div className="reward__info">
									<div className="reward--box">
										<div className="img--box">
											<p className="rewardImg">
												<img src={trophy} />
												{`${item.join_pass} 패스`}
											</p>
										</div>
										<div className="img--box">
											<p className="rewardImg poeple ">
												{item.league_type === 0 ? (
													<img src={alone} />
												) : (
													<img src={team} />
												)}
												{item.league_type === 0 ? (
													<span>
														개인전{' '}
														<b>
															{item.participants}/{item.limit_people}
														</b>
													</span>
												) : (
													<span>
														단체전
														<b>
															{item.participants}/{item.limit_people}
														</b>
													</span>
												)}
											</p>
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
									<p className="date">{date(item.start_date)}</p>
								</div>
							</div>
						</button>
					);
				})}
			</div>

			{/* <div
				className="more"
				onClick={() => {
					setCount(count + 1);
				}}
			>
				<div>더보기</div>
				<img src={Lower} />
			</div> */}

			{/* <LeagueMyinfo /> */}
			{/* <SliderBox />
			<SliderBox />
			<SliderBox /> */}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		leagueFilterGameList: state.league.leagueFilterGameList,
		leagueList: state.league.leagueList,
		gameId: state.colleague.gameId,
		leagueFilterType: state.league.leagueFilterType,
		leagueFilterState: state.league.leagueFilterState,
		leagueFilterBanList: state.league.leagueFilterBanList,
		insertLeagueInfo: state.league.insertLeagueInfo,
		isSuccess: state.layout.isSuccess,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		leagueFilterGame: info => dispatch(leagueFilterGame(info)),
		deleteLeagueInfo: () => dispatch(deleteLeagueInfo()),
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
		filterGameID: info => dispatch(filterGameID(info)),
		getLeagueType: info => dispatch(getLeagueType(info)),
		getLeagueState: info => dispatch(getLeagueState(info)),
		getTierInfo: info => dispatch(getTierInfo(info)),
		getLeagueBanList: info => dispatch(getLeagueBanList(info)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueContainer);
