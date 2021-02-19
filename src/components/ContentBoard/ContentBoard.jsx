import React from 'react';
import './ContentBoard.scss';
import Footer from '../Footer/Footer';

const ContentBoard = ({ children }) => {
	return (
		<div className="ContentBoard">
			<div className="ContentBoard--content">{children}</div>
		</div>
	);
};

export default ContentBoard;
