export const CHANGE_MENU = 'CHANGE_MENU';
export const CHANGE_CHATNAV = 'CHANGE_CHATNAV';
export const CHANGE_WINDOW = 'CHANGE_WINDOW';
export const CHANGE_JOIN_SUB_MENU = 'CHANGE_JOIN_SUB_MENU';

export const SELECT_WITH_GAME = 'SELECT_WITH_GAME';
export const SELECT_WHAT_GAME = 'SELECT_WHAT_GAME';

export const USER_TASTE = 'USER_TASTE';
export const USER_TYPE_TASTE = 'USER_TYPE_TASTE';

export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const CHANGE_SUCCESS = 'CHANGE_SUCCESS';

export const CHANGE_PROFILE_SUB_MENU = 'CHANGE_PROFILE_SUB_MENU';
// 성공 상태
export const SUCCESS_STATE = 'Manage/SUCCESS_STATE';
// 거정 상태
export const REJECT_STATE = 'Manage/REJECT_STATE';

const initialState = {
	chatNav: 'friends',
	menu: 'home',
	joinSubMenu: 'first',
	profileSubMenu: 'account',
	windowSize: '',
	userTaste: { single: '0', multi: '0', pc: '0', mobile: '0', console1: '0' },
	userTypeTaste: {
		shooting: '0',
		sports: '0',
		horror: '0',
		gore: '0',
		daily: '0',
		music: '0',
		racing: '0',
		strategy: '0',
		adventure: '0',
		rpg: '0',
		love: '0',
		puzzle: '0',
		fantasy: '0',
		movie: '0',
		casual: '0',
		survival: '0',
		vr: '0',
		indie: '0',
		action: '0',
		fight: '0',
		violence: '0',
		simulation: '0',
		moba: '0',
		ps: '0',
		nin: '0',
		xbox: '0',
	},
	isHamburgur: false,
	isSearch: false,
	choiceGameCnt: false,
	isLoading: false,
	isSuccess: false,
	successState: false,
	rejectState: false,
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case CHANGE_MENU:
			return {
				...state,
				menu: action.payload.menu,
			};
		case CHANGE_CHATNAV:
			return {
				...state,
				chatNav: action.payload.chatNav,
			};
		case CHANGE_WINDOW:
			return {
				...state,
				windowSize: action.payload.windowSize,
			};
		case CHANGE_JOIN_SUB_MENU:
			return {
				...state,
				joinSubMenu: action.payload.menu,
			};
		case USER_TASTE:
			return {
				...state,
				userTaste: {
					...state.userTaste,
					[action.payload.type]: action.payload.value,
				},
			};
		case USER_TYPE_TASTE:
			return {
				...state,
				userTypeTaste: {
					...state.userTypeTaste,
					[action.payload.type]: action.payload.value,
				},
			};

		case START_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case END_LOADING:
			return {
				...state,
				isLoading: false,
			};
		case CHANGE_SUCCESS:
			return {
				...state,
				isSuccess: action.payload.result,
			};
		case CHANGE_PROFILE_SUB_MENU:
			return {
				...state,
				profileSubMenu: action.payload.menu,
			};
		case SUCCESS_STATE:
			return {
				...state,
				successState: action.payload.state,
			};
		case REJECT_STATE:
			return {
				...state,
				rejectState: action.payload.state,
			};

		default:
			return state;
	}
}

export const startLoading = () => ({
	type: START_LOADING,
});

export const endLoading = () => ({
	type: END_LOADING,
});

export const changeMenu = menu => ({
	type: CHANGE_MENU,
	payload: { menu },
});

export const changeChatNav = chatNav => ({
	type: CHANGE_CHATNAV,
	payload: { chatNav },
});

export const changeWindow = windowSize => ({
	type: CHANGE_WINDOW,
	payload: { windowSize },
});

export const changeJoinSubMenu = menu => ({
	type: CHANGE_JOIN_SUB_MENU,
	payload: { menu },
});

export const selectQuestion = (type, value) => ({
	type: USER_TASTE,
	payload: {
		type,
		value,
	},
});

export const selectTypeQuestion = (type, value) => ({
	type: USER_TYPE_TASTE,
	payload: {
		type,
		value,
	},
});

export const changeSuccess = result => ({
	type: CHANGE_SUCCESS,
	payload: {
		result,
	},
});

export const showHamburgur = isHamburgur => ({
	type: SHOW_HAMBURGUR,
	payload: {
		isHamburgur,
	},
});

export const changeProfileSubMenu = menu => ({
	type: CHANGE_PROFILE_SUB_MENU,
	payload: {
		menu,
	},
});
