import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
import { resetExtra } from '../../../store/League/League.store';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import Button from '../../Button/Button';
import { system, questionAnswer } from '../../../assets/dummyData/AuthData';
import ExtraLeague from '../ExtraLeague/ExtraLeague';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import more from '../../../static/images/moreBtn.svg';
import question from '../../../static/images/League/question.svg';
import { makeGroup } from '../../../Utils/func';

import './ExtraLayoutModal.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
const getItem = [];

const ExtraLayoutModal = ({
	extraModal,
	setExtraModal,
	insertLeagueInfo,
	user,
	matcheData,
	totalRound,
	participantsList,
	resetExtra,
	stage1,
	stage2,
	extraList,
	leagueType1,
	resultList,
	leagueTeamListRedux,
}) => {
	const [semifinal, setSemifinal] = useState(false);
	const [flag, setFlag] = useState(false);
	const [userData, setUserData] = useState(false);
	const [userDataGroupPreliminary, setUserDataGroupPreliminary] = useState([]);

	// 예선 스테이트
	const [mode, setMode] = useState('');
	const [preliminary, setPreliminary] = useState(true);
	const [preliminaryMore, setPreliminaryMore] = useState(true);
	const [group, setGroup] = useState(false);
	const [preliminaryGroup, setPreliminaryGroup] = useState('');
	const [preliminaryRound, setPreliminaryRound] = useState('');
	const [rule, setRule] = useState('');
	const [ruleState, setRuleState] = useState(true);
	const [dethmatchRound, setDethmachRound] = useState('');

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
		setUserDataGroupPreliminary(makeGroup(result1, Number(preliminaryGroup)));
	}, [flag, preliminaryGroup, selectModal]);

	const [reMatchData, setReMatchData] = useState([]);
	// 토너먼트 레이아웃 그리기
	useEffect(() => {
		try {
			axios
				.post(`${url.file}/LeagueLayoutDraw`, {
					participants: extraList.length,
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

					setReMatchData(region.rounds);
				});
		} catch (e) {
			console.error(e);
		}
	}, [flag]);

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

	const insert = () => {
		if (mode === 'DE' && rule === undefined) {
			alert('승리 조건을 입력해주세요.');
		} else if (mode === 'DE' && dethmatchRound === '') {
			alert('라운드를 입력해주세요');
		} else {
			try {
				axios
					.post(`${url.file}/LeagueLayoutInsert`, {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_id: window.location.pathname.split('/')[2],
						stage: 1,
						// (preliminary && !preliminary ? 1 : 2) ||
						// (!preliminary && preliminary ? 1 : 2),
						layout_type: (mode === 'TO' && 1) || (mode === 'DE' && 2),
						round_order: 0,
						round_number:
							(mode === 'TO' && '') || (mode === 'DE' && dethmatchRound),
						layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values:
							(mode === 'TO' && reMatchData) ||
							(mode === 'DE' && group ? preliminaryData : userData),
						win_rule: rule,
						layout_group_participants: {
							group_num: preliminaryGroup,
						},
						extra_stage: insertLeagueInfo.league_title,
					})
					.then(res => {
						if (res.data.Status === 'OK') {
							setExtraModal(false);
							window.location.reload();
						}
					});
			} catch (e) {
				console.error(e);
			}
		}
	};

	return (
		<div className="extra__modal--container">
			<div
				className="background"
				onClick={() => {
					setExtraModal(!extraModal);
					resetExtra();
				}}
			/>

			<article className="modal--box">
				<div className="modal__title">
					<h1>
						{totalRound !== undefined ? '추가 대진표 작성' : '대진표 작성'}
					</h1>
					<button>
						<img
							className="closeBtn"
							src={closeBtnGray}
							onClick={() => {
								setExtraModal(!extraModal);
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
						insertLeagueInfo={insertLeagueInfo}
						totalRound={totalRound}
						extraModal={extraModal}
						setExtraModal={setExtraModal}
						participantsList={participantsList}
						selectModal={selectModal}
						setSelectModal={setSelectModal}
						setMode={setMode}
						extraList={extraList}
						flag={flag}
						setFlag={setFlag}
						stage1={stage1}
					/>
				)}

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

								{mode === 'DE' && (
									<>
										<div className="innerSystem--box">
											<div className="innerSystem">
												<div
													type="button"
													className={group ? 'checkBox checked' : 'checkBox'}
													onClick={() => {
														setGroup(!group);
														setPreliminaryGroup('');
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
					<Button
						className="join__btn"
						size="medium"
						onClick={() => {
							insert();
						}}
					>
						배치 시작하기
					</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtraLayoutModal);
