import { fork, take, call, put, select } from 'redux-saga/effects';
import utils from '../../Utils/utils';
import {
	REQ_NOTICE,
	RES_NOTICE,
	REQ_NOTICE_POST,
	RES_NOTICE_POST,
	REQ_FAQ,
	RES_FAQ,
} from './Administer.store';

import {
	CHANGE_JOIN_SUB_MENU,
	CHANGE_MENU,
	START_LOADING,
	END_LOADING,
} from '../Layout/Layout.store';

import administerService from '../../services/administerService';

/** ******************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

export function* reqReqNoticeApi(data) {
	try {
		yield put({
			type: START_LOADING,
		});

		const result = yield call(administerService.noticeList, null);

		if (result) {
			yield put({
				type: RES_NOTICE,
				payload: {
					info: result.Info,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		yield put({
			type: END_LOADING,
		});
		console.error(e);
	}
}

export function* reqReqNoticePostApi(data) {
	const info = {
		id: data.id,
	};
	try {
		yield put({
			type: START_LOADING,
		});

		const result = yield call(administerService.noticePost, info);

		if (result) {
			yield put({
				type: RES_NOTICE_POST,
				payload: {
					info: result.Info.post[0],
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		yield put({
			type: END_LOADING,
		});
		console.error(e);
	}
}

export function* reqReqFaqApi(data) {
	try {
		yield put({
			type: START_LOADING,
		});

		const result = yield call(administerService.faqList, null);

		if (result) {
			yield put({
				type: RES_FAQ,
				payload: {
					info: result.Info,
				},
			});
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		yield put({
			type: END_LOADING,
		});
		console.error(e);
	}
}

/** ******************************************************************************
 *  call
 ******************************************************************************* */

export function* watchReqNotice() {
	while (true) {
		const { payload } = yield take(REQ_NOTICE);
		yield call(reqReqNoticeApi, payload);
	}
}

export function* watchReqNoticePost() {
	while (true) {
		const { payload } = yield take(REQ_NOTICE_POST);
		yield call(reqReqNoticePostApi, payload);
	}
}

export function* watchReqFaq() {
	while (true) {
		const { payload } = yield take(REQ_FAQ);
		yield call(reqReqFaqApi, payload);
	}
}

/** ******************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchReqNotice);
	yield fork(watchReqNoticePost);
	yield fork(watchReqFaq);
}
