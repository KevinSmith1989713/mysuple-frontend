import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import administer from './Administer/Administer.store';
import auth from './Auth/Auth.store';
import gameInfo from './GameInfo/GameInfo.store';
import layout from './Layout/Layout.store';
import myPage from './MyPage/MyPage.store';
import editorPick from './EditorPick/EditorPick.store';
import community from './Community/Community.store';
import curating from './Curating/Curating.store';
import colleague from './Colleague/Colleague.store';
import chatting from './Chatting/Chatting.store';
import league from './League/League.store';
import manage from './Manage/Manage.store';

const reducers = {
	administer,
	auth,
	gameInfo,
	layout,
	myPage,
	editorPick,
	community,
	curating,
	colleague,
	chatting,
	league,
	manage,
};

export default history =>
	combineReducers({
		router: connectRouter(history),
		...reducers,
	});
