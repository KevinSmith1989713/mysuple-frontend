import { fork, take, call, put, select } from 'redux-saga/effects';
import {
	REQ_SEARCH_FRIEND,
	RES_SEARCH_FRIEND,
	FRIEND_EXISTENCE,
	REQ_ADD_FRIEND,
	RES_ADD_FRIEND,
	REQ_FRIEND_LIST,
	RES_FRIEND_LIST,
} from './Chatting.store';
import {
	CHANGE_JOIN_SUB_MENU,
	CHANGE_MENU,
	START_LOADING,
	END_LOADING,
} from '../Layout/Layout.store';

import chattingService from '../../services/chattingService';

/** ******************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

export function* reqFriendList() {
	try {
		const result = yield call(chattingService.friendList);

		if (result.Status === 'OK') {
			yield put({
				type: START_LOADING,
			});

			yield put({
				type: RES_FRIEND_LIST,
				payload: {
					friend: result.Info.friend,
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

export function* reqSearchFriend(data) {
	const param = {
		to_user: data.friendName,
	};

	try {
		const result = yield call(chattingService.searchFriend, param);
		// console.log(result);
		// const friendExistence = yield select(
		// 	state => state.chatting.friendExistence,
		// );
		if (result.Info.friendExist === true) {
			yield put({
				type: START_LOADING,
			});
			yield put({
				type: RES_SEARCH_FRIEND,
				payload: {
					friendName: result.Info,
				},
			});
		} else {
			yield put({
				type: RES_SEARCH_FRIEND,
				payload: {
					friendName: null,
				},
			});
			yield put({
				type: FRIEND_EXISTENCE,
				payload: {
					boolean: true,
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

export function* reqAddFriendApi(data) {
	const param = {
		to_user: data.friendName,
	};
	try {
		const result = yield call(chattingService.addFriend, param);

		if (result.Status === 'OK') {
			yield put({
				type: START_LOADING,
			});
			yield put({
				type: RES_ADD_FRIEND,
				payload: {
					friend: result.Info,
				},
			});
			yield put({
				type: END_LOADING,
			});
			alert('추가 되었습니다.');
		} else {
			alert('이미 추가된 친구입니다.');
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

export function* watchReqFriendList() {
	while (true) {
		const { payload } = yield take(REQ_FRIEND_LIST);
		yield call(reqFriendList, payload);
	}
}

export function* watchReqReqAddFriend() {
	while (true) {
		const { payload } = yield take(REQ_ADD_FRIEND);
		yield call(reqAddFriendApi, payload);
	}
}

export function* watchSearchFriend() {
	while (true) {
		const { payload } = yield take(REQ_SEARCH_FRIEND);
		yield call(reqSearchFriend, payload);
	}
}
/** ******************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchReqReqAddFriend);
	yield fork(watchSearchFriend);
	yield fork(watchReqFriendList);
}
