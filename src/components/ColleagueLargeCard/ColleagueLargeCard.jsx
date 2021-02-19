import React, { useState, Fragment } from 'react';
import classNames from 'classnames';

import Players from '../../static/images/GameInfo/player@3x.png';

import BlueStar from '../../static/images/Card/blue-star@3x.png';
import Tag from '../../static/images/Card/tag@3x.png';
import NoPoster from '../../static/images/Card/no_image@3x.png';
import Company from '../../static/images/Card/company@3x.png';
import Calendar from '../../static/images/Card/Calendar@3x.png';
import { ReactComponent as BlueLink } from '../../static/images/Card/BlueLink.svg';

import { connect } from 'react-redux';
import { reqCurating } from '../../store/GameInfo/GameInfo.store';

import './ColleagueLargeCard.scss';
import PercentageBar from '../PercentageBar/PercentageBar';
import ModalCuratingBalloon from '../ModalCuratingBalloon/ModalCuratingBalloon';
import Media from 'react-media';

const ColleagueLargeCard = ({
	info,
	className,
	visible,
	userInfo,
	insertReview,
	myCuratingList,
	...rest
}) => {
	const tags = !!info && !!info.game_tag_kr && info.game_tag_kr.split(',');

	const [modal, setModal] = useState(false);
	const [thisCurating, setCurating] = useState(false);

	return (
		// <Fragment>
		<div className={classNames('ColleagueLargeCard')}>
			<header className="ColleagueLargeCard--Header">
				<div className="title">{!!info && info.crew_name}</div>
				<div className="cnt">
					<img src={Players} />
					{!!info && info.crew_cnt}명
				</div>
			</header>

			<div className="ColleagueLargeCard--infos">
				<div className="info__left">
					<img className="poster" alt="poster" src={NoPoster} />
				</div>
				<div className="info__right">
					<div className="info__right-text">
						<div className="games">
							<img src={Tag} alt="tag" />
							<div className="games--name">
								{!!info &&
									info.games.map((game, index) => {
										if (index === info.games.length - 1) {
											return game;
										} else {
											return game + ', ';
										}
									})}
							</div>
						</div>
						<div className="release">
							<BlueLink />
							123
						</div>
						<div className="tags">
							<img src={Tag} alt="tag" />
							<div className="tag-list">123</div>
						</div>
					</div>
					<div className="info__right-text detail-text">
						{!!info && info.crew_introduce}
					</div>
				</div>
			</div>
		</div>
	);
};

ColleagueLargeCard.defaultProps = {
	info: null,
};

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ColleagueLargeCard);
