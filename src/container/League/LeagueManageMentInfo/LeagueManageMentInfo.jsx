import React, { Fragment, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import swal from 'sweetalert';

import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import { step1Time } from '../../../assets/dummyData/AuthData';

import calendar from '../../../static/images/League/calendar.svg';
import trophy from '../../../static/images/League/trophy.svg';
import grayPeople from '../../../static/images/League/grayPeople.svg';
import grayPath from '../../../static/images/League/grayPath.svg';
import FroalaEditor from '../../../components/FroalaEditor/FroalaEditor';
import noImg from '../../../static/images/League/league_noImage.svg';

import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import { getSelectLeagueInfo } from '../../../store/League/League.store';
import { changeSuccess } from '../../../store/Layout/Layout.store';

import { makeTimeValu } from '../../../Utils/func';

import './LeagueManageMentInfo.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const LeagueManageMentInfo = ({
	insertLeagueInfo,
	getSelectLeagueInfo,
	leagueParticipantsList,
	getParticipants,
	updateLeague,
	changeSuccess,
	isSuccess,
}) => {
	let history = useHistory();

	const [flag, setFlag] = useState(false);
	const [file, setFile] = useState(null);
	const [editor, setEditor] = useState('');
	const [revise, setRevise] = useState(false);
	// const [insertLeagueInfo, setInsertLeagueInfo] = useState({});
	const date = moment(insertLeagueInfo.start_date).format('YYYY.MM.DD a h:mm ');
	const [imagePreviewUrl, setImagePreviewUrl] = useState(
		insertLeagueInfo.league_main_img,
	);
	useEffect(() => {
		getParticipants(window.location.pathname.split('/')[2]);
		getSelectLeagueInfo(window.location.pathname.split('/')[2]);

		try {
			axios
				.post(`${url.file}/LeagueSelect`, {
					dev: '/LeagueSelect',
					league_id: window.location.pathname.split('/')[2],
				})
				.then(res => {
					setEditor(
						res.data.Info && res.data.Info.list.desc === 'null'
							? ''
							: res.data.Info && res.data.Info.list.desc,
					);
					setFile(res.data.Info && res.data.Info.list.league_main_img);
				});
		} catch (e) {
			console.error(e);
		}
	}, []);

	const isPeople = () => {
		const arr = [];
		const result = leagueParticipantsList.map(item => {
			return item.join_type;
		});
		result.forEach(ele => {
			if (ele === 1) {
				arr.push(ele);
			}
		});
		return arr.length;
	};

	const infoList = [
		{
			key: '종목',
			value: insertLeagueInfo.game_title_kr,
			id: 'leagueInfo',
		},
		{
			key: '구분',
			value: insertLeagueInfo.league_type === 1 ? '팀전' : '개인전',
			id: 'layout',
		},
		{
			key: '리그 시작일자',
			value: date,
			id: 'leaderBoard',
		},
		{
			key: '주최자',
			value: insertLeagueInfo.user_nickname,
			id: 'recruit',
		},
		{
			key: '우승패스',
			value: `${insertLeagueInfo.reward} 개`,
			id: 'recruit',
			img: trophy,
		},
		{
			key: '총인원',
			value: `( ${isPeople()} / ${insertLeagueInfo.limit_people} )`,
			id: 'recruit',
			img: grayPeople,
		},
	];

	const onChangeFile = e => {
		e.preventDefault();
		let reader = new FileReader();
		let file1 = e.target.files[0];

		reader.onloadend = () => {
			setFile(file1);
			setImagePreviewUrl(reader.result);
		};
		reader.readAsDataURL(file1);
	};

	let $imagePreview = null;

	if (imagePreviewUrl === 'null') {
		$imagePreview = <img src={noImg} />;
	} else {
		$imagePreview = <img src={imagePreviewUrl} />;
	}

	//******************************
	//******* 리그 관련 **************
	//******************************
	const [gameType, setGameType] = useState(0 || insertLeagueInfo.league_type);
	const [singleCount, setSingleCount] = useState(
		0 || insertLeagueInfo.limit_people,
	);
	const reTeamPeopleCount =
		insertLeagueInfo.limit_people / insertLeagueInfo.member_count;
	const [teamCount, setTeamCount] = useState(
		0 || insertLeagueInfo.member_count,
	);
	const [teamPeopleCount, setTeamPeopleCount] = useState(
		0 || isNaN(reTeamPeopleCount) ? 0 : reTeamPeopleCount,
	);

	// 리그 신청 기간, 리그 시작 일자
	const [openCalendar, setOpenCalendar] = useState(false);
	const [openCalendarBy, setOpenCalendarBy] = useState(false);
	const [openCalendarStartDate, setOpenCalendarStartDate] = useState(false);

	const [fromDate, setFromDate] = useState(
		new Date(
			String(
				insertLeagueInfo.apply_start &&
					insertLeagueInfo.apply_start.split('T')[0],
			),
		),
	);

	const [fromDateDummy, setFromDateDummy] = useState(new Date());
	const [byDate, setByDate] = useState(
		new Date(
			String(
				insertLeagueInfo.apply_end && insertLeagueInfo.apply_end.split('T')[0],
			),
		),
	);
	const [byDateDummy, setByDateDummy] = useState(new Date());
	const [startDate, setStartDate] = useState(
		new Date(
			String(
				insertLeagueInfo.start_date &&
					insertLeagueInfo.start_date.split('T')[0],
			),
		),
	);

	const [startDateDummy, setStartDateDummy] = useState(new Date());

	const [openHoursFrom, setOpenHoursFrom] = useState(false);
	const [openHoursBy, setOpenHoursBy] = useState(false);
	const [openHoursStart, setOpenHoursStart] = useState(false);
	const [fromHours, setFromHours] = useState({
		time: insertLeagueInfo.fromHours && insertLeagueInfo.fromHours.time,
		value: insertLeagueInfo.fromHours && insertLeagueInfo.fromHours.value,
		id: insertLeagueInfo.fromHours && insertLeagueInfo.fromHours.id,
	});
	const [fromHoursDummy, setFromHoursDummy] = useState(
		makeTimeValu(insertLeagueInfo.apply_start),
	);

	const [byHours, setByHours] = useState({
		time: insertLeagueInfo.byHours && insertLeagueInfo.byHours.time,
		value: insertLeagueInfo.byHours && insertLeagueInfo.byHours.value,
		id: insertLeagueInfo.byHours && insertLeagueInfo.byHours.id,
	});
	const [byHoursDummy, setByHoursDummy] = useState(
		makeTimeValu(insertLeagueInfo.apply_end),
	);
	const [startHours, setStartHours] = useState({
		time: insertLeagueInfo.startHours && insertLeagueInfo.startHours.time,
		value: insertLeagueInfo.startHours && insertLeagueInfo.startHours.value,
		id: insertLeagueInfo.startHours && insertLeagueInfo.startHours.id,
	});

	const [startHoursDummy, setStartHoursDummy] = useState(
		makeTimeValu(insertLeagueInfo.start_date),
	);

	const isMonth = e => {
		return e.getMonth() + 1 < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1;
	};
	const isDay = e => {
		return e.getDate() + 1 <= 10 ? `0${e.getDate()}` : e.getDate();
	};

	// console.log(teamPeopleCount);
	const isUpdateLeague = () => {
		const formData = new FormData();
		formData.append('id', getUserInfo === null ? '' : getUserInfo.id);
		formData.append('league_id', window.location.pathname.split('/')[2]);
		formData.append('league_main_img', file);
		formData.append('desc', editor);
		// (현재보다 많을 때에만 가능함, 팀 리그의 경우 팀 인원(member_count)의 배수가 아니면 입력되지 못하게 할 것
		formData.append(
			'limit_people',
			gameType === 0 ? singleCount : teamCount * teamPeopleCount,
		);
		formData.append(
			'apply_start',
			`${fromDate.getFullYear()}-${isMonth(fromDate)}-${isDay(fromDate)}${
				fromHoursDummy.value
			}`,
		);
		formData.append(
			'apply_end',
			`${byDate.getFullYear()}-${isMonth(byDate)}-${isDay(byDate)}${
				byHoursDummy.value
			}`,
		);
		formData.append(
			'start_date',
			`${startDate.getFullYear()}-${isMonth(startDate)}-${isDay(startDate)}${
				startHoursDummy.value
			}`,
		);

		const options = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};
		try {
			axios.post(`${url.file}/LeagueUpdate`, formData, options).then(res => {
				if (res.status === 200) {
					window.location.reload();
				}
			});
		} catch (e) {
			console.error(e);
		}
	};

	const deleteLeague = () => {
		swal({
			text: '삭제하시겠습니까?',
			icon: 'warning',
			buttons: {
				canele: {
					text: 'Cancel',
					value: false,
				},
				confirm: {
					text: 'OK',
					value: true,
				},
			},

			content: {
				element: 'input',
				attributes: {
					placeholder: '리그 제목을 작성해주세요.',
					value: '',
				},
			},
		}).then(result => {
			if (result === insertLeagueInfo.league_title) {
				swal('삭제되었습니다.', {
					icon: 'success',
				});
				try {
					axios
						.post(
							`${url.file}/LeagueDelete`,

							{
								id: getUserInfo === null ? '' : getUserInfo.id,
								league_id: window.location.pathname.split('/')[2],
								league_title: insertLeagueInfo.league_title,
							},
						)
						.then(res => {
							history.push('/league');
							setTimeout(() => {
								changeSuccess(!isSuccess);
							}, 1000);
						});
				} catch (e) {
					console.error(e);
				}
			} else if (result === null || result === false) {
				('');
			} else {
				swal({
					text: '리그 제목을 확인해주세요.',
					icon: 'warning',
					buttons: {
						confirm: {
							text: 'OK',
							value: false,
						},
					},
				});
			}
		});
	};

	return (
		<div className="LeagueManageMentInfo">
			<div className="title--box">
				<div className="info__title">{insertLeagueInfo.league_title}</div>
				<button className="delete__button" onClick={deleteLeague}>
					리그 삭제
				</button>
			</div>
			<div className="date--box">
				<div className="apply">{isPeople()} 명 신청</div>
				<div className="date">
					{insertLeagueInfo.start_date
						.substring(5, 10)
						.replace()
						.replace(/-/g, '.')}
					&nbsp;&nbsp;
					{insertLeagueInfo.start_date.substring(11, 13) >= 12
						? 'PM'
						: 'AM'}{' '}
					{insertLeagueInfo.start_date.substring(11, 16)}
				</div>
			</div>
			<div className="main">
				<div className="mainImg--box">
					<div className="img">{$imagePreview}</div>
					<div className="thumbnail-img">
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
				</div>
				<div className="info--box">
					{infoList.map((item, index) => {
						return (
							<div className="info" key={index}>
								<div className="key">
									{item.img !== undefined ? (
										<img className="infoImg" src={item.img} />
									) : (
										''
									)}
									{item.key}
								</div>
								<div
									className={item.img !== undefined ? 'value bold' : 'value'}
								>
									{item.value}
								</div>
							</div>
						);
					})}

					{/**************** 인원 수정 ****************/}
					<div className="divisionBox">
						{gameType === 0 && (
							<div className="count--box">
								<div className="count">
									<div className="text">총 인원</div>
									<div className="countBar">
										<button
											className="sign"
											type="button"
											onClick={() => {
												if (insertLeagueInfo.limit_people >= singleCount) {
												} else {
													singleCount < 1 ? 0 : setSingleCount(singleCount - 1);
												}
											}}
										>
											-
										</button>
										<input
											type="number"
											className="number"
											value={singleCount}
											onChange={e => {
												setSingleCount(Number(e.target.value));
											}}
										/>
										<button
											className="sign"
											type="button"
											onClick={() => {
												setSingleCount(singleCount + 1);
											}}
										>
											+
										</button>
									</div>
								</div>
							</div>
						)}
						{gameType === 1 && (
							<>
								<div className="count--box">
									<div className="count">
										<div className="text">총 팀수</div>
										<div className="countBar">
											<button
												type="button"
												className="sign"
												onClick={() => {
													teamPeopleCount > reTeamPeopleCount &&
														setTeamPeopleCount(teamPeopleCount - 1);
												}}
											>
												-
											</button>
											<input
												type="number"
												className="number"
												value={teamPeopleCount}
												onChange={e => setTeamCount(Number(e.target.value))}
											/>
											<button
												type="button"
												className="sign"
												onClick={() => {
													setTeamPeopleCount(teamPeopleCount + 1);
												}}
											>
												+
											</button>
										</div>
									</div>
								</div>
								<div className="count--box marginTop">
									<div className="count">
										<div className="text">팀당 멤버 수</div>
										<div className="countBar">
											<button
												className="sign"
												// onClick={() => {
												// 	teamCount < 1 ? 0 : setTeamCount(teamCount - 1);
												// }}
											>
												-
											</button>
											<input
												className="number"
												value={teamCount}
												onChange={e =>
													setTeamPeopleCount(Number(e.target.value))
												}
												type="number"
											/>
											<button
												className="sign"
												// onClick={() => {
												// 	setTeamCount(teamCount + 1);
												// }}
											>
												+
											</button>
										</div>
									</div>
								</div>
							</>
						)}
					</div>

					{/*************** 리그 신청 기간 ***************/}
					<div className="applyDateBox">
						<div className="tab--title">리그 신청 기간 수정</div>
						<div className="calendar">
							<img src={calendar} />
							<div className="dateBox1">
								<div className="from">
									{openCalendar ? (
										<>
											<Calendar
												className="calendarBorad"
												onChange={date => {
													setFromDate(date);
													setFromDateDummy(date);
												}}
												// defaultValue={fromDate}
											/>
											<div
												className="closeBord"
												onClick={() => setOpenCalendar(!openCalendar)}
											/>
										</>
									) : (
										''
									)}
									{openHoursFrom ? (
										<>
											<div className="timeBord">
												{step1Time.map((item, index) => {
													return (
														<div
															className="time"
															key={index}
															onClick={() => {
																setFromHours(item);
																setFromHoursDummy(item);
																setOpenHoursFrom(!openHoursFrom);
															}}
														>
															{item.time}
														</div>
													);
												})}
											</div>
											<div
												className="closeBord"
												onClick={() => setOpenHoursFrom(!openHoursFrom)}
											/>
										</>
									) : (
										''
									)}
									<button
										className="dayBox"
										onClick={() => {
											setOpenCalendar(!openCalendar);
										}}
									>
										{/* {`${fromDate.getFullYear()}년 ${fromDate.getMonth() +
													1}월 ${fromDate.getDate()}일`} */}
										{insertLeagueInfo.apply_start === undefined ||
										(insertLeagueInfo.apply_start &&
											insertLeagueInfo.apply_start.substring(0, 1) === 'N') ? (
											<>
												{`${fromDateDummy.getFullYear()}년 ${fromDateDummy.getMonth() +
													1}월 ${fromDateDummy.getDate()}일`}
											</>
										) : (
											<>
												{`${fromDate.getFullYear()}년 ${fromDate.getMonth() +
													1}월 ${fromDate.getDate()}일`}
											</>
										)}
									</button>
									<button
										className="hoursBox"
										onClick={() => setOpenHoursFrom(!openHoursFrom)}
									>
										{!!fromHoursDummy ? (
											<>{fromHoursDummy.time}</>
										) : (
											<>{makeTimeValu(insertLeagueInfo.apply_start).time}</>
										)}
									</button>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 부터
								</div>
								<div className="by">
									{openCalendarBy ? (
										<>
											<Calendar
												className="calendarBorad"
												onChange={date => {
													setByDate(date);
													setByDateDummy(date);
												}}
												// defaultValue={byDate}
											/>
											<div
												className="closeBord"
												onClick={() => setOpenCalendarBy(!openCalendarBy)}
											/>
										</>
									) : (
										''
									)}
									{openHoursBy ? (
										<>
											<div className="timeBord">
												{step1Time.map((item, index) => {
													return (
														<div
															className="time"
															key={index}
															onClick={() => {
																setByHours(item);
																setByHoursDummy(item);
																setOpenHoursBy(!openHoursBy);
															}}
														>
															{item.time}
														</div>
													);
												})}
											</div>
											<div
												className="closeBord"
												onClick={() => setOpenHoursBy(!openHoursBy)}
											/>
										</>
									) : (
										''
									)}
									<div className="bar" />
									<button
										className="dayBox"
										onClick={() => {
											setOpenCalendarBy(!openCalendarBy);
										}}
									>
										{insertLeagueInfo.apply_end === undefined ||
										(insertLeagueInfo.apply_end &&
											insertLeagueInfo.apply_end.substring(0, 1) === 'N') ? (
											<>
												{`${byDateDummy.getFullYear()}년 ${byDateDummy.getMonth() +
													1}월 ${byDateDummy.getDate()}일`}
											</>
										) : (
											<>
												{`${byDate.getFullYear()}년 ${byDate.getMonth() +
													1}월 ${byDate.getDate()}일`}
											</>
										)}
									</button>
									<button
										className="hoursBox"
										onClick={() => setOpenHoursBy(!openHoursBy)}
									>
										{!!byHoursDummy ? (
											<>{byHoursDummy.time}</>
										) : (
											<>{makeTimeValu(insertLeagueInfo.apply_end).time}</>
										)}
									</button>
								</div>
							</div>
						</div>
					</div>

					{/***************** 리그시작 일자 *****************/}
					<div className="applyDateBox">
						<div className="tab--title">리그 시작 일자 수정</div>
						<div className="calendar">
							<img src={calendar} />
							<div className="dateBox1">
								<div className="from">
									{openCalendarStartDate ? (
										<>
											<Calendar
												className="calendarBorad"
												onChange={date => {
													setStartDate(date);
													setStartDateDummy(date);
												}}
												// defaultValue={startDate}
											/>
											<div
												className="closeBord"
												onClick={() =>
													setOpenCalendarStartDate(!openCalendarStartDate)
												}
											/>
										</>
									) : (
										''
									)}
									{openHoursStart ? (
										<>
											<div className="timeBord">
												{step1Time.map((item, index) => {
													return (
														<div
															className="time"
															key={index}
															onClick={() => {
																setStartHours(item);
																setStartHoursDummy(item);
																setOpenHoursStart(!openHoursStart);
															}}
														>
															{item.time}
														</div>
													);
												})}
											</div>
											<div
												className="closeBord"
												onClick={() => setOpenHoursStart(!openHoursStart)}
											/>
										</>
									) : (
										''
									)}
									<button
										className="dayBox"
										onClick={() => {
											setOpenCalendarStartDate(!openCalendarStartDate);
										}}
									>
										{insertLeagueInfo.start_date === undefined ||
										(insertLeagueInfo.start_date &&
											insertLeagueInfo.start_date.substring(0, 1) === 'N') ? (
											<>
												{`${startDateDummy.getFullYear()}년 ${startDateDummy.getMonth() +
													1}월 ${startDateDummy.getDate()}일`}
											</>
										) : (
											<>
												{`${startDate.getFullYear()}년 ${startDate.getMonth() +
													1}월 ${startDate.getDate()}일`}
											</>
										)}
									</button>
									<button
										className="hoursBox"
										onClick={() => setOpenHoursStart(!openHoursStart)}
									>
										{!!startHoursDummy ? (
											<>{startHoursDummy.time}</>
										) : (
											<>{makeTimeValu(insertLeagueInfo.start_date).time}</>
										)}
									</button>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 시작
								</div>
							</div>
						</div>
					</div>
					<div className="consumption">
						<img className="grayPathImg" src={grayPath} />
						참여 시 티켓 <strong>{insertLeagueInfo.join_pass}</strong>개 소모
					</div>
				</div>
			</div>
			<div className="editor">
				<div className="edirot__title">소개</div>
				<FroalaEditor editorValue={e => setEditor(e)} editor={editor} />
			</div>
			<div className="btn--box">
				<button
					type="button"
					onClick={() => {
						isUpdateLeague();
					}}
				>
					적용
				</button>
			</div>
			<div className={`box__alert${revise ? ' alert' : ''}`}>
				<strong>적용 되었습니다.</strong>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return { isSuccess: state.layout.isSuccess };
};

const mapDispatchToProps = dispatch => {
	return {
		changeSuccess: result => dispatch(changeSuccess(result)),
		getSelectLeagueInfo: leagueId => dispatch(getSelectLeagueInfo(leagueId)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LeagueManageMentInfo);
