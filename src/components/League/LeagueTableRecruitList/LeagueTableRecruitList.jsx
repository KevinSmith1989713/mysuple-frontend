import React, { useState, useEffect } from 'react';

import pc from '../../../static/images/Colleague/pc.svg';
import mobile from '../../../static/images/Colleague/mobile.svg';
import consol from '../../../static/images/Colleague/consol.svg';
import link from '../../../static/images/Card/linkImg.svg';
import closeBtnGray from '../../../static/images/closeBtnGray.svg';

import './LeagueTableRecruitList.scss';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

const timeForToday = value => {
	const today = new Date();
	const timeValue = new Date(value);

	const betweenTime = Math.floor(
		(today.getTime() - timeValue.getTime()) / 1000 / 60,
	);
	if (betweenTime < 1) return '방금전';
	if (betweenTime < 60) {
		return `${betweenTime}분전`;
	}

	const betweenTimeHour = Math.floor(betweenTime / 60);
	if (betweenTimeHour < 24) {
		return `${betweenTimeHour}시간전`;
	}

	const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
	if (betweenTimeDay < 365) {
		return `${betweenTimeDay}일전`;
	}
	return `${Math.floor(betweenTimeDay / 365)}년전`;
};

const LeagueTableRecruitList = ({
	leagueParticipantsList,
	leagueRecruitList,
	recruitTeam,
	insertLeagueInfo,
	makeGame,
	crewState,
}) => {
	const [page, setPage] = useState('list');
	const [crewModal, setCrewModal] = useState(false);
	const [flag, setFlag] = useState(false);
	const [title, setTitle] = useState('');
	const [link, setLink] = useState('');

	useEffect(() => {
		recruitTeam(Number(window.location.pathname.substring(8)));
	}, [crewState]);

	const putJoinNickName = () => {
		const arr = [];
		const result = leagueParticipantsList.map(item => item);
		result.forEach(ele => {
			if (ele.join_type === 1) {
				arr.push(ele.nickname);
			}
		});
		return arr;
	};

	const checkNicName = () => {
		const nickName = putJoinNickName().map(item => item);
		const idx = nickName.indexOf(getUserInfo.nickName);
		return idx > -1 ? true : false;
	};

	const putTeamName = () => {
		const arr = [];
		const result = leagueParticipantsList.map(item => item);
		result.forEach(ele => {
			if (ele.nickname === getUserInfo.nickName) {
				arr.push(ele.team_name);
			}
		});
		return arr;
	};

	const makeTeam = () => {
		makeGame(
			`[리그-${putTeamName()}]${title}`,
			null,
			'true',
			'true',
			insertLeagueInfo.game_id,
			insertLeagueInfo.game_title,
			insertLeagueInfo.game_title_kr,
			window.location.href,
			Number(insertLeagueInfo.game_class),
			Number(window.location.pathname.substring(8)),
		);
		setFlag(!flag);
		setCrewModal(!crewModal);
	};

	return (
		<ol className="LeagueTableRecruitList">
			{leagueRecruitList.length === 0 ? (
				<div className="crew__none">모집한 팀원이 없습니다.</div>
			) : (
				<>
					{leagueRecruitList.reverse().map((item, index) => {
						return (
							<li className="list--box" key={index}>
								<div className="gameInfo">
									<img
										className="iconImg"
										src={
											insertLeagueInfo.game_class === 0 || '0'
												? pc
												: '' || insertLeagueInfo.game_class === 1 || '1'
												? pc
												: '' || insertLeagueInfo.game_class === 2 || '2'
												? mobile
												: consol
										}
										alt="icon"
									/>

									<span>{insertLeagueInfo.game_title_kr}</span>
								</div>
								<p className="title--box">
									<span className="title">
										<a href={item.link} target="_blank">
											{item.crew_title}
										</a>
										<img className="linkImg" src={link} />
										<b>{timeForToday(item.createdAt)}</b>
									</span>
									<span className="nickName">{item.nickname}</span>
								</p>
							</li>
						);
					})}
				</>
			)}

			<div className="btn--box">
				<div />
				<button
					className="makeCrew"
					onClick={() => {
						// if (checkNicName() === false) {
						// alert('리그 참가 이후 이용해주세요.');
						// } else {
						setCrewModal(!crewModal);
						// }
					}}
				>
					<div className="colleague--img" />
					동료 만들기
				</button>
			</div>

			{crewModal ? (
				<div className="modal__recruit--container ">
					<div
						className="background"
						onClick={() => setCrewModal(!crewModal)}
					/>
					<article className="modal--box">
						<div className="modal__title">
							<h1>리그 팀원 모집</h1>
							<button>
								<img
									className="closeBtn"
									src={closeBtnGray}
									onClick={() => setCrewModal(!crewModal)}
								/>
							</button>
						</div>
						<div className="modal--inner">
							<div className="box">
								<h1>팀 이름</h1>
								<div>{putTeamName()[0]}</div>
							</div>
							<div className="box">
								<h1>
									내용<b>*</b>
								</h1>
								<input
									className="input"
									placeholder="내용"
									value={title}
									onChange={e => setTitle(e.target.value)}
								/>
							</div>
							{/* <div className="box">
								<h1>
									참여 링크<b>*</b>
								</h1>
								<input
									className="input"
									placeholder="http://주소"
									value={link}
									onChange={e => setLink(e.target.value)}
								/>
							</div> */}
							<div className="button--box">
								<button type="button" className="button" onClick={makeTeam}>
									빠른 매칭 만들기
								</button>
							</div>
						</div>
					</article>
				</div>
			) : (
				''
			)}
		</ol>
	);
};
export default LeagueTableRecruitList;
