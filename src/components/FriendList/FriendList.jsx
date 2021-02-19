import React, { useEffect } from 'react';
import './FriendList.scss';

import search from '../../static/images/Chatting/search.svg';
import addFriend from '../../static/images/Chatting/addFriend.svg';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';

const FriendList = ({
	myInfo,
	changeChatNav,
	menu,
	setSub,
	removeInfo,
	reqFriendList,
	friendList,
}) => {
	useEffect(() => {
		reqFriendList();
	}, []);

	return (
		<div className="Friends">
			<div className="title--wrapper">
				<div className="title">친구 목록</div>
				<div className="img--box">
					{menu === 'home' ? (
						<img
							src={addFriend}
							alt="addFriendsImg"
							onClick={() => {
								removeInfo();
								changeChatNav('addFriends');
							}}
						/>
					) : (
						<img
							src={addFriend}
							alt="addFriendsImg"
							onClick={() => {
								// setSub('addFriends');
								changeChatNav('addFriends');
							}}
						/>
					)}

					<img src={search} alt="searchImg" />
				</div>
			</div>
			{/* <div className="Friends--Mine">
				<div className="profile">
					<img src={!!myInfo && myInfo.avatarUrl} />
					<div className="status" />
				</div>
				<div className="info">
					<div className="guild">&lt;어쩌구길드&gt;</div>
					<div className="nickname">{myInfo.nickName}</div>
					<div className="status">메이플 스토리 접속중</div>
				</div>
			</div> */}
			<div className="Friends--List">
				{/* <div className="small--title">
					새로운 친구<b>1</b>
				</div>
				<div className="friends--list">
					<div className="friend">
						<div className="profile">
							<img src="ㅇ" />
							<div className="status" />
						</div>
						<div className="nickname">이름</div>
					</div>
				</div> */}
				<div className="small--title">
					나의 친구<b>{friendList.length}</b>
				</div>
				<div className="friends--list">
					{friendList.map((friend, index) => {
						return (
							<div className="friend" key={index}>
								<div className="profile">
									<img
										src={
											friend.avatar_url === null || friend.avatar_url === ''
												? defaultAvatar
												: friend.avatar_url
										}
									/>
									<div className="status" />
								</div>
								<div className="nickname">{friend.nickname}</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default FriendList;
