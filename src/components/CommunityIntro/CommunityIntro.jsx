
import React from 'react';

import './CommunityIntro.scss';
import Title from '../Title/Title';
import People from '../../static/images/GameInfo/player@3x.png'

const CommunityIntro = ({
  titleTop, titleBot, backImg, embed, explain,
}) => {
	return (
		<div className="CommunityIntro">
			<div className="CommunityIntro--Bg">
				<div className="bg--opacity"/>
				<img src={backImg} className="bg--img"/>
			</div>
			<div className="CommunityIntro--Info">
				<div className="title--top">{titleTop}</div>
				<div className="title--bot">{titleBot}</div>
				<iframe 
					src={embed} 
					frameBorder="0" 
					allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
					allowfullscreen/>
				<div className="explain">{explain}</div>
			</div>
		</div>
	);
};

export default CommunityIntro;
