import React from 'react';
import './AuthContainer.scss';
import { connect } from 'react-redux';

import { changeMenu, changeJoinSubMenu } from '../../store/Layout/Layout.store';
import Input from '../../components/Input/Input';
import { loginInputs, loginMenu } from '../../assets/dummyData/AuthData';
import Title from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import CheckBox from '../../components/CheckBox/CheckBox';
import SNSBox from '../../components/SNSBox/SNSBox';
import { reqLocalSignIn, reqSocialSignIn } from '../../store/Auth/Auth.store';
import { emailCheck, signUp } from '../../store/Auth/Auth.store';
import { logPageView } from '../../Utils/analytics';
class AuthContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			platform: 'l',
			isChecked: false,
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onChan입eCheckBox = this.onChangeCheckBox.bind(this);
	}

	componentDidMount() {
		logPageView('플랫폼 페이지');
	}

	onChangeInput(e) {
		const { name, value } = e.target;

		this.setState({
			[name]: value,
		});
	}

	onChangeCheckBox(e) {
		const { checked } = e.target;

		if (checked) this.setState({ isChecked: true });
		else this.setState({ isChecked: false });
	}

	onClickSubmit = e => {
		const { email, password, isChecked, platform } = this.state;
		const { reqLocalSignIn } = this.props;

		if (email === '') {
			alert('이메일을 입력해주세요.');
		} else if (
			!/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/.test(email)
		) {
			alert('이메일 형식으로 작성해주세요.');
		} else if (password === '') {
			alert('비밀번호를 입력해주세요.');
		} else {
			reqLocalSignIn(email, password, platform);
		}
	};

	render() {
		const {
			changeMenu,
			changeJoinSubMenu,
			menu,
			reqSocialSignIn,
			signUp,
			emailCheck,
		} = this.props;

		return (
			<div className="AuthContainer">
				<div className="board" />
				<div className="AuthContainer--login">
					<Title size="large" border="none">
						LOGIN
					</Title>
				</div>
				{loginInputs.map(item => {
					return (
						<Input
							className="AuthContainer--input"
							key={item.id}
							name={item.name}
							placeholder={item.placeholder}
							value={this.state[item.name]}
							onChange={this.onChangeInput}
							type={item.type}
							onClick={this.onClickSubmit}
						/>
					);
				})}
				<div className="AuthContainer--button">
					<Button onClick={this.onClickSubmit}>로그인</Button>
				</div>
				{/* <CheckBox
					checked={this.state.isChecked}
					onChange={this.onChangeCheckBox}
				>
					로그인 유지
				</CheckBox> */}
				<ul className="AuthContainer--linkGroup">
					{loginMenu.map(item => {
						return (
							<li
								key={item.id}
								className={item.key === 'findEmail' ? 'middleList' : null}
								onClick={() => {
									changeMenu(item.key);
									// changeJoinSubMenu('fourth');
								}}
							>
								{item.name}
							</li>
						);
					})}
				</ul>
				<SNSBox
					type={menu}
					reqSocialSignIn={reqSocialSignIn}
					emailCheck={emailCheck}
					signUp={signUp}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		menu: state.layout.menu,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		changeJoinSubMenu: menu => dispatch(changeJoinSubMenu(menu)),
		reqLocalSignIn: (email, password, platform) =>
			dispatch(reqLocalSignIn(email, password, platform)),
		reqSocialSignIn: (email, platform, name, avatar_url) =>
			dispatch(reqSocialSignIn(email, platform, name, avatar_url)),
		emailCheck: (email, type, name, avatar_url) =>
			dispatch(emailCheck(email, type, name, avatar_url)),
		signUp: (
			email,
			name,
			nickname,
			password,
			phone,
			passwd_q,
			passwd_a,
			gender,
			birth,
			marketing_consent,
			permanent_member,
			avatar_url,
			platform,
			age,
		) =>
			dispatch(
				signUp(
					email,
					name,
					nickname,
					password,
					phone,
					passwd_q,
					passwd_a,
					gender,
					birth,
					marketing_consent,
					permanent_member,
					avatar_url,
					platform,
					age,
				),
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
