import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';
import Pagination from '../../Pagination/Pagination';

import './LeagueDetailNotice.scss';

const LeagueDetailNotice = ({
	getLeagueNoticeList,
	selectLeagueNotice,
	leagueNoticeList,
}) => {
	const [noticeState, setNoticeState] = useState('list');
	const [noticeId, setNoticeId] = useState(null);
	const [post, setPost] = useState({});

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
		getLeagueNoticeList(window.location.pathname.split('/')[2]);
	}, []);

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
	}, [noticeId]);

	return (
		<article>
			<ul className="LeagueDetailNotice">
				{noticeState === 'list' ? (
					<>
						{leagueNoticeList.length === 0 ? (
							<div className="notice__none">공지사항이 없습니다.</div>
						) : (
							<>
								{leagueNoticeList.map((item, index) => {
									return (
										<li key={index}>
											<div className="notice__contants">
												<button
													type="button"
													className="notice__title"
													onClick={() => {
														setNoticeId(item.league_notice_id);
														setNoticeState('post');
													}}
												>
													{item.title}
												</button>
											</div>
											<div className="user__info">
												<div className="nickname">{item.nickname}</div>
												<div className="notice_date">
													{timeForToday(item.updatedAt)}
												</div>
											</div>
										</li>
									);
								})}
							</>
						)}
					</>
				) : (
					<>
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
						<div className="post__btn--box">
							<button onClick={() => setNoticeState('list')}>목록</button>
						</div>
					</>
				)}
			</ul>
		</article>
	);
};
export default LeagueDetailNotice;
