import React, { useState } from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';
import BlueStar from '../../static/images/Card/blue-star@3x.png';

import BlueCircleHeart from '../../static/images/Card/BlueCircleHeart@3x.png';
import BlueCircleAlarm from '../../static/images/Card/BlueCircleAlarm@3x.png';
import WhiteCircleHeart from '../../static/images/Card/WhiteCircleHeart@3x.png';
import WhiteCircleAlarm from '../../static/images/Card/WhiteCircleAlarm@3x.png';
import GreyStar from '../../static/images/GameInfo/GreyStar@3x.png';

import Button from '../../components/Button/Button';
import Title from '../Title/Title';

import './GameInfoHeader.scss';
import Media from 'react-media';
import PlatformTable from '../PlatformTable/PlatformTable';

const GameInfoHeader = ({
	gameInfo,
	poster,
	title,
	gameId,
	won,
	dollar,
	gamePrice,
	onClickReview,
}) => {
	const getUserInfo = JSON.parse(localStorage.getItem('data'));
	
	return (
		<div className={classNames('GameInfoHeader')}>
			<Media query={{ maxWidth: 768 }}>
				{matches =>
					matches ? (
						<React.Fragment>
							<div className="GameInfoHeader--Title-line">
								<Title size="large">
									{title}
									<div className="border" />
								</Title>
							</div>
							<div className="GameInfoHeader--Rating-line">
								<div className="star--Img">
									<img src={GreyStar} />
									{!!gameInfo.statics && gameInfo.statics.total_score}
								</div>
								{/* <div className="likes--Buttons">
									<img src={WhiteCircleHeart} />
									<img src={WhiteCircleAlarm} />
								</div> */}
							</div>
							<div className="GameInfoHeader--Poster-line">
								<div className="poster--Img">
									<img src={poster} />
								</div>
								<div className="reviews--Buttons">
									<Button
										size="medium"
										className="button"
										onClick={() => {
											if (getUserInfo === null) {
												alert('로그인 이후 작성가능합니다.');
											} else {
												onClickReview();
											}
										}}
									>
										리뷰쓰기
									</Button>
									<Button size="medium" className="button">
										큐레이팅
									</Button>
								</div>
								<div className="price--Table">
									{!!gameInfo.info && gameInfo.info.game_class === '0' ? (
										<PlatformTable info={gamePrice} price={dollar} />
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
						</React.Fragment>
					) : (
						<React.Fragment>
							<div className="GameInfoHeader--Title-line">
								<Title size="large">
									{title}
									<div className="border" />
								</Title>
								{/* <div className="likes--Buttons">
									<img alt="like" src={WhiteCircleHeart} />
									<img alt="alarm" src={WhiteCircleAlarm} />
								</div> */}
							</div>
							<div className="GameInfoHeader--Rating-line">
								<div className="star--Img">
									<img src={GreyStar} />
									{!!gameInfo.statics && gameInfo.statics.total_score}
								</div>
								<div className="reviews--Buttons">
									<Button size="medium">큐레이팅</Button>
								</div>
							</div>
							<div className="GameInfoHeader--Poster-line">
								<div className="poster--Img">
									<img src={poster} />
								</div>
								<div className="price--Table">
									{!!gameInfo.info && gameInfo.info.game_class === '0' ? (
										<PlatformTable info={gamePrice} price={dollar} />
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
						</React.Fragment>
					)
				}
			</Media>
		</div>
	);
};

GameInfoHeader.defaultProps = {
	info: null,
};

const mapStateToProps = state => {
	return {
		gamePrice: state.gameInfo.gamePrice,
		currency: state.gameInfo.currency,
	};
};

export default React.memo(connect(mapStateToProps, null)(GameInfoHeader));
