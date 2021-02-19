import React, { Fragment, useState, useEffect } from 'react';
import './GameInfoContainer.scss';
import { connect } from 'react-redux';
import { changeMenu } from '../../store/Layout/Layout.store';
import { insertReview } from '../../store/GameInfo/GameInfo.store';

import { useHistory } from 'react-router-dom';
import GameInfoHeader from '../../components/GameInfoHeader/GameInfoHeader';
import Title from '../../components/Title/Title';
import AccordionText from '../../components/AccordionText/AccordionText';
import OSTable from '../../components/OSTable/OSTable';
import TextWithIcon from '../../components/TextWithIcon/TextWithIcon';
import CardRadius from '../../components/CardRadius/CardRadius';
import ReviewTable from '../../components/ReviewTable/ReviewTable';
import PercentageBar from '../../components/PercentageBar/PercentageBar';
import ReviewDetailModal from '../../components/ReviewDetailModal/ReviewDetailModal';
import { StarRatingTextCtn } from '../../assets/dummyData/ReviewData';
import PlatformTable from '../../components/PlatformTable/PlatformTable';

import bgTop from '../../static/images/Info/info_BG_top.svg';
import bgBottom from '../../static/images/Info/info_BG_bottom.svg';
import heart from '../../static/images/Info/Heart.svg';

import BlueStar from '../../static/images/Card/blue-star@3x.png';
import GrayStar from '../../static/images/Card/grayStar.svg';

import costImg from '../../static/images/GameInfo/costImg.svg';
import infoImg from '../../static/images/GameInfo/infoImg.svg';
import reviewImg from '../../static/images/GameInfo/reviewImg.svg';

import Company from '../../static/images/Card/company@3x.png';
import calendar from '../../static/images/Card/Calendar@3x.png';
import tag from '../../static/images/Card/tag@3x.png';
import language from '../../static/images/GameInfo/Language@3x.png';
import player from '../../static/images/GameInfo/player@3x.png';
import age from '../../static/images/GameInfo/Age@3x.png';
import Media from 'react-media';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

const GameInfoContainer = ({ gameInfo, gamePrice, currency, insertReview }) => {
	let history = useHistory();
	const [modal, setModal] = useState(false);
	const [reviewDetailModal, setReviewDetailModal] = useState(false);
	const [cost, setCost] = useState(false);
	const [infoModal, setInfoModal] = useState(false);
	const game = !!gameInfo.info && gameInfo.info;
	const staticProps = gameInfo.statics;
	const reviews = !!gameInfo.review && gameInfo.review;
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [scrollTo]);
	useEffect(() => {}, [gameInfo.review]);

	return (
		<div className="GameInfoContainer">
			<ReviewDetailModal
				info={!!gameInfo && gameInfo}
				isOpen={modal}
				close={() => setModal(false)}
				insertReview={insertReview}
				setModal={setModal}
				staticProps={staticProps}
			/>
			<Media query={{ minWidth: 768 }}>
				<GameInfoHeader
					gameInfo={gameInfo}
					poster={game.img_src}
					title={game.game_title_kr}
					gameId={game.game_id}
					won={game.price_kr}
					dollar={game.price}
					gamePrice={gamePrice}
				/>
			</Media>
			<div className="GameInfoContainer--Header" id="price">
				<div className="header">
					<button className="back__btn" onClick={() => history.push('/info')}>
						{'<'}
					</button>
					<div className="info__title">{game.game_title_kr}</div>
					<button>
						<img src={heart} />
					</button>
				</div>
				<img className="poster" src={game.img_src} />
				<img className="top" src={bgTop} />
				<img className="bottom" src={bgBottom} />
				<div className="title--box">
					<p className="game__title">{game.game_title_kr}</p>
					<img className="start" src={BlueStar} />
					<span className="score">
						{staticProps && staticProps.total_score}
						<strong className="cnt">
							{StarRatingTextCtn.map(item => {
								const result =
									staticProps && staticProps.total_score === null
										? ''
										: staticProps &&
										  staticProps.total_score.toFixed(0) === item.id &&
										  item.text;
								return result;
							})}
						</strong>
					</span>
					<p className="participate">
						<b>{!!reviews && reviews.length}</b>명의 플레이어가 이 게임을
						평가하였습니다
					</p>
				</div>
			</div>
			{/* 모바일 Row--Review  */}
			{/* **************************** */}
			{/* **************************** */}
			<div className="mobile__Review--wrapper">
				<div className="Row--Review">
					{!!staticProps && (
						<Media query={{ minWidth: 768 }}>
							{matches =>
								matches ? (
									''
								) : (
									<div className="percentage--list">
										<div className="wrapper">
											<div className="title">재미</div>
											<div className="percentage">
												<PercentageBar
													width={'300px'}
													height={'21px'}
													hate={100 - Math.floor(staticProps.fun_score * 100)}
													like={Math.floor(staticProps.fun_score * 100)}
													textVisible={true}
													textSize={'12px'}
												/>
												<div className="percentage--text">
													<div className="good">재미있어요</div>
													<div className="bad">별로예요</div>
												</div>
											</div>
										</div>
										<div className="wrapper">
											<div className="title">난이도</div>
											<div className="percentage">
												<PercentageBar
													width={'300px'}
													height={'21px'}
													hate={
														100 - Math.floor(staticProps.difficulty_score * 100)
													}
													like={Math.floor(staticProps.difficulty_score * 100)}
													textVisible={true}
													textSize={'12px'}
												/>
												<div className="percentage--text">
													<div className="good">쉬워요</div>
													<div className="bad">어려워요</div>
												</div>
											</div>
										</div>
										<div className="wrapper">
											<div className="title">완성도</div>
											<div className="percentage">
												<PercentageBar
													width={'300px'}
													height={'21px'}
													hate={
														100 - Math.floor(staticProps.complete_score * 100)
													}
													like={Math.floor(staticProps.complete_score * 100)}
													textVisible={true}
													textSize={'12px'}
												/>
												<div className="percentage--text">
													<div className="good">좋아요</div>
													<div className="bad">아쉬워요</div>
												</div>
											</div>
										</div>
										<div className="wrapper">
											<div className="title">운영</div>
											<div className="percentage">
												<PercentageBar
													width={'300px'}
													height={'21px'}
													hate={
														100 - Math.floor(staticProps.operation_score * 100)
													}
													like={Math.floor(staticProps.operation_score * 100)}
													textVisible={true}
													textSize={'12px'}
												/>
												<div className="percentage--text">
													<div className="good">만족해요</div>
													<div className="bad">아쉬워요</div>
												</div>
											</div>
										</div>
									</div>
								)
							}
						</Media>
					)}
				</div>
			</div>
			 
			<div className="select--wrapper">
				<div
					className="select--box"
					type="button"
					onClick={() => setCost(!cost)}
				>
					<img src={costImg} className="box" onClick={() => setCost(!cost)} />
					최저가 확인         
				</div>
				<div className="select--box middle">
					<div
						type="button"
						onClick={() => setReviewDetailModal(!reviewDetailModal)}
					>
						<img
							src={reviewImg}
							className="box"
							onClink={() => setReviewDetailModal(!reviewDetailModal)}
						/>
						상세 리뷰
					</div>
					{reviews &&
						reviews.slice(0, 3).map((item, idx) => {
							return (
								<div
									key={idx}
									className="review--box"
									onClick={() => {
										// history.push(`/info/${item.game_id}`);
									}}
								>
									<div className="first--box">
										<div className="profile--box">
											<img
												className="profile"
												src={
													item.avatar_url === null || item.avatar_url === ''
														? defaultAvatar
														: item.avatar_url
												}
											/>
											<span className="game">{item.nickname}</span>
										</div>
										<span className="star">
											<img src={GrayStar} /> {item.total_score}
										</span>
									</div>

									<div className="desc">
										{item.evaluation_content &&
										item.evaluation_content.length > 45
											? `${item.evaluation_content.substring(0, 45)}...`
											: item.evaluation_content}
									</div>
								</div>
							);
						})}
					<div className="more--box">
						<button
							className="more"
							onClick={() => setReviewDetailModal(!reviewDetailModal)}
						>
							더보기
						</button>
					</div>
				</div>
				<div
					className="select--box"
					type="button"
					onClick={() => setInfoModal(!infoModal)}
				>
					<img
						src={infoImg}
						className="box"
						onClick={() => setInfoModal(!infoModal)}
					/>
					게임 정보         
				</div>
			</div>
			<button
				className="review__btn"
				onClick={() => {
					setModal(!modal);
				}}
			>
				리뷰쓰기
			</button>
			<div className="GameInfoContainer--Body">
				<div className="Row--Review__title">
					<img src={BlueStar} />
					<span className="score">
						{!!staticProps && staticProps.total_score}
					</span>
					{!!staticProps && (
						<Fragment>
							<div className="Row--Review__cnt">
								<strong className="cnt">
									{StarRatingTextCtn.map(item => {
										const result =
											staticProps.total_score === null
												? ''
												: staticProps.total_score.toFixed(0) === item.id &&
												  item.text;
										return result;
									})}
								</strong>

								{window.innerWidth < 769 ? (
									<div>
										{!!reviews && reviews.length}명의 플레이어가 이 게임을
										평가하였습니다
									</div>
								) : (
									<>
										{!!reviews && reviews.length}명의 플레이어가 이 게임을
										평가하였습니다
									</>
								)}
							</div>
						</Fragment>
					)}
					<button
						className="desk-review__btn"
						onClick={() => {
							if (getUserInfo === null) {
								alert('로그인 이후 작성가능합니다.');
							} else {
								setModal(!modal);
							}
						}}
					>
						리뷰 쓰기
					</button>
				</div>
				<div className="Row--Review">
					{!!staticProps && (
						<Media query={{ maxWidth: 768 }}>
							{matches =>
								matches ? (
									''
								) : (
									<div className="percentage--list">
										<div className="wrapper">
											<div className="title">재미</div>
											<div className="percentage">
												<PercentageBar
													width={'300px'}
													height={'21px'}
													hate={100 - Math.floor(staticProps.fun_score * 100)}
													like={Math.floor(staticProps.fun_score * 100)}
													textVisible={true}
													textSize={'12px'}
												/>
												<div className="percentage--text">
													<div className="good">재미있어요</div>
													<div className="bad">별로예요</div>
												</div>
											</div>
										</div>
										<div className="wrapper">
											<div className="title">난이도</div>
											<div className="percentage">
												<PercentageBar
													width={'300px'}
													height={'21px'}
													hate={
														100 - Math.floor(staticProps.difficulty_score * 100)
													}
													like={Math.floor(staticProps.difficulty_score * 100)}
													textVisible={true}
													textSize={'12px'}
												/>
												<div className="percentage--text">
													<div className="good">쉬워요</div>
													<div className="bad">어려워요</div>
												</div>
											</div>
										</div>
										<div className="wrapper">
											<div className="title">완성도</div>
											<div className="percentage">
												<PercentageBar
													width={'300px'}
													height={'21px'}
													hate={
														100 - Math.floor(staticProps.complete_score * 100)
													}
													like={Math.floor(staticProps.complete_score * 100)}
													textVisible={true}
													textSize={'12px'}
												/>
												<div className="percentage--text">
													<div className="good">좋아요</div>
													<div className="bad">아쉬워요</div>
												</div>
											</div>
										</div>
										<div className="wrapper">
											<div className="title">운영</div>
											<div className="percentage">
												<PercentageBar
													width={'300px'}
													height={'21px'}
													hate={
														100 - Math.floor(staticProps.operation_score * 100)
													}
													like={Math.floor(staticProps.operation_score * 100)}
													textVisible={true}
													textSize={'12px'}
												/>
												<div className="percentage--text">
													<div className="good">만족해요</div>
													<div className="bad">아쉬워요</div>
												</div>
											</div>
										</div>
									</div>
								)
							}
						</Media>
					)}
					{!!reviews && <ReviewTable gameInfo={game} reviews={reviews} />}
				</div>

				<div className="Row--Desc__title">
					<Title>게임 설명</Title>
				</div>
				<div className="Row--Desc">
					<AccordionText>{game.game_desc_kr}</AccordionText>
				</div>

				<div className="Row--Info__title">
					<Title>상세 정보</Title>
				</div>
				<div className="Row--Info">
					<div className="Info--left">
						<TextWithIcon icon={Company}>
							{!!game.game_developer ? game.game_developer : '-'}
							{!!game.game_developer && !!game.game_publsher && ' / '}
							{!!game.game_publsher ? game.game_publsher : ''}
						</TextWithIcon>
						<TextWithIcon icon={calendar}>
							{game.game_release_date}
						</TextWithIcon>
						<TextWithIcon icon={tag}>
							{!!game.game_tag_kr &&
								game.game_tag_kr.split(',').map((tag, idx) => {
									return (
										<span className="tag" key={idx}>
											#{tag}
										</span>
									);
								})}
						</TextWithIcon>
						<TextWithIcon icon={language}>
							{!!game.game_language ? game.game_language : '-'}
						</TextWithIcon>
					</div>
					<div className="Info--right">
						<TextWithIcon icon={age}>
							{!!game.game_rate ? game.game_rate : '-'}
						</TextWithIcon>
						<TextWithIcon icon={player}>
							{!!game.game_extra_info ? game.game_extra_info : '-'}
						</TextWithIcon>
					</div>
				</div>
				<div className="Row--OS">
					<OSTable
						info={[
							{
								id: 'Windows',
								min: game.win_min,
								stable: game.win_req,
							},
							{
								id: 'Mac OS',
								min: game.mac_min,
								stable: game.mac_req,
							},
							{
								id: 'Linux',
								min: game.linux_min,
								stable: game.linux_req,
							},
						]}
					/>
				</div>
			</div>
			{/* **************************** */}
			{/******** 최저가 확인 *********/} 
			{cost ? (
				<div className="detail__modal">
					<div className="detail__header">
						<button className="back" onClick={() => setCost(!cost)}>
							{'<'}
						</button>
						<div className="detail__title">가격비교</div>
						<div />
					</div>
					<div className="inner__cost">
						{!!gameInfo.info && gameInfo.info.game_class === '0' ? (
							<PlatformTable info={gamePrice} price={game.price} />
						) : !!gameInfo.info && gameInfo.info.game_class === '2' ? (
							<PlatformTable
								url={!!gameInfo.info && gameInfo.info.game_refer_id}
								classNo={!!gameInfo.info && gameInfo.info.game_class}
							/>
						) : (
							<PlatformTable
								url={!!gameInfo.info && gameInfo.info.game_refer_id}
								classNo={!!gameInfo.info && gameInfo.info.game_class}
							/>
						)}
					</div>
				</div>
			) : (
				''
			)}
			{/* **************************** */}
			{/******** 비용 모달 *********/} 
			{infoModal ? (
				<div className="detail__modal">
					<div className="detail__header">
						<button className="back" onClick={() => setInfoModal(!infoModal)}>
							{'<'}
						</button>
						<div className="detail__title">게임정보</div>
						<div />
					</div>
					<div className="inner__info">
						{' '}
						<div className="Row--Desc__title">
							<Title>게임 설명</Title>
						</div>
						<div className="Row--Desc">
							<AccordionText>{game.game_desc_kr}</AccordionText>
						</div>
						<div className="Row--Info__title">
							<Title>상세 정보</Title>
						</div>
						<div className="Row--Info">
							<div className="Info--left">
								<TextWithIcon icon={Company}>
									{!!game.game_developer ? game.game_developer : '-'}
									{!!game.game_developer && !!game.game_publsher && ' / '}
									{!!game.game_publsher ? game.game_publsher : ''}
								</TextWithIcon>
								<TextWithIcon icon={calendar}>
									{game.game_release_date}
								</TextWithIcon>
								<TextWithIcon icon={tag}>
									{!!game.game_tag_kr &&
										game.game_tag_kr.split(',').map((tag, idx) => {
											return (
												<span className="tag" key={idx}>
													#{tag}
												</span>
											);
										})}
								</TextWithIcon>
								<TextWithIcon icon={language}>
									{!!game.game_language ? game.game_language : '-'}
								</TextWithIcon>
							</div>
							<div className="Info--right">
								<TextWithIcon icon={age}>
									{!!game.game_rate ? game.game_rate : '-'}
								</TextWithIcon>
								<TextWithIcon icon={player}>
									{!!game.game_extra_info ? game.game_extra_info : '-'}
								</TextWithIcon>
							</div>
						</div>
						<div className="Row--OS">
							<OSTable
								info={[
									{
										id: 'Windows',
										min: game.win_min,
										stable: game.win_req,
									},
									{
										id: 'Mac OS',
										min: game.mac_min,
										stable: game.mac_req,
									},
									{
										id: 'Linux',
										min: game.linux_min,
										stable: game.linux_req,
									},
								]}
							/>
						</div>
					</div>
				</div>
			) : (
				''
			)}
			{/* **************************** */}
			{/******** 상세 리뷰 모달 *********/} 
			{reviewDetailModal ? (
				<div className="detail__modal">
					<div className="detail__header">
						<button
							className="back"
							onClick={() => setReviewDetailModal(!reviewDetailModal)}
						>
							{'<'}
						</button>
						<div className="detail__title">리뷰</div>
						<div />
					</div>
					<div className="reviews">
						{reviews &&
							reviews.map((item, idx) => {
								return (
									<div
										key={idx}
										className="review--box"
										onClick={() => {
											// history.push(`/info/${item.game_id}`);
										}}
									>
										<div className="first--box">
											<div className="profile--box">
												<img
													className="profile"
													src={
														item.avatar_url === null || item.avatar_url === ''
															? defaultAvatar
															: item.avatar_url
													}
												/>
												<span className="game">{item.nickname}</span>
											</div>
											<span className="star">
												<img src={GrayStar} /> {item.total_score}
											</span>
										</div>

										<div className="desc">
											{item.evaluation_content &&
											item.evaluation_content.length > 45
												? `${item.evaluation_content.substring(0, 45)}...`
												: item.evaluation_content}
										</div>
									</div>
								);
							})}
						<button
							className="review__btn"
							onClick={() => {
								setModal(!modal);
							}}
						>
							리뷰쓰기
						</button>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
};

// const mapDispatchToProps = dispatch => {
// 	return {
// 		changeMenu: menu => dispatch(changeMenu(menu)),
// 		insertReview: (
// 			game_id,
// 			fun_score,
// 			complete_score,
// 			difficulty_score,
// 			operation_score,
// 			total_score,
// 			evaluation_content,
// 		) =>
// 			dispatch(
// 				insertReview(
// 					game_id,
// 					fun_score,
// 					complete_score,
// 					difficulty_score,
// 					operation_score,
// 					total_score,
// 					evaluation_content,
// 				),
// 			),
// 	};
// };

export default connect(
	({ gameInfo }) => ({
		gameInfo: gameInfo.gameInfo,
		gamePrice: gameInfo.gamePrice,
	}),
	{ changeMenu, insertReview },
)(GameInfoContainer);
