import { createAction, handleActions } from 'redux-actions';

// 리그 검색
export const REQ_SEARCH_LEAGUE = 'League/REQ_SEARCH_LEAGUE';
export const RES_SEARCH_LEAGUE = 'League/RES_SEARCH_LEAGUE';
const FILTER_LEAGUE_TYPE = 'League/FILTER_LEAGUE_TYPE';
const FILTER_LEAGUE_STATE = 'League/FILTER_LEAGUE_STATE';
const FILTER_LEAGUE_BANLIST = 'League/FILTER_LEAGUE_BANLIST';

// step 1 정보
const LEAGUE_STEP1_INFO = 'League/LEAGUE_STEP1_INFO';
// step2 banList
export const LEAGUE_STEP2_BANLIST = 'League/LEAGUE_STEP2_BANLIST';
// step2 tier 정보 가져오기
const GET_TIER_INFO = 'League/GET_TIER_INFO';
// step2 Question
export const LEAGUE_STEP2_QUESTION = 'League/LEAGUE_STEP2_QUESTION';
// step2 List
const LEAGUE_STEP2_TAGLIST = 'League/LEAGUE_STEP2_TAGLIST';
// 리그 만들기
export const REQ_MAKE_LEAGUE = 'League/REQ_MAKE_LEAGUE';
export const RES_MAKE_LEAGUE = 'League/RES_MAKE_LEAGUE';
// 리그 업데이트
export const UPDATE_LEAGUE = 'League/UPDATE_LEAGUE';
// 리그 생성 상태
export const REQ_MAKE_LEAGUE_STATE = 'League/REQ_MAKE_LEAGUE_STATE';
export const RES_MAKE_LEAGUE_STATE = 'League/RES_MAKE_LEAGUE_STATE';
// 임시 저장 상태
export const SELECT_TEMPORARY_STATE = 'League/REQ_SELECT_TEMPORARY_STATE';
export const RES_SELECT_TEMPORARY_STATE = 'League/RES_SELECT_TEMPORARY_STATE';
// 리그 상세페이지
export const REQ_SELECT_INFO = 'League/REQ_SELECT_INFO';
export const RES_SELECT_INFO = 'League/RES_SELECT_INFO';
// 리그 만들때 기존 정보 삭제
const DELETE_LEAGUE_INFO = 'League/DELETE_LEAGUE_INFO';
// 임시저장
export const REQ_MAKE_TEMPORARY_LEAGUE = 'League/REQ_MAKE_TEMPORARY_LEAGUE';
export const RES_MAKE_TEMPORARY_LEAGUE = 'League/RES_MAKE_TEMPORARY_LEAGUE';
// 임시저장 모달
const TEMPORARY_MODAL = 'League/TEMPORARY_MODAL';
// 임시저장 목록
export const REQ_LEAGUE_TEMPORARY_LIST = 'League/REQ_LEAGUE_TEMPORARY_LIST';
export const RES_LEAGUE_TEMPORARY_LIST = 'League/RES_LEAGUE_TEMPORARY_LIST';
// 임시저장 선택
export const REQ_LEAGUE_TEMPORARY_SELECT = 'League/REQ_LEAGUE_TEMPORARY_SELECT';
export const RES_LEAGUE_TEMPORARY_SELECT = 'League/RES_LEAGUE_TEMPORARY_SELECT';
// 임시저장 삭제
export const LEAGUE_TEMPORARY_DELETE = 'League/LEAGUE_TEMPORARY_DELETE';
// 리그 참가하기
export const JOIN_LEAGUE = 'League/JOIN_LEAGUE';
// 리그 참가 취소
export const JOIN_LEAGUE_CANCEL = 'League/JOIN_LEAGUE_CANCEL';
// 리그 참가 상태
export const JOIN_LEAGUE_STATE = 'League/JOIN_LEAGUE_STATE';
// 리그 팀전 생성
export const REQ_MAKE_LEAGUE_TEAM = 'League/REQ_MAKE_LEAGUE_TEAM';
//리그 팀전 리스트
export const REQ_LEAGUE_TEAM_LIST = 'League/REQ_LEAGUE_TEAM_LIST';
export const RES_LEAGUE_TEAM_LIST = 'League/RES_LEAGUE_TEAM_LIST';
// 참가리그
export const REQ_PARTICIPAT_LEAGUE = 'League/REQ_PARTICIPAT_LEAGUE';
export const RES_PARTICIPAT_LEAGUE = 'League/RES_PARTICIPAT_LEAGUE';
// 주최리그
export const REQ_HOST_LEAGUE = 'League/REQ_HOST_LEAGUE';
export const RES_HOST_LEAGUE = 'League/RES_HOST_LEAGUE';
// 댓글 쓰기
export const REQ_WRITE_LEAGUE_COMMENTS = 'League/REQ_WRITE_LEAGUE_COMMENTS';
// 댓글 수정
export const LEAGUE_COMMENTS_UPDATE = 'League/LEAGUE_COMMENTS_UPDATE';
// 댓글 삭제
export const LEAGUE_COMMENTS_DELETE = 'League/LEAGUE_COMMENTS_DELETE';
// 댓글 리스트
export const REQ_LEAGUE_COMMENTS_LIST = 'League/REQ_LEAGUE_COMMENTS_LIST';
export const RES_LEAGUE_COMMENTS_LIST = 'League/RES_LEAGUE_COMMENTS_LIST';
// 팀원 모집
export const REQ_LEAGUE_RECRUIT_TEAM = 'League/REQ_LEAGUE_RECRUIT_TEAM';
export const RES_LEAGUE_RECRUIT_TEAM = 'League/RES_LEAGUE_RECRUIT_TEAM';
// 상세페이지 참가자
export const REQ_LEAGUE_PARTICIPANTS = 'League/REQ_LEAGUE_PARTICIPANTS';
export const RES_LEAGUE_PARTICIPANTS = 'League/RES_LEAGUE_PARTICIPANTS';

export const LEAGUE_FILTER = 'League/LEAGUE_FILTER';

const EXTRA_RESET = 'League/EXTRA_RESET';

const today = `${new Date().getFullYear()}-${new Date().getMonth() +
	1}-${new Date().getDate()}T12:00:00`;

const initialState = {
	leagueList: [],
	insertLeagueInfo: {
		waiting_people: 0,
		limit_people: 0,
		member_count: 0,
		league_type: 0,
		apply_start: today,
		apply_end: today,
		start_date: today,
		auto_join: '1',
	},
	banList: {
		age: '',
		score: '',
		manualKey: '',
		manualValue: '',
	},
	questionList: {},
	tagList: [],
	temporayModal: false,
	// 리그 생성 상태
	leagueMakeState: false,
	leagueMakeStateId: null,
	// 상세 페이지 정보
	leagueSelectInfo: {},
	// 참가리그
	participatList: [],
	// 주최리그
	hostLeagueList: [],
	leagueFilterGameList: [],
	//리그 팀 생성
	leagueTeamListRedux: [],
	// 임시 저장 리스트
	leagueTemporaryList: [],
	// 임시 저장 상태
	leagueTemporaryState: false,
	leagueTemporaryId: null,
	// 댓글 리스트
	leagueCommentsList: [],
	// 리그 참가 상태
	leagueJoinState: false,
	// 상세페이지 팀원모집 리스트
	leagueRecruitList: [],
	// 상세페이지 참가자 리시트
	leagueParticipantsList: [],
	// 리그 필터 타입
	leagueFilterType: [],
	// 리그 필터 상태
	leagueFilterState: [],
	// 리그 필터 제한
	leagueFilterBanList: {},
	// 추가 대진표 리스트
	extraList: [],
	selectParticipatList: [],
};

const Administer = handleActions(
	{
		[RES_SEARCH_LEAGUE]: (state, action) => {
			return {
				...state,
				leagueList: action.payload.list,
			};
		},
		[FILTER_LEAGUE_TYPE]: (state, action) => {
			return {
				...state,
				leagueFilterType: action.payload.info,
			};
		},
		[FILTER_LEAGUE_STATE]: (state, action) => {
			return {
				...state,
				leagueFilterState: action.payload.info,
			};
		},
		[FILTER_LEAGUE_BANLIST]: (state, action) => {
			return {
				...state,
				leagueFilterBanList: {
					...state.leagueFilterBanList,
					...action.payload.info,
				},
			};
		},
		[LEAGUE_STEP1_INFO]: (state, action) => {
			return {
				...state,
				insertLeagueInfo: { ...state.insertLeagueInfo, ...action.payload },
			};
		},
		[LEAGUE_STEP2_BANLIST]: (state, action) => {
			return {
				...state,
				insertLeagueInfo: { ...state.insertLeagueInfo, ...action.payload },
			};
		},
		[GET_TIER_INFO]: (state, action) => {
			return {
				...state,
				insertLeagueInfo: {
					...state.insertLeagueInfo,
					tier: action.payload.info,
				},
				// insertLeagueInfo: {
				// 	...state.insertLeagueInfo,
				// 	ban: { tier: action.payload.info },
				// },
			};
		},
		[LEAGUE_STEP2_QUESTION]: (state, action) => {
			// console.log(action.payload);
			return {
				...state,
				questionList: action.payload.info,
			};
		},
		[LEAGUE_STEP2_TAGLIST]: (state, action) => {
			// console.log(action.payload);
			return {
				...state,
				tagList: action.payload,
			};
		},
		[TEMPORARY_MODAL]: (state, action) => {
			return {
				...state,
				temporayModal: action.payload.boolean,
			};
		},
		[RES_LEAGUE_TEMPORARY_LIST]: (state, action) => {
			return {
				...state,
				leagueTemporaryList: action.payload.list,
			};
		},
		[RES_LEAGUE_TEMPORARY_SELECT]: (state, action) => {
			return {
				...state,
				insertLeagueInfo: action.payload.list,
			};
		},
		[SELECT_TEMPORARY_STATE]: (state, action) => {
			return {
				...state,
				leagueTemporaryState: action.payload.boolean,
			};
		},

		[REQ_MAKE_LEAGUE_STATE]: (state, action) => {
			return {
				...state,
				leagueMakeState: action.payload.boolean,
			};
		},

		[RES_MAKE_LEAGUE_STATE]: (state, action) => {
			return {
				...state,
				leagueMakeStateId: action.payload.number,
			};
		},
		[RES_SELECT_INFO]: (state, action) => {
			return {
				...state,
				insertLeagueInfo: action.payload.info,
			};
		},
		[RES_PARTICIPAT_LEAGUE]: (state, action) => {
			return {
				...state,
				participatList: action.payload.list,
			};
		},
		[RES_HOST_LEAGUE]: (state, action) => {
			return {
				...state,
				hostLeagueList: action.payload.list,
			};
		},
		[LEAGUE_FILTER]: (state, action) => ({
			...state,
			leagueFilterGameList: action.payload.info,
		}),
		[RES_LEAGUE_TEAM_LIST]: (state, action) => {
			return {
				...state,
				leagueTeamListRedux: action.payload.list,
			};
		},
		[DELETE_LEAGUE_INFO]: state => ({
			...state,
			insertLeagueInfo: {
				waiting_people: 0,
				limit_people: 0,
				member_count: 0,
				league_type: 0,
				apply_start: today,
				apply_end: today,
				start_date: today,
				auto_join: '1',
			},
		}),
		[RES_LEAGUE_COMMENTS_LIST]: (state, action) => {
			return {
				...state,
				leagueCommentsList: action.payload.list.reverse(),
			};
		},
		[JOIN_LEAGUE_STATE]: (state, action) => {
			return {
				...state,
				leagueJoinState: action.payload.boolean,
			};
		},
		[RES_LEAGUE_RECRUIT_TEAM]: (state, action) => {
			return {
				...state,
				leagueRecruitList: action.payload.list,
			};
		},
		[RES_LEAGUE_PARTICIPANTS]: (state, action) => {
			return {
				...state,
				leagueParticipantsList: action.payload.list,
			};
		},
		[EXTRA_RESET]: (state, action) => {
			return {
				...state,
				extraList: [],
			};
		},
	},
	initialState,
);
export const searchLeague = createAction(
	REQ_SEARCH_LEAGUE,
	(count, league_type, game_id, text, join_pass, date_tag, ban) => ({
		count,
		league_type,
		game_id,
		text,
		join_pass,
		date_tag,
		ban,
	}),
);
export const getLeagueType = createAction(FILTER_LEAGUE_TYPE, info => ({
	info,
}));
export const getLeagueState = createAction(FILTER_LEAGUE_STATE, info => ({
	info,
}));
export const getLeagueBanList = createAction(FILTER_LEAGUE_BANLIST, info => ({
	info,
}));
export const getStep1Info = createAction(
	LEAGUE_STEP1_INFO,
	(
		league_title,
		game_id,
		game_class,
		game_title,
		game_title_kr,
		league_type,
		auto_join,
		outsourcing,
		limit_people,
		member_count,
		waiting_people,
		league_main_img,
		league_sub_img,
		apply_start,
		apply_end,
		start_date,
		desc,
		img_src,
		game_name,
		fromHours,
		byHours,
		startHours,
		singleCount,
		teamCount,
		teamPeopleCount,
	) => ({
		league_title,
		game_id,
		game_class,
		game_title,
		game_title_kr,
		league_type,
		auto_join,
		outsourcing,
		limit_people,
		member_count,
		waiting_people,
		league_main_img,
		league_sub_img,
		apply_start,
		apply_end,
		start_date,
		desc,
		img_src,
		game_name,
		fromHours,
		byHours,
		startHours,
		singleCount,
		teamCount,
		teamPeopleCount,
	}),
);

export const getBanList = createAction(LEAGUE_STEP2_BANLIST, ban => ({
	ban,
}));

export const getQuestion = createAction(LEAGUE_STEP2_QUESTION, info => ({
	info,
}));

export const makeLeague = createAction(
	REQ_MAKE_LEAGUE,
	(
		league_title,
		game_id,
		game_title,
		game_title_kr,
		league_type,
		auto_join,
		outsourcing,
		limit_people,
		member_count,
		waiting_people,
		league_main_img,
		league_sub_img,
		apply_start,
		apply_end,
		start_date,
		desc,
		banList,
		questionList,
		join_pass,
		sponsor_pass,
		reward_ratio,
	) => ({
		league_title,
		game_id,
		game_title,
		game_title_kr,
		league_type,
		auto_join,
		outsourcing,
		limit_people,
		member_count,
		waiting_people,
		league_main_img,
		league_sub_img,
		apply_start,
		apply_end,
		start_date,
		desc,
		banList,
		questionList,
		join_pass,
		sponsor_pass,
		reward_ratio,
	}),
);
export const makeTemporaryLeague = createAction(
	REQ_MAKE_TEMPORARY_LEAGUE,
	(
		league_title,
		game_id,
		game_title,
		game_title_kr,
		league_type,
		auto_join,
		outsourcing,
		limit_people,
		member_count,
		waiting_people,
		league_main_img,
		league_sub_img,
		apply_start,
		apply_end,
		start_date,
		desc,
		banList,
		questionList,
		join_pass,
		sponsor_pass,
		reward_ratio,
	) => ({
		league_title,
		game_id,
		game_title,
		game_title_kr,
		league_type,
		auto_join,
		outsourcing,
		limit_people,
		member_count,
		waiting_people,
		league_main_img,
		league_sub_img,
		apply_start,
		apply_end,
		start_date,
		desc,
		banList,
		questionList,
		join_pass,
		sponsor_pass,
		reward_ratio,
	}),
);
export const updateLeague = createAction(
	UPDATE_LEAGUE,
	(id, league_id, league_main_img, desc) => ({
		id,
		league_id,
		league_main_img,
		desc,
	}),
);
export const getTagList = createAction(
	LEAGUE_STEP2_TAGLIST,
	(ban, question) => ({ ban, question }),
);
export const openTemporaryModal = createAction(TEMPORARY_MODAL, boolean => ({
	boolean,
}));
export const getLeagueTemporaryList = createAction(REQ_LEAGUE_TEMPORARY_LIST);
export const selectLeagueTemporary = createAction(
	REQ_LEAGUE_TEMPORARY_SELECT,
	info => ({
		info,
	}),
);

export const getSelectLeagueInfo = createAction(REQ_SELECT_INFO, leagueId => ({
	leagueId,
}));

export const joinLeague = createAction(
	JOIN_LEAGUE,
	(id, leagueId, teamId, answer) => ({
		id,
		leagueId,
		teamId,
		answer,
	}),
);
export const joinLeagueCancel = createAction(
	JOIN_LEAGUE_CANCEL,
	(id, league_id, league_join_id) => ({
		id,
		league_id,
		league_join_id,
	}),
);

export const makeLeagueTeam = createAction(
	REQ_MAKE_LEAGUE_TEAM,
	(id, teamName, leagueId, teamType, password) => ({
		id,
		teamName,
		leagueId,
		teamType,
		password,
	}),
);
export const getLeagueTeamList = createAction(
	REQ_LEAGUE_TEAM_LIST,
	(id, leagueId, complete) => ({
		id,
		leagueId,
		complete,
	}),
);

export const getParticipatList = createAction(REQ_PARTICIPAT_LEAGUE);
export const getHostLeagueList = createAction(REQ_HOST_LEAGUE);
export const leagueFilterGame = createAction(LEAGUE_FILTER, info => ({
	info,
}));
export const deleteLeagueTemporary = createAction(
	LEAGUE_TEMPORARY_DELETE,
	info => ({
		info,
	}),
);
export const getTierInfo = createAction(GET_TIER_INFO, info => ({
	info,
}));
export const deleteLeagueInfo = createAction(DELETE_LEAGUE_INFO);
export const insertLeagueComments = createAction(
	REQ_WRITE_LEAGUE_COMMENTS,
	(id, league_id, cmt_group, comments, secret) => ({
		id,
		league_id,
		cmt_group,
		comments,
		secret,
	}),
);

export const getLeaguecommentsList = createAction(
	REQ_LEAGUE_COMMENTS_LIST,
	league_id => ({
		league_id,
	}),
);
export const deleteLeagueComments = createAction(
	LEAGUE_COMMENTS_DELETE,
	(id, league_id, league_cmt_id) => ({
		id,
		league_id,
		league_cmt_id,
	}),
);
export const updateLeagueComments = createAction(
	LEAGUE_COMMENTS_UPDATE,
	(id, league_id, league_cmt_id, comments, secret) => ({
		id,
		league_id,
		league_cmt_id,
		comments,
		secret,
	}),
);
export const joinLeagueState = createAction(JOIN_LEAGUE_STATE, boolean => ({
	boolean,
}));
export const recruitTeam = createAction(REQ_LEAGUE_RECRUIT_TEAM, league_id => ({
	league_id,
}));
export const getParticipants = createAction(
	REQ_LEAGUE_PARTICIPANTS,
	league_id => ({
		league_id,
	}),
);
export const resetExtra = createAction(EXTRA_RESET);

export default Administer;
