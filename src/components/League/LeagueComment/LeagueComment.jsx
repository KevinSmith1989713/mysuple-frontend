import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import ReportModal from '../../../components/ReportModal/ReportModal';
import { isReportModalState } from '../../../store/Auth/Auth.store';

import swal from 'sweetalert';
import Pagination from '../../Pagination/Pagination';
import lockImg from '../../../static/images/League/lock.svg';
import defaultAvatar from '../../../static/images/Passport/default-avatar.svg';

import './LeagueComment.scss';

const LeagueComment = ({
	insertLeagueComments,
	leagueCommentsList,
	deleteLeagueComments,
	updateLeagueComments,
	reportModalState,
	isReportModalState,
}) => {
	const getUserInfo = JSON.parse(localStorage.getItem('data'));
	const [commentsText, setCommentsText] = useState('');
	const [innerCommentsText, setInnerCommentsText] = useState('');
	const [commentsUpdateText, setCommentsUpdateText] = useState('');
	const [innerCommentsUpdateText, setInnerCommentsUpdateText] = useState('');
	const [paging, setPaging] = useState(1);
	const [commentId, setCommentId] = useState(0);
	const [commentFixId, setCommentFixId] = useState(0);
	const [innerCommentFixId, setInnerCommentFixId] = useState(0);
	const perPage = 5;
	const [lockState, setLockState] = useState(false);
	const [lockFixState, setLcokFixState] = useState(false);
	const [lockSeconedState, setLockSeconedState] = useState(false);
	const [innrLockFixState, setInnerLcokFixState] = useState(false);

	const isDelete = e => {
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
				deleteLeagueComments(
					null,
					Number(window.location.pathname.substring(8)),
					e.league_cmt_id,
				);
			}
		});
	};
	const innerComment = e => {
		if (getUserInfo === null) {
			alert('로그인 후 작성 가능합니다.');
		} else {
			insertLeagueComments(
				null,
				Number(window.location.pathname.substr(8)),
				e.league_cmt_id,
				innerCommentsText,
				commentId > 0 ? (lockSeconedState ? 1 : 0) : lockState ? 1 : 0,
			);
			setInnerCommentsText('');
			setLockState(false);
			setLockSeconedState(false);
		}
	};

	const openInnerComment = e => {
		setCommentId(e);
		commentId === e && setCommentId(0);
	};

	const openCommentsFix = e => {
		setCommentFixId(e);
		commentFixId === e && setCommentFixId(0);
	};

	const isInnerFix = e => {
		setInnerCommentFixId(e);
		innerCommentFixId === e && setInnerCommentFixId(0);
	};

	const updateCommnet = e => {
		if (getUserInfo === null) {
			alert('로그인 후 작성 가능합니다.');
		} else {
			updateLeagueComments(
				null,
				Number(window.location.pathname.substr(8)),
				e.league_cmt_id,
				commentsUpdateText,
				commentId > 0 ? (lockState ? 1 : 0) : lockFixState ? 1 : 0,
			);
			setLcokFixState(false);
		}
	};

	const updateCommnetInner = e => {
		if (getUserInfo === null) {
			alert('로그인 후 작성 가능합니다.');
		} else {
			updateLeagueComments(
				null,
				Number(window.location.pathname.substr(8)),
				innerCommentFixId,
				innerCommentsUpdateText,
				commentId > 0 ? (innrLockFixState ? 1 : 0) : lockFixState ? 1 : 0,
			);
			setLcokFixState(false);
		}
	};

	return (
		<div className="LeagueComment">
			{reportModalState && (
				<ReportModal
					isReportModalState={isReportModalState}
					reportModalState={reportModalState}
					leagueComment={innerCommentFixId}
				/>
			)}
			<div className="LeagueComment--Title">
				댓글 <b>{leagueCommentsList.length}</b>
			</div>
			<div className="LeagueComment--Insert">
				<textarea
					value={commentsText}
					onChange={e => {
						setCommentsText(e.target.value);
					}}
				/>
				<button type="button" onClick={() => setLockState(!lockState)}>
					<img
						className={lockState ? 'lockImg on' : 'lockImg '}
						src={lockImg}
						alr="lock"
					/>
				</button>
				<button
					type="button"
					className="insert--btn"
					onClick={() => {
						if (getUserInfo === null) {
							alert('로그인 후 작성 가능합니다.');
						} else {
							insertLeagueComments(
								null,
								Number(window.location.pathname.substring(8)),
								null,
								commentsText,
								commentId > 0 ? (lockSeconedState ? 1 : 0) : lockState ? 1 : 0,
							);
							setCommentsText('');
							setLockState(false);
						}
					}}
				>
					작성
				</button>
			</div>
			<div className="LeagueComment--List">
				{leagueCommentsList.length > 0
					? leagueCommentsList.map((item, index) => {
							return (
								index >= paging * perPage - perPage &&
								index < paging * perPage && (
									<div className="commentBox" key={index}>
										<img
											className="profile"
											src={!!item.avatar_url ? item.avatar_url : defaultAvatar}
										/>
										<div className="commentInfo">
											<div className="nickName">
												{item.nickname}
												{/* <div className="display">참가자</div> */}
												<div className="btnBox">
													{(getUserInfo && getUserInfo.id) === null ? (
														''
													) : item.user_id === getUserInfo.id ? (
														<>
															<button
																className="btn"
																type="button"
																onClick={() => {
																	openCommentsFix(item.league_cmt_id);
																	setCommentsUpdateText(item.content);
																	setLcokFixState(
																		item.private === 1 ? true : false,
																	);
																}}
															>
																수정
															</button>
															<button
																className="btn"
																type="button"
																onClick={() => isDelete(item)}
															>
																삭제
															</button>
														</>
													) : (
														''
													)}
													<button
														className="btn"
														type="button"
														onClick={() => {
															isReportModalState(!reportModalState);
															setInnerCommentFixId(item);
														}}
													>
														신고
													</button>
													<button
														className="btn"
														type="button"
														onClick={() => {
															openInnerComment(item.league_cmt_id);
														}}
													>
														댓글{' '}
														{item.commentTo.length > 0
															? `(${item.commentTo.length})`
															: ''}
													</button>
												</div>
											</div>

											{/* *** 댓글 수정 컴포넌트 *** */}
											{/* ********************** */}
											{commentFixId === item.league_cmt_id ? (
												<div className="LeagueComment--Insert innerFix">
													<textarea
														value={commentsUpdateText}
														onChange={e => {
															setCommentsUpdateText(e.target.value);
														}}
													/>
													<button
														type="button"
														onClick={() => setLcokFixState(!lockFixState)}
													>
														<img
															className={
																lockFixState ? 'lockImg on' : 'lockImg'
															}
															src={lockImg}
															alr="lock"
														/>
													</button>
													<button
														type="button"
														className="insert--btn"
														onClick={() => {
															updateCommnet(item);
															setCommentFixId(0);
														}}
													>
														수정
													</button>
												</div>
											) : (
												<div className="commnet">{item.content}</div>
											)}

											<div className="date">
												{item.createdAt.substring(0, 10).replace(/-/g, '.')}{' '}
												&nbsp;
												{item.createdAt.substring(11, 19)}
											</div>

											{commentId === item.league_cmt_id ? (
												<Fragment>
													<div className="innerComment--box">
														<div className="mark" />
														<div className="LeagueComment--Insert">
															<textarea
																value={innerCommentsText}
																onChange={e => {
																	setInnerCommentsText(e.target.value);
																}}
															/>
															<button
																type="button"
																onClick={() =>
																	setLockSeconedState(!lockSeconedState)
																}
															>
																<img
																	className={
																		lockSeconedState ? 'lockImg on' : 'lockImg'
																	}
																	src={lockImg}
																	alr="lock"
																/>
															</button>
															<button
																type="button"
																className="insert--btn"
																onClick={() => {
																	innerComment(item);
																	setCommentsText('');
																}}
															>
																작성
															</button>
														</div>
													</div>

													{/* *** 대댓글 리스트*** */}
													{/* ********************** */}
													{item.commentTo.map((inner, index) => {
														return (
															<div
																className="innerComment--box result"
																key={index}
															>
																<div className="mark" />
																<img
																	className="profile"
																	src={
																		!!inner.avatar_url
																			? inner.avatar_url
																			: defaultAvatar
																	}
																/>
																<div className="commentInfo">
																	<div className="nickName">
																		{inner.nickname}
																		{/* <div className="display">참가자</div> */}
																		<div className="btnBox inner">
																			<button
																				className="btn"
																				type="button"
																				onClick={() => {
																					isReportModalState(!reportModalState);
																					setInnerCommentFixId(inner);
																				}}
																			>
																				신고
																			</button>
																			{(getUserInfo && getUserInfo.id) ===
																			null ? (
																				''
																			) : inner.user_id === getUserInfo.id ? (
																				<>
																					<button
																						className="btn"
																						type="button"
																						onClick={() => {
																							isInnerFix(inner.league_cmt_id);
																							setInnerCommentsUpdateText(
																								inner.content,
																							);
																							setInnerLcokFixState(
																								inner.private === 1
																									? true
																									: false,
																							);
																						}}
																					>
																						수정
																					</button>
																					<button
																						className="btn"
																						type="button"
																						onClick={() => isDelete(inner)}
																					>
																						삭제
																					</button>
																				</>
																			) : (
																				''
																			)}
																		</div>
																	</div>

																	{/* *** 대댓글 수정 컴포넌트 *** */}
																	{/* ********************** */}
																	{innerCommentFixId === inner.league_cmt_id ? (
																		<div className="LeagueComment--Insert innerFix">
																			<textarea
																				value={innerCommentsUpdateText}
																				onChange={e => {
																					setInnerCommentsUpdateText(
																						e.target.value,
																					);
																				}}
																			/>
																			<button
																				type="button"
																				onClick={() =>
																					setInnerLcokFixState(
																						!innrLockFixState,
																					)
																				}
																			>
																				<img
																					className={
																						innrLockFixState
																							? 'lockImg on'
																							: 'lockImg'
																					}
																					src={lockImg}
																					alr="lock"
																				/>
																			</button>
																			<button
																				type="button"
																				className="insert--btn"
																				onClick={() => {
																					updateCommnetInner(item);
																					setCommentFixId(0);
																				}}
																			>
																				수정
																			</button>
																		</div>
																	) : (
																		<div className="commnet">
																			{inner.content}
																		</div>
																	)}

																	<div className="date">
																		{inner.createdAt
																			.substring(0, 10)
																			.replace(/-/g, '.')}{' '}
																		&nbsp;
																		{inner.createdAt.substring(11, 19)}
																	</div>
																</div>
															</div>
														);
													})}
												</Fragment>
											) : (
												''
											)}
										</div>
									</div>
								)
							);
					  })
					: ''}
				<div className="pageNation--box">
					{leagueCommentsList.length > 0 && (
						<Pagination
							perPage={perPage}
							status={paging}
							listCnt={leagueCommentsList.length}
							changePage={page => setPaging(page)}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		reportModalState: state.auth.reportModalState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		isReportModalState: info => dispatch(isReportModalState(info)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueComment);
