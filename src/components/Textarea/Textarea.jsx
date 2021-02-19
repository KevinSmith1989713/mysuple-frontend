import React from 'react';
import './Textarea.scss';
import classNames from 'classnames';

const Textarea = ({
	children,
	className,
	placeholder,
	onChange,
	name,
	...rest
}) => {
	return (
		<textarea
			className={classNames('Textarea', className)}
			placeholder={placeholder}
			onChange={e => onChange(e)}
			name={name}
		/>
	);
};

Textarea.defaultProps = {};

export default Textarea;
