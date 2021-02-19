import React, { useState } from 'react';
import './FindEmailAllResult.scss';
import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';

import yellowWarning from '../../../static/images/findEmail/error.png';

const FindEmailAllResult = ({
	isSuccess,
	userInfo,
	changeMenu,
	changeJoinSubmenu,
}) => {
	const { name, email } = userInfo;
	return (
		<div className="FIndEmailAllResult">
			<div className="FIndEmailAllResult-form">
				<div className="FIndEmailAllResult-form--title">
					<Title size="large">전체 이메일 찾기</Title>
				</div>
				{isSuccess ? (
					<div className="FIndEmailAllResult-form--success">
						<div className="FIndEmailAllResult-form--success__content">
							<span>{name}</span> 님의 이메일은
							<br /> <span>{email}</span> 입니다
						</div>
						<div className="FIndEmailAllResult-form--success__button">
							<Button
								onClick={() => {
									changeJoinSubmenu('first');
									changeMenu('login');
								}}
							>
								로그인 하러가기
							</Button>
						</div>
						<div className="FIndEmailAllResult-form--success__button">
							<Button
								onClick={() => {
									changeJoinSubmenu('first');
									changeMenu('resetPwd');
								}}
							>
								비밀번호 초기화 메일보내기
							</Button>
						</div>
					</div>
				) : (
					<div className="FIndEmailAllResult-form--failure">
						<span className="FIndEmailAllResult-form--failure__text">
							<img src={yellowWarning} />
							<span>
								모든 답이 틀렸습니다. <b>(3/3)</b>
							</span>
						</span>
						<div className="FIndEmailAllResult-form--failure__button">
							<Button
								onClick={() => {
									changeJoinSubmenu('first');
									changeMenu('join');
								}}
							>
								새로 가입하기
							</Button>
						</div>
						<div className="FIndEmailAllResult-form--failure__button">
							<Button onClick={() => changeMenu('inquire')}>관리자 문의</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default FindEmailAllResult;
