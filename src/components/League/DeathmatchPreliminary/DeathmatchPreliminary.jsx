import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import Tournament from '../../../container/League/Tournament/Tournament';
import { makeGroup } from '../../../Utils/func';

import MenuBar from '../../../static/images/MobileMenu/menuBar.svg';
import uploadImg from '../../../static/images/upload.svg';
import photo from '../../../static/images/photo.svg';
import addBtn from '../../../static/images/addBtn.svg';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const DeathmatchPreliminary = ({
	stage1,
	stage2,
	option1,
	insertLeagueInfo,
	leagueType1,
	matcheData,
	setMatchData,
	participantsList1,
	// getTeamRoud,
	user1,
	isCount,
	setLeagueInfoUpload,
	certification,
	setCertification,
	setSelectInfo,
	upload,
	setUpload,
	leagueInfoUpload,
	groupInfo1,
	updateScoreData,
	setApplyState,
	entrant,
	setOption1,
	openLeaderBoard,
	rankingPreliminary,
	selectRound1,
	setSelectRound1,
	totalRound1,
	groupParticipants1,
	rule1,
	flag,
	setFlag,
	groupUser1,
	groupNumber,
	groupNumber1,
	setGroupUser1,
	leagueViewType,
	viewTypeNum,
	setExtraModal,
	extraModal,
	extraUser,
	setViewTypeNum,
	stage1Extra,
	totalRound1Extra,
	groupParticipants1Extra,
	rankingPreliminaryExtra,
	resetEntrant,
	applyState,
	// isRound,
	leagueTeamList,
	resultList,
	groupUserPreliminaryTeam,
	setGroupUserPreliminaryTeam,
}) => {
	const Info =
		stage1.length > 0
			? stage1 === null
				? ''
				: JSON.parse(stage1[0] && stage1[0].layout_values)
			: '';
	const [userInfo, setUserInfo] = useState(Info);

	const InfoExtra =
		stage1Extra === null
			? ''
			: JSON.parse(stage1Extra[0] && stage1Extra[0].layout_values);
	const [userInfoExtra, setUserInfoExtra] = useState(InfoExtra);

	const [isRound, setIsRound] = useState(0);
	const getTeamRoud = e => {
		setIsRound(e);
	};

	const getRound1 = [];
	const round_number1 =
		stage1 === null ? '' : stage1[0] && stage1[0].round_number;
	for (let i = 1; i <= round_number1; i++) {
		getRound1.push({ round: i });
	}
	const roundLength1 = getRound1.length * 172;

	const deathmatchInsert = () => {
		const checkUpdate =
			stage1 === null
				? null
				: stage1.map(item => {
						return item.round_order;
				  });

		const valueRound =
			checkUpdate === null ? '' : checkUpdate.indexOf(selectRound1);

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
						stage: 1,
						round_number: totalRound1,
						round_order: selectRound1,
						win_rule: rule1,
						// layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values:
							insertLeagueInfo.league_type === 1
								? (stage1 === null
									? ''
									: JSON.parse(groupParticipants1).group_num === '')
									? leagueTeamList
									: groupUserPreliminaryTeam
								: (stage1 === null
									? ''
									: JSON.parse(groupParticipants1).group_num === '')
								? user1
								: groupUser1,

						layout_group_participants: JSON.parse(groupParticipants1),
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

	leagueTeamList &&
		leagueTeamList.sort(function(a, b) {
			return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
		});

	user1 &&
		user1.sort(function(a, b) {
			return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
		});

	const isExtraUpdate = () => {
		const checkUpdate =
			stage1Extra === null
				? null
				: stage1Extra.map(item => {
						return item.round_order;
				  });

		const valueRound =
			checkUpdate === null ? '' : checkUpdate.indexOf(selectRound1);
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
						stage: 1,
						round_number: totalRound1Extra,
						round_order: selectRound1,
						win_rule: rule1,
						extra_stage: insertLeagueInfo.league_title,
						// layout_rank_decision: semifinal === true ? 3 : 1,
						layout_values: extraUser,
						layout_group_participants: JSON.parse(groupParticipants1Extra),
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

	const entrantRandom =
		entrant &&
		entrant.sort(function(a, b) {
			return a.nickname < b.nickname ? -1 : a.nickname > b.nickname ? 1 : 0;
		});

	const isDethmatchRound1 = round => {
		setSelectRound1(round.round);
	};

	const entrantLength = entrant.length;

	const isEntrant = info => {
		const itemToFind = entrant.find(function(item) {
			return item.nickname === info.nickname;
		});

		const idx = entrant.indexOf(itemToFind);
		if (idx > -1) {
			entrant.splice(idx, 1);
		} else {
			entrant.push({
				nickname: info && info.nickname,
				score: 0,
				team_name: info.team_name,
			});
		}
		setFlag(!flag);
	};

	const [toEntrant, setToEntrant] = useState([]);

	useEffect(() => {
		if (
			(stage1 === null ? '' : stage1[0] && stage1[0].layout_values) ===
				`"[]"` ||
			(stage1 === null
				? ''
				: stage1[0] && stage1[0].layout_values.substring(0, 4) === `[{"m`)
		) {
			try {
				axios
					.post(`${url.file}/LeagueLayoutDraw`, {
						participants: entrantLength,
						layout_type: 1,
					})
					.then(res => {
						const arr = [];
						const isRound = res.data.Info.league_layout.reverse().map(item => {
							const result = item.round.map((item2, index) => {
								arr.push(index);
								return {
									round: item2.round,
									name:
										entrant[arr.length - 1] && entrant[arr.length - 1].nickname,
									id: arr.length,
									score:
										(entrant[arr.length - 1] &&
											entrant[arr.length - 1].nickname) === undefined
											? null
											: null,
									idx:
										(entrant[arr.length - 1] &&
											entrant[arr.length - 1].nickname) === undefined &&
										arr.length,
									team_id:
										insertLeagueInfo.league_type === 1 &&
										leagueTeamList[arr.length - 1] &&
										leagueTeamList[arr.length - 1].team,
								};
							});
							return { matches: resultList(result) };
						});
						const region = {
							rounds: isRound,
						};
						setToEntrant(region.rounds);
					});
			} catch (e) {
				console.error(e);
			}
		}
	}, [flag, entrant]);

	const goMain = () => {
		try {
			axios
				.post(`${url.file}/LeagueLayoutUpdate`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					league_id: window.location.pathname.split('/')[2],
					league_layout_id: stage2[0].league_layout_id,
					stage: stage2[0].stage,
					layout_type: stage2[0].layout_type,
					round_order: 0,
					round_number: stage2[0].round_number,
					layout_rank_decision: stage2[0].layout_rank_decision,
					layout_values:
						leagueType1 === 1
							? toEntrant
							: JSON.parse(stage2[0].layout_group_participants).group_num === ''
							? entrant
							: makeGroup(entrant, Number(groupNumber)),
					win_rule: stage2[0].win_rule,
					layout_group_participants: JSON.parse(
						stage2[0].layout_group_participants,
					),
					layout_group: entrantLength,
				})
				.then(res => {
					// setFlag(!flag);
					if (res.status === 200) {
						setOption1(!option1);
						resetEntrant();
						setApplyState(true);
						window.location.reload();
						setTimeout(() => {
							setApplyState(false);
						}, 1000);
					}
				});
		} catch (e) {
			console.error(e);
		}
	};

	const addCategory = e => {
		setViewTypeNum(e.value);
		setFlag(!flag);
		setSelectRound1(1);
	};

	// 토너먼트 업데이트 인서트 전
	const apply = () => {
		try {
			const data = {
				id: getUserInfo === null ? '' : getUserInfo.id,
				league_id: Number(window.location.pathname.split('/')[2]),
				league_layout_id: stage1 === null ? '' : stage1[0].league_layout_id,
				layout_type: 1,
				participants:
					insertLeagueInfo.league_type === 0
						? user1.length
						: leagueTeamList.length,
				updating_round: [isRound],
				layout: matcheData,
				// league_layout_id: layout === null ? '' : layout[0].league_layout_id,
			};

			axios.post(`${url.file}/LeagueLayoutNextRound`, data).then(res => {
				setFlag(!flag);
				setMatchData(res.data.Info && res.data.Info.league_layout);

				try {
					const data = {
						id: getUserInfo === null ? '' : getUserInfo.id,
						league_layout_id: stage1 === null ? '' : stage1[0].league_layout_id,
						league_id: Number(window.location.pathname.split('/')[2]),
						score_update: true,
						layout_type: 1,
						layout_values: res.data.Info && res.data.Info.league_layout,
						layout_group_participants:
							stage1 === null
								? ''
								: JSON.parse(stage1[0].layout_group_participants),
						// '[토너먼트의 경우에만 해당 레이아웃이 몇 조의 레이아웃인지]',
						layout_group: 2,
					};

					axios.post(`${url.file}/LeagueLayoutUpdate`, data).then(res => {
						setFlag(!flag);
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

	// 토너먼트 업데이트 인서트 후
	const applyAfter = () => {
		try {
			axios
				.post(`${url.file}/LeagueLayoutNextRound`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					league_id: Number(window.location.pathname.split('/')[2]),
					league_layout_id: stage1 === null ? '' : stage1[0].league_layout_id,
					layout_type: 1,
					participants:
					insertLeagueInfo.league_type === 0
						? user1.length
						: leagueTeamList.length,
					updating_round: [isRound],
					layout: userInfo,
					// league_layout_id: layout === null ? '' : layout[0].league_layout_id,
				})
				.then(res => {
					setFlag(!flag);
					setUserInfo(res.data.Info && res.data.Info.league_layout);

					try {
						axios
							.post(`${url.file}/LeagueLayoutUpdate`, {
								id: getUserInfo === null ? '' : getUserInfo.id,
								league_layout_id:
									stage1 === null ? '' : stage1[0].league_layout_id,
								league_id: Number(window.location.pathname.split('/')[2]),
								score_update: true,
								layout_type: 1,
								layout_values: res.data.Info && res.data.Info.league_layout,
								layout_group_participants:
									stage1 === null
										? ''
										: JSON.parse(stage1[0].layout_group_participants),
								// '[토너먼트의 경우에만 해당 레이아웃이 몇 조의 레이아웃인지]',
								layout_group: 2,
							})
							.then(res => {
								setFlag(!flag);
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
			axios
				.post(`${url.file}/LeagueLayoutNextRound`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
					league_id: Number(window.location.pathname.split('/')[2]),
					league_layout_id:
						stage1Extra === null ? '' : stage1Extra[0].league_layout_id,
					layout_type: 1,
					participants:
					insertLeagueInfo.league_type === 0
						? user1.length
						: leagueTeamList.length,
					updating_round: [isRound],
					layout: viewTypeNum === 1 ? userInfo : userInfoExtra,
					// league_layout_id: layout === null ? '' : layout[0].league_layout_id,
				})
				.then(res => {
					setFlag(!flag);
					setUserInfoExtra(res.data.Info && res.data.Info.league_layout);

					try {
						axios
							.post(`${url.file}/LeagueLayoutUpdate`, {
								id: getUserInfo === null ? '' : getUserInfo.id,
								league_layout_id:
									stage1Extra === null ? '' : stage1Extra[0].league_layout_id,
								league_id: Number(window.location.pathname.split('/')[2]),
								score_update: true,
								layout_type: 1,
								layout_values: res.data.Info && res.data.Info.league_layout,
								layout_group_participants:
									stage1Extra === null
										? ''
										: JSON.parse(stage1Extra[0].layout_group_participants),
								// '[토너먼트의 경우에만 해당 레이아웃이 몇 조의 레이아웃인지]',
								layout_group:
									stage1Extra === null ? '' : stage1Extra[0].layout_group,
							})
							.then(res => {
								setFlag(!flag);
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
							stage: 1,
							extra_stage:
								stage1Extra === null ? null : stage1Extra[0].extra_stage,
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

	return (
		<div>
			{stage1 === null ? (
				''
			) : stage1.length === 0 ? (
				''
			) : (
				<section className="LeagueTournament--view">
					<div className={option1 ? 'option--box colorBlue' : 'option--box '}>
						<img
							type="button"
							className="menuBar"
							src={MenuBar}
							onClick={() => {
								setOption1(!option1);
								openLeaderBoard();
							}}
						/>
					</div>
					{option1 && (
						<div className="inner__option">
							<div
								className="background"
								onClick={() => {
									setOption1(!option1);
									resetEntrant();
								}}
							/>
							<div className="category Preliminary">
								<div className="button" />
								<div className="ranking">순위</div>
								<div className="nickname">팀명/닉네임</div>
								<div className="count">점수</div>
							</div>

							{viewTypeNum === 1 ? (
								<>
									{(stage1 === null ? (
										''
									) : (
										JSON.parse(stage1[0].layout_group_participants)
											.group_num === ''
									)) ? (
										<>
											{(insertLeagueInfo.league_type === 1
												? rankingPreliminary
												: leagueTeamList === undefined
												? user1
												: rankingPreliminary
											).map((item, idx) => {
												return (
													<div className="category Preliminary value" key={idx}>
														<div className="button">
															<input
																className="checkBox"
																type="checkBox"
																onClick={() => isEntrant(item)}
															/>
														</div>
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
												? rankingPreliminary
												: leagueTeamList === undefined
												? user1
												: rankingPreliminary
											).map((item, idx) => {
												return (
													<div className="category Preliminary value" key={idx}>
														<div className="button">
															<input
																className="checkBox"
																type="checkBox"
																onClick={() => isEntrant(item)}
															/>
														</div>
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
									{(stage1 === null ? (
										''
									) : (
										JSON.parse(stage1[0].layout_group_participants)
											.group_num === ''
									)) ? (
										<>
											{rankingPreliminaryExtra.map((item, idx) => {
												return (
													<div className="category Preliminary value" key={idx}>
														<div className="button">
															<input
																className="checkBox"
																type="checkBox"
																onClick={() => isEntrant(item)}
															/>
														</div>
														<div className="ranking">{idx + 1}</div>
														<div className="nickname">{item.nickname}</div>
														<div className="count">{item.total_score}</div>
													</div>
												);
											})}
										</>
									) : (
										<>
											{rankingPreliminaryExtra.map((item, idx) => {
												return (
													<div className="category Preliminary value" key={idx}>
														<div className="button">
															<input
																className="checkBox"
																type="checkBox"
																onClick={() => isEntrant(item)}
															/>
														</div>
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

							<button className="preliminaryBtn" onClick={goMain}>
								{`본선 진출자 결정 ( ${entrantLength} )`}
							</button>
						</div>
					)}
					<div className="view--container">
						<article className="tournament__view--box">
							<header className="header">
								<Select
									className="select-form"
									defaultValue={leagueViewType[0]}
									onChange={e => addCategory(e)}
									options={leagueViewType}
								/>
								<button
									className="winner__btn Preliminary"
									onClick={() => {
										setOption1(!option1);
										openLeaderBoard();
									}}
								>
									본선 진출자 결정
								</button>
							</header>
							<div className="tournament--wrapper">
								{leagueType1 === 2 && (
									<div className="Deathmatch">
										<div className="round--box">
											<div
												className="inner--box"
												style={{ width: `${roundLength1}px` }}
											>
												{getRound1.map((item, idx) => {
													return (
														<div
															className={
																item.round === selectRound1
																	? 'round roundSelect'
																	: 'round'
															}
															key={idx}
															type="button"
															onClick={() => {
																isDethmatchRound1(item);
																setGroupUser1([]);
																setGroupUserPreliminaryTeam([]);
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
													(stage1 === null
													? ''
													: JSON.parse(
															stage1[0] && stage1[0].layout_group_participants,
													  ) === '')
														? 'battle--box'
														: 'battle--box width100'
												}
											>
												{(stage1 === null ? (
													''
												) : (
													JSON.parse(stage1[0].layout_group_participants)
														.group_num === ''
												)) ? (
													<>
														{stage1 === null
															? ''
															: stage1.map(data => {
																	const info = JSON.parse(data.layout_values);
																	return (
																		<>
																			{data.round_order === selectRound1 &&
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
																												isCount(-1, item, data);
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
																												isCount(+1, item, data);
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
														{stage1 === null
															? ''
															: stage1.map(data => {
																	const info = JSON.parse(data.layout_values);
																	return (
																		<>
																			{data.round_order === selectRound1 &&
																			data.layout_type === 2 ? (
																				<>
																					{info.map((item, idx) => {
																						return (
																							<div className="group" key={idx}>
																								<div className="groupName">
																									예선 {idx + 1} 조
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
																																isCount(
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
																																isCount(
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

												{viewTypeNum === 1 ? (
													// 추가경기가 아니다
													<>
														{selectRound1 ===
														(stage1 === null ? '' : stage1.length) ? (
															<>
																{(stage1 === null ? (
																	''
																) : (
																	JSON.parse(
																		stage1[0].layout_group_participants,
																	).group_num === ''
																)) ? (
																	<>
																		{(insertLeagueInfo.league_type === 1
																			? leagueTeamList === undefined
																				? []
																				: leagueTeamList
																			: user1 && user1
																		).map((item, idx) => {
																			return (
																				<div className="user--box" key={idx}>
																					<div className="img--box">
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
																									isCount(
																										-1,
																										item,
																										stage1 === null
																											? ''
																											: stage1[0],
																									);
																								}}
																							/>

																							<span className="team-score">
																								{item.score === undefined
																									? 0
																									: item.score}
																							</span>

																							<img
																								src={addBtn}
																								type="button"
																								onClick={() => {
																									isCount(
																										+1,
																										item,
																										stage1 === null
																											? ''
																											: stage1[0],
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
																		{(insertLeagueInfo.league_type === 1
																			? // 팀전
																			  groupUserPreliminaryTeam.length === 0
																				? // 조
																				  makeGroup(
																						leagueTeamList,
																						groupNumber1,
																				  )
																				: groupUserPreliminaryTeam
																			: // 개인전
																			groupUser1.length === 0
																			? // 조
																			  makeGroup(user1, groupNumber1)
																			: groupUser1
																		).map((item, idx) => {
																			return (
																				<div className="group" key={idx}>
																					<div className="groupName">
																						예선 {idx + 1} 조
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
																												isCount(
																													-1,
																													item2.group,
																													stage1 === null
																														? ''
																														: stage1[0],
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
																												isCount(
																													+1,
																													item2.group,
																													stage1 === null
																														? ''
																														: stage1[0],
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
														{selectRound1 ===
														(stage1 === null ? '' : stage1.length) ? (
															<>
																{(stage1 === null ? (
																	''
																) : (
																	JSON.parse(
																		stage1[0].layout_group_participants,
																	).group_num === ''
																)) ? (
																	// 조가 아닌경우
																	<>
																		{extraUser.map((item, idx) => {
																			return (
																				<div className="user--box" key={idx}>
																					<div className="img--box">
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
																									isCount(
																										-1,
																										item,
																										stage1 === null
																											? ''
																											: stage1[0],
																									);
																								}}
																							/>

																							<span className="team-score">
																								{item.score === undefined
																									? 0
																									: item.score}
																							</span>

																							<img
																								src={addBtn}
																								type="button"
																								onClick={() => {
																									isCount(
																										+1,
																										item,
																										stage1 === null
																											? ''
																											: stage1[0],
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
																		{extraUser.map((item, idx) => {
																			return (
																				<div className="group" key={idx}>
																					<div className="groupName">
																						예선 {idx + 1} 조
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
																											selectTeam(item.group);
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
																												isCount(
																													-1,
																													item2.group,
																													stage1 === null
																														? ''
																														: stage1[0],
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
																												isCount(
																													+1,
																													item2.group,
																													stage1 === null
																														? ''
																														: stage1[0],
																												);
																											}}
																										/>
																									</div>
																								</div>
																								{selectTeamList.length !== 0 &&
																									item.group.nickname ===
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

								{(stage1 === null ? '' : stage1[0].layout_values) ===
									`"[]"` && (
									<Tournament
										stage1={stage1}
										matcheData={matcheData}
										setMatchData={setMatchData}
										participantsList1={participantsList1}
										leagueType1={leagueType1}
										getTeamRoud={getTeamRoud}
										flag={flag}
										setFlag={setFlag}
										// getuserInfo={getuserInfo}
										viewTypeNum={viewTypeNum}
										stage1Extra={stage1Extra}
										userInfo={userInfo}
										setUserInfo={setUserInfo}
										userInfoExtra={userInfoExtra}
										setUserInfoExtra={setUserInfoExtra}
										insertLeagueInfo={insertLeagueInfo}
									/>
								)}
								{stage1 === null
									? ''
									: stage1[0].layout_values.substring(0, 4) === `[{"m` && (
											<Tournament
												stage1={stage1}
												matcheData={matcheData}
												setMatchData={setMatchData}
												participantsList1={participantsList1}
												leagueType1={leagueType1}
												getTeamRoud={getTeamRoud}
												flag={flag}
												setFlag={setFlag}
												// getuserInfo={getuserInfo}
												viewTypeNum={viewTypeNum}
												stage1Extra={stage1Extra}
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
										setExtraModal(!extraModal);
									}}
								>
									추가 대진표
								</button>
								{viewTypeNum === 1 ? (
									<button
										className="tournament__btn"
										onClick={
											leagueType1 === 1
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
											stage1Extra[0].layout_values.substring(0, 4) === `[{"m`
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
			<div className={`box__alert${applyState ? ' alert' : ''}`}>
				<strong>적용 되었습니다.</strong>
			</div>
		</div>
	);
};
export default DeathmatchPreliminary;
