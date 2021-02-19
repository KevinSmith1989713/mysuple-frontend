import { push } from 'connected-react-router';
import { fork, take, call, put, select } from 'redux-saga/effects';
import {
	INSERT_OFFICIAL_NOTICE,
	INSERT_OFFICIAL_DEVNOTE,
	REQ_OFFICIAL_DEVNOTE,
	RES_OFFICIAL_DEVNOTE,
	REQ_OFFICIAL_NOTICE,
	RES_OFFICIAL_NOTICE,
	REQ_OFFICIAL_EVENT,
	RES_OFFICIAL_EVENT,
	INSERT_OFFICIAL_EVENT,
	REQ_OFFICIAL_DETAIL_POST,
	RES_OFFICIAL_DETAIL_POST,
	REQ_OFFICIAL_SKIN,
	RES_OFFICIAL_SKIN,
} from './Community.store';
import { START_LOADING, END_LOADING } from '../Layout/Layout.store';
import communityService from '../../services/communityService';

/********************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

export function* insertOfficialDevNote(data) {
	const email = yield select(state => state.auth.userInfo.email);
	const info = {
		email,
		file: data.file,
		pageId: data.pageId,
		title: data.title,
		content: data.content,
	};

	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(communityService.insertOfficialDevNote, info);
		if (result) {
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.error(e);
	}
}
export function* reqOfficialNotice(data) {
	const info = { pageId: data.pageId };

	try {
		yield put({ type: START_LOADING });
		const result = yield call(communityService.reqOfficialNotice, info);
		if (result) {
			yield put({
				type: RES_OFFICIAL_NOTICE,
				payload: {
					communityNotice: result.data.Info,
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
export function* reqOfficialDevNote(data) {
	const info = {
		pageId: data.pageId,
	};

	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(communityService.reqOfficialDevNote, info);
		if (result) {
			yield put({
				type: RES_OFFICIAL_DEVNOTE,
				payload: {
					communityDevNote: result.Info,
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
export function* reqOfficialEvent(data) {
	const info = {
		pageId: data.pageId,
	};

	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(communityService.reqOfficialRunningEvent, info);
		const result2 = yield call(communityService.reqOfficialEndedEvent, info);
		if (result) {
			yield put({
				type: RES_OFFICIAL_EVENT,
				payload: {
					RunningEvent: result.Info,
					EndedEvent: result2.Info,
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
export function* reqOfficialDetailPost(data) {
	const info = {
		pageId: data.pageId,
		postId: data.postId,
		type: data.type,
	};

	try {
		yield put({ type: START_LOADING });
		const result = yield call(communityService.reqOfficialPost, info);
		if (result) {
			yield put({
				type: RES_OFFICIAL_DETAIL_POST,
				payload: {
					communityPost: result.Info,
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
export function* reqOfficialSkin(data) {
	const info = {
		pageId: data.pageId,
	};

	try {
		yield put({ type: START_LOADING });
		const result = yield call(communityService.reqOfficialSkin, info);
		if (result) {
			yield put({
				type: RES_OFFICIAL_SKIN,
				payload: {
					communitySkin: result.Info,
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
/** ******************************************************************************
 *  call
 ******************************************************************************* */

export function* watchInsertOfficialDevNote() {
	while (true) {
		const { payload } = yield take(INSERT_OFFICIAL_DEVNOTE);
		yield call(insertOfficialDevNote, payload);
	}
}

export function* watchReqOfficialNotice() {
	while (true) {
		const { payload } = yield take(REQ_OFFICIAL_NOTICE);
		yield call(reqOfficialNotice, payload);
	}
}

export function* watchReqOfficialDevNote() {
	while (true) {
		const { payload } = yield take(REQ_OFFICIAL_DEVNOTE);
		yield call(reqOfficialDevNote, payload);
	}
}

export function* watchReqOfficialEvent() {
	while (true) {
		const { payload } = yield take(REQ_OFFICIAL_EVENT);
		yield call(reqOfficialEvent, payload);
	}
}

export function* watchReqOfficialDetailPost() {
	while (true) {
		const { payload } = yield take(REQ_OFFICIAL_DETAIL_POST);
		yield call(reqOfficialDetailPost, payload);
	}
}
export function* watchReqOfficialSkin() {
	while (true) {
		const { payload } = yield take(REQ_OFFICIAL_SKIN);
		yield call(reqOfficialSkin, payload);
	}
}
/********************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchInsertOfficialDevNote);
	yield fork(watchReqOfficialNotice);
	yield fork(watchReqOfficialDevNote);
	yield fork(watchReqOfficialEvent);
	yield fork(watchReqOfficialDetailPost);
	yield fork(watchReqOfficialSkin);
}
