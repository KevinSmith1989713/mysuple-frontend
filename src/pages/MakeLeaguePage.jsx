import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	changeMenu,
	changeSuccess,
	changeJoinSubMenu,
} from '../store/Layout/Layout.store';

import {
	gameCheck,
	choiceGame,
	makeGame,
	makeCrewGame,
} from '../store/Colleague/Colleague.store';

import {
	getStep1Info,
	getBanList,
	getQuestion,
	makeLeague,
	makeTemporaryLeague,
	getTagList,
	openTemporaryModal,
	getLeagueTemporaryList,
	selectLeagueTemporary,
	deleteLeagueTemporary,
	getSelectLeagueInfo,
	getHostLeagueList,
	getTierInfo,
} from '../store/League/League.store';
import { getPassCount, insertPass } from '../store/Auth/Auth.store';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import TemporayModal from '../components/League/TemporaryModal/TemporaryModal';

// import LeagueContainer from '../container/LeagueContainer/LeagueConatiner'

import MakeLeaguePageStep1 from '../container/League/MakeLeaguePageStep1/MakeLeaguePageStep1';
import MakeLeaguePageStep2 from '../container/League/MakeLeaguePageStep2/MakeLeaguePageStep2';
import MakeLeaguePageStep3 from '../container/League/MakeLeaguePageStep3/MakeLeaguePageStep3';

const MakeLeaguePage = ({
	gameInfo,
	gameChoice,
	gameCheck,
	choiceGame,
	//step1
	getStep1Info,
	//setpe2 ban
	getBanList,
	//setpe2 Question
	getQuestion,
	//setpe2 TagList
	getTagList,
	tagList,
	// step2 tier
	getTierInfo,
	// 리그 만들기
	makeLeague,
	// 임시 저장
	makeTemporaryLeague,
	// 임시 저장 목록 불러오기
	getLeagueTemporaryList,
	// 주최한 리그
	getHostLeagueList,
	hostLeagueList,
	// 임시 저장 목록
	leagueTemporaryList,
	// 임시 저장 선택
	selectLeagueTemporary,
	//임시 저장 삭제
	deleteLeagueTemporary,
	// 리그 생성 상태
	leagueMakeState,
	leagueMakeStateId,
	// 리그 인포
	insertLeagueInfo,
	banList,
	questionList,
	//임시저장
	temporayModal,
	openTemporaryModal,
	// 임시 저장 상태
	leagueTemporaryState,
	// 상세페이지 정보
	getSelectLeagueInfo,
	passCount,
	insertPass,
	getPassCount,
}) => {
	let history = useHistory();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		leagueMakeState === true && history.push(`/league/${leagueMakeStateId}`);
	}, [leagueMakeState]);

	useEffect(() => {
		if (leagueTemporaryState === true) {
			history.push(`./pay`);
		}
	}, [leagueTemporaryState]);

	useEffect(() => {
		window.location.pathname.substr(12, 15) === 'pay' &&
			insertLeagueInfo.league_id &&
			history.push(`./step1`);
	}, []);
	useEffect(() => {
		getLeagueTemporaryList();
	}, []);

	return (
		<div className="League">
			<Helmet>
				<title>슈퍼플레이어 | 리그</title>
			</Helmet>
			<ContentBoard>
				{window.location.pathname.substr(12, 15) === 'step1' && (
					<MakeLeaguePageStep1
						gameInfo={gameInfo}
						gameCheck={gameCheck}
						gameChoice={gameChoice}
						choiceGame={choiceGame}
						getStep1Info={getStep1Info}
						insertLeagueInfo={insertLeagueInfo}
						temporayModal={temporayModal}
						openTemporaryModal={openTemporaryModal}
						makeTemporaryLeague={makeTemporaryLeague}
						leagueTemporaryState={leagueTemporaryState}
						leagueTemporaryList={leagueTemporaryList}
					/>
				)}

				{window.location.pathname.substr(12, 15) === 'step2' && (
					<MakeLeaguePageStep2
						getBanList={getBanList}
						getQuestion={getQuestion}
						banList={banList}
						getTagList={getTagList}
						tagList={tagList}
						temporayModal={temporayModal}
						openTemporaryModal={openTemporaryModal}
						makeTemporaryLeague={makeTemporaryLeague}
						insertLeagueInfo={insertLeagueInfo}
						leagueTemporaryList={leagueTemporaryList}
						getTierInfo={getTierInfo}
					/>
				)}
				{window.location.pathname.substr(12, 15) === 'step3' && (
					<MakeLeaguePageStep3
						makeLeague={makeLeague}
						insertLeagueInfo={insertLeagueInfo}
						banList={banList}
						questionList={questionList}
						temporayModal={temporayModal}
						openTemporaryModal={openTemporaryModal}
						makeTemporaryLeague={makeTemporaryLeague}
						leagueTemporaryList={leagueTemporaryList}
						passCount={passCount}
						insertPass={insertPass}
						getPassCount={getPassCount}
					/>
				)}

				{temporayModal && (
					<TemporayModal
						openTemporaryModal={openTemporaryModal}
						temporayModal={temporayModal}
						getLeagueTemporaryList={getLeagueTemporaryList}
						leagueTemporaryList={leagueTemporaryList}
						selectLeagueTemporary={selectLeagueTemporary}
						deleteLeagueTemporary={deleteLeagueTemporary}
						getHostLeagueList={getHostLeagueList}
						hostLeagueList={hostLeagueList}
						getSelectLeagueInfo={getSelectLeagueInfo}
					/>
				)}
			</ContentBoard>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		// step 1
		gameInfo: state.colleague.gameInfo,
		gameChoice: state.colleague.gameChoice,
		// step2
		tagList: state.league.tagList,
		// step info
		insertLeagueInfo: state.league.insertLeagueInfo,
		banList: state.league.banList,
		questionList: state.league.questionList,
		// 리그 생성 상태
		leagueMakeState: state.league.leagueMakeState,
		leagueMakeStateId: state.league.leagueMakeStateId,
		// 임시 저장 모달
		temporayModal: state.league.temporayModal,
		// 임시 저장 리스트
		leagueTemporaryList: state.league.leagueTemporaryList,
		// 주최한 리그
		hostLeagueList: state.league.hostLeagueList,
		// 임시 저장 상태
		leagueTemporaryState: state.league.leagueTemporaryState,
		passCount: state.auth.passCount,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		// step 1
		gameCheck: gameName => dispatch(gameCheck(gameName)),
		choiceGame: () => dispatch(choiceGame()),
		getStep1Info: (
			league_title,
			game_id,
			game_title,
			game_title_kr,
			league_type,
			auto_join,
			outsourcing,
			limit_people,
			member_count,
			waiting_people,
			league_main_img,
			league_sub_img,
			apply_start,
			apply_end,
			start_date,
			desc,
			game_img,
			game_name,
			fromHours,
			byHours,
			startHours,
			singleCount,
			teamCount,
			teamPeopleCount,
			thumbnailName,
		) =>
			dispatch(
				getStep1Info(
					league_title,
					game_id,
					game_title,
					game_title_kr,
					league_type,
					auto_join,
					outsourcing,
					limit_people,
					member_count,
					waiting_people,
					league_main_img,
					league_sub_img,
					apply_start,
					apply_end,
					start_date,
					desc,
					game_img,
					game_name,
					fromHours,
					byHours,
					startHours,
					singleCount,
					teamCount,
					teamPeopleCount,
					thumbnailName,
				),
			),
		//step2 Ban
		getBanList: info => dispatch(getBanList(info)),
		//step2 Question
		getQuestion: info => dispatch(getQuestion(info)),
		// step2 list
		getTagList: (ban, question) => dispatch(getTagList(ban, question)),
		//리그 만들기
		makeLeague: (
			league_title,
			game_id,
			game_title,
			game_title_kr,
			league_type,
			auto_join,
			outsourcing,
			limit_people,
			member_count,
			waiting_people,
			league_main_img,
			league_sub_img,
			apply_start,
			apply_end,
			start_date,
			desc,
			banList,
			questionList,
			join_pass,
			sponsor_pass,
			reward_ratio,
		) =>
			dispatch(
				makeLeague(
					league_title,
					game_id,
					game_title,
					game_title_kr,
					league_type,
					auto_join,
					outsourcing,
					limit_people,
					member_count,
					waiting_people,
					league_main_img,
					league_sub_img,
					apply_start,
					apply_end,
					start_date,
					desc,
					banList,
					questionList,
					join_pass,
					sponsor_pass,
					reward_ratio,
				),
			),
		// 임시 저장
		makeTemporaryLeague: (
			league_title,
			game_id,
			game_title,
			game_title_kr,
			league_type,
			auto_join,
			outsourcing,
			limit_people,
			member_count,
			waiting_people,
			league_main_img,
			league_sub_img,
			apply_start,
			apply_end,
			start_date,
			desc,
			banList,
			questionList,
			join_pass,
			sponsor_pass,
			reward_ratio,
		) =>
			dispatch(
				makeTemporaryLeague(
					league_title,
					game_id,
					game_title,
					game_title_kr,
					league_type,
					auto_join,
					outsourcing,
					limit_people,
					member_count,
					waiting_people,
					league_main_img,
					league_sub_img,
					apply_start,
					apply_end,
					start_date,
					desc,
					banList,
					questionList,
					join_pass,
					sponsor_pass,
					reward_ratio,
				),
			),
		openTemporaryModal: boolean => dispatch(openTemporaryModal(boolean)),
		getLeagueTemporaryList: () => dispatch(getLeagueTemporaryList()),
		selectLeagueTemporary: info => dispatch(selectLeagueTemporary(info)),
		deleteLeagueTemporary: info => dispatch(deleteLeagueTemporary(info)),
		getSelectLeagueInfo: leagueId => dispatch(getSelectLeagueInfo(leagueId)),
		getHostLeagueList: () => dispatch(getHostLeagueList()),
		getTierInfo: info => dispatch(getTierInfo(info)),
		insertPass: (id, type, refer_id, account, desc) =>
			dispatch(insertPass(id, type, refer_id, account, desc)),
		getPassCount: () => dispatch(getPassCount()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeLeaguePage);
