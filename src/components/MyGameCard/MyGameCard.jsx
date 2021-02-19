import React, { useState } from 'react';

import classNames from 'classnames';
import MyGameButton from '../../components/MyGameButton/MyGameButton';

import Like from '../../static/images/Card/WhiteCircleHeart@3x.png';
import Liked from '../../static/images/Card/BlueCircleHeart@3x.png';
import Alarm from '../../static/images/Card/WhiteCircleAlarm@3x.png';
import Alarmed from '../../static/images/Card/BlueCircleAlarm@3x.png';

import StarBlue from '../../static/images/Card/starBlue.svg';
import StarGray from '../../static/images/Card/starGray.svg';
import StarHalf from '../../static/images/Card/starHalf.svg';

import Media from 'react-media';
import ReviewModal from '../ReviewModal/ReviewModal';
import StarRating from '../StarRating/StarRating';

import './MyGameCard.scss';
const MyGameCard = ({ cardInfo, insertReview }) => {
	const [modal, setModal] = useState(false);

	return (
		<div className={classNames('MyGameCard')}>
			<ReviewModal
				cardInfo={cardInfo}
				info={cardInfo.game_info}
				isOpen={modal}
				close={() => setModal(false)}
				insertReview={insertReview}
				setModal={setModal}
			/>
			<Media query={{ maxWidth: 768 }}>
				{matches =>
					matches ? (
						<>
							<div className="MyGameCard__info" onClick={() => setModal(true)}>
								<img
									className="MyGameCard__poster"
									src={!!cardInfo && cardInfo.game_info.img_src}
								/>
								<div className="info__header">
									<div className="title">
										{!!cardInfo && cardInfo.game_info.game_title_kr}
									</div>
									<div className="icons">
										{/* <img src={ like ? Liked : Like }/> */}
										<img src={!!cardInfo.price_alarm ? Liked : Like} />
									</div>
								</div>
							</div>
							<div
								className="MyGameCard__reviews"
								onClick={() => setModal(true)}
							>
								<div className="info__rating">
									<div className="rating-star">
										{!!cardInfo && cardInfo.total_score === '0.5' && (
											<div className="star--box">
												<img src={StarHalf} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '1' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '1.5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarHalf} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '2' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '2.5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarHalf} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '3' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '3.5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarHalf} />
												<img src={StarGray} />
											</div>
										)}
										{cardInfo.total_score === '4' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '4.5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarHalf} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
											</div>
										)}
										<div className="rating-text">
											{!!cardInfo.evaluation_content &&
											cardInfo.evaluation_content.length > 29
												? `${!!cardInfo.evaluation_content &&
														cardInfo.evaluation_content.substring(0, 30)}...`
												: cardInfo.evaluation_content}
										</div>
									</div>
									<div className="rating-buttons">
										<div className="btn-mobile--box">
											<MyGameButton
												rating={!!cardInfo && cardInfo.fun_score}
												good="재미있어요"
												bad="별로예요"
											/>
											<MyGameButton
												rating={!!cardInfo && cardInfo.difficulty_score}
												good="쉬워요"
												bad="어려워요"
											/>
										</div>
										<div className="btn-mobile--box right">
											<MyGameButton
												rating={!!cardInfo && cardInfo.complete_score}
												good="좋아요"
												bad="별로예요"
											/>
											<MyGameButton
												rating={!!cardInfo && cardInfo.operation_score}
												good="만족해요"
												bad="아쉬워요"
											/>
										</div>
									</div>
								</div>

								{/* {!!cardInfo.evaluation_content &&
								cardInfo.evaluation_content.length > 100 ? (
									<div className="info__review">
										<div className="title">ㅇ</div>
										<div className="review">{cardInfo.evaluation_content}</div>
									</div>
								) : (
									<div className="info__none-review">
										<div className="none-review-title">
											상세 후기 쓰고
											<span className="blue">&nbsp;스탬프&nbsp;</span> 받기!
										</div>
										<div
											className="review-button"
											onClick={() => setModal(true)}
										>
											리뷰 쓰기
										</div>
									</div>
								)} */}
							</div>
						</>
					) : (
						<>
							<img
								className="MyGameCard__poster"
								src={!!cardInfo && cardInfo.game_info.img_src}
								type="button"
								onClick={() => setModal(true)}
							/>
							<div
								className="MyGameCard__info"
								type="button"
								onClick={() => setModal(true)}
							>
								<div className="info__header">
									<div className="title">
										{!!cardInfo && cardInfo.game_info.game_title_kr}
									</div>
									<div className="icons">
										{/* <img src={ like ? Liked : Like }/> */}
										<img src={!!cardInfo.price_alarm ? Liked : Like} />
									</div>
								</div>
								<div className="info__rating">
									<div className="rating-star">
										{!!cardInfo && cardInfo.total_score === '0.5' && (
											<div className="star--box">
												<img src={StarHalf} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '1' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '1.5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarHalf} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '2' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarGray} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '2.5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarHalf} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '3' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarGray} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '3.5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarHalf} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '4' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarGray} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '4.5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarHalf} />
											</div>
										)}
										{!!cardInfo && cardInfo.total_score === '5' && (
											<div className="star--box">
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
												<img src={StarBlue} />
											</div>
										)}
										<div className="rating-text">
											{!!cardInfo.evaluation_content &&
											cardInfo.evaluation_content.length > 29
												? `${!!cardInfo.evaluation_content &&
														cardInfo.evaluation_content.substring(0, 30)}...`
												: cardInfo.evaluation_content}
										</div>
									</div>
									<div className="rating-buttons">
										<MyGameButton
											rating={!!cardInfo && cardInfo.fun_score}
											good="재미있어요"
											bad="별로예요"
										/>
										<MyGameButton
											rating={!!cardInfo && cardInfo.complete_score}
											good="쉬워요"
											bad="어려워요"
										/>
										<MyGameButton
											rating={!!cardInfo && cardInfo.difficulty_score}
											good="좋아요"
											bad="별로예요"
										/>
										<MyGameButton
											rating={!!cardInfo && cardInfo.operation_score}
											good="만족해요"
											bad="아쉬워요"
										/>
									</div>
								</div>
								{/* {!!cardInfo.evaluation_content &&
								cardInfo.evaluation_content.length > 100 ? (
									<div className="info__review">
										<div className="title">상세리뷰</div>
										<div className="review">{cardInfo.evaluation_content}</div>
									</div>
								) : (
									<div className="info__none-review">
										<div className="none-review-title">
											상세 후기 쓰고
											<span className="blue">&nbsp;스탬프&nbsp;</span> 받기!
										</div>
										<div
											className="review-button"
											onClick={() => setModal(true)}
										>
											리뷰 쓰기
										</div>
									</div>
								)} */}
							</div>
						</>
					)
				}
			</Media>
		</div>
	);
};

export default MyGameCard;
