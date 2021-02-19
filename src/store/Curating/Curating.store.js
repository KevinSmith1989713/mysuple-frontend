import { createAction, handleActions } from 'redux-actions';

/* 게임 검색 */
export const REQ_SEARCH_GAME = 'REQ_SEARCH_GAME';
export const RES_SEARCH_GAME = 'RES_SEARCH_GAME';

// /* 메인 큐레이팅 */
// export const REQ_OTHER_CURATING = 'REQ_OTHER_CURATING';
// export const RES_OTHER_CURATING = 'RES_OTHER_CURATING';

export const REQ_CURATING_INSERT_GAME = 'curating/REQ_CURATING_INSERT_GAME';
export const RES_CURATING_INSERT_GAME = 'curating/RES_CURATING_INSERT_GAME';

const initialState = {
	searchResult: [],
	count: 0,
};

const Curating = handleActions(
	{
		[RES_SEARCH_GAME]: (state, action) => ({
			...state,
			searchResult: action.payload.searchResult,
			count: action.payload.count,
		}),
		[REQ_CURATING_INSERT_GAME]: (state, action) => {
			return {
				...state,
			};
		},
	},
	initialState,
);

export const reqSearchGame = createAction(REQ_SEARCH_GAME, keyword => ({
	keyword,
}));

export default Curating;
