import { fork, take, call, put, select, delay } from 'redux-saga/effects';
import utils from '../../Utils/utils';
import {
	REQ_INQUIRY,
	RES_INQUIRY,
	REQ_GET_MY_GAME,
	RES_GET_MY_GAME,
	PROFILE_UPDATE,
	REQ_GET_MY_CURATING,
	RES_GET_MY_CURATING,
	REQ_MY_CONTANTS_LIST,
	RES_MY_CONTANTS_LIST,
	MY_CONTANTS_DELETE,
	REQ_MY_LEAGUE_QUESTION,
	RES_MY_LEAGUE_QUESTION,
	REQ_MY_LEAGUE_QUESTION_REVISE,
	REQ_MY_LEAGUE_TEAM_REVISE,
} from './MyPage.store';

import { LEAGUE_NOTICE_STATE } from '../Manage/Manage.store';

import { UPDATE_USER_INFO, UPDATE_PROFILE } from '../Auth/Auth.store';
import {
	START_LOADING,
	END_LOADING,
	SUCCESS_STATE,
} from '../Layout/Layout.store';

import myPageService from '../../services/myPageService';
/** ******************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

export function* reqInquiryApi(data) {
	const id = getUserInfo.id;
	const info = {
		id,
		category: data.category,
		title: data.title,
		content: data.content,
		file: data.file,
	};
	try {
		const result = yield call(myPageService.fileUpload, info);

		if (result) {
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqGetMyGameApi(data) {
	const id = !!getUserInfo && getUserInfo.id;
	const info = { id };

	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(myPageService.getMyGame, info);

		if (result.Status === 'OK') {
			const { list, tasteId, reviewList } = result.Info;

			let array = [];
			let reviewIndex = [];
			let finalArray = [];

			// for (let i = 0; i < result.Info.list.length; i++) {
			// 	array[i] = {
			// 		title: list[i].game_title,
			// 		image: list[i].img_src,
			// 		id: tasteId[i].game_id,
			// 		isFunny: tasteId[i].taste_funny,
			// 		isWanna: tasteId[i].taste_wanna,
			// 		isLike: tasteId[i].taste_like,
			// 		taste_date: tasteId[i].taste_date,
			// 		tId: tasteId[i].taste_id,
			// 	};
			// }

			// reviewList.map(item => {
			// 	if (array.findIndex(all => all.id === item.game_id) !== -1) {
			// 		reviewIndex.push(array.findIndex(all => all.id === item.game_id));
			// 	}
			// });

			// finalArray = array.map((item, index) => {
			// 	if (reviewIndex.indexOf(index) !== -1) {
			// 		{
			// 			return { ...item, review: reviewList[index] };
			// 		}
			// 	} else {
			// 		{
			// 			return item;
			// 		}
			// 	}
			// });

			// yield put({
			// 	type: RES_GET_MY_GAME,
			// 	payload: {
			// 		// list: finalArray,
			// 		list: [...result.Info.my_games],
			// 	},
			// });
		}
		yield put({
			type: RES_GET_MY_GAME,
			payload: {
				// list: finalArray,
				list: result.Info.my_games,
			},
		});
		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);

		yield put({
			type: END_LOADING,
		});
	}
}

export function* reqProfileUpdateApi(data) {
	const id = getUserInfo.id;

	const info = {
		id,
		file: data.file,
		newNickname: data.newNickname,
		new_avatar_desc: data.desc,
	};

	try {
		yield put({
			type: START_LOADING,
		});

		const result = yield call(myPageService.profileUpdate, info);

		if (result) {
			yield put({
				type: UPDATE_PROFILE,
				payload: {
					nickName: result.Info.nickName,
					avatarUrl: result.Info.avatarUrl,
					dsec: result.Info.desc,
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

export function* reqGetMyCuratingApi() {
	const id = getUserInfo && getUserInfo.id;

	const info = {
		id,
	};

	try {
		const result = yield call(myPageService.getMyCurating, info);

		if (result) {
			if (!!result.Info) {
				yield put({
					type: RES_GET_MY_CURATING,
					payload: {
						list: !!result.Info.list ? result.Info.list : [],
					},
				});
			}
		}
	} catch (e) {}
}

export function* myContantsListApi() {
	const id = !!getUserInfo && getUserInfo.id;

	const info = {
		id,
	};

	try {
		const result = yield call(myPageService.myContentsList, info);

		yield put({
			type: RES_MY_CONTANTS_LIST,
			payload: {
				list: result.Info.my_writings,
			},
		});
	} catch (e) {
		console.error(e);
	}
}
export function* myContantsDeleteApi(data) {
	const info = {
		crew_id: data.crew_id,
	};

	try {
		const result = yield call(myPageService.myContentsDelete, info);

		if (result.Msg === 'success') {
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
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqGetMyLeagueQuestion(data) {
	try {
		const result = yield call(myPageService.getmyLeagueQuestion, data);

		if (result.Status === 'OK') {
			yield put({
				type: RES_MY_LEAGUE_QUESTION,
				payload: {
					list: result.Info.qa,
				},
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqReviseMyLeagueQuestion(data) {
	try {
		const result = yield call(myPageService.reviseMyLeagueQuestion, data);

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
		console.error(e);
	}
}
export function* reqReviseMyLeagueTeam(data) {
	try {
		const result = yield call(myPageService.reviseMyLeagueTeam, data);

		if (result.Msg === 'success') {
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
		console.error(e);
	}
}

/********************************************************************************
 *  call
 ******************************************************************************* */

export function* watchReqInquiry() {
	while (true) {
		const { payload } = yield take(REQ_INQUIRY);
		yield call(reqInquiryApi, payload);
	}
}

export function* watchReqGetMyGame() {
	while (true) {
		const { payload } = yield take(REQ_GET_MY_GAME);
		yield call(reqGetMyGameApi, payload);
	}
}

export function* watchReqProfileUpdate() {
	while (true) {
		const { payload } = yield take(PROFILE_UPDATE);
		yield call(reqProfileUpdateApi, payload);
	}
}

export function* watchReqGetMyCurating() {
	while (true) {
		const { payload } = yield take(REQ_GET_MY_CURATING);
		yield call(reqGetMyCuratingApi, payload);
	}
}
export function* watchMyContantsList() {
	while (true) {
		const { payload } = yield take(REQ_MY_CONTANTS_LIST);
		yield call(myContantsListApi, payload);
	}
}
export function* watchMyContantsDelete() {
	while (true) {
		const { payload } = yield take(MY_CONTANTS_DELETE);
		yield call(myContantsDeleteApi, payload);
	}
}
export function* watchGetMyleagueQuestion() {
	while (true) {
		const { payload } = yield take(REQ_MY_LEAGUE_QUESTION);
		yield call(reqGetMyLeagueQuestion, payload);
	}
}
export function* watchReviseMyleagueQuestion() {
	while (true) {
		const { payload } = yield take(REQ_MY_LEAGUE_QUESTION_REVISE);
		yield call(reqReviseMyLeagueQuestion, payload);
	}
}
export function* watchReviseMyleagueTeam() {
	while (true) {
		const { payload } = yield take(REQ_MY_LEAGUE_TEAM_REVISE);
		yield call(reqReviseMyLeagueTeam, payload);
	}
}

/** ******************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchReqInquiry);
	yield fork(watchReqGetMyGame);
	yield fork(watchReqProfileUpdate);
	yield fork(watchReqGetMyCurating);
	yield fork(watchMyContantsList);
	yield fork(watchMyContantsDelete);
	yield fork(watchGetMyleagueQuestion);
	yield fork(watchReviseMyleagueQuestion);
	yield fork(watchReviseMyleagueTeam);
}
