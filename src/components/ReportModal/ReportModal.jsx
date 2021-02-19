import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';

import './ReportModal.scss';
import Title from '../Title/Title';

import { connect } from 'react-redux';
import { reportReview } from '../../store/GameInfo/GameInfo.store';

const reportList = [
	{
		key: '1',
		text: '욕설이 담긴 글입니다.',
	},
	{
		key: '2',
		text: '음란물을 포함하고 있는 글입니다.',
	},
	{
		key: '3',
		text: '혐오 발언이 담긴 글입니다.',
	},
	{
		key: '4',
		text: '기타',
	},
];

const ReportModal = ({
	reportReview,
	userInfo,
	review,
	isOpen,
	close,
	isReportModalState,
	reportModalState,
	reviwReport,
	infoCommunity,
	leagueComment,
	linkInfo,
	setCommentFixId,
	setReviewReport,
}) => {
	const [type, setType] = useState('');
	const [typeNum, setTypeNum] = useState('');

	useEffect(() => {
		if (reviwReport !== undefined) {
			setType(1);
			setTypeNum(reviwReport && reviwReport.review_id);
		} else if (infoCommunity && infoCommunity.community_cmt_id !== undefined) {
			setType(3);
			setTypeNum(infoCommunity && infoCommunity.community_cmt_id);
		} else if (infoCommunity !== undefined) {
			setType(2);
			// infoCommunity !== 0 &&
			setTypeNum(infoCommunity && infoCommunity.post_id);
		} else if (leagueComment !== undefined) {
			setType(4);
			setTypeNum(leagueComment && leagueComment.league_cmt_id);
		} else if (linkInfo !== undefined) {
			setType(6);
			setTypeNum(linkInfo && linkInfo.crew_id);
		}
	}, []);

	const getUserInfo = JSON.parse(localStorage.getItem('data'));
	const [report, setReport] = useState('');
	const [text, setText] = useState('');
	const [sent, setSent] = useState(false);
	const [etcReason, setEtcReason] = useState('');

	const setRep = key => {
		if (report === key && report != 'etc') {
			// setReport('');
		} else {
			setReport(key);
		}
	};

	const sendReport = () => {
		if (report != '') {
			if (report === 'etc' && etcReason.length === 0) {
				alert('신고 사유를 적어주세요');
			} else {
				try {
					axios
						.post(`${url.file}/FeedbackInsert`, {
							// '[신고 - report, 좋아요 - like]'
							domain: 'report',
							id: getUserInfo.id,
							// `[참조 테이블 1-리뷰 2-커뮤니티 글 3-커뮤니티 댓글 4-리그 댓글 5-큐레이팅 6-동료찾기(빠른매칭, 크루) 7-리그]`,
							refer_type: type,
							refer_id: typeNum,
							report_type: report,
							report_content: report === `4` ? etcReason : text,
						})
						.then(res => {
							// console.log(res.data);
							// isReportModalState(!reportModalState);
							setSent(!sent);
						});
				} catch (e) {
					console.error(e);
				}
			}
		} else {
			alert('신고 이유를 선택해 주세요');
		}
	};

	return (
		<div className="ReportModal">
			<div
				className="background"
				onClick={() => {
					isReportModalState(!reportModalState);
					setCommentFixId === undefined ? '' : setCommentFixId(0);
					setReviewReport === undefined ? '' : setReviewReport('');
				}}
			/>
			<div className="ReportModal--box">
				<div className="ReportModal--Header">
					<div className="text">신고하기</div>
					{!sent && (
						<button className="header__button" onClick={() => sendReport()}>
							등록
						</button>
					)}
				</div>
				<div className="ReportModal--Main">
					{sent ? (
						<>
							<div className="report--accept">
								신고가 완료 되었습니다.
								<br />
								관리자 확인 후 조치를 취하겠습니다.
							</div>
						</>
					) : (
						<>
							<Title size="small">이 글에 어떤 문제가 있나요?</Title>
							<div className="report--list">
								{reportList.map((row, idx) => {
									return (
										<div
											key={idx}
											className={
												report === row.key
													? 'report--row__selected'
													: 'report--row'
											}
											onClick={() => {
												setRep(row.key);
												setText(row.text);
											}}
										>
											<div type="button" onClick={() => setRep(row.key)}>
												{row.text}
											</div>
											{report === '4' && row.key === '4' && (
												<input
													onChange={e => setEtcReason(e.target.value)}
													type="text"
													placeholder="기타 신고 사유를 100자 이내로 작성해주세요."
													maxLength={100}
												/>
											)}
										</div>
									);
								})}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		userInfo: state.auth.userInfo,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reportReview: (review_id, review_report_type, review_report_content) =>
			dispatch(
				reportReview(review_id, review_report_type, review_report_content),
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportModal);
