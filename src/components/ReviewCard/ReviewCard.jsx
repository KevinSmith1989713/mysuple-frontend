import React, { useState } from 'react';

import { isReportModalState } from '../../store/Auth/Auth.store';

import ThumbUp from '../../static/images/ReviewCard/upThumb@3x.png';
import ThumbDown from '../../static/images/ReviewCard/downThumb@3x.png';
import GreyThumb from '../../static/images/ReviewCard/GreyThumb@3x.png';
import GreyStar from '../../static/images/ReviewCard/GreyStar@3x.png';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';
import './ReviewCard.scss';
import Media from 'react-media';
import ReportModal from '../ReportModal/ReportModal';
import { connect } from 'react-redux';

const ReviewCard = ({
	user,
	gameId,
	review,
	reportModalState,
	isReportModalState,
}) => {
	const [reviwReport, setReviewReport] = useState('');
	return (
		<div className="game-detail-review__card">
			{reportModalState && (
				<ReportModal
					isReportModalState={isReportModalState}
					reportModalState={reportModalState}
					reviwReport={reviwReport}
					setReviewReport={setReviewReport}
				/>
			)}
			<div className="card-left">
				<img
					src={
						review.avatar_url === null || review.avatar_url === ''
							? defaultAvatar
							: review.avatar_url
					}
				/>
				<div>{review.nickname}</div>
			</div>
			<div className="card-right">
				<div className="card-right__title">
					<div className="main">
						<img src={ThumbUp} />
						<span>
							{!!review.evaluation_content &&
							review.evaluation_content.length > 21
								? `${review.evaluation_content.substring(0, 22)}...`
								: review.evaluation_content}
						</span>
					</div>
					<div className="rating">
						<img src={GreyStar} />
						<span>{review.total_score}</span>
					</div>
					{/* <Media query={{ minWidth: 769 }}>
						{matches =>
							matches ? (
								<div className="helpful">
									<img src={GreyThumb} />
									<span>도움이 돼요(2)</span>
								</div>
							) : null
						}
					</Media> */}
				</div>
				<div className={'card-right__review-prev'}>
					{review.evaluation_content}
				</div>
				<div className="card-right__more--report">
					{/* <Media query={{ maxWidth: 768 }}>
						{matches =>
							matches ? (
								<div className="helpful">
									<img src={GreyThumb} />
									<span>도움이 돼요(2)</span>
								</div>
							) : null
						}
					</Media> */}
					<span
						type="button"
						className="report"
						// onClick={() =>
						// 	!!user.email ? setModal(true) : alert('로그인 후 신고 가능합니다')
						// }
						onClick={() => {
							isReportModalState(!reportModalState);
							setReviewReport(review);
						}}
					>
						신고
					</span>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		communityNum: state.myPage.communityNum,
		reportModalState: state.auth.reportModalState,
		chatModalState: state.chatting.chatModalState,
		user: state.auth.userInfo,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		isReportModalState: info => dispatch(isReportModalState(info)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewCard);
