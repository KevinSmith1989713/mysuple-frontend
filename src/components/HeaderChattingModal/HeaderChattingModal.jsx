import React, { useState } from 'react';
import './HeaderChattingModal.scss';
import { connect } from 'react-redux';

import { changeMenu, changeChatNav } from '../../store/Layout/Layout.store';
import {
	addFriend,
	searchFriend,
	removeInfo,
	reqFriendList,
	selectUserInfo,
	isChatModalState,
} from '../../store/Chatting/Chatting.store';

import {
	crewList,
	chattings,
	alarmList,
	friends,
} from '../../assets/dummyData/ChattingData';

import { ReactComponent as Person } from '../../static/images/Chatting/profile.svg';
import { ReactComponent as PersonLight } from '../../static/images/Chatting/profile__light.svg';
import { ReactComponent as Bell } from '../../static/images/Chatting/Bell.svg';
import { ReactComponent as BellLight } from '../../static/images/Chatting/Bell--light.svg';
import { ReactComponent as Messenger } from '../../static/images/Chatting/messenger.svg';
import { ReactComponent as MessengerLight } from '../../static/images/Chatting/messenger__light.svg';
import { ReactComponent as Expand } from '../../static/images/Chatting/expand.svg';
import closeBtn from '../../static/images/Chatting/close.svg';

import FriendList from '../FriendList/FriendList';
import ChattingList from '../ChattingList/ChattingList';
import AlarmList from '../AlarmList/AlarmList';
import FriendsRoom from '../FriendsRoom/FriendsRoom';
import ChattingRoom from '../ChattingRoom/ChattingRoom';

const crewNavigation = [
	{
		image: Person,
		image_light: PersonLight,
		id: 'friends',
	},
	{
		image: Messenger,
		image_light: MessengerLight,
		id: 'chatList',
	},
	{
		image: Bell,
		image_light: BellLight,
		id: 'alarm',
	},
	// {
	// 	image_light: Expand,
	// 	id: 'expand',
	// },
];
const HeaderChattingModal = ({
	visible,
	close,
	userInfo,
	changeMenu,
	menu,
	changeChatNav,
	chatNav,
	addFriend,
	searchFriend,
	searchFriendInfo,
	friendExistence,
	removeInfo,
	reqFriendList,
	friendList,
	chatUserInfo,
	selectUserInfo,
	isChatModalState,
	chatModalState,
}) => {
	return (
		<div
			className="HeaderChattingModal"
			style={{ display: visible ? 'inherit' : 'none' }}
		>
			<div
				className="background"
				onClick={() => isChatModalState(!chatModalState)}
			/>
			{chatNav === 'addFriends' && (
				<FriendsRoom
					addFriend={addFriend}
					changeChatNav={changeChatNav}
					chatNav={chatNav}
					reduxMenu={menu}
					searchFriend={searchFriend}
					searchFriendInfo={searchFriendInfo}
					friendExistence={friendExistence}
					reqFriendList={reqFriendList}
					friendList={friendList}
					selectUserInfo={selectUserInfo}
				/>
			)}
			{chatNav === 'addChating' && (
				<FriendsRoom
					changeChatNav={changeChatNav}
					chatNav={chatNav}
					friends={friends}
					reduxMenu={menu}
					reqFriendList={reqFriendList}
					friendList={friendList}
					selectUserInfo={selectUserInfo}
				/>
			)}
			{chatNav === 'chatingRoom' && (
				<ChattingRoom
					changeChatNav={changeChatNav}
					chatNav={chatNav}
					chatUserInfo={chatUserInfo}
				/>
			)}
			<div className="wrapper">
				<div className="HeaderChattingModal--Crew">
					<div className="title--wrapper">
						{/* <div className="title">동료 찾기</div> */}
						<div></div>
						<div className="img--box">
							<img
								className="img"
								src={closeBtn}
								alt="addFriendsImg"
								onClick={() => close(false)}
							/>
						</div>
					</div>
					{/* <div className="crew--list">
						{crewList.map((crew, index) => {
							return (
								<div className="crew--circle" key={index}>
									<img src={crew.crew_image} />
									{crew.status != 0 && (
										<div className="status--circle">{crew.status}</div>
									)}
								</div>
							);
						})}
					</div> */}
				</div>
				{chatNav === 'friends' ? (
					<div className="HeaderChattingModal--Friends">
						<FriendList
							myInfo={userInfo}
							changeChatNav={changeChatNav}
							menu={menu}
							removeInfo={removeInfo}
							reqFriendList={reqFriendList}
							friendList={friendList}
						/>
					</div>
				) : chatNav === 'chatList' ? (
					<div className="HeaderChattingModal--Chattings">
						<ChattingList
							chatList={chattings}
							changeChatNav={changeChatNav}
							menu={menu}
							selectUserInfo={selectUserInfo}
						/>
					</div>
				) : chatNav === 'alarm' ? (
					<div className="HeaderChattingModal--Alarm">
						<AlarmList alarmList={alarmList} />
						<div className="small--title">알림</div>
						<div className="Alarm--list">
							{alarmList.map((alarm, index) => {
								const typeText = alarm.alarm_type;
								const alarmType =
									alarm.alarm_type === 'invite'
										? '초대'
										: alarm.alarm_type === 'answer'
										? '답변'
										: alarm.alarm_type === 'comment'
										? '댓글'
										: null;
								return (
									<div className="Alarm--row">
										<span className="type">[{alarmType}]</span>
										<span className="infoText">
											{typeText === 'invite' && `${alarm.nickname} 님이 `}
											{typeText === 'answer' &&
												'1:1 문의하신 질문에 답변이 달렸습니다. '}
											{typeText === 'comment' &&
												`${alarm.nickname} 님이 댓글을 달렸습니다 `}
										</span>
										<span className="infoBlue">
											{typeText === 'invite' && `${alarm.colleague_name} `}
											{typeText === 'answer' &&
												"'" + alarm.question_title + "'"}
											{typeText === 'comment' && "'" + alarm.comment + "'"}
										</span>
										<span className="infoText">
											{typeText === 'invite' && '에 초대하셨습니다.'}
										</span>
										<div className="time--ago">{alarm.createdAt}</div>
									</div>
								);
							})}
						</div>
					</div>
				) : null}

				<div className="HeaderChattingModal--Footer">
					{crewNavigation.map((nav, index) => {
						// console.log(nav.id);
						return (
							<div
								className="footer--nav"
								onClick={() => {
									nav.id != 'expand'
										? changeChatNav(nav.id)
										: (changeMenu('chatting'), close());
								}}
								key={index}
							>
								{chatNav === nav.id ? <nav.image /> : <nav.image_light />}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		userInfo: state.auth.userInfo,
		menu: state.layout.menu,
		chatNav: state.layout.chatNav,
		searchFriendInfo: state.chatting.searchFriendInfo,
		friendExistence: state.chatting.friendExistence,
		friendList: state.chatting.friendList,
		chatUserInfo: state.chatting.chatUserInfo,
		chatModalState: state.chatting.chatModalState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		changeChatNav: chatNav => dispatch(changeChatNav(chatNav)),
		addFriend: friendName => dispatch(addFriend(friendName)),
		searchFriend: friendName => dispatch(searchFriend(friendName)),
		removeInfo: () => dispatch(removeInfo()),
		reqFriendList: () => dispatch(reqFriendList()),
		selectUserInfo: info => dispatch(selectUserInfo(info)),
		isChatModalState: info => dispatch(isChatModalState(info)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(HeaderChattingModal);
