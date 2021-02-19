import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';
import './Passport.scss';
import logo from '../../static/images/Passport/group-87@3x.png';
import defaultAvatar from '../../static/images/Passport/default-avatar.svg';
import settings from '../../static/images/Passport/settings.svg';
import checkmark from '../../static/images/checkmarkBlue.svg';
import Button from '../Button/Button';
import ProfileModal from '../ProfileModal/ProfileModal';
import Media from 'react-media';
import moment from 'moment';

import { useHistory } from 'react-router-dom';

const Passport = ({
	userInfo,
	onClick,
	reqProfileUpdate,
	onClickChangeMenu,
	myContantsList,
	reqMyContantsList,
	changeMenu,
}) => {
	let history = useHistory();

	const [flag, setFlag] = useState(false);
	const [modal, isModalOpen] = useState(false);
	const [succes, setSucces] = useState(false);
	const option = [
		{
			text: '내가 쓴 글',
			count: myContantsList && myContantsList.length,
			function: () => {
				onClick('myWriting');
			},
		},
		{ text: '즐겨찾기', function: {} },
		{
			text: '1 : 1 문의내역',
			function: () => onClick('inquiry'),
		},
		{
			text: '로그아웃',
			function: () => {
				onClickChangeMenu('login');

				localStorage.clear();
			},
		},
	];

	const openModal = () => {
		isModalOpen(true);
	};

	const closeModal = () => {
		isModalOpen(false);
	};

	useEffect(() => {
		reqMyContantsList();
	}, []);

	const getUserInfo = JSON.parse(localStorage.getItem('data'));

	const Certification = () => {
		/* 1. 가맹점 식별하기 */
		const { IMP } = window;
		const userCode = 'imp00445180';

		/* 2. 본인인증 데이터 정의하기 */
		const data = {
			merchant_uid: 'merchant_' + new Date().getTime(),
		};

		/* 4. 본인인증 창 호출하기 */
		IMP.init(userCode);
		IMP.certification(data, function callback(response) {
			const { success, imp_uid } = response;
			if (success) {
				axios
					.post(`${url.file}/IamportCert`, {
						id: getUserInfo.id,
						imp_uid: imp_uid,
					})
					.then(res => {
						setSucces(res.data.Info.message.certified);
						localStorage.setItem(
							'data',
							JSON.stringify({ ...getUserInfo, certified: 1 }),
						);

						window.location.reload();
						// localStorage.setItem(
						// 	'data2',
						// 	JSON.stringify({ ...getUserInfo, certified: 1 }),
						// );
					});
			}
		});
	};

	useEffect(() => {}, [succes]);

	return (
		<>
			<ProfileModal
				userInfo={userInfo}
				isOpen={modal}
				close={() => closeModal()}
				reqProfileUpdate={reqProfileUpdate}
				closeModal={closeModal}
			/>
			<div className="Passport">
				<div className="Passport--content">
					<div className="img--content">
						<div className="profile--box">
							<img
								className="profile"
								src={
									!!getUserInfo && getUserInfo.avatarUrl
										? getUserInfo.avatarUrl
										: defaultAvatar
								}
								alt="profile"
								onClick={() => openModal()}
							/>
							<img
								className="settings"
								src={settings}
								onClick={() => openModal()}
							/>
						</div>
						<div className="img-text">
							여권번호/Passport No.
							<p className="img-sub-text">M123232132</p>
						</div>
						<div className="img-text">
							발급입
							<p className="img-sub-text">
								{moment(!!getUserInfo && getUserInfo.joinDate).format(
									'YYYY-MM-DD',
								)}
							</p>
						</div>
					</div>
					<div className="info--content">
						<div className="title--box">
							<div className="title">여권 PASSPORT</div>
							<div className="blue-bar" />
						</div>
						<div className="name-text">Name/성명</div>
						<div className="name--box">
							<div className="name" onClick={() => openModal()}>
								{!!getUserInfo && getUserInfo.nickName}{' '}
							</div>
							{getUserInfo === null ? (
								''
							) : getUserInfo.certified === null && !succes ? (
								<button className="button" onClick={Certification}>
									본인인증하기
								</button>
							) : (
								<div className="done">
									<img className="check" src={checkmark} />
									인증완료
								</div>
							)}
						</div>
						<div className="comment">
							{!!getUserInfo && getUserInfo.avatarDesc === 'undefined'
								? ''
								: !!getUserInfo && getUserInfo.avatarDesc}
						</div>
						<div className="option--content">
							{option.map((item, index) => {
								return (
									<div
										className="option--box"
										key={index}
										onClick={() => item.function()}
									>
										{item.text}
										<div className="count">{item.count}</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>

			<Media query={{ maxWidth: 769 }}>
				<div className="Passport-mobile">
					<div className="Passport--content">
						<div className="info--content">
							<div className="title--box">
								<div className="title">여권 PASSPORT</div>
								<div className="blue-bar" />
							</div>
							<div className="profile--content ">
								<div className="profile--box">
									<img
										className="profile"
										src={
											!!getUserInfo && getUserInfo.avatarUrl
												? getUserInfo.avatarUrl
												: defaultAvatar
										}
										alt="profile"
										onClick={() => openModal()}
									/>
									<img
										className="settings"
										src={settings}
										onClick={() => openModal()}
									/>
								</div>
								<div className="text--box">
									<div className="name-text">Name/성명</div>
									<div className="name--box">
										<div className="name" onClick={() => openModal()}>
											{!!getUserInfo && getUserInfo.nickName}
										</div>
										{getUserInfo === null ? (
											''
										) : getUserInfo.certified === null ? (
											<button className="button" onClick={Certification}>
												본인인증하기
											</button>
										) : (
											<div className="done">
												<img className="check" src={checkmark} />
												인증완료
											</div>
										)}
									</div>
								</div>
							</div>
							<div className="comment">
								{!!getUserInfo && getUserInfo.avatarDesc === 'undefined'
									? ''
									: !!getUserInfo && getUserInfo.avatarDesc}
							</div>

							<div className="passport-text--content">
								<div className="img-text">
									여권번호/Passport No.
									<p className="img-sub-text">M123232132</p>
								</div>
								<div className="img-text">
									발급입
									<p className="img-sub-text">
										{moment(!!getUserInfo && getUserInfo.joinDate).format(
											'YYYY-MM-DD',
										)}
									</p>
								</div>
							</div>
							<div className="option--content">
								{option.map((item, index) => {
									return (
										<div
											className="option--box"
											key={index}
											onClick={() => item.function()}
										>
											{item.text}
											{item.count >= 0 && (
												<div className="count">{item.count}</div>
											)}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</Media>
		</>
	);
};

export default Passport;
