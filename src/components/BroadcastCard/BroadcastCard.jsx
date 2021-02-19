import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import Tag from '../../static/images/Card/tag@3x.png';

import './BroadcastCard.scss';

const BroadcastCard = ({
	info
}) => {

	return (
		<div className='BroadcastCard'>
      <div className="BroadcastCard--img">
        <img />
      </div>
      <div className="BroadcastCard--info">
        <div className="title">어쩌고 게임</div>
        <div className="sub"> 어쩌고게임게임어쩌고게임</div>
      </div>
		</div>
	);
};


export default BroadcastCard;
