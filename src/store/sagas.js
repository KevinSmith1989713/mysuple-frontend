import { fork } from 'redux-saga/effects';

import administer from './Administer/Administer.saga';
import auth from './Auth/Auth.saga';
import myPage from './MyPage/MyPage.saga';
import gameInfo from './GameInfo/GameInfo.saga';
import editor from './EditorPick/EditorPick.saga';
import community from './Community/Community.saga';
import curating from './Curating/Curating.saga';
import colleague from './Colleague/Colleague.saga';
import chatting from './Chatting/Chatting.saga';
import league from './League/League.saga';
import manage from './Manage/Manage.saga';

export default function* root() {
	yield fork(administer);
	yield fork(auth);
	yield fork(gameInfo);
	yield fork(myPage);
	yield fork(editor);
	yield fork(community);
	yield fork(curating);
	yield fork(colleague);
	yield fork(chatting);
	yield fork(league);
	yield fork(manage);
}
