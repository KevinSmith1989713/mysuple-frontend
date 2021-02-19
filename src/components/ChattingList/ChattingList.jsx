import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { url } from '../../constants/apiUrl.js';
import moment from 'moment';

import search from '../../static/images/Chatting/search.svg';
import addChating from '../../static/images/Chatting/addChating.svg';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';

import './ChattingList.scss';
const getUserInfo = JSON.parse(localStorage.getItem('data'));

const ChattingList = ({ changeChatNav, setSub, menu, selectUserInfo }) => {
	const [chatList, setChatList] = useState([]);
	useEffect(() => {
		try {
			axios
				.post(`${url.file}/ChatListSelect`, {
					option: 'list',
					id: getUserInfo.id,
					id_chat: getUserInfo.id_chat,
				})
				.then(res => {
					setChatList(res.data.Info && res.data.Info.messages_list);
				});
		} catch (e) {
			console.error(e);
		}
	}, []);

	return (
		<div className="ChattingList">
			<div className="title--wrapper">
				<div className="title">친구 목록</div>
				<div className="img--box">
					{menu === 'home' ? (
						<img
							src={addChating}
							alt="addFriendsImg"
							onClick={() => changeChatNav('addChating')}
						/>
					) : (
						<img
							src={addChating}
							alt="addFriendsImg"
							onClick={() => {
								setSub('chatting');
								changeChatNav('addChating');
							}}
						/>
					)}
					<img src={search} alt="searchImg" />
				</div>
			</div>
			<div className="Chatting--list">
				{chatList === undefined
					? ''
					: chatList.map((chatroom, index) => {
							return (
								<div
									className="chatroom"
									key={index}
									type="button"
									onClick={() => {
										changeChatNav('chatingRoom');
										selectUserInfo(chatroom);
									}}
								>
									<img
										src={
											chatroom.avatar_url === null || chatroom.avatar_url === ''
												? defaultAvatar
												: chatroom.avatar_url
										}
									/>
									<div className="chatroom--info">
										<div className="name">
											{!!chatroom && chatroom.nickname}
											{/* <span>{!!chatroom && chatroom.chatroomCnt}</span> */}
										</div>
										<div className="recent--msg">
											{!!chatroom && chatroom.message}
										</div>
									</div>
									<div className="chatroom--date">
										<div className="updated--date">
											{moment(chatroom.createdAt).format('h:mm a')}
										</div>
										<div className={chatroom.read ? 'unread none' : 'unread'}>
											{!!chatroom && chatroom.unReadCnt}
										</div>
									</div>
								</div>
							);
					  })}
			</div>
		</div>
	);
};

export default ChattingList;
