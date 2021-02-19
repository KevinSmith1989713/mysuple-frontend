import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {
	changeMenu,
	changeSuccess,
	changeJoinSubMenu,
} from '../store/Layout/Layout.store';
import ContentBoard from '../components/ContentBoard/ContentBoard';

import ColleagueContainer from '../container/ColleagueContainer/ColleagueConatiner'

class Curating extends Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 0,
		};
	}

	componentDidMount() {
		window.addEventListener('scroll', () => {
			let scroll = window.scrollY;

			this.setState({
				height: scroll,
			});
		});
	}

	render() {
		const { isLoading } = this.props;
		return (
			<div className="Curating">
				<Helmet>
					<title>슈퍼플레이어 | 동료게임</title>
				</Helmet>
				<ContentBoard>
					<ColleagueContainer/>
				</ContentBoard>
				{/* <Loading isVisible={isLoading} />
				<div className="top-button" style={styles}>
					{height !== 0 ? (
						<ScrollButton scrollStepInPx="100" delayInMs="3.66" />
					) : null}
				</div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Curating);
