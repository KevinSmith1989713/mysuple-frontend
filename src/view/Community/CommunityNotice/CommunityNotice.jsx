import React, { useState, useEffect } from 'react';
import './CommunityNotice.scss';

import { connect } from 'react-redux';

import EventCard from '../../../components/EventCard/EventCard';
import Button from '../../../components/Button/Button';
import Pagination from '../../../components/Pagination/Pagination';
import { reqOfficialNotice } from '../../../store/Community/Community.store';
import { Link } from 'react-router-dom';
import moment from 'moment';

const CommunityNotice = ({ match, communityNotice, reqOfficialNotice }) => {
	const [paging, setPaging] = useState(1);
	const perPage = 4;

	useEffect(() => {
		if (communityNotice) {
		} else {
			reqOfficialNotice(match.params.id);
		}
	}, []);

	return (
		<div className="CommunityNotice">
			<div className="CommunityNotice--header">
				공지사항
				<Link
					to={{
						pathname: `/community/official/${match.params.id}/setting`,
						state: { fromDashboard: true },
					}}
				>
					<Button size="community-edit">새글쓰기</Button>
				</Link>
			</div>
			{communityNotice && (
				<>
					<div className="CommunityNotice--Newest">
						<EventCard info={communityNotice[0]} type="notice" match={match} />
					</div>

					<div className="CommunityNotice--List">
						{!!communityNotice && communityNotice.length > 0 ? (
							communityNotice.map((notice, index) => {
								if (
									index >= paging * perPage - perPage &&
									index < paging * perPage
								) {
									return (
										<Link to={`${match.url}/${notice.id}`} key={index}>
											<div className="CommunityNotice--Row" key={index}>
												<div className="notice--checkbox"></div>
												<div className="notice--type">{notice.noticeType}</div>
												<div className="notice--title">{notice.title}</div>
												<div className="notice--date">
													{notice.createdAt &&
														moment(notice.createdAt).format('YYYY.MM.DD')}
												</div>
											</div>
										</Link>
									);
								}
							})
						) : (
							<div className="no-review"></div>
						)}
					</div>
					{/* TODO: 관리자일 경우 보이는 버튼, 공지 줄에 checkbox 떠야함  */}
					<div className="CommunityNotice--Edit">
						{false && (
							<>
								<Button size="community-edit">삭제</Button>
								<Button size="community-edit">전체선택</Button>
							</>
						)}
					</div>
					<div className="CommunityNotice--Pagination">
						{!!communityNotice && communityNotice.length > 0 && (
							<Pagination
								perPage={perPage}
								status={paging}
								listCnt={communityNotice.length}
								changePage={page => setPaging(page)}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		communityNotice: state.community.communityNotice,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reqOfficialNotice: pageId => dispatch(reqOfficialNotice(pageId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityNotice);
