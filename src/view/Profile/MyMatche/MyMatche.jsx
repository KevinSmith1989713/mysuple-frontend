import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';
import moment from 'moment';

import {
	getHostLeagueList,
	getParticipatList,
	joinLeagueCancel,
} from '../../../store/League/League.store';

import pc from '../../../static/images/Colleague/pc.svg';
import mobile from '../../../static/images/Colleague/mobile.svg';
import consol from '../../../static/images/Colleague/consol.svg';
import defaultAvatar from '../../../static/images/Passport/default-avatar.svg';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';

import faceGood from '../../../static/images/Colleague/faceGood.svg';
import faceGoodGray from '../../../static/images/Colleague/faceGoodGray.svg';
import faceNomal from '../../../static/images/Colleague/faceNomal.svg';
import faceNomalGray from '../../../static/images/Colleague/faceNomalGray.svg';
import faceNotgood from '../../../static/images/Colleague/faceNotgood.svg';
import faceNotgoodOrange from '../../../static/images/Colleague/faceNotgoodOrange.svg';
import faceNotgoodGray from '../../../static/images/Colleague/faceNotgoodGray.svg';
import checkMark from '../../../static/images/Colleague/checkmark.svg';
import checkMarkGray from '../../../static/images/Colleague/checkmarkGray.svg';

import './MyMatche.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
const qeustionListGood = [
	{ qeustion: '게임실력이 좋아요!', value: 1 },
	{ qeustion: '인성이 참되었어요!', value: 2 },
	{ qeustion: '재미있어요!', value: 3 },
	{ qeustion: '', value: 4 },
];
const qeustionListNomal = [
	{ qeustion: '그저그랬어요…', value: 1 },
	{ qeustion: '투머치토커에요!', value: 2 },
	{ qeustion: '', value: 4 },
];
const qeustionListNotGood = [
	{ qeustion: '트롤이에요!', value: 1 },
	{ qeustion: '비속어와 욕설이 난무해요!', value: 2 },
	{ qeustion: '찝쩍거려요 ٩(๑`^´๑)۶', value: 3 },
	{ qeustion: '', value: 4 },
];
const MyMatche = ({}) => {
	const [matcheList, setMatcheList] = useState([]);
	const [select, setSelect] = useState('좋아요');
	const [selectQuestion, setSelectQuestion] = useState();
	const [text, setText] = useState('');
	const [userInfo, setUserInfo] = useState('');
	const [reviewModal, setReviewModal] = useState(false);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/MatchSelect`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
				})
				.then(res => {
					setMatcheList(res.data.Info.match);
				});
		} catch (e) {
			console.error(e);
		}
	}, [reviewModal]);

	const isEvaluation = () => {
		try {
			axios
				.post(`${url.file}/MatchUpdate`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					match_id: userInfo.match_id,
					user_feedback_obj_type:
						(select === '좋아요' && 1) ||
						(select === '보통이에요' && 2) ||
						(select === '별로에요' && 3),
					user_feedback_sub_type: selectQuestion,
					user_feedback_sub_contents:
						selectQuestion === 4 ? text : selectQuestion,
				})
				.then(res => {
					setMatcheList(res.data.Info.match);
					setReviewModal(!reviewModal);
				});
		} catch (e) {
			console.error(e);
		}
	};

	const isDelete = () => {
		try {
			axios
				.post(`${url.file}/MatchDelete`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					match_id: userInfo.match_id,
				})
				.then(res => {
					setReviewModal(!reviewModal);
				});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="MyPageMatche">
			<div className="title">나의 매치</div>
			{matcheList.map((item, idx) => {
				return (
					<div className="matche" key={idx}>
						<div className="matche__inner">
							<img
								className="profile"
								src={
									!!item.crew_owner_avatar_url
										? item.crew_owner_avatar_url
										: defaultAvatar
								}
							/>
							<div className="info--box">
								<div>
									<b>{item.crew_owner_nickname}</b> 님 과의 매치 어떠셨나요?
									평가해주세요.
								</div>
								<div className="game__info--box">
									<div className="info">
										<div className="game">
											<img
												className="gameImg"
												src={
													item.game_class === '0' || 0
														? pc
														: '' || item.game_class === '1' || 1
														? pc
														: '' || item.game_class === '2' || 2
														? mobile
														: consol
												}
											/>{' '}
											메이플스토리
										</div>
										<div className="gameTitle">{item.crew_title}</div>
										<div className="gameDate">
											{moment(item.crew_createdAt).format('YYYY.MM.DD')}{' '}
											{item.crew_createdAt.split('T')[1].substring(0, 5)}
										</div>
									</div>

									{item.user_feedback_obj_type === null ? (
										<button
											className="review__btn"
											onClick={() => {
												setReviewModal(!reviewModal);
												setUserInfo(item);
											}}
										>
											평가하기
										</button>
									) : (
										<div className="review__result--box">
											<div className="result">
												{item.user_feedback_obj_type === 1 &&
													item.user_feedback_sub_type === 1 &&
													'게임실력이 좋아요!'}
												{item.user_feedback_obj_type === 1 &&
													item.user_feedback_sub_type === 2 &&
													'인성이 참되었어요!'}
												{item.user_feedback_obj_type === 1 &&
													item.user_feedback_sub_type === 3 &&
													'재미있어요!'}
												{item.user_feedback_obj_type === 1 &&
													item.user_feedback_sub_type === 4 &&
													item.user_feedback_sub_contents}

												{item.user_feedback_obj_type === 2 &&
													item.user_feedback_sub_type === 1 &&
													'그저그랬어요…'}
												{item.user_feedback_obj_type === 2 &&
													item.user_feedback_sub_type === 2 &&
													'투머치토커에요!'}
												{item.user_feedback_obj_type === 2 &&
													item.user_feedback_sub_type === 4 &&
													item.user_feedback_sub_contents}

												{item.user_feedback_obj_type === 3 &&
													item.user_feedback_sub_type === 1 &&
													'트롤이에요!'}
												{item.user_feedback_obj_type === 3 &&
													item.user_feedback_sub_type === 2 &&
													'비속어와 욕설이 난무해요!'}
												{item.user_feedback_obj_type === 3 &&
													item.user_feedback_sub_type === 3 &&
													'찝쩍거려요 ٩(๑`^´๑)۶'}
												{item.user_feedback_obj_type === 3 &&
													item.user_feedback_sub_type === 4 &&
													item.user_feedback_sub_contents}
											</div>
											<img
												className="faceImg"
												src={
													(item.user_feedback_obj_type === 1 && faceGood) ||
													(item.user_feedback_obj_type === 3 &&
														faceNotgoodOrange) ||
													(item.user_feedback_obj_type === 2 && faceNomalGray)
												}
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				);
			})}

			{reviewModal && (
				<div className="ReviewModal">
					<div
						className="background"
						onClick={() => setReviewModal(!reviewModal)}
					/>

					<article className="modal--box">
						<div className="modal__title">
							<div className="info--box">
								<img
									className="profile"
									src={
										!!userInfo.crew_owner_avatar_url
											? userInfo.crew_owner_avatar_url
											: defaultAvatar
									}
								/>
								<div className="title--box">
									<div>{userInfo.crew_owner_nickname}</div>
									<div className="sub">플레이어님의 매너를 평가해주세요.</div>
								</div>
							</div>
							<button className="closeBtn--box" onClick={() => isDelete()}>
								<div className="img--box">
									<img className="closeBtn" src={closeBtnGray} />
								</div>
								<div className="text">
									게임하지
									<br />
									않았아요
								</div>
							</button>
						</div>

						<div className="modal--inner">
							<div className="face--box">
								<div
									type="button"
									className={
										select === '좋아요' ? 'face__btn select' : 'face__btn'
									}
									onClick={() => {
										setSelect('좋아요');
										setSelectQuestion(0);
										setText('');
									}}
								>
									<img src={select === '좋아요' ? faceGood : faceGoodGray} />
									<div>좋아요</div>
								</div>
								<div
									type="button"
									className={
										select === '보통이에요' ? 'face__btn select' : 'face__btn'
									}
									onClick={() => {
										setSelect('보통이에요');
										setSelectQuestion(0);
										setText('');
									}}
								>
									<img
										src={select === '보통이에요' ? faceNomal : faceNomalGray}
									/>
									<div>보통이에요</div>
								</div>
								<div
									type="button"
									className={
										select === '별로에요' ? 'face__btn select' : 'face__btn'
									}
									onClick={() => {
										setSelect('별로에요');
										setSelectQuestion(0);
										setText('');
									}}
								>
									<img
										src={select === '별로에요' ? faceNotgood : faceNotgoodGray}
									/>
									<div>별로에요</div>
								</div>
							</div>
							<div className="select--box">
								{select === '좋아요' && (
									<>
										{qeustionListGood.map((item, idx) => {
											return (
												<div
													className="qeustion"
													key={idx}
													type="button"
													onClick={() => setSelectQuestion(item.value)}
												>
													<img
														className="check"
														src={
															item.value === selectQuestion
																? checkMark
																: checkMarkGray
														}
													/>
													{item.qeustion}
													{item.value === 4 && (
														<input
															className="input"
															placeholder="기타사유"
															value={text}
															onChange={e => setText(e.target.value)}
														/>
													)}
												</div>
											);
										})}
									</>
								)}
								{select === '보통이에요' && (
									<>
										{qeustionListNomal.map((item, idx) => {
											return (
												<div
													className="qeustion"
													key={idx}
													type="button"
													onClick={() => setSelectQuestion(item.value)}
												>
													<img
														className="check"
														src={
															item.value === selectQuestion
																? checkMark
																: checkMarkGray
														}
													/>
													{item.qeustion}
													{item.value === 4 && (
														<input
															className="input"
															placeholder="기타사유"
															value={text}
															onChange={e => setText(e.target.value)}
														/>
													)}
												</div>
											);
										})}
									</>
								)}
								{select === '별로에요' && (
									<>
										{qeustionListNotGood.map((item, idx) => {
											return (
												<div
													className="qeustion"
													key={idx}
													type="button"
													onClick={() => setSelectQuestion(item.value)}
												>
													<img
														className="check"
														src={
															item.value === selectQuestion
																? checkMark
																: checkMarkGray
														}
													/>
													{item.qeustion}
													{item.value === 4 && (
														<input
															className="input"
															placeholder="기타사유"
															value={text}
															onChange={e => setText(e.target.value)}
														/>
													)}
												</div>
											);
										})}
									</>
								)}
							</div>
						</div>
						<button className="evaluationBtn" onClick={isEvaluation}>
							평가하기
						</button>
					</article>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		hostLeagueList: state.league.hostLeagueList,
		participatList: state.league.participatList,
		successState: state.layout.successState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getParticipatList: () => dispatch(getParticipatList()),
		getHostLeagueList: () => dispatch(getHostLeagueList()),
		joinLeagueCancel: (id, league_id, league_join_id) =>
			dispatch(joinLeagueCancel(id, league_id, league_join_id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyMatche);
