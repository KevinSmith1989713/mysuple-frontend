import { fork, take, call, put, select, delay } from 'redux-saga/effects';

import {
	REQ_PARTICIPANTS,
	RES_PARTICIPANTS,
	RES_QUESTIONS,
	REQ_NOTICE_LEAGUE_WRITE,
	REQ_NOTICE_LEAGUE_LIST,
	RES_NOTICE_LEAGUE_LIST,
	REQ_NOTICE_LEAGUE_SELECT,
	RES_NOTICE_LEAGUE_SELECT,
	LEAGUE_NOTICE_STATE,
	REQ_NOTICE_LEAGUE_REVISE,
	REQ_NOTICE_LEAGUE_DELETE,
	REQ_APPROVE_LEAGUE,
	REQ_REJECT_LEAGUE,
} from './Manage.store';

import {
	START_LOADING,
	END_LOADING,
	SUCCESS_STATE,
	REJECT_STATE,
} from '../Layout/Layout.store';

import managerService from '../../services/managerService';

/** ******************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

export function* reqParticipants(data) {
	const info = {
		id: data.id,
		league_id: data.league_id,
		mode: data.mode,
	};

	try {
		const result = yield call(managerService.getParticipantsList, info);
		if (result.Status === 'OK') {
			yield put({
				type: START_LOADING,
			});

			yield put({
				type: RES_PARTICIPANTS,
				payload: {
					list:
						result.Info.participants ||
						result.Info.confirmed ||
						result.Info.waiting ||
						result.Info.approval_wait ||
						result.Info.approval_only,
				},
			});

			yield put({
				type: RES_QUESTIONS,
				payload: {
					list: result.Info.question,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {}
}

export function* reqRejectParticipant(data) {
	const result = yield call(managerService.rejectParticipant, data);

	try {
		if (result.Status === 'OK') {
			yield put({
				type: REJECT_STATE,
				payload: {
					state: true,
				},
			});
			yield delay(1000);
			yield put({
				type: REJECT_STATE,
				payload: {
					state: false,
				},
			});
		}
	} catch (e) {
		console.log(e);
	}
}

export function* reqWriteLeagueNorice(data) {
	try {
		const result = yield call(managerService.writeLeagueNotice, data);
		if (result.Status === 'OK') {
			yield put({
				type: START_LOADING,
			});
			yield call(managerService.getLeagueNoticeList, {
				league_id: data.league_id,
			});
			yield put({
				type: LEAGUE_NOTICE_STATE,
				payload: {
					state: true,
				},
			});
			yield put({
				type: LEAGUE_NOTICE_STATE,
				payload: {
					state: false,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.log(e);
	}
}

export function* reqLeagueNoticeList(data) {
	try {
		const result = yield call(managerService.getLeagueNoticeList, data);
		// console.log(result);
		if (result.Status === 'OK') {
			yield put({
				type: START_LOADING,
			});
			yield put({
				type: RES_NOTICE_LEAGUE_LIST,
				payload: {
					list: result.Info.notice_list,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.log(e);
	}
}

export function* reqLeagueNoticedetail(data) {
	try {
		const result = yield call(managerService.getLeagueNoticeDetail, data);
		if (result.Status === 'OK') {
			yield put({
				type: START_LOADING,
			});
			yield put({
				type: RES_NOTICE_LEAGUE_SELECT,
				payload: {
					list: result.Info.notice,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.log(e);
	}
}

export function* reqRevisLeagueNoticeList(data) {
	try {
		const result = yield call(managerService.reviseLeagueNoticeList, data);

		if (result.Status === 'OK') {
			yield put({
				type: START_LOADING,
			});
			yield put({
				type: LEAGUE_NOTICE_STATE,
				payload: {
					state: true,
				},
			});
			yield put({
				type: LEAGUE_NOTICE_STATE,
				payload: {
					state: false,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.log(e);
	}
}

export function* reqDeleteLeagueNoticeList(data) {
	try {
		const result = yield call(managerService.deleteLeagueNoticeList, data);

		if (result.Status === 'OK') {
			yield put({
				type: START_LOADING,
			});
			yield put({
				type: RES_NOTICE_LEAGUE_LIST,
				payload: {
					list: result.Info.notice_list,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.log(e);
	}
}

export function* reqApproveLeague(data) {
	try {
		const result = yield call(managerService.approveLeague, data);
		if (result.Status === 'OK') {
			yield put({
				type: SUCCESS_STATE,
				payload: {
					state: true,
				},
			});
			yield delay(1000);
			yield put({
				type: SUCCESS_STATE,
				payload: {
					state: false,
				},
			});
		}
	} catch (e) {
		console.log(e);
	}
}

/********************************************************************************
 *  call
 ******************************************************************************* */

export function* watchReqParticipants() {
	while (true) {
		const { payload } = yield take(REQ_PARTICIPANTS);
		yield call(reqParticipants, payload);
	}
}
export function* watchrRqRejectParticipant() {
	while (true) {
		const { payload } = yield take(REQ_REJECT_LEAGUE);
		yield call(reqRejectParticipant, payload);
	}
}
export function* watchWriteLeagueNotice() {
	while (true) {
		const { payload } = yield take(REQ_NOTICE_LEAGUE_WRITE);
		yield call(reqWriteLeagueNorice, payload);
	}
}
export function* watchReqLeagueNoticeList() {
	while (true) {
		const { payload } = yield take(REQ_NOTICE_LEAGUE_LIST);
		yield call(reqLeagueNoticeList, payload);
	}
}
export function* watchReqLeagueNoticedetail() {
	while (true) {
		const { payload } = yield take(REQ_NOTICE_LEAGUE_SELECT);
		yield call(reqLeagueNoticedetail, payload);
	}
}
export function* watchReqReviseLeagueNoticeList() {
	while (true) {
		const { payload } = yield take(REQ_NOTICE_LEAGUE_REVISE);
		yield call(reqRevisLeagueNoticeList, payload);
	}
}

export function* watchReqDeleteLeagueNoticeList() {
	while (true) {
		const { payload } = yield take(REQ_NOTICE_LEAGUE_DELETE);
		yield call(reqDeleteLeagueNoticeList, payload);
	}
}
export function* watchReqApproveLeague() {
	while (true) {
		const { payload } = yield take(REQ_APPROVE_LEAGUE);
		yield call(reqApproveLeague, payload);
	}
}

/** ******************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchReqParticipants);
	yield fork(watchrRqRejectParticipant);
	yield fork(watchWriteLeagueNotice);
	yield fork(watchReqLeagueNoticeList);
	yield fork(watchReqLeagueNoticedetail);
	yield fork(watchReqReviseLeagueNoticeList);
	yield fork(watchReqDeleteLeagueNoticeList);
	yield fork(watchReqApproveLeague);
}
