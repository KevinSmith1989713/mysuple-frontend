import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './JoinFifth.scss';
import Title from '../../../components/Title/Title';
import { ReactComponent as Logo } from '../../../static/images/Superplayer_L.svg';
import { ReactComponent as LogoS } from '../../../static/images/Logo_S.svg';
import QuesitionTitle from '../../../components/QuesitionTitle/QuesitionTitle';
import JoinCard from '../../../components/JoinCard/JoinCard';
import Button from '../../../components/Button/Button';
import Media from 'react-media';
import StepProgressBar from '../../../components/StepProgressBar/StepProgressBar';
import { choose } from '../../../Utils/func';
import pc from '../../../static/images/Colleague/pc.svg';
import mobile from '../../../static/images/Colleague/mobile.svg';
import consol from '../../../static/images/Colleague/consol.svg';

const JoinFifth = ({
	selectQuestion,
	changeJoinSubMenu,
	userTaste,
	changeMenu,
}) => {
	const questionArray = [
		{
			type: 'pc',
			img: pc,
			value: 'PC',
		},
		{
			type: 'mobile',
			img: mobile,
			value: '모바일',
		},
		{
			type: 'console1',
			// miniText: '(PS4, 닌텐도 등)',
			img: consol,
			value: '콘솔',
		},
	];

	const selctUserTaste = () => {
		// console.log('dss');
		axios.post('https://spp.life/InsertUserTaste', { userTaste });
		// .then(res => console.log(res));
	};

	return (
		<Media query={{ maxWidth: 768 }}>
			{matches =>
				matches ? (
					//************************
					// 모바일
					//************************/
					<div className="JoinFifth">
						<div className="JoinFifth--Header">
							<div className="skip" />
							<div className="title">취향선택</div>
							<div className="skip" onClick={() => changeMenu('home')}>
								skip
							</div>
						</div>
						<div className="JoinFifth--Body">
							<QuesitionTitle number={2}>
								어떤 기기로 게임하세요?
							</QuesitionTitle>
							<div className="body">
								<div className="bar">
									<StepProgressBar step={2} />
								</div>
								<div className="cards">
									{questionArray.map(item => {
										return (
											<div className="mobile-card">
												<JoinCard
													miniText={item.miniText}
													key={item.id}
													selected={userTaste[`${item.type}`] === '1'}
													onClick={() =>
														choose(
															item.type,
															userTaste[`${item.type}`] === '0' ? '1' : '0',
															selectQuestion,
														)
													}
												>
													<img src={item.img} alt="tasteImg" />
													<div
														className={
															userTaste[`${item.type}`] === '1'
																? 'text text-white'
																: 'text '
														}
													>
														{' '}
														{item.value}
													</div>
												</JoinCard>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className="JoinFifth--Footer">
							<div className="back" onClick={() => changeJoinSubMenu('fourth')}>
								뒤로
							</div>
							<div className="next" onClick={selctUserTaste}>
								선택완료
							</div>
						</div>
					</div>
				) : (
					//************************
					// 데스크
					//************************/
					<div className="JoinFifth">
						<header className="header--wrapper">
							<Link to="/" className="Logos" onClick={() => changeMenu('home')}>
								<LogoS className="LOGOS logos" />
								<Logo className="LOGOS logo" />
							</Link>
							<div className="button--wrapper">
								<Button
									className="back"
									size="radius"
									color="butaet"
									outline
									onClick={() => changeJoinSubMenu('fourth')}
								>
									이전으로
								</Button>
								<Link to="/" onClick={() => changeMenu('home')}>
									<Button
										size="radius"
										color="butaet"
										outline
										onClick={selctUserTaste}
										// onClick={() => changeMenu('home')}
									>
										완료
									</Button>
								</Link>
							</div>
						</header>
						<div className="JoinFifth-title">
							{/* <Title border="thick" size="large">
								취향선택
							</Title> */}
						</div>
						<div className="JoinFifth--progressBar">
							<StepProgressBar step={2} />
							<div className="JoinFifth-question">
								<div className="title--box">
									<QuesitionTitle number={2}>
										어떤 기기로 게임하세요?
									</QuesitionTitle>
									<Button
										size="small"
										color="only-gray"
										onClick={() => changeMenu('home')}
									>
										skip
									</Button>
								</div>
								<div className="JoinFifth-question--cardGroup">
									{questionArray.map(item => {
										return (
											<JoinCard
												miniText={item.miniText}
												key={item.id}
												selected={userTaste[`${item.type}`] === '1'}
												onClick={() =>
													choose(
														item.type,
														userTaste[`${item.type}`] === '0' ? '1' : '0',
														selectQuestion,
													)
												}
											>
												<div className="device--wrapper">
													<img src={item.img} alt="tasteImg" />
													{item.value}
												</div>
											</JoinCard>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				)
			}
		</Media>
	);
};

export default JoinFifth;
