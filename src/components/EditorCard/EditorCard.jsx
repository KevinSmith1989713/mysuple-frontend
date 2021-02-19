import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import Tag from '../../static/images/Card/tag@3x.png';

import './EditorCard.scss';
import TextWithIcon from '../TextWithIcon/TextWithIcon';

const EditorCard = ({ info }) => {
	return (
		!!info && (
			<div className="EditorCard">
				<div className="Editor--image">
					<div className="image--bg" />
					<img
						className="image--poster"
						src="https://cdn.shopify.com/s/files/1/1513/6238/products/bioshock-infinite-poster-video-game-poster-booker-dewitt-elizabeth_1024x1024.jpg?v=1496321086"
					/>
					<div className="text">
						<div className="text-top"></div>
						<div className="text-bottom">에디터's pick</div>
					</div>
				</div>
				<div className="Editor--Info">
					<div className="info--title">{info.editor_title}</div>
					<div className="info--sub">{info.editor_main_content}</div>
					<div className="info--tag">
						<img src={Tag} />
						{info.editor_tag}
					</div>
				</div>
			</div>
		)
	);
};

EditorCard.defaultProps = {
	size: 'medium',
	info: null,
	clickCursor: null,
	selected: false,
	// onClickHeart:null,
	// onClickAlarm:null,
};

export default EditorCard;
