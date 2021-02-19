import React from 'react';
import './PercentageBar.scss';

const PercentageBar = ({
	className,
	like,
	hate,
	textVisible,
	textSize,
	underText,
	width,
	height,
}) => {
	const likew = like + '%';
	const hatew = hate + '%';

	var styles = {
		size: {
			width:width,
			height:height
		},
		like: {
			width: likew,
		},
		hate: {
			width: hatew,
		},
	};
	return (
		<div
			className="PercentageBar"
			style={{ width: styles.size.width, height: styles.size.height }}
		>
			<div
				className={
					like >= hate ? 'PercentageBar--like' : 'PercentageBar--unlike'
				}
				style={{ width: like >= hate && styles.like.width }}
			>
				{textVisible && (
					<span style={{ fontSize: textSize }} className="like-text">
						{like}%
					</span>
				)}
			</div>
			<div
				className={like < hate ? 'PercentageBar--hate' : 'PercentageBar--unhate'}
				style={{ width: like < hate && styles.hate.width }}
			>
				{textVisible && (
					<span style={{ fontSize: textSize }} className="hate-text">
						{hate}%
					</span>
				)}
			</div>
		</div>
	);
};


export default PercentageBar;
