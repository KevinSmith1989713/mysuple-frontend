import React, { useState, useCallback, useRef } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { url } from '../../constants/apiUrl.js';

import {
	gameCheck,
	choiceGame,
	makeGame,
	makeCrewGame,
} from '../../store/Colleague/Colleague.store';

import { tabs, recommendGames } from '../../assets/dummyData/AuthData';
import Modal from '../Modal/Modal';

import pc from '../../static/images/Colleague/pc.svg';
import mobile from '../../static/images/Colleague/mobile.svg';
import consol from '../../static/images/Colleague/consol.svg';
import search from '../../../src/static/images/Chatting/search.svg';
import closeBtnGray from '../../static/images/closeBtnGray.svg';

import './ColleagueModal.scss';

const ColleagueModal = ({
	isOpen,
	close,
	gameCheck,
	gameInfo,
	gameChoice,
	choiceGame,
	makeGame,
	makeCrewGame,
	bringFlag,
}) => {
	const getUserInfo = JSON.parse(localStorage.getItem('data'));

	const [selectedTab, setTab] = useState('fastMatch');
	const [linkState, setLinkState] = useState(false);

	//빠른매칭용
	const [selectedGame, setSelectedGame] = useState(null);
	const [searchGame, setSearchGame] = useState(null);

	const [open, setOpen] = useState(false);

	const [gameId, setGameId] = useState();
	const [gameTitle, setGameTitle] = useState('');
	const [gameTitleKr, setGameTitleKr] = useState('');
	const [gameClass, setGameClass] = useState(0);

	const [title, setTitle] = useState('');
	const [gameName, setGameName] = useState('');
	const [link, setLink] = useState('');

	const titleInput = useRef(null);
	const gameNameInput = useRef(null);
	const linkInput = useRef(null);

	const [flag, setFlag] = useState(false);

	// 크루용
	const [crewTag, setCrewTag] = useState('');
	const [crewDesc, setCrewDesc] = useState('');
	const [selectedGameCrew, setSelectedGameCrew] = useState([]);

	const [crewGameId, setCrewGameId] = useState([]);
	const [crewGameTitle, setCrewGameTitle] = useState([]);
	const [crewGameTitleKr, setCrewGameTitleKr] = useState([]);
	const [crewGameClass, setCrewGameClass] = useState([]);

	const [crewImg, setCrewImg] = useState(null);

	const changeTitle = e => {
		let emoji = e.target.value.replace(
			/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
			'',
		);
		setTitle(emoji);
	};
	const changeGameName = e => {
		setGameName(e.target.value);
	};
	const changeLink = e => {
		setLink(e.target.value);
	};
	const changeCrewTag = e => {
		setCrewTag(e.target.value);
	};
	const changeCrewDesc = e => {
		let emoji = e.target.value.replace(
			/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
			'',
		);
		setCrewDesc(emoji);
	};

	const submitGame = useCallback(
		e => {
			setOpen(!open);
			e.preventDefault();
			gameCheck(gameName);
		},
		[gameName],
	);

	const onSearchGame = item => {
		!!searchGame && searchGame.id === item.game_id
			? setSearchGame(null)
			: setSearchGame(item);
		setOpen(false);
		setGameId(item.game_id);
		setGameTitle(item.game_title);
		setGameTitleKr(item.game_title_kr);
		setGameClass(item.game_class);
		setGameName('');
	};

	const onSearchCrewGame = item => {
		const newArr = selectedGameCrew;
		const findItem = newArr.find(function(item) {
			return item.gaem_id === item.game_id;
		});
		const idx = newArr.indexOf(findItem);
		if (idx > -1) {
			newArr.splice(idx, 1);
			setCrewGameId([...newArr]);
		}
		findItem
			? setSelectedGameCrew([...selectedGameCrew])
			: setSelectedGameCrew([...selectedGameCrew, item]);

		setOpen(false);
		setCrewGameId([...crewGameId, item.game_id]);
		setCrewGameTitle([...crewGameTitle, item.game_title]);
		setCrewGameTitleKr([...crewGameTitleKr, item.game_title_kr]);
		setCrewGameClass([...selectedGameCrew, item]);
		setGameName('');
	};

	const onSelectGame = item => {
		!!selectedGame && selectedGame.id === item.id
			? setSelectedGame(null)
			: setSelectedGame(item);
		choiceGame(false);
		setGameId(item.game_id);
		setGameTitle(item.game_title);
		setGameTitleKr(item.game_title_kr);
		setGameClass(item.game_class);
		setGameName('');
	};

	const onSelectCrewMakeGame = game => {
		choiceGame(false);
		const newArr = selectedGameCrew;
		const findItem = newArr.find(function(item) {
			return item.id === game.id;
		});
		const idx = newArr.indexOf(findItem);
		if (idx > -1) {
			newArr.splice(idx, 1);
			setCrewGameId([...newArr]);
		}
		findItem
			? setSelectedGameCrew([...selectedGameCrew])
			: setSelectedGameCrew([...selectedGameCrew, game]);

		if (crewGameId.indexOf(game.id) !== -1) {
			const newArrCrewGameId = crewGameId;

			const gameIdToFind = newArrCrewGameId.find(function(item) {
				return item === game.id;
			});

			const idx = newArrCrewGameId.indexOf(gameIdToFind);
			if (idx > -1) {
				newArrCrewGameId.splice(idx, 1);
				setCrewGameId([...newArrCrewGameId]);
			}
		} else {
			const newArrCrewGameId = crewGameId;
			newArrCrewGameId.push(game.id);
			setCrewGameId([...newArrCrewGameId]);
			setGameName('');
		}

		if (crewGameTitle.indexOf(game.game_title) !== -1) {
			const newArrCrewGameTitle = crewGameTitle;
			const gameTitleToFind = newArrCrewGameTitle.find(function(item) {
				return item === game.game_title;
			});
			const tix = newArrCrewGameTitle.indexOf(gameTitleToFind);

			if (tix > -1) {
				newArrCrewGameTitle.splice(tix, 1);
				setCrewGameTitle([...newArrCrewGameTitle]);
			}
		} else {
			const newArrCrewGameTitle = crewGameTitle;
			newArrCrewGameTitle.push(game.game_title);
			setCrewGameTitle([...newArrCrewGameTitle]);
			setGameName('');
		}

		if (crewGameTitleKr.indexOf(game.game_title_kr) !== -1) {
			const newArrCrewGameTitleKr = crewGameTitleKr;
			const gameTitleKrToFind = newArrCrewGameTitleKr.find(function(item) {
				return item === game.game_title_kr;
			});

			const tiKx = newArrCrewGameTitleKr.indexOf(gameTitleKrToFind);

			if (tiKx > -1) {
				newArrCrewGameTitleKr.splice(tiKx, 1);
				setCrewGameTitleKr([...newArrCrewGameTitleKr]);
			} else {
			}
		} else {
			const newArrCrewGameTitleKr = crewGameTitleKr;
			newArrCrewGameTitleKr.push(game.game_title_kr);
			setCrewGameTitleKr([...newArrCrewGameTitleKr]);
			setGameName('');
		}

		if (crewGameClass.indexOf(game) !== -1) {
			const newArrCrewGameClass = crewGameClass;
			const gameClassToFind = newArrCrewGameClass.find(function(item) {
				return item.game_id === game.game_id;
			});
			const cx = newArrCrewGameClass.indexOf(gameClassToFind);
			// newArrCrewGameClass.push(game);
			setCrewGameClass([...newArrCrewGameClass]);
			if (cx > -1) {
				newArrCrewGameClass.splice(cx, 1);
				setCrewGameClass([...newArrCrewGameClass]);
			}
		} else {
			const newArrCrewGameClass = crewGameClass;
			newArrCrewGameClass.push(game);
			setCrewGameClass([...newArrCrewGameClass]);
			setGameName('');
		}
	};

	const deleteCrewGame = game => {
		const newArr = selectedGameCrew;
		const findItem = newArr.find(function(item) {
			return item.id === game.id;
		});
		const idx = newArr.indexOf(findItem);

		if (idx > -1) {
			newArr.splice(idx, 1);
			setSelectedGameCrew([...newArr]);
			if (crewGameId.indexOf(game.id) !== -1) {
				const newArrCrewGameId = crewGameId;

				const gameIdToFind = newArrCrewGameId.find(function(item) {
					return item === game.id;
				});

				const idx = newArrCrewGameId.indexOf(gameIdToFind);
				if (idx > -1) {
					newArrCrewGameId.splice(idx, 1);
					setCrewGameId([...newArrCrewGameId]);
				}
			} else {
				const newArrCrewGameId = crewGameId;
				newArrCrewGameId.push(game.id);
				setCrewGameId([...newArrCrewGameId]);
				setGameName('');
			}

			if (crewGameTitle.indexOf(game.game_title) !== -1) {
				const newArrCrewGameTitle = crewGameTitle;
				const gameTitleToFind = newArrCrewGameTitle.find(function(item) {
					return item === game.game_title;
				});
				const tix = newArrCrewGameTitle.indexOf(gameTitleToFind);

				if (tix > -1) {
					newArrCrewGameTitle.splice(tix, 1);
					setCrewGameTitle([...newArrCrewGameTitle]);
				}
			} else {
				const newArrCrewGameTitle = crewGameTitle;
				newArrCrewGameTitle.push(game.game_title);
				setCrewGameTitle([...newArrCrewGameTitle]);
				setGameName('');
			}

			if (crewGameTitleKr.indexOf(game.game_title_kr) !== -1) {
				const newArrCrewGameTitleKr = crewGameTitleKr;
				const gameTitleKrToFind = newArrCrewGameTitleKr.find(function(item) {
					return item === game.game_title_kr;
				});

				const tiKx = newArrCrewGameTitleKr.indexOf(gameTitleKrToFind);

				if (tiKx > -1) {
					newArrCrewGameTitleKr.splice(tiKx, 1);
					setCrewGameTitleKr([...newArrCrewGameTitleKr]);
				} else {
				}
			} else {
				const newArrCrewGameTitleKr = crewGameTitleKr;
				newArrCrewGameTitleKr.push(game.game_title_kr);
				setCrewGameTitleKr([...newArrCrewGameTitleKr]);
				setGameName('');
			}

			if (crewGameClass.indexOf(game) !== -1) {
				const newArrCrewGameClass = crewGameClass;
				const gameClassToFind = newArrCrewGameClass.find(function(item) {
					return item.game_id === game.game_id;
				});
				const cx = newArrCrewGameClass.indexOf(gameClassToFind);
				// newArrCrewGameClass.push(game);
				setCrewGameClass([...newArrCrewGameClass]);
				if (cx > -1) {
					newArrCrewGameClass.splice(cx, 1);
					setCrewGameClass([...newArrCrewGameClass]);
				}
			} else {
				const newArrCrewGameClass = crewGameClass;
				newArrCrewGameClass.push(game);
				setCrewGameClass([...newArrCrewGameClass]);
				setGameName('');
			}
		}
	};

	const uploadFile = e => {
		e.preventDefault();
		let reader = new FileReader();
		let file1 = e.target.files[0];
		reader.onloadend = () => {
			setCrewImg(file1);
		};
		reader.readAsDataURL(file1);
	};

	const makeGameQuick = () => {
		if (title === '') {
			alert('제목을 입력해주세요.');
			titleInput.current.focus();
		} else if (gameId === undefined) {
			alert('게임을 선택해주세요.');
		} else {
			gameNameInput.current.focus();
			makeGame(
				title,
				getUserInfo.id,
				'true',
				1,
				gameId,
				gameTitle,
				gameTitleKr,
				link,
				gameClass,
				undefined,
				linkState,
			);
			setTitle('');
			setGameName('');
			setLink('');
			gameCheck('');
			setSearchGame(null);
			setSelectedGame(null);
			setSelectedGameCrew([]);
			setOpen(false);
			close();
			bringFlag(!flag);
		}
	};

	const makeCrewGameRoom = () => {
		if (title === '') {
			alert('제목을 입력해주세요.');
			titleInput.current.focus();
		} else if (crewGameId.length === 0) {
			alert('게임을 선택해주세요.');
			gameNameInput.current.focus();
		} else {
			async function imgUploade() {
				const formData = new FormData();
				formData.append('file', crewImg);
				const options = {
					headers: {
						'content-type': 'multipart/form-data',
						bucket_name: 'crew-image',
					},
				};
				const res = await axios.post(
					`${url.file}/ImageOnEditor`,
					formData,
					options,
				);

				setCrewImg(res);
				makeCrewGame(
					title,
					getUserInfo.id,
					'true',
					2,
					crewGameId,
					crewGameTitle,
					crewGameTitleKr,
					link,
					crewGameClass,
					crewTag,
					crewDesc,
					res.data.link,
				);
				setTitle('');
				setGameName('');
				setLink('');
				gameCheck('');
				setSearchGame(null);
				setSelectedGame(null);
				setCrewGameId([]);
				setCrewGameTitle([]);
				setCrewGameTitleKr([]);
				setCrewGameClass([]);
				setSelectedGameCrew([]);
				setCrewDesc('');
				close();
				bringFlag(!flag);
			}
			imgUploade();

			if (crewImg === null) {
				makeCrewGame(
					title,
					getUserInfo.id,
					'true',
					'false',
					crewGameId,
					crewGameTitle,
					crewGameTitleKr,
					link,
					crewGameClass,
					crewTag,
					crewDesc,
					null,
				);
			}
			setTitle('');
			setGameName('');
			setLink('');
			gameCheck('');
			setSearchGame(null);
			setSelectedGame(null);
			setCrewGameId([]);
			setCrewGameTitle([]);
			setCrewGameTitleKr([]);
			setCrewGameClass([]);
			setSelectedGameCrew([]);
			setCrewDesc('');
			close();
			bringFlag(!flag);
		}
	};

	const getByteLength = (s, b, i, c) => {
		for (
			b = i = 0;
			(c = s && s.charCodeAt(i++));
			b += c >> 11 ? 3 : c >> 7 ? 2 : 1
		);
		return b;
	};

	const stringByteLength = crewDesc.replace(
		/[\0-\x7f]|([0-\u07ff]|(.))/g,
		'$&$1$2',
	).length;

	return (
		<Modal
			className="ColleagueModal"
			setTitle={setTitle}
			setGameName={setGameName}
			setLink={setLink}
			gameCheck={gameCheck}
			setTab={setTab}
			close={close}
			setSearchGame={setSearchGame}
			setSelectedGame={setSelectedGame}
			isOpen={isOpen}
		>
			<div>
				<div className="ColleagueModal--Title">
					동료 만들기
					<img
						src={closeBtnGray}
						onClick={() => {
							close();
							setTitle('');
							setGameName('');
							setLink('');
							gameCheck('');
							setSearchGame(null);
							setSelectedGame(null);
							setCrewGameId([]);
							setCrewGameTitle([]);
							setCrewGameTitleKr([]);
							setCrewGameClass([]);
							setSelectedGameCrew([]);
							setCrewDesc('');
							setTab('fastMatch');
						}}
					/>
				</div>
			</div>
			<div className="ColleagueModal--Navigation">
				{tabs.map((tab, index) => {
					return (
						<div
							onClick={() => {
								setTab(tab.id);
								setTitle('');
								setGameName('');
								setLink('');
								gameCheck('');
								setSearchGame(null);
								setSelectedGame(null);
								setCrewGameId([]);
								setCrewGameTitle([]);
								setCrewGameTitleKr([]);
								setCrewGameClass([]);
								setSelectedGameCrew([]);
								setCrewDesc('');
							}}
							key={index}
							className={tab.id === selectedTab ? 'tab__selected' : 'tab'}
						>
							{tab.name}
						</div>
					);
				})}
			</div>
			<div className="ColleagueModal--Insert">
				<div className="MakeFastMatch">
					<div className="MakeFastMatch--Name">
						<div className="tab--title">
							제목 <b>*</b>
						</div>
						<input
							type="text"
							placeholder="제목"
							value={title}
							onChange={changeTitle}
							ref={titleInput}
						/>
					</div>
					<div className="MakeFastMatch--Game">
						<div className="tab--title">
							같이 하고싶은 게임 <b>*</b>
						</div>
						<form onSubmit={submitGame}>
							<div className="search-input">
								<input
									type="text"
									placeholder
									value={gameName}
									onChange={changeGameName}
									ref={gameNameInput}
								/>
								<img src={search} onClick={submitGame} />
							</div>
						</form>

						<div className="data--wrapper">
							<div className="data--box">
								{open &&
									gameInfo.data &&
									gameInfo.data.data.map((item, index) => {
										return (
											<div
												className="game--box"
												onClick={() => {
													selectedTab === 'fastMatch'
														? onSearchGame(item)
														: onSearchCrewGame(item);
												}}
												key={index}
											>
												<div className="img--box">
													<img className="backImg" src={item.img_src} />
													<img
														className="icon"
														src={
															item.game_class === '0'
																? pc
																: '' || item.game_class === '1'
																? pc
																: '' || item.game_class === '2'
																? mobile
																: consol
														}
													/>
												</div>
												<span>{item.game_title_kr}</span>
											</div>
										);
									})}
							</div>
						</div>

						{selectedTab === 'fastMatch' ? (
							<>
								<div className="tab--recommend">
									{recommendGames.map((game, index) => {
										return (
											<div
												className={
													!gameChoice &&
													!!selectedGame &&
													selectedGame.id === game.id
														? 'game__selected'
														: 'game'
												}
												key={index}
												onClick={() => onSelectGame(game)}
											>
												{game.name}
											</div>
										);
									})}
								</div>
								{(!gameChoice && !!selectedGame && (
									<div className="tag--selected">
										<div className="img--box">
											<img className="backImg" src={selectedGame.img_src} />
											<img
												className="icon"
												src={
													selectedGame.game_class === '0'
														? pc
														: '' || selectedGame.game_class === '1'
														? pc
														: '' || selectedGame.game_class === '2'
														? mobile
														: consol
												}
											/>
										</div>
										<div className="title">{selectedGame.name}</div>
									</div>
								)) ||
									(!!searchGame && (
										<div className="tag--selected">
											<div className="img--box">
												<img className="backImg" src={searchGame.img_src} />
												<img
													className="icon"
													src={
														searchGame.game_class === '0'
															? pc
															: '' || searchGame.game_class === '1'
															? pc
															: '' || searchGame.game_class === '2'
															? mobile
															: consol
													}
												/>
											</div>
											<div className="title">{searchGame.game_title_kr}</div>
										</div>
									))}
							</>
						) : (
							<>
								<div className="tab--recommend">
									{recommendGames.map((game, index) => {
										return (
											<div
												className={
													crewGameId.indexOf(game.id) !== -1
														? 'game__selected'
														: 'game'
												}
												id={game.id}
												key={index}
												onClick={() => onSelectCrewMakeGame(game)}
											>
												{game.name}
											</div>
										);
									})}
								</div>

								{selectedGameCrew.map((item, index) => {
									return (
										<div className="tag--selected">
											<div className="img--box">
												<img className="backImg" src={item.img_src} />
												<img
													key={index}
													className="icon"
													src={
														item.game_class === '0'
															? pc
															: '' || item.game_class === '1'
															? pc
															: '' || item.game_class === '2'
															? mobile
															: consol
													}
												/>
											</div>
											<div className="title">
												{item.name || item.game_title_kr}
											</div>
											<button onClick={() => deleteCrewGame(item)}>x</button>
										</div>
									);
								})}
							</>
						)}
					</div>
					<div className="MakeFastMatch--Link">
						<div className="tab--title">
							<div
								className={linkState ? 'box bg' : 'box'}
								onClick={() => {
									setLinkState(!linkState);
									setLink('');
								}}
							/>
							디스코드 링크 생성하기
						</div>
						<div className="links">
							<input
								type="text"
								placeholder="https://"
								value={linkState ? '' : link}
								onChange={changeLink}
								ref={linkInput}
							/>
						</div>
					</div>
					{selectedTab === 'makeCrew' ? (
						<>
							<div className="MakeFastMatch--Link">
								<div className="tab--title">크루태그</div>
								{/* <div className="links"> */}
								<input
									className="input"
									type="text"
									placeholder="#해시태그"
									value={crewTag}
									onChange={changeCrewTag}
									// ref={linkInput}
								/>
								{/* </div> */}
							</div>
							<div className="MakeFastMatch--Link">
								<div className="tab--title">크루 이미지</div>
								<div className="crew-img">
									<input
										className="img__input"
										value={!!crewImg ? crewImg.name : '이미지'}
									/>
									<div className="upload--btn">
										<label for="uploadBtn" className="btn_file">
											찾아보기
										</label>
										<input
											type="file"
											id="uploadBtn"
											className="uploadBtn"
											accept="image/gif,image/jpeg,image/png"
											onChange={e => uploadFile(e)}
										/>
									</div>
								</div>
							</div>
							<div className="MakeFastMatch--Link">
								<div className="tab--title">크루소개</div>
								<div className="links">
									<textarea
										className="comment"
										onChange={changeCrewDesc}
										name="crewDesc"
										value={crewDesc.substr(0, 199)}
										placeholder="크루 설명"
									/>
									<div className="comment__count">{crewDesc.length}/200 자</div>
								</div>
							</div>
						</>
					) : (
						''
					)}
				</div>
				<div
					className="ColleagueModal--Submit"
					onClick={
						selectedTab === 'makeCrew' ? makeCrewGameRoom : makeGameQuick
					}
				>
					<p>
						{selectedTab === 'makeCrew' ? '크루 만들기' : '빠른매칭 만들기'}
					</p>
				</div>
			</div>
		</Modal>
	);
};

const mapStateToProps = state => {
	return {
		gameInfo: state.colleague.gameInfo,
		gameChoice: state.colleague.gameChoice,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		gameCheck: gameName => dispatch(gameCheck(gameName)),
		choiceGame: () => dispatch(choiceGame()),
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
			undefined,
			auto_link,
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
					undefined,
					auto_link,
				),
			),
		makeCrewGame: (
			crew_title,
			email,
			open,
			type,
			game_id,
			gameTitle,
			gameTitleKr,
			link,
			game_class,
			crew_tag,
			crew_desc,
			crewImg,
		) =>
			dispatch(
				makeCrewGame(
					crew_title,
					email,
					open,
					type,
					game_id,
					gameTitle,
					gameTitleKr,
					link,
					game_class,
					crew_tag,
					crew_desc,
					crewImg,
				),
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ColleagueModal);
