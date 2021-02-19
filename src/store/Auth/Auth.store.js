import { createAction, handleActions } from 'redux-actions';

// 동의 확인
export const AGREE_TERM = 'auth/AGREE_TERM';
// 이메일 체크
export const EMAIL_CHECK = 'auth/EMAIL_CHECK';
// 로컬 로그인
export const REQ_LOCAL_SIGN_IN = 'auth/REQ_LOCAL_SIGN_IN';
// 소셜 로그인
export const REQ_SOCIAL_SIGN_IN = 'auth/REQ_SOCIAL_SIGN_IN';
// 로그인 정보값 받기
export const RES_SIGN_IN = 'auth/RES_SIGN_IN';
//로컬 회원 가입
export const REQ_SIGN_UP = 'auth/REQ_SIGN_UP';
export const RES_SIGN_UP = 'auth/RES_SIGN_UP';
// 취향 선택
export const JOIN_TASTE = 'auth/JOIN_TASTE';
// 좋아요 선택
export const SELECT_LIKE = 'auth/SELECT_LIKE';
// 닉네임 뱐걍
export const UPDATE_NICK_NAME = 'auth/UPDATE_NICK_NAME';

// 회원 탈퇴
export const WITH_DRAWAL = 'auth/WITH_DRAWAL';
// 이메일 찾기
export const FIND_EMAIL = 'auth/FIND_EMAIL';
// 유저 정보 업데이트
export const UPDATE_USER_INFO = 'auth/UPDATE_USER_INFO';
// 유저 로그아웃
export const SIGN_OUT = 'auth/SIGN_OUT';
// 회원가입 취향 리스트 불러오기
export const REQ_SHOW_TASTE = 'auth/REQ_SHOW_TASTE';
export const RES_SHOW_TASTE = 'auth/RES_SHOW_TASTE';
// 아바타, 닉네임 수정
export const UPDATE_PROFILE = 'auth/UPDATE_PROFILE';
// 비밀번호 초기화 이메일 보내기
export const SEND_RESET_PASSWORD = 'auth/SEND_RESET_PASSWORD';
// 비밀번호 초기화
export const RESET_PASSWORD = 'auth/RESET_PASSWORD';
//문자 인증
export const GET_SUCCESS_KEY = 'GET_SUCCESS_KEY';
// 패스 충전 ,소비
export const REQ_PASS = 'auth/REQ_PASS';
export const RES_PASS = 'auth/RES_PASS';
// 패스 수량
export const REQ_PASS_COUNT = 'auth/REQ_PASS_COUNT';
export const RES_PASS_COUNT = 'auth/RES_PASS_COUNT';

const REPORT_MODAL = 'REPORT_MODAL';

const initialState = {
	termObj: {},
	userInfo: {},
	tasteList: [],
	sessionKey: '',
	like: '',
	successKey: '',
	passCount: 0,
	reportModalState: false,
};

const auth = handleActions(
	{
		[AGREE_TERM]: (state, action) => ({
			...state,
			termObj: action.payload.info,
		}),
		[RES_SIGN_IN]: (state, action) => ({
			...state,
			userInfo: {
				email: action.payload.email,
				nickName: action.payload.nickName,
				joinDate: action.payload.joinDate,
				sessionKey: action.payload.sessionKey,
				avatarUrl: action.payload.avatarUrl,
				compensation: action.payload.compensation,
			},
			sessionKey: action.payload.sessionKey,
		}),
		[EMAIL_CHECK]: (state, action) => ({
			...state,
			userInfo: {
				...state.userInfo,
				email: action.payload.email,
				name: action.payload.name,
				avatar_url: action.payload.avatar_url,
			},
		}),
		[RES_SIGN_UP]: (state, action) => ({
			...state,
			userInfo: {
				email: action.payload.email,
				nickName: action.payload.nickName,
				joinDate: action.payload.joinDate,
			},
		}),
		[UPDATE_USER_INFO]: (state, action) => ({
			...state,
			userInfo: action.payload.info,
		}),
		[UPDATE_PROFILE]: (state, action) => ({
			...state,
			userInfo: {
				...state.userInfo,
				nickName: !!action.payload.nickName
					? action.payload.nickName
					: state.userInfo.nickName,
				avatarUrl: !!action.payload.avatarUrl
					? action.payload.avatarUrl
					: state.userInfo.avatarUrl,
			},
		}),
		[SIGN_OUT]: state => ({ ...state, userInfo: {}, sessionKey: '' }),
		[RES_SHOW_TASTE]: (state, signUpaction) => ({
			...state,
			tasteList: action.payload.list,
		}),
		[SELECT_LIKE]: (state, action) => ({
			...state,
			like: action.payload.game,
		}),
		[GET_SUCCESS_KEY]: (state, action) => ({
			...state,
			sessionKey: action.payload.info,
		}),
		[RES_PASS_COUNT]: (state, action) => {
			return {
				...state,
				passCount: action.payload.count,
			};
		},
		[REPORT_MODAL]: (state, action) => {
			return {
				...state,
				reportModalState: action.payload.info,
			};
		},
	},
	initialState,
);

export const agreeTerm = createAction(AGREE_TERM, info => ({
	info,
}));

export const emailCheck = createAction(
	EMAIL_CHECK,
	(email, type, name, avatar_url) => ({
		email,
		type,
		name,
		avatar_url,
	}),
);

export const reqLocalSignIn = createAction(
	REQ_LOCAL_SIGN_IN,
	(email, password, platform) => ({ email, password, platform }),
);

export const reqSocialSignIn = createAction(
	REQ_SOCIAL_SIGN_IN,
	(email, platform, name, avatar_url) => ({
		email,
		platform,
		name,
		avatar_url,
	}),
);

export const signUp = createAction(
	REQ_SIGN_UP,
	(
		email,
		name,
		nickname,
		password,
		phone,
		passwd_q,
		passwd_a,
		gender,
		birth,
		marketing_consent,
		permanent_member,
		avatar_url,
		platform,
		age,
	) => ({
		email,
		name,
		nickname,
		password,
		phone,
		passwd_q,
		passwd_a,
		gender,
		birth,
		marketing_consent,
		permanent_member,
		avatar_url,
		platform,
		age,
	}),
);

export const showJoinTaste = createAction(
	JOIN_TASTE,
	(
		single,
		multi,
		pc,
		mobile,
		console1,
		shooting,
		sports,
		horror,
		gore,
		daily,
		music,
		racing,
		strategy,
		adventure,
		rpg,
		love,
		puzzle,
		fantasy,
		movie,
		casual,
		survival,
		vr,
		indie,
		action,
		fight,
		violence,
		simulation,
		moba,
		ps,
		nin,
		xbox,
	) => ({
		single,
		multi,
		pc,
		mobile,
		console1,
		shooting,
		sports,
		horror,
		gore,
		daily,
		music,
		racing,
		strategy,
		adventure,
		rpg,
		love,
		puzzle,
		fantasy,
		movie,
		casual,
		survival,
		vr,
		indie,
		action,
		fight,
		violence,
		simulation,
		moba,
		ps,
		nin,
		xbox,
	}),
);

export const updateNickname = createAction(UPDATE_NICK_NAME, newNickname => ({
	newNickname,
}));

export const withDrawal = createAction(WITH_DRAWAL);

export const findEmail = createAction(FIND_EMAIL, (name, telNumber) => ({
	name,
	telNumber,
}));

export const signOut = createAction(SIGN_OUT);

export const reqShowTaste = createAction(REQ_SHOW_TASTE);

export const sendResetPassword = createAction(SEND_RESET_PASSWORD, email => ({
	email,
}));

export const resetPassword = createAction(
	RESET_PASSWORD,
	(password, token) => ({
		password,
		token,
	}),
);
export const putLikeGame = createAction(SELECT_LIKE, game => ({
	game,
}));

export const getSuccessKey = createAction(GET_SUCCESS_KEY, info => ({
	info,
}));

export const getPassCount = createAction(REQ_PASS_COUNT);

export const insertPass = createAction(
	REQ_PASS,
	(id, type, refer_id, account, desc) => ({
		id,
		type,
		refer_id,
		account,
		desc,
	}),
);
export const isReportModalState = createAction(REPORT_MODAL, info => ({
	info,
}));

export default auth;
