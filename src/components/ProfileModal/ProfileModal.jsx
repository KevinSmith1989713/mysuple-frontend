import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import Modal from '../Modal/Modal';

import './ProfileModal.scss';
import Title from '../Title/Title';
import Button from '../Button/Button';
import Input from '../Input/Input';

import axios from 'axios';
import { url } from '../../constants/apiUrl.js';

const ProfileModal = ({
	userInfo,
	isOpen,
	close,
	reqProfileUpdate,
	closeModal,
}) => {
	const getUserInfo = JSON.parse(localStorage.getItem('data'));

	const [file, setFile] = useState('');
	const [comment, setComment] = useState(
		!!getUserInfo && getUserInfo.avatarDesc,
	);

	const [nickname, setNickname] = useState(
		!!getUserInfo && getUserInfo.nickName,
	);
	const [nicknameCheck, setNickNameCheck] = useState(false);
	const [nicknameSameCheck, setNickNameSameCheck] = useState(false);
	const [imagePreviewUrl, setImagePreviewUrl] = useState('');

	const onChange = useCallback(
		e => {
			setNickname(e.target.value);
			setNickNameCheck(false);
			setNickNameSameCheck(false);
		},
		[nickname, nicknameCheck],
	);

	const onChangeFile = e => {
		e.preventDefault();
		let reader = new FileReader();
		let file1 = e.target.files[0];

		reader.onloadend = () => {
			setFile(file1);
			setImagePreviewUrl(reader.result);
		};
		reader.readAsDataURL(file1);
		setNickNameCheck(true);
	};

	const onChangeComment = useCallback(
		e => {
			setComment(e.target.value);
		},
		[comment],
	);

	const onClickSubmit = () => {
		if (nickname === getUserInfo.nickName) {
			reqProfileUpdate(file, nickname, comment);
			setNickNameCheck(false);
			closeModal();
		} else if (nickname.length >= 1 && nickname !== getUserInfo.nickName) {
			try {
				axios
					.post(`${url.file}/SameNicknameCheck`, {
						id: !!getUserInfo && getUserInfo.id,
						nickname: nickname,
					})
					.then(res => {
						if (res.data.Info.code === 0) {
							reqProfileUpdate(file, nickname, comment);
							setNickNameCheck(true);
							setNickNameSameCheck(false);
							closeModal();
						} else if (res.data.Info.code === -1) {
							setNickNameCheck(false);
							setNickNameSameCheck(true);
						}
					});
			} catch (e) {
				console.error(e);
			}
		}

		// else alert('닉네임을 입려해 주세요.');

		// if (nicknameCheck === true) {
		// 	reqProfileUpdate(file, nickname, comment);
		// 	setNickNameCheck(false);
		// 	closeModal();
		// }
		// else {
		// 	alert('닉네임 체크를 해주세요.');
		// }
	};

	let $imagePreview = null;
	if (imagePreviewUrl) {
		$imagePreview = <img src={imagePreviewUrl} />;
	} else {
		$imagePreview = <img src={!!getUserInfo && getUserInfo.avatarUrl} />;
	}

	return (
		<Modal className="ProfileModal" isOpen={isOpen} close={() => close()}>
			<div className="ProfileModal--Header">
				<Title size="large" border="no">
					프로필 수정
				</Title>
			</div>
			<div className="ProfileModal--Info">
				<div className="profile--img">
					{$imagePreview}
					<div className="btn">변경</div>
					<input
						type="file"
						className="file-class"
						onChange={e => onChangeFile(e)}
					/>
				</div>
				<div className="profile--infos">
					<div className="nickName--box">
						<div className="title">닉네임</div>
						{/* <button onClick={checkNickName}>중복체크</button> */}
					</div>
					<Input
						onChange={e => onChange(e)}
						onClick={() => setNickNameCheck(false)}
						name="nickname"
						value={nickname}
					/>
					{nicknameCheck && (
						<div className="nicknameCheck">사용 가능합니다.</div>
					)}
					{nicknameSameCheck && (
						<div className="nicknameSameCheck">사용중입니다.</div>
					)}
				</div>
			</div>
			<div className="comment--box">
				<div className="title">대화명 </div>
				<Input
					className="comment__input"
					onChange={e => onChangeComment(e)}
					onClick={() => setNickNameCheck(false)}
					name="comment"
					value={comment === 'undefined' ? '' : comment}
					// maxlength="100"
				/>
				<div className="comment__count">
					{comment === '' ? 0 : !!comment && comment.length}/100 자
				</div>
			</div>
			<div className="ProfileModal--Btn">
				<Button
					className="btn"
					size="medium"
					color="gray"
					onClick={() => {
						close();
						setNickNameCheck(false);
						setComment(!!getUserInfo && getUserInfo.avatarDesc);
					}}
				>
					취소
				</Button>
				<Button className="btn" size="medium" onClick={() => onClickSubmit()}>
					프로필 수정
				</Button>
			</div>
		</Modal>
	);
};
export default ProfileModal;
