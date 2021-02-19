import React from 'react';
import './PenguinBoard.scss';
import { connect } from 'react-redux';

const PenguinBoard = ({ name, joinSubMenu }) => {
	return (
		<div className="PenguinBoard">
			<div className="PenguinBoard--text">
				<p>{joinSubMenu === 'third' ? 'JOIN US' : 'WELCOME!'}</p>
				어서오세요! <span>{name}</span> 님!
			</div>
		</div>
	);
};

PenguinBoard.defaultProps = {
	name: 'Super Player',
};

const mapStateToProps = state => {
	return {
		joinSubMenu: state.layout.joinSubMenu,
	};
};

export default connect(mapStateToProps, null)(PenguinBoard);
