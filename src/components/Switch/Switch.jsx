import React, { useState, useEffect } from 'react';
import './Switch.scss';

const Switch = ({ name, good, bad, handler, onClickSwitch, value }) => {
	useEffect(() => {
		return () => {};
	}, [value]);

	return (
		<div className="review-switch" name={name}>
			<div
				className={value === '0' ? 'switch-selected' : 'switch-unselected'}
				name="0"
				onClick={e => onClickSwitch(e)}
			>
				{bad}
			</div>
			<div
				className={value === '1' ? 'switch-selected blue' : 'switch-unselected'}
				name="1"
				onClick={e => onClickSwitch(e)}
			>
				{good}
			</div>
		</div>
	);
};
export default Switch;
