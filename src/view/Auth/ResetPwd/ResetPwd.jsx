import React from 'react';
import './ResetPwd.scss';
import Title from '../../../components/Title/Title';
import yellowWarning from '../../../static/images/findEmail/error.png';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

const ResetPwd = ({ changeMenu, sendResetPassword }) => {
	const [email, setEmail] = React.useState('');

	const onChange = e => {
		const { name, value } = e.target;
		setEmail(value);
	};

	const sendEmail = () => {
		
		sendResetPassword(email);
	};
	return (
		<div className="ResetPwd">
			<div className="ResetPwd-form">
				<div className="ResetPwd-form--title">
					<Title size="large">비밀번호 초기화</Title>
				</div>
				<div className="ResetPwd-form--section">
					<img src={yellowWarning} alt="warning-icon" />
					<span className="ResetPwd-form--text">
						SNS 연동의 경우 연결된 계정을 확인해주세요.
					</span>
				</div>
				<div className="ResetPwd-form--input">
					<Input
						placeholder="가입한 계정의 이메일을 입력하세요"
						value={email}
						onChange={e => onChange(e)}
						name="email"
					/>
				</div>
				<div className="ResetPwd-form--button">
					<Button onClick={sendEmail}>이메일 보내기</Button>
				</div>
				<span
					className="ResetPwd-form--password"
					onClick={() => changeMenu('findEmail')}
				>
					아이디를 잊어버렸어요
				</span>
			</div>
		</div>
	);
};

export default ResetPwd;
