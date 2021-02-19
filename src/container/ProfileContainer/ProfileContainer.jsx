import React from 'react';
import './ProfileContainer.scss';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { profileMenus } from '../../assets/dummyData/AuthData';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';

import {
	changeMenu,
	changeProfileSubMenu,
} from '../../store/Layout/Layout.store';

import Account from '../../view/Profile/Account/Account';
import Curating from '../../view/Profile/Curating/Curating';
import CuratingPost from '../../view/Profile/CuratingPost/CuratingPost';
import MyWriting from '../../view/Profile/MyWriting/MyWriting';
import MyGame from '../../view/Profile/MyGame/MyGame';
import MyLeague from '../../view/Profile/MyLeague/MyLeague';
import MyMatche from '../../view/Profile/MyMatche/MyMatche';
import Setting from '../../view/Profile/Setting/Setting';
import ShowCase from '../../view/Profile/ShowCase/ShowCase';
import Inquiry from '../../view/Profile/Inquiry/Inquiry';
import Bookmark from '../../view/Profile/Bookmark/Bookmark';
import MyComment from '../../view/Profile/MyComment/MyComment';
import MyPost from '../../view/Profile/MyPost/MyPost';
import MyPass from '../../view/Profile/MyPass/MyPass';
import WriteInquiry from '../../view/Profile/WriteInquiry/WriteInquiry';
import WriteCurating from '../../view/Profile/WriteCurating/WriteCurating';

import {
	reqInquiry,
	reqGetMyGame,
	reqProfileUpdate,
	reqGetMyCurating,
	reqMyContantsList,
	deleteMyContents,
} from '../../store/MyPage/MyPage.store';
import { getPassCount } from '../../store/Auth/Auth.store';
import Withdraw from '../../view/Profile/Withdraw/Withdraw';
import WithdrawConfirm from '../../view/Profile/WithdrawConfirm/WithdrawConfirm';
import Withdrawed from '../../view/Profile/Withdrawed/Withdrawed';
import { logPageView } from '../../Utils/analytics';

import { signOut } from '../../store/Auth/Auth.store';
import AuthContainer from '../../container/AuthContainer/AuthContainer';
import ContentBoard from '../../components/ContentBoard/ContentBoard';

class ProfileContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			menu: 'account',
		};
		this.onClickChangeMenu = this.onClickChangeMenu.bind(this);
		this.makeView = this.makeView.bind(this);
	}

	componentDidMount() {
		const { reqGetMyGame, reqGetMyCurating } = this.props;
		this.setState({ menu: 'account' });
		reqGetMyGame();
		logPageView('플랫폼 페이지');
	}

	onClickChangeMenu(menu) {
		const { changeProfileSubMenu } = this.props;

		this.setState({
			menu: menu,
		});

		changeProfileSubMenu(menu);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { reqGetMyCurating, profileSubMenu } = this.props;

		if (profileSubMenu !== nextProps.profileSubMenu) {
			if (nextProps.profileSubMenu === 'curating') {
				reqGetMyCurating();
			}

			return true;
		}

		return true;
	}

	makeView() {
		const {
			userInfo,
			changeMenu,
			reqInquiry,
			myGameList,
			myCuratingList,
			reqGetMyCurating,
			reqProfileUpdate,
			profileSubMenu,
			reqMyContantsList,
			myContantsList,
			deleteMyContents,
			leaguenoticeState,
			passCount,
		} = this.props;
		switch (profileSubMenu) {
			case 'account':
				return (
					<Account
						onClickChangeMenu={this.onClickChangeMenu}
						userInfo={userInfo}
						onClick={this.onClickChangeMenu}
						reqProfileUpdate={reqProfileUpdate}
						reqMyContantsList={reqMyContantsList}
						myContantsList={myContantsList}
						changeMenu={changeMenu}
					/>
				);
			case 'myPass':
				return (
					<MyPass
						onClickChangeMenu={this.onClickChangeMenu}
						userInfo={userInfo}
						onClick={this.onClickChangeMenu}
						reqProfileUpdate={reqProfileUpdate}
						reqMyContantsList={reqMyContantsList}
						myContantsList={myContantsList}
						passCount={passCount}
						getPassCount={getPassCount}

					/>
				);

			case 'myWriting':
				return (
					<MyWriting
						onClick={this.onClickChangeMenu}
						reqMyContantsList={reqMyContantsList}
						myContantsList={myContantsList}
						deleteMyContents={deleteMyContents}
						leaguenoticeState={leaguenoticeState}
					/>
				);

			case 'myGame':
				return (
					<MyGame
						reqMyContantsList={reqMyContantsList}
						userInfo={userInfo}
						onClick={this.onClickChangeMenu}
						myGameList={myGameList}
					/>
				);
			case 'myLeague':
				return (
					<MyLeague
						reqMyContantsList={reqMyContantsList}
						userInfo={userInfo}
						onClick={this.onClickChangeMenu}
						myGameList={myGameList}
					/>
				);
			case 'myMatche':
				return <MyMatche userInfo={userInfo} />;
			case 'showCase':
				return (
					<ShowCase userInfo={userInfo} onClick={this.onClickChangeMenu} />
				);
			case 'curating':
				return (
					<Curating
						userInfo={userInfo}
						curatingList={myCuratingList}
						onClick={this.onClickChangeMenu}
					/>
				);
			case 'curatingPost':
				return (
					<CuratingPost userInfo={userInfo} onClick={this.onClickChangeMenu} />
				);
			case 'setting':
				return <Setting userInfo={userInfo} onClick={this.onClickChangeMenu} />;
			case 'inquiry':
				return <Inquiry userInfo={userInfo} onClick={this.onClickChangeMenu} />;
			case 'bookmark':
				return (
					<Bookmark userInfo={userInfo} onClick={this.onClickChangeMenu} />
				);
			case 'comment':
				return (
					<MyComment userInfo={userInfo} onClick={this.onClickChangeMenu} />
				);
			case 'post':
				return <MyPost userInfo={userInfo} onClick={this.onClickChangeMenu} />;
			case 'writeInquiry':
				return (
					<WriteInquiry
						userInfo={userInfo}
						onClick={this.onClickChangeMenu}
						reqInquiry={reqInquiry}
					/>
				);
			case 'curating':
				return (
					<WriteCurating userInfo={userInfo} onClick={this.onClickChangeMenu} />
				);
			case 'withdraw':
				return (
					<Withdraw userInfo={userInfo} onClick={this.onClickChangeMenu} />
				);
			case 'withdrawConfirm':
				return (
					<WithdrawConfirm
						userInfo={userInfo}
						onClick={this.onClickChangeMenu}
					/>
				);
			case 'withdrawed':
				return (
					<Withdrawed userInfo={userInfo} onClick={this.onClickChangeMenu} />
				);

			default:
				break;
		}
	}
	makeViewLogOut() {
		const { profileSubMenu } = this.props;

		switch (profileSubMenu) {
			case 'login':
				return (
					<>
						<AuthContainer />
					</>
				);
			default:
				break;
		}
	}

	render() {
		const { menu } = this.state;

		return (
			<>
				{this.props.profileSubMenu === 'login' ? (
					this.makeViewLogOut()
				) : (
					<div className="ProfileContainer">
						<div
							className={classNames(
								menu != 'withdrawConfirm' ? 'ProfileContainer--menu' : 'none',
								menu != 'withdrawed' ? 'ProfileContainer--menu' : 'none',
							)}
						>
							<ProfileMenu
								menus={profileMenus}
								profileSubMenu={this.props.profileSubMenu}
								menu={menu}
								onClick={this.onClickChangeMenu}
							/>
						</div>
						<div className="board" />
						<div
							className={classNames(
								menu != 'withdrawConfirm'
									? 'ProfileContainer--board'
									: 'ProfileContainer--withdraw',
								menu != 'withdrawed'
									? 'ProfileContainer--board'
									: 'ProfileContainer--withdraw',
							)}
						>
							<div className="ProfileContainer--board__section">
								{this.makeView()}
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.auth.userInfo,
		myGameList: state.myPage.myGameList,
		sessionKey: state.auth.sessionKey,
		profileSubMenu: state.layout.profileSubMenu,
		myCuratingList: state.myPage.myCuratingList,
		myContantsList: state.myPage.myContantsList,
		isLoading: state.layout.isLoading,
		leaguenoticeState: state.manage.leaguenoticeState,
		passCount: state.auth.passCount,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		reqInquiry: (category, title, content, file) =>
			dispatch(reqInquiry(category, title, content, file)),
		reqGetMyGame: () => dispatch(reqGetMyGame()),
		reqProfileUpdate: (file, newNickname, desc) =>
			dispatch(reqProfileUpdate(file, newNickname, desc)),
		changeProfileSubMenu: menu => dispatch(changeProfileSubMenu(menu)),
		reqGetMyCurating: () => dispatch(reqGetMyCurating()),
		signOut: () => dispatch(signOut()),
		reqMyContantsList: () => dispatch(reqMyContantsList()),
		deleteMyContents: crew_id => dispatch(deleteMyContents(crew_id)),
		getPassCount: () => dispatch(getPassCount()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
