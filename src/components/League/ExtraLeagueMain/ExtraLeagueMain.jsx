import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { resetExtra } from '../../../store/League/League.store';

import Select from 'react-select';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import Button from '../../Button/Button';
import { system, questionAnswer } from '../../../assets/dummyData/AuthData';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import more from '../../../static/images/moreBtn.svg';
import question from '../../../static/images/League/question.svg';
import { makeGroup } from '../../../Utils/func';

import './ExtraLeagueMain.scss';

const ExtraLeagueMain = ({
	totalRound,
	extraModalMain,
	setExtraModalMain,
	participantsList,
	extraList,
	resetExtra,
	selectModal,
	setSelectModal,
	stage2,
	setModeMain,
	flag,
	setFlag,
	insertLeagueInfo,
	leagueTeamListRedux,
}) => {
	// const [flag, setFlag] = useState(false);
	useEffect(() => {}, [flag]);

	const isSelect = info => {
		const itemToFind = extraList.find(function(item) {
			return item.nickname === info.nickname;
		});
		const idx = extraList.indexOf(itemToFind);
		if (idx > -1) {
			extraList.splice(idx, 1);
		} else {
			extraList.push({ nickname: info && info.nickname, score: 0 });
		}
		setFlag(!flag);
	};

	const selectExtraList = extraList.map(item => {
		return item.nickname;
	});
	const teamList =
		leagueTeamListRedux.teams &&
		leagueTeamListRedux.teams.map(item => {
			return { nickname: item.team_name };
		});
	const isNext = () => {
		stage2 === null
			? ''
			: stage2[stage2.length - 1].layout_type === 2
			? setModeMain('DE')
			: setModeMain('TO'),
			setSelectModal(!selectModal);
		setFlag(!flag);
	};

	return (
		<div className="modal--box extra">
			<div className="modal__title">
				<h1>{totalRound !== undefined ? '추가 대진표 작성' : '대진표 작성'}</h1>
				<button>
					<img
						className="closeBtn"
						src={closeBtnGray}
						onClick={() => {
							setExtraModalMain(!extraModalMain);
							resetExtra();
						}}
					/>
				</button>
			</div>
			<div className="extra__text">
				추가 리그에 참가할 참여자를 선택해주세요
			</div>
			<div className="userList--box">
				<div className="user--box">
					<div className="nickname--box">
						<div className="checkBox" />
						<div className="nickname textBold ">
							참여자 <b>{extraList.length}</b>
						</div>
					</div>
				</div>
				{(insertLeagueInfo.league_type === 1 ? teamList : participantsList).map(
					(item, idx) => {
						// console.log(item);
						return (
							<div className="user--box" key={idx}>
								<div className="nickname--box">
									<div
										className={
											selectExtraList.indexOf(item.nickname) > -1
												? 'checkBox checked'
												: 'checkBox'
										}
										onClick={() => isSelect(item)}
									/>
									<div className="nickname">{item.nickname}</div>
								</div>
							</div>
						);
					},
				)}
			</div>
			<button className="extra__btn" onClick={() => isNext()}>
				다음
			</button>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		resetExtra: () => dispatch(resetExtra()),
	};
};

export default connect(null, mapDispatchToProps)(ExtraLeagueMain);
