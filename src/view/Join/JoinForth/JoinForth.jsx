import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './JoinForth.scss';
import { ReactComponent as Logo } from '../../../static/images/Superplayer_L.svg';
import { ReactComponent as LogoS } from '../../../static/images/Logo_S.svg';
import Title from '../../../components/Title/Title';
import PenguinBoard from '../../../components/PenguinBoard/PenguinBoard';
import QuesitionTitle from '../../../components/QuesitionTitle/QuesitionTitle';
import JoinCard from '../../../components/JoinCard/JoinCard';
import Button from '../../../components/Button/Button';
import Media from 'react-media';
import { StepProgressBar } from '../../../components/StepProgressBar/StepProgressBar';
import { choose } from '../../../Utils/func';
import { ReactComponent as Showcase } from '../../../static/images/Join/successSinup.svg';
import alone from '../../../static/images/Join/alone.svg';
import together from '../../../static/images/Join/together.svg';

const JoinForth = ({
	selectQuestion,
	userTaste,
	changeJoinSubMenu,
	joinSubMenu,
	changeMenu,
}) => {
	const questionArray = [
		{
			type: 'single',
			img: alone,
			text: '혼자',
		},
		{
			type: 'multi',
			img: together,
			text: '여럿이',
		},
	];

	return (
		<Media query={{ maxWidth: 768 }}>
			{matches =>
				matches ? (
					//************************
					// 모바일
					//************************/
					<div className="JoinFourth">
						{joinSubMenu === 'fourth' && (
							<div
								className={`success_bord${
									!joinSubMenu === 'fourth' ? alert : ''
								}`}
							>
								<Showcase className="img" />
								<div>
									<b>슈퍼플레이어</b>가 되신 것을 축하드려요!
								</div>
							</div>
						)}
						<div className="JoinFourth--Header">
							<div className="title">취향선택</div>
							<div className="skip" onClick={() => changeMenu('home')}>
								skip
							</div>
						</div>
						<div className="JoinFourth--Body">
							<QuesitionTitle number={1}>누구랑 게임하세요? </QuesitionTitle>
							<div className="body">
								<div className="bar">
									<StepProgressBar step={1} />
								</div>
								<div className="cards">
									{questionArray.map((item, idx) => {
										return (
											<>
												<div className="mobile-card">
													<JoinCard
														item={item}
														key={idx}
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
															{item.text}
														</div>
													</JoinCard>
												</div>
											</>
										);
									})}
								</div>
							</div>
						</div>
						<div className="JoinFourth--Footer">
							<div className="back" onClick={() => changeMenu('home')}>
								뒤로
							</div>
							<div className="next" onClick={() => changeJoinSubMenu('fifth')}>
								선택완료
							</div>
						</div>
					</div>
				) : (
					//************************
					// 데스크
					//************************/
					<div className="JoinFourth">
						<header className="header--wrapper">
							<Link to="/" className="Logos" onClick={() => changeMenu('home')}>
								<LogoS className="LOGOS" />
								<Logo className="LOGOS" />
							</Link>
							<Button
								size="radius"
								color="butaet"
								outline
								onClick={() => changeJoinSubMenu('fifth')}
							>
								다음
							</Button>
						</header>
						{joinSubMenu === 'fourth' && (
							<div
								className={`success_bord${
									!joinSubMenu === 'fourth' ? alert : ''
								}`}
							>
								<Showcase className="img" />
								<div>
									<b>슈퍼플레이어</b>가 되신 것을 축하드려요!
								</div>
							</div>
						)}
						<div className="JoinFourth-title">
							{/* <Title border="thick" size="large">
								취향선택
							</Title> */}
						</div>
						<div className="JoinFourth--progressBar">
							<StepProgressBar step={1} />
							<div className="JoinFourth-question">
								<div className="title--box">
									<QuesitionTitle number={1}>누구랑 게임하세요</QuesitionTitle>
									<Button
										size="small"
										color="only-gray"
										onClick={() => changeMenu('home')}
									>
										skip
									</Button>
								</div>
								<div className="JoinFourth-question--cardGroup">
									{questionArray.map(item => {
										return (
											<>
												<div className="desc-card">
													<JoinCard
														key={item.type}
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
													</JoinCard>
													<div className="text">{item.text}</div>
												</div>
											</>
										);
									})}
								</div>
								<div className="JoinFourth-question--button"></div>
							</div>
						</div>
					</div>
				)
			}
		</Media>
	);
};

export default JoinForth;
