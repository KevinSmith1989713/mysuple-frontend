import React, { useState, useEffect } from 'react';

import Media from 'react-media';
import { useHistory } from 'react-router-dom';

import LeagueTableInfo from '../LeagueTableInfo/LeagueTableInfo';
import LeaguePageRecruit from '../LeagueTableRecruitList/LeagueTableRecruitList';
import LeagueParticipant from '../LeagueParticipant/LeagueParticipant';
import LeagueDetailNotice from '../LeagueDetailNotice/LeagueDetailNotice';
import LeagueLayout from '../LeagueLayout/LeagueLayout';

import {
	leagueHeaders,
	leagueHeadersMobile,
} from '../../../assets/dummyData/AuthData';

import './LeagueTable.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
const LeagueTable = ({
	insertLeagueInfo,
	leagueRecruitList,
	recruitTeam,
	leagueParticipantsList,
	makeGame,
	getLeagueNoticeList,
	selectLeagueNotice,
	leagueNoticeList,
	crewState,
	getParticipantsList,
	participantsList,
	leagueTeamListRedux,
	getLeagueTeamList,
}) => {
	
	const [selectedheader, setHeader] = useState('leagueInfo');
	let history = useHistory();

	const makeComponent = () => {
		switch (selectedheader) {
			case 'leagueInfo':
				return <LeagueTableInfo insertLeagueInfo={insertLeagueInfo} />;
			case 'notice':
				return (
					<LeagueDetailNotice
						getLeagueNoticeList={getLeagueNoticeList}
						selectLeagueNotice={selectLeagueNotice}
						leagueNoticeList={leagueNoticeList}
					/>
				);
			case 'participant':
				return (
					<LeagueParticipant
						leagueParticipantsList={leagueParticipantsList}
						insertLeagueInfo={insertLeagueInfo}
					/>
				);
			case 'layout':
				return (
					<LeagueLayout
						participantsList={participantsList}
						getParticipantsList={getParticipantsList}
						insertLeagueInfo={insertLeagueInfo}
						leagueTeamListRedux={leagueTeamListRedux}
						getLeagueTeamList={getLeagueTeamList}
					/>
				);
			case 'recruit':
				return (
					<LeaguePageRecruit
						insertLeagueInfo={insertLeagueInfo}
						leagueRecruitList={leagueRecruitList}
						recruitTeam={recruitTeam}
						makeGame={makeGame}
						leagueParticipantsList={leagueParticipantsList}
						crewState={crewState}
					/>
				);
		}
	};

	const headerData =
		insertLeagueInfo.league_type === 0
			? leagueHeaders.slice(0, 4)
			: leagueHeaders;
	return (
		<div className="LeagueTable">
			<div className="LeagueTable--Header">
				{headerData.map((header, index) => {
					// console.log(header.name === "팀원모집");
					return (
						<button
							type="button"
							className={
								selectedheader === header.id ? 'header__selected' : 'header'
							}
							key={index}
							onClick={() => {
								setHeader(header.id);
							}}
						>
							{header.name}
							<span
								className={
									selectedheader === 'participant' ? 'member blue' : 'member'
								}
							>
								{header.member === true && leagueParticipantsList.length}
							</span>
						</button>
					);
				})}
			</div>
			<Media query={{ maxWidth: 768 }}>
				<div className="LeagueTable--HeaderMobile">
					{headerData.map((header, index) => {
						return (
							<button
								className={
									selectedheader === header.id ? 'header__selected' : 'header'
								}
								key={index}
								onClick={() => {
									setHeader(header.id);
								}}
							>
								{header.name ||
									(insertLeagueInfo.user_nickname ===
										(getUserInfo === null ? '' : getUserInfo.nickName) && (
										<img src={header.img} />
									))}
								<span
									className={
										selectedheader === 'participant' ? 'member blue' : 'member'
									}
								>
									{header.member === true && leagueParticipantsList.length}
								</span>
							</button>
						);
					})}
				</div>
			</Media>
			<div className="LeagueTable--Info">{makeComponent()}</div>
		</div>
	);
};

export default LeagueTable;
