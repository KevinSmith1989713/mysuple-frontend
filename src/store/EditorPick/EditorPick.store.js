import { createAction, handleActions } from 'redux-actions';
/* 에디터픽 하나 가져오기 */
export const REQ_EDITOR_PICK = 'REQ_EDITOR_PICK';
export const RES_EDITOR_PICK = 'RES_EDITOR_PICK';

/* 메인 에디터픽 */
export const REQ_MAIN_EDITOR_PICKS = 'REQ_MAIN_EDITOR_PICKS';
export const RES_MAIN_EDITOR_PICKS = 'RES_MAIN_EDITOR_PICKS';

const initialState = {
	mainEditorPick: [],
	editorPage: 'main',
	editorPick: {},
};

const editorPick = handleActions(
	{
		[RES_EDITOR_PICK]: (state, action) => {
			return {
				...state,
				editorPick: action.payload.editorPick,
			};
		},
		[RES_MAIN_EDITOR_PICKS]: (state, action) => ({
			...state,
			mainEditorPick: action.payload.mainEditorPick,
		}),
	},
	initialState,
);

export const reqEditorPick = createAction(REQ_EDITOR_PICK, id => ({ id }));

export const reqMainEditorPick = createAction(
	REQ_MAIN_EDITOR_PICKS,
	() => ({}),
);
export default editorPick;
// /EditorMain
