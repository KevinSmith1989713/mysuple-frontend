import { createAction, handleActions } from 'redux-actions';

export const FILTER_GAME = 'colleague/FILTER_GAME';
export const FILTER_GAME_ID = 'colleague/FILTER_GAME_ID';
export const FILTER_GAME_NAME = 'colleague/FILTER_GAME_NAME';

// 검색 게임 정보 가져오기
export const GAME_CHECK = 'colleague/GAME_CHECK';
export const GET_GAME = 'colleague/GET_GAME';

// 게임 선택
export const GAME_CHOICE = 'colleague/GAME_CHOICE';

// 빠른 매칭 만들기
export const MAKE_GAME = 'colleague/MAKE_GAME';

// 빠른 매칭 크루 만들기
export const MAKE_CREW_GAME = 'colleague/MAKE_CREW_GAME';

// 빠른 크루 리스트
export const RES_GET_FAST_CREW = 'RES_GET_FAST_CREW';
export const REQ_GET_FAST_CREW = 'REQ_GET_FAST_CREW';

// 크루 리스트
export const RES_GET_CREW = 'RES_GET_CREW';
export const REQ_GET_CREW = 'REQ_GET_CREW';

// 빠른 크루 검색
export const REQ_SEARCH_FAST_CREWLIST = 'REQ_SEARCH_FAST_CREWLIST';
export const RES_SEARCH_FAST_CREWLIST = 'RES_SEARCH_FAST_CREWLIST';

// 크루 검색
export const REQ_SEARCH_CREWLIST = 'REQ_SEARCH_CREWLIST';
export const RES_SEARCH_CREWLIST = 'RES_SEARCH_CREWLIST';

// 페이지네이션
export const ADD_COUNT = 'ADD_COUNT';

// 크루 디테일
export const CREW_STATE = 'CREW_STATE';

// 크루 업데이트 상태
export const CREW_MAKE_STATE = 'CREW_MAKE_STATE';

const initialState = {
	filteredList: [],
	gameId: [],
	selectGameName: [],
	expandList: [],
	gameNmae: '',
	gameInfo: {},
	gameChoice: false,
	fastCrewList: [],
	crewList: [],

	// 선택한 크루 상태
	crewInfo: {},
	crewState: false,
};

const colleague = handleActions(
	{
		[FILTER_GAME]: (state, action) => ({
			...state,
			filteredList: action.payload.info,
		}),
		[FILTER_GAME_ID]: (state, action) => ({
			...state,
			gameId: action.payload.info,
		}),
		[FILTER_GAME_NAME]: (state, action) => ({
			...state,
			selectGameName: action.payload.info,
		}),
		[GAME_CHECK]: (state, action) => ({
			...state,
			gameNmae: action.payload.gameName,
		}),
		[GET_GAME]: (state, action) => ({
			...state,
			gameInfo: action.payload.gameInfo,
		}),
		[GAME_CHOICE]: (state, action) => ({
			...state,
			gameChoice: action.payload.gameChoice,
		}),
		[RES_GET_FAST_CREW]: (state, action) => {
			// console.log([...state.crewList, ...action.payload.list]);
			return {
				...state,
				fastCrewList: [...action.payload.list],
			};
		},
		[RES_SEARCH_FAST_CREWLIST]: (state, action) => ({
			...state,
			fastCrewList: action.payload.list,
		}),
		[RES_GET_CREW]: (state, action) => {
			return {
				...state,
				crewList: [...action.payload.list],
			};
		},
		[RES_SEARCH_CREWLIST]: (state, action) => ({
			...state,
			crewList: action.payload.list,
		}),
		[CREW_STATE]: (state, action) => ({
			...state,
			crewInfo: action.payload.info,
		}),
		[CREW_MAKE_STATE]: (state, action) => ({
			...state,
			crewState: action.payload.state,
		}),
	},
	initialState,
);

export const filterGame = createAction(FILTER_GAME, info => ({
	info,
}));
export const getCrewInfo = createAction(CREW_STATE, info => ({
	info,
}));
export const filterGameID = createAction(FILTER_GAME_ID, info => ({
	info,
}));
export const isSelctGameName = createAction(FILTER_GAME_NAME, info => ({
	info,
}));

export const gameCheck = createAction(GAME_CHECK, gameName => ({
	gameName,
}));
export const choiceGame = createAction(GAME_CHOICE, gameChoice => ({
	gameChoice,
}));
export const makeGame = createAction(
	MAKE_GAME,
	(
		crew_title,
		email,
		open,
		type,
		game_id,
		gameTitle,
		gameTitleKr,
		link,
		game_class,
		league_id,
		auto_link,
	) => ({
		crew_title,
		email,
		open,
		type,
		game_id,
		gameTitle,
		gameTitleKr,
		link,
		game_class,
		league_id,
		auto_link,
	}),
);

export const makeCrewGame = createAction(
	MAKE_CREW_GAME,
	(
		crew_title,
		email,
		open,
		type,
		game_id,
		gameTitle,
		gameTitleKr,
		link,
		game_class,
		crew_tag,
		crew_desc,
		crewImg,
	) => ({
		crew_title,
		email,
		open,
		type,
		game_id,
		gameTitle,
		gameTitleKr,
		link,
		game_class,
		crew_tag,
		crew_desc,
		crewImg,
	}),
);

export const getFastCrewList = createAction(REQ_GET_FAST_CREW, count => ({
	count,
}));
export const getCrewList = createAction(REQ_GET_CREW, count => ({
	count,
}));
export const searchFastCrewList = createAction(
	REQ_SEARCH_FAST_CREWLIST,
	(text, game_id, count, search_tags) => ({
		text,
		game_id,
		count,
		search_tags,
	}),
);
export const searchCrewList = createAction(
	REQ_SEARCH_CREWLIST,
	(text, game_id, count, search_tags) => ({
		text,
		game_id,
		count,
		search_tags,
	}),
);

export default colleague;
