import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';
import { useHistory } from 'react-router-dom';

import Button from '../../../components/Button/Button';
import { system, questionAnswer } from '../../../assets/dummyData/AuthData';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import more from '../../../static/images/moreBtn.svg';
import question from '../../../static/images/League/question.svg';
import firstImg from '../../../static/images/League/first.svg';
import secondImg from '../../../static/images/League/second.svg';
import myInfoPath from '../../../static/images/MobileMenu/mobileMenuImg2.svg';

import './WinnerModal.scss';
import { ConsoleWriter } from 'istanbul-lib-report';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const Winner = ({
	modalWinner,
	setModalWinner,
	insertLeagueInfo,
	winner,
	leagueTeamList,
}) => {
	let history = useHistory();
	const [participantsList, setParticipantsList] = useState([]);
	const [rankignList, serRankignList] = useState([]);
	const [winnerResultOne, setWinnerResultOne] = useState([]);
	const [stage, setStage] = useState('one');
	const teamList = (insertLeagueInfo.league_type === 1
		? leagueTeamList
		: []
	).map(item => {
		return { label: item.nickname };
	});

	useEffect(() => {
		axios
			.post(`${url.file}/LeagueAdminParticipants`, {
				id: getUserInfo === null ? '' : getUserInfo.id,
				league_id: window.location.pathname.split('/')[2],
				mode: 'confirmed',
			})
			.then(res => {
				setParticipantsList(res.data.Info.confirmed);
			});
	}, []);

	const user = participantsList.map(item => {
		return { label: item.nickname };
	});

	const [flag, setFlag] = useState(false);
	useEffect(() => {}, [flag]);

	const addCategory = (info, user) => {
		const itemToFind = winner.find(function(item) {
			return item.percentage === user.percentage;
		});
		const idx = winner.indexOf(itemToFind);
		if (idx > -1) {
			winner.splice(idx, 1);
			winner.push({ percentage: user.percentage, nickname: info.label });
		} else {
			winner.push({ percentage: user.percentage, nickname: info.label });
		}
		setFlag(!flag);
	};

	const percentage = 'percentage';
	const winnerList = winner.sort(function(a, b) {
		return b[percentage] - a[percentage];
	});
	const winnerResult = winnerList.map((item, idx) => {
		return { nickname: item.nickname, ranking: idx + 1 };
	});
	const winnerResultTeam = winnerList.map((item, idx) => {
		return { team_name: item.nickname, ranking: idx + 1 };
	});

	useEffect(() => {
		axios
			.post(`${url.file}/GetPrize`, {
				league_id: window.location.pathname.split('/')[2],
			})
			.then(res => {
				serRankignList(res.data.Info.reward_pass);
			});
	}, []);

	const insert = () => {
		axios
			.post(`${url.file}/LeagueWinnerInsert`, {
				league_id: window.location.pathname.split('/')[2],
				id: getUserInfo === null ? '' : getUserInfo.id,
				prize:
					insertLeagueInfo.league_type === 1 ? winnerResultTeam : winnerResult,
			})
			.then(res => {
				setStage('three');
			});
	};

	return (
		<div className="modal--container">
			<div
				className="background"
				onClick={() => {
					setModalWinner(!modalWinner);
				}}
			/>
			<article className="modal--box">
				<div className="modal__title">
					<h1>우승자 결정</h1>
					<button>
						<img
							className="closeBtn"
							src={closeBtnGray}
							onClick={() => {
								setModalWinner(!modalWinner);
							}}
						/>
					</button>
				</div>

				{stage === 'one' && (
					<div className="one--box">
						<div className="winnerModal__text">우승자를 지정해주세요</div>
						<div className="ranking--box">
							{rankignList.map((item, idx) => {
								const result = item[`${idx + 1}등`];
								return (
									<div className="user" key={idx}>
										<img
											className="winnerImg"
											src={
												(idx === 0 ? firstImg : '') ||
												(idx === 1 ? secondImg : '')
											}
										/>{' '}
										{idx + 1}위
										<Select
											className="select-form"
											onChange={e => addCategory(e, result)}
											options={
												insertLeagueInfo.league_type === 1 ? teamList : user
											}
										/>
										<div className="percent">{result.percentage}%</div>
										<div className="pass">
											<b>{result.pass_num}</b>개
										</div>
									</div>
								);
							})}
						</div>
						<div className="total--box">
							<img className="passImg" src={myInfoPath} />총 패스 갯수
							<div className="totalPass">{insertLeagueInfo.reward}</div> 개
						</div>
						<button
							className="winnerBtn"
							onClick={() => {
								// if (rankignList.length === 1 && winnerResultOne.length === 0) {
								// 	alert('유저를 선택해주세요.');
								// } else if (
								// 	rankignList.length !== 1 &&
								// 	winnerResult.length === 0
								// ) {
								// 	alert('유저를 선택해주세요.');
								// } else {
								// 	setStage('two');
								// }
								setStage('two');
							}}
						>
							결정하기
						</button>
					</div>
				)}
				{stage === 'two' && (
					<div className="modalInner--box">
						<div className="modal--text">
							한번 결정된 사항은 변경되지 않습니다.
						</div>
						<div className="result--box">
							{winnerResult.map((item, idx) => {
								return (
									<div className="result">
										<img
											className="winnerImg"
											src={
												(idx === 0 ? firstImg : '') ||
												(idx === 1 ? secondImg : '')
											}
										/>
										{idx + 1} 위<strong>{item.nickname}</strong>
									</div>
								);
							})}
						</div>
						<div className="last__text">이 맞습니까?</div>
						<div className="btn--box">
							<button className="two__btn" onClick={() => setStage('one')}>
								아니요
							</button>
							<button className="two__btn" onClick={insert}>
								네
							</button>
						</div>
					</div>
				)}
				{stage === 'three' && (
					<div className="modalInner--box">
						<div className="modal--text colorBlue">
							우승자가 결정되었습니다!
						</div>
						<div className="result--box">
							<>
								{winnerResult.map((item, idx) => {
									return (
										<div className="result">
											<img className="winnerImg" src={firstImg} />
											{idx + 1} 위<strong>{item.nickname}</strong>
										</div>
									);
								})}
							</>
						</div>
						<button
							className="winnerBtn"
							onClick={() => {
								setModalWinner(!modalWinner);
							}}
						>
							리그 종료하기
						</button>
						<button
							className="winnerBtn btnColor"
							onClick={() =>
								history.push(
									`/league/${window.location.pathname.split('/')[2]}`,
								)
							}
						>
							리그 홈으로 가기
						</button>
					</div>
				)}
			</article>
		</div>
	);
};
export default Winner;
