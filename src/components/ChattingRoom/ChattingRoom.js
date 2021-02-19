import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';
import moment from 'moment';

import star from '../../static/images/Chatting/star.svg';
import menuBar from '../../static/images/MobileMenu/menuBar.svg';
import enterBtn from '../../static/images/Chatting/enterBtn.svg';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';

import './ChattingRoom.scss';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

const ChattingRoom = ({ changeChatNav, reduxMenu, chatUserInfo }) => {
	const bottom = useRef(null);
	const [flag, setFlag] = useState(false);
	const [message, setMessage] = useState('');
	const [file, setFile] = useState('');
	const [imgFile, setImgFile] = useState('');
	const [channel, setChannel] = useState('');
	const [messageList, setMessageList] = useState(undefined);
	
	const onChangeFile = e => {
		e.preventDefault();
		let reader = new FileReader();
		let file1 = e.target.files[0];

		reader.onloadend = () => {
			setFile(file1);
		};
		reader.readAsDataURL(file1);
	};

	useEffect(() => {
		try {
			const options = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			const formData = new FormData();
			formData.append('image', file);
			axios.post(`${url.file}/LeagueImage`, formData, options).then(res => {
				setImgFile(res.data.link);
			});
		} catch (e) {
			console.error(e);
		}
		if (imgFile !== undefined && imgFile !== '') {
			try {
				axios
					.post(`${url.file}/ChatInsert`, {
						channel_id: (chatUserInfo && chatUserInfo.channel_id) || '',
						id: getUserInfo.id,
						from_user: getUserInfo.id_chat,
						to_user: chatUserInfo.id_chat,
						message: imgFile,
						message_type: file === '' ? 1 : 2,
						to_user_nick: chatUserInfo.nickname,
					})
					.then(res => {
						setFlag(!flag);
					});
			} catch (e) {
				console.error(e);
			}
		}
	}, [file, imgFile]);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/CheckChannel`, {
					id: getUserInfo.id,
					from_user: getUserInfo.id_chat,
					to_user: chatUserInfo.id_chat,
				})
				.then(res => {
					setChannel(res.data.Info && res.data.Info.channel_id);
				});
		} catch (e) {
			console.error(e);
		}
	}, []);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/ChatSelect`, {
					channel_id: channel || (chatUserInfo && chatUserInfo.channel_id),
					id: getUserInfo.id,
					id_chat: getUserInfo.id_chat,
				})
				.then(res => {
					setMessageList(res.data.Info && res.data.Info.messages);
				});
		} catch (e) {
			console.error(e);
		}
	}, [channel, flag]);
	const isInsert = e => {
		e.preventDefault();
		setMessage('');

		if (message !== '') {
			try {
				axios
					.post(`${url.file}/ChatInsert`, {
						channel_id: (chatUserInfo && chatUserInfo.channel_id) || '',
						id: getUserInfo.id,
						from_user: getUserInfo.id_chat,
						to_user: `${chatUserInfo.id_chat}`,
						message: message,
						message_type: file === '' ? 1 : 2,
						to_user_nick: chatUserInfo.nickname,
					})
					.then(res => {
						setFlag(!flag);
						// console.log(res);
					});
			} catch (e) {
				console.error(e);
			}
		}
	};

	return (
		<div className="chattingRoom--wrapper">
			<div className="header">
				<div className="back" onClick={() => changeChatNav('chatList')}>
					{'<'}
				</div>
				<div className="title">채팅방</div>
				<div className="menu--box">
					{/* <img src={star} /> */}
					{/* <img src={menuBar} /> */}
				</div>
			</div>
			<div className="body">
				{messageList === undefined
					? ''
					: messageList.map((item, idx) => {
							return (
								<>
									{item.me ? (
										<div className="my--box" key={idx}>
											<div className="smallInfo">
												{/* <div className="num">1</div> */}
												<div className="data">
													{moment(item.createdAt).format('h:mm a')}
												</div>
											</div>
											{item.message_type === 1 ? (
												<div className="contents">{item.message}</div>
											) : (
												<img className="userImg" src={item.message} />
											)}
										</div>
									) : (
										<div className="user--box" key={idx}>
											<img className="useImg" src={item.avatar_url} />
											<div className="contents--box">
												<div className="nickname">{item.writer}</div>
												<div className="box">
													{item.message_type === 1 ? (
														<div className="contents">{item.message}fsdfsdfsdfsdfsdfasdfasdfasdfasfddfasdf</div>
													) : (
														<img className="userImg" src={item.message} />
													)}
													<div className="smallInfo">
														{item.view === 1 ? (
															''
														) : (
															<div className="num">1</div>
														)}
														<div className="data">
															{moment(item.createdAt).format('h:mm a')}
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
								</>
							);
					  })}
			</div>
			<footer className="footer--box">
				<div className="imgUpload" type="button">
					<input type="file" onChange={e => onChangeFile(e)} />+
				</div>
				<div className="input--box">
					<textarea
						value={message}
						onChange={e => {
							setMessage(e.target.value);
						}}
						onKeyPress={e => {
							if (e.charCode === 13) {
								isInsert(e);
							}
						}}
					/>
				</div>
				<img type="button" src={enterBtn} onClick={isInsert} />
			</footer>
		</div>
	);
};

export default ChattingRoom;
