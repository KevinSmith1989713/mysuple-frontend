import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {
	changeMenu,
	changeSuccess,
	changeJoinSubMenu,
} from '../store/Layout/Layout.store';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import InquireyContainer from '../container/InquireyContainer/InquireyContainer'

class Inquiery extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="Inquiery">
				<Helmet>
					<title>슈퍼플레이어 | 관리자 문의</title>
				</Helmet>
				<ContentBoard>
					<InquireyContainer/>
				</ContentBoard>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		menu: state.layout.menu,
		isLoading: state.layout.isLoading,
		userInfo: state.auth.userInfo,
		isSuccess: state.layout.isSuccess,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		findEmail: (name, telNumber) => dispatch(findEmail(name, telNumber)),
		changeSuccess: result => dispatch(changeSuccess(result)),
		changeJoinSubmenu: menu => dispatch(changeJoinSubMenu(menu)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Inquiery);
