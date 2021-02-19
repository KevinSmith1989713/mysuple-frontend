import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import TournamentMain from '../../../container/League/TournamentMain/TournamentMain';
import Button from '../../../components/Button/Button';
import imageCompression from 'browser-image-compression';

import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import MenuBar from '../../../static/images/MobileMenu/menuBar.svg';
import addBtn from '../../../static/images/addBtn.svg';

import photo from '../../../static/images/photo.svg';
import uploadImg from '../../../static/images/upload.svg';

import { makeGroup } from '../../../Utils/func';

import './LeagueLayout.scss';

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

const LeagueLayout = ({
	insertLeagueInfo,
	leagueTeamListRedux,
	participantsList,
	getLeagueTeamList,
}) => {
	const [modal, setModal] = useState(false);

	const [semifinal, setSemifinal] = useState(false);

	const [flag, setFlag] = useState(false);
	const [matcheData, setMatchData] = useState([]);

	const [toRoung, setToRound] = useState(0);

	const [imgFile, setImgFile] = useState('');

	const [stage1, setStage1] = useState(null);

	const [leagueTeamList, setLeagueTeamList] = useState([]);

	//본선
	const [stage2, setStage2] = useState(null);
	const [totalRound, setTotalRound] = useState(0);
	const [rule, setRule] = useState('');
	const [leagueType, setLeagueType] = useState(2);
	const [groupNumber, setGroupNumber] = useState(null);
	const [groupInfo, setGroupInfo] = useState(null);
	const [selectRound, setSelectRound] = useState(1);

	const [groupUser, setGroupUser] = useState([]);
	const [user, setUser] = useState([]);
	// const [participantsList, setParticipantsList] = useState([]);
	const [isRound, setIsRound] = useState(0);
	const [groupParticipants, setGroupParticipants] = useState([]);
	const [leagueInfoUpload, setLeagueInfoUpload] = useState(null);
	const [updateImgMain, setUpdateImgMain] = useState([]);
	const [groupUpdateImgMain, setGroupUpdateImgMain] = useState([]);

	//증빙 자료
	const [file, setFile] = useState(null);
	const [upload, setUpload] = useState(false);
	const [selectInfo, setSelectInfo] = useState({});
	const [certification, setCertification] = useState(false);

	useEffect(() => {}, [flag]);

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
	}, [selectRound]);

	useEffect(() => {
		getLeagueTeamList(null, window.location.pathname.split('/')[2], true);
		try {
			axios
				.post(`${url.file}/LeagueLayoutSelect`, {
					league_id: window.location.pathname.split('/')[2],
				})
				.then(res => {
					const resultStage2 = res.data.Info.stage2[0];
					resultStage2 === undefined
						? ''
						: JSON.parse(resultStage2 && resultStage2.layout_group_participants)
								.group_num === ''
						? setUser(JSON.parse(resultStage2 && resultStage2.layout_values))
						: setUser(JSON.parse(resultStage2 && resultStage2.layout_values));
					res.data.Info.stage1.length === 0
						? ''
						: setStage2(res.data.Info.stage2);

					setTotalRound(resultStage2 && resultStage2.round_number);
					setRule(resultStage2 && resultStage2.win_rule);
					setLeagueType(resultStage2 && resultStage2.layout_type);
					setGroupParticipants(
						resultStage2 && resultStage2.layout_group_participants,
					);

					resultStage2 === undefined ? '' : setStage2(res.data.Info.stage2);

					setStage1(res.data.Info.stage1);
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
				});
		} catch (e) {
			console.error(e);
		}
	}, [flag, modal]);

	const [pageUser, setPageUser] = useState([]);
	// 승자 리스트
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

		axios
			.post(`${url.file}/LeagueAdminParticipants`, {
				id: getUserInfo === null ? '' : getUserInfo.id,
				league_id: window.location.pathname.split('/')[2],
				mode: 'confirmed',
			})
			.then(res => {
				const data = res.data.Info && res.data.Info.confirmed;

				const result =
					data &&
					data.map(item => {
						return { nickname: item.nickname, score: 0 };
					});

				setPageUser(result);
			});
	}, []);
	// console.log(pageUser);

	// 토너먼트 그리기
	useEffect(() => {
		try {
			axios
				.post(`${url.file}/LeagueLayoutDraw`, {
					participants:
						insertLeagueInfo.league_type === 1
							? leagueTeamListRedux.teams.length
							: participantsList.length,
					layout_type: 1,
				})
				.then(res => {
					setToRound(res.data.Info.league_layout.length);
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
				});
		} catch (e) {
			console.error(e);
		}
	}, [leagueType]);

	const getRound = [];
	const round_number =
		stage2 === null ? '' : stage2[0] && stage2[0].round_number;
	for (let i = 1; i <= round_number; i++) {
		getRound.push({ round: i });
	}
	const roundLength = getRound.length * 172;

	const getTeamRoud = e => {
		setIsRound(e);
	};

	useEffect(() => {
		const teamList = [];
		const result = (user === '[]' ? [] : user).map(item => {
			// 팀전인 경우
			const itemToFind = teamList.find(function(team) {
				return team.group === item.group;
			});
			const idx = teamList.indexOf(itemToFind);
			idx === -1
				? teamList.push({
						nickname: item.nickname,
						score: 0,
				  })
				: '';
			return { nickname: item.nickname, score: 0 };
		});

		setUser(result);
		setGroupUser(makeGroup(user, groupNumber));
	}, [selectRound, groupNumber]);
	const isDethmatchRound = round => {
		setSelectRound(round.round);
	};

	// 이미지 업데이트
	useEffect(() => {
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
				layout_values: (groupInfo === null
				? ''
				: groupInfo.group_num === '')
					? updateImgMain
					: groupUpdateImgMain,
			})
			.then(res => {
				setFlag(!flag);
			});
	}, [updateImgMain, groupUpdateImgMain]);

	// 조가 아닌 겨우 이미지 업데이트
	const isUploadMain = () => {
		// 본선
		stage2 === null
			? ''
			: stage2.map(item1 => {
					const valueArray = [];
					const value = JSON.parse(item1.layout_values);
					if (item1.round_order === selectRound) {
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
						setUpdateImgMain(valueArray);
					}
					return;
			  });
	};

	// 조 이미지 업데이트
	const isUploadGroupMain = () => {
		stage2 === null
			? ''
			: stage2.map(item => {
					const valueGroupArray = [];
					const value = JSON.parse(item.layout_values);

					for (let i = 0; i < value.length; i++) {
						let obj = {};
						let group = [];
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
					bucket_name: 'pass_auth_suple',
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
	// console.log(insertLeagueInfo.league_type === 0);
	const Info =
		stage2 === null ? '' : JSON.parse(stage2[0] && stage2[0].layout_values);
	const [userInfo, setUserInfo] = useState(Info);

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
	//

	return (
		<main className="LeagueLayout">
			{stage2 === null ? (
				// (
				// 	''
				// ) : stage2.length === 1 || stage2.length === 0
				// ?
				<dl className="LeagueTournament--emptied">
					<dd className="emptiedText">대진표가 아직 작성되지 않았습니다.</dd>
				</dl>
			) : (
				<>
					<section className="LeagueLayout--view">
						<div className="view--container">
							<article className="tournament__view--box">
								<header className="header">
									<div>{insertLeagueInfo.league_title}</div>
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
																stage2[0].layout_group_participants,
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
																		// console.log(stage2.length>1);
																		return (
																			<>
																				{data.round_order ===
																					(stage2 === null
																						? ''
																						: stage2.length === 1
																						? 0
																						: selectRound) &&
																				data.layout_type === 2 ? (
																					<>
																						{/************* 조가 아닌 경우  *************/}
																						{info.map((item, idx) => {
																							return (
																								<div
																									className="user--box"
																									key={idx}
																								>
																									<div className="img--box">
																										{insertLeagueInfo.league_type ===
																										1 ? (
																											<>
																												<img
																													className="upload"
																													type="button"
																													src={uploadImg}
																													onClick={() => {
																														setLeagueInfoUpload(
																															data,
																														);
																														setSelectInfo(item);

																														setUpload(!upload);
																													}}
																												/>
																											</>
																										) : (
																											<>
																												{(getUserInfo &&
																													getUserInfo.nickName) ===
																													item.nickname && (
																													<img
																														className="upload"
																														type="button"
																														src={uploadImg}
																														onClick={() => {
																															setLeagueInfoUpload(
																																data,
																															);
																															setSelectInfo(
																																item,
																															);

																															setUpload(
																																!upload,
																															);
																														}}
																													/>
																												)}
																											</>
																										)}

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
																											<span className="team-score">
																												{item.score}
																											</span>
																										</div>
																									</div>
																									{selectTeamList.length !==
																										0 &&
																										item.nickname ===
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
																				{/************* 조 *************/}
																				{data.round_order ===
																					(stage2 === null
																						? ''
																						: stage2.length === 1
																						? 0
																						: selectRound) &&
																				data.layout_type === 2 ? (
																					<>
																						{info.map((item, idx) => {
																							return (
																								<div
																									className="group"
																									key={idx}
																								>
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
																														{insertLeagueInfo.league_type ===
																														1 ? (
																															<>
																																<img
																																	className="upload"
																																	type="button"
																																	src={
																																		uploadImg
																																	}
																																	onClick={() => {
																																		setLeagueInfoUpload(
																																			data,
																																		);
																																		setSelectInfo(
																																			item,
																																		);

																																		setUpload(
																																			!upload,
																																		);
																																	}}
																																/>
																															</>
																														) : (
																															<>
																																{(getUserInfo &&
																																	getUserInfo.nickName) ===
																																	item.nickname && (
																																	<img
																																		className="upload"
																																		type="button"
																																		src={
																																			uploadImg
																																		}
																																		onClick={() => {
																																			setLeagueInfoUpload(
																																				data,
																																			);
																																			setSelectInfo(
																																				item,
																																			);

																																			setUpload(
																																				!upload,
																																			);
																																		}}
																																	/>
																																)}
																															</>
																														)}
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
																															<span className="team-score">
																																{
																																	item2.group
																																		.score
																																}
																															</span>
																														</div>
																													</div>
																													{selectTeamList.length !==
																														0 &&
																														item2.group
																															.nickname ===
																															teamId && (
																															<div className="team--box">
																																{selectTeamList.map(
																																	(
																																		item,
																																		idx,
																																	) => {
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
												</div>
											</div>
										</div>
									)}
									{(stage2 === null ? '' : stage2[0].layout_values) ===
										`"[]"` && (
										<TournamentMain
											stage1={stage1}
											stage2={stage2}
											Info={Info}
											matcheData={matcheData}
											setMatchData={setMatchData}
											participantsList={participantsList}
											getTeamRoud={getTeamRoud}
											leagueType={leagueType}
											stage1Extra={[]}
											viewTypeNumMain={1}
											flag={flag}
											setFlag={setFlag}
											setUserInfo={setUserInfo}
											insertLeagueInfo={insertLeagueInfo}
										/>
									)}
									{stage2[0].layout_values.substring(0, 4) === `[{"m` && (
										<TournamentMain
											stage1={stage1}
											stage2={stage2}
											Info={Info}
											matcheData={matcheData}
											setMatchData={setMatchData}
											participantsList={participantsList}
											getTeamRoud={getTeamRoud}
											leagueType={leagueType}
											stage1Extra={[]}
											viewTypeNumMain={1}
											flag={flag}
											setFlag={setFlag}
											setUserInfo={setUserInfo}
											insertLeagueInfo={insertLeagueInfo}
										/>
									)}
								</div>
							</article>
						</div>
						<div className="winnerBoad">
							<div className="user--box">
								<div className="category">
									<div className="button" />
									<div className="ranking">Rank</div>
									<div className="nickname">닉네임</div>
									<div className="count">획득패스</div>
								</div>
								{winnerTable.length === 0 ? (
									<div className="noOne">우승자가 결정되지 않았습니다.</div>
								) : (
									<>
										{winnerTable.map((item, idx) => {
											return (
												<div className="category winnerUser" key={idx}>
													<div className="button" />
													<div
														className={
															item.ranking === 1 ||
															item.ranking === 2 ||
															item.ranking === 3
																? 'ranking buleColor'
																: 'ranking'
														}
													>
														{idx + 1}
													</div>
													<div className="nickname">
														{insertLeagueInfo.league_type === 1
															? item.team_name
															: item.nickname}
													</div>
													<div className="count">{item.prize}</div>
												</div>
											);
										})}
									</>
								)}
							</div>
							<div className="gameInfo--box">
								<p>경기횟수 &nbsp;&nbsp;&nbsp; {totalRound}</p>
								<p>
									경기 종류 &nbsp;&nbsp;&nbsp;{' '}
									{leagueType === 2 ? '데스매치' : '토너먼트'}
								</p>
								<p>승리기준 &nbsp;&nbsp;&nbsp; {rule}</p>
							</div>
						</div>
					</section>
				</>
			)}

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
									className="img__input detailPage"
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
										accept="image/*"
										// accept=".jpeg, .jpg, .jpe, .jfif, .jif"
										onChange={e => onChangeFile(e)}
									/>
								</div>
							</div>
							<div className="text">jpg,png 파일 지원</div>
						</div>
						<Button
							className={
								imgFile === undefined ? 'modalBtn colorGray' : 'modalBtn'
							}
							size="medium"
							onClick={() => {
								if (imgFile === undefined) {
									('');
								} else {
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
						<img className="certification__img" src={selectInfo.imgFile} />
					</article>
				</div>
			) : (
				''
			)}
		</main>
	);
};

export default LeagueLayout;
