import React from 'react';
import './Button.scss';
import classNames from 'classnames';

const Button = ({
	children,
	size,
	outline,
	direction,
	color,
	className,
	selected,
	...rest
}) => {
	return (
		<div className="c-Button">
			<button
				type="button"
				className={classNames(
					'Button',
					size,
					color,
					direction,
					{ outline },
					className,
				)}
				{...rest}
			>
				{children}
			</button>
		</div>
	);
};

Button.defaultProps = {
	size: 'large',
	color: 'blue',
	direction: 'right',
	selected: false,
};

export default Button;
