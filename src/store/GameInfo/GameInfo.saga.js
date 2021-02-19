import { push } from 'connected-react-router';
import { fork, take, call, put, select } from 'redux-saga/effects';
import {
	REQ_GAME_INFO,
	RES_GAME_INFO,
	REQ_GAME_PRICE,
	RES_GAME_PRICE,
	REQ_GAME_DETAIL,
	RES_GAME_DETAIL,
	UPSERT_MY_TASTE,
	INSERT_REVIEW,
	INSERT_REVIEW_UPDATE,
	MAKE_CURATING,
	INSERT_CURATING_GAME,
	SEARCH_GAME,
	SEARCH_GAME_WITH_PLAY,
	INIT_ARRAY,
	REQ_ALL_SEARCH,
	RES_ALL_SEARCH,
	REQ_CURRENCY,
	RES_CURRENCY,
	REPORT_REVIEW,
	RESET_GAMEINFO,
	MODAL_STATE,
} from './GameInfo.store';

import { REQ_GET_MY_CURATING, REQ_GET_MY_GAME } from '../MyPage/MyPage.store';
import { START_LOADING, END_LOADING } from '../Layout/Layout.store';
import infoService from '../../services/infoService';

/********************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

const getUserInfo = JSON.parse(localStorage.getItem('data'));

export function* gameSearchApi(data) {
	const count = yield select(state => state.gameInfo.count);
	const id = yield select(state => state.auth.userInfo.id);

	const info = {
		text: data.text,
		count,
	};

	try {
		yield put({
			type: RESET_GAMEINFO,
		});
		yield put({
			type: START_LOADING,
		});
		const result = yield call(infoService.gameSearch, info);

		if (result) {
			yield put(push(`/info`));
			yield put({
				type: RES_GAME_INFO,
				payload: {
					list: !!result.Info.data ? result.Info.data : [],
				},
			});
			yield put({
				type: INIT_ARRAY,
			});

			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* allSearchApi(data) {
	// const count = yield select(state => state.gameInfo.count);

	const id = yield getUserInfo.id;

	const info = {
		text: data.text,
		count: 1,
		id,
	};

	try {
		yield put(push(`/search/${data.text}`));
		yield put({
			type: RESET_GAMEINFO,
		});
		yield put({
			type: START_LOADING,
		});
		const result = yield call(infoService.gameSearch, info);

		if (result) {
			yield put({
				type: RES_GAME_INFO,
				payload: {
					list: result.Info.data,
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

export function* reqGameInfoApi(data) {
	const email1 = yield select(state => state.auth.userInfo.email);

	// const info = {
	// 	email: email1,
	// 	game_id: '',
	// 	page: data.page,
	// 	countPerPage: data.countPerPage,
	// };

	yield put({
		type: RESET_GAMEINFO,
	});
	const info = {
		count: data.count,
	};

	try {
		yield put({
			type: START_LOADING,
		});

		const result = yield call(infoService.gameSelect, info);

		if (result) {
			yield put({
				type: RES_GAME_INFO,
				payload: {
					list: result.Info.data,
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

export function* reqGamePriceApi(data) {
	const info = {
		key: data.key,
		plain: data.plain,
	};
	try {
		const result = yield call(infoService.gamePrice, info);
		if (result) {
			yield put({
				type: RES_GAME_PRICE,
				payload: {
					gamePrice: result.data[data.plain].list,
				},
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqGameDetailApi(data) {
	const info = {
		id: data.id,
	};
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(infoService.gameDetail, info);
		if (result) {
			yield put({
				type: RES_GAME_DETAIL,
				payload: {
					info: result.Info,
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

export function* upsertMyTasteApi() {
	// const email = yield select(state => state.auth.userInfo.email);
	const id = yield getUserInfo.id;
	const game_taste = yield select(state => state.gameInfo.taste);
	const info = {
		id,
		game_taste,
	};

	try {
		if (game_taste.length > 0) {
			const result = yield call(infoService.upsertTaste, info);

			if (result) {
			}
		} else {
			return;
		}
	} catch (e) {
		console.error(e);
	}
}

export function* insertReviewApi(data) {
	if (data.evaluation_content === '') {
		if (data.total_score <= 1 && data.total_score > 0.4) {
			data.evaluation_content = '별주기도 아까워요';
		}
		if (data.total_score > 1 && data.total_score <= 2) {
			data.evaluation_content = '궁금하다면 말리진 않을게요';
		}
		if (data.total_score > 2 && data.total_score <= 3) {
			data.evaluation_content = '그럭저럭 할만 해요!';
		}
		if (data.total_score > 3 && data.total_score <= 4) {
			data.evaluation_content = '한번 플레이 해보는 걸 추천해요';
		}
		if (data.total_score > 4 && data.total_score <= 5) {
			data.evaluation_content = '내 인생 최고의 게임이예요';
		}
	}

	const id = yield getUserInfo.id;
	const info = {
		id,
		game_id: data.game_id,
		fun_score: data.fun_score,
		complete_score: data.complete_score,
		difficulty_score: data.difficulty_score,
		operation_score: data.operation_score,
		total_score: data.total_score,
		evaluation_content: data.evaluation_content,
	};

	try {
		if (!!id) {
			yield put({
				type: START_LOADING,
			});
			const result = yield call(infoService.insertReview, info);

			if (result.Status === 'OK') {
				if (window.location.pathname.substring(1, 5) === 'info') {
					window.location.reload();
					yield put({
						type: END_LOADING,
					});
				}
			}
			yield put({
				type: END_LOADING,
			});
		} else {
			alert('로그인 후에 리뷰 작성해주세요');
		}
	} catch (e) {
		console.error(e);
	}
}

export function* insertReviewUpdateApi(data) {
	if (data.evaluation_content === '') {
		if (data.total_score <= 1 && data.total_score > 0.4) {
			data.evaluation_content = '별주기도 아까워요';
		}
		if (data.total_score > 1 && data.total_score <= 2) {
			data.evaluation_content = '궁금하다면 말리진 않을게요';
		}
		if (data.total_score > 2 && data.total_score <= 3) {
			data.evaluation_content = '그럭저럭 할만 해요!';
		}
		if (data.total_score > 3 && data.total_score <= 4) {
			data.evaluation_content = '한번 플레이 해보는 걸 추천해요';
		}
		if (data.total_score > 4 && data.total_score <= 5) {
			data.evaluation_content = '내 인생 최고의 게임이예요';
		}
	}

	const id = yield getUserInfo.id;
	const info = {
		id,
		review_id: data.review_id,
		fun_score: data.fun_score,
		complete_score: data.complete_score,
		difficulty_score: data.difficulty_score,
		operation_score: data.operation_score,
		total_score: data.total_score,
		evaluation_content: data.evaluation_content,
	};
	// console.log(info);

	try {
		if (!!id) {
			yield put({
				type: START_LOADING,
			});
			const result = yield call(infoService.insertReviewUpdate, info);
			if (result.Status === 'OK') {
				yield put({
					type: REQ_GET_MY_GAME,
				});
				if (window.location.pathname.substring(1, 5) === 'info') {
					window.location.reload();
					yield put({
						type: END_LOADING,
					});
				}
				// const re = yield call(infoService.gameSelect, { count: 1 });
				// if (re) {
				// 	yield put({
				// 		type: RES_GAME_INFO,
				// 		payload: {
				// 			list: re.Info.data,
				// 		},
				// 	});
				// }

				yield put({
					type: END_LOADING,
				});
			}
			yield put({
				type: END_LOADING,
			});
		} else {
			alert('로그인 후에 리뷰 작성해주세요');
		}
	} catch (e) {
		console.error(e);
	}
}

export function* makeCuratingApi(data) {
	// const email = yield select(state => state.auth.userInfo.email);
	const id = yield getUserInfo.id;
	const info = {
		id,
		curating_name: data.curating_name,
		curating_tag: data.curating_tag,
	};

	try {
		if (!!id) {
			yield put({
				type: START_LOADING,
			});
			const result = yield call(infoService.makeCurating, info);

			if (result) {
				yield put({ type: REQ_GET_MY_CURATING });
				yield put({
					type: END_LOADING,
				});
			}
		} else {
			alert('로그인 후에 큐레이팅을 작성해주세요');
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reportReview(data) {
	// const email = yield select(state => state.auth.userInfo.email);
	const id = yield getUserInfo.id;
	const info = {
		id,
		review_id: data.review_id,
		review_report_type: data.review_report_type,
		review_report_content: data.review_report_content,
	};
	try {
		if (!!id) {
			yield put({
				type: START_LOADING,
			});
			const result = yield call(infoService.reportReview, info);

			if (result) {
				yield put({
					type: END_LOADING,
				});
			}
		} else {
			alert('로그인 후에 신고해주세요');
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqCurrency(data) {
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(infoService.reqCurrency);

		if (result) {
			yield put({
				type: RES_CURRENCY,
				payload: {
					currency: result.USDKRW[0],
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

export function* watchReqGameInfo() {
	while (true) {
		const { payload } = yield take(REQ_GAME_INFO);
		yield call(reqGameInfoApi, payload);
	}
}

export function* watchReqGameDetail() {
	while (true) {
		const { payload } = yield take(REQ_GAME_DETAIL);
		yield call(reqGameDetailApi, payload);
	}
}

export function* watchReqGamePrice() {
	while (true) {
		const { payload } = yield take(REQ_GAME_PRICE);
		yield call(reqGamePriceApi, payload);
	}
}
export function* watchUpsertMyTaste() {
	while (true) {
		yield take(UPSERT_MY_TASTE);
		yield call(upsertMyTasteApi);
	}
}

export function* watchInsertReview() {
	while (true) {
		const { payload } = yield take(INSERT_REVIEW);
		yield call(insertReviewApi, payload);
	}
}
export function* watchInsertReviewUpdate() {
	while (true) {
		const { payload } = yield take(INSERT_REVIEW_UPDATE);
		yield call(insertReviewUpdateApi, payload);
	}
}

export function* watchMakeCurating() {
	while (true) {
		const { payload } = yield take(MAKE_CURATING);
		yield call(makeCuratingApi, payload);
	}
}
export function* watchGameSearch() {
	while (true) {
		const { payload } = yield take(SEARCH_GAME);
		yield call(gameSearchApi, payload);
	}
}

export function* watchAllSearch() {
	while (true) {
		const { payload } = yield take(REQ_ALL_SEARCH);
		yield call(allSearchApi, payload);
	}
}

export function* watchReportReview() {
	while (true) {
		const { payload } = yield take(REPORT_REVIEW);
		yield call(reportReview, payload);
	}
}

export function* watchReqCurrency() {
	while (true) {
		const { payload } = yield take(REQ_CURRENCY);
		yield call(reqCurrency, payload);
	}
}

/********************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchReqGameInfo);
	yield fork(watchReqGameDetail);
	yield fork(watchReqGamePrice);
	yield fork(watchUpsertMyTaste);
	yield fork(watchInsertReview);
	yield fork(watchInsertReviewUpdate);
	yield fork(watchMakeCurating);
	yield fork(watchGameSearch);
	yield fork(watchAllSearch);
	yield fork(watchReportReview);
	yield fork(watchReqCurrency);
}
