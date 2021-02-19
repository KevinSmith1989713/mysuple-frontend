import React,{ useState } from 'react';
import classNames from "classnames";

import './Figure.scss';

// import ShadowFigure from '../../static/images/MyFigure/LightSavorShadow@3x.png'
// import ColorFigure from '../../static/images/MyFigure/LightSavorDuck@3x.png'

const Figure = ({ size, figureNum, haveFigure, figureShadow, figureDuck, date, className, onClick}) => {
	return (
		<div className={classNames("Figure", size, className)} onClick={onClick}>
			{	
				haveFigure ? (
					<img src={figureDuck} className="Figure--img"/>
				) : (
					<img src={figureShadow} className="Figure--img"/>
				)
			}
			{ date ? 
					<div className="Figure--date"> 획득 : {date}</div> : 
					<div className="Figure--name">???</div>
			}
			
		</div>
	);
};

export default Figure;
