import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';
import moment from 'moment';
import { connect } from 'react-redux';
import { isReportModalState } from '../../store/Auth/Auth.store';
import ReportModal from '../../components/ReportModal/ReportModal';
import swal from 'sweetalert';
import Pagination from '../Pagination/Pagination';
import lockImg from '../../static/images/League/lock.svg';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';

import './CommunityComment.scss';

const CommuntyComment = ({
	post,

	commentList,
	flag,
	setFlag,
	reportModalState,
	isReportModalState,
	get,
}) => {
	const getUserInfo = JSON.parse(localStorage.getItem('data'));
	const [commentsText, setCommentsText] = useState('');
	const [innerCommentsText, setInnerCommentsText] = useState('');
	const [innerCommentsText2, setInnerCommentsText2] = useState('');
	const [commentsUpdateText, setCommentsUpdateText] = useState('');
	const [innerCommentsUpdateText, setInnerCommentsUpdateText] = useState('');
	const [paging, setPaging] = useState(1);
	const [commentId, setCommentId] = useState(0);
	const [commentInnerNickname, setCommentInnerNickname] = useState('');
	const [commentInnerId, setCommentInnerId] = useState(0);
	const [commentFixId, setCommentFixId] = useState(0);
	const [innerCommentFixId, setInnerCommentFixId] = useState(0);
	const perPage = 100;
	const [lockState, setLockState] = useState(false);
	const [lockFixState, setLcokFixState] = useState(false);
	const [lockSeconedState, setLockSeconedState] = useState(false);
	const [innrLockFixState, setInnerLcokFixState] = useState(false);

	const writeComment = () => {
		try {
			axios
				.post(`${url.file}/PostCommentInsert`, {
					post_id: post[0].post_id,
					id: getUserInfo === null ? '' : getUserInfo.id,
					content: commentsText,
					cmt_group: null,
				})
				.then(res => {
					setCommentsText('');
					setFlag(!flag);
				});
		} catch (e) {
			console.error(e);
		}
	};
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
				try {
					axios
						.post(`${url.file}/PostCommentDelete`, {
							community_cmt_id: e.community_cmt_id,
							post_id: post[0].post_id,
							id: getUserInfo === null ? '' : getUserInfo.id,
						})
						.then(res => {
							// console.log(res);
							setFlag(!flag);
						});
				} catch (e) {
					console.error(e);
				}
			}
		});
	};

	const innerComment = e => {
		const text = `@${commentInnerNickname} ${innerCommentsText2}`;
		if (getUserInfo === null) {
			alert('로그인 후 작성 가능합니다.');
		} else {
			try {
				axios
					.post(`${url.file}/PostCommentInsert`, {
						post_id: post[0].post_id,
						id: getUserInfo === null ? '' : getUserInfo.id,
						content: innerCommentsText || text,
						cmt_group: commentId || commentInnerId,
					})
					.then(res => {
						setCommentId(0);
						setCommentInnerId(0);
						setCommentsText('');
						setFlag(!flag);
					});
			} catch (e) {
				console.error(e);
			}
			setInnerCommentsText('');
			setLockState(false);
			setLockSeconedState(false);
		}
	};

	const openInnerComment = e => {
		setCommentId(e.community_cmt_id);
		setInnerCommentsText('');
		commentId === e.community_cmt_id && setCommentId(0);
	};
	const openInnerComment2 = e => {
		setCommentInnerNickname(e.writer);
		setCommentInnerId(e.community_cmt_id);
		commentInnerId === e.community_cmt_id && setCommentInnerId(0);
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
			try {
				axios
					.post(`${url.file}/PostCommentUpdate`, {
						community_cmt_id: commentFixId,
						post_id: post[0].post_id,
						id: getUserInfo === null ? '' : getUserInfo.id,
						content: commentsUpdateText,
					})
					.then(res => {
						setCommentsText('');
						setFlag(!flag);
					});
			} catch (e) {
				console.error(e);
			}
			setLcokFixState(false);
		}
	};

	const updateCommnetInner = e => {
		if (getUserInfo === null) {
			alert('로그인 후 작성 가능합니다.');
		} else {
			try {
				axios
					.post(`${url.file}/PostCommentUpdate`, {
						community_cmt_id: e.community_cmt_id,
						post_id: post[0].post_id,
						id: getUserInfo === null ? '' : getUserInfo.id,
						content: innerCommentsUpdateText,
					})
					.then(res => {
						setCommentsText('');
						setInnerCommentFixId(0);
						setFlag(!flag);
					});
			} catch (e) {
				console.error(e);
			}
			setLcokFixState(false);
		}
	};

	return (
		<div className="CommuntyComment">
			{reportModalState && (
				<ReportModal
					isReportModalState={isReportModalState}
					reportModalState={reportModalState}
					infoCommunity={commentFixId === 0 ? post[0] : commentFixId}
					setCommentFixId={setCommentFixId}
				/>
			)}
			<div className="CommuntyComment--List">
				{commentList.length > 0
					? commentList.map((item, index) => {
							return (
								index >= paging * perPage - perPage &&
								index < paging * perPage && (
									<div className="commentBox" key={index}>
										<div className="profile--box">
											<img
												className="profile"
												src={
													!!item.avatar_url ? item.avatar_url : defaultAvatar
												}
											/>
											<div className="commentInfo">
												<div className="nickName">
													{item.nickname}
													<div className="display">{item.writer}</div>
													<div className="btnBox">
														{getUserInfo === null ? (
															''
														) : item.writer === getUserInfo.nickName ? (
															<>
																<button
																	className="btn"
																	onClick={() => {
																		openCommentsFix(item.community_cmt_id);
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
															onClick={() => {
																isReportModalState(!reportModalState);
																setCommentFixId(item);
															}}
														>
															신고
														</button>
														<button
															className="btn"
															onClick={() => {
																openInnerComment(item);
															}}
														>
															대댓글{' '}
															{item.commentTo.length > 0
																? `(${item.commentTo.length})`
																: ''}
														</button>
													</div>
												</div>

												{/* *** 댓글 수정 컴포넌트 *** */}
												{/* ********************** */}
												{commentFixId === item.community_cmt_id ? (
													<div className="CommuntyComment--Insert innerFix">
														<textarea
															value={commentsUpdateText}
															onChange={e => {
																setCommentsUpdateText(e.target.value);
															}}
														/>
														{/* <button
															onClick={() => setLcokFixState(!lockFixState)}
														>
															<img
															className={
																lockFixState ? 'lockImg on' : 'lockImg'
															}
															src={lockImg}
															alr="lock"
														/>
														</button> */}
														<button
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
													{moment(item.createdAt).format('YYYY.MM.DD h:mm a')}
												</div>
											</div>
										</div>

										<Fragment>
											{/* *** 대댓글 리스트*** */}
											{/* ********************** */}
											{item.commentTo.map((inner, index) => {
												return (
													<div className="innerComment--box result" key={index}>
														<div className="mark" />
														<div className="profile--box">
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
																	{inner.writer}
																	{/* <div className="display">{item.writer}</div> */}
																	<div className="btnBox inner">
																		{getUserInfo === null ? (
																			''
																		) : inner.writer ===
																		  getUserInfo.nickName ? (
																			<>
																				<button
																					className="btn"
																					onClick={() => {
																						isInnerFix(inner.community_cmt_id);
																						setInnerCommentsUpdateText(
																							inner.content,
																						);
																					}}
																				>
																					수정
																				</button>
																				<button
																					className="btn"
																					onClick={() => isDelete(inner)}
																				>
																					삭제
																				</button>
																			</>
																		) : (
																			''
																		)}
																		<button
																			className="btn"
																			onClick={() => {
																				openInnerComment2(item);
																			}}
																		>
																			대댓글
																		</button>
																	</div>
																</div>

																{/* *** 대댓글 수정 컴포넌트 *** */}
																{/* ********************** */}
																{innerCommentFixId ===
																inner.community_cmt_id ? (
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
																			onClick={() =>
																				setInnerLcokFixState(!innrLockFixState)
																			}
																		>
																			{/* <img
																					className={
																						innrLockFixState
																							? 'lockImg on'
																							: 'lockImg'
																					}
																					src={lockImg}
																					alr="lock"
																				/> */}
																		</button>
																		<button
																			className="insert--btn"
																			onClick={() => {
																				updateCommnetInner(inner);
																			}}
																		>
																			수정
																		</button>
																	</div>
																) : (
																	<div className="commnet">{inner.content}</div>
																)}

																<div className="date">
																	{moment(item.createdAt).format(
																		'YYYY.MM.DD h:mm a',
																	)}
																</div>
															</div>
														</div>
													</div>
												);
											})}
											{commentId === item.community_cmt_id ? (
												<div className="innerComment--box">
													<div className="mark" />
													<div className="CommuntyComment--Insert">
														<textarea
															value={innerCommentsText}
															onChange={e => {
																setInnerCommentsText(e.target.value);
															}}
														/>

														<button
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
											) : (
												''
											)}
											{commentInnerId === item.community_cmt_id ? (
												<div className="innerComment--box">
													<div className="mark" />
													<div className="CommuntyComment--Insert">
														<textarea
															value={innerCommentsText2}
															onChange={e => {
																setInnerCommentsText2(e.target.value);
															}}
														/>
														<button
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
											) : (
												''
											)}
										</Fragment>
									</div>
								)
							);
					  })
					: ''}
				<div className="pageNation--box">
					{commentList.length > 0 && (
						<Pagination
							perPage={perPage}
							status={paging}
							listCnt={[].length}
							changePage={page => setPaging(page)}
						/>
					)}
				</div>
			</div>
			<div className="CommuntyComment--Insert mobileBottom">
				<textarea
					value={commentsText}
					onChange={e => {
						setCommentsText(e.target.value);
					}}
				/>
				{/* <button  onClick={() => setLockState(!lockState)}>
					<img
						className={lockState ? 'lockImg on' : 'lockImg '}
						// src={lockImg}
						alr="lock"
					/>
				</button> */}
				<button
					className="insert--btn d"
					onClick={() => {
						if (getUserInfo === null) {
							alert('로그인 후 작성 가능합니다.');
						} else {
							writeComment();
						}
					}}
				>
					작성
				</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommuntyComment);
