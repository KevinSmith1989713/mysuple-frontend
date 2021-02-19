import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { resetExtra } from '../../../store/League/League.store';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import Button from '../../Button/Button';
import { system, questionAnswer } from '../../../assets/dummyData/AuthData';
import ExtraLeague from '../ExtraLeagueMain/ExtraLeagueMain';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import more from '../../../static/images/moreBtn.svg';
import question from '../../../static/images/League/question.svg';
import { makeGroup } from '../../../Utils/func';

import './LayoutModal.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const LayoutModal = ({
	modal,
	setModal,
	insertLeagueInfo,
	user,
	matcheData,
	totalRound,
	participantsList,
	resetExtra,
	leagueTeamList,
}) => {
	const [semifinal, setSemifinal] = useState(false);
	// const [flag,setFlag]=useState(false)
	const [userData, setUserData] = useState(false);
	const [userDataGroupPreliminary, setUserDataGroupPreliminary] = useState([]);
	const [userDataGroupMain, setUserDataGroupMain] = useState([]);
	const [teamList, setTeamList] = useState([]);
	const [teamListMain, setTeamListMain] = useState([]);

	// 예선 스테이트
	const [mode, setMode] = useState('');
	const [preliminary, setPreliminary] = useState(false);
	const [preliminaryMore, setPreliminaryMore] = useState(false);
	const [group, setGroup] = useState(false);
	const [preliminaryGroup, setPreliminaryGroup] = useState('');
	const [preliminaryRound, setPreliminaryRound] = useState('');
	const [rule, setRule] = useState('');
	const [ruleState, setRuleState] = useState(true);
	const [dethmatchRound, setDethmachRound] = useState('');

	// 본선 스테이트
	const [modeMain, setModeMain] = useState('');
	const [mainMore, setMainMore] = useState(false);
	const [groupMain, setGroupMain] = useState(false);
	const [mainGroup, setMainGroup] = useState('');
	const [mainRound, setMainRound] = useState('');
	const [ruleMain, setRuleMain] = useState('');
	const [ruleStateMain, setRuleStateMain] = useState(true);
	const [dethmatchRoundMain, setDethmachRoundMain] = useState('');

	// 추가경기
	const [selectModal, setSelectModal] = useState(false);

	useEffect(() => {
		const result = user.map(item => {
			return { nickname: item.nickname, score: 0 };
		});

		const result1 =
			result &&
			result.sort(function(a, b) {
				return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
			});
		setUserData(result1);
		setUserDataGroupPreliminary(makeGroup(result1, Number(preliminaryGroup)));
	}, [preliminaryGroup]);

	useEffect(() => {
		const result = user.map(item => {
			return { nickname: item.nickname, score: 0 };
		});

		const result1 =
			result &&
			result.sort(function(a, b) {
				return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
			});
		setUserDataGroupMain(makeGroup(result1, Number(mainGroup)));
	}, [mainGroup]);

	useEffect(() => {
		insertLeagueInfo.league_type === 1 &&
			group &&
			setTeamList(
				makeGroup(
					leagueTeamList,
					Number(preliminaryGroup),
					insertLeagueInfo.league_type,
				),
			);
	}, [preliminaryGroup]);

	useEffect(() => {
		insertLeagueInfo.league_type === 1 &&
			groupMain &&
			setTeamListMain(
				makeGroup(
					leagueTeamList,
					Number(mainGroup),
					insertLeagueInfo.league_type,
				),
			);
	}, [mainGroup]);

	const preliminaryData = userDataGroupPreliminary.map((item, idx) => {
		const result = item.group.map(item2 => {
			return {
				group: {
					nickname: item2.group && item2.group.nickname,
					score: 0,
					group_name: idx + 1,
				},
			};
		});
		return { group: result, group_name: idx + 1 };
	});

	const mainData = userDataGroupMain.map((item, idx) => {
		const result = item.group.map(item2 => {
			return {
				group: {
					nickname: item2.group && item2.group.nickname,
					score: 0,
					group_name: idx + 1,
				},
			};
		});
		return { group: result, group_name: idx + 1 };
	});

	const reLeagueTeamList =
		leagueTeamList &&
		leagueTeamList.map(item => {
			return { nickname: item.nickname, score: 0 };
		});

	const isIF = () => {
		if (mode === 'DE' && group) {
			if (insertLeagueInfo.league_type === 1) {
				return teamList;
			} else {
				return preliminaryData;
			}
		} else {
			if (insertLeagueInfo.league_type === 1) {
				return reLeagueTeamList;
			} else {
				return userData;
			}
		}
	};

	const isIFMain = () => {
		if (modeMain === 'DE' && groupMain) {
			if (insertLeagueInfo.league_type === 1) {
				return teamListMain;
			} else {
				return mainData;
			}
		} else {
			if (insertLeagueInfo.league_type === 1) {
				return reLeagueTeamList;
			} else {
				return userData;
			}
		}
	};

	const insertStage1 = () => {
		if (mode === 'DE' && rule === undefined) {
			alert('승리 조건을 입력해주세요.');
		} else if (mode === 'DE' && dethmatchRoundMain === '') {
			alert('라운드를 입력해주세요');
		} else {
			try {
				axios
					.post(`${url.file}/LeagueLayoutInsert`, {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_id: window.location.pathname.split('/')[2],
						stage: !preliminary ? 2 : 1,
						layout_type: (mode === 'TO' && 1) || (mode === 'DE' && 2),
						round_order: 0,
						round_number:
							(mode === 'TO' && '') || (mode === 'DE' && dethmatchRound),
						layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values:
							(modeMain === 'TO' && matcheData) ||
							(modeMain === 'DE' && isIF()),
						win_rule: rule,
						layout_group_participants: {
							group_num: !preliminary ? mainGroup : preliminaryGroup,
						},
					})
					.then(res => {
						if (res.data.Status === 'OK') {
							setPreliminaryGroup('');
						}
					});
			} catch (e) {
				console.error(e);
			}
		}
	};

	const insertStage2 = () => {
		if (modeMain === 'DE' && ruleMain === undefined) {
			alert('승리 조건을 입력해주세요.');
		} else if (modeMain === 'DE' && dethmatchRoundMain === '') {
			alert('라운드를 입력해주세요');
		} else {
			try {
				axios
					.post(`${url.file}/LeagueLayoutInsert`, {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_id: window.location.pathname.split('/')[2],
						stage:
							(preliminary && !preliminary ? 1 : 2) ||
							(!preliminary && preliminary ? 1 : 2),
						layout_type: (modeMain === 'TO' && 1) || (modeMain === 'DE' && 2),
						round_order: 0,
						round_number:
							(modeMain === 'TO' && '') ||
							(modeMain === 'DE' && dethmatchRoundMain),
						layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values:
							(modeMain === 'TO' && matcheData) ||
							(modeMain === 'DE' && isIFMain()),
						win_rule: ruleMain,
						layout_group_participants: {
							group_num:
								(preliminary && !preliminary ? preliminaryGroup : mainGroup) ||
								(!preliminary && preliminary ? preliminaryGroup : mainGroup),
						},
					})
					.then(res => {
						if (res.data.Status === 'OK') {
							setModal(false);
						}
					});
			} catch (e) {
				console.error(e);
			}
		}
	};

	const insertMain = () => {
		if (modeMain === 'DE' && ruleMain === undefined) {
			alert('승리 조건을 입력해주세요.');
		} else if (modeMain === 'DE' && dethmatchRoundMain === '') {
			alert('라운드를 입력해주세요');
		} else {
			try {
				axios
					.post(`${url.file}/LeagueLayoutInsert`, {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_id: window.location.pathname.split('/')[2],
						stage:
							(preliminary && !preliminary ? 1 : 2) ||
							(!preliminary && preliminary ? 1 : 2),
						layout_type: (modeMain === 'TO' && 1) || (modeMain === 'DE' && 2),
						round_order: 0,
						round_number:
							(modeMain === 'TO' && '') ||
							(modeMain === 'DE' && dethmatchRoundMain),
						layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values:
							(modeMain === 'TO' && matcheData) ||
							(modeMain === 'DE' && isIFMain()),
						win_rule: ruleMain,
						layout_group_participants: {
							group_num:
								(preliminary && !preliminary ? preliminaryGroup : mainGroup) ||
								(!preliminary && preliminary ? preliminaryGroup : mainGroup),
						},
					})
					.then(res => {
						if (res.data.Status === 'OK') {
							setModal(false);
							modeMain === 'DE' && window.location.reload();
						}
					});
			} catch (e) {
				console.error(e);
			}
		}
	};

	return (
		<div className="modal--container">
			<div
				className="background"
				onClick={() => {
					setModal(!modal);
					resetExtra();
				}}
			/>

			<article className="modal--box">
				<div className="modal__title">
					<h1>
						{' '}
						{totalRound !== undefined ? '추가 대진표 작성' : '대진표 작성'}
					</h1>
					<button>
						<img
							className="closeBtn"
							src={closeBtnGray}
							onClick={() => {
								setModal(!modal);
							}}
						/>
					</button>
				</div>

				{/************** // 추가 대진표 **************/}
				{/************** // 추가 대진표 **************/}
				{/************** // 추가 대진표 **************/}

				{/* {totalRound !== undefined && selectModal === false && (
					<ExtraLeague
						totalRound={totalRound}
						modal={modal}
						setModal={setModal}
						participantsList={participantsList}
						selectModal={selectModal}
						setSelectModal={setSelectModal}
					/>
				)} */}

				<div className="modal--inner">
					<div className="select--box">
						<div className="checkBox">
							<button
								className={preliminary ? 'check checked' : 'check'}
								onClick={() => {
									setPreliminary(!preliminary);
									setPreliminaryMore(true);
								}}
							/>
							<span>예선전 여부</span>
						</div>
						<img
							className={!preliminaryMore ? 'down up' : 'down'}
							src={more}
							type="button"
							onClick={() => setPreliminaryMore(!preliminaryMore)}
						/>
					</div>
					{preliminaryMore && (
						<div className="modalSystem--box">
							<div className="modalSystem__title">리그방식</div>
							<div className="modalSysyem__">
								<div className="modalBtn--box ">
									<button
										className={mode === 'TO' && 'select'}
										onClick={() => {
											setMode('TO');
											setGroup(false);
										}}
									>
										토너먼트 <img src={question}></img>
									</button>
									<button
										className={mode === 'DE' && 'select'}
										onClick={() => {
											setMode('DE');
											setGroup(false);
											setSemifinal(false);
										}}
									>
										데스매치 <img src={question}></img>
									</button>
								</div>

								{mode === 'TO' && (
									<>
										<div className="innerSystem--box">
											<div className="innerSystem">
												<div
													type="button"
													className={
														ruleState ? 'checkBox checked' : 'checkBox'
													}
													onClick={() => {
														setRuleState(!ruleState);
													}}
												/>
												승리규칙(예선)
											</div>
										</div>
										<input
											className="DE__input"
											placeholder="점수제 기준 (ex. 킬 수, 최종 생존 점수 …)"
											value={rule}
											onChange={e => setRule(e.target.value)}
										/>
									</>
								)}

								{mode === 'DE' && (
									<>
										<div className="innerSystem--box">
											<div className="innerSystem">
												<div
													type="button"
													className={group ? 'checkBox checked' : 'checkBox'}
													onClick={() => {
														setGroup(!group);
													}}
												/>
												조별 필요 여부
											</div>
										</div>
										<div className="group--box">
											총
											<input
												type="number"
												className="write_input"
												value={!group ? '' : preliminaryGroup}
												onChange={e => {
													!group
														? setPreliminaryGroup('')
														: setPreliminaryGroup(e.target.value);
												}}
											/>{' '}
											조{' '}
										</div>
										<div className="innerSystem--box">
											<div className="innerSystem">
												<div
													type="button"
													className={
														ruleState ? 'checkBox checked' : 'checkBox'
													}
													onClick={() => {
														setRuleState(!ruleState);
													}}
												/>
												승리규칙
											</div>
										</div>
										<input
											className="DE__input"
											placeholder="점수제 기준 (ex. 킬 수, 최종 생존 점수 …)"
											value={rule}
											onChange={e => setRule(e.target.value)}
										/>
										<div className="input__round">
											라운드를
											<input
												type="number"
												className="write_input"
												value={dethmatchRound}
												onChange={e => {
													setDethmachRound(e.target.value);
												}}
											/>
											번 진행합니다
										</div>
									</>
								)}
							</div>
						</div>
					)}

					{/*************** 본선 ***************/}
					{/*************** 본선 ***************/}
					{/*************** 본선 ***************/}

					<div className="select--box main">
						<div className="checkBox">
							<span>
								본선 <b>*</b>
							</span>
						</div>
						<img
							className={mainMore ? 'down up' : 'down'}
							src={more}
							type="button"
							onClick={() => setMainMore(!mainMore)}
						/>
					</div>
					{!mainMore && (
						<div className="modalSystem--box">
							<div className="modalSystem__title">리그방식</div>
							<div className="modalSysyem__">
								<div className="modalBtn--box ">
									<button
										className={modeMain === 'TO' && 'select'}
										onClick={() => {
											setModeMain('TO');
											// setGroup(false);
										}}
									>
										토너먼트 <img src={question}></img>
									</button>
									<button
										className={modeMain === 'DE' && 'select'}
										onClick={() => {
											setModeMain('DE');
											// setGroup(false);
											setSemifinal(false);
										}}
									>
										데스매치 <img src={question}></img>
									</button>
								</div>
								{modeMain === 'TO' && (
									<>
										<div className="innerSystem--box">
											<div className="innerSystem">
												<div
													type="button"
													className={
														ruleStateMain ? 'checkBox checked' : 'checkBox'
													}
													onClick={() => {
														setRuleStateMain(!ruleStateMain);
													}}
												/>
												승리규칙
											</div>
										</div>
										<input
											className="DE__input"
											placeholder="점수제 기준 (ex. 킬 수, 최종 생존 점수 …)"
											value={ruleMain}
											onChange={e => setRuleMain(e.target.value)}
										/>
									</>
								)}
								{modeMain === 'DE' && (
									<>
										<div className="innerSystem--box">
											<div className="innerSystem">
												<div
													type="button"
													className={
														groupMain ? 'checkBox checked' : 'checkBox'
													}
													onClick={() => {
														setGroupMain(!groupMain);
														setMainGroup('');
														setMainRound('');
													}}
												/>
												조별 필요 여부
											</div>
										</div>
										<div className="group--box">
											총
											<input
												type="number"
												className="write_input"
												value={!groupMain ? '' : mainGroup}
												onChange={e => {
													!groupMain
														? setMainGroup('')
														: setMainGroup(e.target.value);
												}}
											/>{' '}
											조{' '}
										</div>
										<div className="innerSystem--box">
											<div className="innerSystem">
												<div
													type="button"
													className={
														ruleStateMain ? 'checkBox checked' : 'checkBox'
													}
													onClick={() => {
														setRuleStateMain(!ruleStateMain);
													}}
												/>
												승리규칙
											</div>
										</div>
										<input
											className="DE__input"
											placeholder="점수제 기준 (ex. 킬 수, 최종 생존 점수 …)"
											value={ruleMain}
											onChange={e => setRuleMain(e.target.value)}
										/>
										<div className="input__round">
											라운드를
											<input
												type="number"
												className="write_input"
												value={dethmatchRoundMain}
												onChange={e => {
													setDethmachRoundMain(e.target.value);
												}}
											/>
											번 진행합니다
										</div>
									</>
								)}
							</div>
						</div>
					)}

					<div className="Total--box">
						<div className="totla__title">TOTAL</div>
						<div className="inner">
							<div>
								총<b> {user.length} </b>명
							</div>
							<div>
								각 팀<b> {insertLeagueInfo.member_count} </b> 명
							</div>
						</div>
					</div>
					{preliminary ? (
						<>
							<Button
								className="join__btn"
								size="medium"
								onClick={() => {
									insertStage1();
									insertStage2();
								}}
							>
								배치 시작하기
							</Button>
						</>
					) : (
						<>
							<Button
								className="join__btn"
								size="medium"
								onClick={() => {
									insertMain();
								}}
							>
								배치 시작하기
							</Button>
						</>
					)}
				</div>
			</article>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		resetExtra: () => dispatch(resetExtra()),
	};
};

export default connect(null, mapDispatchToProps)(LayoutModal);
