import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

// import ExtraLayoutModal from '../ExtraLeagueModalMain/ExtraLayoutModalMain';
import TournamentMain from '../../../container/League/TournamentMain/TournamentMain';
import { makeGroup } from '../../../Utils/func';

import MenuBar from '../../../static/images/MobileMenu/menuBar.svg';
import uploadImg from '../../../static/images/upload.svg';
import photo from '../../../static/images/photo.svg';
import addBtn from '../../../static/images/addBtn.svg';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const DeathmatchMain = ({
	rankingMain,
	stage1,
	stage2,
	option,
	setOption,
	insertLeagueInfo,
	leagueType,
	matcheData,
	setMatchData,
	participantsList,
	// getTeamRoud,
	user,
	winnerList,
	isCountMain,
	setLeagueInfoUpload,
	certification,
	setCertification,
	setSelectInfo,
	upload,
	setUpload,
	leagueInfoUpload,
	updateScoreData,
	updateScoreDataExtra,
	setApplyState,
	openLeaderBoardMain,
	selectRound,
	setSelectRound,
	totalRound,
	groupParticipants,
	rule,
	flag,
	setFlag,
	groupUser,
	groupNumber,
	setGroupUser,
	modalWinner,
	setModalWinner,
	winnerGroupUser,
	totalRound1,
	extraModalMain,
	setExtraModalMain,
	leagueViewTypeMain,
	setViewTypeNumMain,
	viewTypeNumMain,
	extraGroupUserMain,
	extraUserMain,
	stage2Extra,
	stage1Extra,
	totalRoundExtra,
	ruleExtra,
	leagueTypeExtra,
	groupParticipantsExtra,
	rankingMainExtra,
	totalRound1Extra,
	resetEntrant,
	applyState,
	leagueTeamList,
	groupUserTeam,
	setStage2Extra,
}) => {
	const Info =
		stage2 === null ? '' : JSON.parse(stage2[0] && stage2[0].layout_values);
	const [userInfo, setUserInfo] = useState(Info);

	const InfoExtra =
		stage2Extra === null
			? ''
			: JSON.parse(stage2Extra[0] && stage2Extra[0].layout_values);
	const [userInfoExtra, setUserInfoExtra] = useState(InfoExtra);

	const getRound = [];
	const round_number =
		stage2 === null ? '' : stage2[0] && stage2[0].round_number;
	for (let i = 1; i <= round_number; i++) {
		getRound.push({ round: i });
	}
	const roundLength = getRound.length * 172;

	const deathmatchInsert = () => {
		const checkUpdate =
			stage2 === null
				? null
				: stage2.map(item => {
						return item.round_order;
				  });

		const valueRound =
			checkUpdate === null ? '' : checkUpdate.indexOf(selectRound);
		if (valueRound > -1) {
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
					// layout_values: (groupInfo1 === null
					// ? ''
					// : groupInfo1.group_num === '')
					// 	? updateScoreData
					//   : '',
					layout_values: updateScoreData,
				})
				.then(res => {
					if (res.status === 200) {
						setApplyState(true);
						setTimeout(() => {
							setApplyState(false);
						}, 1000);
					}
				});
		} else {
			try {
				axios
					.post(`${url.file}/LeagueLayoutInsert`, {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_id: window.location.pathname.split('/')[2],
						score_update: true,
						layout_type: 2,
						stage: 2,
						round_number: totalRound,
						round_order: selectRound,
						win_rule: rule,
						// layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values: (stage1 === null
						? ''
						: stage1.length === 0)
							? // 본선만 있는 경우
							  (stage2 === null
								? ''
								: JSON.parse(groupParticipants).group_num === '')
								? winnerList
								: winnerList
							: (stage2 === null
								? ''
								: JSON.parse(groupParticipants).group_num === '')
							? winnerList
							: winnerList,

						layout_group_participants: JSON.parse(groupParticipants),
					})
					.then(res => {
						if (res.status === 200) {
							setApplyState(true);
							setTimeout(() => {
								setApplyState(false);
							}, 1000);
						}
						setFlag(!flag);
					});
			} catch (e) {
				console.error(e);
			}
		}
	};

	const isDethmatchRound = round => {
		setSelectRound(round.round);
		setGroupUser([]);
	};

	const [winnerTable, setWinnerTable] = useState([]);

	useEffect(() => {
		axios
			.post(`${url.file}/LeagueWinnerSelect`, {
				league_id: window.location.pathname.split('/')[2],
				team_league: insertLeagueInfo.league_type === 1 ? true : false,
			})
			.then(res => {
				setWinnerTable(res.data.Info && res.data.Info.winner_table);
			});
	}, [modalWinner]);

	// 메인만 있는 경우
	const onlyMain =
		groupUser.length === 0 ? makeGroup(user, groupNumber) : groupUser;

	const onlyMainTeam =
		groupUserTeam.length === 0 && insertLeagueInfo.league_type === 1
			? makeGroup(leagueTeamList, groupNumber)
			: groupUserTeam;

	// 본선진출자 보이는 경우
	const winnerMain = winnerList;
	// 추가경기 보이는 경우
	const extraUserMainGroup = extraUserMain;

	const isExtraUpdate = () => {
		const checkUpdate =
			stage2Extra === null
				? null
				: stage2Extra.map(item => {
						return item.round_order;
				  });

		const valueRound =
			checkUpdate === null ? '' : checkUpdate.indexOf(selectRound);
		if (valueRound > -1) {
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
					layout_values: Main === 1 ? updateScoreData : updateScoreDataExtra,
				})
				.then(res => {
					if (res.status === 200) {
						setApplyState(true);
						setTimeout(() => {
							setApplyState(false);
						}, 1000);
					}
				});
		} else {
			try {
				axios
					.post(`${url.file}/LeagueLayoutInsert`, {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_id: window.location.pathname.split('/')[2],
						score_update: true,
						layout_type: 2,
						stage: 2,
						round_number: totalRoundExtra,
						round_order: selectRound,
						win_rule: rule,
						extra_stage: insertLeagueInfo.league_title,
						// layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values: (stage1Extra === null
						? ''
						: stage1Extra.length === 0)
							? // 예선 없이 본선만 있는 경우
							  (stage2Extra === null
								? ''
								: JSON.parse(groupParticipantsExtra).group_num === '')
								? extraUserMain
								: extraUserMain
							: // 예선 본선 둘다 있는 경우
							(stage2Extra === null
								? ''
								: JSON.parse(groupParticipantsExtra).group_num === '')
							? winnerList
							: extraUserMainGroup,

						layout_group_participants: JSON.parse(groupParticipantsExtra),
					})
					.then(res => {
						if (res.status === 200) {
							setApplyState(true);
							setTimeout(() => {
								setApplyState(false);
							}, 1000);
						}
						setFlag(!flag);
					});
			} catch (e) {
				console.error(e);
			}
		}
	};

	// 본선인지 추가경기인지 선태하는 셀렉함수
	const addCategory = e => {
		setViewTypeNumMain(e.value);
		setFlag(!flag);
		setSelectRound(1);
	};

	const [selectUserInfo, setSelectUserInfo] = useState([]);

	const getuserInfo = (userInfo, selectInfo) => {
		setUserInfo(userInfo);
		setSelectUserInfo(selectInfo);
	};
	const [isRound, setIsRound] = useState(0);
	const getTeamRoud = e => {
		setIsRound(e);
	};
	// console.log(team)
	// 토너먼트 업데이트 인서트 전
	const apply = () => {
		try {
			const data = {
				id: getUserInfo === null ? '' : getUserInfo.id,
				league_id: Number(window.location.pathname.split('/')[2]),
				league_layout_id: stage2 === null ? '' : stage2[0].league_layout_id,
				layout_type: 1,
				participants: stage2 === null ? '' : stage2[0].layout_group,
				updating_round: [isRound],
				layout: matcheData,
				// league_layout_id: layout === null ? '' : layout[0].league_layout_id,
			};

			axios.post(`${url.file}/LeagueLayoutNextRound`, data).then(res => {
				setMatchData(res.data.Info && res.data.Info.league_layout);

				try {
					const data = {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_layout_id: stage2 === null ? '' : stage2[0].league_layout_id,
						league_id: Number(window.location.pathname.split('/')[2]),
						score_update: true,
						layout_type: 1,
						participants:
							insertLeagueInfo.league_type === 0
								? user.length
								: leagueTeamList.length,
						layout_values: res.data.Info && res.data.Info.league_layout,
						layout_group_participants:
							stage2 === null
								? ''
								: JSON.parse(stage2[0].layout_group_participants),
						// '[토너먼트의 경우에만 해당 레이아웃이 몇 조의 레이아웃인지]',
						layout_group: stage2 === null ? '' : stage2[0].layout_group,
					};

					axios.post(`${url.file}/LeagueLayoutUpdate`, data).then(res => {
						if (res.status === 200) {
							setApplyState(true);
							setTimeout(() => {
								setApplyState(false);
							}, 1000);
						}
					});
				} catch (e) {
					console.error(e);
				}
			});
		} catch (e) {
			console.error(e);
		}
	};

	const applyAfter = () => {
		try {
			const data = {
				id: getUserInfo === null ? '' : getUserInfo.id,
				league_id: Number(window.location.pathname.split('/')[2]),
				league_layout_id: stage2 === null ? '' : stage2[0].league_layout_id,
				layout_type: 1,
				participants:
					insertLeagueInfo.league_type === 0
						? user.length
						: leagueTeamList.length,
				updating_round: [isRound],
				layout: viewTypeNumMain === 1 ? userInfo : userInfoExtra,
				// league_layout_id: layout === null ? '' : layout[0].league_layout_id,
			};

			axios.post(`${url.file}/LeagueLayoutNextRound`, data).then(res => {
				setUserInfo(res.data.Info && res.data.Info.league_layout);

				try {
					const data = {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_layout_id: stage2 === null ? '' : stage2[0].league_layout_id,
						league_id: Number(window.location.pathname.split('/')[2]),
						score_update: true,
						layout_type: 1,
						layout_values: res.data.Info && res.data.Info.league_layout,
						layout_group_participants:
							stage2 === null
								? ''
								: JSON.parse(stage2[0].layout_group_participants),
						// '[토너먼트의 경우에만 해당 레이아웃이 몇 조의 레이아웃인지]',
						layout_group: stage2 === null ? '' : stage2[0].layout_group,
					};

					axios.post(`${url.file}/LeagueLayoutUpdate`, data).then(res => {
						if (res.status === 200) {
							setApplyState(true);
							setTimeout(() => {
								setApplyState(false);
							}, 1000);
						}
					});
				} catch (e) {
					console.error(e);
				}
			});
		} catch (e) {
			console.error(e);
		}
	};

	const applyAfterExtra = () => {
		try {
			const data = {
				id: getUserInfo === null ? '' : getUserInfo.id,
				league_id: Number(window.location.pathname.split('/')[2]),
				league_layout_id:
					stage2Extra === null ? '' : stage2Extra[0].league_layout_id,
				layout_type: 1,
				participants:
					insertLeagueInfo.league_type === 0
						? user.length
						: leagueTeamList.length,
				updating_round: [isRound],
				layout: viewTypeNumMain === 1 ? userInfo : userInfoExtra,
				// league_layout_id: layout === null ? '' : layout[0].league_layout_id,
			};

			axios.post(`${url.file}/LeagueLayoutNextRound`, data).then(res => {
				setUserInfoExtra(res.data.Info && res.data.Info.league_layout);

				try {
					const data = {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_layout_id:
							stage2Extra === null ? '' : stage2Extra[0].league_layout_id,
						league_id: Number(window.location.pathname.split('/')[2]),
						score_update: true,
						layout_type: 1,
						layout_values: res.data.Info && res.data.Info.league_layout,
						layout_group_participants:
							stage2 === null
								? ''
								: JSON.parse(stage2Extra[0].layout_group_participants),
						// '[토너먼트의 경우에만 해당 레이아웃이 몇 조의 레이아웃인지]',
						layout_group:
							stage2Extra === null ? '' : stage2Extra[0].layout_group,
					};

					axios.post(`${url.file}/LeagueLayoutUpdate`, data).then(res => {
						if (res.status === 200) {
							setApplyState(true);
							setTimeout(() => {
								setApplyState(false);
							}, 1000);
						}
					});
				} catch (e) {
					console.error(e);
				}
			});
		} catch (e) {
			console.error(e);
		}
	};

	const [selectTeamList, setSelectTeamList] = useState([]);
	const [teamId, setTeamId] = useState('');
	const selectTeam = e => {
		setTeamId(e.nickname);
		// setViewTeamList(!viewTeamList);
		try {
			axios
				.post(`${url.file}/LeagueTeamMember`, {
					dev: '/LeagueTeamMember',
					league_id: Number(window.location.pathname.split('/')[2]),
					team_name: e.nickname,
					// team_id: 17,
				})
				.then(res => {
					if (res.data.Info !== undefined) {
						if (teamId !== e.nickname) {
							setSelectTeamList(
								res.data.Info.team_member.map(item => {
									return { name: item };
								}),
							);
						} else {
							setSelectTeamList([]);
							setTeamId('');
						}
					}
				});
		} catch (e) {
			console.error(e);
		}
	};

	const isLayouyDelete = () => {
		swal({
			text: '삭제하시겠습니까?',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then(willDelete => {
			if (willDelete) {
				swal('삭제되었습니다.', {
					icon: 'success',
				});
				try {
					axios
						.post(`${url.file}/LeagueLayoutDelete`, {
							id: getUserInfo === null ? '' : getUserInfo.id,
							league_id: window.location.pathname.split('/')[2],
							stage: 2,
							extra_stage:
								stage2Extra === null ? null : stage2Extra[0].extra_stage,
						})
						.then(res => {
							setFlag(!flag);
						});
				} catch (e) {
					console.error(e);
				}
			}
		});
	};

	user &&
		user.sort(function(a, b) {
			return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
		});

	return (
		<div>
			{stage2 === null ? (
				''
			) : stage2.length === 0 ? (
				''
			) : (
				<section className="LeagueTournament--view">
					<div className={option ? 'option--box colorBlue' : 'option--box '}>
						<img
							type="button"
							className="menuBar"
							src={MenuBar}
							onClick={() => {
								setOption(!option);
								openLeaderBoardMain();
							}}
						/>
					</div>
					{option && (
						<div className="inner__option">
							<div
								className="background"
								onClick={() => {
									setOption(!option);
									resetEntrant();
								}}
							/>
							<div className="category">
								<div className="ranking">순위</div>
								<div className="nickname">팀명/닉네임</div>
								<div className="count">점수</div>
							</div>
							{viewTypeNumMain === 1 ? (
								<>
									{(stage2 === null ? (
										''
									) : (
										JSON.parse(stage2[0].layout_group_participants)
											.group_num === ''
									)) ? (
										<>
											{(insertLeagueInfo.league_type === 1
												? rankingMain
												: leagueTeamList === undefined
												? rankingMain
												: rankingMain
											).map((item, idx) => {
												return (
													<div className="category value" key={idx}>
														<div className="ranking">{idx + 1}</div>
														<div className="nickname">{item.nickname}</div>
														<div className="count">{item.total_score}</div>
													</div>
												);
											})}
										</>
									) : (
										<>
											{(insertLeagueInfo.league_type === 1
												? rankingMain
												: leagueTeamList === undefined
												? rankingMain
												: rankingMain
											).map((item, idx) => {
												return (
													<div className="category value" key={idx}>
														<div className="ranking">{idx + 1}</div>
														<div className="nickname">{item.nickname}</div>
														<div className="count">{item.total_score}</div>
													</div>
												);
											})}
										</>
									)}
								</>
							) : (
								<>
									{(stage2Extra === null ? (
										''
									) : (
										JSON.parse(stage2Extra[0].layout_group_participants)
											.group_num === ''
									)) ? (
										<>
											{rankingMainExtra.map((item, idx) => {
												return (
													<div className="category value" key={idx}>
														<div className="ranking">{idx + 1}</div>
														<div className="nickname">{item.nickname}</div>
														<div className="count">{item.total_score}</div>
													</div>
												);
											})}
										</>
									) : (
										<>
											{rankingMainExtra.map((item, idx) => {
												return (
													<div className="category value" key={idx}>
														<div className="ranking">{idx + 1}</div>
														<div className="nickname">{item.nickname}</div>
														<div className="count">{item.total_score}</div>
													</div>
												);
											})}
										</>
									)}
								</>
							)}
						</div>
					)}
					<div className="view--container">
						<article className="tournament__view--box">
							<header className="header">
								<Select
									className="select-form"
									defaultValue={leagueViewTypeMain[0]}
									onChange={e => addCategory(e)}
									options={leagueViewTypeMain}
								/>
								<button
									className="winner__btn"
									onClick={() => {
										winnerTable.length !== 0
											? alert('우승자가 결정되었습니다.')
											: setModalWinner(!modalWinner);
									}}
								>
									우승자 결정
								</button>
							</header>
							<div className="tournament--wrapper">
								{leagueType === 2 && (
									<div className="Deathmatch">
										<div className="round--box">
											<div
												className="inner--box"
												style={{ width: `${roundLength}px` }}
											>
												{getRound.map((item, idx) => {
													return (
														<div
															className={
																item.round === selectRound
																	? 'round roundSelect'
																	: 'round'
															}
															key={idx}
															type="button"
															onClick={() => {
																isDethmatchRound(item);
															}}
														>
															Round {item.round}
														</div>
													);
												})}
											</div>
										</div>

										<div className="Deathmatch--board">
											<div
												className={
													(stage2 === null
													? ''
													: JSON.parse(
															stage2[0] && stage2[0].layout_group_participants,
													  ) === '')
														? 'battle--box'
														: 'battle--box width100'
												}
											>
												{(stage2 === null ? (
													''
												) : (
													JSON.parse(stage2[0].layout_group_participants)
														.group_num === ''
												)) ? (
													<>
														{stage2 === null
															? ''
															: stage2.map(data => {
																	const info = JSON.parse(data.layout_values);
																	return (
																		<>
																			{data.round_order === selectRound &&
																			data.layout_type === 2 ? (
																				<>
																					{info.map((item, idx) => {
																						return (
																							<div
																								className="user--box"
																								key={idx}
																							>
																								<div className="img--box">
																									<img
																										className="upload"
																										type="button"
																										src={uploadImg}
																										onClick={() => {
																											setLeagueInfoUpload(data);
																											setSelectInfo(item);
																											setUpload(!upload);
																										}}
																									/>
																									{item.imgFile ? (
																										<img
																											type="button"
																											className="photo"
																											src={photo}
																											onClick={() => {
																												setCertification(
																													!certification,
																												);
																												setSelectInfo(item);
																											}}
																										/>
																									) : (
																										''
																									)}
																								</div>
																								<div className="box2">
																									<div
																										type="button"
																										onClick={() => {
																											selectTeam(item);
																										}}
																									>
																										{item && item.nickname}
																									</div>
																									<div className="score--box">
																										<img
																											className="left"
																											src={addBtn}
																											type="button"
																											onClick={() => {
																												isCountMain(
																													-1,
																													item,
																													data,
																												);
																												setLeagueInfoUpload(
																													data,
																												);
																											}}
																										/>
																										<span className="team-score">
																											{item.score}
																										</span>
																										<img
																											src={addBtn}
																											type="button"
																											onClick={() => {
																												isCountMain(
																													+1,
																													item,
																													data,
																												);
																												setLeagueInfoUpload(
																													data,
																												);
																											}}
																										/>
																									</div>
																								</div>
																								{selectTeamList.length !== 0 &&
																									item.nickname === teamId && (
																										<div className="team--box">
																											{selectTeamList.map(
																												(item, idx) => {
																													return (
																														<div>
																															{item.name}
																														</div>
																													);
																												},
																											)}
																										</div>
																									)}
																							</div>
																						);
																					})}
																				</>
																			) : (
																				<>
																					<div className="display" />
																				</>
																			)}
																		</>
																	);
															  })}
													</>
												) : (
													<>
														{stage2 === null
															? ''
															: stage2.map(data => {
																	const info = JSON.parse(data.layout_values);
																	return (
																		<>
																			{data.round_order === selectRound &&
																			data.layout_type === 2 ? (
																				<>
																					{info.map((item, idx) => {
																						return (
																							<div className="group" key={idx}>
																								<div className="groupName">
																									본선 {idx + 1} 조
																								</div>
																								{item.group.map(
																									(item2, idx2) => {
																										return (
																											<div
																												className="user--box"
																												key={idx2}
																											>
																												<div className="img--box">
																													<img
																														type="button"
																														src={uploadImg}
																														onClick={() => {
																															setLeagueInfoUpload(
																																data,
																															);
																															setSelectInfo(
																																item2.group,
																															);
																															setUpload(
																																!upload,
																															);
																														}}
																													/>
																													{item2.group
																														.imgFile ? (
																														<img
																															type="button"
																															className="photo"
																															src={photo}
																															onClick={() => {
																																setCertification(
																																	!certification,
																																);
																																setSelectInfo(
																																	item2,
																																);
																															}}
																														/>
																													) : (
																														''
																													)}
																												</div>
																												<div className="box2">
																													<div
																														type="button"
																														onClick={() => {
																															selectTeam(
																																item2.group,
																															);
																														}}
																													>
																														{item2.group &&
																															item2.group
																																.nickname}
																													</div>
																													<div className="score--box">
																														<img
																															className="left"
																															src={addBtn}
																															type="button"
																															onClick={() => {
																																isCountMain(
																																	-1,
																																	item2.group,
																																	data,
																																);
																																setLeagueInfoUpload(
																																	data,
																																);
																															}}
																														/>

																														<span className="team-score">
																															{
																																item2.group
																																	.score
																															}
																														</span>

																														<img
																															src={addBtn}
																															type="button"
																															onClick={() => {
																																isCountMain(
																																	+1,
																																	item2.group,
																																	data,
																																);
																																setLeagueInfoUpload(
																																	data,
																																);
																															}}
																														/>
																													</div>
																												</div>
																												{selectTeamList.length !==
																													0 &&
																													item2.group
																														.nickname ===
																														teamId && (
																														<div className="team--box">
																															{selectTeamList.map(
																																(item, idx) => {
																																	return (
																																		<div>
																																			{
																																				item.name
																																			}
																																		</div>
																																	);
																																},
																															)}
																														</div>
																													)}
																											</div>
																										);
																									},
																								)}
																							</div>
																						);
																					})}
																				</>
																			) : (
																				<>
																					<div className="display" />
																				</>
																			)}
																		</>
																	);
															  })}
													</>
												)}

												{/*********************** 이건 인서트 되기전 view ***********************/}
												{/*********************** 이건 인서트 되기전 view ***********************/}
												{/*********************** 이건 인서트 되기전 view ***********************/}
												{/*********************** 이건 인서트 되기전 view ***********************/}
												{/*********************** 이건 인서트 되기전 view ***********************/}

												{viewTypeNumMain === 1 ? (
													// 추가 경기 X
													<>
														{selectRound ===
														(stage2 === null ? '' : stage2.length) ? (
															<>
																{(stage2 === null ? (
																	''
																) : (
																	JSON.parse(
																		stage2[0].layout_group_participants,
																	).group_num === ''
																)) ? (
																	<>
																		{/***************** 조가 아닌 경우 *****************/}
																		{(insertLeagueInfo.league_type === 1
																			? totalRound1 === undefined
																				? leagueTeamList
																				: winnerList
																			: totalRound1 === undefined
																			? user && user
																			: winnerList
																		).map((item, idx) => {
																			return (
																				<div className="user--box" key={idx}>
																					<div className="img--box"></div>
																					<div className="box2">
																						<div
																							type="button"
																							onClick={() => {
																								selectTeam(item);
																							}}
																						>
																							{item && item.nickname}
																						</div>
																						<div className="score--box">
																							<img
																								className="left"
																								src={addBtn}
																								type="button"
																								onClick={() => {
																									isCountMain(
																										-1,
																										item,
																										stage2 === null
																											? ''
																											: stage2[0],
																									);
																								}}
																							/>

																							<span className="team-score">
																								{item.score}
																							</span>

																							<img
																								src={addBtn}
																								type="button"
																								onClick={() => {
																									isCountMain(
																										+1,
																										item,
																										stage2 === null
																											? ''
																											: stage2[0],
																									);
																								}}
																							/>
																						</div>
																					</div>
																					{selectTeamList.length !== 0 &&
																						item.nickname === teamId && (
																							<div className="team--box">
																								{selectTeamList.map(
																									(item, idx) => {
																										return (
																											<div>{item.name}</div>
																										);
																									},
																								)}
																							</div>
																						)}
																				</div>
																			);
																		})}
																	</>
																) : (
																	<>
																		{/***************** 조 *****************/}
																		{(totalRound1 === undefined
																			? insertLeagueInfo.league_type === 1
																				? onlyMainTeam
																				: onlyMain
																			: winnerMain
																		).map((item, idx) => {
																			return (
																				<div className="group" key={idx}>
																					<div className="groupName">
																						본선 {idx + 1} 조
																					</div>
																					{item.group.map((item2, idx2) => {
																						return (
																							<div
																								className="user--box"
																								key={idx2}
																							>
																								<div className="img--box">
																									{item2.group &&
																									item2.group.imgFile ? (
																										<img
																											type="button"
																											className="photo"
																											src={photo}
																											onClick={() => {
																												setCertification(
																													!certification,
																												);
																												setSelectInfo(
																													item2.group,
																												);
																											}}
																										/>
																									) : (
																										''
																									)}
																								</div>
																								<div className="box2">
																									<div
																										type="button"
																										onClick={() => {
																											selectTeam(item2.group);
																										}}
																									>
																										{item2.group &&
																											item2.group.nickname}
																									</div>
																									<div className="score--box">
																										<img
																											className="left"
																											src={addBtn}
																											type="button"
																											onClick={() => {
																												isCountMain(
																													-1,
																													item2.group,
																													stage2 === null
																														? ''
																														: stage2[0],
																												);
																											}}
																										/>

																										<span className="team-score">
																											{item2.group &&
																												item2.group.score}
																										</span>

																										<img
																											src={addBtn}
																											type="button"
																											onClick={() => {
																												isCountMain(
																													+1,
																													item2.group,
																													stage2 === null
																														? ''
																														: stage2[0],
																												);
																											}}
																										/>
																									</div>
																								</div>
																								{selectTeamList.length !== 0 &&
																									item2.group.nickname ===
																										teamId && (
																										<div className="team--box">
																											{selectTeamList.map(
																												(item, idx) => {
																													return (
																														<div>
																															{item.name}
																														</div>
																													);
																												},
																											)}
																										</div>
																									)}
																							</div>
																						);
																					})}
																				</div>
																			);
																		})}
																	</>
																)}
															</>
														) : (
															<>
																<div className="display" />
															</>
														)}
													</>
												) : (
													//*********************************************//
													//********** 추가 경기 라운드 업데이트 전 ************//
													//*********************************************//
													<>
														{selectRound ===
														(stage2 === null ? '' : stage2.length) ? (
															<>
																{(stage2 === null ? (
																	''
																) : (
																	JSON.parse(
																		stage2[0].layout_group_participants,
																	).group_num === ''
																)) ? (
																	// 조가 아닌경우
																	<>
																		{(totalRound1Extra === undefined
																			? extraUserMain
																			: extraUserMain
																		).map((item, idx) => {
																			return (
																				<div className="user--box" key={idx}>
																					<div className="img--box"></div>
																					<div className="box2">
																						<div
																							type="button"
																							onClick={() => {
																								selectTeam(item);
																							}}
																						>
																							{item && item.nickname}
																						</div>
																						<div className="score--box">
																							<img
																								className="left"
																								src={addBtn}
																								type="button"
																								onClick={() => {
																									isCountMain(
																										-1,
																										item,
																										stage2 === null
																											? ''
																											: stage2[0],
																									);
																								}}
																							/>

																							<span className="team-score">
																								{item.score}
																							</span>

																							<img
																								src={addBtn}
																								type="button"
																								onClick={() => {
																									isCountMain(
																										+1,
																										item,
																										stage2 === null
																											? ''
																											: stage2[0],
																									);
																								}}
																							/>
																						</div>
																					</div>
																					{selectTeamList.length !== 0 &&
																						item.nickname === teamId && (
																							<div className="team--box">
																								{selectTeamList.map(
																									(item, idx) => {
																										return (
																											<div>{item.name}</div>
																										);
																									},
																								)}
																							</div>
																						)}
																				</div>
																			);
																		})}
																	</>
																) : (
																	<>
																		{(totalRound1Extra === undefined
																			? //본선만 있는 경우
																			  extraUserMainGroup
																			: // 본선 예선 둘다 있는 경우
																			  extraUserMainGroup
																		).map((item, idx) => {
																			return (
																				<div className="group" key={idx}>
																					<div className="groupName">
																						본선 {idx + 1} 조
																					</div>
																					{item.group.map((item2, idx2) => {
																						return (
																							<div
																								className="user--box"
																								key={idx2}
																							>
																								<div className="img--box">
																									{item2.group &&
																									item2.group.imgFile ? (
																										<img
																											type="button"
																											className="photo"
																											src={photo}
																											onClick={() => {
																												setCertification(
																													!certification,
																												);
																												setSelectInfo(
																													item2.group,
																												);
																											}}
																										/>
																									) : (
																										''
																									)}
																								</div>
																								<div className="box2">
																									<div
																										type="button"
																										onClick={() => {
																											selectTeam(item2.group);
																										}}
																									>
																										{item2.group &&
																											item2.group.nickname}
																									</div>
																									<div className="score--box">
																										<img
																											className="left"
																											src={addBtn}
																											type="button"
																											onClick={() => {
																												isCountMain(
																													-1,
																													item2.group,
																													stage2 === null
																														? ''
																														: stage2[0],
																												);
																											}}
																										/>

																										<span className="team-score">
																											{item2.group &&
																												item2.group.score}
																										</span>

																										<img
																											src={addBtn}
																											type="button"
																											onClick={() => {
																												isCountMain(
																													+1,
																													item2.group,
																													stage2 === null
																														? ''
																														: stage2[0],
																												);
																											}}
																										/>
																									</div>
																								</div>
																								{selectTeamList.length !== 0 &&
																									item2.group.nickname ===
																										teamId && (
																										<div className="team--box">
																											{selectTeamList.map(
																												(item, idx) => {
																													return (
																														<div>
																															{item.name}
																														</div>
																													);
																												},
																											)}
																										</div>
																									)}
																							</div>
																						);
																					})}
																				</div>
																			);
																		})}
																	</>
																)}
															</>
														) : (
															<>
																<div className="display" />
															</>
														)}
													</>
												)}
											</div>
										</div>
									</div>
								)}

								{(stage2 === null ? '' : stage2[0].layout_values) ===
									`"[]"` && (
									<TournamentMain
										stage1={stage1}
										stage2={stage2}
										matcheData={matcheData}
										setMatchData={setMatchData}
										leagueType={leagueType}
										getTeamRoud={getTeamRoud}
										flag={flag}
										setFlag={setFlag}
										getuserInfo={getuserInfo}
										viewTypeNumMain={viewTypeNumMain}
										stage2Extra={stage2Extra}
										userInfo={userInfo}
										setUserInfo={setUserInfo}
										userInfoExtra={userInfoExtra}
										setUserInfoExtra={setUserInfoExtra}
										insertLeagueInfo={insertLeagueInfo}
									/>
								)}
								{stage2[0].layout_values.substring(0, 4) === `[{"m` && (
									<TournamentMain
										stage1={stage1}
										stage2={stage2}
										matcheData={matcheData}
										setMatchData={setMatchData}
										leagueType={leagueType}
										getTeamRoud={getTeamRoud}
										flag={flag}
										setFlag={setFlag}
										getuserInfo={getuserInfo}
										viewTypeNumMain={viewTypeNumMain}
										stage2Extra={stage2Extra}
										userInfo={userInfo}
										setUserInfo={setUserInfo}
										userInfoExtra={userInfoExtra}
										setUserInfoExtra={setUserInfoExtra}
										insertLeagueInfo={insertLeagueInfo}
									/>
								)}
							</div>
							<div className="btn--box">
								<button
									className="tournament__btn"
									onClick={() => {
										isLayouyDelete();
									}}
								>
									배치도 삭제
								</button>
								<button
									className="tournament__btn"
									onClick={() => {
										setExtraModalMain(!extraModalMain);
									}}
								>
									추가 대진표
								</button>
								{viewTypeNumMain === 1 ? (
									<button
										className="tournament__btn"
										onClick={
											leagueType === 1
												? userInfo === '[]'
													? apply
													: applyAfter
												: deathmatchInsert
										}
									>
										적용
									</button>
								) : (
									<button
										className="tournament__btn"
										onClick={
											stage2Extra[0].layout_values.substring(0, 4) === `[{"m`
												? applyAfterExtra
												: isExtraUpdate
										}
									>
										적용
									</button>
								)}
							</div>
						</article>
					</div>
				</section>
			)}
		</div>
	);
};
export default DeathmatchMain;
