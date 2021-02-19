import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Media from 'react-media';

import {
	leagueHeaders,
	leagueHeadersMobile,
} from '../../../assets/dummyData/AuthData';

import myInfoPath from '../../../static/images/MobileMenu/mobileMenuImg2.svg';
import people from '../../../static/images/League/people.svg';

import './LeagueParticipant.scss';

const LeagueParticipant = ({ leagueParticipantsList, insertLeagueInfo }) => {
	const [selectedheader, setHeader] = useState('leagueInfo');

	return (
		<article className="LeagueParticipant">
			<div className="LeagueParticipant--Container">
				<div className="title--box ">
					<span className="title oder">순서</span>
					<span className="title state">상태</span>
					<span className="title nicName">닉네임</span>
					{insertLeagueInfo.league_type === 1 ? (
						<span className="title teamName">팀명</span>
					) : (
						''
					)}
				</div>
				{leagueParticipantsList.map((item, index) => {
					return (
						<div className="title--box info" key={index}>
							<span className="title oder">{index + 1}</span>
							<span className="title state">
								{item.join_type === 1 ? '참가' : '대기'}
							</span>
							<span className="title nicName">{item.nickname}</span>
							<span className="title teamName">{item.team_name}</span>
						</div>
					);
				})}
			</div>
		</article>
	);
};

export default LeagueParticipant;
