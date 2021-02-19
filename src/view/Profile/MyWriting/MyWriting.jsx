import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';
import { connect } from 'react-redux';
import { selectCommunyNum } from '../../../store/MyPage/MyPage.store';
import './MyWriting.scss';
const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
const MyWriting = ({
	reqMyContantsList,
	myContantsList,
	deleteMyContents,
	leaguenoticeState,
	selectCommunyNum,
}) => {
	let history = useHistory();
	const [checked, setChecked] = useState(0);
	const [flag, setFlag] = useState(false);
	const [select, setSelect] = useState('written');
	const [comments, setComments] = useState([]);

	const checkedBtn = e => {
		if (e.target.id === checked) {
			setChecked(0);
		} else {
			setChecked(e.target.id);
		}
	};

	const deleteBtn = () => {
		deleteMyContents(checked);
		setFlag(!flag);
	};

	useEffect(() => {
		reqMyContantsList();
	}, [leaguenoticeState]);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/MyComments`, {
					// crew_id: linkInfo.crew_id,
					// nickname: linkInfo.nickname,
					id: getUserInfo.id,
				})
				.then(res => {
					setComments(res.data.Info.my_comments);
				});
		} catch (e) {
			console.error(e);
		}
	}, []);

	const goLink = item => {
		item.category === 'league' && history.push(`./league/${item.refer_id}`);
		item.category === 'crew' && history.push(`colleague`);
		if (item.category === 'community') {
			history.push('/community');
			selectCommunyNum(item.id);
		}
	};

	return (
		<div className="MyWriting">
			<div className="title--box">
				<button
					className={select === 'written' ? 'title' : 'title white'}
					onClick={() => {
						setSelect('written');
					}}
				>
					내가 쓴 글
				</button>
				<button
					className={select === 'comments' ? 'title' : 'title white'}
					onClick={() => {
						setSelect('comments');
					}}
				>
					내가 쓴 댓글
				</button>
			</div>
			<div className="category--container">
				<div className="categoryContents--box">
					{/* <div className="checkBox--box">
						<div className="checkBox" />
					</div> */}
					<div className="caterory--box ">
						<div className="categoryTitle first">카테고리</div>
						<div className="categoryTitle second">제목</div>
						<div className="categoryTitle third">작성일</div>
					</div>
				</div>
				{select === 'written' ? (
					<>
						{myContantsList &&
							myContantsList.map((item, index) => {
								return (
									<>
										<div
											className="categoryContents--box"
											type="button"
											onClick={() => goLink(item)}
										>
											{/* <div className="checkBox--box" key={index}>
												<input
													type="checkbox"
													id={item.crew_id}
													className="checkBox"
													checked={`${item.crew_id}` === checked ? true : false}
													onClick={e => checkedBtn(e)}
												/>
											</div> */}
											<div className="caterory--box" key={index}>
												<div className="categoryTitle first">
													{item.category === 'crew' && '동료찾기'}
													{item.category === 'community' && '커뮤니티'}
													{item.category === 'league' && '리그'}
												</div>
												{window.innerWidth < 769 ? (
													<div className="categoryTitle second">
														{item.title.length > 47
															? `${item.title.substring(0, 48)}...`
															: item.title}
													</div>
												) : (
													<div className="categoryTitle second">
														{item.title.length > 60
															? `${item.title.substring(0, 62)}...`
															: item.title}
													</div>
												)}

												<div className="categoryTitle third">
													{item.createdAt.substring(0, 10)}
												</div>
											</div>
										</div>
									</>
								);
							})}
					</>
				) : (
					<>
						{comments.map((item, index) => {
							return (
								<>
									<div
										className="categoryContents--box poiner"
										type="button"
										onClick={() => goLink(item)}
									>
										{/* <div className="checkBox--box" key={index}>
											<input
												type="checkbox"
												// id={item.crew_id}
												className="checkBox"
												// checked={`${item.crew_id}` === checked ? true : false}
												onClick={e => checkedBtn(e)}
											/>
										</div> */}
										<div className="caterory--box" key={index}>
											<div className="categoryTitle first">
												{item.category === 'crew' && '동료찾기'}
												{item.category === 'community' && '커뮤니티'}
												{item.category === 'league' && '리그'}
											</div>
											{window.innerWidth < 769 ? (
												<div className="categoryTitle second">
													{item.content.length > 47
														? `${item.content.substring(0, 48)}...`
														: item.content}
												</div>
											) : (
												<div className="categoryTitle second">
													{item.content.length > 60
														? `${item.content.substring(0, 62)}...`
														: item.content}
												</div>
											)}

											<div className="categoryTitle third">
												{item.createdAt.substring(0, 10)}
											</div>
										</div>
									</div>
								</>
							);
						})}
					</>
				)}
			</div>
			{/* <div className="btn--box">
				<button onClick={deleteBtn}>삭제</button>
			</div> */}
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		selectCommunyNum: info => dispatch(selectCommunyNum(info)),
	};
};

export default connect(null, mapDispatchToProps)(MyWriting);
