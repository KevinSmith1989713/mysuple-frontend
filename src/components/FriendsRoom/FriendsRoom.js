import React, { useState, useEffect } from 'react';
import './FriendsRoom.scss';
import search from '../../static/images/Chatting/search.svg';
import Input from '../Input/Input';
import Button from '../Button/Button';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';

const FriendsRoom = ({
	changeChatNav,
	chatNav,
	friends,
	reduxMenu,
	setSub,
	addFriend,
	searchFriend,
	searchFriendInfo,
	friendExistence,
	reqFriendList,
	friendList,
	selectUserInfo,
}) => {
	const [select, setSelect] = useState([]);
	const [flag, setFlag] = useState(false);
	const [inputName, setInputName] = useState('');

	useEffect(() => {
		reqFriendList();
	}, []);

	const onchangeInput = e => {
		setInputName(e.target.value);
	};

	const onClickTag = e => {
		if (select.indexOf(e.id_chat) != -1) {
			const newArr = select;
			const itemToFind = newArr.find(function(item) {
				return item === e.id_chat;
			});
			const idx = newArr.indexOf(itemToFind);
			if (idx > -1) newArr.splice(idx, 1);
			setSelect(newArr);
		} else {
			const newArr = select;
			setSelect([e.id_chat]);
			// newArr.push(e.id_chat);
		}
		setFlag(!flag);
		selectUserInfo(e);
	};

	useEffect(() => {}, [flag]);

	const viewFriend = () => {
		return searchFriendInfo !== null ? (
			<>
				<img
					src={
						!!searchFriendInfo && searchFriendInfo.friend_avatar_url
							? searchFriendInfo.friend_avatar_url
							: defaultAvatar
					}
				/>

				<div className="user-name">{searchFriendInfo.friend_nickname}</div>
				<Button size="medium" onClick={() => addFriend(inputName)}>
					친구추가
				</Button>
			</>
		) : !friendExistence ? (
			<div className="text">
				닉네임을 검색해서
				<br /> 친구추가 해보세요
			</div>
		) : (
			<div className="text">존재하지 않는 닉네임입니다.</div>
		);
	};

	return (
		<div className="addFriends--wrapper">
			<div className="header">
				{reduxMenu === 'home' && (
					<div className="back">
						<div
							onClick={() => {
								if (chatNav === 'addFriends') {
									changeChatNav('friends');
								} else {
									changeChatNav('chatList');
								}
							}}
						>
							{'<'}
						</div>
					</div>
				)}
				<div className="title">
					{chatNav === 'addFriends' ? '친구추가' : '채팅방 만들기'}
				</div>
			</div>
			<div className="body">
				{chatNav === 'addFriends' && (
					<div className="input">
						<Input
							view="search-left"
							placeholder="이름"
							onChange={e => onchangeInput(e)}
							onClick={() => {
								searchFriend(inputName);
							}}
						/>
					</div>
				)}

				{chatNav === 'addFriends' ? (
					<div className="img--box">{viewFriend()}</div>
				) : (
					// ''
					<div className="chating--box">
						<div className="small--title">
							나의 친구<b>15</b>
						</div>
						<div className="chating--list">
							{friendList.map((friend, index) => {
								// console.log(friend);
								return (
									<div className="chatingRoom" key={index}>
										<img
											src={
												friend.avatar_url === null || friend.avatar_url === ''
													? defaultAvatar
													: friend.avatar_url
											}
										/>

										<div className="roomName">{friend.nickname}</div>
										<span
											className={
												select.indexOf(friend.id_chat) != -1
													? 'span-tag selected'
													: 'span-tag '
											}
											id={friend.nickName}
											onClick={e => {
												onClickTag(friend);
											}}
										></span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
			{chatNav === 'addChating' && (
				<div>
					{reduxMenu === 'home' ? (
						<footer
							className={select.length >= 1 ? 'footer selected' : 'footer'}
							onClick={() => select.length >= 1 && changeChatNav('chatingRoom')}
						>
							채팅방 만들기
						</footer>
					) : (
						<footer
							className={select.length >= 1 ? 'footer selected' : 'footer'}
							onClick={() => select.length >= 1 && setSub('chatingRoom')}
						>
							채팅방 만들기 expand
						</footer>
					)}
				</div>
			)}
		</div>
	);
};

export default FriendsRoom;
