import React, { useState, useEffect } from 'react';
import './CommunityContainer.scss';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';

import { changeMenu } from '../../store/Layout/Layout.store';
import { isReportModalState } from '../../store/Auth/Auth.store';
import FroalaEditor from '../../components/FroalaEditor/FroalaEditor';
import Comment from '../../components/CommunityComment/CommunityComment';

import { timeForToday } from '../../Utils/func';
import ContentBoard from '../../components/ContentBoard/ContentBoard';
import Title from '../../components/Title/Title';
import ReportModal from '../../components/ReportModal/ReportModal';

import Search from '../../static/images/Chatting/search_sky.svg';
import tool from '../../static/images/League/tool.svg';
import photo from '../../static/images/photo_full.svg';
import chat from '../../static/images/Community/chatbubble.svg';
import like from '../../static/images/Community/likeGray.svg';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const system = [
	{ label: '자유익명게시판', value: 'free' },
	// { label: '3판2선', value: 'semifinal' },
	// { label: '팀전', value: 'multy' },
];

const CommunityContainer = ({
	communityNum,
	reportModalState,
	isReportModalState,
}) => {
	let history = useHistory();
	const [text, setText] = useState('');
	const [flag, setFlag] = useState(false);

	const [boardList, setBoardList] = useState([]);
	const [postList, setPostList] = useState([]);
	const [boardId, setBoardId] = useState(1);
	const [post, setPost] = useState([]);
	const [pageNum, setPageNum] = useState(1);

	const [postTotalNum, setPostTotalNum] = useState(0);

	// 글쓰기
	const [write, setWrite] = useState(false);
	const [writeTitle, setWriteTitle] = useState('');
	const [editor, setEditor] = useState('');
	const [category, setCategory] = useState([]);
	const [boardTitle, setBoardTitle] = useState('');

	const [boardCategoryId, setBoardCategoryId] = useState(1);
	//모바일 글쓰기
	const [open, setOpen] = useState('main');

	//댓글
	const [commentList, setCommentList] = useState([]);

	const onChange = e => {
		setText(e.target.value);
	};

	useEffect(() => {
		window.innerWidth < 769 && window.scrollTo({ top: 0 });
	}, [open]);

	// console.log(communityNum);
	const submit = () => {
		// searchLeague(
		// 	count,
		// 	leagueFilterType,
		// 	gameId,
		// 	text,
		// 	null,
		// 	leagueFilterState,
		// 	leagueFilterBanList,
		// );
	};

	useEffect(() => {
		try {
			axios.get(`${url.file}/BoardSelect`).then(res => {
				const result = res.data.Info.boards;
				setBoardList(result);
				const categoryList = [];
				result.map(item => {
					categoryList.push({ label: item.board_name, boardId: item.board_id });
					return;
				});
				setCategory(categoryList);
				setBoardTitle(categoryList[0].label);
			});
		} catch (e) {
			console.error(e);
		}
	}, []);

	useEffect(() => {
		if (post.length > 0) {
			try {
				axios
					.post(`${url.file}/Post1Select`, {
						post_id: post[0] && post[0].post_id,
					})
					.then(res => {
						if (res.data.Status === 'OK') {
							setCommentList(res.data.Info.comments.reverse());
						}
					});
			} catch (e) {
				console.error(e);
			}
		}
	}, [post, flag]);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/PostListSelect`, {
					board_id: boardId,
					page_num: pageNum,
				})
				.then(res => {
					setPostTotalNum(res.data.Info.post_list_num);
					setPostList(res.data.Info.post_list);
				});
		} catch (e) {
			console.error(e);
		}
	}, [boardId, write, pageNum, open]);

	const isBoardList = info => {
		setBoardId(info.board_id);
		setBoardTitle(info.board_name);
		setBoardCategoryId(info.board_id);
	};
	const selectCategory = [];
	category.map(item => {
		if (item.label === boardTitle) {
			selectCategory.push({ label: item.label, boardId: item.boardId });
		}
	});

	const writePost = () => {
		if (writeTitle === '') {
			alert('제목을 입력해주세요.');
		} else if (editor === '') {
			alert('내용을 입력해주세요.');
		} else {
			try {
				axios
					.post(`${url.file}/PostInsert`, {
						board_id: boardCategoryId,
						post_title: writeTitle,
						id: getUserInfo === null ? '' : getUserInfo.id,
						post_main_content: editor,
					})
					.then(res => {
						if (res.data.Status === 'OK') {
							window.innerWidth > 769 && setWrite(!write);
							window.innerWidth < 769 && setOpen('main');
							setWriteTitle('');
							setEditor('');
						}
					});
			} catch (e) {
				console.error(e);
			}
		}
	};

	const isPage = () => {
		const result = [];
		const pageNum = parseInt(postTotalNum / 30 + 1);
		for (let i = 1; i <= pageNum; i++) {
			result.push({ num: i });
		}
		return result;
	};

	return (
		<div className="CommunityContainer">
			{reportModalState && (
				<ReportModal
					isReportModalState={isReportModalState}
					reportModalState={reportModalState}
					infoCommunity={post[0]}
				/>
			)}
			{open === 'main' && (
				<>
					<Title border="thick" size="large"></Title>
					{!write ? (
						<>
							<div className="CommunityContainer--Input">
								<input
									className="search"
									placeholder="검색어를 입력하세요"
									onChange={onChange}
									value={text}
									onKeyPress={e => {
										if (e.charCode === 13) {
											submit();
										}
									}}
								/>
								<div className="img--box">
									<img
										className="img"
										src={Search}
										onClick={submit}
										type="button"
									/>
								</div>
							</div>
							<div className="category--box">
								<ul className="category--list">
									{boardList.map((item, idx) => {
										return (
											<li
												type="button"
												className={
													boardTitle === item.board_name
														? 'category select'
														: 'category'
												}
												key={idx}
												onClick={() => {
													isBoardList(item);
													setPageNum(1);
													setPost([]);
												}}
											>
												{item.board_name}
											</li>
										);
									})}
								</ul>
							</div>
							<div className="title--box">
								<div className="category__name">
									{boardTitle} <strong>게시판</strong>
								</div>
								<button
									className="write__btn"
									onClick={() => {
										setWrite(!write);
										setPost([]);
									}}
								>
									글쓰기
								</button>
							</div>
							<button
								className="make__community__mobile"
								onClick={() => setOpen('mobile__write')}
							>
								+
							</button>

							{post.map((item, idx) => {
								return (
									<div className="info--box" key={idx}>
										<div className="header--box">
											<div>{item.post_title}</div>
											<button
												className="report"
												onClick={() => isReportModalState(!reportModalState)}
											>
												신고
											</button>
										</div>
										<div className="profile">
											<img
												className="img"
												src={
													!!item.avatar_url ? item.avatar_url : defaultAvatar
												}
											/>
											<div className="name">{item.writer}</div>
											<div className="date">{timeForToday(item.createdAt)}</div>
										</div>
										<div
											className="desc"
											dangerouslySetInnerHTML={{
												__html: item.post_main_content,
											}}
										/>
										<div className="comments">
											<div className="text">
												<button>
													<img className="img" src={chat} />
													<strong>{commentList.length}</strong>
												</button>
												{/* <button>
													<img src={like} />
													<strong>12</strong>
												</button> */}
											</div>
											{/* <img className="more" src={Search} /> */}
										</div>

										<Comment
											post={post}
											commentList={commentList}
											flag={flag}
											setFlag={setFlag}
										/>
									</div>
								);
							})}

							{/* <div className="list--wrapper hot">
								<div className="listInfo__box">
									<div className="hot__text">HOT</div>
									<div className="list__title hotTitle">
										일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
									</div>
									<div className="img--box">
										<img src={chat} />
										12
									</div>
									<div className="img--box">
										<img src={like} />
										12
									</div>
								</div>
								<div className="list__date">1분전</div>
							</div> */}
							{window.innerWidth < 769 ? (
								<>
									{postList.map((item, idx) => {
										return (
											<div
												className="info--box mobile"
												key={idx}
												type="button"
												onClick={() => {
													setPost([item]);
													setOpen('mobile__detail');
												}}
											>
												<div className="header--box">
													<div className="post__title">{item.post_title}</div>
												</div>
												<div className="profile">
													<img
														className="img"
														src={
															!!item.avatar_url
																? item.avatar_url
																: defaultAvatar
														}
													/>
													<div className="name">{item.writer}</div>
													<div className="date">
														{timeForToday(item.createdAt)}
													</div>
												</div>
												<div
													className="desc"
													dangerouslySetInnerHTML={{
														__html: item.post_main_content,
													}}
												/>
												<div className="comments">
													<div className="text">
														{item.comment_num === 0 ? (
															''
														) : (
															<>
																{' '}
																<img className="chatImg" src={chat} />
																<strong>{item.comment_num}</strong>
															</>
														)}

														{/* <span>
															<img src={like} />
															<strong>12</strong>
														</span> */}
													</div>
													{/* <img className="more" src={Search} /> */}
												</div>
											</div>
										);
									})}
								</>
							) : (
								<>
									{postList.map((item, idx) => {
										return (
											<div
												type="button"
												className={
													item.post_id ===
													(post[0] === undefined ? '' : post[0].post_id)
														? 'list--wrapper listSelect'
														: 'list--wrapper'
												}
												key={idx}
												onClick={() => {
													setPost([item]);
													window.scrollTo({ top: 100, behavior: 'smooth' });
												}}
											>
												<div className="listInfo__box">
													<div
														className={
															item.post_id ===
															(post[0] === undefined ? '' : post[0].post_id)
																? 'hot__text number select'
																: 'hot__text number'
														}
													>
														{item.post_id}
													</div>
													<div className="list__title">{item.post_title}</div>
													{item.comment_num === 0 ? (
														''
													) : (
														<div className="img--box">
															<img src={chat} />
															{item.comment_num}
														</div>
													)}

													{/* <div className="img--box">
														<img src={like} />
														12
													</div> */}
												</div>
												<div className="nickname--box">
													<div>{item.writer}</div>
													<div className="list__date">
														{timeForToday(item.createdAt)}
													</div>
												</div>
											</div>
										);
									})}
								</>
							)}

							<div className="page--box">
								{isPage().map((item, idx) => {
									return (
										<span
											className={
												pageNum === item.num ? 'page pageSelect' : 'page'
											}
											key={idx}
											onClick={() => {
												setPageNum(item.num);
												window.scrollTo({ top: 0 });
											}}
										>
											{item.num}
										</span>
									);
								})}
							</div>
						</>
					) : (
						<>
							<div className="main">
								<Select
									className="select-form"
									defaultValue={selectCategory[0]}
									options={category}
									onChange={e => {
										setBoardCategoryId(e.boardId);
									}}
								/>
								<input
									className="title"
									placeholder="제목"
									value={writeTitle}
									onChange={e => setWriteTitle(e.target.value)}
								/>
								<FroalaEditor editorValue={e => setEditor(e)} editor={editor} />
							</div>
							<div className="btn--box">
								<button
									onClick={() => {
										setWrite(!write);
										setWriteTitle('');
										setEditor('');
									}}
								>
									목록으로
								</button>
								<button onClick={writePost}>글쓰기</button>
							</div>
						</>
					)}
				</>
			)}
			{open === 'mobile__write' && (
				<>
					<div className="write--wrapper">
						<div className="header">
							<button
								className="back__btn"
								onClick={() => {
									setOpen('main');
									setWriteTitle('');
									setEditor('');
								}}
							>
								{'<'}
							</button>
							<div className="info__title">글쓰기</div>
							<button
								className="submit"
								onClick={() => {
									writePost();
								}}
							>
								작성
							</button>
						</div>
						<div className="main">
							<Select
								className="select-form"
								defaultValue={selectCategory[0]}
								options={category}
								onChange={e => {
									setBoardCategoryId(e.boardId);
								}}
							/>
							<input
								className="title"
								placeholder="제목"
								value={writeTitle}
								onChange={e => setWriteTitle(e.target.value)}
							/>
							<FroalaEditor editorValue={e => setEditor(e)} editor={editor} />
						</div>
					</div>
				</>
			)}
			{open === 'mobile__detail' && (
				<>
					<div className="write--wrapper">
						<div className="header">
							<button
								className="back__btn"
								onClick={() => {
									setOpen('main');
									setPost([]);
								}}
							>
								{'<'}
							</button>
							<div className="info__title">상세보기</div>
							<button className="submit"></button>
						</div>
						{post.map((item, idx) => {
							return (
								<div className="info--box" key={idx}>
									<div className="header--box">
										<div>{item.post_title}</div>
									</div>
									<div className="profile">
										<img
											className="img"
											src={!!item.avatar_url ? item.avatar_url : defaultAvatar}
										/>
										<div className="name">{item.writer}</div>
										<div className="date">{timeForToday(item.createdAt)}</div>
									</div>
									<div
										className="desc"
										dangerouslySetInnerHTML={{
											__html: item.post_main_content,
										}}
									/>
									<div className="comments">
										<div className="text">
											<button>
												<img className="img" src={chat} />
												<strong>{commentList.length}</strong>
											</button>
											{/* <button>
													<img src={like} />
													<strong>12</strong>
												</button> */}
										</div>
										{/* <img className="more" src={Search} /> */}
									</div>

									<Comment
										post={post}
										commentList={commentList}
										flag={flag}
										setFlag={setFlag}
									/>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		communityNum: state.myPage.communityNum,
		reportModalState: state.auth.reportModalState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		isReportModalState: info => dispatch(isReportModalState(info)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityContainer);
