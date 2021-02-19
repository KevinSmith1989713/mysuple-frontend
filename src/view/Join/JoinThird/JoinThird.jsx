import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

import { url } from '../../../constants/apiUrl.js';

import {
	questionOptions,
	JoinInputs1,
} from '../../../assets/dummyData/AuthData';
import JoinFirst from '../../../view/Join/JoinFirst/JoinFirst';

import Title from '../../../components/Title/Title';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';

import Upper from '../../../static/images/iconbox/UpperArrow.svg';
import Lower from '../../../static/images/iconbox/LowerArrow.svg';
import JoinImg from '../../../static/images/Join/joinImg.svg';
import { ReactComponent as Logo } from '../../../static/images/Superplayer_L.svg';
import { ReactComponent as LogoS } from '../../../static/images/Logo_S.svg';

import './JoinThird.scss';

let JoinInputs = JoinInputs1;

const JoinThird = ({
	email,
	signUp,
	marketing,
	member,
	// age,
	changeMenu,
	// use,
	// // person,
}) => {
	const [flag, setFlag] = useState(false);
	const [NiceId, setNiceId] = useState(false);
	const [textOpen, setTextOpen] = useState(false);
	const [termsOpen, setTermsOpen] = useState(false);
	const [use, setUse] = useState(false);
	const [person, setPerson] = useState(false);
	const [age, setAge] = useState(false);

	const [inputs, setInputs] = useState({
		email: email,
		password: '',
		pwdCheck: '',
		name: '',
		nickname: '',
		phone1: '010',
		phone2: '',
		phone3: '',
		passwd_q: '',
		passwd_a: '',
		gender: null,
		birth1: null,
		birth2: null,
		birth3: null,
		platform: 'l',
	});

	const {
		password,
		pwdCheck,
		name,
		nickname,
		phone1,
		phone2,
		phone3,
		passwd_q,
		passwd_a,
		gender,
		birth1,
		birth2,
		birth3,
		platform,
	} = inputs;

	const validatePassword = character => {
		if (
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&_])[A-Za-z\d$@$!%*#?&_]{6,}$/.test(
				character,
			)
		) {
			const filterArray = JoinInputs.map(item =>
				item.id === 2 ? { ...item, isTrue: true } : item,
			);
			JoinInputs = filterArray;
		} else {
			const filterArray = JoinInputs.map(item =>
				item.id === 2 ? { ...item, isTrue: false } : item,
			);
			JoinInputs = filterArray;
		}
	};

	const samePassword = (pwd, pwd_check) => {
		if (pwd === pwd_check) {
			const filterArray = JoinInputs.map(item =>
				item.id === 3 ? { ...item, isTrue: true } : item,
			);
			JoinInputs = filterArray;
		} else {
			const filterArray = JoinInputs.map(item =>
				item.id === 3 ? { ...item, isTrue: false } : item,
			);
			JoinInputs = filterArray;
		}
	};

	const onChange = e => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});

		if (name === 'password') {
			setInputs({
				...inputs,
				[name]: value,
			});
			validatePassword(value);
		} else if (name === 'pwdCheck') {
			if (
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&_])[A-Za-z\d$@$!%*#?&_]{6,}$/.test(
					password,
				)
			) {
				setInputs({
					...inputs,
					[name]: value,
				});
				samePassword(password, value);
			}
		} else {
			setInputs({
				...inputs,
				[name]: value,
			});
		}
	};

	const onChangeQuestion = selectedOption => {
		setInputs({
			...inputs,
			passwd_q: selectedOption.value,
		});
	};

	const onClick = () => {
		const phone = `${phone1}-${phone2}-${phone3}`;
		const birth = `${birth1}-${birth2}-${birth3}`;

		if (password.length > 0 && pwdCheck.length > 0 && password === pwdCheck) {
			if (use && person && age) {
				signUp(
					email,
					name,
					null,
					password,
					phone,
					passwd_q,
					passwd_a,
					gender,
					birth,
					marketing,
					member,
					null,
					platform,
					age,
				);
			} else {
				alert('필수 항목에 동의해주세요');
			}
		} else {
			alert('양식에 맞게 필수 항목을 채워주세요');
		}
	};
	const makeForm = (id, placeholder, value, name, type, onChange) => {
		if (id !== 6 && id !== 7 && id !== 9 && id !== 10 && id !== 1) {
			return (
				<Input
					placeholder={placeholder}
					value={value}
					name={name}
					type={type}
					onChange={onChange}
					view="join"
				/>
			);
		} else if (id === 1) {
			return <span className="JoinThird--container--email">{email}</span>;
		}
	};
	
	useEffect(() => {
		axios.get(`${url.file}/checkplus_main`).then(res => {
			setNiceId(res.data.Info.sEncData);
		});
	}, []);

	const fnPopup = () => {
		window.open(
			'',
			'popupChk',
			'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
		);
		document.form_chk.action =
			'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
		document.form_chk.target = 'popupChk';
		document.form_chk.submit();
	};

	const bringTerms = (use1, person1, age1) => {
		setUse(use1);
		setAge(age1);
		setPerson(person1);
	};

	return (
		<div className="JoinThird">
			<header className="header--wrapper">
				<Link to="/" className="Logos" onClick={() => changeMenu('home')}>
					<LogoS className="LOGOS logos" />
					<Logo className="LOGOS logo" />
				</Link>
				<Button size="radius" color="butaet" onClick={onClick}>
					가입완료
				</Button>
			</header>
			<div className="headerMobileBox">회원가입</div>
			<div className="JoinThird--container">
				<div className="JoinThird-title">
					<Title border="thick" size="large">
						정보기재
					</Title>
				</div>
				<div className="terms--container">
					<JoinFirst
						termsOpen={termsOpen}
						setTermsOpen={setTermsOpen}
						bringTerms={bringTerms}
					/>
				</div>
				<div className="inner--container">
					<div className="JoinThird-form">
						{JoinInputs.map(item => {
							// console.log(item);
							return (
								<div className="JoinThird-form--input" key={item.id}>
									<div className="JoinThird-form--input__title">
										<span className="JoinThird-form--input__title--text">
											{item.title}
										</span>
										{item.isRequired && (
											<span className="JoinThird-form--input__title--wild">
												*
											</span>
										)}
									</div>
									<div className="JoinThird-form__warning">
										{makeForm(
											item.id,
											item.placeholder,
											inputs[item.name],
											item.name,
											item.type,
											onChange,
										)}
										{!!item.falseMessage && (
											<span
												className={
													!item.isTrue ? 'danger-message' : 'warning-message'
												}
											>
												{item.isTrue ? item.trueMessage : item.falseMessage}
											</span>
										)}
									</div>
								</div>
							);
						})}
					</div>
					<div className="add_info--container">
						<div className="title-box" onClick={() => setTextOpen(!textOpen)}>
							<img src={!textOpen ? Lower : Upper} />
							<div className="title">부가정보 기재하기</div>
							<div className="sub-title">본인인증 및 비밀번호 찾기 시 사용</div>
						</div>
						<div
							className="title-box__mobile"
							onClick={() => setTextOpen(!textOpen)}
						>
							<img src={!textOpen ? Lower : Upper} />
							<div className="text--box">
								<div className="title">부가정보 기재하기</div>
								<div className="sub-title">
									본인인증 및 비밀번호 찾기 시 사용
								</div>
							</div>
						</div>
						{!textOpen ? (
							<div className="footer--box">
								<img src={JoinImg} />
								<div>
									부가정보 기재하고 비밀번호 찾기 및<br /> 리그결제 기능 활성화
									하세요!
								</div>
							</div>
						) : (
							<div className="sendText--box">
								{/* <Button className="btn" color="butaet" onClick={fnPopup}>
									<form name="form_chk" method="post">
										<input type="hidden" name="m" value="checkplusService" />
										<input type="hidden" name="EncodeData" value={NiceId} />
										<a>본인 인증</a>
									</form>
								</Button> */}
								<div className="q-title">사용자질문</div>
								<Select
									className="select-form"
									defaultValue={{ value: 0, label: '질문을 선택해주세요!' }}
									options={questionOptions}
									isSearchable={false}
									onChange={onChangeQuestion}
								/>
								<span className="danger-message">
									*아이디/비밀번호 찾기시 사용됩니다.
								</span>
								<div className="q-title">답변</div>
								<input className="a-input" />
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="footerBox">
				<button onClick={() => changeMenu('home')}>뒤로</button>
				<button onClick={onClick}>선택완료</button>
			</div>
		</div>
	);
};

export default JoinThird;
