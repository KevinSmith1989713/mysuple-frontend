import React, { useState } from 'react';
import './FindEmail.scss';
import Title from '../../../components/Title/Title';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import utils from '../../../Utils/utils';

const FindEmail = ({ changeMenu, findEmail }) => {
	const [inputs, setInputs] = useState({
		name: '',
		telNumber: '',
	});

	const { name, telNumber } = inputs;

	const onChange = e => {
		const { name, value } = e.target;

		if (name === 'telNumber') {
			setInputs({
				...inputs,
				telNumber: utils.phoneFormat(value),
			});
		} else {
			setInputs({
				...inputs,
				[name]: value,
			});
		}
	};

	const onClick = () => {
		findEmail(name, telNumber);
	};

	return (
		<div className="FindEmail">
			<div className="FindEmail-form">
				<div className="FindEmail-form--title">
					<Title size="large">이메일 찾기</Title>
				</div>
				<span className="FindEmail-form--text">
					슈플 가입 시 사용한 핸드폰 번호를 입력해주시면 비밀번호 재설정 메일을
					보내드립니다.
				</span>
				<div className="FindEmail-form--input">
					<Input
						placeholder="이름"
						value={name}
						onChange={e => onChange(e)}
						name="name"
					/>
				</div>
				<div className="FindEmail-form--input">
					<Input
						placeholder="휴대폰 번호 ex) 010-1234-1234"
						value={telNumber}
						onChange={e => onChange(e)}
						name="telNumber"
					/>
				</div>
				<div className="FindEmail-form--button">
					<Button onClick={() => onClick()}>이메일 찾기</Button>
				</div>
				<span
					className="FindEmail-form--password"
					onClick={() => changeMenu('resetPwd')}
				>
					비밀번호를 잊어버렸어요
				</span>
			</div>
		</div>
	);
};

export default FindEmail;
