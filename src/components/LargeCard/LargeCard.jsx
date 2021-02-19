import React, { useState, Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

import BlueStar from '../../static/images/Card/blue-star@3x.png';
import Tag from '../../static/images/Card/tag@3x.png';
import NoPoster from '../../static/images/Card/no_image@3x.png';
import Company from '../../static/images/Card/company@3x.png';
import Calendar from '../../static/images/Card/Calendar@3x.png';
import ThumbUp from '../../static/images/Card/ThumbUp@3x.png';
import ThumbDown from '../../static/images/Card/ThumbDown@3x.png';
import Button from '../../components/Button/Button';
import { reqCurating } from '../../store/GameInfo/GameInfo.store';

import './LargeCard.scss';
import PercentageBar from '../PercentageBar/PercentageBar';
import ReviewInfoModal from '../ReviewInfoModal/ReviewInfoModal';
import ModalCuratingBalloon from '../ModalCuratingBalloon/ModalCuratingBalloon';
import Media from 'react-media';
import { isModalState } from '../../store/GameInfo/GameInfo.store';
import { reqGetMyCurating } from '../../store/MyPage/MyPage.store';

import { parseDate } from '../../Utils/utils';
const LargeCard = ({
	info,
	className,
	visible,
	userInfo,
	insertReview,
	myCuratingList,
	reqGetMyCurating,
	gameInfo,
	modalState,
	isModalState,
	...rest
}) => {
	const getUserInfo = JSON.parse(localStorage.getItem('data'));
	const tags = !!info && !!info.game_tag_kr && info.game_tag_kr.split(',');
	const [modal, setModal] = useState(false);
	const [thisCurating, setCurating] = useState(false);

	const [goodReview, setGoodReview] = useState('');
	const [badReview, setBadReview] = useState('');

	useEffect(() => {
		if (!!info && info.review !== null) {
			if (!!info && info.review.length < 2) {
				if (!!info && info.review[0].total_score >= 3.5) {
					setGoodReview(!!info && info.review[0].evaluation_content);
					setBadReview('');
				} else if (!!info && info.review[0].total_score < 3.5) {
					setBadReview(!!info && info.review[0].evaluation_content);
					setGoodReview('');
				}
			} else if (!!info && info.review.length > 1) {
				if (!!info && info.review[0].total_score >= 3.5) {
					setGoodReview(!!info && info.review[0].evaluation_content);
					setBadReview(!!info && info.review[1].evaluation_content);
				} else if (!!info && info.review[0].total_score < 3.5) {
					setBadReview(!!info && info.review[0].evaluation_content);
					setGoodReview(!!info && info.review[1].evaluation_content);
				}
			}
		}
	}, [info]);

	return (
		<Fragment>
			<div className={classNames('LargeCard')}>
				{info != null && (
					<Fragment>
						<div
							className="Curating"
							className={thisCurating ? 'Curating--balloon' : 'LargeCard--none'}
						>
							<ModalCuratingBalloon
								close={setCurating}
								userInfo={userInfo}
								curating={thisCurating}
								game_id={info.game_id}
							/>
						</div>
						<ReviewInfoModal
							info={info}
							isOpen={modal}
							close={() => setModal(false)}
							insertReview={insertReview}
							setModal={setModal}
						/>
						<header>
							<Link to={`/info/${info.game_id}`}>
								<div className="title">
									{!!info.game_title_kr ? info.game_title_kr : info.game_title}
								</div>
							</Link>
							<div className="rating">
								<img src={BlueStar} />
								{info.rating}
							</div>
							<div className="score">{!!info.score && info.score.score}</div>
						</header>

						<div className="LargeCard--infos">
							<div className="info__left">
								{window.innerWidth < 769 ? (
									''
								) : (
									<Link to={`/info/${info.game_id}`}>
										<img
											className="poster"
											alt="poster"
											src={info.img_src ? info.img_src : NoPoster}
										/>
									</Link>
								)}

								<div className="LargeCard--buttons">
									<Button
										size="medium"
										color="full-gray"
										onClick={() => {
											if (getUserInfo === null) {
												alert('로그인 이후 작성가능합니다.');
											} else {
												setModal(true);
											}
										}}
									>
										리뷰쓰기
									</Button>
									<Link to={`/info/${info.game_id}/#price`}>
										<Button className="btn" size="medium" color="full-gray">
											최저가 보기
										</Button>
									</Link>
									<Button
										size="medium"
										color="full-gray"
										onClick={() => {
											!!getUserInfo && !!getUserInfo.id
												? setCurating(!thisCurating)
												: alert('로그인 후 사용가능한 기능입니다');
											reqGetMyCurating();
										}}
									>
										큐레이팅
									</Button>
								</div>
							</div>
							<div className="info__right">
								<div className="info__right-text">
									<div className="publisher">
										<img src={Company} alt="company" />
										<div className="publisher-name">
											{info.game_developer} /{' '}
											{!!info.game_publisher
												? info.game_publisher
												: info.game_developer}
										</div>
									</div>
									<div className="release">
										<img src={Calendar} alt="calendar" />
										{parseDate(info.game_release_date)}
									</div>
									<div className="tags">
										<img src={Tag} alt="tag" />
										<div className="tag-list">
											{!!tags && tags[0] != ''
												? tags.map((tag, index) => {
														if (index < 10) {
															return `#${tag} `;
														}
												  })
												: `no-tag`}
										</div>
									</div>
								</div>
								{/* <Link to="/gamesinfo/123" className="link-to"> */}
								<div className="info__right-text detail-text">
									<Link to={`/info/${info.game_id}`}>
										{info.game_desc && info.game_desc.length > 120
											? `${info.game_desc.substring(0, 120)}...`
											: info.game_desc}
									</Link>
								</div>
								{/* </Link> */}
							</div>
						</div>
						<div className="LargeCard--review">
							{!!info.percentage ? (
								<>
									<div className="review__titles">
										{!!info.score && info.score.score >= 3.5 ? '' : ''}
										<div className="title-good">
											<div className="title__main">
												<img src={ThumbUp} alt="up" />
												긍정 리뷰 TOP
											</div>
											<div className="title__sub">
												{goodReview.length > 24
													? `${goodReview.substr(0, 25)}...`
													: goodReview}
											</div>
										</div>
										<div className="title-bad">
											<div className="title__main">
												부정 리뷰 TOP
												<img src={ThumbDown} alt="down" />
											</div>
											<div className="title__sub">
												{badReview.length > 24
													? `${badReview.substr(0, 25)}...`
													: badReview}
											</div>
										</div>
									</div>
								</>
							) : (
								<>
									<div className="review__none" onClick={() => setModal(true)}>
										<div className="text-top">등록된 리뷰가 없습니다.</div>
										<div className="text-bot">
											<span className="blue">리뷰</span>쓰고{' '}
											<span className="blue">스탬프</span> 받으러 가기
										</div>
									</div>
									<div className="review__titles">
										<div className="title-good">
											<div className="title__main">
												<img src={ThumbUp} alt="up" />
												긍정 리뷰 TOP
											</div>
											<div className="title__sub">
												{goodReview.length > 10
													? `${goodReview.substr(0, 11)}...`
													: goodReview}
											</div>
										</div>
										<div className="title-bad">
											<div className="title__main">
												부정 리뷰 TOP
												<img src={ThumbDown} alt="down" />
											</div>
											<div className="title__sub">
												{badReview.length > 10
													? `${badReview.substr(0, 11)}...`
													: badReview}
											</div>
										</div>
									</div>
								</>
							)}

							<div className="review__PercentageBar">
								<Media query={{ maxWidth: 768 }}>
									{matches =>
										matches ? (
											// <PercentageBar
											// 	like={
											// 		!!info.percentage
											// 			? info.percentage.positive * 100
											// 			: 80
											// 	}
											// 	hate={
											// 		!!info.percentage
											// 			? info.percentage.negative * 100
											// 			: 20
											// 	}
											// 	width={'100%'}
											// 	height={'15px'}
											// 	textVisible={false}
											// />
											<>
												{info.score !== null ? (
													<PercentageBar
														like={
															!!info.score && info.score.score >= 3.5
																? info.score.score * 20
																: info.score.score * 18
														}
														hate={!!info.score ? info.score.score * 0 : 0}
														width={'100%'}
														height={'21px'}
														textVisible={false}
													/>
												) : (
													''
												)}
											</>
										) : (
											<>
												{info.score !== null ? (
													<PercentageBar
														like={
															!!info.score && info.score.score >= 3.5
																? info.score.score * 20
																: info.score.score * 18
														}
														hate={!!info.score ? info.score.score * 0 : 0}
														width={'100%'}
														height={'21px'}
														textVisible={false}
													/>
												) : (
													''
												)}
											</>
										)
									}
								</Media>
							</div>
							<div className="review__more">
								<Link to={`/info/${info.game_id}/#review`}>
									<span>리뷰 더보기 </span>
								</Link>
							</div>
						</div>
					</Fragment>
				)}
			</div>
		</Fragment>
	);
};

LargeCard.defaultProps = {
	info: null,
};

const mapStateToProps = state => {
	return {
		gameInfo: state.gameInfo.gameInfo,
		modalState: state.gameInfo.modalState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		reqGetMyCurating: item => dispatch(reqGetMyCurating(item)),
		isModalState: info => dispatch(isModalState(info)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LargeCard);
