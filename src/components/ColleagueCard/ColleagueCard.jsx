import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import Players from '../../static/images/GameInfo/player@3x.png';
// import BlueStar from '../../static/images/ColleagueCard/blue-star@3x.png';
// import NoPoster from '../../static/images/ColleagueCard/no_image@3x.png';
// import BlueCircleHeart from '../../static/images/ColleagueCard/BlueCircleHeart@3x.png';
// import BlueCircleAlarm from '../../static/images/ColleagueCard/BlueCircleAlarm@3x.png';
// import WhiteCircleHeart from '../../static/images/ColleagueCard/WhiteCircleHeart@3x.png';
// import WhiteCircleAlarm from '../../static/images/ColleagueCard/WhiteCircleAlarm@3x.png';

// import BlueSquareBubble from '../../static/images/ColleagueCard/BlueSquareBubble@3x.png';

import './ColleagueCard.scss';

const ColleagueCard = ({ info, size, ...rest }) => {
	
	return (
		<div className={classNames("ColleagueCard", size)} {...rest}>
			<div className="ColleagueCard--Poster">
				<img src={'https://images-na.ssl-images-amazon.com/images/I/71p%2BU0d%2BumL._AC_SL1024_.jpg'}/>
				<div className="gradient"/>
			</div>
			<div className="ColleagueCard--Info">
				<div className="cnt">
					<img src={Players}/>{!!info && info.crew_cnt}명</div>
				<div className="name">{!!info && info.crew_name}</div>
				{/* <div className="game">{!!info && info.games[0]}</div> */}
			</div>
			{
				size === 'large' && (
					<div className="ColleagueCard--Desc">
						{!!info && info.crew_introduce}
					</div>
				)
			}
		</div>
	);
};

ColleagueCard.defaultProps = {
	size: 'normal',
	// info: null,
	// clickCursor: null,
	// selected: false,
	// isBtn: true,
	// onClickHeart:null,
	// onClickAlarm:null,
};

export default ColleagueCard;
