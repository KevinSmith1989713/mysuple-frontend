// 참가자 리스트
export const REQ_PARTICIPANTS = 'Manage/REQ_PARTICIPANTS';
export const RES_PARTICIPANTS = 'Manage/RES_PARTICIPANTS';
export const RES_QUESTIONS = 'Manage/RES_QUESTIONS';
export const RES_WAITING_LIST = 'Manage/RES_WAITING_LIST';
// 공지사항 글쓰기
export const REQ_NOTICE_LEAGUE_WRITE = 'Manage/REQ_NOTICE_LEAGUE_WRITE';
// 공지사항 리스트
export const REQ_NOTICE_LEAGUE_LIST = 'Manage/REQ_NOTICE_LEAGUE_LIST';
export const RES_NOTICE_LEAGUE_LIST = 'Manage/RES_NOTICE_LEAGUE_LIST';
// 공지사항 리스트 본문
export const REQ_NOTICE_LEAGUE_SELECT = 'Manage/REQ_NOTICE_LEAGUE_SELECT';
export const RES_NOTICE_LEAGUE_SELECT = 'Manage/RES_NOTICE_LEAGUE_SELECT';
// 공지사항 리스트 수정
export const REQ_NOTICE_LEAGUE_REVISE = 'Manage/REQ_NOTICE_LEAGUE_REVISE';
// 공지사항 리스트 삭제
export const REQ_NOTICE_LEAGUE_DELETE = 'Manage/REQ_NOTICE_LEAGUE_DELETE';
// 리그 승인
export const REQ_APPROVE_LEAGUE = 'Manage/REQ_APPROVE_LEAGUE';
export const RES_APPROVE_LEAGUE = 'Manage/RES_APPROVE_LEAGUE';
// 리그 거절
export const REQ_REJECT_LEAGUE = 'Manage/RES_REJECT_LEAGUE';
// 공지사항 상태
export const LEAGUE_NOTICE_STATE = 'Manage/LEAGUE_NOTICE_STATE';
// 내가 쓴글 상태
export const ㅡ = 'Manage/ㅡ';

const ENTRANT_RESET = 'Manage/ENTRANT_RESET';

const initialState = {
	participantsList: [],
	questionsList: [],
	leagueNoticeList: [],
	leaguenoticeState: false,
	entrant: [],
	winner: [],
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case RES_PARTICIPANTS:
			return {
				...state,
				participantsList: action.payload.list,
			};

		case RES_QUESTIONS:
			return {
				...state,
				questionsList: action.payload.list,
			};
		case RES_NOTICE_LEAGUE_LIST:
			return {
				...state,
				leagueNoticeList: action.payload.list,
			};

		case LEAGUE_NOTICE_STATE:
			return {
				...state,
				leaguenoticeState: action.payload.state,
			};
		case ENTRANT_RESET:
			return {
				...state,
				entrant: [],
			};

		default:
			return state;
	}
}

export const getParticipantsList = (id, league_id, mode) => ({
	type: REQ_PARTICIPANTS,
	payload: {
		id,
		league_id,
		mode,
	},
});

export const writeNotice = (id, league_id, title, content) => ({
	type: REQ_NOTICE_LEAGUE_WRITE,
	payload: {
		id,
		league_id,
		title,
		content,
	},
});
export const getLeagueNoticeList = league_id => ({
	type: REQ_NOTICE_LEAGUE_LIST,
	payload: {
		league_id,
	},
});
export const selectLeagueNotice = (league_id, league_notice_id) => ({
	type: REQ_NOTICE_LEAGUE_SELECT,
	payload: {
		league_id,
		league_notice_id,
	},
});
export const reviseLeagueNoticeList = (
	id,
	league_id,
	title,
	content,
	league_notice_id,
) => ({
	type: REQ_NOTICE_LEAGUE_REVISE,
	payload: { id, league_id, title, content, league_notice_id },
});

export const deleteLeagueNoticeList = (id, league_id, league_notice_id) => ({
	type: REQ_NOTICE_LEAGUE_DELETE,
	payload: { id, league_id, league_notice_id },
});

export const approveLeague = (id, league_id, league_join_id) => ({
	type: REQ_APPROVE_LEAGUE,
	payload: {
		id,
		league_id,
		league_join_id,
	},
});

export const rejectLeague = (id, league_id, league_join_id) => ({
	type: REQ_REJECT_LEAGUE,
	payload: {
		id,
		league_id,
		league_join_id,
	},
});

export const resetEntrant = () => ({
	type: ENTRANT_RESET,
});
