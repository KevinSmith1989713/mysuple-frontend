import { push } from 'connected-react-router';
import { fork, take, call, put, select } from 'redux-saga/effects';
import {
	REQ_EDITOR_PICK,
	RES_EDITOR_PICK,
	REQ_MAIN_EDITOR_PICKS,
	RES_MAIN_EDITOR_PICKS,
} from './EditorPick.store';
import { START_LOADING, END_LOADING } from '../Layout/Layout.store';
import editorService from '../../services/editorService';

/********************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

export function* reqEditorPick(data) {
	const info = {
		id: data.id,
	};
	try {
		yield put({
			type: START_LOADING,
		});

		const result = yield call(editorService.editorSearch, info);

		if (result) {
			yield put({
				type: RES_EDITOR_PICK,
				payload: {
					editorPick: result.Info.info,
				},
			});

			yield put({
				type: END_LOADING,
			});
		} else {
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqMainEditorPick() {
	try {
		const result = yield call(editorService.reqMainEditorPick, null);
		if (result) {
			yield put({
				type: RES_MAIN_EDITOR_PICKS,
				payload: {
					mainEditorPick: result.Info.main,
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

export function* watchEditorPick() {
	while (true) {
		const { payload } = yield take(REQ_EDITOR_PICK);
		yield call(reqEditorPick, payload);
	}
}

export function* watchMainEditorPick() {
	while (true) {
		const { payload } = yield take(REQ_MAIN_EDITOR_PICKS);
		yield call(reqMainEditorPick, payload);
	}
}

/********************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchEditorPick);
	yield fork(watchMainEditorPick);
}
