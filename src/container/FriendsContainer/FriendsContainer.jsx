import React from 'react';
import './FriendsContainer.scss';
import Title from '../../components/Title/Title';
import { connect } from 'react-redux';
import { changeChatNav } from '../../store/Layout/Layout.store';

import { ReactComponent as Person } from '../../static/images/Chatting/profile.svg';
import { ReactComponent as PersonLight } from '../../static/images/Chatting/profile__light.svg';
import { ReactComponent as Bell } from '../../static/images/Chatting/Bell.svg';
import { ReactComponent as BellLight } from '../../static/images/Chatting/Bell--light.svg';
import { ReactComponent as Messenger } from '../../static/images/Chatting/messenger.svg';
import { ReactComponent as MessengerLight } from '../../static/images/Chatting/messenger__light.svg';

import {
	friends,
	crewList,
	chattings,
	alarmList,
} from '../../assets/dummyData/ChattingData';

import FriendList from '../../components/FriendList/FriendList';
import ChattingList from '../../components/ChattingList/ChattingList';
import AlarmList from '../../components/AlarmList/AlarmList';
import CrewMainList from '../../components/CrewMainList/CrewMainList';
import CrewMainPage from '../../components/CrewMainPage/CrewMainPage';
import CrewChattingPage from '../../components/CrewChattingPage/CrewChattingPage';

import FriendsRoom from '../../components/FriendsRoom/FriendsRoom';
import ChattingRoom from '../../components/ChattingRoom/ChattingRoom';
const menus = [
	{
		key: 'crew',
		name: '내크루',
	},
	{
		key: 'friend',
		name: '친구',
		img: Person,
		img__light: PersonLight,
	},
	{
		key: 'chatting',
		name: '채팅',
		img: Messenger,
		img__light: MessengerLight,
	},
	{
		key: 'alarm',
		name: '알림',
		img: Bell,
		img__light: BellLight,
	},
];

class FriendsContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedMenu: 'friend',
			selectedSub: null,
			selectedCrewKey: null,
		};
		this.setMenu = this.setMenu.bind(this);
		this.setCrew = this.setCrew.bind(this);
		this.setSub = this.setSub.bind(this);
		// this.setMainTab = this.setMainTab.bind(this);
		this.setSubTab = this.setSubTab.bind(this);
	}
	setMenu = menu => {
		this.setState({
			selectedMenu: menu,
			selectedCrewKey: null,
		});
	};
	setSub = menu => {
		this.setState({
			selectedSub: menu,
		});
	};
	setCrew = crewId => {
		this.setState({
			selectedCrewKey: crewId,
		});
	};

	setMainTab = mainMenu => {
		const { userInfo } = this.props;
		const { selectedCrewKey } = this.state;

		switch (mainMenu) {
			case 'crew':
				return (
					<CrewMainList
						crewList={crewList[selectedCrewKey]}
						onClickRow={row => {
							this.setSub(row);
						}}
					/>
				);
			case 'friend':
				return (
					<FriendList
						friends={friends}
						myInfo={userInfo}
						setSub={this.setSub}
						changeChatNav={this.props.changeChatNav}
					/>
				);
			case 'chatting':
				return (
					<ChattingList
						chatList={chattings}
						setSub={this.setSub}
						changeChatNav={this.props.changeChatNav}
					/>
				);
			case 'alarm':
				return <AlarmList alarmList={alarmList} />;
		}
	};
	setSubTab = selectedSub => {
		const { selectedCrewKey } = this.state;

		switch (selectedSub) {
			case 'crewMain':
				return <CrewMainPage crew={crewList[selectedCrewKey]} />;
			case 'addFriends':
				return (
					<FriendsRoom
						crew={crewList[selectedCrewKey]}
						friends={friends}
						chatNav={this.props.chatNav}
						reduxMenu={this.props.reduxMenu}
					/>
				);
			case 'chatting':
				return (
					<AddFriends
						crew={crewList[selectedCrewKey]}
						friends={friends}
						chatNav={this.props.chatNav}
						reduxMenu={this.props.reduxMenu}
						setSub={this.setSub}
					/>
				);

			case 'chatingRoom':
				return (
					<ChattingRoom
						changeChatNav={this.props.changeChatNav}
						reduxMenu={this.props.reduxMenu}
					/>
				);

			case 'voice':
				// return <CrewChattingPage crew={crewList[selectedCrewKey]}/>
				return 'voice';
			default:
				return null;
		}
	};
	render() {
		
		const { selectedMenu, selectedCrewKey, selectedSub } = this.state;
		return (
			<div className="FriendsContainer">
				<div className="FriendsContainer--Title">
					<Title size="large" border="thick">
						친구
					</Title>
				</div>
				<div className="FriendsContainer--Table">
					<div className="crew--column">
						<div className="nav">{menus[0].name}</div>
						<div className="crew--list">
							{crewList.map((crew, index) => {
								return (
									<div
										className={
											index === selectedCrewKey
												? 'crew--circle__selected'
												: 'crew--circle'
										}
										key={index}
										onClick={() => {
											this.setMenu('crew');
											this.setCrew(index);
											this.setSub('crewMain');
										}}
									>
										<img src={crew.crew_image} />
										<div className="crew--recent">{crew.status}</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="menus--column">
						<div className="navigation">
							{menus.map((menu, index) => {
								return (
									index > 0 && (
										<div
											className={
												selectedMenu === menu.key ? 'nav__selected' : 'nav'
											}
											onClick={() => this.setMenu(menu.key)}
										>
											{selectedMenu === menu.key ? (
												<menu.img />
											) : (
												<menu.img__light />
											)}
											{menu.name}
										</div>
									)
								);
							})}
						</div>
						<div className="main--menu">{this.setMainTab(selectedMenu)}</div>
					</div>
					<div className="selected--column">{this.setSubTab(selectedSub)}</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.auth.userInfo,
		reduxMenu: state.layout.menu,
		chatNav: state.layout.chatNav,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		changeChatNav: chatNav => dispatch(changeChatNav(chatNav)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
