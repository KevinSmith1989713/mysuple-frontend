import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { path } from '../../../assets/dummyData/AuthData';
import { url } from '../../../constants/apiUrl.js';

import CertificationModal from './CertificationModal';

import myInfoPath from '../../../static/images/MobileMenu/mobileMenuImg2.svg';
import checkMarkBlue from '../../../static/images/checkmarkBlue.svg';

import './MyPass.scss';

const MyPass = ({
	reqMyContantsList,
	myContantsList,
	deleteMyContents,
	leaguenoticeState,
	// passCount,
	// getPassCount,
}) => {
	let history = useHistory();
	const getUserInfo = JSON.parse(localStorage.getItem('data'));
	const [page, setPage] = useState(false);
	const [checked, setChecked] = useState(0);
	const [flag, setFlag] = useState(false);
	const [passHistory, passSetHistory] = useState([]);
	const [amount, setAmount] = useState('');
	const [agree, setAgree] = useState(false);
	const [apply, setApply] = useState(false);
	const [applyState, setApplyState] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [certificationState, setCertificationState] = useState(false);
	const [passCount, setPassCount] = useState(0);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/PassHistoryList`, {
					id: getUserInfo && getUserInfo.id,
				})
				.then(res => {
					setCertificationState(res.data.Info.pass_auth_check);
					passSetHistory(res.data.Info && res.data.Info.pass_history);
				});
			axios
				.post(`${url.file}/PassCount`, {
					id: getUserInfo && getUserInfo.id,
				})
				.then(res => {
					setPassCount(res.data.Info.pass_count);
				});
		} catch (e) {
			console.error(e);
		}
	}, [flag]);

	useEffect(() => {
		reqMyContantsList();
	}, [leaguenoticeState]);

	const isExchangeInsert = () => {
		if (!certificationState) {
			alert('본인 인증이 되지 않았습니다.');
		} else if (passCount * 1000 < 20000) {
			('');
		} else if (amount < 20000) {
			('');
		} else {
			try {
				axios
					.post(`${url.file}/PassExchangeInsert`, {
						dev: '/PassExchangeInsert',
						id: getUserInfo && getUserInfo.id,
						amount: amount === '' ? 0 : Number(amount),
					})
					.then(res => {
						setApply(true);
						setTimeout(() => {
							setApply(false);
						}, 1000);
						setPage(!page);
						setFlag(!flag);
						setAgree(!agree);
						setAmount(0);
					});
			} catch (e) {
				console.error(e);
			}
		}
	};
	const numberWithCommas = x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};
	return (
		<div className="MyPass">
			{!page ? (
				<>
					<div className="myStatusContainer">
						<div className="innerBox--box">
							<div className="innerBox">
								<div className="text">
									<img className="img" src={myInfoPath} />
									보유중인 패스
								</div>
								<div className="text">
									<b>{numberWithCommas(passCount)}</b>개
								</div>
							</div>
							<div className="innerBox">
								<div className="text pay">
									<img className="img" src={myInfoPath} />
									나의 상금액
								</div>
								<div className="text pay">
									<b>0</b>원
								</div>
							</div>
						</div>
						<div className="btn--box">
							<button className="button" onClick={() => setPage(!page)}>
								상금 환전하기
							</button>
							<button className="button" onClick={() => history.push('/pay')}>
								패스 충전하기
							</button>
						</div>
					</div>
					<div className="History">
						<div className="title--box">
							{window.innerWidth < 769 ? (
								''
							) : (
								<div className="title">히스토리</div>
							)}
						</div>
						<div className="category--container">
							<div className="categoryContents--box">
								<div className="caterory--box ">
									<div className="categoryTitle bold date ">날짜</div>
									<div className="categoryTitle bold category">내역</div>
									<div className="categoryTitle bold account">증 / 차감</div>
								</div>
							</div>

							{!!passHistory &&
								passHistory.map((item, index) => {
									return (
										<>
											<div className="categoryContents--box" key={index}>
												<div className="caterory--box">
													<div className="categoryTitle date ">
														{item.createdAt.substring(0, 10).replace(/-/g, '.')}
													</div>
													{window.innerWidth < 769 ? (
														<div className="categoryTitle category">
															{item.desc.length > 10
																? `${item.desc.substring(0, 11)}...`
																: item.desc}
														</div>
													) : (
														<div className="categoryTitle category">
															{item.desc.length > 20
																? `${item.desc.substring(0, 21)}...`
																: item.desc}
														</div>
													)}
													<div className="categoryTitle account blueColor">
														{item.account > 0 ? (
															`+${item.account}`
														) : (
															<b>{item.account}</b>
														)}
													</div>
												</div>
											</div>
										</>
									);
								})}
						</div>
					</div>
				</>
			) : (
				<>
					<div className="exchange__title">패스 환전</div>
					<div className="Info">
						<div className="inner--box padding">
							<div className="total--box">
								<div>
									<img className="path__img" src={myInfoPath} /> 나의 상금액
								</div>
								<div className="money">
									<b>{numberWithCommas(passCount * 1000)}</b>원
								</div>
							</div>
							<div className="exchange--box">
								<div className="text--box">
									<span>인출 가능 상금액</span>
									<span>
										<b>
											{passCount * 1000 < 20000
												? 0
												: numberWithCommas(passCount * 1000)}
										</b>
										원
									</span>
								</div>
								<div className="input--box">
									<input
										className="input"
										type="number"
										value={amount}
										onChange={e => setAmount(e.target.value)}
									/>
									<button
										className="all__btn"
										onClick={() => {
											passCount * 1000 < 20000
												? 0
												: setAmount(passCount * 1000);
										}}
									>
										전액신청
									</button>
								</div>
								<div className="subTitle">
									* 2만원 이상부터 인출 가능합니다.
								</div>
							</div>
						</div>
						<div className="inner--box">
							<div className="free" />
							<div className="certification--box">
								<div className="certification">
									<span>본인인증</span>
									{certificationState ? (
										<span className="certification__btn complete">
											인증완료 <img src={checkMarkBlue} />
										</span>
									) : (
										<button
											className="certification__btn"
											onClick={() => setOpenModal(!openModal)}
										>
											인증하기
										</button>
									)}
								</div>
								<div className="certification border ">
									<span>신청가능기간</span>
									<span className="blueColor">매월 20~30일</span>
								</div>
							</div>
						</div>
						<div className="btn--box">
							<div className="agree__text">
								<input
									type="checkbox"
									onClick={() => setAgree(!agree)}
									checked={agree ? true : false}
								/>
								<b>개인정보 제공 및 활용 동의</b>
							</div>
							<button
								className="btn"
								onClick={() => {
									agree
										? isExchangeInsert()
										: alert('개인정보 제공 및 활용 동의해주세요.');
								}}
							>
								환전신청
							</button>
						</div>
					</div>
				</>
			)}
			<div className={`box__alert${apply ? ' alert' : ''}`}>
				<strong>환전신청이 완료 되었습니다.</strong>
			</div>
			<div className={`box__alert${applyState ? ' alert' : ''}`}>
				<strong>인승신청 되었습니다.</strong>
			</div>
			{openModal && (
				<CertificationModal
					openModal={openModal}
					setOpenModal={setOpenModal}
					setApplyState={setApplyState}
					flag={flag}
					setFlag={setFlag}
				/>
			)}
		</div>
	);
};

export default MyPass;
