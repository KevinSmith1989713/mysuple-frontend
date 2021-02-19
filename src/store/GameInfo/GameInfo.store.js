/* 게임 정보 */
export const REQ_GAME_INFO = 'REQ_GAME_INFO';
export const RES_GAME_INFO = 'RES_GAME_INFO';
/* 게임 디테일 정보 */
export const REQ_GAME_DETAIL = 'REQ_GAME_DETAIL';
export const RES_GAME_DETAIL = 'RES_GAME_DETAIL';
/* 게임 가격 정보 */
export const REQ_GAME_PRICE = 'REQ_GAME_PRICE';
export const RES_GAME_PRICE = 'RES_GAME_PRICE';
/* 환율 정보 */
export const REQ_EXCHANGE_RATE = 'REQ_EXCHANGE_RATE';
export const RES_EXCHANGE_RATE = 'RES_EXCHANGE_RATE';
/* 게임 페이지네이션 */
export const UP_COUNT = 'UP_COUNT';
export const RESET_COUNT = 'RESET_COUNT';
export const INIT_COUNT = 'INIT_COUNT';
/* 좋아요 알람 설정 */
export const SELECT_LIKE_GAME = 'SELECT_LIKE_GAME';
export const SELECT_ALARM_GAME = 'SELECT_ALARM_GAME';
/* 현재 내 취향 업데이트 */
export const UPSERT_MY_TASTE = 'UPSERT_MY_TASTE';
/* 리뷰 작성 */
export const INSERT_REVIEW = 'INSERT_REVIEW';
/* 리뷰 업데이트 */
export const INSERT_REVIEW_UPDATE = 'INSERT_REVIEW_UPDATE';
/* 큐레이팅 제작 */
export const MAKE_CURATING = 'MAKE_CURATING';
/* 큐레이팅 게임 추가 */
export const INSERT_CURATING_GAME = 'INSERT_CURATING_GAME';
/* 큐레이팅 정보 */
export const REQ_CURATING = 'REQ_CURATING';
export const RES_CURATING = 'RES_CURATING';
/* 게임 검색 */
export const SEARCH_GAME = 'SEARCH_GAME';
export const INIT_ARRAY = 'INIT_ARRAY';

/* 환율(USDKWR) 검색 */
export const REQ_CURRENCY = 'REQ_CURRENCY';
export const RES_CURRENCY = 'RES_CURRENCY';
/* 통합 검색 */
export const REQ_ALL_SEARCH = 'REQ_ALL_SEARCH';
export const RES_ALL_SEARCH = 'RES_ALL_SEARCH';

export const INIT_IS_MORE = 'INIT_IS_MORE';

export const REPORT_REVIEW = 'REPORT_REVIEW';
export const SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD';
export const RESET_GAMEINFO = 'RESET_GAMEINFO';

export const MODAL_STATE = 'MODAL_STATE';

const initialState = {
	gameInfoList: [],
	gameInfo: {},
	gamePrice: {},
	exchangeRate: null,
	currency: null,
	count: 1,
	taste: [],
	curating: [],
	isSearch: false,
	searchText: '',
	searchTextWithGame: '',
	searchList: [],
	isMore: false,
	modalState: false,
};

let tasteList = [];

let array = [];

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		// case REQ_GAME_INFO:
		// 	return {
		// 		...state,
		// 		gameInfoList: [...state.gameInfoList],
		// 	};
		case RES_GAME_PRICE:
			return {
				...state,
				gamePrice: action.payload.gamePrice,
			};
		case RES_EXCHANGE_RATE:
			return {
				...state,
				exchangeRate: action.payload.gamePrice,
			};
		case RES_GAME_INFO:
			array = [];
			action.payload.list.map(item => {
				return array.push(item);
			});
			return {
				...state,
				gameInfoList: array,
			};
		case RES_GAME_DETAIL:
			return {
				...state,
				gameInfo: action.payload.info,
			};
		case UP_COUNT:
			return {
				...state,
				count: state.count + 1,
			};
		case RESET_COUNT:
			return {
				...state,
				count: 1,
			};
		case INSERT_CURATING_GAME:
			return {};
		case INIT_ARRAY:
			return {
				...state,
				gameInfoList: [],
			};
		case INIT_COUNT:
			return {
				...state,
				count: 1,
				isSearch: false,
				searchText: '',
				searchTextWithGame: '',
			};
		case SELECT_LIKE_GAME:
			let filterArray2 = [];
			if (tasteList.length > 0) {
				if (tasteList.find(item => item.id === action.payload.selected)) {
					filterArray2 = tasteList.map(item =>
						item.id === action.payload.selected
							? {
									...item,
									like: !item.like,
							  }
							: item,
					);
					tasteList = filterArray2;
				} else {
					tasteList.push({
						id: action.payload.selected,
						like: action.payload.like,
						alarm: action.payload.alarm,
					});
				}
			} else {
				tasteList.push({
					id: action.payload.selected,
					like: action.payload.like,
					alarm: action.payload.alarm,
				});
			}
			return {
				...state,
				taste: tasteList,
			};
		case SEARCH_GAME:
			return {
				...state,
				isSearch: true,
				searchText: action.payload.text,
				searchTextWithGame: action.payload.text,
			};
		case SELECT_ALARM_GAME:
			let filterArray = [];
			if (tasteList.length > 0) {
				if (tasteList.find(item => item.id === action.payload.selected)) {
					filterArray = tasteList.map(item =>
						item.id === action.payload.selected
							? {
									...item,
									alarm: !item.alarm,
							  }
							: item,
					);
					tasteList = filterArray;
				} else {
					tasteList.push({
						id: action.payload.selected,
						like: action.payload.like,
						alarm: action.payload.alarm,
					});
				}
			} else {
				tasteList.push({
					id: action.payload.selected,
					like: action.payload.like,
					alarm: action.payload.alarm,
				});
			}
			return {
				...state,
				taste: tasteList,
			};
		case RES_CURATING:
			return {
				...state,
				curating: action.payload.curating,
			};
		case RES_ALL_SEARCH:
			return {
				...state,
				searchList: {
					gameInfo: action.payload.list,
				},
			};
		case REQ_ALL_SEARCH:
			return {
				...state,
				isMore: true,
			};
		case INIT_IS_MORE:
			return {
				...state,
				isMore: false,
			};
		case RES_CURRENCY:
			return {
				...state,
				currency: action.payload.currency,
			};
		case SET_SEARCH_KEYWORD:
			return {
				...state,
				searchText: action.payload.keyword,
				searchTextWithGame: action.payload.keyword,
			};
		case RESET_GAMEINFO:
			return {
				...state,
				gameInfoList: null,
			};
		case MODAL_STATE:
			// console.log();
			return {
				...state,
				modalState: action.payload,
			};

		default:
			return state;
	}
}

export const reqGameInfo = count => ({
	type: REQ_GAME_INFO,
	payload: {
		count,
	},
});

export const reqGamePrice = (key, plain) => ({
	type: REQ_GAME_PRICE,
	payload: {
		key,
		plain,
	},
});

export const upCount = () => ({
	type: UP_COUNT,
});

export const resetCount = () => ({
	type: RESET_COUNT,
});

export const reqGameDetail = id => ({
	type: REQ_GAME_DETAIL,
	payload: {
		id,
	},
});

export const selectLikeGame = (selected, like, alarm) => ({
	type: SELECT_LIKE_GAME,
	payload: {
		selected,
		like,
		alarm,
	},
});

export const selectAlarmGame = (selected, like, alarm) => ({
	type: SELECT_ALARM_GAME,
	payload: {
		selected,
		like,
		alarm,
	},
});

export const upsertMyTaste = () => ({
	type: UPSERT_MY_TASTE,
});

export const initCount = () => ({
	type: INIT_COUNT,
});

export const resGamePriceInit = () => ({
	type: RES_GAME_PRICE,
	payload: {
		gamePrice: [],
	},
});

export const insertReview = (
	game_id,
	fun_score,
	complete_score,
	difficulty_score,
	operation_score,
	total_score,
	evaluation_content,
) => ({
	type: INSERT_REVIEW,
	payload: {
		game_id,
		fun_score,
		complete_score,
		difficulty_score,
		operation_score,
		total_score,
		evaluation_content,
	},
});

export const insertReviewUpdate = (
	review_id,
	fun_score,
	complete_score,
	difficulty_score,
	operation_score,
	total_score,
	evaluation_content,
) => ({
	type: INSERT_REVIEW_UPDATE,
	payload: {
		review_id,
		fun_score,
		complete_score,
		difficulty_score,
		operation_score,
		total_score,
		evaluation_content,
	},
});

export const makeCurating = (curating_name, curating_tag) => ({
	type: MAKE_CURATING,
	payload: {
		curating_name,
		curating_tag,
	},
});

export const insertCurating = (curating_name, curating_tag) => ({
	type: MAKE_CURATING,
	payload: {
		curating_name,
		curating_tag,
	},
});

export const searchGame = text => ({
	type: SEARCH_GAME,
	payload: {
		text,
	},
});

export const reqCurating = () => ({
	type: REQ_CURATING,
});

export const reqAllSearch = text => ({
	type: REQ_ALL_SEARCH,
	payload: {
		text,
	},
});

export const initIsMore = () => ({
	type: INIT_IS_MORE,
});

export const reportReview = (
	review_id,
	review_report_type,
	review_report_content,
) => ({
	type: REPORT_REVIEW,
	payload: {
		review_id,
		review_report_type,
		review_report_content,
	},
});

export const reqCurrency = () => ({
	type: REQ_CURRENCY,
});

export const setSearchKeyword = keyword => ({
	type: SET_SEARCH_KEYWORD,
	payload: {
		keyword,
	},
});

export const isModalState = info => ({
	type: MODAL_STATE,
	payload: {
		info,
	},
});
