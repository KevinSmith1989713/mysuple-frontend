import { fork, take, call, put, select } from 'redux-saga/effects';
import swal from 'sweetalert';

import {
	REQ_SEARCH_LEAGUE,
	RES_SEARCH_LEAGUE,
	REQ_MAKE_LEAGUE,
	RES_MAKE_LEAGUE,
	UPDATE_LEAGUE,
	REQ_MAKE_TEMPORARY_LEAGUE,
	REQ_PARTICIPAT_LEAGUE,
	RES_PARTICIPAT_LEAGUE,
	REQ_HOST_LEAGUE,
	RES_HOST_LEAGUE,
	REQ_MAKE_LEAGUE_STATE,
	RES_MAKE_LEAGUE_STATE,
	REQ_SELECT_INFO,
	RES_SELECT_INFO,
	JOIN_LEAGUE,
	JOIN_LEAGUE_CANCEL,
	REQ_MAKE_LEAGUE_TEAM,
	REQ_LEAGUE_TEAM_LIST,
	RES_LEAGUE_TEAM_LIST,
	REQ_LEAGUE_TEMPORARY_LIST,
	RES_LEAGUE_TEMPORARY_LIST,
	REQ_LEAGUE_TEMPORARY_SELECT,
	RES_LEAGUE_TEMPORARY_SELECT,
	LEAGUE_TEMPORARY_DELETE,
	LEAGUE_STEP2_BANLIST,
	LEAGUE_STEP2_QUESTION,
	SELECT_TEMPORARY_STATE,
	REQ_WRITE_LEAGUE_COMMENTS,
	REQ_LEAGUE_COMMENTS_LIST,
	RES_LEAGUE_COMMENTS_LIST,
	LEAGUE_COMMENTS_DELETE,
	LEAGUE_COMMENTS_UPDATE,
	JOIN_LEAGUE_STATE,
	REQ_LEAGUE_RECRUIT_TEAM,
	RES_LEAGUE_RECRUIT_TEAM,
	REQ_LEAGUE_PARTICIPANTS,
	RES_LEAGUE_PARTICIPANTS,
} from './League.store';

import { START_LOADING, END_LOADING } from '../Layout/Layout.store';

import leagueService from '../../services/leagueService';

/** ******************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

export function* reqSearchLeague(data) {
	const leagueList = yield select(state => state.league.leagueList);
	try {
		// yield put({
		// 	type: START_LOADING,
		// });
		// console.log(data.ban);
		const result = yield call(leagueService.searchLeague, data);
		// console.log(result);
		if (result.Status === 'OK') {
			yield put({
				type: RES_SEARCH_LEAGUE,
				payload: {
					list:
						data.count > 1
							? [...leagueList, ...result.Info.league]
							: result.Info.league,
				},
			});
			// yield put({
			// 	type: END_LOADING,
			// });
		}
		// yield put({
		// 	type: END_LOADING,
		// });
	} catch (e) {
		console.error(e);
	}
}

export function* reqMakeLeagueApi(data) {
	// const ban = JSON.stringify(data.banList);
	const question = JSON.stringify(data.questionList);
	const reward_ratio = JSON.stringify(data.reward_ratio);

	const param = {
		league_title: data.league_title,
		game_id: data.game_id,
		game_title: data.game_title,
		game_title_kr: data.game_title_kr,
		league_type: data.league_type,
		auto_join: data.auto_join,
		outsourcing: data.outsourcing,
		limit_people: String(data.limit_people),
		member_count: String(data.member_count),
		waiting_people: String(data.waiting_people),
		league_main_img: data.league_main_img,
		league_sub_img: data.league_sub_img,
		apply_start: data.apply_start,
		apply_end: data.apply_end,
		start_date: data.start_date,
		desc: data.desc,
		ban: data.banList,
		question: question,
		join_pass: String(data.join_pass),
		sponsor_pass: String(data.sponsor_pass),
		reward_ratio: reward_ratio,
	};

	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.insertLeague, param);

		if (result.Status === 'OK') {
			const result2 = yield call(
				leagueService.selectLeague,
				result.Info.league_id,
			);

			if (result2.Status === 'OK') {
				yield put({
					type: RES_SELECT_INFO,
					payload: {
						info: result2.Info.list,
					},
				});
				yield put({
					type: RES_MAKE_LEAGUE_STATE,
					payload: {
						number: result.Info.league_id,
					},
				});
				yield put({
					type: REQ_MAKE_LEAGUE_STATE,
					payload: {
						boolean: true,
					},
				});
				yield put({
					type: REQ_MAKE_LEAGUE_STATE,
					payload: {
						boolean: false,
					},
				});
			}
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqUpdateLeagueApi(data) {
	try {
		const result = yield call(leagueService.updateLeague, data);

		if (result.Status == 'OK') {
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqReqMakeTemporaryLeagueApi(data) {
	const leagueId = yield select(state => state.league.leagueMakeStateId);
	const leagueId2 = yield select(
		state => state.league.insertLeagueInfo.league_id,
	);
	const param = {
		league_id: leagueId,
		league_id2: leagueId2,
		league_title: data.league_title,
		game_id: data.game_id,
		game_title: data.game_title,
		game_title_kr: data.game_title_kr,
		league_type: data.league_type,
		auto_join: data.auto_join,
		outsourcing: data.outsourcing,
		limit_people: String(data.limit_people),
		member_count: String(data.member_count),
		waiting_people: String(data.waiting_people),
		league_main_img: data.league_main_img,
		league_sub_img: data.league_sub_img,
		apply_start: data.apply_start,
		apply_end: data.apply_end,
		start_date: data.start_date,
		desc: data.desc,
		ban: data.banList,
		question: data.questionList,
		join_pass: String(data.join_pass),
		sponsor_pass: String(data.sponsor_pass),
		reward_ratio: data.reward_ratio,
	};

	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.temporaryInsertLeague, param);
		if (leagueId !== null && result.Status === 'OK') {
			alert('임시저장 되었습니다.');
		} else if (result.Status === 'OK') {
			alert('임시저장 되었습니다.');
			yield put({
				type: RES_MAKE_LEAGUE_STATE,
				payload: {
					number: result.Info.league_id,
				},
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* getLeagueTemporaryListApi() {
	// try {
	// 	yield put({
	// 		type: START_LOADING,
	// 	});
	// 	const result = yield call(leagueService.getLeagueTempList);
	// 	if (result) {
	// 		yield put({
	// 			type: RES_LEAGUE_TEMPORARY_LIST,
	// 			payload: {
	// 				list: result.Info.list,
	// 			},
	// 		});
	// 		yield put({
	// 			type: END_LOADING,
	// 		});
	// 	}
	// 	yield put({
	// 		type: END_LOADING,
	// 	});
	// } catch (e) {
	// 	console.error(e);
	// }
}

export function* reqSelectLeagueApi(date) {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.selectLeague, date.leagueId);
		if (result.Status === 'OK') {
			yield put({
				type: RES_SELECT_INFO,
				payload: {
					info: result.Info.list,
				},
			});
			yield put({
				type: SELECT_TEMPORARY_STATE,
				payload: {
					boolean: true,
				},
			});
			yield put({
				type: SELECT_TEMPORARY_STATE,
				payload: {
					boolean: false,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqJoinLeagueApi(data) {
	const params = {
		id: data.id,
		league_id: data.leagueId,
		team_id: data.teamId,
		answer: data.answer,
	};

	try {
		const result = yield call(leagueService.joinLeague, params);

		if (result.Status == 'OK') {
			if (data.answer.length > 0) {
				yield call(leagueService.joinLeagueAnswer, params);
			}
			yield put({
				type: RES_HOST_LEAGUE,
				payload: {
					list: result.Info.list,
				},
			});
			yield put({
				type: JOIN_LEAGUE_STATE,
				payload: { boolean: true },
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqJoinLeagueCancelApi(data) {
	const params = {
		id: data.id,
		league_id: data.league_id,
		league_join_id: data.league_join_id,
	};

	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.joinLeagueCancel, params);

		if (result.Status === 'OK') {
			const result2 = yield call(leagueService.participatingLeague);
			yield put({
				type: RES_PARTICIPAT_LEAGUE,
				payload: {
					list: result2.Info.list,
				},
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqJoinLeagueAnswerApi(data) {
	const params = {
		id: data.id,
		league_id: data.leagueId,
		answer: data.answer,
	};
	try {
		// const result = yield call(leagueService.joinLeagueAnswer, params);
		// console.log(result);
		if (result.Status == 'OK') {
			// yield put({
			// 	type: RES_HOST_LEAGUE,
			// 	payload: {
			// 		list: result.Info.list,
			// 	},
			// });
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqMakeLeagueTeamApi(data) {
	const params = {
		id: data.id,
		team_name: data.teamName,
		league_id: data.leagueId,
		team_type: data.teamType,
		password: data.password,
	};

	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.makeLeagueTeam, params);

		if (result.Status === 'OK') {
			yield call(reqGetLeagueTeamListApi, {
				id: data.id,
				leagueId: data.leagueId,
			});
			yield put({
				type: END_LOADING,
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}
export function* reqGetLeagueTeamListApi(data) {
	const params = {
		id: data.id,
		league_id: data.leagueId,
		complete: data.complete,
	};
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.getLeagueTeamList, params);
		// console.log(result);
		if (result.Status === 'OK') {
			yield put({
				type: RES_LEAGUE_TEAM_LIST,
				payload: {
					list: result.Info,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqSelectLeagueTemporaryApi(data) {
	const params = {
		league_id: data.info,
	};

	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.selectLeagueTemporay, params);
		// console.log(result.Info.list.apply_start !== undefined);

		if (result.Status === 'OK') {
			yield put({
				type: RES_LEAGUE_TEMPORARY_SELECT,
				payload: {
					list: result.Info.list,
				},
			});
			yield put({
				type: LEAGUE_STEP2_BANLIST,
				payload: {
					list: result.Info.list.ban,
				},
			});
			yield put({
				type: LEAGUE_STEP2_QUESTION,
				payload: {
					info: result.Info.list.question,
				},
			});
			yield put({
				type: SELECT_TEMPORARY_STATE,
				payload: {
					boolean: true,
				},
			});
			yield put({
				type: SELECT_TEMPORARY_STATE,
				payload: {
					boolean: false,
				},
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqDeleteLeagueTemporaryApi(data) {
	const params = {
		league_id: data.info,
	};

	try {
		yield put({
			type: START_LOADING,
		});
		yield call(leagueService.deleteLeagueTemporay, params);

		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}
export function* reqParticipatingLeagueApi() {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.participatingLeague);

		if (result) {
			yield put({
				type: RES_PARTICIPAT_LEAGUE,
				payload: {
					list: result.Info.list,
				},
			});

			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqHostLeagueListApi() {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.hostLeagueList);

		if (result) {
			yield put({
				type: RES_HOST_LEAGUE,
				payload: {
					list: result.Info.list,
				},
			});

			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqLeagueCommentsListApi(data) {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.leagueCommentsList, data);
		if (result.Status === 'OK') {
			yield put({
				type: RES_LEAGUE_COMMENTS_LIST,
				payload: {
					list: result.Info.comment,
				},
			});

			yield put({
				type: END_LOADING,
			});
		} else {
			yield put({
				type: RES_LEAGUE_COMMENTS_LIST,
				payload: {
					list: [],
				},
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqWriteLeagueCommentsApi(data) {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.writeLeagueComments, data);
		if (result.Status === 'OK') {
			yield call(reqLeagueCommentsListApi, data);
			yield put({
				type: END_LOADING,
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqDeleteLeagueCommentsApi(data) {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.deleteLeagueComments, data);

		if (result.Status === 'OK') {
			yield call(reqLeagueCommentsListApi, data);

			yield put({
				type: END_LOADING,
			});
		} else {
			yield put({
				type: RES_LEAGUE_COMMENTS_LIST,
				payload: {
					list: [],
				},
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}
export function* reqUpdateLeagueCommentsApi(data) {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.updateLeagueComments, data);
		if (result.Status === 'OK') {
			yield call(reqLeagueCommentsListApi, data);
			yield put({
				type: END_LOADING,
			});
		} else {
			yield put({
				type: RES_LEAGUE_COMMENTS_LIST,
				payload: {
					list: [],
				},
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqRecruitTeamApi(data) {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.recruitTeam, data);
		if (result.Status === 'OK') {
			yield put({
				type: RES_LEAGUE_RECRUIT_TEAM,
				payload: {
					list: result.Info.league_crew_list,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqParticipantsApi(data) {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(leagueService.getParticipants, data);

		if (result.Status === 'OK') {
			yield put({
				type: RES_LEAGUE_PARTICIPANTS,
				payload: {
					list: result.Info.participants,
				},
			});

			yield put({
				type: END_LOADING,
			});
		}
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}
/** ******************************************************************************
 *  call
 ******************************************************************************* */

export function* watchSearchLeague() {
	while (true) {
		const { payload } = yield take(REQ_SEARCH_LEAGUE);
		yield call(reqSearchLeague, payload);
	}
}
export function* watchReqMakeLeague() {
	while (true) {
		const { payload } = yield take(REQ_MAKE_LEAGUE);
		yield call(reqMakeLeagueApi, payload);
	}
}
export function* watchReqUpdateLeague() {
	while (true) {
		const { payload } = yield take(UPDATE_LEAGUE);
		yield call(reqUpdateLeagueApi, payload);
	}
}
export function* watchReqMakeTemporaryLeague() {
	while (true) {
		const { payload } = yield take(REQ_MAKE_TEMPORARY_LEAGUE);
		yield call(reqReqMakeTemporaryLeagueApi, payload);
	}
}
export function* watchGetLeagueTemporaryList() {
	while (true) {
		const { payload } = yield take(REQ_LEAGUE_TEMPORARY_LIST);
		yield call(getLeagueTemporaryListApi, payload);
	}
}
export function* watchReqSelctLeagueTemporary() {
	while (true) {
		const { payload } = yield take(REQ_LEAGUE_TEMPORARY_SELECT);
		yield call(reqSelectLeagueTemporaryApi, payload);
	}
}
export function* watchParticipatingLeague() {
	while (true) {
		const { payload } = yield take(REQ_PARTICIPAT_LEAGUE);
		yield call(reqParticipatingLeagueApi, payload);
	}
}
export function* watchReqHostLeagueList() {
	while (true) {
		const { payload } = yield take(REQ_HOST_LEAGUE);
		yield call(reqHostLeagueListApi, payload);
	}
}
export function* watchReqJoinLeague() {
	while (true) {
		const { payload } = yield take(JOIN_LEAGUE);
		yield call(reqJoinLeagueApi, payload);
	}
}
export function* watchReqJoinLeagueCancel() {
	while (true) {
		const { payload } = yield take(JOIN_LEAGUE_CANCEL);
		yield call(reqJoinLeagueCancelApi, payload);
	}
}

export function* watchReqMakeLeagueTeam() {
	while (true) {
		const { payload } = yield take(REQ_MAKE_LEAGUE_TEAM);
		yield call(reqMakeLeagueTeamApi, payload);
	}
}
export function* watchReqGetLeagueTeamList() {
	while (true) {
		const { payload } = yield take(REQ_LEAGUE_TEAM_LIST);
		yield call(reqGetLeagueTeamListApi, payload);
	}
}

export function* watchReqDeleteLeagueTemporary() {
	while (true) {
		const { payload } = yield take(LEAGUE_TEMPORARY_DELETE);
		yield call(reqDeleteLeagueTemporaryApi, payload);
	}
}

export function* watchReqSelectLeague() {
	while (true) {
		const { payload } = yield take(REQ_SELECT_INFO);
		yield call(reqSelectLeagueApi, payload);
	}
}
export function* watchReqLeagueCommentsList() {
	while (true) {
		const { payload } = yield take(REQ_LEAGUE_COMMENTS_LIST);
		yield call(reqLeagueCommentsListApi, payload);
	}
}
export function* watchReqWriteLeagueComments() {
	while (true) {
		const { payload } = yield take(REQ_WRITE_LEAGUE_COMMENTS);
		yield call(reqWriteLeagueCommentsApi, payload);
	}
}
export function* watchReqDeleteLeagueComments() {
	while (true) {
		const { payload } = yield take(LEAGUE_COMMENTS_DELETE);
		yield call(reqDeleteLeagueCommentsApi, payload);
	}
}
export function* watchReqUpdateLeagueComments() {
	while (true) {
		const { payload } = yield take(LEAGUE_COMMENTS_UPDATE);
		yield call(reqUpdateLeagueCommentsApi, payload);
	}
}
export function* watchReqRecruit() {
	while (true) {
		const { payload } = yield take(REQ_LEAGUE_RECRUIT_TEAM);
		yield call(reqRecruitTeamApi, payload);
	}
}
export function* watchParticipants() {
	while (true) {
		const { payload } = yield take(REQ_LEAGUE_PARTICIPANTS);
		yield call(reqParticipantsApi, payload);
	}
}

/** ******************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchSearchLeague);
	yield fork(watchReqMakeLeague);
	yield fork(watchReqUpdateLeague);
	yield fork(watchReqMakeTemporaryLeague);
	yield fork(watchGetLeagueTemporaryList);
	yield fork(watchReqSelctLeagueTemporary);
	yield fork(watchReqSelectLeague);
	yield fork(watchReqJoinLeague);
	yield fork(watchReqJoinLeagueCancel);
	yield fork(watchReqSelectLeague);
	yield fork(watchReqMakeLeagueTeam);
	yield fork(watchReqGetLeagueTeamList);
	yield fork(watchReqDeleteLeagueTemporary);
	yield fork(watchParticipatingLeague);
	yield fork(watchReqHostLeagueList);
	yield fork(watchReqLeagueCommentsList);
	yield fork(watchReqWriteLeagueComments);
	yield fork(watchReqDeleteLeagueComments);
	yield fork(watchReqUpdateLeagueComments);
	yield fork(watchReqRecruit);
	yield fork(watchParticipants);
}
