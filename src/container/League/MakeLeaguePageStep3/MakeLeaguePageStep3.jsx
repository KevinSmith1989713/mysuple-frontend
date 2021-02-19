import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import Title from '../../../components/Title/Title';
import { StepProgressBar } from '../../../components/StepProgressBar/StepProgressBar';
import Button from '../../../components/Button/Button';
import ticket from '../../../static/images/League/ticket.svg';
import ticket2 from '../../../static/images/League/ticket2.svg';
import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import './MakeLeaguePageStep3.scss';

const MakeLeaguePageStep3 = ({
	insertLeagueInfo,
	banList,
	questionList,
	makeLeague,
	temporayModal,
	openTemporaryModal,
	makeTemporaryLeague,
	passCount,
	insertPass,
	getPassCount,
}) => {
	let history = useHistory();
	const [flag, setFalg] = useState(false);
	const [check, setCheck] = useState(false);
	const [joinPass, setJoinPass] = useState(0);
	const [sponsorPass, setSponsorPass] = useState(0);
	const [persentage, setPersentage] = useState(100);
	const [rewardNumber, setRewardNumber] = useState(1);
	const [rewardList, setRewardList] = useState([
		{ value: 0, reward: '', percent: '100%' },
	]);
	const [payModal, setPayModal] = useState(false);
	const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
	useEffect(() => {}, [flag]);
	useEffect(() => {
		getPassCount();
	}, []);
	const onChangeValue = e => {
		e.target.name === 'joinPass' && setJoinPass(e.target.value);
		e.target.name === 'sponsorPass' && setSponsorPass(e.target.value);
	};

	const reward = rewardList.map((item, idx) => {
		return Number(item.reward);
	});

	let max = 0;
	for (let i = 0; i < reward.length; i++) {
		max = max + reward[i];
	}
	max > 100 ? alert('순위보상 100%로 설정해주세요.') : '';
	// console.log(max);
	const isRankinReward = () => {
		let array = [];
		setRewardNumber(rewardNumber + 1);

		if (max >= 100) {
			alert('100% 초과했습니다.');
		} else {
			array.push({ value: rewardNumber, reward: '' });
		}

		setRewardList([...rewardList, ...array]);
	};

	const isRewardInput = (item, e) => {
		let array = [];
		rewardList.map(item2 => {
			item2.value === item.value
				? Number(e.target.value) < 100
					? array.push({
							...item2,
							reward: e.target.value,
					  })
					: array.push({
							...item2,
							reward: 100,
					  })
				: array.push(item2);
		});
		setRewardList(array);
	};

	const objReward = {};
	rewardList.map(item => {
		objReward[`${item.value + 1}등`] = Number(item.reward);
		return item;
	});
	const submit = () => {
		const reward_ratio = objReward['1등'] === 0 ? { '1등': 100 } : objReward;
		if (check === false) {
			alert('약관에 동의해 주세요.');
		} else if (sponsorPass > passCount) {
			setPayModal(!payModal);
		} else if (max > 100) {
			alert('순위보상 100%로 설정해주세요.');
		} else {
			makeLeague(
				insertLeagueInfo.league_title,
				insertLeagueInfo.game_id === undefined
					? null
					: insertLeagueInfo.game_id,
				insertLeagueInfo.game_title,
				insertLeagueInfo.game_title_kr === undefined
					? null
					: insertLeagueInfo.game_title_kr,
				insertLeagueInfo.league_type,
				insertLeagueInfo.auto_join,
				insertLeagueInfo.outsourcing,
				insertLeagueInfo.limit_people,
				insertLeagueInfo.member_count,
				insertLeagueInfo.waiting_people,
				insertLeagueInfo.league_main_img === undefined
					? null
					: insertLeagueInfo.league_main_img,
				insertLeagueInfo.league_sub_img,
				insertLeagueInfo.apply_start,
				insertLeagueInfo.apply_end,
				insertLeagueInfo.start_date,
				insertLeagueInfo.desc === undefined ? null : insertLeagueInfo.desc,
				insertLeagueInfo.ban,
				questionList,
				joinPass,
				sponsorPass,
				reward_ratio,
			);
			// insertPass(
			// 	null,
			// 	2,
			// 	2,
			// 	-sponsorPass,
			// 	`${insertLeagueInfo.league_title} + 주최`,
			// );
		}
	};
	const saveTemporary = () => {
		const reward_ratio = objReward['1등'] === 0 ? { '1등': 100 } : objReward;
		makeTemporaryLeague(
			insertLeagueInfo.league_title === undefined
				? null
				: insertLeagueInfo.league_title,
			insertLeagueInfo.game_id === undefined ? null : insertLeagueInfo.game_id,
			insertLeagueInfo.game_title === undefined
				? null
				: insertLeagueInfo.game_title,
			insertLeagueInfo.game_title_kr === undefined
				? null
				: insertLeagueInfo.game_title_kr,
			insertLeagueInfo.league_type,
			insertLeagueInfo.auto_join,
			'0',
			insertLeagueInfo.limit_people,
			insertLeagueInfo.member_count,
			insertLeagueInfo.waiting_people,
			insertLeagueInfo.league_main_img === undefined
				? null
				: insertLeagueInfo.league_main_img,
			null,
			insertLeagueInfo.apply_start,
			insertLeagueInfo.apply_end,
			insertLeagueInfo.start_date,
			insertLeagueInfo.desc === undefined ? null : insertLeagueInfo.desc,
			banList,
			questionList,
			'0',
			'0',
			reward_ratio,
		);
	};

	return (
		<div className="MakeLeagueContainerStep3">
			{getUserInfo === null ? (
				<>{alert('로그인 후 이용 가능합니다.')}</>
			) : (
				<>
					{window.innerWidth < 768 ? (
						''
					) : (
						<Title border="thick" size="large">
							리그 생성하기
						</Title>
					)}
					<header className="mobile__header--box">
						<button
							className="homeBtn"
							onClick={() => {
								history.push('/');
							}}
						>
							{'<'}
						</button>
						<span className="title">리그 만들기</span>
						<button
							className="temporaryBtn"
							type="button"
							onClick={() => {
								openTemporaryModal(!temporayModal);
							}}
						>
							{/* <span className="text">임시 저장</span> */}
							{/* <span className="text number">9</span> */}
						</button>
					</header>
					<div className="MakeLeagueContainerStep3--inner">
						<div>
							<StepProgressBar step={3} />
						</div>
						<div className="contantsContainer">
							<header className="info__header--box">
								<img src={ticket} />
								<div className="header__title">Price</div>
								<div className="header__subTitle">상금</div>
							</header>
							<div className="path--box">
								<div className="path">
									<div className="pathText">참여 패스</div>
									<div className="pathCount">
										<img src={ticket2} />
										<input
											className="count"
											type="number"
											name="joinPass"
											value={joinPass}
											onChange={onChangeValue}
										/>
										개
									</div>
								</div>
								<div className="path">
									<div className="pathText">주최자 기부 패스</div>
									<div className="pathCount">
										<img src={ticket2} />
										<input
											className="count"
											type="number"
											name="sponsorPass"
											value={sponsorPass}
											onChange={onChangeValue}
										/>
										개
									</div>
									<div className="myTicket">
										내 보유 티켓 <strong>{passCount}</strong> 개
									</div>
								</div>
							</div>
							<div className="ranking--box">
								<div className="rankingTitle">
									순위보상<strong>팀의 경우 1/N</strong>
								</div>
								<div className="rankingPercentage--box">
									<div>
										{rewardList.map((item, index) => {
											return (
												<div className="rankingPercentage" key={index}>
													{index + 1}등
													<input
														className="percentage"
														placeholder={
															rewardList.length > 1 ? '' : item.percent
														}
														value={item.reward}
														name={item.value}
														onChange={e => isRewardInput(item, e)}
														maxLength="3"
														type="number"
													/>
													{rewardList.length === index + 1 && index !== 0 ? (
														<div
															className="delete"
															type="button"
															onClick={() => {
																rewardList.pop();
																setFalg(!flag);
															}}
														>
															X
														</div>
													) : (
														''
													)}
												</div>
											);
										})}
									</div>
									<button onClick={isRankinReward}>+</button>
								</div>
							</div>
							<header className="info__header--box">
								<img src={ticket} />
								<div className="header__title">Terms</div>
								<div className="header__subTitle">약관</div>
							</header>
							<div className="term">
							리그 작성 완료 시 즉시 사이트에 해당 내용이 게재되며, 게임정보, 구분, 사전질문은 이후 수정 및 변경이 불가합니다. 리그 정책에 따라 이 사항은 수정될 수 있습니다.
							리그 작성 완료 시 사이트를 이용하는 모든 이용자에게 리그 정보가 공개됩니다. 약관 동의에 체크할 경우 <a href="http://mysuple.com/terms">리그 이용약관</a>에 동의되며 즉시 리그가 생성됩니다.
							동의하십니까?

							</div>
							<div className="termAgree--box">
								<input type="checkBox" onClick={() => setCheck(!check)} />
								네, 동의합니다.
							</div>
							<div className="btn">
								{/* <button type="button">
									<span
										className="text"
										type="button"
										onClick={() => {
											saveTemporary();
										}}
									>
										임시 저장
									</span>
									<span
										className="text number"
										onClick={() => openTemporaryModal(!temporayModal)}
									>
										9
									</span>
								</button> */}
								{window.innerWidth > 768 ? (
									<button onClick={() => history.push('./step2')}>이전</button>
								) : (
									''
								)}
								<button onClick={submit}>작성 완료</button>
							</div>
							<footer className="mobileBtn--box">
								<button
									onClick={() => {
										history.push('./step2');
									}}
								>
									이전
								</button>
								<button onClick={submit}>작성 완료</button>
							</footer>
						</div>
					</div>
				</>
			)}
			{payModal ? (
				<div className="modal--container">
					<div className="background" onClick={() => setPayModal(!payModal)} />
					<article className="modal--box">
						<div className="modal__title">
							<h1>리그 참가</h1>
							<button>
								<img
									className="closeBtn"
									src={closeBtnGray}
									onClick={() => setPayModal(!payModal)}
								/>
							</button>
						</div>
						<div className="modal--inner">
							<b>{sponsorPass - passCount}</b> 개의 티켓이 추가로 필요합니다.
							<br /> 결제하시겠습니까?
						</div>
						<Button
							className="modalBtn"
							size="medium"
							onClick={() => history.push('/pay')}
						>
							결제하기
						</Button>
					</article>
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default MakeLeaguePageStep3;
