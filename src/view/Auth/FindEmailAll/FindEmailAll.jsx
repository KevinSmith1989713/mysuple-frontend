import React, { useState } from 'react';
import './FindEmailAll.scss';
import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';
import { questionOptions } from '../../../assets/dummyData/AuthData';

const FindEmailAll = ({ userInfo, changeMenu, changeSuccess }) => {
	const [text, setValue] = useState('');
	const [count, setCount] = useState(1);
	const { passwd_q, passwd_a } = userInfo;

	const question = questionOptions.filter(item => item.value === passwd_q)[0]
		.label;

	const onChangeAnswer = e => {
		const { value } = e.target;

		setValue(value);
	};

	const onClick = () => {
		if (text === passwd_a) {
			changeSuccess(true);
			changeMenu('findEmailAllResult');
		} else {
			if (count !== 3) {
				setValue('');
				alert(`답이 틀렸습니다. ${3 - count}회 남았습니다.`);
				setCount(count + 1);
			} else {
				changeSuccess(false);
				changeMenu('findEmailAllResult');
			}
		}
	};

	return (
		<div className="FindEmailAll">
			<div className="FindEmailAll-form">
				<div className="FindEmailAll-form--title">
					<Title size="large">전체 이메일 찾기</Title>
				</div>
				<span className="FindEmailAll-form--text">
					가입시 선택했던 문제의 답을 써 주세요. <b>({count}/3)</b> <br />
					3번 실패 시 계정이 1일간 잠기게 되니 주의하세요!
				</span>
				<span className="FindEmailAll-form--question">{question}</span>
				<div className="FindEmailAll-form--section">
					<input
						className="FindEmailAll-form--answer"
						type="text"
						onChange={e => onChangeAnswer(e)}
						value={text}
					/>
				</div>
				<div className="FindEmailAll-form--button">
					<Button onClick={() => onClick()}>확인</Button>
				</div>
			</div>
		</div>
	);
};

export default FindEmailAll;
