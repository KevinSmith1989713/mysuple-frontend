// @flow
import * as React from 'react';
// import "./CheckBox.scss";
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import classNames from 'classnames/bind';
import styles from './CheckBox.scss';

const cx = classNames.bind(styles);

const CheckBox = ({
	checked,
	children,
	color,
	size,
	className,
	allCheck,
	name,
	...rest
}) => {
	return (
		<div className={cx('checkbox', color)}>
			<label>
				<input type="checkbox" checked={checked} {...rest} name={name} />
				<div className={cx('icon', size)}>
					{checked ? (
						<MdCheckBox className={cx('checked')} />
					) : (
						<MdCheckBoxOutlineBlank />
					)}
				</div>
			</label>
			<span className={cx(checked ? 'selected' : 'label', { allCheck })}>
				{children}
			</span>
		</div>
	);
};

CheckBox.defaultProps = {
	size: 'medium',
	color: 'blue',
};

export default CheckBox;
