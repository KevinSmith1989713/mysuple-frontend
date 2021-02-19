import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import BlueStar from '../../static/images/Card/blue-star@3x.png';
import NoPoster from '../../static/images/Card/no_image@3x.png';
import BlueCircleHeart from '../../static/images/Card/BlueCircleHeart@3x.png';
import BlueCircleAlarm from '../../static/images/Card/BlueCircleAlarm@3x.png';
import WhiteCircleHeart from '../../static/images/Card/WhiteCircleHeart@3x.png';
import WhiteCircleAlarm from '../../static/images/Card/WhiteCircleAlarm@3x.png';

import BlueSquareBubble from '../../static/images/Card/BlueSquareBubble@3x.png';
import pc from '../../static/images/Colleague/pc.svg';
import mobile from '../../static/images/Colleague/mobile.svg';
import consol from '../../static/images/Colleague/consol.svg';

import './Card.scss';

const Card = ({
	info,
	size,
	className,
	clickCursor,
	onClick,
	isBtn,
	selected,
	selectLikeGame,
	selectAlarmGame,
	userInfo,
	sessionKey,
	...rest
}) => {
	const [like, setLike] = useState(false);
	const [alarm, setAlarm] = useState(false);
	const [_ismounted, setMount] = useState(false);
	const tags = !!info && !!info.game_tag_kr && info.game_tag_kr.split(',');

	useEffect(() => {
		setMount(true);

		return () => {
			setMount(false);
		};
	}, []);

	useEffect(() => {
		if (!!info) {
			if (!!info.like) {
				setLike(info.like === '1' ? true : false);
			}
			if (!!info.alarm) {
				setAlarm(info.alarm === '1' ? true : false);
			}
		}
	}, [info]);

	return (
		// <div className={classNames("Card", info, size, className, clickCursor, onClickHeart, onClickAlarm )}>
		<div
			className={classNames(
				'Card',
				size,
				className,
				clickCursor,
				onClick,
				selected,
				sessionKey,
			)}
		>
			{info && (
				<>
					<img
						className="Card-poster"d
						src={info.img_src ? info.img_src : NoPoster}
					/>
					<div className="Card-gradient" onClick={onClick} />
					<img
						className="Card-selected"
						src={BlueSquareBubble}
						style={{ display: !selected && 'none' }}
					/>
					<div className="Card-infos">
						{isBtn && (
							<div className="Card-btns">
								{/* <img
									className="btn"
									src={like ? BlueCircleHeart : WhiteCircleHeart}
									onClick={() => {
										if (!!sessionKey) {
											selectLikeGame(info.game_id, !like, alarm);
											setLike(!like);
										} else {
											alert('로그인 후 좋아요 또는 알람 선택 가능합니다.');
										}
									}}
								/> */}
								{/* <img
									className="btn"
									src={alarm ? BlueCircleAlarm : WhiteCircleAlarm}
									onClick={() => {
										if (!!sessionKey) {
											selectAlarmGame(info.game_id, like, !alarm);
											setAlarm(!alarm);
										} else {
											alert('로그인 후 좋아요 또는 알람 선택 가능합니다.');
										}
									}}
								/> */}
							</div>
						)}

						<div className="Card-infomation" onClick={onClick}>
							<div className="rating">
								<img
									src={
										info.game_class === '0'
											? pc
											: '' || info.game_class === '1'
											? pc
											: '' || info.game_class === '2'
											? mobile
											: consol
									}
									className="icon"
								/>
								<div className="icon--text">
									{info.game_class === '0'
										? 'PC'
										: '' || info.game_class === '1'
										? 'PC'
										: '' || info.game_class === '2'
										? '모바일'
										: '콘솔'}
								</div>
								{info.rating}
							</div>
							<div className="title">
								{!!info.game_title_kr ? info.game_title_kr : info.game_title}
							</div>
							<div className="tag">
								{!!tags[0] != ''
									? tags.map((tag, index) => {
											if (index < 2) {
												return `#${tag} `;
											}
									  })
									: null}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

Card.defaultProps = {
	size: 'medium',
	info: null,
	clickCursor: null,
	selected: false,
	isBtn: true,
	// onClickHeart:null,
	// onClickAlarm:null,
};

export default Card;
