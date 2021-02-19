import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';

import {
	getSelectLeagueInfo,
	joinLeague,
	makeLeagueTeam,
	getLeagueTeamList,
	insertLeagueComments,
	getLeaguecommentsList,
	deleteLeagueComments,
	updateLeagueComments,
	joinLeagueState,
	recruitTeam,
	getParticipants,
} from '../store/League/League.store';

import { makeGame } from '../store/Colleague/Colleague.store';
import { insertPass, getPassCount } from '../store/Auth/Auth.store';

import {
	getLeagueNoticeList,
	selectLeagueNotice,
	getParticipantsList,
} from '../store/Manage/Manage.store';

import ContentBoard from '../components/ContentBoard/ContentBoard';

import LeaguePageContainer from '../container/League/LeaguePageContainer/LeaguePageContainer';

const League = ({
	// 리그 상세페이지 정보
	insertLeagueInfo,
	getSelectLeagueInfo,
	// 리그 참가
	joinLeague,
	// 리그 팀전 만들기
	makeLeagueTeam,
	// 리그 팀전 호출
	getLeagueTeamList,
	// 리그 팀전 리스트
	leagueTeamListRedux,
	//댓글 쓰기
	insertLeagueComments,
	// 댓글 리스트 호출
	getLeaguecommentsList,
	// 댓글 리스트
	leagueCommentsList,
	// 댓글 삭제
	deleteLeagueComments,
	// 댓글 업데이트
	updateLeagueComments,
	// 크루 만들기
	makeGame,
	// 팀원 모집
	recruitTeam,
	// 팀원 모집 리스트
	leagueRecruitList,
	// 리그 참가 상태
	leagueJoinState,
	// 리그 참가 상태 되돌리는 함수
	joinLeagueState,
	// 참가자 호출
	getParticipants,
	// 참가자 리스트
	leagueParticipantsList,
	// 리그 공지사항
	getLeagueNoticeList,
	selectLeagueNotice,
	leagueNoticeList,
	crewState,
	passCount,
	insertPass,
	getPassCount,
	getParticipantsList,
	participantsList,
}) => {
	return (
		<div className="League">
			<Helmet>
				<title>슈퍼플레이어 | 리그</title>
			</Helmet>
			<ContentBoard>
				<LeaguePageContainer
					insertLeagueInfo={insertLeagueInfo}
					getSelectLeagueInfo={getSelectLeagueInfo}
					joinLeague={joinLeague}
					makeLeagueTeam={makeLeagueTeam}
					getLeagueTeamList={getLeagueTeamList}
					leagueTeamListRedux={leagueTeamListRedux}
					insertLeagueComments={insertLeagueComments}
					getLeaguecommentsList={getLeaguecommentsList}
					leagueCommentsList={leagueCommentsList}
					deleteLeagueComments={deleteLeagueComments}
					updateLeagueComments={updateLeagueComments}
					leagueRecruitList={leagueRecruitList}
					leagueJoinState={leagueJoinState}
					joinLeagueState={joinLeagueState}
					recruitTeam={recruitTeam}
					getParticipants={getParticipants}
					leagueParticipantsList={leagueParticipantsList}
					makeGame={makeGame}
					getLeagueNoticeList={getLeagueNoticeList}
					selectLeagueNotice={selectLeagueNotice}
					leagueNoticeList={leagueNoticeList}
					crewState={crewState}
					passCount={passCount}
					insertPass={insertPass}
					getPassCount={getPassCount}
					getParticipantsList={getParticipantsList}
					participantsList={participantsList}
				/>
			</ContentBoard>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		// 리그 상세페이지 정보
		insertLeagueInfo: state.league.insertLeagueInfo,
		// 리그 팀전 리스트
		leagueTeamListRedux: state.league.leagueTeamListRedux,
		//댓글 리스트
		leagueCommentsList: state.league.leagueCommentsList,

		// 리그 참가 상태
		leagueJoinState: state.league.leagueJoinState,
		// 상세페이지 팀원 모집 리스트
		leagueRecruitList: state.league.leagueRecruitList,
		// 상세페이지 참가자 리스트
		leagueParticipantsList: state.league.leagueParticipantsList,
		// 상세페이지 리그 공지사항
		leagueNoticeList: state.manage.leagueNoticeList,
		// 빠른 매칭 상태
		crewState: state.colleague.crewState,

		passCount: state.auth.passCount,
		participantsList: state.manage.participantsList,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getSelectLeagueInfo: leagueId => dispatch(getSelectLeagueInfo(leagueId)),
		joinLeague: (id, leagueId, teamId, answer) =>
			dispatch(joinLeague(id, leagueId, teamId, answer)),
		makeLeagueTeam: (id, teamName, leagueId, teamType, password) =>
			dispatch(makeLeagueTeam(id, teamName, leagueId, teamType, password)),
		getLeagueTeamList: (id, leagueId, complete) =>
			dispatch(getLeagueTeamList(id, leagueId, complete)),
		insertLeagueComments: (id, leagueId, cmt_group, comments, secret) =>
			dispatch(insertLeagueComments(id, leagueId, cmt_group, comments, secret)),
		getLeaguecommentsList: league_id =>
			dispatch(getLeaguecommentsList(league_id)),
		deleteLeagueComments: (id, league_id, league_cmt_id) =>
			dispatch(deleteLeagueComments(id, league_id, league_cmt_id)),
		updateLeagueComments: (id, leagueId, league_cmt_id, comments, secret) =>
			dispatch(
				updateLeagueComments(id, leagueId, league_cmt_id, comments, secret),
			),
		joinLeagueState: boolean => dispatch(joinLeagueState(boolean)),
		recruitTeam: league_id => dispatch(recruitTeam(league_id)),
		getParticipants: league_id => dispatch(getParticipants(league_id)),
		makeGame: (
			crew_title,
			email,
			open,
			type,
			game_id,
			gameTitle,
			gameTitleKr,
			link,
			game_class,
			league_id,
		) =>
			dispatch(
				makeGame(
					crew_title,
					email,
					open,
					type,
					game_id,
					gameTitle,
					gameTitleKr,
					link,
					game_class,
					league_id,
				),
			),
		getLeagueNoticeList: league_id => dispatch(getLeagueNoticeList(league_id)),
		selectLeagueNotice: (league_id, league_notice_id) =>
			dispatch(selectLeagueNotice(league_id, league_notice_id)),
		insertPass: (id, type, refer_id, account, desc) =>
			dispatch(insertPass(id, type, refer_id, account, desc)),
		getPassCount: () => dispatch(getPassCount()),
		getParticipantsList: (id, league_id, mode) =>
			dispatch(getParticipantsList(id, league_id, mode)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(League);
