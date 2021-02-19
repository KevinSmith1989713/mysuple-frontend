import { createAction, handleActions } from 'redux-actions';

//공지 
export const REQ_NOTICE = "REQ_NOTICE"
export const RES_NOTICE = "RES_NOTICE"
export const REQ_NOTICE_POST = "REQ_NOTICE_POST"
export const RES_NOTICE_POST = "RES_NOTICE_POST"

//faq
export const REQ_FAQ = "REQ_FAQ"
export const RES_FAQ = "RES_FAQ"

const initialState = {
	noticeList:[],
	noticePost:{},
	faqList:[],
};

const Administer = handleActions(
	{
		[RES_NOTICE]: (state, action) => ({
			...state,
			noticeList: action.payload.info,
		}),
		[RES_NOTICE_POST]: (state, action) => ({
			...state,
			noticePost: action.payload.info,
		}),
		[RES_FAQ]: (state, action) => ({
			...state,
			faqList: action.payload.info,
		}),
	},
	initialState,
);

export const reqNotices = createAction(REQ_NOTICE)
export const reqNoticePost = createAction(REQ_NOTICE_POST, (id) => ({id}))
export const reqFaq = createAction(REQ_FAQ)

export default Administer;