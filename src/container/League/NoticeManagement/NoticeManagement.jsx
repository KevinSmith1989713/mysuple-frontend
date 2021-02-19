import React, { Fragment, useState, useEffect } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';
import { useHistory, Route, Switch } from 'react-router-dom';
import FroalaEditor from '../../../components/FroalaEditor/FroalaEditor';
import NoticeEditor from '../../../components/League/NoticeEditor/NoticeEditor';

import './NoticeManagement.scss';

const NoticeManagement = ({
	writeNotice,
	getLeagueNoticeList,
	leagueNoticeList,
	selectLeagueNotice,
	leaguenoticeState,
	deleteLeagueNoticeList,
}) => {
	let history = useHistory();

	const [noticeState, setNoticeState] = useState('list');
	const [editor, setEditor] = useState('');
	const [title, setTitle] = useState('');
	const [noticeId, setNoticeId] = useState(null);
	const [leagueId, setLeagueId] = useState('');
	const [post, setPost] = useState({});
	const [postState, setPostState] = useState(false);

	const timeForToday = value => {
		const today = new Date();
		const timeValue = new Date(value);

		const betweenTime = Math.floor(
			(today.getTime() - timeValue.getTime()) / 1000 / 60,
		);
		if (betweenTime < 1) return '방금전';
		if (betweenTime < 60) {
			return `${betweenTime}분전`;
		}

		const betweenTimeHour = Math.floor(betweenTime / 60);
		if (betweenTimeHour < 24) {
			return `${betweenTimeHour}시간전`;
		}

		const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
		if (betweenTimeDay < 365) {
			return `${betweenTimeDay}일전`;
		}
		return `${Math.floor(betweenTimeDay / 365)}년전`;
	};

	useEffect(() => {
		leaguenoticeState === true && setNoticeState('list');
	}, [leaguenoticeState]);

	useEffect(() => {
		getLeagueNoticeList(window.location.pathname.split('/')[2]);
	}, [leaguenoticeState]);

	useEffect(() => {
		selectLeagueNotice(window.location.pathname.split('/')[2], noticeId);
	}, [noticeId]);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/LeagueNoticePost`, {
					league_id: window.location.pathname.split('/')[2],
					league_notice_id: noticeId,
				})
				.then(res => {
					setPost(res.data.Info && res.data.Info.notice);
				});
		} catch (e) {
			console.error(e);
		}
	}, [postState]);

	useEffect(() => {
		setLeagueId(window.location.pathname.split('/')[2]);
	}, []);

	const isDelete = e => {
		if (noticeId === null) {
			alert('삭제할 목록을 체크해주세요.');
		} else {
			swal({
				text: '삭제하시겠습니까?',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			}).then(willDelete => {
				if (willDelete) {
					swal('삭제되었습니다.', {
						icon: 'success',
					});
					deleteLeagueNoticeList(
						null,
						window.location.pathname.split('/')[2],
						noticeId,
					);
				}
			});
		}
	};

	return (
		<div className="NoticeManagement">
			{window.location.pathname.split('/')[4] === undefined &&
			noticeState === 'list' ? (
				<article>
					<ul className="list--box">
						{leagueNoticeList.map((item, index) => {
							return (
								<li key={index}>
									<div className="notice__contants">
										<input
											type="checkBox"
											checked={noticeId === item.league_notice_id}
											onClick={() => {
												noticeId === item.league_notice_id
													? setNoticeId('')
													: setNoticeId(item.league_notice_id);
											}}
										/>
										<button
											type="button"
											className="notice__title"
											onClick={() => {
												setNoticeId(item.league_notice_id);
												setNoticeState('post');
												setPostState(!postState);
											}}
										>
											{item.title}
										</button>
									</div>
									<div>
										<div className="notice_date">
											{timeForToday(item.updatedAt)}
										</div>
									</div>
								</li>
							);
						})}
					</ul>
					<div className="notice__btn--box">
						<button onClick={() => setNoticeState('write')}>글쓰기</button>
						{/* <button
							onClick={() => {
								if (noticeId === null) {
									alert('수정할 목록을 체크해 주세요');
								} else {
									history.push(`./leagueNotice/${noticeId}`);
								}
							}}
						>
							수정
						</button> */}
						<button
							onClick={() => {
								isDelete();
							}}
						>
							삭제
						</button>
					</div>
				</article>
			) : (
				''
			)}

			{noticeState === 'write' && (
				<article>
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
						<button onClick={() => setNoticeState('list')}>돌아가기</button>
						<button
							onClick={() => {
								writeNotice(
									null,
									window.location.pathname.split('/')[2],
									title,
									editor,
								);
							}}
						>
							글쓰기
						</button>
					</div>
				</article>
			)}

			{noticeState === 'post' && (
				<article className="post">
					<div className="title--box">
						<h1>{post && post.title}</h1>
						<div className="userInfo--box">
							<div className="user__ninkname">{post && post.nickname}</div>
							<div>{timeForToday(post && post.updatedAt)}</div>
						</div>
					</div>
					<div
						className="contants"
						dangerouslySetInnerHTML={{ __html: post && post.content }}
					/>
					<div className="notice__btn--box">
						<button
							onClick={() => {
								setNoticeState('list');
								setNoticeId('');
							}}
						>
							뒤로
						</button>
						<button
							onClick={() => {
								history.push(`./leagueNotice/${noticeId}`);
							}}
						>
							수정
						</button>
					</div>
				</article>
			)}

			<Switch>
				<Route
					path="/leagueManage/:id/leagueNotice/:id"
					component={NoticeEditor}
				/>
			</Switch>
		</div>
	);
};

export default NoticeManagement;
