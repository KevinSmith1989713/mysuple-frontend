import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import {
	changeMenu,
	changeProfileSubMenu,
} from '../../../store/Layout/Layout.store';
import { getLeagueTeamList } from '../../../store/League/League.store';

import LeagueBanner from '../../../components/League/LeagueBanner/LeagueBanner';
import JoinModal from '../../../components/League/JoinModal/JoinModal';
import LeagueTable from '../../../components/League/LeagueTable/LeagueTable';
import LeagueComment from '../../../components/League/LeagueComment/LeagueComment';
import LeagueShareModal from '../../../components/League/LeagueShareModal/LeagueShareModal';
import LeagueSupportModal from '../../../components/League/LeagueSupportModal/LeagueSupportModal';

import Title from '../../../components/Title/Title';
import Button from '../../../components/Button/Button';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import question from '../../../static/images/League/question.svg';
import heart from '../../../static/images/League/heart.svg';
import leagueJoinImg from '../../../static/images/League/leagueJoin.svg';

import share from '../../../static/images/League/share-social.svg';

import './LeaguePageContainer.scss';
const getUserInfo = JSON.parse(localStorage.getItem('data'));

const LeaguePageContainer = ({
	insertLeagueInfo,
	getSelectLeagueInfo,
	joinLeague,
	makeLeagueTeam,
	getLeagueTeamList,
	leagueTeamListRedux,
	insertLeagueComments,
	getLeaguecommentsList,
	leagueCommentsList,
	deleteLeagueComments,
	updateLeagueComments,
	leagueRecruitList,
	leagueJoinState,
	joinLeagueState,
	recruitTeam,
	getParticipants,
	leagueParticipantsList,
	makeGame,
	getLeagueNoticeList,
	selectLeagueNotice,
	leagueNoticeList,
	crewState,
	passCount,
	insertPass,
	getPassCount,
	getParticipantsList,
	participantsList,
	changeMenu,
	changeProfileSubMenu,
}) => {
	const [attendModal, setAttendModal] = useState(false);
	const [shareModal, setShareModal] = useState(false);
	const [supportModal, setSupportModal] = useState(false);
	const [flag, setFlag] = useState(false);
	const [payModal, setPayModal] = useState(false);
	const startDate = insertLeagueInfo.start_date;
	let history = useHistory();

	useEffect(() => {
		getSelectLeagueInfo(Number(window.location.pathname.substring(8)));
		window.scrollTo({ top: 0 });
		getParticipantsList(
			getUserInfo === null ? '' : getUserInfo.id,
			window.location.pathname.split('/')[2],
			'confirmed',
		);
		getLeaguecommentsList(Number(window.location.pathname.substring(8)));
	}, []);

	useEffect(() => {
		getParticipants(Number(window.location.pathname.substring(8)));
	}, [flag]);

	const checkId = () => {
		const result = leagueParticipantsList.map(item => {
			return item.nickname;
		});
		const idx = result.indexOf(getUserInfo.nickName);
		return idx;
	};

	return (
		<div className="LeaguePageContainer">
			<div className="wjr">
				<Title border="thick" size="large">
					리그
				</Title>
				{/* <img className="questionImg" src={question} /> */}
				<div className="hoverBox">
					{/* <div className="bord"> */}
					{/* <img src={question} /> */}
					{/* </div> */}
				</div>
			</div>
			<div className="LeaguePageContainer--Banner">
				<LeagueBanner
					insertLeagueInfo={insertLeagueInfo}
					attendModal={attendModal}
					setAttendModal={setAttendModal}
					shareModal={shareModal}
					setShareModal={setShareModal}
					supportModal={supportModal}
					setSupportModal={setSupportModal}
					leagueParticipantsList={leagueParticipantsList}
				/>
			</div>
			<div className="LeaguePageContainer--LeagueInfo">
				<LeagueTable
					insertLeagueInfo={insertLeagueInfo}
					leagueRecruitList={leagueRecruitList}
					recruitTeam={recruitTeam}
					getParticipants={getParticipants}
					leagueParticipantsList={leagueParticipantsList}
					makeGame={makeGame}
					getLeagueNoticeList={getLeagueNoticeList}
					selectLeagueNotice={selectLeagueNotice}
					leagueNoticeList={leagueNoticeList}
					crewState={crewState}
					getParticipantsList={getParticipantsList}
					participantsList={participantsList}
					leagueTeamListRedux={leagueTeamListRedux}
					getLeagueTeamList={getLeagueTeamList}
				/>
			</div>
			<div className="LeaguePageContainer--Comments">
				<LeagueComment
					insertLeagueComments={insertLeagueComments}
					leagueCommentsList={leagueCommentsList}
					deleteLeagueComments={deleteLeagueComments}
					updateLeagueComments={updateLeagueComments}
				/>
			</div>
			<Media query={{ maxWidth: 768 }}>
				<div className="LeaguePageContainerMobile">
					<header>
						<button className="backBtn" onClick={() => history.push('/league')}>
							{'<'}
						</button>
						<h1 className="title">리그</h1>
						<button>
							<img className="heartImg" src={heart} alt="하트" />
						</button>
					</header>
					<LeagueBanner
						insertLeagueInfo={insertLeagueInfo}
						leagueParticipantsList={leagueParticipantsList}
					/>
					<LeagueTable
						insertLeagueInfo={insertLeagueInfo}
						leagueRecruitList={leagueRecruitList}
						recruitTeam={recruitTeam}
						getParticipants={getParticipants}
						leagueParticipantsList={leagueParticipantsList}
						makeGame={makeGame}
						getLeagueNoticeList={getLeagueNoticeList}
						selectLeagueNotice={selectLeagueNotice}
						leagueNoticeList={leagueNoticeList}
						crewState={crewState}
						getLeagueTeamList={getLeagueTeamList}
					/>
					<div className="LeagueComment">
						<LeagueComment
							insertLeagueComments={insertLeagueComments}
							leagueCommentsList={leagueCommentsList}
							deleteLeagueComments={deleteLeagueComments}
							updateLeagueComments={updateLeagueComments}
						/>
					</div>
					<div className="share__btn--box">
						<button
							className="shareBtn"
							type="button"
							onClick={() => setShareModal(!shareModal)}
						>
							<img className="shareImg" src={share} />
						</button>
						<button
							className="joinBtn"
							onClick={() => {
								if (getUserInfo === null) {
									alert('로그인 후, 이용할 수 있습니다.');
								} else if (
									getUserInfo === null ? '' : getUserInfo.certified === null
								) {
									alert('본인인증이 필요합니다.');
									changeProfileSubMenu('account');
									changeMenu('profile');
									history.push('/');
								} else if (
									new Date() < new Date(insertLeagueInfo.apply_start) ||
									new Date() > new Date(insertLeagueInfo.apply_end) ||
									new Date() > new Date(insertLeagueInfo.start_date)
								) {
									alert('모집기간이 아닙니다.');
								} else if (checkId() > -1) {
									alert('이미 참가 되었습니다. ');
								} else {
									setAttendModal(!attendModal);
								}
							}}
						>
							참가하기
						</button>
					</div>
				</div>
			</Media>
			{attendModal && (
				<>
					<JoinModal
						attendModal={attendModal}
						setAttendModal={() => setAttendModal()}
						insertLeagueInfo={insertLeagueInfo}
						joinLeague={joinLeague}
						makeLeagueTeam={makeLeagueTeam}
						getLeagueTeamList={getLeagueTeamList}
						leagueTeamListRedux={leagueTeamListRedux}
						passCount={passCount}
						payModal={payModal}
						setPayModal={setPayModal}
						insertPass={insertPass}
						getPassCount={getPassCount}
					/>
				</>
			)}
			{shareModal && (
				<>
					<LeagueShareModal
						shareModal={shareModal}
						setShareModal={setShareModal}
						insertLeagueInfo={insertLeagueInfo}
					/>
				</>
			)}
			{supportModal && (
				<>
					<LeagueSupportModal
						supportModal={supportModal}
						setSupportModal={setSupportModal}
						passCount={passCount}
					/>
				</>
			)}

			{payModal ? (
				<div className="modal--container">
					<div className="background" onClick={() => setPayModal(!payModal)} />
					<article className="modal--box">
						<div className="modal__title">
							<h1>리그 참가</h1>
							<button>
								<img
									className="closeBtn"
									src={closeBtnGray}
									onClick={() => setPayModal(!payModal)}
								/>
							</button>
						</div>
						<div className="modal--inner">
							<b>{insertLeagueInfo.join_pass - passCount}</b> 개의 티켓이 추가로
							필요합니다.
							<br /> 결제하시겠습니까?
						</div>
						<Button
							className="modalBtn"
							size="medium"
							onClick={() => history.push('/pay')}
						>
							결제하기
						</Button>
					</article>
				</div>
			) : (
				''
			)}

			{/* <div className="modal--container">
						<div className="background">s</div>
						<article className="modal--box">
							<div className="modal__title">
								<h1>리그 참가</h1>
								<button>
									<img
										className="closeBtn"
										src={closeBtnGray}
										// onClick={() => setAttendModal(!attendModal)}
									/>
								</button>
							</div>
							<div className="modal--inner">
								패스가 결제 되었습니다.
								<br />
								리그 참여가 완료되었습니다.
							</div>
						</article>
					</div> */}
			{leagueJoinState && (
				<div className="modal--container">
					<div
						className="background"
						onClick={() => {
							joinLeagueState(false);
							setFlag(!flag);
						}}
					/>
					<article className="modal--box">
						<div className="modal__title">
							<h1>리그 참가</h1>
							<button>
								<img
									className="closeBtn"
									src={closeBtnGray}
									onClick={() => {
										joinLeagueState(false);
										setFlag(!flag);
									}}
								/>
							</button>
						</div>
						<div className="modal--inner join">
							<img src={leagueJoinImg} alt="joinImg" />
							<div className="join__text">
								<b>{`'${insertLeagueInfo.league_title}'`}</b> 에 참가되었습니다!
								<p>{`시작일시 ${startDate.substring(0, 4)}년 ${
									startDate.substring(5, 7)[0] === '0'
										? startDate.substring(5, 7)[1]
										: startDate.substring(5, 7)
								}월 ${
									startDate.substring(8, 10)[0] === '0'
										? startDate.substring(8, 10)[1]
										: startDate.substring(8, 10)
								}일 ${startDate.substring(11, 13) >= 12 ? 'PM' : 'AM'} ${
									startDate.substring(11, 16)[0] === '0'
										? startDate.substring(12, 16)
										: startDate.substring(11, 16)
								}`}</p>
							</div>
							<Link to={'/league'}>
								<Button
									className="join__btn"
									size="medium"
									onClick={() => joinLeagueState(false)}
								>
									리그 홈으로
								</Button>
							</Link>
							<Button className="join__btn" size="medium" color="gray">
								참여 내역 보기
							</Button>
						</div>
					</article>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		changeProfileSubMenu: menu => dispatch(changeProfileSubMenu(menu)),
		changeMenu: menu => dispatch(changeMenu(menu)),
		getLeagueTeamList: (id, leagueId, complete) =>
			dispatch(getLeagueTeamList(id, leagueId, complete)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LeaguePageContainer);
