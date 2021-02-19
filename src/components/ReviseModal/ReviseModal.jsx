import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import axios from 'axios';
import { url } from '../../constants/apiUrl.js';
import {
	makeLeagueTeam,
	getLeagueTeamList,
	getSelectLeagueInfo,
} from '../../store/League/League.store';
import {
	getMyLeagueQuestion,
	reviseMyLeagueQuestion,
	reviseMyLeagueTeam,
} from '../../store/MyPage/MyPage.store';

import Button from '../Button/Button';

import closeBtnGray from '../../static/images/closeBtnGray.svg';
import lockImg from '../../static/images/League/lock.svg';

import './ReviseModal.scss';

const ReviseModal = ({
	makeLeagueTeam,
	leagueTeamListRedux,
	setAttendModal,
	attendModal,
	leagueType,
	leagueId,
	insertLeagueInfo,
	getLeagueTeamList,
	getSelectLeagueInfo,
	getMyLeagueQuestion,
	myLeagueQuestion,
	reviseMyLeagueQuestion,

	reviseMyLeagueTeam,
}) => {
	const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
	const [flag, setFlag] = useState(false);
	const [lock, setLock] = useState(false);
	const [id, setId] = useState('');
	const [teamName, setTeamName] = useState('');
	const [teamId, setTeamId] = useState('');
	const [password, setPassword] = useState('');
	const [selectPassword, setSelectPassword] = useState(null);
	const [checkPassword, setCheckPassword] = useState('');

	const [sendAnswerList, setSendAnswerList] = useState([]);
	const [questionId, setQuestionId] = useState(0);
	const [checked, setChecked] = useState('');
	const [questionList, setQuestionList] = useState();
	const [revise, setRevise] = useState(false);

	const multipleArray = [];
	myLeagueQuestion === undefined
		? ''
		: myLeagueQuestion.map(item => {
				item.type === 1
					? multipleArray.push({
							answer: item.answer && item.answer.answer,
							question_id: item.answer && item.answer.question_id,
					  })
					: '';
				return item;
		  });

	const multipleRes = Object.values(
		multipleArray.reduce((a, { question_id, answer }) => {
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

	useEffect(() => {
		setSendAnswerList(multipleRes);
	}, [myLeagueQuestion]);

	useEffect(() => {
		getLeagueTeamList(null, leagueId);
		getSelectLeagueInfo(leagueId);
	}, []);
	useEffect(() => {
		getMyLeagueQuestion(null, leagueId);
		try {
			axios
				.post(`${url.file}/MyLeagueQASelect`, {
					dev: '/MyLeagueQASelect',
					league_id: leagueId,
					id: getUserInfo.id,
				})
				.then(res => {
					setQuestionList(res.data.Info.qa);
				});
		} catch (e) {
			console.error(e);
		}
	}, []);

	const isMultyChoice = (e, item) => {
		setQuestionId(item.question_id);
		setChecked(e.value);

		const itemToFind1 = sendAnswerList.find(function(item2) {
			return item2.question_id === item.question_id;
		});
		const itemToFind2 = sendAnswerList.find(function(item2) {
			return item2.answer === e.value;
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
			});
			setFlag(!flag);
		} else {
			sendAnswerList.push({
				question_id: item.question_id,
				answer: e.value,
			});
			setFlag(!flag);
		}
	};

	const isQuestionTitle = (item, e) => {
		setRevise(true);
		let array = [];
		questionList &&
			questionList.map(item2 => {
				const itemToFind = questionList.find(function(id) {
					return id.question_id === item.question_id;
				});

				const idx = questionList.indexOf(itemToFind);

				if (item2.question_id === item.question_id) {
					array.push({
						...item2,
						answer: {
							question_id: item2.question_id,
							answer_value: e.target.value,
						},
					});
				} else {
					array.push(item2);
				}
				setQuestionList(array);
			});
	};

	const numberMaxLength = e => {
		if (e.target.value.length > e.target.maxLength) {
			e.target.value = e.target.value.slice(0, e.maxLength - 1);
		}
	};

	const slectTeam = item => {
		setCheckPassword(item.password);
		setTeamId(
			leagueTeamListRedux.my_team && leagueTeamListRedux.my_team.team_id === item.team_id
				? ''
				: item.team_id,
		);
	};

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

	const isSelectAnswerList = () => {
		const array = [];
		sendAnswerList.map(item => {
			array.push(item.answer);
			return;
		});
		return array;
	};

	const isAnswer = () => {
		const arr = [];

		questionList &&
			questionList.map(item => {
				item.type === 0
					? arr.push({
							question_id: item.question_id,
							answer: item.answer && item.answer.answer,
					  })
					: '';
				return item;
			});

		const result =
			questionList &&
			questionList.map(item => {
				return {
					question_id: item.question_id,
					answer: item.answer && item.answer.answer_value,
				};
			});

		result &&
			result.forEach(ele => {
				if (ele.answer === '') {
					arr.push();
				} else if (ele.answer !== undefined) {
					arr.push({
						question_id: ele.question_id,
						answer: ele.answer,
					});
				}
			});

		const res = Object.values(
			arr.reduce((a, { question_id, answer }) => {
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

	const sendAnswer = () => {
		const array = [];

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

	const joinLeagueTeam = () => {
		reviseMyLeagueQuestion(null, leagueId, sendAnswer());
		reviseMyLeagueTeam(
			null,
			leagueId,
			leagueTeamListRedux.my_team && leagueTeamListRedux.my_team.team_id,
			teamId,
		);
		setAttendModal(!attendModal);
		setCheckPassword('');
		setSelectPassword('');
	};

	return (
		<article className="ReviseModal--wrapper">
			<div
				className="background"
				onClick={() => setAttendModal(!attendModal)}
			/>
			<div className="ReviseModal--box">
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
				{myLeagueQuestion === undefined
					? ''
					: myLeagueQuestion.map((item, index) => {
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
												defaultValue={
													revise ? null : item.answer && item.answer.answer
												}
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
																			-1
																				? 'checkBox checked'
																				: 'checkBox'
																		}
																		onClick={() => isMultyChoice(info, item)}
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
				{insertLeagueInfo.league_type === 1 && (
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
				)}

				{insertLeagueInfo.league_type === 1 && (
					<div className="teamList--box">
						<h2>생성된 팀 리스트</h2>
						<div className="teamList__inner--box">
							<h3>
								참여 팀{' '}
								<b>{leagueTeamListRedux.teams && leagueTeamListRedux.teams.length}</b>
							</h3>
							<div className="team__info--box " role="tab-list">
								{leagueTeamListRedux.teams &&
									leagueTeamListRedux.teams.map((item, index) => {
										// const count = teamId === item.team_id ? +1 : 0;
										return (
											<button
												role="tab"
												type="button"
												className={
													// teamId === item.team_id
													(leagueTeamListRedux.my_team &&
														leagueTeamListRedux.my_team.team_id === item.team_id) ||
													teamId === item.team_id
														? 'team__info selected '
														: 'team__info'
												}
												key={index}
												aria-controls={`teamPanel-${index}`}
												onClick={() => {
													item.team_count ===
													insertLeagueInfo.limit_people /
														insertLeagueInfo.member_count
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
														대기 <b>{item.team_wait_count}</b>
													</div>
													<div className="join__count">
														<b
														// className={
														// 	leagueTeamList.my_team &&
														// 	leagueTeamList.my_team.team_id === item.team_id
														// 		? 'myTeam'
														// 		: ''
														// }
														>
															{item && item.team_count}
														</b>{' '}
														/{' '}
														{insertLeagueInfo.limit_people /
															insertLeagueInfo.member_count}
													</div>
												</div>
											</button>
										);
									})}
							</div>
						</div>
					</div>
				)}

				<Button className="btn" size="medium" onClick={joinLeagueTeam}>
					수정
				</Button>
			</div>
		</article>
	);
};
const mapStateToProps = state => {
	return {
		insertLeagueInfo: state.league.insertLeagueInfo,
		leagueTeamListRedux: state.league.leagueTeamListRedux,
		myLeagueQuestion: state.myPage.myLeagueQuestion,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		makeLeagueTeam: (id, teamName, leagueId, teamType, password) =>
			dispatch(makeLeagueTeam(id, teamName, leagueId, teamType, password)),
		getLeagueTeamList: (id, leagueId) =>
			dispatch(getLeagueTeamList(id, leagueId)),
		getSelectLeagueInfo: leagueId => dispatch(getSelectLeagueInfo(leagueId)),
		getLeagueTeamList: (id, leagueId) =>
			dispatch(getLeagueTeamList(id, leagueId)),
		getMyLeagueQuestion: (id, leagueId) =>
			dispatch(getMyLeagueQuestion(id, leagueId)),
		reviseMyLeagueQuestion: (id, leagueId, update_answer) =>
			dispatch(reviseMyLeagueQuestion(id, leagueId, update_answer)),
		reviseMyLeagueTeam: (id, league_id, team_id, new_team_id) =>
			dispatch(reviseMyLeagueTeam(id, league_id, team_id, new_team_id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviseModal);
