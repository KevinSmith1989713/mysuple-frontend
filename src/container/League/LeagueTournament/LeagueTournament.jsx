import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import imageCompression from 'browser-image-compression';
import { connect } from 'react-redux';
import Tournament from '../Tournament/Tournament';
import Button from '../../../components/Button/Button';

import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import { resetEntrant } from '../../../store/Manage/Manage.store';
import { getLeagueTeamList } from '../../../store/League/League.store';

import DeathmatchPreliminary from '../../../components/League/DeathmatchPreliminary/DeathmatchPreliminary';
import DeathmatchMain from '../../../components/League/DeathmatchMain/DeathmatchMain';

import LayoutModal from '../../../components/League/LayoutModal/LayoutModal';
import ExtraLayoutModal from '../../../components/League/ExtraLeagueModal/ExtraLayoutModal';
import ExtraLayoutModalMain from '../../../components/League/ExtraLeagueModalMain/ExtraLayoutModalMain';
import WinnerModal from '../../../components/League/WinnerModal/WinnerModal';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';

import { makeGroup } from '../../../Utils/func';

import './LeagueTournament.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const getItem = [];
const resultList = e => {
	const teams = {};
	e.forEach((item, idx) => {
		getItem.push(idx);
		teams[item.name || item.id] = {
			name: item.name,
			score: item.score,
			round: item.round,
			id: item.id,
			semifinal: item.semifinal,
			matches_key:
				getItem.length % 2 === 0
					? getItem.length / 2
					: getItem.length % 2 === 1 && (getItem.length + 1) / 2,
			idx: item.idx,
			team_id: item.team_id,
		};
	});

	const isOdd = () => {
		let array = [];
		for (const key in teams) {
			array.push(teams[key]);
		}
		const odd = [];
		for (let i = 0; i < array.length; i++) {
			array[i] = {
				id: array[i].id,
				matches_key: array[i].matches_key,
				name: array[i].name,
				round: array[i].round,
				score: array[i].score,
				semifinal: array[i].semifinal,
				idx: array[i].idx,
				team_id: array[i].team_id,
			};
			if (i % 2 == 1) odd.push(array[i]);
			const id = 'id';
			odd.sort(function(a, b) {
				return b[id] - a[id];
			});
		}
		return odd;
	};

	const isEven = () => {
		let array = [];
		for (const key in teams) {
			array.push(teams[key]);
		}

		const even = [];
		for (let i = 0; i < array.length; i++) {
			array[i] = {
				id: array[i].id,
				matches_key: array[i].matches_key,
				name: array[i].name,
				round: array[i].round,
				score: array[i].score,
				semifinal: array[i].semifinal,
				idx: array[i].idx,
				team_id: array[i].team_id,
			};

			if (i % 2 == 0) even.push(array[i]);
		}

		const id = 'id';
		even.sort(function(a, b) {
			return b[id] - a[id];
		});
		return even;
	};

	const resultEven = isEven().map(item => {
		const obj = {
			team1: {
				team: item.name,
				score: item.score,
				matches_key: item.matches_key,
				round: item.round,
				id: item.id,
				semifinal: item.semifinal,
				idx: item.idx,
				team_id: item.team_id,
			},
		};
		return obj;
	});
	const resultOdd = isOdd().map(item => {
		const obj = {
			team2: {
				team: item.name,
				score: item.score,
				matches_key: item.matches_key,
				round: item.round,
				id: item.id,
				semifinal: item.semifinal,
				idx: item.idx,
				team_id: item.team_id,
			},
		};
		return obj;
	});

	const add = () => {
		let array = [];
		for (let i = 0; i < resultEven.length; i++) {
			const newObj = Object.assign({}, resultOdd[i], resultEven[i]);
			array.push(newObj);
		}
		return array;
	};

	return add();
};

const LeagueTournament = ({
	entrant,
	winner,
	insertLeagueInfo,
	participantsList,
	resetEntrant,
	getParticipantsList,
	leagueTeamListRedux,
	getLeagueTeamList,
}) => {
	const [modal, setModal] = useState(false);
	const [extraModal, setExtraModal] = useState(false);
	const [extraModalMain, setExtraModalMain] = useState(false);
	const [modalWinner, setModalWinner] = useState(false);

	const [semifinal, setSemifinal] = useState(false);

	const [flag, setFlag] = useState(false);
	const [matcheData, setMatchData] = useState([]);

	const [toRoung, setToRound] = useState(0);

	const [applyState, setApplyState] = useState(false);
	const [roundInfo, setRoundInfo] = useState([]);
	const [imgFile, setImgFile] = useState('');
	const [option1, setOption1] = useState(false);
	const [option, setOption] = useState(false);
	const [leagueInfo, setLeagueInfo] = useState(null);
	const [leagueInfoUpload, setLeagueInfoUpload] = useState(null);
	const [leagueTeamList, setLeagueTeamList] = useState([]);

	// 스코어 업데이트
	const [updateScoreData, setUpdateScoreData] = useState([]);
	// 스코어 업데이트 추가 경기
	const [updateScoreDataExtra, setUpdateScoreDataExtra] = useState([]);

	// ********************//
	// ******* 예선 ********//
	// ********************//
	const [stage1, setStage1] = useState(null);
	const [stage1Extra, setStage1Extra] = useState(null);
	const [totalRound1, setTotalRound1] = useState(0);
	const [totalRound1Extra, setTotalRound1Extra] = useState(0);
	const [rule1, setRule1] = useState('');
	const [rule1Extra, setRule1Extra] = useState('');
	const [leagueType1, setLeagueType1] = useState(2);
	const [leagueType1Extra, setLeagueType1Extra] = useState(2);
	const [groupNumber1, setGroupNumber1] = useState(null);
	const [groupNumber1Extra, setGroupNumber1Extra] = useState(null);
	const [groupInfo1, setGroupInfo1] = useState(null);
	const [groupInfo1Extra, setGroupInfo1Extra] = useState(null);
	const [selectRound1, setSelectRound1] = useState(1);
	const [user1, setUser1] = useState([]);
	const [extraUser, setExtraUser] = useState([]);
	const [groupUserPreliminary, setGroupUser1] = useState([]);
	const [groupUserPreliminaryTeam, setGroupUserPreliminaryTeam] = useState([]);
	const [participantsList1, setParticipantsList1] = useState([]);
	//리더보드랭킹
	const [rankingPreliminary, setRankingPreliminary] = useState([]);
	const [rankingPreliminaryExtra, setRankingPreliminaryExtra] = useState([]);
	const [groupParticipants1, setGroupParticipants1] = useState([]);
	const [groupParticipants1Extra, setGroupParticipants1Extra] = useState([]);

	// 이미지 업데이트
	const [updateImg, setUpdateImg] = useState([]);
	const [groupUpdateImg, setGroupUpdateImg] = useState([]);

	// ********************//
	// ******* 본선 ********//
	// ********************//
	const [stage2, setStage2] = useState(null);
	const [stage2Extra, setStage2Extra] = useState(null);
	const [totalRound, setTotalRound] = useState(0);
	const [totalRoundExtra, setTotalRoundExtra] = useState(0);
	const [rule, setRule] = useState('');
	const [ruleExtra, setRuleExtra] = useState('');
	const [leagueType, setLeagueType] = useState(2);
	const [leagueTypeExtra, setLeagueTypeExtra] = useState(2);
	const [groupNumber, setGroupNumber] = useState(null);
	const [groupNumberExtra, setGroupNumberExtra] = useState(null);
	const [groupInfo, setGroupInfo] = useState(null);
	const [groupInfoExtra, setGroupInfoExtra] = useState(null);
	const [selectRound, setSelectRound] = useState(1);
	const [groupUserMain, setGroupUser] = useState([]);
	const [groupUserMainTeam, setGroupUserTeam] = useState([]);
	const [winnerGroupUserMain, setWinnerGroupUser] = useState([]);
	const [user, setUser] = useState([]);
	const [extraUserMain, setExtraUserMain] = useState([]);
	const [winnerList, setWinnerList] = useState([]);
	const [isRound, setIsRound] = useState(0);
	//리더보드랭킹
	const [rankingMain, setRankingMain] = useState([]);
	const [rankingMainExtra, setRankingMainExtra] = useState([]);
	const [groupParticipants, setGroupParticipants] = useState([]);
	const [groupParticipantsExtra, setGroupParticipantsExtra] = useState([]);

	// 이미지 업데이트
	const [updateImgMain, setUpdateImgMain] = useState([]);
	const [groupUpdateImgMain, setGroupUpdateImgMain] = useState([]);

	// 스코어 업데이트 조 추가경기
	const [updateImgMainExtra, setUpdateImgMainExtra] = useState([]);
	const [groupUpdateImgMainExtra, setGroupUpdateImgMainExtra] = useState([]);

	//증빙 자료
	const [file, setFile] = useState(null);
	const [fileUrl, setFileUrl] = useState(null);
	const [upload, setUpload] = useState(false);
	const [selectInfo, setSelectInfo] = useState({});
	const [certification, setCertification] = useState(false);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/LeagueTeamSelect`, {
					dev: '/LeagueTeamSelect',
					id: getUserInfo === null ? '' : getUserInfo.id,
					league_id: window.location.pathname.split('/')[2],
					my_team: true,
					complete_only: true,
				})
				.then(res => {
					const result =
						res.data.Info &&
						res.data.Info.teams.map(item => {
							return { nickname: item.team_name, score: 0 };
						});

					setLeagueTeamList(result);
				});
		} catch (error) {
			console.log(error);
		}
	}, [selectRound1, selectRound]);

	useEffect(() => {
		if (insertLeagueInfo.league_type === 1) {
			getLeagueTeamList(
				getUserInfo === null ? '' : getUserInfo.id,
				window.location.pathname.split('/')[2],
				true,
			);
		} else {
			getParticipantsList(
				getUserInfo === null ? '' : getUserInfo.id,
				window.location.pathname.split('/')[2],
				'confirmed',
			);
		}
	}, [modal]);

	useEffect(() => {}, [flag]);

	// 참가자
	useEffect(() => {
		if (insertLeagueInfo.league_type === 1) {
			axios
				.post(`${url.file}/LeagueAdminParticipants`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					league_id: window.location.pathname.split('/')[2],
					mode: 'confirmed',
				})
				.then(res => {
					const data = res.data.Info.confirmed;
					setParticipantsList1(data);
					const result = data.map(item => {
						return { nickname: item.nickname, score: 0 };
					});

					setUser1(result);
					groupNumber === 0 && setWinnerList(result);
					setUser(result);
				});
		} else {
			axios
				.post(`${url.file}/LeagueAdminParticipants`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					league_id: window.location.pathname.split('/')[2],
					mode: 'confirmed',
				})
				.then(res => {
					const data = res.data.Info.confirmed;
					setParticipantsList1(data);
					const result = data.map(item => {
						return { nickname: item.nickname, score: 0 };
					});
					setUser1(result);
					groupNumber === 0 && setWinnerList(result);
					setUser(result);
				});
		}
	}, []);

	useEffect(() => {
		// 예선
		const result1 = user1.map((item, idx) => {
			return { nickname: item.nickname, score: 0 };
		});
		// 본선
		const result = user.map(item => {
			return { nickname: item.nickname, score: 0 };
		});
		const winnerResult = winnerList.map(item => {
			return { nickname: item.nickname, score: 0 };
		});

		setUser1(result1);
		setUser(result);
		groupNumber === 0 && setWinnerList(winnerResult);
	}, [selectRound1, selectRound, groupNumber1, groupNumber]);

	// 예선 조별 만들기
	const groupUser1 = groupUserPreliminary.map((item, idx) => {
		const result = item.group.map(item2 => {
			return {
				group: {
					nickname: item2.group && item2.group.nickname,
					score: item2.group && item2.group.score,
					group_name: idx + 1,
				},
			};
		});
		return { group: result, group_name: idx + 1 };
	});

	// 본선 조별 만들기
	const groupUser = groupUserMain.map((item, idx) => {
		const result = item.group.map(item2 => {
			return {
				group: {
					nickname: item2.group && item2.group.nickname,
					score: item2.group && item2.group.score,
					group_name: idx + 1,
				},
			};
		});
		return { group: result, group_name: idx + 1 };
	});
	// 팀전 + 본선 조별 만들기
	const groupUserTeam = groupUserMainTeam.map((item, idx) => {
		const result = item.group.map(item2 => {
			return {
				group: {
					nickname: item2.group && item2.group.nickname,
					score: item2.group && item2.group.score,
					group_name: idx + 1,
				},
			};
		});
		return { group: result, group_name: idx + 1 };
	});

	// 위너 본선 조별 만들기
	const winnerGroupUser = winnerGroupUserMain.map((item, idx) => {
		const result = item.group.map(item2 => {
			return {
				group: {
					nickname: item2.group && item2.group.nickname,
					score: item2.group && item2.group.score,
					group_name: idx + 1,
				},
			};
		});
		return { group: result, group_name: idx + 1 };
	});

	const [leagueViewType, setLeagueViewType] = useState([
		{ label: `${insertLeagueInfo.league_title} -  예선`, value: 1 },
	]);
	const [viewTypeNum, setViewTypeNum] = useState(1);

	const [leagueViewTypeMain, setLeagueViewTypeMain] = useState([
		{ label: `${insertLeagueInfo.league_title} -  본선`, value: 1 },
	]);
	const [viewTypeNumMain, setViewTypeNumMain] = useState(1);

	useEffect(() => {
		try {
			axios
				.post(`${url.file}/LeagueLayoutSelect`, {
					league_id: window.location.pathname.split('/')[2],
				})
				.then(res => {
					if (res.data.Info.stage1_extra.length > 0) {
						setLeagueViewType([
							{ label: `${insertLeagueInfo.league_title} - 예선`, value: 1 },
							{
								label: `${insertLeagueInfo.league_title} - 예선 추가경기`,
								value: 2,
							},
						]);
					}

					if (res.data.Info.stage2_extra.length > 0) {
						setLeagueViewTypeMain([
							{ label: `${insertLeagueInfo.league_title} - 본선`, value: 1 },
							{
								label: `${insertLeagueInfo.league_title} - 본선 추가경기`,
								value: 2,
							},
						]);
					}

					// 예선 정보 가져오기
					const resultStage1 = res.data.Info.stage1[0];
					// res.data.Info.stage1.length === 0
					// 	? ''
					// 	: setStage1(res.data.Info.stage1);
					setTotalRound1(resultStage1 && resultStage1.round_number);
					setRule1(resultStage1 && resultStage1.win_rule);
					setLeagueType1(resultStage1 && resultStage1.layout_type);
					setGroupParticipants1(
						resultStage1 && resultStage1.layout_group_participants,
					);
					resultStage1 === undefined
						? ''
						: setGroupNumber1(
								Number(
									JSON.parse(
										resultStage1 && resultStage1.layout_group_participants,
									) === null
										? ''
										: JSON.parse(
												resultStage1 && resultStage1.layout_group_participants,
										  ).group_num,
								),
						  );
					resultStage1 === undefined
						? ''
						: setGroupInfo1(
								JSON.parse(
									resultStage1 && resultStage1.layout_group_participants,
								) === null
									? ''
									: JSON.parse(
											resultStage1 && resultStage1.layout_group_participants,
									  ),
						  );

					// 본선 정보 가져오기
					const resultStage2 = res.data.Info.stage2[0];
					setTotalRound(resultStage2 && resultStage2.round_number);
					setRule(resultStage2 && resultStage2.win_rule);
					setLeagueType(resultStage2 && resultStage2.layout_type);
					setGroupParticipants(
						resultStage2 && resultStage2.layout_group_participants,
					);

					resultStage2 === undefined
						? ''
						: setGroupNumber(
								Number(
									JSON.parse(
										resultStage2 && resultStage2.layout_group_participants,
									) === null
										? ''
										: JSON.parse(
												resultStage2 && resultStage2.layout_group_participants,
										  ).group_num,
								),
						  );
					resultStage2 === undefined
						? ''
						: setGroupInfo(
								JSON.parse(
									resultStage2 && resultStage2.layout_group_participants,
								) === null
									? ''
									: JSON.parse(
											resultStage2 && resultStage2.layout_group_participants,
									  ),
						  );
					//  본선진출 가져오기
					const resultWinner =
						res.data.Info.stage2[res.data.Info.stage2.length - 1];

					if (
						(groupParticipants && groupParticipants.length === 0) ||
						(groupParticipants === undefined &&
							(groupNumber === 0 || groupNumber === null))
					) {
						('');
					} else {
						if (resultWinner === undefined) {
						} else {
							setWinnerList(
								JSON.parse(resultWinner && resultWinner.layout_values),
							);
						}
					}

					//추가 경기
					const resultExtra =
						res.data.Info.stage1_extra[res.data.Info.stage1_extra.length - 1];
					const resultExtraMain =
						res.data.Info.stage2_extra[res.data.Info.stage2_extra.length - 1];

					if (viewTypeNum === 1) {
						if (res.data.Info.stage1_extra.length === 0) {
							('');
						} else {
							setStage1Extra(res.data.Info.stage1_extra);
						}
						setStage1(res.data.Info.stage1);
					} else {
						if (res.data.Info.stage1_extra.length === 0) {
							('');
						} else {
							setStage1Extra(res.data.Info.stage1_extra);
						}
						setStage1(res.data.Info.stage1_extra);
					}

					if (viewTypeNumMain === 1) {
						if (res.data.Info.stage2_extra.length === 0) {
							('');
						} else {
							setStage2Extra(res.data.Info.stage2_extra);
						}
						setStage2(res.data.Info.stage2);
					} else {
						if (res.data.Info.stage2_extra.length === 0) {
							('');
						} else {
							setStage2Extra(res.data.Info.stage2_extra);
						}
						setStage2(res.data.Info.stage2_extra);
					}

					if (
						(groupParticipants1Extra && groupParticipants1Extra.length === 0) ||
						groupParticipants1Extra === undefined
						// &&
						// (groupNumber === 0 || groupNumber === null)
					) {
						('');
					} else {
						setExtraUser(JSON.parse(resultExtra && resultExtra.layout_values));
					}

					if (
						(groupParticipantsExtra && groupParticipantsExtra.length === 0) ||
						groupParticipantsExtra === undefined
						// &&
						// (groupNumber === 0 || groupNumber === null)
					) {
						('');
					} else {
						setExtraUserMain(
							JSON.parse(resultExtraMain && resultExtraMain.layout_values),
						);
					}

					// 추가 경기 예선 정보 가져오기
					const resultStage1Extra = res.data.Info.stage1_extra[0];

					setTotalRound1Extra(
						resultStage1Extra && resultStage1Extra.round_number,
					);

					setGroupParticipants1Extra(
						resultStage1Extra && resultStage1Extra.layout_group_participants,
					);

					// 추가 경기 본선 정보 가져오기
					const resultStage2Extra = res.data.Info.stage2_extra[0];

					setTotalRoundExtra(
						resultStage2Extra && resultStage2Extra.round_number,
					);
					setRuleExtra(resultStage2Extra && resultStage2Extra.win_rule);
					setLeagueTypeExtra(
						resultStage2Extra && resultStage2Extra.layout_type,
					);
					setGroupParticipantsExtra(
						resultStage2Extra && resultStage2Extra.layout_group_participants,
					);
				});
		} catch (e) {
			console.error(e);
		}
	}, [
		flag,
		modal,
		extraModal,
		option1,
		selectRound1,
		selectRound,
		extraModalMain,
	]);

	const teamList = leagueTeamListRedux.teams;
	// 랜덤으로 하는 방법
	// const teamListRandom = teamList && teamList.sort(() => Math.random() - 0.5);
	const teamListRandom =
		teamList &&
		teamList.sort(function(a, b) {
			return a.team_name < b.team_name ? -1 : a.team_name > b.team_name ? 1 : 0;
		});

	const participantsListRandom =
		participantsList &&
		participantsList.sort(function(a, b) {
			return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
		});

	// 토너먼트 레이아웃 그리
	useEffect(() => {
		try {
			axios
				.post(`${url.file}/LeagueLayoutDraw`, {
					participants:
						insertLeagueInfo.league_type === 1
							? teamList && teamList.length
							: participantsList.length,
					layout_type: 1,
				})
				.then(res => {
					setToRound(res.data.Info.league_layout.length);
					// if (leagueType1 === 1) {
					if (insertLeagueInfo.league_type === 1) {
						const arr = [];
						const isRound = res.data.Info.league_layout
							// .reverse()
							.map(item => {
								const result = item.round.map((item2, index) => {
									arr.push(index);
									return {
										round: item2.round,
										name:
											leagueTeamListRedux.teams[arr.length - 1] &&
											leagueTeamListRedux.teams[arr.length - 1].team_name,
										id: arr.length,
										score:
											(leagueTeamListRedux.teams[arr.length - 1] &&
												leagueTeamListRedux.teams[arr.length - 1].team_name) ===
											undefined
												? null
												: null,
										idx:
											(leagueTeamListRedux.teams[arr.length - 1] &&
												leagueTeamListRedux.teams[arr.length - 1].team_name) ===
												undefined && arr.length,
										team_id:
											leagueTeamListRedux.teams[arr.length - 1] &&
											leagueTeamListRedux.teams[arr.length - 1].team_id,
									};
								});
								return { matches: resultList(result) };
							});
						const region = {
							rounds: isRound,
						};
						setMatchData(region.rounds);
					} else {
						const arr = [];
						const isRound = res.data.Info.league_layout
							// .reverse()
							.map(item => {
								const result = item.round.map((item2, index) => {
									arr.push(index);
									return {
										round: item2.round,
										name:
											participantsList[arr.length - 1] &&
											participantsList[arr.length - 1].nickname,
										id: arr.length,
										score:
											(participantsList[arr.length - 1] &&
												participantsList[arr.length - 1].nickname) === undefined
												? null
												: null,
										idx:
											(participantsList[arr.length - 1] &&
												participantsList[arr.length - 1].nickname) ===
												undefined && arr.length,
									};
								});
								return { matches: resultList(result) };
							});
						const region = {
							rounds: isRound,
						};
						setMatchData(region.rounds);
					}
					// }
					// 본선
					// if (leagueType === 1) {
					if (insertLeagueInfo.league_type === 1) {
						const arr = [];
						const isRound = res.data.Info.league_layout.reverse().map(item => {
							const result = item.round.map((item2, index) => {
								arr.push(index);
								return {
									round: item2.round,
									name:
										leagueTeamListRedux.teams[arr.length - 1] &&
										leagueTeamListRedux.teams[arr.length - 1].team_name,
									id: arr.length,
									score:
										(leagueTeamListRedux.teams[arr.length - 1] &&
											leagueTeamListRedux.teams[arr.length - 1].team_name) ===
										undefined
											? null
											: null,
									idx:
										(leagueTeamListRedux.teams[arr.length - 1] &&
											leagueTeamListRedux.teams[arr.length - 1].team_name) ===
											undefined && arr.length,
									team_id:
										leagueTeamListRedux.teams[arr.length - 1] &&
										leagueTeamListRedux.teams[arr.length - 1].team_id,
								};
							});
							return { matches: resultList(result) };
						});
						const region = {
							rounds: isRound,
						};
						setMatchData(region.rounds);
					} else {
						const arr = [];
						const isRound = res.data.Info.league_layout.reverse().map(item => {
							const result = item.round.map((item2, index) => {
								arr.push(index);
								return {
									round: item2.round,
									name:
										participantsList[arr.length - 1] &&
										participantsList[arr.length - 1].nickname,
									id: arr.length,
									score:
										(participantsList[arr.length - 1] &&
											participantsList[arr.length - 1].nickname) === undefined
											? null
											: null,
									idx:
										(participantsList[arr.length - 1] &&
											participantsList[arr.length - 1].nickname) ===
											undefined && arr.length,
								};
							});
							return { matches: resultList(result) };
						});
						const region = {
							rounds: isRound,
						};
						setMatchData(region.rounds);
					}
					// }
				});
		} catch (e) {
			console.error(e);
		}
	}, [leagueType1, leagueType]);
	
	const isCount = (action, info, leagueInfo) => {
		setLeagueInfo(leagueInfo);

		// 팀전 + 예선 + 조가 아닌 경우 + 다음 라운드 전
		let selectTeam = [];
		leagueTeamList &&
			leagueTeamList.map(item => {
				if (item.nickname === info.nickname) {
					selectTeam.push({
						nickname: item.nickname,
						score: item.score === undefined ? action : item.score + action,
						imgFile: item.imgFile,
					});
				} else {
					selectTeam.push(item);
				}
				return;
			});

		setLeagueTeamList(selectTeam);

		// 예선 + 조가 아닌 경우 + 다음 라운드 전
		let select1 = [];
		user1.map(item => {
			if (item.nickname === info.nickname) {
				select1.push({
					nickname: item.nickname,
					score: action === -1 && item.score === 0 ? 0 : item.score + action,
					imgFile: item.imgFile,
				});
			} else {
				select1.push(item);
			}
			return;
		});
		setUser1(select1);

		// 예선 + 조 + 다음 라운드 전
		let array1 = [];
		for (let i = 0; i < makeGroup(user1, groupNumber1).length; i++) {
			let obj = {};
			let group = [];
			makeGroup(user1, groupNumber1)[i].group.map(item => {
				if (
					(item.group === undefined ? '' : item.group.nickname) ===
					(info === undefined ? '' : info.nickname)
				) {
					group.push({
						group: {
							nickname: info.nickname,
							score:
								action === -1 && group.score === 0 ? 0 : info.score + action,
							imgFile: info.imgFile,
							group_name: info.group_name,
						},
					});
				} else {
					group.push(item);
				}

				return;
			});
			obj.group = group;
			array1.push(obj);
		}
		setGroupUser1(array1);

		// 팀 + 예선 + 조 + 다음 라운드 전
		if (insertLeagueInfo.league_type === 1) {
			let arrayTeam = [];
			for (let i = 0; i < makeGroup(user1, groupNumber1).length; i++) {
				let obj = {};
				let group = [];
				makeGroup(leagueTeamList, groupNumber1, 1)[i].group.map(item => {
					if (
						(item.group === undefined ? '' : item.group.nickname) ===
						(info === undefined ? '' : info.nickname)
					) {
						group.push({
							group: {
								nickname: info.nickname,
								score:
									action === -1 && group.score === 0 ? 0 : info.score + action,
								imgFile: info.imgFile,
								group_name: info.group_name,
							},
						});
					} else {
						group.push(item);
					}

					return;
				});
				obj.group = group;
				arrayTeam.push(obj);
			}

			setGroupUserPreliminaryTeam(arrayTeam);
		}

		if (stage1 === null ? '' : stage1[0].layout_values !== '"[]"') {
			if (groupNumber1 === 0) {
				// 예선 + 조가 아닌 경우 + 라운드 업데이트
				const layoutArray = [];
				stage1 === null
					? ''
					: stage1.map(item1 => {
							const valueArray = [];
							const value = JSON.parse(item1.layout_values);
							(value === '[]' ? [] : value).map(valueItem => {
								if (valueItem.nickname === info.nickname) {
									valueArray.push({
										nickname: valueItem.nickname,
										score: valueItem.score + action,
										imgFile: valueItem.imgFile,
									});
								} else {
									valueArray.push(valueItem);
								}
							});

							if (item1.round_order === selectRound1) {
								setUpdateScoreData(valueArray);
								layoutArray.push({
									layout_group_participants: item1.layout_group_participants,
									layout_type: item1.layout_type,
									layout_values: JSON.stringify(valueArray),
									league_id: item1.league_id,
									league_layout_id: item1.league_layout_id,
									round_number: item1.round_number,
									round_order: item1.round_order,
									stage: item1.stage,
								});
							} else {
								layoutArray.push(item1);
							}
							return;
					  });
				setStage1(layoutArray);
			} else {
				// 예선 + 조 + 라운드 업데이트
				const layoutGroupArray = [];
				stage1 === null
					? ''
					: stage1.map(item => {
							const valueGroupArray = [];
							const value = JSON.parse(item.layout_values);

							for (let i = 0; i < value.length; i++) {
								let obj = {};
								let group = [];
								!!value[i].group &&
									value[i].group.map(item1 => {
										if (
											(item1.group === undefined
												? ''
												: item1.group.nickname) ===
											(info === undefined ? '' : info.nickname)
										) {
											group.push({
												group: {
													nickname: info.nickname,
													score:
														action === -1 && group.score === 0
															? 0
															: info.score + action,
													imgFile: item1.group.imgFile,
													group_name: info.group_name,
												},
											});
										} else {
											group.push(item1);
										}
										return;
									});
								obj.group = group;
								valueGroupArray.push(obj);
							}
							if (item.round_order === selectRound1) {
								setUpdateScoreData(valueGroupArray);
								layoutGroupArray.push({
									layout_group_participants: item.layout_group_participants,
									layout_type: item.layout_type,
									layout_values: JSON.stringify(valueGroupArray),
									league_id: item.league_id,
									league_layout_id: item.league_layout_id,
									round_number: item.round_number,
									round_order: item.round_order,
									stage: item.stage,
								});
							} else {
								layoutGroupArray.push(item);
							}
							return;
					  });
				setStage1(layoutGroupArray);
			}
		}

		// 추가 경기 + 조가 아닌 경우 + 다음 라운드 전
		let selectExtra = [];
		extraUser.map(item => {
			if (item.nickname === info.nickname) {
				selectExtra.push({
					nickname: item.nickname,
					score: action === -1 && item.score === 0 ? 0 : item.score + action,
					imgFile: item.imgFile,
				});
			} else {
				selectExtra.push(item);
			}
			return;
		});
		setExtraUser(selectExtra);

		// 추가경기 + 조 + 다음 라운드 전
		if (groupNumber1 > 0 && viewTypeNum === 2) {
			extraUser.map(item => {
				const valueGroupArray = [];
				for (let i = 0; i < extraUser.length; i++) {
					let obj = {};
					let group = [];
					extraUser[i].group.map(item1 => {
						if (
							(item1.group === undefined ? '' : item1.group.nickname) ===
							(info === undefined ? '' : info.nickname)
						) {
							group.push({
								group: {
									nickname: info.nickname,
									score: item1.group.score + action,
									imgFile: item1.group.imgFile,
									group_name: info.group_name,
								},
							});
						} else {
							group.push(item1);
						}
						return;
					});
					obj.group = group;
					valueGroupArray.push(obj);
				}
				setExtraUser(valueGroupArray);
				return;
			});
		}
	};

	const isCountMain = (action, info, leagueInfo) => {
		setLeagueInfo(leagueInfo);

		// 팀전 + 예선 + 조가 아닌 경우 + 다음 라운드 전
		let selectTeam = [];
		leagueTeamList &&
			leagueTeamList.map(item => {
				if (item.nickname === info.nickname) {
					selectTeam.push({
						nickname: item.nickname,
						score: item.score === undefined ? action : item.score + action,
						imgFile: item.imgFile,
					});
				} else {
					selectTeam.push(item);
				}
				return;
			});

		setLeagueTeamList(selectTeam);

		// 본선 + 조가 아닌 경우 + 다음 라운드 전
		let select = [];
		user.map(item => {
			if (item.nickname === info.nickname) {
				select.push({
					nickname: item.nickname,
					score: action === -1 && item.score === 0 ? 0 : item.score + action,
					imgFile: item.imgFile,
				});
			} else {
				select.push(item);
			}
			return;
		});
		setUser(select);

		// 위너
		let winnerSelect = [];
		winnerList.map(item => {
			if (item.nickname === info.nickname) {
				winnerSelect.push({
					nickname: item.nickname,
					score: action === -1 && item.score === 0 ? 0 : item.score + action,
					imgFile: item.imgFile,
				});
			} else {
				winnerSelect.push(item);
			}
			return;
		});
		groupNumber === 0 && setWinnerList(winnerSelect);

		// 본선 + 조 + 다음 라운드 전
		let array = [];
		for (let i = 0; i < makeGroup(user, groupNumber).length; i++) {
			let obj = {};
			let group = [];
			makeGroup(user, groupNumber)[i].group.map(item => {
				if (
					(item.group === undefined ? '' : item.group.nickname) ===
					(info === undefined ? '' : info.nickname)
				) {
					group.push({
						group: {
							nickname: info.nickname,
							score:
								action === -1 && group.score === 0 ? 0 : info.score + action,
							imgFile: info.imgFile,
							group_name: info.group_name,
						},
					});
				} else {
					group.push(item);
				}

				return;
			});
			obj.group = group;
			array.push(obj);
		}
		setGroupUser(array);
		groupNumber !== '' && setWinnerGroupUser(array);

		// 팀전 + 본선 + 조 + 다음 라운드 전
		if (insertLeagueInfo.league_type === 1) {
			let array = [];
			for (let i = 0; i < makeGroup(leagueTeamList, groupNumber).length; i++) {
				let obj = {};
				let group = [];
				makeGroup(leagueTeamList, groupNumber)[i].group.map(item => {
					if (
						(item.group === undefined ? '' : item.group.nickname) ===
						(info === undefined ? '' : info.nickname)
					) {
						group.push({
							group: {
								nickname: info.nickname,
								score:
									action === -1 && group.score === 0 ? 0 : info.score + action,
								imgFile: info.imgFile,
								group_name: info.group_name,
							},
						});
					} else {
						group.push(item);
					}

					return;
				});
				obj.group = group;
				array.push(obj);
			}
			setGroupUserTeam(array);
			groupNumber !== '' && setWinnerGroupUser(array);
		}

		// 위너 + 조 + 다음 라운드 전
		if (groupNumber > 0) {
			winnerList.map(item => {
				const valueGroupArray = [];
				for (let i = 0; i < winnerList.length; i++) {
					let obj = {};
					let group = [];
					winnerList[i].group.map(item1 => {
						if (
							(item1.group === undefined ? '' : item1.group.nickname) ===
							(info === undefined ? '' : info.nickname)
						) {
							group.push({
								group: {
									nickname: info.nickname,
									score: item1.group.score + action,
									imgFile: item1.group.imgFile,
									group_name: info.group_name,
								},
							});
						} else {
							group.push(item1);
						}

						return;
					});
					obj.group = group;
					valueGroupArray.push(obj);
				}
				setWinnerList(valueGroupArray);
				return;
			});
		}

		// 추가 경기 + 조가 아닌 경우 + 다음 라운드 전
		let selectExtra = [];
		extraUserMain.map(item => {
			if (item.nickname === info.nickname) {
				selectExtra.push({
					nickname: item.nickname,
					score: action === -1 && item.score === 0 ? 0 : item.score + action,
					imgFile: item.imgFile,
				});
			} else {
				selectExtra.push(item);
			}
			return;
		});
		setExtraUserMain(selectExtra);

		// 추가경기 + 조 + 다음 라운드 전
		if (groupNumber > 0 && viewTypeNumMain === 2) {
			extraUserMain.map(item => {
				const valueGroupArray = [];
				for (let i = 0; i < extraUserMain.length; i++) {
					let obj = {};
					let group = [];
					extraUserMain[i].group.map(item1 => {
						if (
							(item1.group === undefined ? '' : item1.group.nickname) ===
							(info === undefined ? '' : info.nickname)
						) {
							group.push({
								group: {
									nickname: info.nickname,
									score: item1.group.score + action,
									imgFile: item1.group.imgFile,
									group_name: info.group_name,
								},
							});
						} else {
							group.push(item1);
						}
						return;
					});
					obj.group = group;
					valueGroupArray.push(obj);
				}

				setExtraUserMain(valueGroupArray);
				return;
			});
		}

		if (groupNumber === 0) {
			// 본선 + 조가 아닌 경우 + 라운드 업데이트
			const layoutArray = [];
			stage2 === null
				? ''
				: stage2.map(item1 => {
						const valueArray = [];
						const value = JSON.parse(item1.layout_values);
						(value === '[]' ? [] : value).map(valueItem => {
							if (valueItem.nickname === info.nickname) {
								valueArray.push({
									nickname: valueItem.nickname,
									score: valueItem.score + action,
									imgFile: valueItem.imgFile,
								});
							} else {
								valueArray.push(valueItem);
							}
						});

						if (item1.round_order === selectRound) {
							setUpdateScoreData(valueArray);
							setUpdateScoreDataExtra(valueArray);
							layoutArray.push({
								layout_group_participants: item1.layout_group_participants,
								layout_type: item1.layout_type,
								layout_values: JSON.stringify(valueArray),
								league_id: item1.league_id,
								league_layout_id: item1.league_layout_id,
								round_number: item1.round_number,
								round_order: item1.round_order,
								stage: item1.stage,
							});
						} else {
							layoutArray.push(item1);
						}
						return;
				  });
			setStage2(layoutArray);
		} else {
			// 본선 + 조 + 라운드 업데이트
			const layoutGroupArray = [];
			stage2 === null
				? ''
				: stage2.map(item => {
						const valueGroupArray = [];
						const value = JSON.parse(item.layout_values);
						for (let i = 0; i < value.length; i++) {
							let obj = {};
							let group = [];
							!!value[i].group &&
								value[i].group.map(item1 => {
									if (
										(item1.group === undefined ? '' : item1.group.nickname) ===
										(info === undefined ? '' : info.nickname)
									) {
										group.push({
											group: {
												nickname: info.nickname,
												score:
													action === -1 && group.score === 0
														? 0
														: info.score + action,
												imgFile: item1.group.imgFile,
												group_name: info.group_name,
											},
										});
									} else {
										group.push(item1);
									}

									return;
								});
							obj.group = group;
							valueGroupArray.push(obj);
						}
						if (item.round_order === selectRound) {
							setUpdateScoreData(valueGroupArray);
							setUpdateScoreDataExtra(valueGroupArray);
							layoutGroupArray.push({
								layout_group_participants: item.layout_group_participants,
								layout_type: item.layout_type,
								layout_values: JSON.stringify(valueGroupArray),
								league_id: item.league_id,
								league_layout_id: item.league_layout_id,
								round_number: item.round_number,
								round_order: item.round_order,
								stage: item.stage,
							});
						} else {
							layoutGroupArray.push(item);
						}
						return;
				  });
			setStage2(layoutGroupArray);
		}
		if (stage2 === null ? '' : stage2[0].layout_values !== '"[]"') {
			if (groupNumber1 === 0) {
				// 본선 + 조가 아닌 경우 + 라운드 업데이트
				const layoutArray = [];
				stage1 === null
					? ''
					: stage1.map(item1 => {
							const valueArray = [];
							const value = JSON.parse(item1.layout_values);
							(value === '[]' ? [] : value).map(valueItem => {
								if (valueItem.nickname === info.nickname) {
									valueArray.push({
										nickname: valueItem.nickname,
										score: valueItem.score + action,
										imgFile: valueItem.imgFile,
									});
								} else {
									valueArray.push(valueItem);
								}
							});

							if (item1.round_order === selectRound) {
								setUpdateScoreData(valueArray);
								setUpdateScoreDataExtra(valueArray);
								layoutArray.push({
									layout_group_participants: item1.layout_group_participants,
									layout_type: item1.layout_type,
									layout_values: JSON.stringify(valueArray),
									league_id: item1.league_id,
									league_layout_id: item1.league_layout_id,
									round_number: item1.round_number,
									round_order: item1.round_order,
									stage: item1.stage,
								});
							} else {
								layoutArray.push(item1);
							}
							return;
					  });
				setStage1(layoutArray);
			} else {
				// 본선 + 조 + 라운드 업데이트
				const layoutGroupArray = [];
				stage1 === null
					? ''
					: stage1.map(item => {
							const valueGroupArray = [];
							const value = JSON.parse(item.layout_values);
							for (let i = 0; i < value.length; i++) {
								let obj = {};
								let group = [];
								!!value[i].group &&
									value[i].group.map(item1 => {
										if (
											(item1.group === undefined
												? ''
												: item1.group.nickname) ===
											(info === undefined ? '' : info.nickname)
										) {
											group.push({
												group: {
													nickname: info.nickname,
													score:
														action === -1 && group.score === 0
															? 0
															: info.score + action,
													imgFile: item1.group.imgFile,
													group_name: info.group_name,
												},
											});
										} else {
											group.push(item1);
										}

										return;
									});
								obj.group = group;
								valueGroupArray.push(obj);
							}
							if (item.round_order === selectRound) {
								setUpdateScoreData(valueGroupArray);
								setUpdateScoreDataExtra(valueGroupArray);
								layoutGroupArray.push({
									layout_group_participants: item.layout_group_participants,
									layout_type: item.layout_type,
									layout_values: JSON.stringify(valueGroupArray),
									league_id: item.league_id,
									league_layout_id: item.league_layout_id,
									round_number: item.round_number,
									round_order: item.round_order,
									stage: item.stage,
								});
							} else {
								layoutGroupArray.push(item);
							}
							return;
					  });
				setStage1(layoutGroupArray);
			}
		}
	};

	//변화된부분
	// useEffect(() => {
	// 	if (leagueType === 1) {
	// 		setMatchData(stage2 === null ? '' : JSON.parse(stage2[0].layout_values));
	// 	}
	// }, [stage2, flag]);

	//증빙자료
	const onChangeFile = async e => {
		e.preventDefault();
		let reader = new FileReader();
		let file1 = e.target.files[0];

		try {
			const options = {
				maxSizeMB: 5,
				maxWidthOrHeight: 1500,
			};
			const compressedFile = await imageCompression(file1, options);
			const file = new File([compressedFile], file1.name);
			setFile(file);
			reader.onloadend = () => {
				setFile(file1);
			};
			reader.readAsDataURL(file1);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		try {
			const options = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			const formData = new FormData();
			formData.append('image', file);
			axios.post(`${url.file}/LeagueImage`, formData, options).then(res => {
				setImgFile(res.data.link);
			});
		} catch (e) {
			console.error(e);
		}
	}, [file]);

	const isUpload = () => {
		// 예선
		stage1 === null
			? ''
			: stage1.map(item1 => {
					const valueArray = [];
					const value = JSON.parse(item1.layout_values);
					if (item1.round_order === selectRound1) {
						value.map(valueItem => {
							if (valueItem.nickname === selectInfo.nickname) {
								valueArray.push({
									nickname: valueItem.nickname,
									score: valueItem.score,
									imgFile: imgFile,
								});
							} else {
								valueArray.push(valueItem);
							}
						});
						setUpdateImg(valueArray);
					}
					return;
			  });
	};

	// 조가 아닌경우 업데이트
	const isUploadMain = () => {
		stage2 === null
			? ''
			: stage2.map(item1 => {
					const valueArray = [];
					const value = JSON.parse(item1.layout_values);
					if (item1.round_order === selectRound) {
						(value === '[]' ? [] : value).map(valueItem => {
							if (valueItem.nickname === selectInfo.nickname) {
								valueArray.push({
									nickname: valueItem.nickname,
									score: valueItem.score,
									imgFile: imgFile,
								});
							} else {
								valueArray.push(valueItem);
							}
						});
						setUpdateImgMain(valueArray);
						setUpdateImgMainExtra(valueArray);
					}
					return;
			  });
	};

	// 조인 경우 업데이트
	const isUploadGroup = () => {
		stage1 === null
			? ''
			: stage1.map(item => {
					const valueGroupArray = [];
					const value = JSON.parse(item.layout_values);
					for (let i = 0; i < value.length; i++) {
						let obj = {};
						let group = [];
						!!value[i].group &&
							value[i].group.map(item1 => {
								if (
									(item1.group === undefined ? '' : item1.group.nickname) ===
									(selectInfo === undefined ? '' : selectInfo.nickname)
								) {
									if (item.round_order === selectRound1) {
										group.push({
											group: {
												nickname: item1.group.nickname,
												score: item1.group.score,
												imgFile: imgFile,
												group_name: item1.group.group_name,
											},
										});
									} else {
										group.push(item1);
									}
								} else {
									group.push(item1);
								}
								return;
							});
						obj.group = group;
						valueGroupArray.push(obj);
					}
					if (item.round_order === selectRound1) {
						setGroupUpdateImg(valueGroupArray);
					}
					return;
			  });

		let array = [];
		for (let i = 0; i < makeGroup(user, groupNumber).length; i++) {
			let obj = {};
			let group = [];
			(groupUser.length === 0 ? makeGroup(user, groupNumber) : groupUser)[
				i
			].group.map(item => {
				if (item.group.nickname === selectInfo.nickname) {
					group.push({
						group: {
							nickname: selectInfo.nickname,
							score: selectInfo.score,
							imgFile: imgFile,
						},
					});
				} else {
					group.push(item);
				}

				return;
			});
			obj.group = group;
			array.push(obj);
		}
		setGroupUser1(array);
	};

	const isUploadGroupMain = () => {
		stage2 === null
			? ''
			: stage2.map(item => {
					const valueGroupArray = [];
					const value = JSON.parse(item.layout_values);
					for (let i = 0; i < value.length; i++) {
						let obj = {};
						let group = [];
						!!value[i].group &&
							value[i].group.map(item1 => {
								if (
									(item1.group === undefined ? '' : item1.group.nickname) ===
									(selectInfo === undefined ? '' : selectInfo.nickname)
								) {
									if (item.round_order === selectRound) {
										group.push({
											group: {
												nickname: item1.group.nickname,
												score: item1.group.score,
												imgFile: imgFile,
												group_name: item1.group.group_name,
											},
										});
									} else {
										group.push(item1);
									}
								} else {
									group.push(item1);
								}
								return;
							});
						obj.group = group;
						valueGroupArray.push(obj);
					}
					if (item.round_order === selectRound) {
						setGroupUpdateImgMain(valueGroupArray);
						setGroupUpdateImgMainExtra(valueGroupArray);
					}
					return;
			  });

		let array = [];
		for (let i = 0; i < makeGroup(user, groupNumber).length; i++) {
			let obj = {};
			let group = [];
			(groupUser.length === 0 ? makeGroup(user, groupNumber) : groupUser)[
				i
			].group.map(item => {
				if (item.group.nickname === selectInfo.nickname) {
					group.push({
						group: {
							nickname: selectInfo.nickname,
							score: selectInfo.score,
							imgFile: imgFile,
						},
					});
				} else {
					group.push(item);
				}
				return;
			});
			obj.group = group;
			array.push(obj);
		}
		setGroupUser(array);
	};

	useEffect(() => {
		if (stage2 === null ? '' : stage2.length > 1) {
			axios
				.post(`${url.file}/LeagueLayoutUpdate`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					league_layout_id:
						leagueInfoUpload === null ? '' : leagueInfoUpload.league_layout_id,
					league_id: window.location.pathname.split('/')[2],
					score_update: true,
					layout_type:
						leagueInfoUpload === null ? '' : leagueInfoUpload.layout_type,
					layout_group_participants:
						leagueInfoUpload === null
							? ''
							: JSON.parse(leagueInfoUpload.layout_group_participants),
					round_number:
						leagueInfoUpload === null ? '' : leagueInfoUpload.round_number,
					round_order:
						leagueInfoUpload === null ? '' : leagueInfoUpload.round_order,
					win_rule: leagueInfoUpload === null ? '' : leagueInfoUpload.win_rule,
					layout_rank_decision:
						leagueInfoUpload === null
							? ''
							: leagueInfoUpload.layout_rank_decision,
					layout_values:
						viewTypeNumMain === 1
							? (groupInfo === null
								? ''
								: groupInfo.group_num === '')
								? updateImgMain
								: groupUpdateImgMain
							: (groupInfo === null
								? ''
								: groupInfo.group_num === '')
							? updateImgMainExtra
							: groupUpdateImgMainExtra,
				})
				.then(res => {
					setFlag(!flag);
				});
		} else {
			axios
				.post(`${url.file}/LeagueLayoutUpdate`, {
					league_layout_id:
						leagueInfoUpload === null ? '' : leagueInfoUpload.league_layout_id,
					id: getUserInfo === null ? '' : getUserInfo.id,
					league_id: window.location.pathname.split('/')[2],
					score_update: true,
					layout_type:
						leagueInfoUpload === null ? '' : leagueInfoUpload.layout_type,
					layout_group_participants:
						leagueInfoUpload === null
							? ''
							: JSON.parse(leagueInfoUpload.layout_group_participants),
					round_number:
						leagueInfoUpload === null ? '' : leagueInfoUpload.round_number,
					round_order:
						leagueInfoUpload === null ? '' : leagueInfoUpload.round_order,
					win_rule: leagueInfoUpload === null ? '' : leagueInfoUpload.win_rule,
					layout_rank_decision:
						leagueInfoUpload === null
							? ''
							: leagueInfoUpload.layout_rank_decision,
					layout_values: (groupInfo1 === null
					? ''
					: groupInfo1.group_num === '')
						? updateImg
						: groupUpdateImg,
				})
				.then(res => {
					setFlag(!flag);
				});
		}
	}, [updateImg, groupUpdateImg, updateImgMain, groupUpdateImgMain]);

	const openLeaderBoard = () => {
		const preliminaryBooLean = (groupInfo1 === null
		? ''
		: groupInfo1.group_num === '')
			? false
			: true;

		try {
			axios
				.post(`${url.file}/LeagueDMLeaderBoard`, {
					stage: 1,
					extra_stage: viewTypeNum === 2 ? insertLeagueInfo.league_title : null,
					league_id: Number(window.location.pathname.split('/')[2]),
					layout_type: 2,
					group_exist: preliminaryBooLean,
				})
				.then(res => {
					const score = 'total_score';
					const result = res.data.Info.leader_board.sort(function(a, b) {
						return b[score] - a[score];
					});

					if (
						insertLeagueInfo.league_type === 1 &&
						stage1[0].layout_values.substring(0, 4) === `[{"m`
					) {
						setRankingPreliminary(leagueTeamList);
					} else {
						setRankingPreliminary(result);
					}

					if (
						insertLeagueInfo.league_type === 1 &&
						(stage1Extra === null
							? ''
							: stage1Extra[0].layout_values.substring(0, 4) === `[{"m`)
					) {
						setRankingPreliminaryExtra(leagueTeamList);
					} else {
						setRankingPreliminaryExtra(result);
					}
				});
		} catch (e) {
			console.error(e);
		}
	};

	const openLeaderBoardMain = () => {
		const mainBooLean = (groupInfo === null
		? ''
		: groupInfo.group_num === '')
			? false
			: true;

		try {
			axios
				.post(`${url.file}/LeagueDMLeaderBoard`, {
					stage: 2,
					extra_stage:
						viewTypeNumMain === 2 ? insertLeagueInfo.league_title : null,
					league_id: Number(window.location.pathname.split('/')[2]),
					layout_type: 2,
					group_exist: mainBooLean,
				})
				.then(res => {
					const score = 'total_score';
					const result = res.data.Info.leader_board.sort(function(a, b) {
						return b[score] - a[score];
					});

					if (
						insertLeagueInfo.league_type === 1 &&
						stage2[0].layout_values.substring(0, 4) === `[{"m`
					) {
						setRankingMain(leagueTeamList);
					} else {
						setRankingMain(result);
					}

					if (
						insertLeagueInfo.league_type === 1 &&
						(stage2Extra === null
							? ''
							: stage1Extra[0].layout_values.substring(0, 4) === `[{"m`)
					) {
						setRankingMainExtra(leagueTeamList);
					} else {
						setRankingMainExtra(result);
					}
				});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<main className="LeagueTournament">
			{stage2 === null ? (
				''
			) : stage2.length === 0 ? (
				<dl className="LeagueTournament--emptied">
					<dd className="emptiedText">대진표를 아직 작성하지 않으셨습니다.</dd>
					<button
						className="makeTournamentBtn"
						onClick={() => setModal(!modal)}
					>
						대진표 작성
					</button>
				</dl>
			) : (
				<>
					{/* <section className="LeagueTournament--system">
						<article className="systam--box">
							<h2>리그 방식</h2>
							<div className="system__btn--box">
								{systemList.map((item, index) => {
									return (
										<button type="button" className="system__btn" key={index}>
											{item.name} <img src={question} />
										</button>
									);
								})}
							</div>
						</article>
						<article className="total--box">
							<p className="totla__title">
								<h2>TOTAL</h2>
								<h3>2020.03.22 PM19:59</h3>
							</p>
							<ul className="text">
								<li>
									총 <b>24</b> 명 &nbsp;&nbsp;&nbsp;&nbsp; 각 팀 <b>4</b>명
								</li>
								<li>
									총 <strong>24</strong> 번의 게임을 진행합니다
								</li>
							</ul>
						</article>
					</section> */}

					{/*************************** 예선 ***************************/}
					{/*************************** 예선 ***************************/}

					<DeathmatchPreliminary
						entrant={entrant}
						stage1={stage1}
						stage2={stage2}
						option1={option1}
						insertLeagueInfo={insertLeagueInfo}
						leagueType1={leagueType1}
						matcheData={matcheData}
						setMatchData={setMatchData}
						participantsList1={participantsList1}
						// getTeamRoud={getTeamRoud}
						user1={user1}
						isCount={isCount}
						setLeagueInfoUpload={setLeagueInfoUpload}
						certification={certification}
						setCertification={setCertification}
						setSelectInfo={setSelectInfo}
						upload={upload}
						setUpload={setUpload}
						leagueInfoUpload={leagueInfoUpload}
						groupInfo={groupInfo}
						updateScoreData={updateScoreData}
						applyState={applyState}
						setApplyState={setApplyState}
						setOption1={setOption1}
						openLeaderBoard={openLeaderBoard}
						rankingPreliminary={rankingPreliminary}
						selectRound1={selectRound1}
						setSelectRound1={setSelectRound1}
						totalRound1={totalRound1}
						groupParticipants1={groupParticipants1}
						rule1={rule1}
						flag={flag}
						setFlag={setFlag}
						groupUser1={groupUser1}
						groupNumber1={groupNumber1}
						groupNumber={groupNumber}
						setGroupUser1={setGroupUser1}
						// 이걸로 구분하는 것 같은데 다른걸로 대채할거를 찾아야함
						totalRound1Extra={totalRound1Extra}
						extraModal={extraModal}
						setExtraModal={setExtraModal}
						leagueViewType={leagueViewType}
						setViewTypeNum={setViewTypeNum}
						viewTypeNum={viewTypeNum}
						extraUser={extraUser}
						stage1Extra={stage1Extra}
						stage2Extra={stage2Extra}
						totalRoundExtra={totalRoundExtra}
						ruleExtra={ruleExtra}
						leagueTypeExtra={leagueTypeExtra}
						groupParticipants1Extra={groupParticipants1Extra}
						updateScoreDataExtra={updateScoreDataExtra}
						rankingPreliminaryExtra={rankingPreliminaryExtra}
						resetEntrant={resetEntrant}
						isRound={isRound}
						leagueTeamList={leagueTeamList}
						resultList={resultList}
						groupUserPreliminaryTeam={groupUserPreliminaryTeam}
						setGroupUserPreliminaryTeam={setGroupUserPreliminaryTeam}
					/>

					{/*************************** 본선 ***************************/}
					{/*************************** 본선 ***************************/}

					<DeathmatchMain
						rankingMain={rankingMain}
						stage1={stage1}
						stage2={stage2}
						option={option}
						setOption={setOption}
						insertLeagueInfo={insertLeagueInfo}
						leagueType={leagueType}
						matcheData={matcheData}
						setMatchData={setMatchData}
						participantsList={participantsList}
						// getTeamRoud={getTeamRoud}
						user={user}
						winnerList={winnerList}
						isCountMain={isCountMain}
						setLeagueInfoUpload={setLeagueInfoUpload}
						certification={certification}
						setCertification={setCertification}
						setSelectInfo={setSelectInfo}
						upload={upload}
						setUpload={setUpload}
						leagueInfoUpload={leagueInfoUpload}
						updateScoreData={updateScoreData}
						setApplyState={setApplyState}
						openLeaderBoardMain={openLeaderBoardMain}
						rankingPreliminary={rankingPreliminary}
						selectRound={selectRound}
						setSelectRound={setSelectRound}
						totalRound={totalRound}
						groupParticipants={groupParticipants}
						rule={rule}
						flag={flag}
						setFlag={setFlag}
						groupUser={groupUser}
						groupNumber={groupNumber}
						setGroupUser={setGroupUser}
						modalWinner={modalWinner}
						setModalWinner={setModalWinner}
						winnerGroupUser={winnerGroupUser}
						totalRound1={totalRound1}
						extraModalMain={extraModalMain}
						setExtraModalMain={setExtraModalMain}
						leagueViewTypeMain={leagueViewTypeMain}
						setViewTypeNumMain={setViewTypeNumMain}
						viewTypeNumMain={viewTypeNumMain}
						// extraGroupUserMain={extraGroupUserMain}
						extraUserMain={extraUserMain}
						stage1Extra={stage1Extra}
						stage2Extra={stage2Extra}
						totalRoundExtra={totalRoundExtra}
						ruleExtra={ruleExtra}
						leagueTypeExtra={leagueTypeExtra}
						groupParticipantsExtra={groupParticipantsExtra}
						updateScoreDataExtra={updateScoreDataExtra}
						rankingMainExtra={rankingMainExtra}
						totalRound1Extra={totalRound1Extra}
						resetEntrant={resetEntrant}
						applyState={applyState}
						leagueTeamList={leagueTeamList}
						groupUserTeam={groupUserTeam}
						setStage2Extra={setStage2Extra}
					/>
				</>
			)}
			{modal && (
				<LayoutModal
					modal={modal}
					setModal={setModal}
					participantsList={participantsList}
					insertLeagueInfo={insertLeagueInfo}
					matcheData={matcheData}
					user={user}
					totalRound={totalRound}
					leagueTeamList={leagueTeamList}
				/>
			)}
			{extraModal && (
				<ExtraLayoutModal
					extraModal={extraModal}
					setExtraModal={setExtraModal}
					participantsList={participantsList}
					insertLeagueInfo={insertLeagueInfo}
					matcheData={matcheData}
					user={user}
					totalRound={totalRound}
					stage1={stage1}
					stage2={stage2}
					insertLeagueInfo={insertLeagueInfo}
					leagueType1={leagueType1}
					resultList={resultList}
				/>
			)}
			{extraModalMain && (
				<ExtraLayoutModalMain
					extraModalMain={extraModalMain}
					setExtraModalMain={setExtraModalMain}
					participantsList={participantsList}
					insertLeagueInfo={insertLeagueInfo}
					matcheData={matcheData}
					user={user}
					totalRound={totalRound}
					stage1={stage1}
					stage2={stage2}
					insertLeagueInfo={insertLeagueInfo}
					resultList={resultList}
				/>
			)}
			{modalWinner && (
				<WinnerModal
					winner={winner}
					participantsList={participantsList}
					insertLeagueInfo={insertLeagueInfo}
					modalWinner={modalWinner}
					setModalWinner={setModalWinner}
					leagueTeamList={leagueTeamList}
				/>
			)}
			<div className={`box__alert${applyState ? ' alert' : ''}`}>
				<strong>적용 되었습니다.</strong>
			</div>
			{upload ? (
				<div className="modal--container">
					<div className="background" onClick={() => setUpload(!upload)} />
					<article className="modal--box">
						<div className="modal__title">
							<h1>자료증빙</h1>
							<button>
								<img
									className="closeBtn"
									src={closeBtnGray}
									onClick={() => setUpload(!upload)}
								/>
							</button>
						</div>
						<div className="modal--inner__upload">
							<div className="input--box">
								<input
									className="img__input"
									value={
										file
											? file.name ||
											  (insertLeagueInfo.league_main_img &&
													insertLeagueInfo.league_main_img.substring(63)) ||
											  (insertLeagueInfo.league_main_img &&
													insertLeagueInfo.league_main_img.name)
											: '이미지'
									}
								/>
								<div className="upload--btn">
									<label htmlFor="uploadBtn" className="btn_file">
										찾아보기
									</label>
									<input
										id="uploadBtn"
										type="file"
										className="file-class"
										accept="image/gif,image/jpeg,image/png"
										onChange={e => onChangeFile(e)}
									/>
								</div>
							</div>
							<div className="text">jpg,png 파일 지원</div>
						</div>
						<Button
							// imgFile
							className={
								imgFile === undefined ? 'modalBtn colorGray' : 'modalBtn'
							}
							size="medium"
							onClick={() => {
								if (imgFile === undefined) {
									('');
								} else {
									groupNumber1 === 0 ? isUpload() : isUploadGroup();
									groupNumber === 0 ? isUploadMain() : isUploadGroupMain();
									setUpload(!upload);
									setFlag(!flag);
									setFile(null);
								}
							}}
						>
							증빙하기
						</Button>
					</article>
				</div>
			) : (
				''
			)}

			{certification ? (
				<div className="modal--container">
					<div
						className="background"
						onClick={() => setCertification(!certification)}
					/>
					<article className="modal--box">
						<div className="modal__title">
							<h1>증빙자료</h1>
							<button>
								<img
									className="closeBtn"
									src={closeBtnGray}
									onClick={() => setCertification(!certification)}
								/>
							</button>
						</div>
						<img
							className="certification__img"
							src={selectInfo.imgFile || selectInfo.group.imgFile}
						/>
					</article>
				</div>
			) : (
				''
			)}
		</main>
	);
};

const mapStateToProps = state => {
	return { leagueTeamListRedux: state.league.leagueTeamListRedux };
};

const mapDispatchToProps = dispatch => {
	return {
		resetEntrant: () => dispatch(resetEntrant()),
		getLeagueTeamList: (id, leagueId, complete) =>
			dispatch(getLeagueTeamList(id, leagueId, complete)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeagueTournament);
