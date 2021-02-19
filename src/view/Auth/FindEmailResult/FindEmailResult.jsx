import React from 'react';
import './FindEmailResult.scss';
import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';
import { questionOptions } from '../../../assets/dummyData/AuthData';

const FindEmailResult = ({ userInfo, changeMenu }) => {
	const { name, showEmail } = userInfo;

	return (
		<div className="FindEmailResult">
			<div className="FindEmailResult-form">
				<div className="FindEmailResult-form--title">
					<Title size="large">이메일 찾기</Title>
				</div>
				<div className="FindEmailResult-form--content">
					<span>{name}</span> 님의 이메일은 <span>{showEmail}</span> 입니다
				</div>
				<div className="FindEmailResult-form--button">
					<Button onClick={() => changeMenu('login')}>로그인 하러가기</Button>
				</div>
				<div className="FindEmailResult-form--button">
					<Button onClick={() => changeMenu('findEmailAll')}>
						전체 이메일 찾기
					</Button>
				</div>
				<div className="FindEmailResult-form--button">
					<Button onClick={() => changeMenu('resetPwd')}>
						비밀번호 초기화
					</Button>
				</div>
			</div>
		</div>
	);
};

export default FindEmailResult;
