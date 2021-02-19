import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';
import { useHistory } from 'react-router-dom';
import {
	writeNotice,
	reviseLeagueNoticeList,
} from '../../../store/Manage/Manage.store';

import FroalaEditor from '../../../components/FroalaEditor/FroalaEditor';

import './NoticeEditor.scss';

const NoticeEditor = ({ reviseLeagueNoticeList, leaguenoticeState }) => {
	let history = useHistory();
	const [editor, setEditor] = useState('');
	const [title, setTitle] = useState('');
	const [leagueId, setLeagueId] = useState('');

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/LeagueNoticePost`, {
					league_id: window.location.pathname.split('/')[2],
					league_notice_id: window.location.pathname.split('/')[4],
				})
				.then(res => {
					setTitle(res.data.Info && res.data.Info.notice.title);
					setEditor(res.data.Info && res.data.Info.notice.content);
				});
		} catch (e) {
			console.error(e);
		}
	}, []);

	useEffect(() => {
		setLeagueId(window.location.pathname.split('/')[2]);
	}, []);

	useEffect(() => {
		leaguenoticeState === true &&
			history.push(`/leagueManage/${leagueId}/leagueNotice`);
	}, [leaguenoticeState]);

	return (
		<div className="Notice__editor">
			<input
				className="notice__revise__input"
				placeholder="제목"
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<div className="notice__editor">
				<FroalaEditor editorValue={e => setEditor(e)} editor={editor} />
			</div>
			<div className="notice__btn--box">
				<button
					onClick={() => history.push(`/leagueManage/${leagueId}/leagueNotice`)}
				>
					뒤로
				</button>
				<button
					onClick={() => {
						reviseLeagueNoticeList(
							null,
							window.location.pathname.split('/')[2],
							title,
							editor,
							window.location.pathname.split('/')[4],
						);
					}}
				>
					수정
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		leaguenoticeState: state.manage.leaguenoticeState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		writeNotice: (id, league_id, title, content) =>
			dispatch(writeNotice(id, league_id, title, content)),
		reviseLeagueNoticeList: (id, league_id, title, content, league_notice_id) =>
			dispatch(
				reviseLeagueNoticeList(id, league_id, title, content, league_notice_id),
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticeEditor);
