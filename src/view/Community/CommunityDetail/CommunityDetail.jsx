import React, { useEffect } from 'react';
import './CommunityDetail.scss';
import { connect } from 'react-redux';
import {
	communityPost,
	reqOfficialDetailPost,
} from '../../../store/Community/Community.store';

import EventCard from '../../../components/EventCard/EventCard';
import Button from '../../../components/Button/Button';

import { ReactComponent as Eye } from '../../../static/images/Community/Eye.svg';
import { ReactComponent as Clock } from '../../../static/images/Community/Clock.svg';
import { ReactComponent as LowArrow } from '../../../static/images/Community/LowArrow.svg';

import { ReactComponent as Calendar } from '../../../static/images/Community/Calendar.svg';

const setPostType = type => {
	switch (type) {
		case 'notice':
			return '공지사항';
		case 'devNote':
			return '개발노트';
		case 'event':
			return '이벤트';
	}
};

const CommunityDetail = ({ match, reqOfficialDetailPost, communityPost }) => {
	useEffect(() => {
		reqOfficialDetailPost(
			match.params.id,
			match.params.postId,
			match.params.tab,
		);
	}, []);
	// TODO: 배열 형태로 들어옴. 객체 형태로 요구하는 중임

	return (
		<div className="CommunityDetail">
			<div className="CommunityDetail--header">
				{setPostType(match.params.tab)}
				<Button size="community-edit">새글쓰기</Button>
			</div>
			<div className="CommunityDetail--Title">
				<div className="Title--type">{setPostType(match.params.tab)}</div>
				<div className="Title--text">
					[리그 오브 레전드] 새로운 추가 및 업데이트[리그 오브 레전드] 새로운
					추가 및 업데이트
				</div>
			</div>
			<div className="CommunityDetail--Info">
				{match.params.tab === 'event' && (
					<div className="Info--eventdate">
						<Calendar />
					</div>
				)}
				<div className="Info--view">
					<Eye />
					32425
				</div>
				<div className="Info--createdAt">
					<Clock />
					2019.12.12
				</div>
			</div>
			<div className="CommunityDetail--Content"></div>
			<div className="CommunityDetail--UpDownList">
				<div className="UpDownList--up">
					<LowArrow />
					<div className="text">윗글</div>
					<div className="type">공지</div>
					<div className="title">유저 커뮤니티</div>
				</div>
				<div className="UpDownList--down">
					<LowArrow />
					<div className="text">아랫글</div>
					<div className="type">공지</div>
					<div className="title">유저 커뮤니티</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		communityPost: state.community.communityPost,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reqOfficialDetailPost: (pageId, postId, type) =>
			dispatch(reqOfficialDetailPost(pageId, postId, type)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityDetail);
