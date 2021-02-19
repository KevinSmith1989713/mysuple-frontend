import { fork, take, call, put, select } from 'redux-saga/effects';
import utils from '../../Utils/utils';
import Cookies from 'js-cookie';
import { signUp } from '../../store/Auth/Auth.store';

import {
	EMAIL_CHECK,
	REQ_LOCAL_SIGN_IN,
	RES_SIGN_IN,
	REQ_SOCIAL_SIGN_IN,
	REQ_SIGN_UP,
	RES_SIGN_UP,
	JOIN_TASTE,
	UPDATE_NICK_NAME,
	WITH_DRAWAL,
	FIND_EMAIL,
	UPDATE_USER_INFO,
	SIGN_OUT,
	REQ_SHOW_TASTE,
	RES_SHOW_TASTE,
	SEND_RESET_PASSWORD,
	RESET_PASSWORD,
	REQ_PASS_COUNT,
	RES_PASS_COUNT,
	REQ_PASS,
	RES_PASS,
} from './Auth.store';
import {
	CHANGE_JOIN_SUB_MENU,
	CHANGE_MENU,
	START_LOADING,
	END_LOADING,
} from '../Layout/Layout.store';
import authService from '../../services/authService';

/** ******************************************************************************
 *  제너레이터 함수
 ******************************************************************************* */

const getUserInfo = JSON.parse(localStorage.getItem('data'));

export function* emailCheckApi(data) {
	const email1 = yield select(state => state.auth.userInfo.email);
	const name1 = yield select(state => state.auth.userInfo.name);
	const avatar_url = yield select(state => state.auth.userInfo.avatar_url);
	const marketing1 = yield select(state => state.auth.termObj.marketing);
	const member1 = yield select(state => state.auth.termObj.member);

	const info = {
		email: data.email,
		type: data.type,
	};
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(authService.sameEmailCheck, info);
		// console.log(result);
		if (result) {
			if (result.Info.code === 0) {
				if (data.type === 'local') {
					yield put({
						type: CHANGE_JOIN_SUB_MENU,
						payload: {
							menu: 'third',
						},
					});
				} else if (data.type === 'social') {
					yield put({
						type: REQ_SIGN_UP,
						payload: {
							email: email1,
							avatar_url,
							nickname: name1,
							marketing_consent: marketing1,
							permanent_member: member1,
						},
					});
				}
			} else {
				alert('이미 가입된 이메일 입니다. 로그인 페이지로 이동합니다');
				localStorage.clear();
				yield put({
					type: CHANGE_MENU,
					payload: {
						menu: 'login',
					},
				});
			}

			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* reqLocalSignInApi(data) {
	const info = {
		email: data.email,
		password: data.password,
		platform: data.platform,
	};
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(authService.signIn, info);

		if (result.Status === 'OK') {
			yield localStorage.setItem(
				'sessionKey',
				JSON.stringify(result.Info.session_key),
			);

			// yield Cookies.set(`sessionID`, result.Info.session_key);
			yield put({
				type: RES_SIGN_IN,
				payload: {
					email: result.Info.email,
					nickName: result.Info.nickName,
					joinDate: result.Info.joinDate,
					sessionKey: result.Info.sessionKey,
					avatarUrl: result.Info.avatarUrl,
					compensation: result.Info.compensation,
				},
			});
			yield put({
				type: CHANGE_MENU,
				payload: {
					menu: 'home',
				},
			});
			yield put(window.location.reload());
		} else if (result.Msg.err_code === 20) {
			alert('일치하는 회원이 없습니다. 회원가입을 진행해주세요.');
			yield put({
				type: CHANGE_MENU,
				payload: {
					menu: 'join',
				},
			});
		} else if (result.Msg.err_code === 30) {
			alert('소셜로그인으로 가입되어 있습니다.');
		} else {
			alert('비밀번호가 틀렸습니다.');
		}

		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqSocialSignInApi(data) {
	const info = {
		email: data.email,
		platform: data.platform,
		name: data.name,
		avatar_url: data.avatar_url,
	};
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(authService.socialSignIn, info);

		if (result.Status === 'OK') {
			// yield (document.cookie = `sessionKey=${result.Info.sessionKey}`);
			yield put({
				type: RES_SIGN_IN,
				payload: {
					email: result.Info.email,
					nickName: result.Info.nickName,
					joinDate: result.Info.joinDate,
					sessionKey: result.Info.sessionKey,
					avatarUrl: result.Info.avatarUrl,
					compensation: result.Info.compensation,
				},
			});
			yield put({
				type: CHANGE_MENU,
				payload: {
					menu: 'home',
				},
			});
			yield put(window.location.reload());
		} else if (result.Msg.err_code === 20) {
			const result = yield call(authService.join, {
				email: info.email,
				platform: info.platform,
				name: info.name,
				avatar_url: info.avatar_url,
			});
			if (result.Status == 'OK') {
				yield put({
					type: CHANGE_MENU,
					payload: {
						menu: 'join',
					},
				});
				yield put({
					type: CHANGE_JOIN_SUB_MENU,
					payload: {
						menu: 'fourth',
					},
				});
			}
		} else if (result.Msg.err_code === 30) {
			alert('다른소셜로 가입되어 있습니다.');
		}

		yield put({
			type: END_LOADING,
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqSignUpApi(data) {
	const info = {
		birth: data.birth,
		gender: data.gender,
		passwd_q: data.passwd_q,
		passwd_a: data.passwd_a,
		password: data.password,
		email: data.email,
		nickname: data.nickname,
		name: data.name,
		phone: data.phone,
		marketing_consent: !data.marketing_consent ? '0' : '1',
		permanent_member: !data.permanent_member ? '0' : '1',
		avatar_url: data.avatar_url,
		platform: data.platform,
		age: data.age,
	};
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(authService.join, info);
		console.log(result);
		if (result.Status === 'OK') {
			// yield put({
			// 	type: RES_SIGN_UP,
			// 	payload: {
			// 		email: result.Info.email,
			// 		nickName: result.Info.nickName,
			// 		joinDate: result.Info.joinDate,
			// 		avatarUrl: result.Info.avatarUrl,
			// 	},
			// });

			yield put({
				type: CHANGE_JOIN_SUB_MENU,
				payload: {
					menu: 'fourth',
				},
			});

			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.error(e);
	}
	yield put({
		type: END_LOADING,
	});
}

export function* joinTasteApi(data) {
	const info = {
		single: data.single,
		multi: data.multi,
		pc: data.pc,
		mobile: data.mobile,
		console1: data.console1,
		shooting: data.shooting,
		sports: data.sports,
		horror: data.horror,
		gore: data.gore,
		daily: data.daily,
		music: data.music,
		racing: data.racing,
		strategy: data.strategy,
		adventure: data.adventure,
		rpg: data.rpg,
		love: data.love,
		puzzle: data.puzzle,
		fantasy: data.fantasy,
		movie: data.movie,
		casual: data.casual,
		survival: data.survival,
		vr: data.vr,
		indie: data.indie,
		action: data.action,
		fight: data.fight,
		violence: data.violence,
		simulation: data.simulation,
		moba: data.moba,
		ps: data.ps,
		nin: data.nin,
		xbox: data.xbox,
	};
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(authService.showJoinTaste, info);

		if (result) {
			yield put({
				type: CHANGE_JOIN_SUB_MENU,
				payload: {
					menu: 'seventh',
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

export function* withDrawalApi(data) {
	const info = {};
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(authService.withDrawal, info);

		if (result) {
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.error(e);
	}
}

export function* findEmailApi(data) {
	const info = {
		name: data.name,
		telNumber: data.telNumber,
	};
	try {
		yield put({
			type: START_LOADING,
		});
		const result = yield call(authService.findEmail, info);

		if (result) {
			const info = {
				email: result.Info.user.email,
				showEmail: utils.blindEmail(result.Info.user.email),
				name: result.Info.user.name,
				passwd_q: result.Info.user.passwd_q,
				passwd_a: result.Info.user.passwd_a,
			};

			if (result.Status === 'OK') {
				yield put({
					type: UPDATE_USER_INFO,
					payload: {
						info: info,
					},
				});
				yield put({
					type: CHANGE_MENU,
					payload: {
						menu: 'findEmailResult',
					},
				});
			} else {
				alert(
					'이름 또는 휴대폰 번호가 일치하지 않습니다. 확인 후 다시 시도해주세요.',
				);
			}
			yield put({
				type: END_LOADING,
			});
		}
	} catch (e) {
		console.error(e);
		yield put({
			type: END_LOADING,
		});
	}
}

export function* signOutApi() {
	try {
		yield put({
			type: CHANGE_MENU,
			payload: {
				menu: 'login',
			},
		});
	} catch (e) {
		console.error(e);
	}
}

export function* reqShowTasteApi() {
	try {
		// const result = yield call(authService.showTaste);
		// if (result) {
		// 	let array = [];
		// 	result.Info.list.map(item => {
		// 		array.push({
		// 			id: item.game_id,
		// 			release: utils.right(item.game_rel_date, 4),
		// 			title: item.game_title,
		// 			image: item.img_src,
		// 			like: false,
		// 			fun: false,
		// 		});
		// 	});
		// 	yield put({
		// 		type: RES_SHOW_TASTE,
		// 		payload: {
		// 			list: array,
		// 		},
		// 	});
		// }
	} catch (e) {
		console.error(e);
	}
}

export function* resetPasswordApi(data) {
	const info = {
		email: data.email,
	};
	try {
		const result = yield call(authService.sendMail, info);

		if (result.Status === 'OK') {
			alert('이메일 초기화 메일 전송됨');
		} else {
			alert('이메일을 확인해주세요.');
		}
	} catch (e) {
		console.error(e);
	}
}

export function* settingPasswordApi(data) {
	const info = {
		password: data.password,
		token: data.token,
	};

	try {
		const result = yield call(authService.settingPass, info);

		if (result.Status === 'OK') {
			alert('비밀번호가 변경되었습니다.');
			yield put({
				type: START_LOADING,
			});
			yield put({
				type: CHANGE_MENU,
				payload: {
					menu: 'login',
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
export function* passApi(data) {
	try {
		const result = yield call(authService.insertPass, data);
		// console.log(result);
		if (result.Status === 'OK') {
			yield call(authService.passCount);
			// yield put({
			// 	type: REQ_PASS_COUNT,
			// 	payload: {
			// 		count: result.Info.pass_count,
			// 	},
			// });
		}
	} catch (e) {
		console.error(e);
	}
}

export function* passCountApi() {
	try {
		const result = yield call(authService.passCount);
		if (result.Status === 'OK') {
			yield put({
				type: RES_PASS_COUNT,
				payload: {
					count: result.Info.pass_count,
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

export function* watchEmailCheck() {
	while (true) {
		const { payload } = yield take(EMAIL_CHECK);
		yield call(emailCheckApi, payload);
	}
}
export function* watchReqLocalSignIn() {
	while (true) {
		const { payload } = yield take(REQ_LOCAL_SIGN_IN);
		yield call(reqLocalSignInApi, payload);
	}
}
export function* watchReqSocialSignIn() {
	while (true) {
		const { payload } = yield take(REQ_SOCIAL_SIGN_IN);
		yield call(reqSocialSignInApi, payload);
	}
}
export function* watchReqSignUp() {
	while (true) {
		const { payload } = yield take(REQ_SIGN_UP);
		yield call(reqSignUpApi, payload);
	}
}
export function* watchJoinTaste() {
	while (true) {
		const { payload } = yield take(JOIN_TASTE);
		yield call(joinTasteApi, payload);
	}
}
export function* watchUpdateNickname() {
	while (true) {
		const { payload } = yield take(UPDATE_NICK_NAME);
		yield call(updateNicknameApi, payload);
	}
}
export function* watchWithDrawal() {
	while (true) {
		const { payload } = yield take(WITH_DRAWAL);
		yield call(withDrawalApi, payload);
	}
}

export function* watchFindEmail() {
	while (true) {
		const { payload } = yield take(FIND_EMAIL);
		yield call(findEmailApi, payload);
	}
}

export function* watchSignOut() {
	while (true) {
		const { payload } = yield take(SIGN_OUT);
		yield call(signOutApi, payload);
	}
}

export function* watchReqShowTaste() {
	while (true) {
		yield take(REQ_SHOW_TASTE);
		yield call(reqShowTasteApi);
	}
}

export function* watchResetPassword() {
	while (true) {
		const { payload } = yield take(SEND_RESET_PASSWORD);
		yield call(resetPasswordApi, payload);
	}
}

export function* watchSettingPasswordApi() {
	while (true) {
		const { payload } = yield take(RESET_PASSWORD);
		yield call(settingPasswordApi, payload);
	}
}
export function* watchPassApi() {
	while (true) {
		const { payload } = yield take(REQ_PASS);
		yield call(passApi, payload);
	}
}
export function* watchPassCountApi() {
	while (true) {
		const { payload } = yield take(REQ_PASS_COUNT);
		yield call(passCountApi, payload);
	}
}

/** ******************************************************************************
 *  watch
 ******************************************************************************* */

export default function*() {
	yield fork(watchEmailCheck);
	yield fork(watchReqLocalSignIn);
	yield fork(watchReqSocialSignIn);
	yield fork(watchReqSignUp);
	yield fork(watchJoinTaste);
	yield fork(watchUpdateNickname);
	yield fork(watchWithDrawal);
	yield fork(watchFindEmail);
	yield fork(watchSignOut);
	yield fork(watchReqShowTaste);
	yield fork(watchResetPassword);
	yield fork(watchSettingPasswordApi);
	yield fork(watchPassApi);
	yield fork(watchPassCountApi);
}
