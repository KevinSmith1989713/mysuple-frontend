export const REQ_INQUIRY = 'REQ_INQUIRY';
export const RES_INQUIRY = 'RES_INQUIRY';

export const REQ_GET_MY_GAME = 'REQ_GET_MY_GAME';
export const RES_GET_MY_GAME = 'RES_GET_MY_GAME';

export const PROFILE_UPDATE = 'REQ_PROFILE_UPDATE';

export const REQ_GET_MY_CURATING = 'REQ_GET_MY_CURATING';
export const RES_GET_MY_CURATING = 'RES_GET_MY_CURATING';

// 내가 쓴 글,댓글 리스트
export const REQ_MY_CONTANTS_LIST = 'MY_CONTANTS_LIST';
export const RES_MY_CONTANTS_LIST = 'MY_CONTANTS_LIST';

// 내가 쓴 글,댓글 삭제
export const MY_CONTANTS_DELETE = 'MY_CONTANTS_DELETE';

// 나의 리그 질문 가져오기
export const REQ_MY_LEAGUE_QUESTION = 'MY_LEAGUE_QUESTION';
export const RES_MY_LEAGUE_QUESTION = 'MY_LEAGUE_QUESTION';

// 나의 리그 질문 수정
export const REQ_MY_LEAGUE_QUESTION_REVISE = 'MY_LEAGUE_QUESTION_REVISE';
// 나의 리그 팀 수정
export const REQ_MY_LEAGUE_TEAM_REVISE = 'MY_LEAGUE_TEAM_REVISE';

export const SELECT_COMMUNITY = 'SELECT_COMMUNITY';

const initialState = {
	myGameList: [],
	myCuratingList: [],
	myContantsList: [],
	myLeagueQuestion: [],
	communityNum: '',
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case REQ_INQUIRY:
			return {
				...state,
			};
		case RES_GET_MY_GAME:
			// console.log(action.payload);
			return {
				...state,
				myGameList: action.payload.list,
			};
		case PROFILE_UPDATE:
			return {
				...state,
			};
		case RES_GET_MY_CURATING:
			return {
				...state,
				myCuratingList: action.payload.list,
			};
		case RES_MY_CONTANTS_LIST:
			return {
				...state,
				myContantsList: action.payload && action.payload.list,
			};
		case RES_MY_LEAGUE_QUESTION:
			return {
				...state,
				myLeagueQuestion: action.payload.list,
			};
		case SELECT_COMMUNITY:
			return {
				...state,
				communityNum: action.payload.info,
			};
		default:
			return state;
	}
}

export const reqInquiry = (category, title, content, file) => ({
	type: REQ_INQUIRY,
	payload: {
		category,
		title,
		content,
		file,
	},
});

export const reqGetMyGame = () => ({
	type: REQ_GET_MY_GAME,
});

export const reqProfileUpdate = (file, newNickname, desc) => ({
	type: PROFILE_UPDATE,
	payload: {
		file,
		newNickname,
		desc,
	},
});

export const reqGetMyCurating = () => ({
	type: REQ_GET_MY_CURATING,
});

export const reqMyContantsList = () => ({
	type: REQ_MY_CONTANTS_LIST,
});
export const deleteMyContents = crew_id => ({
	type: MY_CONTANTS_DELETE,
	payload: {
		crew_id,
	},
});
export const getMyLeagueQuestion = (id, league_id) => ({
	type: REQ_MY_LEAGUE_QUESTION,
	payload: {
		id,
		league_id,
	},
});
export const reviseMyLeagueQuestion = (id, league_id, update_answer) => ({
	type: REQ_MY_LEAGUE_QUESTION_REVISE,
	payload: {
		id,
		league_id,
		update_answer,
	},
});
export const reviseMyLeagueTeam = (id, league_id, team_id, new_team_id) => ({
	type: REQ_MY_LEAGUE_TEAM_REVISE,
	payload: {
		id,
		league_id,
		team_id,
		new_team_id,
	},
});
export const selectCommunyNum = info => ({
	type: SELECT_COMMUNITY,
	payload: {
		info,
	},
});
