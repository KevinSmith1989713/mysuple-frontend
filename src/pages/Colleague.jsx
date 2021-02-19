import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {
	changeMenu,
	changeSuccess,
	changeJoinSubMenu,
} from '../store/Layout/Layout.store';
import ContentBoard from '../components/ContentBoard/ContentBoard';

import ColleagueContainer from '../container/ColleagueContainer/ColleagueConatiner';

class Colleague extends Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 0,
		};
	}

	// componentDidMount() {
	// 	window.addEventListener('scroll', () => {
	// 		let scroll = window.scrollY;

	// 		this.setState({
	// 			height: scroll,
	// 		});
	// 	});
	// }

	render() {
		return (
			<div className="Colleague">
				<Helmet>
					<title>슈퍼플레이어 | 동료찾기</title>
				</Helmet>
				<ContentBoard>
					<ColleagueContainer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Colleague);
