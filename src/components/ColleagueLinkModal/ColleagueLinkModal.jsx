import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';
import { connect } from 'react-redux';

import { changeChatNav } from '../../store/Layout/Layout.store';
import { isChatModalState } from '../../store/Chatting/Chatting.store';

import pc from '../../static/images/Colleague/pc.svg';
import mobile from '../../static/images/Colleague/mobile.svg';
import consol from '../../static/images/Colleague/consol.svg';
import closeBtnGray from '../../static/images/closeBtnGray.svg';
import faceGoodGray from '../../static/images/Colleague/faceGoodGray.svg';
import faceNomalGray from '../../static/images/Colleague/faceNomalGray.svg';
import faceNotgoodGray from '../../static/images/Colleague/faceNotgoodGray.svg';
import message from '../../static/images/Colleague/message.svg';
import discodImg from '../../static/images/Colleague/discodImg.svg';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';

import './ColleagueLinkModal.scss';

const ColleagueLinkModal = ({
	linkModalOpen,
	setLinkModalOpen,
	linkInfo,
	linkUrl,
	setFlag,
	flag,
	changeChatNav,
	isChatModalState,
	chatModalState,
	reportModalState,
	isReportModalState,
}) => {
	const [userInfo, setUserInfo] = useState({});
	const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
	const [evaluation, setEvaluation] = useState([]);

	const goodCount = [];
	const nomarlCount = [];
	const badCound = [];

	evaluation.map(item => {
		item.user_feedback_obj_type === 1 &&
			goodCount.push(item.user_feedback_obj_type);
		item.user_feedback_obj_type === 2 &&
			nomarlCount.push(item.user_feedback_obj_type);
		item.user_feedback_obj_type === 3 &&
			badCound.push(item.user_feedback_obj_type);
		return;
	});

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/EvaluationSelect`, {
					crew_id: linkInfo.crew_id,
					// nickname: linkInfo.nickname,
					// id: getUserInfo.id,
				})
				.then(res => {
					setEvaluation(res.data.Info.evaluation);
					setUserInfo(res.data.Info.user_info);
				});
		} catch (e) {
			console.error(e);
		}
	}, []);

	const isMatche = () => {
		setLinkModalOpen(!linkModalOpen);
		try {
			axios
				.post(`${url.file}/MatchInsert`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					crew_id: linkInfo.crew_id,
				})
				.then(res => {
					setFlag(!flag);
				});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="ColleagueLinkModal">
			<div
				className="background"
				onClick={() => {
					{
						setLinkModalOpen(!linkModalOpen);
					}
				}}
			/>

			<article className="modal--box">
				<div className="modal__title">
					<div className="info--box">
						<img
							className="profile"
							src={!!userInfo.avatar_url ? userInfo.avatar_url : defaultAvatar}
						/>
						<div className="title--box">
							<div>
								{userInfo.nickname}
								<button className="viewBtn">프로필 보기 ></button>
							</div>
							<div className="face--box">
								<div className="face blue">
									<img className="img" src={faceGoodGray} /> {goodCount.length}
								</div>
								<div className="face orange">
									<img className="img" src={faceNotgoodGray} />
									{badCound.length}
								</div>
								<div className="face">
									<img className="img" src={faceNomalGray} />
									{nomarlCount.length}
								</div>
							</div>
						</div>
					</div>
					<button>
						<img
							className="closeBtn"
							src={closeBtnGray}
							onClick={() => setLinkModalOpen(!linkModalOpen)}
						/>
					</button>
				</div>

				<div className="modal--inner">
					<div className="gameInfo--box">
						<div>
							<img
								className="img"
								src={
									linkInfo.game_class === '0' || 0
										? pc
										: '' || linkInfo.game_class === '1' || 1
										? pc
										: '' || linkInfo.game_class === '2' || 2
										? mobile
										: consol
								}
							/>
							{linkInfo.game_title_kr}
						</div>
						<div className="gaem__title">{linkInfo.crew_title}</div>
					</div>
					<div
						type="button"
						className="btn"
						onClick={() => {
							isMatche();
							window.scrollTo({ top: 0, behavior: 'smooth' });
							isChatModalState(!chatModalState);
							// changeChatNav('chatList');
						}}
					>
						<img className="messageImg" src={message} /> 메세지 보내기
					</div>
					{linkUrl && linkUrl.substring(7, 17) === 'discord.gg' && (
						<a href={linkUrl} target="blank">
							<div
								type="button"
								className="btn discode"
								onClick={() => {
									isMatche();
								}}
							>
								<img className="messageImg" src={discodImg} /> 디스코드 채팅방
								들어가기
							</div>
						</a>
					)}
					{linkUrl &&
						linkUrl.substring(7, 17) !== 'discord.gg' &&
						linkUrl !== '' && (
							<a href={linkUrl} target="blank">
								<div
									type="button"
									className="btn"
									onClick={() => {
										isMatche();
									}}
								>
									바로가기
								</div>
							</a>
						)}
				</div>
				<button
					className="Link__report"
					onClick={() => {
						isReportModalState(!reportModalState);
						setLinkModalOpen(!linkModalOpen);
					}}
				>
					신고
				</button>
			</article>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		chatModalState: state.chatting.chatModalState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeChatNav: chatNav => dispatch(changeChatNav(chatNav)),
		isChatModalState: info => dispatch(isChatModalState(info)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ColleagueLinkModal);
