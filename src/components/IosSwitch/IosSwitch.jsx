import React, { Component, useState } from 'react';
import classNames from 'classnames';

import './IosSwitch.scss';

const IosSwitch = ({
	size,
	id,
	value,
	className,
	callback,
	onClick,
	onChange,
	boolean,
	setBoolean,
}) => {	
	const [TorF, setTorF] = useState(boolean);	
	const onChangeSwitch = () => {
		setTorF(!TorF);

		setBoolean === undefined ? '' : setBoolean(!TorF);
	};
	return (
		<div className={classNames('IosSwitch', size)}>
			<label className="Switch">
				{/* <input
					type="checkbox"
					id={id}
					value={value}
					onChange={() => setTorF(!TorF)}
					onClick={onClick}
				/> */}
				<input
					type="checkbox"
					id={id}
					onClick={() => onChangeSwitch()}
					onChange={() => setTorF(!TorF)}
					checked={!!TorF && TorF || boolean}
				/>
				<span className="slider"></span>
			</label>
		</div>
	);
};

export default IosSwitch;
