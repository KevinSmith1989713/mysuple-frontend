import React from 'react';
import { connect } from 'react-redux';
import './JoinContainer.scss';

import {
	changeJoinSubMenu,
	selectWithGame,
	selectWhatGame,
} from '../../store/Layout/Layout.store';
import JoinFirst from '../../view/Join/JoinFirst/JoinFirst';
import JoinSecond from '../../view/Join/JoinSecond/JoinSecond';
import JoinThird from '../../view/Join/JoinThird/JoinThird';
import JoinForth from '../../view/Join/JoinForth/JoinForth';
import JoinFifth from '../../view/Join/JoinFifth/JoinFifth';
import JoinSixth from '../../view/Join/JoinSixth/JoinSixth';
import JoinSeventh from '../../view/Join/JoinSeventh/JoinSeventh';
import {
	agreeTerm,
	emailCheck,
	signUp,
	joinTaste,
	reqShowTaste,
} from '../../store/Auth/Auth.store';
import { logPageView } from "../../Utils/analytics";

class JoinContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.makeView = this.makeView.bind(this);
	}

	componentDidMount() {
		const { reqShowTaste } = this.props;
		reqShowTaste();
    logPageView("플랫폼 페이지");
	}

	makeView() {
		const {
			joinSubMenu,
			changeJoinSubMenu,
			selectWithGame,
			selectWhatGame,
			withGame,
			whatGame,
			agreeTerm,
			emailCheck,
			name,
			signUp,
			joinTaste,
			email,
			marketing,
			member,
			tasteList,
		} = this.props;

		if (joinSubMenu === 'first') {
			return (
				<JoinFirst
					changeJoinSubMenu={changeJoinSubMenu}
					agreeTerm={agreeTerm}
				/>
			);
		} else if (joinSubMenu === 'second') {
			return (
				<JoinSecond
					changeJoinSubMenu={changeJoinSubMenu}
					emailCheck={emailCheck}
				/>
			);
		} else if (joinSubMenu === 'third') {
			return (
				<JoinThird
					email={email}
					signUp={signUp}
					marketing={marketing}
					member={member}
				/>
			);
		} else if (joinSubMenu === 'fourth') {
			return (
				<JoinForth
					selectWithGame={selectWithGame}
					withGame={withGame}
					changeJoinSubMenu={changeJoinSubMenu}
					name={name}
				/>
			);
		} else if (joinSubMenu === 'fifth') {
			return (
				<JoinFifth
					selectWhatGame={selectWhatGame}
					whatGame={whatGame}
					changeJoinSubMenu={changeJoinSubMenu}
					name={name}
				/>
			);
		} else if (joinSubMenu === 'sixth') {
			return (
				<JoinSixth
					changeJoinSubMenu={changeJoinSubMenu}
					withGame={withGame}
					whatGame={whatGame}
					name={name}
					joinTaste={joinTaste}
					email={email}
					tasteList={tasteList}
				/>
			);
		} else if (joinSubMenu === 'seventh') {
			return <JoinSeventh 
			changeJoinSubMenu={changeJoinSubMenu}
			/>;
		}
	}

	render() {
		return <div className="JoinContainer">{this.makeView()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		joinSubMenu: state.layout.joinSubMenu,
		withGame: state.layout.withGame,
		whatGame: state.layout.whatGame,
		choiceGameCnt: state.layout.choiceGameCnt,
		name: state.auth.userInfo.nickName,
		email: state.auth.userInfo.email,
		marketing: state.auth.termObj.marketing,
		member: state.auth.termObj.member,
		tasteList: state.auth.tasteList,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeJoinSubMenu: menu => dispatch(changeJoinSubMenu(menu)),
		selectWithGame: selected => dispatch(selectWithGame(selected)),
		selectWhatGame: selected => dispatch(selectWhatGame(selected)),
		agreeTerm: info => dispatch(agreeTerm(info)),
		emailCheck: (email, type, name, avatar_url) =>
			dispatch(emailCheck(email, type, name, avatar_url)),
		signUp: (
			email,
			name,
			nickname,
			password,
			phone,
			passwd_q,
			passwd_a,
			gender,
			birth,
			marketing_consent,
			permanent_member,
		) =>
			dispatch(
				signUp(
					email,
					name,
					nickname,
					password,
					phone,
					passwd_q,
					passwd_a,
					gender,
					birth,
					marketing_consent,
					permanent_member,
				),
			),
		joinTaste: info => dispatch(joinTaste(info)),
		reqShowTaste: () => dispatch(reqShowTaste()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinContainer);
