import React from 'react';
import './JoinCard.scss';
import classNames from 'classnames';

const JoinCard = ({ children, selected, miniText, ...rest }) => {
	return (
		<div className={classNames('JoinCard', { selected })} {...rest}>
			<span className="JoinCard--text">{children}</span>
			{!!miniText && <span className="JoinCard--mini">{miniText}</span>}
		</div>
	);
};

export default JoinCard;
