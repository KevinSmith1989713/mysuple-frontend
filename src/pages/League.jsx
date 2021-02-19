import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {
	changeMenu,
	changeSuccess,
	changeJoinSubMenu,
} from '../store/Layout/Layout.store';
import ContentBoard from '../components/ContentBoard/ContentBoard';

// import LeagueContainer from '../container/LeagueContainer/LeagueConatiner'

import LeagueContainer from '../container/League/LeagueMainContainer/LeagueMainContainer';

const League = () => {
	return (
		<div className="League">
			<Helmet>
				<title>슈퍼플레이어 | 동료찾기</title>
			</Helmet>
			<ContentBoard>
				<LeagueContainer />
			</ContentBoard>
		</div>
	);
};

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

export default connect(mapStateToProps, mapDispatchToProps)(League);
