import React from 'react';
import './MyGameButton.scss';
import classNames from 'classnames';

const MyGameButton = ({ rating, good, bad }) => {
	return (
		<div className={classNames('MyGameButton', `rating` + rating)}>
			{rating === '1' ? good : bad}
		</div>
	);
};

export default MyGameButton;
