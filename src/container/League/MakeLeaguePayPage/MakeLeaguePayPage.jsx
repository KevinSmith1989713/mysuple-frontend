import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import Title from '../../../components/Title/Title';
import Fobidden from '../../../components/Forbidden/Forbidden';

import myInfoPath from '../../../static/images/MobileMenu/mobileMenuImg2.svg';

import { path } from '../../../assets/dummyData/AuthData';

import './MakeLeaguePayPage.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const payList = [
	{ name: '카드', value: 'card' },
	{ name: '실시간계좌이체', value: 'trans' },
	{ name: '가상계좌', value: 'vbank' },
];
const MakeLeaguePayPage = () => {
	const [selectPay, setSelectPay] = useState('card');
	const [amount, setAmout] = useState(0);
	const [term, setTerm] = useState(false);
	const [paths, setPaths] = useState(0);
	const [_uid, set_uid] = useState('');
	// const [buyer_tel, setBuyer_tel] = useState('');

	const selectPath = (e, item) => {
		setAmout(amount + Number(e.target.id) * 1100);
		setPaths(paths + Number(item && item.path));
	};
	const reset = () => {
		setPaths(0);
		setAmout(0);
	};

	const numberWithCommas = x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const handleSubmit = values => {
		axios
			.post(`${url.file}/OrderInsert`, {
				id: getUserInfo.id,
				payment_name: `${amount / 1100} 장`,
				amount_to_be_paid: amount,
			})
			.then(res => {
				const merchant_uid = res.data.Info.order_info.merchant_uid;
				const buyer_tel = res.data.Info.order_info.buyer_tel;
				const pay_method = selectPay;
				const buyer_name = '(주)원더베리';
				const biz_num = '757-88-01307';
				const { pg, buyer_email, escrow } = values;
				const name = '패스 구입';
				const data = {
					pg,
					pay_method,
					buyer_name,
					biz_num,
					merchant_uid,
					name,
					amount,
					buyer_tel,
					buyer_email,
					escrow,
				};

				const { IMP } = window;
				// const userCode = 'imp89421749';
				const userCode = 'imp00445180';
				if (amount < 500) {
					alert('결제금액을 선택해주세요.');
				} else if (selectPay === '') {
					alert('결제수단을 선택해주세요.');
				} else if (!term) {
					alert('약관에 동의해주세요.');
				} else {
					IMP.init(userCode);
					IMP.request_pay(data, function callback(rsp) {
						if (rsp.success) {
							axios
								.post(`${url.file}/IamportPay`, {
									id: getUserInfo.id,
									dev: '/IamportPay',
									imp_uid: rsp.imp_uid,
									merchant_uid: res.data.Info.order_info.merchant_uid,
								})
								.then(res => {});
							reset();
						} else {
							// alert('결제가 취소되었습니다.');
						}
					});
				}
			});
	};

	return (
		<div className="MakeLeaguePayPageContainer">
			{getUserInfo === null ? (
				<Fobidden />
			) : (
				<>
					{window.innerWidth < 768 ? (
						''
					) : (
						<Title border="thick" size="large">
							결제하기
						</Title>
					)}
					<div className="MakeLeaguePayPageContainer--inner">
						{/* {window.innerWidth < 768 ? '' : <LeagueMyinfo />} */}
						<div className="explainBox  ">
							<div className="explainTitle">패스란?</div>
							<div className="explain">
								슈퍼플레이어 내에서 리그 참여 시 사용하는 참가 티켓입니다.
								패스는 슈퍼플레이어 사이트 내에서만 유효하며 유료 리그에
								참여하는 경우 패스를 사용하여 리그에 참여하게 됩니다.
							</div>
						</div>
						<div className="payBox">
							<div className="payBox--buyPath">
								<div className="buyPathInner">
									<div className="explainTitle">
										패스 구입하기<strong>VAT 별도</strong>
									</div>
									<div className="pathContainer">
										{path.map((item, index) => {
											return (
												<div
													className="pathBox"
													key={index}
													id={item.value}
													onClick={e => selectPath(e, item)}
												>
													<div
														className="path"
														id={item.value}
														onClick={e => selectPath(e)}
													>
														<img src={myInfoPath} />
														{item.pathText}
													</div>
													<div>
														<div
															className="money"
															id={item.value}
															onClick={e => selectPath(e)}
														>
															{item.money}
														</div>
													</div>
												</div>
											);
										})}
									</div>
								</div>
								<div className="pay">
									<div className="pay-text">결제 수단</div>
									<div className="pay--box">
										{payList.map((item, idx) => {
											return (
												<button
													className={
														selectPay === item.value ? 'box select ' : 'box'
													}
													key={idx}
													onClick={() => {
														setSelectPay(item.value);
													}}
												>
													{item.name}
												</button>
											);
										})}
									</div>
								</div>
							</div>
							<div className="payViewContainer">
								<div className="title">결제하기</div>
								<div className="pathCount--box">
									{amount >= 1 ? (
										<>
											<div className="text">
												패스
												<div className="count">x {`${paths}`}</div>
											</div>
											<div className="close" onClick={reset}>
												x
											</div>
										</>
									) : (
										''
									)}
								</div>
								<div className="vat--box">
									<div className="vat">VAT</div>
									<div className="money">{`${numberWithCommas(
										amount / 11,
									)}원`}</div>
								</div>
								<div className="total--box">
									<div className="totalText">Total</div>
									<div className="totalText money">{`${numberWithCommas(
										amount,
									)}원`}</div>
								</div>
								<div className="term--box">
									<input
										className="checkBox"
										type="checkBox"
										onClick={() => setTerm(!term)}
									/>
									<div className="termText">
										<Link to={'/paidterms'} target="blank">
											<strong>약관</strong>
										</Link>
										에 동의합니다.
									</div>
								</div>
								<button type="button" onClick={handleSubmit}>
									결제하기
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default MakeLeaguePayPage;
