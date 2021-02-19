import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import './RePassSettingContainer.scss';

const RePassSettingContainer = ({ resetPassword, isLoading }) => {
	const [pass, setPass] = useState('');
	const [rePass, setrePass] = useState('');
	const token = window.location.pathname.substring(15, 100);

	let history = useHistory();

	const onChangeInput = e => {
		const { name, value } = e.target;
		if (name === 'pass') {
			setPass(value);
		} else if (name === 'rePass') {
			setrePass(value);
		}
	};

	useEffect(() => {
		if (isLoading === true) {
			history.push('/');
		}
	}, [isLoading]);

	const onClickSubmit = () => {
		if (pass === '' || rePass === '') {
			alert('비밀번호를 입력해주세요');
		} else if (
			!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&_])[A-Za-z\d$@$!%*#?&_]{6,}$/.test(
				pass,
			)
		) {
			alert('영문 숫자 특수기호 3가지 조합 6자 이상으로 작성해주세요.');
		} else if (pass !== rePass) {
			alert('비밀번호가 일치하지 않습니다.');
		} else {
			resetPassword(rePass, token);
		}
	};

	return (
		<div className="RePassSettingContainer">
			<div className="RePassSettingContainer--title">
				<Title size="large">새 비밀번호 설정</Title>
			</div>
			<div className="RePassSettingContainer--content">
				<span className="title ">새로 바꾸실 비밀번호를 입력해주세요.</span>
				<div className="RePassSettingContainer--content__input">
					<Input
						name="pass"
						placeholder="새 비밀번호"
						value={pass}
						onChange={e => onChangeInput(e)}
						type="password"
					/>
					{!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&_])[A-Za-z\d$@$!%*#?&_]{6,}$/.test(
						pass,
					) ? (
						<div className="text red">
							*영문 숫자 특수기호 3가지 조합 6자 이상
						</div>
					) : (
						<div className="text blue">안전한 패스워드입니다.</div>
					)}

					<Input
						name="rePass"
						placeholder="새 비밀번호 재 입력"
						value={rePass}
						onChange={e => onChangeInput(e)}
						type="password"
					/>
					{pass.length > 0 && pass === rePass ? (
						<div className="text blue">비밀번호가 같습니다.</div>
					) : (
						<div className="text red">비밀번호가 같지 않습니다.</div>
					)}
				</div>
				<div className="JoinSecond--content__button">
					<Button onClick={onClickSubmit}>비빌번호 설정</Button>
				</div>
			</div>
		</div>
	);
};

export default RePassSettingContainer;
