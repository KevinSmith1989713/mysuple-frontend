import React, { useState, useEffect, Fragment } from 'react';

import Button from '../../../components/Button/Button';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import mic from '../../../static/images/League/mic.svg';
import micNotAllowed from '../../../static/images/League/micNotAllowed.svg';
import progamer from '../../../static/images/League/progamer.svg';
import progamerNotAllowed from '../../../static/images/League/progamerNotAllowed.svg';
import broadcast from '../../../static/images/League/broadcast.svg';
import broadcastNotAllowed from '../../../static/images/League/broadcastNotAllowed.svg';
import leagueCustermImg from '../../../static/images/League/leagueCustermImg.svg';
import myInfoPath from '../../../static/images/MobileMenu/mobileMenuImg2.svg';
import lockImg from '../../../static/images/League/lock.svg';

import './JoinModal.scss';

const JoinModal = ({
	setAttendModal,
	attendModal,
	insertLeagueInfo,
	joinLeague,
	makeLeagueTeam,
	getLeagueTeamList,
	leagueTeamListRedux,
	passCount,
	payModal,
	setPayModal,
	insertPass,
	getPassCount,
}) => {
	const [flag, setFlag] = useState(false);
	// 리그 참가

	const [nextStep, setNextStep] = useState(true);
	const [term, setTerm] = useState(false);
	// 리그 리그 팀 참가
	const [lock, setLock] = useState(false);
	const [teamName, setTeamName] = useState('');
	const [password, setPassword] = useState('');
	const [selectPassword, setSelectPassword] = useState(null);
	const [checkPassword, setCheckPassword] = useState('');
	const [selectTeamInfo, setSelectTeamInfo] = useState([]);
	const leagueId = window.location.pathname.substring(8);

	const [checked, setChecked] = useState('');
	const [sendAnswerList, setSendAnswerList] = useState([]);
	const [questionId, setQuestionId] = useState(0);

	const [questionList, setQuestionList] = useState(insertLeagueInfo.question);

	useEffect(() => {
		nextStep === false && getLeagueTeamList(null, leagueId);
	}, [nextStep]);

	const makeTeam = () => {
		if (teamName === '') {
			alert('팀 이름을 적어주세요.');
		} else {
			makeLeagueTeam(null, teamName, leagueId, lock, password);
			setTeamName('');
			setPassword('');
			setLock(false);
			setFlag(!flag);
		}
	};

	const slectTeam = item => {
		setSelectTeamInfo([item]);
		setCheckPassword(item.password);
	};
	useEffect(() => {
		getPassCount();
	}, []);
	useEffect(() => {}, [flag]);

	const numberMaxLength = e => {
		if (e.target.value.length > e.target.maxLength) {
			e.target.value = e.target.value.slice(0, e.maxLength - 1);
		}
	};

	const tierString =
		insertLeagueInfo.ban &&
		insertLeagueInfo.ban.tier &&
		insertLeagueInfo.ban.tier.split(',');

	const isTierFirstIndex = () => {
		return (
			(tierString && tierString[0] === 'iron' && '아이언') ||
			(tierString && tierString[0] === 'bronze' && '브론즈') ||
			(tierString && tierString[0] === 'silver' && '실버') ||
			(tierString && tierString[0] === 'gold' && '골드') ||
			(tierString && tierString[0] === 'platinum' && '플래티') ||
			(tierString && tierString[0] === 'diamond' && '다이아') ||
			(tierString && tierString[0] === 'master' && '마스터') ||
			(tierString && tierString[0] === 'grandmaster' && '그마')
		);
	};

	const isTierLastIndex = () => {
		return (
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'bronze' &&
				'브론즈') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'silver' &&
				'실버') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'gold' &&
				'골드') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'platinum' &&
				'플래티') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'diamond' &&
				'다이아') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'master' &&
				'마스터') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'grandmaster' &&
				'그마') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'challenger' &&
				'챌린저')
		);
	};

	const isMultyChoice = (e, item) => {
		setQuestionId(item.question_id);
		const itemToFind1 = sendAnswerList.find(function(item2) {
			return item2.question_id === item.question_id;
		});
		const itemToFind2 = sendAnswerList.find(function(item2) {
			return item2.idx === e.idx;
		});
		const idx1 = sendAnswerList.indexOf(itemToFind1);
		const idx2 = sendAnswerList.indexOf(itemToFind2);

		if (idx2 > -1) {
			sendAnswerList.splice(idx2, 1);
		} else if (idx1 > -1) {
			sendAnswerList.splice(idx1, 1);
			sendAnswerList.push({
				question_id: item.question_id,
				answer: e.value,
				idx: e.idx,
			});
			setFlag(!flag);
		} else {
			sendAnswerList.push({
				question_id: item.question_id,
				answer: e.value,
				idx: e.idx,
			});
			setFlag(!flag);
		}
	};

	const isSelectAnswerList = () => {
		const array = [];
		sendAnswerList.map(item => {
			array.push(item.answer);
			return;
		});
		return array;
	};

	const isSelectAnswerList2 = () => {
		const array = [];
		sendAnswerList.map(item => {
			array.push(item.idx);
			return;
		});
		return array;
	};

	const isAnswer = () => {
		const arr = [];
		const result =
			questionList &&
			questionList.map(item => {
				return { question_id: item.question_id, answer: item.deletedAt };
			});

		result &&
			result.forEach(ele => {
				if (ele.answer === '') {
					arr.push();
				} else if (ele.answer !== null) {
					arr.push({
						question_id: ele.question_id,
						answer: ele.answer,
					});
				}
			});
		return arr;
	};

	const sendAnswer = () => {
		const array = [];
		insertLeagueInfo.question.map(item => {
			array.push(
				item.question_id > 0 && { answer: '', question_id: item.question_id },
			);
			return item;
		});

		array.push(...sendAnswerList.concat(isAnswer()));

		const res = Object.values(
			array.reduce((a, { question_id, answer }) => {
				a[question_id] = a[question_id] || {
					question_id,
					answer: new Set(),
				};
				a[question_id].answer.add(answer);
				return a;
			}, {}),
		).map(({ question_id, answer }) => {
			return {
				question_id,
				answer: [...answer].join(''),
			};
		});
		return res;
	};

	const isQuestionTitle = (item, e) => {
		let array = [];
		questionList.map(item2 => {
			const itemToFind = questionList.find(function(id) {
				return id.question_id === item.question_id;
			});
			const idx = questionList.indexOf(itemToFind);

			if (item2.question_id === item.question_id) {
				array.push({
					...item2,
					deletedAt: e.target.value,
				});
			} else {
				array.push(item2);
			}
			setQuestionList(array);
		});
	};

	const putRequiredAnswer = () => {
		const arr = [];
		const result = questionList && questionList.map(item => item);

		result &&
			result.forEach(ele => {
				if (ele.required === 1) {
					arr.push({
						question_id: ele.question_id,
						answer: ele.answer,
					});
				}
			});
		return arr;
	};

	const requiredAnswer = putRequiredAnswer().map(item => item.question_id);
	const checkRequied = sendAnswerList
		.concat(isAnswer())
		.map(item => item.question_id);

	const checkAnswer = requiredAnswer.every(num => {
		const result = checkRequied.indexOf(num);
		return result > -1 ? true : false;
	});

	const joinLeagueSingle = () => {
		if (checkAnswer === false) {
			alert('필수 항목을 작성해주세요.');
		} else if (term === false) {
			alert('규칙과 금지사항을 동의해주세요.');
		} else if (insertLeagueInfo.league_type === 0) {
			if (insertLeagueInfo.join_pass > passCount) {
				setAttendModal(!attendModal);
				setPayModal(!payModal);
			} else {
				joinLeague(null, leagueId, null, sendAnswer());
				insertPass(
					null,
					3,
					window.location.pathname.split('/')[2],
					-insertLeagueInfo.join_pass,
					`${insertLeagueInfo.league_title} + 참가`,
				);
				setAttendModal(!attendModal);
				setTerm(!term);
			}
		} else {
			setNextStep(false);
		}
	};

	const joinLeagueTeam = () => {
		const teamId = selectTeamInfo[0] && selectTeamInfo[0].team_id;
		if (selectTeamInfo[0] && selectTeamInfo[0].password !== selectPassword) {
			alert('비밀번호가 일치하지 않습니다.');
			setSelectPassword('');
		} else if (selectTeamInfo.length !== 1) {
			alert('팀을 선택해주세요.');
		} else if (insertLeagueInfo.join_pass > passCount) {
			setAttendModal(!attendModal);
			setPayModal(!payModal);
		} else {
			joinLeague(null, leagueId, teamId, sendAnswer());
			// insertPass(
			// 	null,
			// 	3,
			// 	window.location.pathname.split('/')[2],
			// 	-insertLeagueInfo.join_pass,
			// 	`${insertLeagueInfo.league_title} + 참가`,
			// );
			setNextStep(true);
			setAttendModal(!attendModal);
			setCheckPassword('');
			setSelectPassword('');
		}
	};

	return (
		<div className="attend--container">
			<div
				className="background"
				onClick={() => setAttendModal(!attendModal)}
			/>

			{nextStep ? (
				<article className="attend--box">
					<div className="title--box">
						<h1>리그 참가</h1>
						<button>
							<img
								className="closeBtn"
								src={closeBtnGray}
								onClick={() => setAttendModal(!attendModal)}
							/>
						</button>
					</div>
					<ul className="attend__info">
						{/* {insertLeagueInfo.ban && insertLeagueInfo.ban.age !== undefined && (
							<li className="info--box">
								<p className="info">
									<b>12</b>명
								</p>
								<div className="info__subTitle">인원제한</div>
							</li>
						)} */}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.score !== undefined && (
							<li className="info--box">
								<p className="info column">
									{insertLeagueInfo.ban.tier === undefined ? (
										'제한 없음'
									) : (
										<>
											<b className="blue">
												{(insertLeagueInfo.ban &&
													insertLeagueInfo.ban.score.gte) ||
													insertLeagueInfo.ban.score.lte}
											</b>
											점 {insertLeagueInfo.ban.score.gte ? '이상' : '이하'}
										</>
									)}
								</p>
								<div className="info__subTitle">점수</div>
							</li>
						)}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.mic !== undefined && (
							<li className="info--box">
								<div className="info">
									{insertLeagueInfo.ban && insertLeagueInfo.ban.mic === '1' ? (
										<>
											<img className="infoImg" src={mic} />
										</>
									) : (
										<>
											<img className="infoImg" src={micNotAllowed} />
										</>
									)}
								</div>
								<div className="info__subTitle">
									마이크/채팅{' '}
									{insertLeagueInfo.ban && insertLeagueInfo.ban.mic === '1'
										? '허용'
										: '비허용'}
								</div>
							</li>
						)}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.pro !== undefined && (
							<li className="info--box">
								<div className="info">
									{insertLeagueInfo.ban && insertLeagueInfo.ban.pro === '1' ? (
										<img className="infoImg progamer" src={progamer} />
									) : (
										<img
											className="infoImg progamer"
											src={progamerNotAllowed}
										/>
									)}
								</div>
								<div className="info__subTitle">
									프로게이머
									<br />{' '}
									{insertLeagueInfo.ban && insertLeagueInfo.ban.pro === '1'
										? '허용'
										: '금지'}
								</div>
							</li>
						)}
						{insertLeagueInfo.ban &&
							insertLeagueInfo.ban.broadcast !== undefined && (
								<li className="info--box">
									<div className="info">
										{insertLeagueInfo.ban &&
										insertLeagueInfo.ban.broadcast === '1' ? (
											<img className="infoImg" src={broadcast} />
										) : (
											<img className="infoImg" src={broadcastNotAllowed} />
										)}
									</div>
									<div className="info__subTitle">
										방송{' '}
										{insertLeagueInfo.ban &&
										insertLeagueInfo.ban.broadcast === '1'
											? '허용'
											: '비허용'}
									</div>
								</li>
							)}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.age !== undefined && (
							<li className="info--box">
								<div className="info">
									<b>
										{(insertLeagueInfo.ban && insertLeagueInfo.ban.age.gte) ||
											insertLeagueInfo.ban.age.lte}
									</b>
									세{' '}
									{(insertLeagueInfo.ban &&
										insertLeagueInfo.ban.age.gte &&
										'이상') ||
										(insertLeagueInfo.ban.age.lte && '이하')}
								</div>
								<div className="info__subTitle">나이</div>
							</li>
						)}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.tier !== undefined && (
							<li className="info--box">
								<div className="info column">
									<div className="tier--box">
										<b className="blue">{isTierFirstIndex()}</b>
										이상
									</div>
									<div>
										<b>{isTierLastIndex()}</b>
										이하
									</div>
								</div>
								<div className="info__subTitle">티어</div>
							</li>
						)}
						{insertLeagueInfo.ban &&
							insertLeagueInfo.ban.manualKey !== undefined && (
								<li className="info--box">
									<div className="info column">
										<img className="infoImg" src={leagueCustermImg} />
										<div className="manualText">
											{insertLeagueInfo.ban && insertLeagueInfo.ban.manualKey}
										</div>
									</div>
									<div className="info__subTitle">
										{insertLeagueInfo.ban && insertLeagueInfo.ban.manualValue}
									</div>
								</li>
							)}

						<div className="info--box" />
					</ul>
					{questionList.map((item, index) => {
						return (
							<Fragment key={index}>
								{item.type === 0 ? (
									<div className="idInput--box">
										<div className="idInput__title">
											{item.question_title}{' '}
											{item.required === 1 ? <b>*</b> : ''}
										</div>
										<input
											className="idInput"
											// placeholder="아이디 입력"
											// value={item.deletedAt}
											onChange={e => isQuestionTitle(item, e)}
										/>
									</div>
								) : (
									<div className="idInput--box">
										<div className="idInput__title">
											{item.question_title}{' '}
											{item.required === 1 ? <b>*</b> : ''}
										</div>
										<div className="multipleChoice--box">
											{item.answer_list &&
												item.answer_list
													.substring(1, item.answer_list.length - 1)
													.split(',')
													.map(item => {
														return JSON.parse(item);
													})
													.map((info, index) => {
														return (
															<div className="multipleChoice" key={index}>
																<span
																	className={
																		isSelectAnswerList().indexOf(info.value) >
																			-1 &&
																		isSelectAnswerList2().indexOf(
																			item.question_id,
																		) > -1
																			? 'checkBox checked'
																			: 'checkBox'
																	}
																	onClick={() =>
																		isMultyChoice(
																			{
																				idx: item.question_id,
																				value: info.value,
																			},
																			item,
																		)
																	}
																/>
																<div>{info.value}</div>
															</div>
														);
													})}
										</div>
									</div>
								)}
							</Fragment>
						);
					})}

					<div className="path--box">
						<div className="path__text">
							참가시 보유패스 <b>{insertLeagueInfo.join_pass}</b>개 차감
						</div>
						<div className="path">
							보유패스
							<img className="pathImg" src={myInfoPath} />
							<b>{passCount}</b>개
						</div>
					</div>
					<div className="term">
						<input
							className="term__checkBox"
							type="checkBox"
							onClick={() => setTerm(!term)}
						/>
						<span className="term__text">
							규칙과 금지사항을 모두 확인하였고 동의합니다.
						</span>
					</div>
					<Button className="btn" size="medium" onClick={joinLeagueSingle}>
						참가하기
					</Button>
				</article>
			) : (
				<article className="share--box">
					<div className="title--box">
						<h1>리그 참가</h1>
						<button>
							<img
								className="closeBtn"
								src={closeBtnGray}
								onClick={() => setAttendModal(!attendModal)}
							/>
						</button>
					</div>
					<div className="makeTeam__input--box">
						<h2>팀 생성하기</h2>
						<div className="inner__input--box">
							<div className="input">
								<input
									placeholder="팀 이름"
									value={teamName}
									onChange={e => {
										setTeamName(e.target.value);
									}}
								/>
								<button
									type="button"
									className="lock"
									onClick={() => setLock(!lock)}
								>
									<img src={lockImg} alt="lock" />
								</button>
							</div>

							<button className="plus" type="button" onClick={makeTeam}>
								+
							</button>
						</div>
						{lock && (
							<input
								type="password"
								className="password__input"
								placeholder="팀 암호 (숫자 4자리)"
								maxLength="4"
								onInput={e => numberMaxLength(e)}
								value={password}
								onChange={e => {
									setPassword(e.target.value);
								}}
							/>
						)}
					</div>
					<div className="teamList--box">
						<h2>생성된 팀 리스트</h2>
						<div className="teamList__inner--box">
							<h3>
								참여 팀{' '}
								<b>
									{leagueTeamListRedux.teams &&
										leagueTeamListRedux.teams.length}
								</b>
							</h3>
							<div className="team__info--box" role="tab-list">
								{leagueTeamListRedux.teams &&
									leagueTeamListRedux.teams.map((item, index) => {
										return (
											<button
												role="tab"
												type="button"
												className="team__info"
												key={index}
												aria-controls={`teamPanel-${index}`}
												onClick={() => {
													item.team_count === insertLeagueInfo.member_count
														? ''
														: slectTeam(item);
												}}
											>
												<div className="profile--box">
													<div className="profileImg">
														<b>{item.team_name && item.team_name[0]}</b>
													</div>
													{item.team_name}
													{!!item.password && item.password.length > 1 && (
														<img className="lockImg" src={lockImg} alt="lock" />
													)}
												</div>
												<div className="count--box">
													<div className="waiting">
														대기 <b>{item.team_standby_count}</b>
													</div>
													<div className="join__count">
														<b
															className={
																leagueTeamListRedux.my_team &&
																leagueTeamListRedux.my_team.team_id ===
																	item.team_id
																	? 'myTeam'
																	: ''
															}
														>
															{item && item.team_count}
														</b>{' '}
														/ {insertLeagueInfo.member_count}
													</div>
												</div>
												{/* <div>
													({item && item.team_count}/
													{insertLeagueInfo.limit_people /
														insertLeagueInfo.member_count}
													)
												</div> */}
											</button>
										);
									})}
							</div>
						</div>

						{selectTeamInfo.map((item, index) => {
							return (
								<div className="slectTeam--box" key={index}>
									<div className="team__info">
										<div className="profile--box">
											<div className="profileImg">
												<b>{item.team_name && item.team_name[0]}</b>
											</div>
											{item && item.team_name}
											{!!item.password && item.password.length > 1 && (
												<img className="lockImg" src={lockImg} alt="lock" />
											)}
										</div>
										<div className="count--box">
											<div className="waiting">
												대기 <b>{item.team_standby_count}</b>
											</div>
											<div className="join__count">
												<b
													className={
														leagueTeamListRedux.my_team &&
														leagueTeamListRedux.my_team.team_id ===
															item.team_id
															? 'myTeam'
															: ''
													}
												>
													{item && item.team_count}
													{/* {item && item.team_countd} */}
												</b>{' '}
												/ {insertLeagueInfo.member_count}
											</div>
										</div>
									</div>
									{!!item.password && item.password.length > 1 && (
										<input
											className="slectInput_password"
											placeholder="팀 암호"
											maxLength="4"
											onInput={e => numberMaxLength(e)}
											type="password"
											value={selectPassword}
											onChange={e => setSelectPassword(e.target.value)}
										/>
									)}
								</div>
							);
						})}

						<Button className="btn" size="medium" onClick={joinLeagueTeam}>
							참가하기
						</Button>
					</div>
				</article>
			)}
		</div>
	);
};

export default JoinModal;
