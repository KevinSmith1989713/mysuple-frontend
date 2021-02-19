import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {
	changeMenu,
	changeSuccess,
	changeJoinSubMenu,
} from '../store/Layout/Layout.store';

import HomeContainer from '../container/HomeContainer/HomeContainer';
import AuthContainer from '../container/AuthContainer/AuthContainer';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import JoinContainer from '../container/JoinContainer/JoinContainer';
import Loading from '../components/Loading/Loading';
import FindEmail from '../view/Auth/FindEmail/FindEmail';
import FriendsContainer from '../container/FriendsContainer/FriendsContainer';

import ResetPwd from '../view/Auth/ResetPwd/ResetPwd';
import { findEmail, sendResetPassword } from '../store/Auth/Auth.store';

import { reqMainEditorPick } from '../store/EditorPick/EditorPick.store';

import utils from '../Utils/utils';
import FindEmailResult from '../view/Auth/FindEmailResult/FindEmailResult';
import FindEmailAll from '../view/Auth/FindEmailAll/FindEmailAll';
import FindEmailAllResult from '../view/Auth/FindEmailAllResult/FindEmailAllResult';
import ProfileContainer from '../container/ProfileContainer/ProfileContainer';
import ScrollButton from '../components/ScrollButton/ScrollButton';
import { initIsMore } from '../store/GameInfo/GameInfo.store';
class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 0,
		};

		this.makeContainer = this.makeContainer.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		const { initIsMore, reqMainEditorPick } = this.props;
		window.addEventListener('scroll', () => {
			let scroll = window.scrollY;

			this.setState({
				height: scroll,
			});
		});
		initIsMore();
		reqMainEditorPick();
	}

	makeContainer() {
		const {
			menu,
			changeMenu,
			findEmail,
			userInfo,
			changeSuccess,
			isSuccess,
			changeJoinSubmenu,
			sendResetPassword,
			mainEditorPick,
		} = this.props;
		if (menu === 'home') {
			return <HomeContainer userInfo={userInfo} />;
		} else if (menu === 'login') {
			return (
				<ContentBoard>
					<AuthContainer />
				</ContentBoard>
			);
		} else if (menu === 'join') {
			return (
				<ContentBoard>
					<JoinContainer />
				</ContentBoard>
			);
		} else if (menu === 'findEmail') {
			return (
				<ContentBoard>
					<FindEmail changeMenu={changeMenu} findEmail={findEmail} />
				</ContentBoard>
			);
		} else if (menu === 'resetPwd') {
			return (
				<ContentBoard>
					<ResetPwd
						changeMenu={changeMenu}
						sendResetPassword={sendResetPassword}
					/>
				</ContentBoard>
			);
		} else if (menu === 'findEmailResult') {
			return (
				<ContentBoard>
					<FindEmailResult userInfo={userInfo} changeMenu={changeMenu} />
				</ContentBoard>
			);
		} else if (menu === 'findEmailAll') {
			return (
				<ContentBoard>
					<FindEmailAll
						userInfo={userInfo}
						changeMenu={changeMenu}
						changeSuccess={changeSuccess}
					/>
				</ContentBoard>
			);
		} else if (menu === 'findEmailAllResult') {
			return (
				<ContentBoard>
					<FindEmailAllResult
						isSuccess={isSuccess}
						userInfo={userInfo}
						changeMenu={changeMenu}
						changeSuccess={changeSuccess}
						changeJoinSubmenu={changeJoinSubmenu}
					/>
				</ContentBoard>
			);
		} else if (menu === 'profile') {
			return (
				<ContentBoard>
					<ProfileContainer />
				</ContentBoard>
			);
		} else if (menu === 'chatting') {
			return (
				<ContentBoard>
					<FriendsContainer />
				</ContentBoard>
			);
		} else {
			return <HomeContainer />;
		}
	}

	render() {
		const { height } = this.state;
		const styles = {
			WebkitTransform: 'translateZ(1px)',
			MozTransform: 'translateZ(1px)',
			OTransform: 'translateZ(1px)',
			transform: 'translateZ(1px)',
			position: 'fixed',
			bottom: '3%',
			right: '3%',
			zindex: 1,
		};

		return (
			<div className="Home">
				<Helmet>
					<title>슈퍼플레이어 | 홈</title>
				</Helmet>
				{this.makeContainer()}
				<div className="top-button" style={styles}>
					{height !== 0 ? (
						<ScrollButton scrollStepInPx="100" delayInMs="3.66" />
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		menu: state.layout.menu,
		userInfo: state.auth.userInfo,
		isSuccess: state.layout.isSuccess,
		mainEditorPick: state.editorPick.mainEditorPick,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		findEmail: (name, telNumber) => dispatch(findEmail(name, telNumber)),
		changeSuccess: result => dispatch(changeSuccess(result)),
		changeJoinSubmenu: menu => dispatch(changeJoinSubMenu(menu)),
		sendResetPassword: email => dispatch(sendResetPassword(email)),
		initIsMore: () => dispatch(initIsMore()),
		reqMainEditorPick: () => dispatch(reqMainEditorPick()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
