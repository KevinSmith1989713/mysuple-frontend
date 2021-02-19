import React, { useState, useEffect } from 'react';

import Button from '../../../components/Button/Button';

import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';
import addBtn from '../../../static/images/addBtn.svg';
import photo from '../../../static/images/photo.svg';
import uploadImg from '../../../static/images/upload.svg';
import more from '../../../static/images/moreBtn.svg';
import closeBtnGray from '../../../static/images/closeBtnGray.svg';

import './Tournament.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const Tournament = ({
	stage1,
	matcheData,
	setMatchData,
	participantsList1,
	getTeamRoud,
	leagueType1,
	flag,
	setFlag,
	// getuserInfo,
	viewTypeNum,
	stage1Extra,
	userInfo,
	setUserInfo,
	userInfoExtra,
	setUserInfoExtra,
}) => {
	const [isRound, setIsRound] = useState(0);
	getTeamRoud(isRound);
	const [win, setWin] = useState(false);
	const [lost, setLost] = useState(false);
	const [update, setUpdate] = useState([]);
	const [upload, setUpload] = useState(false);
	const [file, setFile] = useState(null);
	const [imgFile, setImgFile] = useState('');
	const [selectInfo, setSelectInfo] = useState({});
	const [certification, setCertification] = useState(false);

	const onChangeFile = e => {
		e.preventDefault();
		let reader = new FileReader();
		let file1 = e.target.files[0];

		reader.onloadend = () => {
			setFile(file1);
		};
		reader.readAsDataURL(file1);
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

	const [selectTeamList, setSelectTeamList] = useState([]);

	const [teamId, setTeamId] = useState('');
	const [viewTeamList, setViewTeamList] = useState(false);
	const renderTeam = team => {
		const className = 'team';

		const isCount = action => {
			let select = [];
			setIsRound(team.round);
			let array = [];
			let newArray = [];
			let winner = [];
			for (let i = 0; i < matcheData.length; i++) {
				let obj = {};
				let matches = [];
				matcheData[i].matches.map((item2, idx) => {
					if (
						item2.team1.team === team.team &&
						item2.team1.round === team.round
					) {
						matches.push({
							...item2,
							team1: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								team_id: team.team,
							},
						});
					} else if (
						item2.team2.team === team.team &&
						item2.team2.round === team.round
					) {
						matches.push({
							...item2,
							team2: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								team_id: team.team,
							},
						});
					} else {
						matches.push(item2);
					}
				});

				obj.matches = matches;
				array.push(obj);
			}

			// *********** 매치 승점을 비교하여 배열에 담는 과정  ***********
			array.map(item => {
				item.matches.map(item => {
					item.team1.team === team.team && select.push(item);
					item.team2.team === team.team && select.push(item);
				});
			});

			for (let i = 0; i < matcheData.length; i++) {
				let obj = {};
				let matches = [];

				matcheData[i].matches.map(item2 => {
					if (
						item2.team1.team === team.team &&
						item2.team1.round === team.round
						// 	||
						// (select[0].team1.score > select[0].team2.score &&
						// 	item2.team1.team === team.team)
					) {
						matches.push({
							...item2,
							team1: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								imgFile: team.imgFile,
								team_id: team.team,
								// winner:
								// 	select[0].team1.score > select[0].team2.score
								// 		? 'winner'
								// 		: 'lost',
							},
						});
					} else if (
						item2.team2.team === team.team &&
						item2.team2.round === team.round
					) {
						matches.push({
							...item2,
							team2: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								imgFile: team.imgFile,
								team_id: team.team,
								// winner:
								// 	select[0].team1.score < select[0].team2.score
								// 		? 'winner'
								// 		: 'lost',
							},
						});
					} else {
						matches.push(item2);
					}
				});
				obj.matches = matches;
				newArray.push(obj);
			}
			setMatchData(newArray);
		};

		const isCountAfter = action => {
			let select = [];
			setIsRound(team.round);

			let array = [];
			let newArray = [];
			let winner = [];
			for (let i = 0; i < userInfo.length; i++) {
				let obj = {};
				let matches = [];
				userInfo[i].matches.map((item2, idx) => {
					if (
						item2.team1.team === team.team &&
						item2.team1.round === team.round
					) {
						matches.push({
							...item2,
							team1: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								team_id: team.team,
							},
						});
					} else if (
						item2.team2.team === team.team &&
						item2.team2.round === team.round
					) {
						matches.push({
							...item2,
							team2: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								team_id: team.team,
							},
						});
					} else {
						matches.push(item2);
					}
				});

				obj.matches = matches;
				array.push(obj);
			}

			// *********** 매치 승점을 비교하여 배열에 담는 과정  ***********
			array.map(item => {
				item.matches.map(item => {
					item.team1.team === team.team && select.push(item);
					item.team2.team === team.team && select.push(item);
				});
			});

			for (let i = 0; i < userInfo.length; i++) {
				let obj = {};
				let matches = [];

				userInfo[i].matches.map(item2 => {
					if (
						item2.team1.team === team.team &&
						item2.team1.round === team.round
						// 	||
						// (select[0].team1.score > select[0].team2.score &&
						// 	item2.team1.team === team.team)
					) {
						matches.push({
							...item2,
							team1: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								imgFile: team.imgFile,
								team_id: team.team,
								// winner:
								// 	select[0].team1.score > select[0].team2.score
								// 		? 'winner'
								// 		: 'lost',
							},
						});
					} else if (
						item2.team2.team === team.team &&
						item2.team2.round === team.round
					) {
						matches.push({
							...item2,
							team2: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								imgFile: team.imgFile,
								team_id: team.team,
								// winner:
								// 	select[0].team1.score < select[0].team2.score
								// 		? 'winner'
								// 		: 'lost',
							},
						});
					} else {
						matches.push(item2);
					}
				});
				obj.matches = matches;
				newArray.push(obj);
			}
			setUserInfo(newArray);
		};
		const isCountAfterExtra = action => {
			let select = [];
			setIsRound(team.round);

			let array = [];
			let newArray = [];
			let winner = [];
			for (let i = 0; i < userInfoExtra.length; i++) {
				let obj = {};
				let matches = [];
				userInfoExtra[i].matches.map((item2, idx) => {
					if (
						item2.team1.team === team.team &&
						item2.team1.round === team.round
					) {
						matches.push({
							...item2,
							team1: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								team_id: team.team,
							},
						});
					} else if (
						item2.team2.team === team.team &&
						item2.team2.round === team.round
					) {
						matches.push({
							...item2,
							team2: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								team_id: team.team,
							},
						});
					} else {
						matches.push(item2);
					}
				});

				obj.matches = matches;
				array.push(obj);
			}

			// *********** 매치 승점을 비교하여 배열에 담는 과정  ***********
			array.map(item => {
				item.matches.map(item => {
					item.team1.team === team.team && select.push(item);
					item.team2.team === team.team && select.push(item);
				});
			});

			for (let i = 0; i < userInfoExtra.length; i++) {
				let obj = {};
				let matches = [];

				userInfoExtra[i].matches.map(item2 => {
					if (
						item2.team1.team === team.team &&
						item2.team1.round === team.round
						// 	||
						// (select[0].team1.score > select[0].team2.score &&
						// 	item2.team1.team === team.team)
					) {
						matches.push({
							...item2,
							team1: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								imgFile: team.imgFile,
								team_id: team.team,
								// winner:
								// 	select[0].team1.score > select[0].team2.score
								// 		? 'winner'
								// 		: 'lost',
							},
						});
					} else if (
						item2.team2.team === team.team &&
						item2.team2.round === team.round
					) {
						matches.push({
							...item2,
							team2: {
								team: team.team,
								score:
									action === -1 && team.score === 0 ? 0 : team.score + action,
								matches_key: team.matches_key,
								round: team.round,
								id: team.id,
								semifinal: team.semifinal,
								imgFile: team.imgFile,
								team_id: team.team,
								// winner:
								// 	select[0].team1.score < select[0].team2.score
								// 		? 'winner'
								// 		: 'lost',
							},
						});
					} else {
						matches.push(item2);
					}
				});
				obj.matches = matches;
				newArray.push(obj);
			}
			setUserInfoExtra(newArray);
		};

		const selectTeam = e => {
			setViewTeamList(!viewTeamList);
			setTeamId(e.team);
			try {
				axios
					.post(`${url.file}/LeagueTeamMember`, {
						dev: '/LeagueTeamMember',
						league_id: Number(window.location.pathname.split('/')[2]),
						team_name: e.team,
						// team_id: 17,
					})
					.then(res => {
						if (res.data.Info !== undefined) {
							if (teamId !== e.team) {
								setSelectTeamList(
									res.data.Info.team_member &&
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

		const isSelct = () => {
			setSelectInfo(team);
		};

		return (
			<>
				<div
					className={team && team.winner ? `${className} winner` : className}
				>
					{team.team === undefined ? (
						''
					) : (
						<>
							<div className="img--box">
								<img
									type="button"
									src={uploadImg}
									onClick={() => {
										setUpload(!upload);
										isSelct();
									}}
								/>
								{team.imgFile ? (
									<img
										type="button"
										className="photo"
										src={photo}
										onClick={() => {
											setCertification(!certification);
											isSelct();
										}}
									/>
								) : (
									''
								)}
							</div>
							<span
								className="team-name"
								type="button"
								onClick={() => {
									selectTeam(team);
								}}
							>
								{team.team}
							</span>
							{/* <img className="moreBtn__down" src={more} /> */}
							<div className="score--box">
								{window.location.pathname.split('/')[1] === 'leagueManage' ? (
									<img
										className="left"
										src={addBtn}
										type="button"
										onClick={() => {
											if (viewTypeNum === 1) {
												if (userInfo === '[]') {
													isCount(-1);
													isSelct();
												} else {
													isCountAfter(-1);
												}
											} else {
												if (
													stage1Extra === null
														? ''
														: stage1Extra[0] === undefined
												) {
													isCount(-1);
													isSelct();
												} else {
													isCountAfterExtra(-1);
												}
											}
										}}
									/>
								) : (
									''
								)}
								<span className="team-score">
									{team.score === null ? 0 : team.score}
								</span>
								{window.location.pathname.split('/')[1] === 'leagueManage' ? (
									<img
										src={addBtn}
										type="button"
										onClick={() => {
											if (viewTypeNum === 1) {
												if (userInfo === '[]') {
													isCount(+1);
													isSelct();
												} else {
													isCountAfter(+1);
												}
											} else {
												if (
													stage1Extra === null
														? ''
														: stage1Extra[0] === undefined
												) {
													isCount(+1);
													isSelct();
												} else {
													isCountAfterExtra(+1);
												}
											}
										}}
									/>
								) : (
									''
								)}
							</div>
						</>
					)}
				</div>
			</>
		);
	};

	const isUpload = () => {
		let array = [];
		for (let i = 0; i < matcheData.length; i++) {
			let obj = {};
			let matches = [];
			matcheData[i].matches.map((item2, idx) => {
				if (
					item2.team1.team === selectInfo.team &&
					item2.team1.round === selectInfo.round
				) {
					matches.push({
						...item2,
						team1: {
							team: selectInfo.team,
							score: selectInfo.score,
							matches_key: selectInfo.matches_key,
							round: selectInfo.round,
							id: selectInfo.id,
							semifinal: selectInfo.semifinal,
							imgFile: imgFile,
							team_id: selectInfo.team,
						},
					});
				} else if (
					item2.team2.team === selectInfo.team &&
					item2.team2.round === selectInfo.round
				) {
					matches.push({
						...item2,
						team2: {
							team: selectInfo.team,
							score: selectInfo.score,
							matches_key: selectInfo.matches_key,
							round: selectInfo.round,
							id: selectInfo.id,
							semifinal: selectInfo.semifinal,
							imgFile: imgFile,
							team_id: selectInfo.team,
						},
					});
				} else {
					matches.push(item2);
				}
			});

			obj.matches = matches;
			array.push(obj);
		}
		setMatchData(array);

		axios
			.post(`${url.file}/LeagueLayoutUpdate`, {
				id: getUserInfo === null ? '' : getUserInfo.id,
				league_layout_id: stage1 === null ? '' : stage1[0].league_layout_id,
				league_id: Number(window.location.pathname.split('/')[2]),
				score_update: false,
				layout_type: 1,
				layout_values: array,
				layout_group_participants:
					stage1 === null
						? ''
						: JSON.parse(stage1[0].layout_group_participants),
				// '[토너먼트의 경우에만 해당 레이아웃이 몇 조의 레이아웃인지]',
				layout_group: 2,
			})
			.then(res => {
				setFlag(!flag);
			});
	};

	const isUploadAfter = () => {
		let array = [];
		for (let i = 0; i < userInfo.length; i++) {
			let obj = {};
			let matches = [];
			userInfo[i].matches.map((item2, idx) => {
				if (
					item2.team1.team === selectInfo.team &&
					item2.team1.round === selectInfo.round
				) {
					matches.push({
						...item2,
						team1: {
							team: selectInfo.team,
							score: selectInfo.score,
							matches_key: selectInfo.matches_key,
							round: selectInfo.round,
							id: selectInfo.id,
							semifinal: selectInfo.semifinal,
							imgFile: imgFile,
							team_id: selectInfo.team,
						},
					});
				} else if (
					item2.team2.team === selectInfo.team &&
					item2.team2.round === selectInfo.round
				) {
					matches.push({
						...item2,
						team2: {
							team: selectInfo.team,
							score: selectInfo.score,
							matches_key: selectInfo.matches_key,
							round: selectInfo.round,
							id: selectInfo.id,
							semifinal: selectInfo.semifinal,
							imgFile: imgFile,
							team_id: selectInfo.team,
						},
					});
				} else {
					matches.push(item2);
				}
			});

			obj.matches = matches;
			array.push(obj);
		}

		setUserInfo(array);

		axios
			.post(`${url.file}/LeagueLayoutUpdate`, {
				id: getUserInfo === null ? '' : getUserInfo.id,
				league_layout_id: stage1 === null ? '' : stage1[0].league_layout_id,
				league_id: Number(window.location.pathname.split('/')[2]),
				score_update: false,
				layout_type: 1,
				layout_values: array,
				layout_group_participants:
					stage1 === null
						? ''
						: JSON.parse(stage1[0].layout_group_participants),
				// '[토너먼트의 경우에만 해당 레이아웃이 몇 조의 레이아웃인지]',
				layout_group: 2,
			})
			.then(res => {
				// setFlag(!flag);
			});
	};

	const isUploadAfterExtra = () => {
		let array = [];
		for (let i = 0; i < userInfoExtra.length; i++) {
			let obj = {};
			let matches = [];
			userInfoExtra[i].matches.map((item2, idx) => {
				if (
					item2.team1.team === selectInfo.team &&
					item2.team1.round === selectInfo.round
				) {
					matches.push({
						...item2,
						team1: {
							team: selectInfo.team,
							score: selectInfo.score,
							matches_key: selectInfo.matches_key,
							round: selectInfo.round,
							id: selectInfo.id,
							semifinal: selectInfo.semifinal,
							imgFile: imgFile,
							team_id: selectInfo.team,
						},
					});
				} else if (
					item2.team2.team === selectInfo.team &&
					item2.team2.round === selectInfo.round
				) {
					matches.push({
						...item2,
						team2: {
							team: selectInfo.team,
							score: selectInfo.score,
							matches_key: selectInfo.matches_key,
							round: selectInfo.round,
							id: selectInfo.id,
							semifinal: selectInfo.semifinal,
							imgFile: imgFile,
							team_id: selectInfo.team,
						},
					});
				} else {
					matches.push(item2);
				}
			});

			obj.matches = matches;
			array.push(obj);
		}
		setUserInfoExtra(array);

		axios
			.post(`${url.file}/LeagueLayoutUpdate`, {
				id: getUserInfo === null ? '' : getUserInfo.id,
				league_layout_id: stage1 === null ? '' : stage1[0].league_layout_id,
				league_id: Number(window.location.pathname.split('/')[2]),
				score_update: false,
				layout_type: 1,
				layout_values: array,
				layout_group_participants:
					stage1 === null
						? ''
						: JSON.parse(stage1[0].layout_group_participants),
				// '[토너먼트의 경우에만 해당 레이아웃이 몇 조의 레이아웃인지]',
				layout_group: 2,
			})
			.then(res => {
				setFlag(!flag);
			});
	};

	const heightNum =
		matcheData[1] && matcheData[1].matches && matcheData[1].matches.length;

	return (
		<div id={leagueType1 === 1 ? 'regionContainer' : 'regionContainer topZero'}>
			<div
				className={leagueType1 === 1 ? 'region' : 'region zero'}
				style={{ minHeight: `${heightNum * 20}vh` }}
			>
				{(viewTypeNum === 1
					? userInfo === '[]'
						? matcheData && matcheData
						: userInfo
					: userInfoExtra
				).map((round, index, arr) => {
					return (
						<>
							<section key={index} className="round">
								<div className="roundTitle">{`Round ${index + 1}`}</div>
								{round &&
									round.matches &&
									round.matches.map((_, idx) => {
										return (
											<>
												<article className="game--box" key={idx}>
													<div className="game">
														<div>{_.team1 && _.team1.semifinal}</div>
														{renderTeam(round.matches[idx].team1)}
														{renderTeam(round.matches[idx].team2)}
														{selectTeamList &&
															selectTeamList.length !== 0 &&
															_.team1.team === teamId && (
																<div className="team1">
																	{selectTeamList &&
																		selectTeamList.map((item, idx) => {
																			return <div>{item.name}</div>;
																		})}
																</div>
															)}
														{selectTeamList &&
															selectTeamList.length !== 0 &&
															_.team2.team === teamId && (
																<div className="team2">
																	{selectTeamList &&
																		selectTeamList.map((item, idx) => {
																			return <div>{item.name}</div>;
																		})}
																</div>
															)}
													</div>
												</article>
											</>
										);
									})}
							</section>
						</>
					);
				})}
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
							className={
								imgFile === undefined ? 'modalBtn colorGray' : 'modalBtn'
							}
							size="medium"
							onClick={() => {
								if (imgFile === undefined) {
									('');
								} else {
									if (viewTypeNum === 1) {
										userInfo === '[]' ? isUpload() : isUploadAfter();
									} else {
										if (window.location.pathname.split('/')[1] === 'league') {
											Info === '[]' ? isUpload() : isUploadPage();
										} else {
											if (window.location.pathname.split('/')[1] === 'league') {
												Info === '[]' ? isUpload() : isUploadPage();
											} else {
												isUploadAfterExtra();
											}
										}
									}

									setUpload(!upload);
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
		</div>
	);
};

export default Tournament;




