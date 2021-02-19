import React, { useState, useEffect, Fragment, useCallback } from 'react';
import Select from 'react-select';
import Media from 'react-media';
import { useHistory } from 'react-router-dom';

import IosSwitch from '../../../components/IosSwitch/IosSwitch';
import Title from '../../../components/Title/Title';
import { StepProgressBar } from '../../../components/StepProgressBar/StepProgressBar';
import TierSlider from '../../../components/League/TierSlider/TierSlider';

import {
	settingCategory,
	questionAnswer,
} from '../../../assets/dummyData/AuthData';

import calendar from '../../../static/images/League/calendar.svg';

import './MakeLeaguePageStep2.scss';
const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
const MakeLeaguePageStep2 = ({
	getBanList,
	getQuestion,
	getTagList,
	tagList,
	banList,
	temporayModal,
	openTemporaryModal,
	makeTemporaryLeague,
	insertLeagueInfo,
	leagueTemporaryList,
	getTierInfo,
}) => {
	let history = useHistory();
	const [flag, setFlag] = useState(false);

	// Ban
	const [age, setAge] = useState(
		'' || (insertLeagueInfo.ban && insertLeagueInfo.ban.age === undefined)
			? ''
			: (insertLeagueInfo.ban && insertLeagueInfo.ban.age.lte) ||
					(insertLeagueInfo.ban && insertLeagueInfo.ban.age.gte),
	);

	const [controlAge, setControlAge] = useState(
		false || (insertLeagueInfo.ban && insertLeagueInfo.ban.age === undefined)
			? ''
			: (insertLeagueInfo.ban &&
					insertLeagueInfo.ban.age.gte === undefined &&
					false) ||
					(insertLeagueInfo.ban &&
						insertLeagueInfo.ban.age.lte !== undefined &&
						true),
	);

	const [score, setScore] = useState(
		'' || (insertLeagueInfo.ban && insertLeagueInfo.ban.score === undefined)
			? ''
			: (insertLeagueInfo.ban && insertLeagueInfo.ban.score.lte) ||
					(insertLeagueInfo.ban && insertLeagueInfo.ban.score.gte),
	);

	const [controlScore, setControlScore] = useState(
		false || (insertLeagueInfo.ban && insertLeagueInfo.ban.score === undefined)
			? ''
			: (insertLeagueInfo.ban &&
					insertLeagueInfo.ban.score.gte === undefined &&
					false) ||
					(insertLeagueInfo.ban &&
						insertLeagueInfo.ban.score.lte !== undefined &&
						true),
	);
	const [tier, setTier] = useState('' || (banList && banList && banList.tier));
	const [pro, setPro] = useState(
		false || (banList && banList.pro === '1') ? true : false,
	);
	const [mic, setMic] = useState(banList && banList.mic === '0' ? false : true);
	const [broadcast, setBroadcast] = useState(
		banList && banList.broadcast === '0' ? false : true,
	);

	const [key, setKey] = useState('');
	const [value, setValue] = useState('');

	const [manualCount, setManuCount] = useState(1);

	const result_map = Object.keys(
		insertLeagueInfo.ban === undefined || insertLeagueInfo.ban === null
			? { age: '' }
			: insertLeagueInfo.ban,
	).map(key => {
		return {
			label:
				(String(key) === 'age' && '나이') ||
				(String(key) === 'score' && '점수') ||
				(String(key) === 'tier' && '티어') ||
				(String(key) === 'pro' && '프로') ||
				(String(key) === 'mic' && '마이크') ||
				(String(key) === 'broadcast' && '방송'),
			value: String(key),
		};
	});

	const [selectCategory, setSelctCategory] = useState(result_map);

	useEffect(() => {
		tagList.ban !== undefined ? setSelctCategory(tagList.ban) : '';
	}, []);

	const gteAge = { gte: age };
	const lteAge = { lte: age };
	const gteScore = { gte: score };
	const lteScore = { lte: score };
	const rePro = pro === false ? '0' : '1';
	const proToFind = selectCategory.find(item => {
		return item.value === 'pro';
	});
	const reMic = mic === false ? '0' : '1';
	const micToFind = selectCategory.find(item => {
		return item.value === 'mic';
	});
	const reBroadcast = broadcast === false ? '0' : '1';
	const broadcastToFind = selectCategory.find(item => {
		return item.value === 'broadcast';
	});
	const keyToFind = selectCategory.find(item => {
		return item.value === '1';
	});

	// Question
	const [count, setCount] = useState(1);
	const [questionTag, setQuestionTag] = useState([
		{
			value: '1',
			question_index: 1,
			type: '0',
			required: '0',
			question_title: '해당 게임의 아이디를 알려주세요.',
			answer_list: [],
		},
	]);

	useEffect(() => {
		tagList.question !== undefined ? setQuestionTag(tagList.question) : '';
	}, []);

	const addCategory = selectedOption => {
		// selectedOption.label === '직접입력' && setManuCount(manualCount + 1);
		const itemToFind = selectCategory.find(function(item) {
			return item.value === selectedOption.value;
		});

		const idx = selectCategory.indexOf(itemToFind);
		idx > -1
			? selectedOption.label === '직접입력'
			: // ? setSelctCategory([
			  // 		...selectCategory,
			  // 		{
			  // 			value: String(manualCount),
			  // 			label: selectedOption.label,
			  // 			title: '',
			  // 			title_value: '',
			  // 		},
			  //   ])
			  // : ''
			  setSelctCategory([
					...selectCategory,
					{
						value: selectedOption.value,
						label: selectedOption.label,
						// title: '',
						// title_value: '',
					},
			  ]);
	};

	// console.log(selectCategory);

	// const isCustomTitle = (item, e) => {
	// 	let array = [];
	// 	selectCategory.map(item2 => {
	// 		item2.value === item.value
	// 			? array.push({
	// 					...item2,
	// 					title: e.target.value,
	// 			  })
	// 			: array.push(item2);
	// 	});
	// 	setSelctCategory(array);
	// };

	// const isCustomValue = (item, e) => {
	// 	let array = [];
	// 	selectCategory.map(item2 => {
	// 		item2.value === item.value
	// 			? array.push({
	// 					...item2,
	// 					title_value: e.target.value,
	// 			  })
	// 			: array.push(item2);
	// 	});
	// 	setSelctCategory(array);
	// };

	const isQuestionTitle = (item, e) => {
		let array = [];
		questionTag.map(item2 => {
			item2.value === item.value
				? array.push({
						...item2,
						question_title: e.target.value,
				  })
				: array.push(item2);
		});
		setQuestionTag(array);
	};

	const onChangeValue = e => {
		e.target.name === 'age' && setAge(e.target.value);
		e.target.name === 'score' && setScore(e.target.value);
		e.target.name === 'tier' && setTier(e.target.value);
		e.target.name === 'key' && setKey(e.target.value);
		e.target.name === 'value' && setValue(e.target.value);
	};

	const addMultyChoice = (item, e) => {
		item.answer_list.push({ value: e.target.value });
		e.target.value = '';
		setFlag(!flag);
	};

	const changeAnswer = (item, e) => {
		let typeArray = [];

		questionTag.map(item2 => {
			item2.question_index === item.question_index
				? typeArray.push({
						...item2,
						type: e.value === 'short' ? '0' : '1',
				  })
				: typeArray.push(item2);
		});
		setQuestionTag(typeArray);
	};

	const deleteBtn = (e, arr) => {
		const itemToFind = arr.find(function(item) {
			return String(item.value) === e.target.id;
		});
		const idx = arr.indexOf(itemToFind);

		if (idx > -1) {
			arr.splice(idx, 1);
			setFlag(!flag);
		}
	};

	const addQuestionTag = () => {
		setCount(count + 1);
		setQuestionTag([
			...questionTag,
			{
				value: String(count + 1),
				question_index: count + 1,
				type: '0',
				required: '0',
				question_title: '',
				answer_list: [],
			},
		]);
	};

	const necessaryBtn = (item, e) => {
		let requiredArray = [];

		questionTag.map(item2 => {
			if (item2.question_index === item.question_index) {
				requiredArray.push({
					...item2,
					required: e === true ? '1' : '0',
				});
			} else {
				requiredArray.push(item2);
			}
		});
		setQuestionTag(requiredArray);
	};

	useEffect(() => {}, [flag]);

	const getTierList = (e, getSelectTier) => {
		e.length < 9 ? getTierInfo(e) : getTierInfo(getSelectTier);
		const tier = e.map(key => {
			return key.value;
		});
		setTier(tier.join(','));
	};

	const moveStep = () => {
		getBanList(banReList());
		getQuestion(questionTag);
		getTagList(selectCategory, questionTag);
	};

	const isCheck = e => {
		const check = selectCategory.map(key => {
			return key;
		});
		for (let i = 0; i < check.length; i++) {
			return check[i];
		}
	};

	const banReList = () => {
		const obj = {};
		const sendAge =
			(controlAge === '' && gteAge) ||
			(controlAge === undefined && gteAge) ||
			controlAge === false
				? gteAge
				: lteAge;
		const sendScore =
			(controlScore === '' && gteScore) ||
			(controlScore === undefined && gteScore) ||
			controlScore === false
				? gteScore
				: lteScore;
		const sendPro = proToFind === undefined ? null : rePro;
		const sendMic = micToFind === undefined ? null : reMic;
		const sendBroadcast = broadcastToFind === undefined ? null : reBroadcast;
		const sendKey = keyToFind === undefined ? null : key;
		const sendValue = keyToFind === undefined ? null : value;
		age === '' || age === undefined || age === null
			? ''
			: isCheck('age') && (obj.age = sendAge);
		score === '' || score === undefined || score === null
			? ''
			: isCheck('score') && (obj.score = sendScore);
		sendPro === null ? '' : isCheck('pro') && (obj.pro = sendPro);
		tier === undefined ? '' : isCheck('tier') && (obj.tier = tier);
		sendMic === null ? '' : isCheck('mic') && (obj.mic = sendMic);
		sendBroadcast === null
			? ''
			: isCheck('broadcast') && (obj.broadcast = sendBroadcast);
		sendKey === '' ? '' : isCheck('key') && (obj.manualKey = sendKey);
		sendValue === '' ? '' : isCheck('value') && (obj.manualValue = sendValue);
		// const key = selectCategory.map(item => {
		// 	return item.title === undefined
		// 		? '0'
		// 		: { title: item.title, title_value: item.title_value };
		// });
		// while (true) {
		// 	var search = key.indexOf('0');
		// 	if (search != -1) {
		// 		key.splice(search, 1);
		// 	} else {
		// 		break;
		// 	}
		// }
		// key.forEach(item => {
		// 	obj[item.title] = item.title_value === undefined ? '' : item.title_value;
		// });
		// console.log(obj);
		return obj.age === undefined &&
			obj.score === undefined &&
			obj.tier === undefined &&
			obj.pro === undefined &&
			obj.mic === undefined &&
			obj.broadcast === undefined &&
			obj.manualKey === undefined &&
			obj.manualValue === undefined
			? null
			: obj;

		// return obj;
	};

	const saveTemporary = () => {
		const reward_ratio = { '1등': 100, '2등': 0 };

		makeTemporaryLeague(
			insertLeagueInfo.league_title === undefined
				? null
				: insertLeagueInfo.league_title,
			insertLeagueInfo.game_id === undefined ? null : insertLeagueInfo.game_id,
			insertLeagueInfo.game_title === undefined
				? null
				: insertLeagueInfo.game_title,
			insertLeagueInfo.game_title_kr === undefined
				? null
				: insertLeagueInfo.game_title_kr,
			insertLeagueInfo.league_type,
			insertLeagueInfo.auto_join,
			'0',
			insertLeagueInfo.limit_people,
			insertLeagueInfo.member_count,
			insertLeagueInfo.waiting_people,
			insertLeagueInfo.league_main_img === undefined
				? null
				: insertLeagueInfo.league_main_img,
			null,
			insertLeagueInfo.apply_start,
			insertLeagueInfo.apply_end,
			insertLeagueInfo.start_date,
			insertLeagueInfo.desc === undefined ? null : insertLeagueInfo.desc,
			banReList(),
			questionTag,
			'0',
			'0',
			reward_ratio,
		);
	};
	return (
		<div className="MakeLeaguePageStep2">
			{getUserInfo === null ? (
				<>{alert('로그인 후 이용 가능합니다.')}</>
			) : (
				<>
					{window.innerWidth < 768 ? (
						''
					) : (
						<Title border="thick" size="large">
							리그 생성하기
						</Title>
					)}
					<header className="mobile__header--box">
						<button
							className="homeBtn"
							onClick={() => {
								history.push('/');
							}}
						>
							{'<'}
						</button>
						<span className="title">리그 만들기</span>
						<button
							className="temporaryBtn"
							type="button"
							onClick={() => {
								openTemporaryModal(!temporayModal);
							}}
						>
							{/* <span className="text">임시 저장</span> */}
							{/* <span className="text number">{leagueTemporaryList.length}</span> */}
						</button>
					</header>
					<div className="MakeLeaguePageStep2--inner">
						<div>
							<StepProgressBar step={2} />
						</div>
						<div className="infoContainer">
							<header className="info__header--box">
								<img src={calendar} />
								<div className="header__title">Ban</div>
								<div className="header__subTitle">제한/규칙</div>
							</header>
							{/* ** */}
							{/* 카테고리 선택*/}
							<div className="selectBox">
								<Select
									className="select-form"
									value={{ label: '선택' }}
									options={settingCategory}
									isSearchable={false}
									onChange={addCategory}
								/>
								{selectCategory.map((item, index) => {
									return (
										<div className="conditionBox" key={index}>
											<div className="textBox">
												<button
													id={item.value}
													onClick={e => deleteBtn(e, selectCategory)}
												>
													x
												</button>
												{item.label === '직접입력' ? (
													<input
														className="input"
														placeholder="직접입력"
														// value={item.title && item.title.title}
														value={key}
														name={'key'}
														onChange={e => {
															// isCustomTitle(item, e);
															onChangeValue(e);
														}}
													/>
												) : (
													<React.Fragment>{item.label}</React.Fragment>
												)}
											</div>
											<div className="inputBox">
												{item.value === 'age' && (
													<React.Fragment>
														<input
															className="input"
															type="number"
															name={'age'}
															value={age}
															onChange={e => {
																onChangeValue(e);
															}}
														/>{' '}
														세
														<button
															type="button"
															className={
																!controlAge
																	? 'control__button'
																	: 'control__button border__orange'
															}
															onClick={() => setControlAge(!controlAge)}
														>
															{!controlAge ? '이상' : '이하'}
														</button>
													</React.Fragment>
												)}
												{item.value === 'score' && (
													<React.Fragment>
														<input
															className="input"
															type="number"
															name={'score'}
															value={score}
															onChange={e => {
																onChangeValue(e);
															}}
														/>{' '}
														점
														<button
															type="button"
															className={
																!controlScore
																	? 'control__button'
																	: 'control__button border__orange'
															}
															onClick={() => setControlScore(!controlScore)}
														>
															{!controlScore ? '이상' : '이하'}
														</button>
													</React.Fragment>
												)}
												{item.value === 'tier' && (
													<>
														<TierSlider
															getTierList={getTierList}
															insertLeagueInfo={insertLeagueInfo}
														/>
													</>
												)}
												{item.value === 'pro' && (
													<div className="settingBtn">
														<button
															type="button"
															className={
																!pro
																	? 'control__button'
																	: 'control__button border__orange'
															}
															onClick={() => setPro(!pro)}
														>
															{pro ? '허용' : '비허용'}
														</button>
													</div>
												)}
												{item.value === 'mic' && (
													<div className="settingBtn">
														<button
															type="button"
															className={
																!mic
																	? 'control__button'
																	: 'control__button border__orange'
															}
															onClick={() => setMic(!mic)}
														>
															{mic ? '허용' : '비허용'}
														</button>
													</div>
												)}
												{item.value === 'broadcast' && (
													<div className="settingBtn">
														<button
															type="button"
															className={
																!broadcast
																	? 'control__button'
																	: 'control__button border__orange'
															}
															onClick={() => setBroadcast(!broadcast)}
														>
															{broadcast ? '허용' : '비허용'}
														</button>
													</div>
												)}
												{item.label === '직접입력' && (
													<React.Fragment>
														<input
															className="input big"
															placeholder="직접 입력"
															// value={
															// 	item.title_value && item.title_value.title_value
															// }
															name="value"
															value={value}
															onChange={e => {
																// isCustomValue(item, e);
																onChangeValue(e);
															}}
														/>
													</React.Fragment>
												)}
											</div>
										</div>
									);
								})}
							</div>
							{/* ** */}
							{/* 질문*/}
							<div className="qustionBox">
								<header className="info__header--box">
									<img src={calendar} />
									<div className="header__title">Question</div>
									<div className="header__subTitle">질문</div>
									<button onClick={addQuestionTag}>
										질문 추가 <span>+</span>
									</button>
								</header>
								{questionTag.map((item, index) => {
									return (
										<div className="answerBox" key={index}>
											<div className="answerInnerBox">
												<div className="subjectBox">
													<input
														className="subject"
														placeholder="질문을 작성해 주세요."
														onChange={e => isQuestionTitle(item, e)}
														value={item.question_title}
													/>
													<button
														id={item.value}
														className="deleteButtonMoblie"
														onClick={e => deleteBtn(e, questionTag)}
													>
														x
													</button>
													<Media query={{ maxWidth: 768 }}>
														<>
															<div className="formMobile">
																<Select
																	className="select-form"
																	value={
																		item.type === '1'
																			? { label: '객관식형' }
																			: { label: '단답형' }
																	}
																	options={questionAnswer}
																	isSearchable={false}
																	onChange={e => {
																		changeAnswer(item, e);
																	}}
																/>
															</div>
														</>
													</Media>
													{item.type === '0' ? (
														<div className="shortAnswerBox">
															<div className="title">단답형 답변</div>
															<div className="subject" />
														</div>
													) : (
														<div className="longAnswerBox">
															<div className="title">객관식 답변</div>
															{item.answer_list.map((info, index) => {
																return (
																	<div className="longAnswerInput" key={index}>
																		<div className="radio" />
																		<div className="subject answer">
																			{info.value}
																		</div>
																		<button
																			id={info.value}
																			className="deleteButton multipleChoice"
																			onClick={e =>
																				deleteBtn(e, item.answer_list)
																			}
																		>
																			x
																		</button>
																	</div>
																);
															})}
															<div className="longAnswerInput">
																<div className="radio" />
																<input
																	className="subject answer"
																	placeholder="옵션추가"
																	onKeyPress={e => {
																		if (e.target.value.length === 0) {
																			('');
																		} else {
																			e.charCode === 13 &&
																				addMultyChoice(item, e);
																		}
																	}}
																/>
															</div>
														</div>
													)}
												</div>
												<div className="answerSelectBox">
													<div className="form">
														<Select
															className="select-form"
															value={
																item.type === '1'
																	? { label: '객관식형' }
																	: { label: '단답형' }
															}
															options={questionAnswer}
															isSearchable={false}
															onChange={e => {
																changeAnswer(item, e);
															}}
														/>
													</div>
													<button
														className="deleteButton delMobile"
														onClick={e => deleteBtn(e, questionTag)}
														id={item.value}
													>
														x
													</button>
												</div>
											</div>
											<div className="necessary">
												<div className="text">필수 질문 </div>
												<IosSwitch
													size="small"
													setBoolean={e => necessaryBtn(item, e)}
													boolean={item.required === '0' ? false : true}
												/>
											</div>
										</div>
									);
								})}
							</div>
							<div className="btn">
								{/* <button type="button">
									<span
										className="text"
										type="button"
										onClick={() => {
											saveTemporary();
										}}
									>
										임시 저장
									</span>
									<span
										className="text number"
										onClick={() => openTemporaryModal(!temporayModal)}
									>
										{leagueTemporaryList.length}
									</span>
								</button> */}
								{window.innerWidth > 768 ? (
									<button
										onClick={() => {
											moveStep();
											history.push('./step1');
										}}
									>
										이전
									</button>
								) : (
									''
								)}

								<button
									onClick={() => {
										moveStep();
										history.push('./step3');
									}}
								>
									다음 단계
								</button>
							</div>
							<footer className="mobileBtn--box">
								<button
									onClick={() => {
										moveStep();
										history.push('./step1');
									}}
								>
									이전
								</button>
								<button
									onClick={() => {
										moveStep();
										history.push('./step3');
									}}
								>
									다음 단계
								</button>
							</footer>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default MakeLeaguePageStep2;
