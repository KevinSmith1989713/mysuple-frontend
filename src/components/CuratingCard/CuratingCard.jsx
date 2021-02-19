import React, { useState } from 'react';
import classNames from 'classnames';
import './CuratingCard.scss';
import TextWithIcon from '../TextWithIcon/TextWithIcon';
import tag from '../../static/images/Card/tag@3x.png';
import calendar from '../../static/images/Card/Calendar@3x.png';
import moment from 'moment';

const CuratingCard = ({ info, className, onClick }) => {
	const mmt = moment(info.createdAt);
	return (
		<div
			className={classNames('CuratingCard--Component', className)}
			onClick={onClick}
		>
			<div className="CuratingCard--Card">
				<div className="title">{!!info && info.curating_title}</div>
			</div>
			<div className="CuratingCard--info">
				<TextWithIcon icon={tag}>
					{`#${info.curating_tag}`}
					{/* {!!info &&
						info.curating_tag.split(' ').map((t, index) => {
							if (index < 2) {
								return `#${t} `;
							}
						})} */}
				</TextWithIcon>
				<TextWithIcon icon={calendar} className="date">
					{mmt.format('YYYY.MM.DD')}
				</TextWithIcon>
			</div>
		</div>
	);
};

export default CuratingCard;
