import React, { Component, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import axios from 'axios';
import { url } from '../constants/apiUrl.js';
import ReactLoading from 'react-loading';

import {
	getParticipantsList,
	writeNotice,
	getLeagueNoticeList,
	selectLeagueNotice,
	deleteLeagueNoticeList,
	approveLeague,
	rejectLeague,
} from '../store/Manage/Manage.store';
import {
	getSelectLeagueInfo,
	getParticipants,
	updateLeague,
} from '../store/League/League.store';

import LeagueManageContainer from '../container/League/LeagueManageContainer/LeagueManageContainer';
import ParticipantManagement from '../container/League/ParticipantManagement/ParticipantManagement';
import LeagueTournament from '../container/League/LeagueTournament/LeagueTournament';
import LeagueNotice from '../container/League/NoticeManagement/NoticeManagement';
import LeagueManageMentInfo from '../container/League/LeagueManageMentInfo/LeagueManageMentInfo';
import Fobidden from '../components/Forbidden/Forbidden';

import preparingTournament from '../static/images/tournament.png';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const LeagueManagePage = ({
	getParticipantsList,
	participantsList,
	questionsList,
	writeNotice,
	getLeagueNoticeList,
	leagueNoticeList,
	selectLeagueNotice,
	leaguenoticeState,
	deleteLeagueNoticeList,
	insertLeagueInfo,
	getSelectLeagueInfo,
	getParticipants,
	leagueParticipantsList,
	updateLeague,
	approveLeague,
	successState,
	rejectState,
	rejectLeague,
	entrant,
	winner,
}) => {
	const [check, setCheck] = useState('');

	useEffect(() => {
		getSelectLeagueInfo(window.location.pathname.split('/')[2]);
	}, []);
	
	useEffect(() => {
		try {
			axios
				.post(`${url.file}/LeagueSelect`, {
					dev: '/LeagueSelect',
					league_id: window.location.pathname.split('/')[2],
				})
				.then(res => {
					setCheck(res.data.Info && res.data.Info.list.user_nickname);
				});
		} catch (e) {
			console.error(e);
		}
	}, []);

	const Loading = () => {
		return (
			<div className="Loading">
				<ReactLoading type="bars" color="white" height={50} width={50} />
			</div>
		);
	};

	return (
		<div className="LeagueManagePage">
			<Helmet>
				<title>슈퍼플레이어 | 리그 관리자 페이지</title>
			</Helmet>
			<LeagueManageContainer insertLeagueInfo={insertLeagueInfo}>
				{check === '' ? (
					<Loading />
				) : (
					<>
						{getUserInfo && getUserInfo.nickName === check ? (
							<>
								{window.location.pathname.split('/')[3] ===
									'participantManage' && (
									<ParticipantManagement
										getParticipantsList={getParticipantsList}
										participantsList={participantsList}
										questionsList={questionsList}
										approveLeague={approveLeague}
										successState={successState}
										rejectState={rejectState}
										insertLeagueInfo={insertLeagueInfo}
										rejectLeague={rejectLeague}
									/>
								)}

								{window.location.pathname.split('/')[3] ===
									'leagueTournament' && (
									<LeagueTournament
										winner={winner}
										entrant={entrant}
										getParticipantsList={getParticipantsList}
										participantsList={participantsList}
										insertLeagueInfo={insertLeagueInfo}
									/>
								)}

								{/* {window.location.pathname.split('/')[3] ===
									'leagueTournament' && (
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											textAlign: 'center',
											alignItems: 'center',
											padding: '100px',
										}}
									>
										<img style={{ width: '550px' }} src={preparingTournament} />
										<div
											style={{
												color: '#1e59ea',
												fontSize: '22px',
												fontWeight: '900',
											}}
										>
											업데이트 예정입니다.
										</div>
										<div
											style={{
												marginTop: '15px',
												color: '#666666',
												fontSize: '16px',
												fontWeight: '500',
											}}
										>
											조금만 기다려주세요!
										</div>
									</div>
								)} */}

								{window.location.pathname.split('/')[3] === 'leagueNotice' && (
									<LeagueNotice
										writeNotice={writeNotice}
										getLeagueNoticeList={getLeagueNoticeList}
										leagueNoticeList={leagueNoticeList}
										selectLeagueNotice={selectLeagueNotice}
										leaguenoticeState={leaguenoticeState}
										deleteLeagueNoticeList={deleteLeagueNoticeList}
									/>
								)}
								{window.location.pathname.split('/')[3] === 'leagueInfo' && (
									<LeagueManageMentInfo
										insertLeagueInfo={insertLeagueInfo}
										getSelectLeagueInfo={getSelectLeagueInfo}
										getParticipants={getParticipants}
										leagueParticipantsList={leagueParticipantsList}
										updateLeague={updateLeague}
									/>
								)}
							</>
						) : (
							<Fobidden />
						)}
					</>
				)}
			</LeagueManageContainer>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		entrant: state.manage.entrant,
		winner: state.manage.winner,
		participantsList: state.manage.participantsList,
		questionsList: state.manage.questionsList,
		leagueNoticeList: state.manage.leagueNoticeList,
		leaguenoticeState: state.manage.leaguenoticeState,
		insertLeagueInfo: state.league.insertLeagueInfo,
		leagueParticipantsList: state.league.leagueParticipantsList,
		successState: state.layout.successState,
		rejectState: state.layout.rejectState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getParticipantsList: (id, league_id, mode) =>
			dispatch(getParticipantsList(id, league_id, mode)),
		writeNotice: (id, league_id, title, content) =>
			dispatch(writeNotice(id, league_id, title, content)),
		getLeagueNoticeList: league_id => dispatch(getLeagueNoticeList(league_id)),
		selectLeagueNotice: (league_id, league_notice_id) =>
			dispatch(selectLeagueNotice(league_id, league_notice_id)),
		deleteLeagueNoticeList: (id, league_id, league_notice_id) =>
			dispatch(deleteLeagueNoticeList(id, league_id, league_notice_id)),
		getSelectLeagueInfo: leagueId => dispatch(getSelectLeagueInfo(leagueId)),
		getParticipants: league_id => dispatch(getParticipants(league_id)),
		updateLeague: (id, league_id, league_main_img, desc) =>
			dispatch(updateLeague(id, league_id, league_main_img, desc)),
		approveLeague: (id, league_id, league_join_id) =>
			dispatch(approveLeague(id, league_id, league_join_id)),
		rejectLeague: (id, league_id, league_join_id) =>
			dispatch(rejectLeague(id, league_id, league_join_id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueManagePage);
