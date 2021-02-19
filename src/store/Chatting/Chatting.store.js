import { createAction, handleActions } from 'redux-actions';

// 친구 리스트
export const REQ_FRIEND_LIST = 'chatting/REQ_FRIEND_LIST';
export const RES_FRIEND_LIST = 'chatting/RES_FRIEND_LIST';

//친구 검색
export const REQ_SEARCH_FRIEND = 'chatting/SEARCH_FRIEND';
export const RES_SEARCH_FRIEND = 'chatting/RES_SEARCH_FRIEND';

// 친구 유무
export const FRIEND_EXISTENCE = 'chatting/FRIEND_EXISTENCE';

//친구 추가
export const REQ_ADD_FRIEND = 'chatting/REQ_ADD_FRIEND';
export const RES_ADD_FRIEND = 'chatting/RES_ADD_FRIEND';

// 친구 목록 지우기
export const REMOVE_INFO = 'chatting/REMOVE_INFO';

const SELECT_USER = 'chatting/SELECT_USER';
const CHAT_MODAL = 'chatting/CHAT_MODAL';

const initialState = {
	searchFriendInfo: null,
	newFriendList: null,
	friendList: [],
	friendExistence: false,
	chatUserInfo: {},
	chatModalState: false,
};

const Chatting = handleActions(
	{
		[RES_FRIEND_LIST]: (state, action) => {
			return {
				...state,
				friendList: [...action.payload.friend],
			};
		},
		[RES_SEARCH_FRIEND]: (state, action) => {
			return {
				...state,
				searchFriendInfo: action.payload.friendName,
			};
		},
		[RES_ADD_FRIEND]: (state, action) => {
			return {
				...state,
				newFriendList: action.payload.friend,
			};
		},
		[FRIEND_EXISTENCE]: (state, action) => {
			return {
				...state,
				friendExistence: action.payload.boolean,
			};
		},
		[REMOVE_INFO]: state => {
			return {
				...state,
				searchFriendInfo: null,
				friendExistence: false,
			};
		},
		[SELECT_USER]: (state, action) => {
			return {
				...state,
				chatUserInfo: action.payload.info,
			};
		},
		[CHAT_MODAL]: (state, action) => {
			return {
				...state,
				chatModalState: action.payload.info,
			};
		},
	},
	initialState,
);
export const reqFriendList = createAction(REQ_FRIEND_LIST, () => {});

export const searchFriend = createAction(REQ_SEARCH_FRIEND, friendName => ({
	friendName,
}));

export const addFriend = createAction(REQ_ADD_FRIEND, friendName => ({
	friendName,
}));
export const removeInfo = createAction(REMOVE_INFO, () => {});

export const selectUserInfo = createAction(SELECT_USER, info => ({
	info,
}));
export const isChatModalState = createAction(CHAT_MODAL, info => ({
	info,
}));

export default Chatting;
