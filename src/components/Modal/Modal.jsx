import React from 'react';
import classNames from 'classnames';

import './Modal.scss';

const Modal = ({ children, className, isOpen, close }) => {
	const closeBtn = () => {
		close();
	};
	const closeBtnCrewInfo = () => {
		close();
	};
	// console.log(children)
	return (
		isOpen && (
			<>
				<div
					className="Modal-overlay"
					onClick={children.length > 2 ? closeBtn : closeBtnCrewInfo}
				/>
				<div className={classNames('Modal', className)}>{children}</div>
			</>
		)
	);
};

Modal.defaultProps = {
	isOpen: false,
};

export default Modal;
