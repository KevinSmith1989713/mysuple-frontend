import React from 'react';
import { connect } from 'react-redux';
import './JoinContainer.scss';

import {
	changeJoinSubMenu,
	selectQuestion,
	selectTypeQuestion,
	changeMenu,
} from '../../store/Layout/Layout.store';
import { reqSocialSignIn } from '../../store/Auth/Auth.store';

import JoinFirst from '../../view/Join/JoinFirst/JoinFirst';
import JoinSecond from '../../view/Join/JoinSecond/JoinSecond';
import JoinThird from '../../view/Join/JoinThird/JoinThird';
import JoinForth from '../../view/Join/JoinForth/JoinForth';
import JoinFifth from '../../view/Join/JoinFifth/JoinFifth';
import JoinSixth from '../../view/Join/JoinSixth/JoinSixth';
import JoinSeventh from '../../view/Join/JoinSeventh/JoinSeventh';
import JoinEight from '../../view/Join/JoinEight/JoinEight';
import {
	agreeTerm,
	emailCheck,
	signUp,
	showJoinTaste,
	reqShowTaste,
	putLikeGame,
} from '../../store/Auth/Auth.store';
import { logPageView } from '../../Utils/analytics';

class JoinContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.makeView = this.makeView.bind(this);
	}

	componentDidMount() {
		const { reqShowTaste } = this.props;
		reqShowTaste();
		logPageView('플랫폼 페이지');
	}

	makeView() {
		const {
			joinSubMenu,
			changeJoinSubMenu,
			selectQuestion,
			selectTypeQuestion,
			emailCheck,
			signUp,
			showJoinTaste,
			email,
			tasteList,
			age,
			use,
			userTaste,
			userTypeTaste,
			changeMenu,
			putLikeGame,
			like,
			person,
			marketing,
			member,
			agreeTerm,
			reqSocialSignIn
		} = this.props;

		// if (joinSubMenu === 'first') {
		// 	return (
		// 		<JoinFirst
		// 			changeJoinSubMenu={changeJoinSubMenu}
		// 			agreeTerm={agreeTerm}
		// 		/>
		// 	);
		// } else
		if (joinSubMenu === 'first') {
			return (
				<JoinSecond
					changeJoinSubMenu={changeJoinSubMenu}
					emailCheck={emailCheck}
					signUp={signUp}
					reqSocialSignIn={reqSocialSignIn}
				/>
			);
		} else if (joinSubMenu === 'third') {
			return (
				<JoinThird
					agreeTerm={agreeTerm}
					changeMenu={changeMenu}
					email={email}
					signUp={signUp}
					use={use}
					person={person}
					age={age}
					marketing={marketing}
					member={member}
				/>
			);
		} else if (joinSubMenu === 'fourth') {
			// fourth
			return (
				<JoinForth
					selectQuestion={selectQuestion}
					changeJoinSubMenu={changeJoinSubMenu}
					userTaste={userTaste}
					joinSubMenu={joinSubMenu}
					changeMenu={changeMenu}
				/>
			);
		} else if (joinSubMenu === 'fifth') {
			return (
				<JoinFifth
					selectQuestion={selectQuestion}
					changeJoinSubMenu={changeJoinSubMenu}
					userTaste={userTaste}
					changeMenu={changeMenu}
				/>
			);
		} else if (joinSubMenu === 'sixth') {
			return (
				<JoinSixth
					selectTypeQuestion={selectTypeQuestion}
					changeJoinSubMenu={changeJoinSubMenu}
					showJoinTaste={showJoinTaste}
					userTaste={userTaste}
					userTypeTaste={userTypeTaste}
					changeMenu={changeMenu}
				/>
			);
		} else if (joinSubMenu === 'seventh') {
			return (
				<JoinSeventh
					changeJoinSubMenu={changeJoinSubMenu}
					showJoinTaste={showJoinTaste}
					userTaste={userTaste}
					userTypeTaste={userTypeTaste}
					tasteList={tasteList}
					changeMenu={changeMenu}
					putLikeGame={putLikeGame}
					like={like}
				/>
			);
		} else if (joinSubMenu === 'eight') {
			return (
				<JoinEight
					changeJoinSubMenu={changeJoinSubMenu}
					tasteList={tasteList}
					changeMenu={changeMenu}
					like={like}
				/>
			);
		}
	}

	render() {
		return <div className="JoinContainer">{this.makeView()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		joinSubMenu: state.layout.joinSubMenu,
		userTaste: state.layout.userTaste,
		userTypeTaste: state.layout.userTypeTaste,
		choiceGameCnt: state.layout.choiceGameCnt,
		name: state.auth.userInfo.nickName,
		email: state.auth.userInfo.email,
		marketing: state.auth.termObj.marketing,
		member: state.auth.termObj.member,
		age: state.auth.termObj.age,
		person: state.auth.termObj.person,
		use: state.auth.termObj.use,
		like: state.auth.like,
		tasteList: state.auth.tasteList,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeJoinSubMenu: menu => dispatch(changeJoinSubMenu(menu)),
		selectQuestion: (type, value) => dispatch(selectQuestion(type, value)),
		selectTypeQuestion: (type, value) =>
			dispatch(selectTypeQuestion(type, value)),
		agreeTerm: info => dispatch(agreeTerm(info)),
		reqSocialSignIn: (email, platform, name, avatar_url) =>
			dispatch(reqSocialSignIn(email, platform, name, avatar_url)),
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
			avatar_url,
			platform,
			age,
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
					avatar_url,
					platform,
					age,
				),
			),
		showJoinTaste: (
			single,
			multi,
			pc,
			mobile,
			console1,
			shooting,
			sports,
			horror,
			gore,
			daily,
			music,
			racing,
			strategy,
			adventure,
			rpg,
			love,
			puzzle,
			fantasy,
			movie,
			casual,
			survival,
			vr,
			indie,
			action,
			fight,
			violence,
			simulation,
			moba,
			ps,
			nin,
			xbox,
		) =>
			dispatch(
				showJoinTaste(
					single,
					multi,
					pc,
					mobile,
					console1,
					shooting,
					sports,
					horror,
					gore,
					daily,
					music,
					racing,
					strategy,
					adventure,
					rpg,
					love,
					puzzle,
					fantasy,
					movie,
					casual,
					survival,
					vr,
					indie,
					action,
					fight,
					violence,
					simulation,
					moba,
					ps,
					nin,
					xbox,
				),
			),
		reqShowTaste: () => dispatch(reqShowTaste()),
		changeMenu: menu => dispatch(changeMenu(menu)),
		putLikeGame: game => dispatch(putLikeGame(game)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinContainer);
