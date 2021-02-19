import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import { connect } from 'react-redux';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';

import './ReviewDetailModal.scss';
import Title from '../Title/Title';
import Button from '../Button/Button';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import Switch from '../Switch/Switch';
import StarRating from '../StarRating/StarRating';

import grayStar from '../../static/images/Card/grayStar.svg';
import tag from '../../static/images/Card/grayTag.svg';

import { insertReviewUpdate } from '../../store/GameInfo/GameInfo.store';

import { StarRatingText } from '../../assets/dummyData/ReviewData';

const ReviewDetailModal = ({
	info,
	isOpen,
	close,
	insertReview,
	setModal,
	profileSubMenu,
	insertReviewUpdate,
	cardInfo,
	staticProps,
}) => {
	useEffect(() => {
		if (info.my_review === null) {
			('');
		} else {
			setScore({
				fun_score: info.my_review && info.my_review.fun_score,
				complete_score: info.my_review && info.my_review.complete_score,
				difficulty_score: info.my_review && info.my_review.difficulty_score,
				operate_score: info.my_review && info.my_review.operation_score,
			});
			setEvaluation_content_myGame(
				info.my_review && info.my_review.evaluation_content,
			);
			setTotal(info.my_review && info.my_review.total_score);
		}
	}, [isOpen]);

	const [scores, setScore] = useState(
		info.my_review === null
			? ''
			: {
					fun_score: !!info.review ? info.my_review.fun_score : '',
					complete_score: !!info.review ? info.my_review.complete_score : '',
					difficulty_score: !!info.review
						? info.my_review.difficulty_score
						: '',
					operate_score: !!info.review ? info.my_review.operation_score : '',
			  },
	);
	// const [total_score, setTotal] = useState(
	// 	!!info.review ? info.review.total_score : 0,
	// );
	const [total_score, setTotal] = useState(
		info.my_review && info.my_review.total_score,
	);
	const [score_text, setText] = useState(null);
	// const [evaluation_content, setEveluate] = useState(
	// 	!!info.review ? info.review.evaluation_content : '',
	// );
	const [evaluation_content, setEveluate] = useState('');
	// (!!cardInfo && cardInfo.evaluation_content)
	const [evaluation_content_myGame, setEvaluation_content_myGame] = useState(
		info.my_review && info.my_review.evaluation_content,
	);

	const { fun_score, complete_score, difficulty_score, operate_score } = scores;

	const [flag, setFlag] = useState(false);
	const onClickSwitch = e => {
		const name = e.target.parentNode.getAttribute('name');
		const switchName = e.currentTarget.getAttribute('name');

		setScore({
			...scores,
			[name]: switchName,
		});
	};

	const onChangeStar = e => {
		const { value } = e.target;
		setTotal(value);
		setText(StarRatingText[Math.ceil(value) - 1]);
	};

	const onChangeText = e => {
		setEveluate(e.target.value);
	};
	const onChangeTextMyGame = e => {
		setEvaluation_content_myGame(e.target.value);
	};

	const onClickSubmit = () => {
		if (info.my_review !== null) {
			const review_id = info.my_review && info.my_review.review_id;
			insertReviewUpdate(
				// cardInfo.game_id.toString(),
				review_id,
				fun_score,
				complete_score,
				difficulty_score,
				operate_score,
				total_score,
				evaluation_content_myGame,
			);
			setTotal(0);
			setEveluate('');
			setModal(false);
		} else {
			if (total_score === 0) {
				alert('별점이 선택되지 않았어요.');
			} else {
				insertReview(
					info.info.game_id.toString(),
					fun_score,
					complete_score,
					difficulty_score,
					operate_score,
					total_score,
					evaluation_content,
				);
				setTotal(0);
				setEveluate('');
				setModal(false);
			}
		}
	};

	return (
		<Modal className="ReviewModal" close={close} isOpen={isOpen}>
			{window.innerWidth < 769 ? (
				<div className="ReviewModal--Header__mobile">
					<button className="back" onClick={close}>
						{'<'}
					</button>
					<div className="review__title">후기 작성</div>
					<button className="review__make" onClick={() => onClickSubmit()}>
						작성
					</button>
				</div>
			) : (
				<div className="ReviewModal--Header">
					<Title size="large" border="thick" className="large--title">
						후기 작성
					</Title>
					<Button
						size="medium"
						onClick={() => onClickSubmit()}
						// disabled={!!info.review}
					>
						리뷰 등록
					</Button>
				</div>
			)}

			<div className="ReviewModal--GameInfo">
				<img className="poster" src={info.info && info.info.img_src} />
				<div className="info--section">
					<div className="title">{info.info && info.info.game_title_kr}</div>
					<div className="game-rating">
						<TextWithIcon icon={grayStar}>
							{staticProps && staticProps.total_score}
						</TextWithIcon>
					</div>
					<div className="tag">
						<TextWithIcon icon={tag}>
							{info.info &&
								info.info.game_tag_kr.split(',').map((tag, index) => {
									if (index < 9)
										return (
											<div className="tag-span" key={index}>{`#${tag}`}</div>
										);
								})}
						</TextWithIcon>
					</div>
					<div className="line" />
				</div>
			</div>
			<div className="ReviewModal--Switches">
				<div className="switch">
					<div className="title">재미</div>
					<Switch
						onClickSwitch={onClickSwitch}
						handler={() => switchHandler}
						name="fun_score"
						good="재미있어요"
						bad="별로예요"
						value={fun_score}
					/>
				</div>
				<div className="switch end">
					<div className="title">완성도</div>
					<Switch
						onClickSwitch={onClickSwitch}
						handler={() => switchHandler}
						name="complete_score"
						good="좋아요"
						bad="아쉬워요"
						value={complete_score}
					/>
				</div>
				<div className="switch">
					<div className="title">난이도</div>
					<Switch
						onClickSwitch={onClickSwitch}
						handler={() => switchHandler}
						name="difficulty_score"
						good="쉬워요"
						bad="어려워요"
						value={difficulty_score}
					/>
				</div>
				<div className="switch end">
					<div className="title">운영</div>
					<Switch
						onClickSwitch={onClickSwitch}
						handler={() => switchHandler}
						name="operate_score"
						good="만족해요"
						bad="아쉬워요"
						value={operate_score}
					/>
				</div>
				<div className="ReviewModal--StarRating">
					<div className="title">
						총점
						{/* <span>*</span> */}
					</div>
					<div className="Star--rating">
						<StarRating
							className="star--rating"
							onChangeStar={onChangeStar}
							totalScore={total_score || (!!cardInfo && cardInfo.total_score)}
						/>
						<div className="rating--title">{score_text}</div>
					</div>
				</div>
				<div className="ReviewModal--Textarea">
					<div className="title">
						상세 후기 작성
						{/* <div className="stamp">
							상세 후기 쓰고 <span className="blue">스탬프</span> 받기!
						</div> */}
					</div>
					{info.my_review !== null ? (
						<textarea
							className="write-review__area"
							placeholder="리뷰를 작성해주세요 (100자 이상 작성시 특별 스탬프 제공!) &#13;&#10;#태그 로 걸 경우 태그로 검색됩니다:)"
							id="review_area"
							onChange={e => onChangeTextMyGame(e)}
							value={evaluation_content_myGame}
						/>
					) : (
						<textarea
							className="write-review__area"
							placeholder={`리뷰를 작성해주세요\n(100자 이상 작성시 특별 스탬프 제공!)\n#태그 로 걸 경우 태그로 검색됩니다:)`}
							id="review_area"
							onChange={e => onChangeText(e)}
							value={evaluation_content}
						/>
					)}

					<div className="warning">
						무성의한 리뷰 작성시 보상이 취소될 수 있습니다
					</div>
				</div>
			</div>
		</Modal>
	);
};

const mapStateToProps = state => {
	return {
		profileSubMenu: state.layout.profileSubMenu,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		insertReviewUpdate: (
			review_id,
			fun_score,
			complete_score,
			difficulty_score,
			operation_score,
			total_score,
			evaluation_content,
		) =>
			dispatch(
				insertReviewUpdate(
					review_id,
					fun_score,
					complete_score,
					difficulty_score,
					operation_score,
					total_score,
					evaluation_content,
				),
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewDetailModal);
