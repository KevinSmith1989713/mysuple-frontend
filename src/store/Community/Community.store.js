import { createAction, handleActions } from 'redux-actions';

/* 게임 정보 */
export const CHANGE_COMMUNITY_PAGE = 'CHANGE_COMMUNITY_PAGE';

/* 커뮤니티 스킨 */
export const REQ_OFFICIAL_SKIN = 'REQ_OFFICIAL_SKIN';
export const RES_OFFICIAL_SKIN = 'RES_OFFICIAL_SKIN';

/* 공지사항 */
export const INSERT_OFFICIAL_NOTICE = 'INSERT_OFFICIAL_NOTICE';
export const REQ_OFFICIAL_NOTICE = 'REQ_OFFICIAL_NOTICE';
export const RES_OFFICIAL_NOTICE = 'RES_OFFICIAL_NOTICE';

/* 개발노트 */
export const INSERT_OFFICIAL_DEVNOTE = 'INSERT_OFFICIAL_DEVNOTE';
export const REQ_OFFICIAL_DEVNOTE = 'REQ_OFFICIAL_DEVNOTE';
export const RES_OFFICIAL_DEVNOTE = 'RES_OFFICIAL_DEVNOTE';

/* 이벤트 */
export const INSERT_OFFICIAL_EVENT = 'INSERT_OFFICIAL_EVENT';
export const REQ_OFFICIAL_EVENT = 'REQ_OFFICIAL_EVENT';
export const RES_OFFICIAL_EVENT = 'RES_OFFICIAL_EVENT';

/* 디테일 페이지 */
export const REQ_OFFICIAL_DETAIL_POST = 'REQ_OFFICIAL_DETAIL_POST';
export const RES_OFFICIAL_DETAIL_POST = 'RES_OFFICIAL_DETAIL_POST';

const initialState = {
	communityPage:'main',
	communitySkin:null,
	communityId:null,
	communityMain:null,
	communityNotice:null,
	communityDevNote:null,
	communityEvent:{
		RunningEvent:null,
		EndedEvent:null,
	},
	communityPosts:null,
	communityPost:null,
};

const Community = handleActions(
	{
		[CHANGE_COMMUNITY_PAGE]: (state, action) => ({
			...state,
			communityPage:action.payload.communityPage
		}),
		[RES_OFFICIAL_NOTICE]: (state, action) => ({
			...state,
			communityNotice:action.payload.communityNotice
		}),
		[RES_OFFICIAL_DEVNOTE]: (state, action) => ({
			...state,
			communityDevNote:action.payload.communityDevNote
		}),
		[RES_OFFICIAL_EVENT]: (state, action) => ({
			...state,
			communityEvent: {
				...state.communityEvent,
				RunningEvent:action.payload.RunningEvent,
				EndedEvent:action.payload.EndedEvent
			}
		}),
		[RES_OFFICIAL_DETAIL_POST]: (state, action) => ({
			...state,
			communityPost:action.payload.communityPost
		}),
		[RES_OFFICIAL_SKIN]: (state, action) => ({
			...state,
			communitySkin: action.payload.communitySkin
		})

	}, initialState
)

export const changeCommunityPage = createAction(
	CHANGE_COMMUNITY_PAGE,(communityPage) => ({communityPage})
)

export const insertOfficialNotice = createAction(
	INSERT_OFFICIAL_NOTICE,(file, email, pageId, title, content) => ({file, email, pageId, title, content})
)

export const insertOfficialDevNote = createAction(
	INSERT_OFFICIAL_DEVNOTE,({file, pageId, title, content}) => ({file, pageId, title, content})
)

export const reqOfficialSkin = createAction(
	REQ_OFFICIAL_SKIN, (pageId) => ({pageId})
)

export const reqOfficialNotice = createAction(
	REQ_OFFICIAL_NOTICE, (pageId) => ({pageId})
)

export const reqOfficialDevNote = createAction(
	REQ_OFFICIAL_DEVNOTE, (pageId) => ({pageId})
)

export const reqOfficialEvent = createAction(
	REQ_OFFICIAL_EVENT, (pageId) => ({pageId})
)

export const insertOfficialEvent = createAction(
	INSERT_OFFICIAL_EVENT,(file, email, pageId, title, content) => ({file, email, pageId, title, content})
)

export const reqOfficialDetailPost = createAction(
	REQ_OFFICIAL_DETAIL_POST, (pageId, postId, type) => ({pageId, postId, type})
)

export default Community;