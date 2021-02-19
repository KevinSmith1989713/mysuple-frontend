import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { connect } from 'react-redux';
import { url } from '../../../constants/apiUrl.js';

import checkMark from '../../../static/images/checkmark.svg';
import './ParticipantManagement.scss';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

const categoryList = [
	{ name: '' },
	{ name: '순번' },
	{ name: '상태' },
	{ name: '슈플 닉네임' },
	{ name: '팀명' },
	{ name: '신청날짜' },
];

const ParticipantManagement = ({
	getParticipantsList,
	participantsList,
	questionsList,
	approveLeague,
	successState,
	rejectState,
	insertLeagueInfo,
	rejectLeague,
	selectParticipatList,
}) => {
	const [select, setSelect] = useState('all');
	const [admission, setAdmission] = useState(true);
	const [flag, setFlag] = useState(false);

	const tagListAuto = [
		{ name: '전체 목록', value: 'all' },
		{ name: '참가자 목록', value: 'confirmed' },
		{ name: '대기자 목록', value: 'approval_wait' },
		// { name: '신청자 목록', value: 'approval_only' },
	];

	const tagList = [
		{ name: '전체 목록', value: 'all' },
		{ name: '참가자 목록', value: 'confirmed' },
		{ name: '대기자 목록', value: 'waiting' },
		{ name: '신청자 목록', value: 'approval_only' },
	];

	useEffect(() => {
		getParticipantsList(
			getUserInfo === null ? '' : getUserInfo.id,
			window.location.pathname.split('/')[2],
			select,
		);
	}, [select, successState, rejectState, admission, flag]);

	const isAdmission = () => {
		setAdmission(!admission);
		if (select === 'approval_wait') {
			setSelect('approval_only');
		} else if (select === 'approval_only') {
			// setSelect('approval_wait');
		}
	};

	const participantsAnswer =
		participantsList &&
		participantsList.map(item1 => {
			return item1.qa;
		});

	const isAnswer = (array, num) => {
		questionsList.map(item => {
			array.push(
				item.question_id > 0 && { answer: '', question_id: item.question_id },
			);
			return item;
		});
		participantsAnswer[num] &&
			participantsAnswer[num].map(item => {
				array.push(item.value);
				return;
			});
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
				value: { question_id, answer: [...answer].join('') },
			};
		});
		participantsAnswer[num] === undefined
			? ''
			: (participantsList[num].qa = res);
	};

	for (let i = 0; i <= participantsList && participantsList.length; i++) {
		isAnswer([], i);
	}

	// let selectParticipatList = [];
	const joinedIdList = e => {
		const check = selectParticipatList.find(item => {
			return item === e.league_join_id;
		});

		const idx = selectParticipatList.indexOf(check);
		if (idx > -1) {
			selectParticipatList.splice(idx, 1);
		} else {
			selectParticipatList.push(e.league_join_id);
		}
		setFlag(!flag);
	};

	const isNoshow = () => {
		try {
			axios
				.post(`${url.file}/ProcessNoShow`, {
					dev: '/ProcessNoShow',
					league_id: window.location.pathname.split('/')[2],
					id: getUserInfo === null ? '' : getUserInfo.id,
					league_join_id: selectParticipatList,
				})
				.then(res => {
					if (res.data.Msg === 'You are not subject to No-show processing.') {
						alert('관리자에게 문의하시기 바랍니다.');
					} else {
						setFlag(!flag);
					}
				});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="ParticipantManagement">
			<div className="tag--wrapper">
				<div className="btn__mobile--box">
					<div className="mobile-approval">
						{insertLeagueInfo.auto_join === 0 &&
							(select === 'approval_wait' || select === 'approval_only') && (
								<>
									<th className="check--box">
										<input
											type="checkbox"
											checked={admission}
											onClick={() => isAdmission()}
										/>
									</th>
									<b>승인가능한 팀</b>
								</>
							)}
					</div>
					<div className="btn--box">
						<button
							type="button"
							className="button"
							onClick={() => {
								approveLeague(
									null,
									window.location.pathname.split('/')[2],
									selectParticipatList,
								);
							}}
						>
							승낙
						</button>

						<button
							type="button"
							className="button"
							onClick={() => {
								rejectLeague(
									null,
									window.location.pathname.split('/')[2],
									selectParticipatList,
								);
							}}
						>
							거부
						</button>
					</div>
				</div>
				<table>
					<thead>
						<tr className="tag--box">
							{(insertLeagueInfo.auto_join === 1 ? tagListAuto : tagList).map(
								(item, index) => {
									return (
										<th
											className={select === item.value ? 'tag select' : 'tag'}
											key={index}
											type="button"
											onClick={() => setSelect(item.value)}
										>
											{item.name}
										</th>
									);
								},
							)}

							{window.innerWidth < 769 ? (
								''
							) : (
								<>
									{insertLeagueInfo.auto_join === 0 &&
										(select === 'approval_wait' ||
											select === 'approval_only') && (
											<th className="check--box">
												<input
													type="checkbox"
													checked={admission}
													onClick={() => isAdmission()}
												/>
												승인가능한 팀
											</th>
										)}
								</>
							)}
						</tr>
					</thead>
				</table>
				{window.innerWidth < 769 ? (
					''
				) : (
					<div className="btn--box">
						<button
							type="button"
							className="button"
							onClick={() => {
								approveLeague(
									null,
									window.location.pathname.split('/')[2],
									selectParticipatList,
								);
							}}
						>
							승낙
						</button>

						<button
							type="button"
							className="button"
							onClick={() => {
								rejectLeague(
									null,
									window.location.pathname.split('/')[2],
									selectParticipatList,
								);
							}}
						>
							거부
						</button>

						<button
							type="button"
							className="button"
							onClick={() => {
								isNoshow();
							}}
						>
							NoShow
						</button>
					</div>
				)}
			</div>
			<div className="participant--wrapper">
				<table>
					<thead>
						<tr>
							{categoryList.map((item, index) => {
								return (
									<th className="category" key={index}>
										{item.name}
									</th>
								);
							})}

							{questionsList.map((item, index) => {
								return (
									<th className="category" key={index}>
										{item.question_title}
									</th>
								);
							})}
						</tr>
					</thead>
					<thead>
						{participantsList &&
							participantsList.map((item, index) => {
								return (
									<tr className="info--box" key={index}>
										<td className="info">
											<input
												type="checkBox"
												onClick={() => joinedIdList(item)}
											/>
										</td>
										<td className="info">{index + 1}</td>
										<td
											className={
												(item.join_type === 0 && 'info approval_wait') ||
												(item.join_type === 1 && 'info confirmed') ||
												(item.join_type === 2 && 'info waiting') ||
												(item.join_type > 2 && 'info reject')
											}
										>
											{(item.join_type === 0 && '대기') ||
												(item.join_type === 1 && '참가') ||
												(item.join_type === 2 && '대기') ||
												(item.join_type > 2 && '거부')}
										</td>
										<td className="info">{item.nickname}</td>
										<td className="info">{item.team_name}</td>
										<td className="info">
											{moment(item.updatedAt).format('YYYY.MM.DD A h:mm')}
										</td>
										{item.qa &&
											item.qa.map((item2, index) => {
												return (
													<td className="info" key={index}>
														{item2.value.answer}
													</td>
												);
											})}
									</tr>
								);
							})}
					</thead>
				</table>
			</div>
			<div className={`box__alert${successState ? ' alert' : ''}`}>
				<img src={checkMark} alt="check-mark" />
				<strong>적용 되었습니다.</strong>
			</div>
			<div className={`box__alert${rejectState ? ' alert' : ''}`}>
				<img src={checkMark} alt="check-mark" />
				<strong>거부 되었습니다.</strong>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		selectParticipatList: state.league.selectParticipatList,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// resetExtra: () => dispatch(resetExtra()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ParticipantManagement);
