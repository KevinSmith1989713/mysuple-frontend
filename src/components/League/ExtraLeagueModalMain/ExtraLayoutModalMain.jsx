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

import './ExtraLayoutModalMain.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const ExtraLayoutModalMain = ({
	extraModalMain,
	setExtraModalMain,
	insertLeagueInfo,
	user,
	matcheData,
	totalRound,
	participantsList,
	resetExtra,
	stage1,
	stage2,
	extraList,
	leagueTeamListRedux,
	resultList,
}) => {
	const [semifinal, setSemifinal] = useState(false);
	const [flag, setFlag] = useState(false);
	const [userData, setUserData] = useState(false);
	const [userDataGroupPreliminary, setUserDataGroupPreliminary] = useState([]);
	const [userDataGroupMain, setUserDataGroupMain] = useState([]);

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
		const result = extraList.map(item => {
			return { nickname: item.nickname, score: 0 };
		});
		const result1 =
			result &&
			result.sort(function(a, b) {
				return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
			});
		setUserData(result1);
		setUserDataGroupMain(makeGroup(result1, Number(mainGroup)));
	}, [mainGroup, selectModal]);

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

	const [reExtra, setReExtra] = useState([]);
	const extraListLength = extraList.length;
	// 토너먼트 레이아웃 그리
	useEffect(() => {
		try {
			axios
				.post(`${url.file}/LeagueLayoutDraw`, {
					participants: extraListLength,
					layout_type: 1,
				})
				.then(res => {
					const arr = [];
					const isRound = res.data.Info.league_layout.reverse().map(item => {
						const result = item.round.map((item2, index) => {
							arr.push(index);
							return {
								round: item2.round,
								name:
									extraList[arr.length - 1] &&
									extraList[arr.length - 1].nickname,
								id: arr.length,
								score:
									(extraList[arr.length - 1] &&
										extraList[arr.length - 1].nickname) === undefined
										? null
										: null,
								idx:
									(extraList[arr.length - 1] &&
										extraList[arr.length - 1].nickname) === undefined &&
									arr.length,
							};
						});
						return { matches: resultList(result) };
					});
					const region = {
						rounds: isRound,
					};
					setReExtra(region.rounds);
					// }
				});
		} catch (e) {
			console.error(e);
		}
	}, [extraListLength]);

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
						stage: 1,
						layout_type: (mode === 'TO' && 1) || (mode === 'DE' && 2),
						round_order: 0,
						round_number:
							(mode === 'TO' && '') || (mode === 'DE' && dethmatchRound),
						layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values:
							(modeMain === 'TO' && matcheData) ||
							(modeMain === 'DE' && groupMain ? mainData : userData),
						win_rule: rule,
						layout_group_participants: {
							group_num: !preliminary ? mainGroup : preliminaryGroup,
						},
						extra_stage: insertLeagueInfo.league_title,
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

	// console.log(matcheData);
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
						stage: 2,
						// (preliminary && !preliminary ? 1 : 2) ||
						// (!preliminary && preliminary ? 1 : 2),
						layout_type: (modeMain === 'TO' && 1) || (modeMain === 'DE' && 2),
						round_order: 0,
						round_number:
							(modeMain === 'TO' && '') ||
							(modeMain === 'DE' && dethmatchRoundMain),
						layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values:
							(modeMain === 'TO' && reExtra) ||
							(modeMain === 'DE' && groupMain ? mainData : userData),
						win_rule: ruleMain,
						layout_group_participants: {
							group_num:
								(preliminary && !preliminary ? preliminaryGroup : mainGroup) ||
								(!preliminary && preliminary ? preliminaryGroup : mainGroup),
						},
						extra_stage: insertLeagueInfo.league_title,
					})
					.then(res => {
						if (res.data.Status === 'OK') {
							setExtraModalMain(false);
							window.location.reload();
						}
					});
			} catch (e) {
				console.error(e);
			}
		}
	};

	// console.log(stage2 === null ? '' : stage2[stage2.length - 1]);
	return (
		<div className="extra__modal--container">
			<div
				className="background"
				onClick={() => {
					setExtraModalMain(!extraModalMain);
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
								setExtraModalMain(!extraModalMain);
							}}
						/>
					</button>
				</div>

				{/************** // 추가 대진표 **************/}
				{/************** // 추가 대진표 **************/}
				{/************** // 추가 대진표 **************/}

				{totalRound !== undefined && selectModal === false && (
					<ExtraLeague
						leagueTeamListRedux={leagueTeamListRedux}
						totalRound={totalRound}
						extraModalMain={extraModalMain}
						setExtraModalMain={setExtraModalMain}
						participantsList={participantsList}
						selectModal={selectModal}
						setSelectModal={setSelectModal}
						stage2={stage2}
						setModeMain={setModeMain}
						extraList={extraList}
						flag={flag}
						setFlag={setFlag}
						insertLeagueInfo={insertLeagueInfo}
					/>
				)}

				<div className="modal--inner">
					{/* <div className="select--box">
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
					</div> */}

					{/* {preliminaryMore && (
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
														semifinal ? 'checkBox checked' : 'checkBox'
													}
													onClick={() => setSemifinal(!semifinal)}
												/>
												3, 4위 결정전
											</div>
											<div className="innerSystem">
												<div
													className="checkBox"
													type="button"
													className={group ? 'checkBox checked' : 'checkBox'}
													onClick={() => setGroup(!group)}
												/>
												점수제 필요 여부
											</div>
										</div>
										<Select
											className="select-form"
											defaultValue={{ label: '3판2선승제' }}
											options={system}
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
					)} */}

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
											value={rule}
											onChange={e => setRule(e.target.value)}
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
								총<b> {extraList.length} </b>명
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

const mapStateToProps = state => {
	return {
		extraList: state.league.extraList,
		leagueTeamListRedux: state.league.leagueTeamListRedux,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetExtra: () => dispatch(resetExtra()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ExtraLayoutModalMain);
