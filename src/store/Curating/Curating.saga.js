import { push } from 'connected-react-router';
import { fork, take, call, put, select } from 'redux-saga/effects';
import {
	REQ_SEARCH_GAME,
	RES_SEARCH_GAME,
	REQ_CURATING_INSERT_GAME,
	
} from './Curating.store';
import { START_LOADING, END_LOADING } from '../Layout/Layout.store';

import curatingService from '../../services/curatingService';

/********************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

export function* reqGameSearch(data) {
	const info = { text: data.keyword };

	try {
		const result = yield call(curatingService.reqGameSearch, info);
		if (result) {
			yield put({
				type: RES_SEARCH_GAME,
				payload: {
					searchResult: result.hits.hits,
					count: result.hits.total.value,
				},
			});
		}
	} catch (e) {
		console.error(e);
	}
}
/** ******************************************************************************
 *  call
 ******************************************************************************* */

export function* watchReqGameSearch() {
	while (true) {
		const { payload } = yield take(REQ_SEARCH_GAME);
		yield call(reqGameSearch, payload);
	}
}

/********************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchReqGameSearch);
}
