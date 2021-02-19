import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

import ReviseModal from '../../../components/ReviseModal/ReviseModal';

import {
	getHostLeagueList,
	getParticipatList,
	joinLeagueCancel,
} from '../../../store/League/League.store';
import myInfoPath from '../../../static/images/MobileMenu/mobileMenuImg2.svg';
import enterImg from '../../../static/images/MyPage/enter.svg';

import './MyLeague.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const MyLeague = ({
	getHostLeagueList,
	hostLeagueList,
	getParticipatList,
	participatList,
	joinLeagueCancel,
	successState,
}) => {
	let history = useHistory();
	const [leagueStatus, setLeagueStatus] = useState('participatingLeague');
	const [attendModal, setAttendModal] = useState(false);
	const [leagueType, setLeageuTyep] = useState(null);
	const [leagueId, setLeagueId] = useState(null);
	

	useEffect(() => {
		getHostLeagueList();
	}, []);

	useEffect(() => {
		getParticipatList();
	}, []);

	const isDelete = item => {
		swal({
			text: '취소하시겠습니까?',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then(willDelete => {
			if (willDelete) {
				swal('취소되었습니다.', {
					icon: 'success',
				});
				joinLeagueCancel(null, item.league_id, item.league_join_id);
			}
		});
	};

	return (
		<div className="MyLeague">
			<div className="myStatusContainer">
				<div className="innerBox--box">
					<div className="innerBox">
						<div className="text">
							<img className="img" src={myInfoPath} />총 참가리그
						</div>
						<div className="text">
							<b>{participatList.length}</b>개
						</div>
					</div>
					<div className="innerBox">
						<div className="text">
							<img className="img" src={myInfoPath} />총 주최리그
						</div>
						<div className="text">
							<b>{hostLeagueList && hostLeagueList.length}</b>개
						</div>
					</div>
				</div>
				<div className="innerBox">
					<button className="button">리그 바로가기</button>
				</div>
			</div>
			<div className="contantsContainer">
				<div className="title--box">
					<button
						className={
							leagueStatus === 'participatingLeague' ? 'title' : 'title white'
						}
						onClick={() => setLeagueStatus('participatingLeague')}
					>
						참가리그
					</button>
					<button
						className={leagueStatus === 'hostLeague' ? 'title' : 'title white'}
						onClick={() => setLeagueStatus('hostLeague')}
					>
						주최리그
					</button>
					{/* <button
						className={
							leagueStatus === 'sponsorLeague' ? 'title' : 'title white'
						}
						onClick={() => setLeagueStatus('sponsorLeague')}
					>
						후원리그
					</button> */}
				</div>
				{leagueStatus === 'participatingLeague' && (
					<React.Fragment>
						{participatList.reverse().map((item, index) => {
							return (
								<div className="contants participant" key={index}>
									<div className="state__box">
										<div
											className={
												item.join_type === 1
													? 'participant__state'
													: 'participant__state wating'
											}
										>
											{item.join_type === 1 ? '참가자' : '대기자'}
										</div>
										<div className="tag__info">
											<div className="title">{item.league_title}</div>
											<div className="date">
												{item.start_date.substring(0, 10).replace(/-/g, '.')}
											</div>
										</div>
									</div>
									<div className="btn--box">
										<button
											type="button"
											className="participant__btn"
											onClick={() => {
												setAttendModal(!attendModal);
												setLeageuTyep(item.join_pass);
												setLeagueId(item.league_id);
											}}
										>
											정보 수정
										</button>
										<button
											type="button"
											className="participant__btn"
											onClick={() => {
												isDelete(item);
											}}
										>
											참여 취소
										</button>
									</div>
								</div>
							);
						})}
					</React.Fragment>
				)}
				{/***** 주최리그 *****/}
				{leagueStatus === 'hostLeague' && (
					<React.Fragment>
						<div className="contantsHeader">
							<div className="dateTitle">날짜</div>
							<div className="leagueNameTitle">리그명</div>
							<div className="leagueKindsTitle">리그종류</div>
							<div className="applicationPeriodTitle">모집기간</div>
							<div className="management">관리</div>
						</div>
						{hostLeagueList.reverse().map((item, index) => {
							return (
								<div className="contants" key={index}>
									<div className="date">{item.start_date.substring(0, 10)}</div>
									<div className="leagueName">{item.league_title}</div>
									<div className="leagueKinds">
										{item.join_pass <= 0 ? '미니리그' : '유료리그'}
									</div>
									<div className="applicationPeriod">
										{`${item.apply_start
											.substring(0, 10)
											.replace(/-/g, '.')} ~ ${item.apply_end
											.substring(0, 10)
											.replace(/-/g, '.')}`}
									</div>
									<button
										type="button"
										onClick={() => {
											history.push(
												`/leagueManage/${item.league_id}/participantManage`,
											);
										}}
									>
										<img className="enterImg" src={enterImg} />
									</button>
								</div>
							);
						})}
					</React.Fragment>
				)}
				{leagueStatus === 'sponsorLeague' && (
					<React.Fragment>
						<div className="contantsHeader">
							<div className="sponsorDateTitle">후원날짜</div>
							<div className="leagueNameTitle sponsor">리그명</div>
							<div className="sponsorshipPathTitle">후원패스 개수</div>
						</div>
						{participationList.map((item, index) => {
							return (
								<div className="contants" key={index}>
									<div className="date">{item.date}</div>
									<div className="leagueName sponsor">{item.leagueName}</div>
									<div className="sponsorshipPath">1</div>
								</div>
							);
						})}
					</React.Fragment>
				)}
				{attendModal ? (
					<ReviseModal
						attendModal={attendModal}
						setAttendModal={setAttendModal}
						leagueType={leagueType}
						leagueId={leagueId}
					/>
				) : (
					''
				)}
				<div className={`box__alert${successState ? ' alert' : ''}`}>
					<strong>수정 되었습니다.</strong>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		hostLeagueList: state.league.hostLeagueList,
		participatList: state.league.participatList,
		successState: state.layout.successState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getParticipatList: () => dispatch(getParticipatList()),
		getHostLeagueList: () => dispatch(getHostLeagueList()),
		joinLeagueCancel: (id, league_id, league_join_id) =>
			dispatch(joinLeagueCancel(id, league_id, league_join_id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLeague);


