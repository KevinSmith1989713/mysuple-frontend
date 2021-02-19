import React from 'react';
import './JoinSecond.scss';
import Title from '../../../components/Title/Title';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import SNSBox from '../../../components/SNSBox/SNSBox';

import authService from '../../../services/authService';
let popup;
let isEnd;
class JoinSecond extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			sEncData: '',
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onChangeInput(e) {
		const { name, value } = e.target;

		this.setState({ [name]: value });
	}

	onClickSubmit(e) {
		const { emailCheck } = this.props;
		const { email } = this.state;
		if (/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/.test(email)) {
			emailCheck(email, 'local', null);
		} else {
			alert('이메일 형식에 맞게 입력하세요.');
		}
	}

	onClick() {
		authService
			.smsAuthenticate()
			.then(res => {
				// console.log(res.substring(1114,1596));
			
				this.setState({
					sEncData: res.sEncData,
				});
				// document.querySelector('#data-enc').value = res.sEncData;
				// console.log(document.querySelector('#data-enc').value);
			})
			.then(res => {
				popup = window.open(
					'',
					'popupChk',
					'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
				);

				document.form_chk.action =
					'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
				document.form_chk.target = 'popupChk';
				// console.log(docu)

				document.form_chk.submit();
				var loop = setInterval(function() {
					if (popup.closed) {
						isEnd = true;
					}
					if (isEnd) {
						authService.smsResultCheck().then(res => {
							console.log(res);
						});
						window.clearInterval(loop);
					}
				}, 1000);
			});
	}

	render() {
		const { emailCheck, signUp } = this.props;
		return (
			<div className="JoinSecond">
				{/* <button onClick={() => this.onClick()}>문자 인증</button> */}
				<form name="form_chk" method="post">
					<input type="hidden" name="m" value="checkplusService" />
					<input
						type="hidden"
						name="EncodeData"
						id="data-enc"
						value={this.state.sEncData}
					/>
				</form>
				<div className="JoinSecond--title">
					<Title size="large">이메일 확인</Title>
				</div>
				<div className="JoinSecond--content">
					<span className="title email">이메일</span>
					<div className="JoinSecond--content__input">
						{/* <form onSubmit={e => this.onClickSubmit(e)}>
							<input
								name="email"
								placeholder="suple@suple.com"
								value={this.state.email}
								onChange={e => this.onChangeInput(e)}
								type="text"
							/>
						</form> */}
						<Input
							name="email"
							placeholder="suple@suple.com"
							value={this.state.email}
							onChange={e => this.onChangeInput(e)}
							onClick={e => this.onClickSubmit(e)}
							type="text"
						/>
					</div>
					<div className="JoinSecond--content__button">
						<Button onClick={e => this.onClickSubmit(e)}>계속</Button>
					</div>
				</div>
				<div className="JoinSecond--downContent">
					<span className="title sns">SNS 회원가입</span>
					<div className="JoinSecond--downContent__snsBox">
						<SNSBox
							type="join"
							emailCheck={emailCheck}
							signUp={signUp}
							reqSocialSignIn={this.props.reqSocialSignIn}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default JoinSecond;
