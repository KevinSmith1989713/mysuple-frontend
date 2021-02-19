import { fork, take, call, put, select } from 'redux-saga/effects';
import {
	GAME_CHECK,
	GET_GAME,
	GAME_CHOICE,
	MAKE_GAME,
	MAKE_CREW_GAME,
	RES_GET_FAST_CREW,
	REQ_GET_FAST_CREW,
	REQ_SEARCH_FAST_CREWLIST,
	RES_SEARCH_FAST_CREWLIST,
	RES_GET_CREW,
	REQ_GET_CREW,
	REQ_SEARCH_CREWLIST,
	RES_SEARCH_CREWLIST,
	FILTER_GAME,
	FILTER_GAME_ID,
	CREW_MAKE_STATE,
} from './Colleague.store';
import { START_LOADING, END_LOADING } from '../Layout/Layout.store';
import colleagueService from '../../services/colleagueService';

/********************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

export function* gameCheckApi(data) {
	const info = {
		text: data.gameName,
	};
	try {
		const result = yield call(colleagueService.gameCheck, info);

		if (result) {
			yield put({
				type: GET_GAME,
				payload: {
					gameInfo: {
						data: result.Info,
					},
				},
			});

			yield put({
				type: GAME_CHOICE,
				payload: { gameChoice: true },
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* makeGameApi(data) {
	const info = {
		crew_title: data.crew_title,
		email: data.email,
		open: data.open,
		type: data.type,
		crew_image: '',
		crew_desc: '',
		crew_tag: '',
		game_id: data.game_id,
		game_title: data.gameTitle,
		game_title_kr: data.gameTitleKr,
		link: data.link,
		link_title: '',
		deletedAt: 'false',
		game_class: data.game_class,
		league_id: data.league_id,
		auto_link: data.auto_link,
	};

	try {
		const result = yield call(colleagueService.makeGame, info);
		// console.log(result);
		if (result.Status === 'OK') {
			yield put({
				type: REQ_GET_FAST_CREW,
				payload: { count: 1 },
			});
		}
		yield put({
			type: CREW_MAKE_STATE,
			payload: {
				state: true,
			},
		});
		yield put({
			type: CREW_MAKE_STATE,
			payload: {
				state: false,
			},
		});
	} catch (e) {
		console.error(e);
	}
}

export function* makeCrewGameApi(data) {
	const info = {
		crew_title: data.crew_title,
		email: data.email,
		open: data.open,
		type: data.type,
		crew_image: '',
		crew_desc: data.crew_desc,
		crew_tag: data.crew_tag,
		game_id: data.game_id,
		game_title: data.gameTitle,
		game_title_kr: data.gameTitleKr,
		link: data.link,
		link_title: '',
		deletedAt: 'false',
		game_class: data.game_class.map(item => {
			return item.game_class;
		}),
		crewImg: data.crewImg,
	};

	try {
		const result = yield call(colleagueService.makeCrewGame, info);
		if (result.Status === 'OK') {
			yield put({
				type: REQ_GET_CREW,
				payload: { count: 1 },
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqGetFastCrewList(data) {
	const info = {
		count: data.count,
	};

	try {
		// yield put({
		// 	type: START_LOADING,
		// });
		const result = yield call(colleagueService.fastCrewList, info);
		const fastCrewList = yield select(state => state.colleague.fastCrewList);
		if (result.Status === 'OK') {
			yield put({
				type: RES_GET_FAST_CREW,
				payload: {
					list:
						data.count > 1
							? [...fastCrewList, ...result.Info.data]
							: result.Info.data,
				},
			});

			yield put({
				type: FILTER_GAME_ID,
				payload: { info: [] },
			});
		}
		// yield put({
		// 	type: END_LOADING,
		// });
	} catch (e) {
		console.log(e);
	}
}

export function* reqSearchFastCrewList(data) {
	const isInfo = () => {
		if (
			(data.search_tags.length >= 1 && data.game_id[0] === undefined) ||
			data.game_id[0] === null
		) {
			const info = {
				text: data.text,
				search_tags: data.search_tags,
				count: data.count,
			};
			return info;
		} else if (
			(data.game_id.length >= 1 && data.search_tags[0] === undefined) ||
			data.search_tags[0] === null
		) {
			const info = {
				text: data.text,
				count: data.count,
				game_id: data.game_id,
			};
			return info;
		} else if (data.game_id.length >= 1) {
			const info = {
				text: data.text,
				count: data.count,
				game_id: data.game_id,
				search_tags: data.search_tags,
			};
			return info;
		} else {
			const info = {
				text: data.text,
				count: data.count,
			};
			return info;
		}
	};

	try {
		const result = yield call(colleagueService.fastCrewList, isInfo());

		if (result.Status === 'OK') {
			yield put({
				type: RES_SEARCH_FAST_CREWLIST,
				payload: {
					list: result.Info.data,
				},
			});
		} else {
			yield put({
				type: RES_SEARCH_FAST_CREWLIST,
				payload: {
					list: [],
				},
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqGetCrewList(data) {
	const info = {
		count: data.count,
	};

	try {
		// yield put({
		// 	type: START_LOADING,
		// });
		const result = yield call(colleagueService.crewList, info);
		const crewList = yield select(state => state.colleague.crewList);
		const menu = yield select(state => state.layout.menu);
		if (result.Status === 'OK') {
			yield put({
				type: RES_GET_CREW,
				payload: {
					list:
						data.count > 1
							? [...crewList, ...result.Info.data]
							: result.Info.data,
				},
			});

			if (menu === 'colleague') {
				yield put({
					type: FILTER_GAME,
					payload: { info: [] },
				});
			}

			yield put({
				type: FILTER_GAME_ID,
				payload: { info: [] },
			});
		}
		// yield put({
		// 	type: END_LOADING,
		// });
	} catch (e) {
		console.log(e);
	}
}

export function* reqSearchCrewList(data) {
	const isInfo = () => {
		if (data.search_tags.length >= 1 && data.game_id[0] === undefined) {
			const info = {
				text: data.text,
				search_tags: data.search_tags,
				count: data.count,
			};
			return info;
		} else if (data.game_id.length >= 1 && data.search_tags[0] === undefined) {
			const info = {
				text: data.text,
				count: data.count,
				game_id: data.game_id,
			};
			return info;
		} else if (data.game_id.length >= 1) {
			const info = {
				text: data.text,
				count: data.count,
				game_id: data.game_id,
				search_tags: data.search_tags,
			};
			return info;
		} else {
			const info = {
				text: data.text,
				count: data.count,
			};
			return info;
		}
	};

	try {
		const result = yield call(colleagueService.crewList, isInfo());

		if (result.Status === 'OK') {
			yield put({
				type: RES_SEARCH_CREWLIST,
				payload: {
					list: result.Info.data,
				},
			});
		} else {
			yield put({
				type: RES_SEARCH_CREWLIST,
				payload: {
					list: [],
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

export function* watchGameCheck() {
	while (true) {
		const { payload } = yield take(GAME_CHECK);
		yield call(gameCheckApi, payload);
	}
}

export function* watchMakeGame() {
	while (true) {
		const { payload } = yield take(MAKE_GAME);
		yield call(makeGameApi, payload);
	}
}
export function* watchMakeCrewGame() {
	while (true) {
		const { payload } = yield take(MAKE_CREW_GAME);
		yield call(makeCrewGameApi, payload);
	}
}

export function* watchGetFastCrewList() {
	while (true) {
		const { payload } = yield take(REQ_GET_FAST_CREW);
		yield call(reqGetFastCrewList, payload);
	}
}
export function* watchSeachFastCrewList() {
	while (true) {
		const { payload } = yield take(REQ_SEARCH_FAST_CREWLIST);
		yield call(reqSearchFastCrewList, payload);
	}
}

export function* watchGetCrewList() {
	while (true) {
		const { payload } = yield take(REQ_GET_CREW);
		yield call(reqGetCrewList, payload);
	}
}
export function* watchSeachCrewList() {
	while (true) {
		const { payload } = yield take(REQ_SEARCH_CREWLIST);
		yield call(reqSearchCrewList, payload);
	}
}

/********************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchGameCheck);
	yield fork(watchMakeGame);
	yield fork(watchMakeCrewGame);
	yield fork(watchGetFastCrewList);
	yield fork(watchSeachFastCrewList);
	yield fork(watchGetCrewList);
	yield fork(watchSeachCrewList);
}
