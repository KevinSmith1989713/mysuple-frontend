import React, { useState, useEffect } from 'react';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import Pagination from '../../Pagination/Pagination';
import swal from 'sweetalert';

import './TemporaryModal.scss';

const TemporaryModal = ({
	temporayModal,
	openTemporaryModal,
	getLeagueTemporaryList,
	leagueTemporaryList,
	selectLeagueTemporary,
	deleteLeagueTemporary,
	hostLeagueList,
	getHostLeagueList,
	getSelectLeagueInfo,
}) => {
	const [type, setType] = useState('temporary');
	const [paging, setPaging] = useState(1);
	const perPage = 5;
	const [deleteState, setDeleteState] = useState(false);

	const deleteTempLeague = e => {
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
				deleteLeagueTemporary(e.league_id);
				setDeleteState(!deleteState);
			}
		});
	};

	useEffect(() => {
		getLeagueTemporaryList();
	}, [deleteState]);

	useEffect(() => {
		getHostLeagueList();
	}, []);
	
	return (
		<div className="TemporaryModal">
			<div className="modal--container">
				<button
					type="button"
					className="background"
					onClick={() => openTemporaryModal(!temporayModal)}
				/>
				<article className="modal--box">
					<div className="modal__title">
						<h1>
							{type === 'temporary' && '임시저장'}
							{type === 'history' && '개최한 리그'}
						</h1>
						<button type="button">
							<img
								className="closeBtn"
								src={closeBtnGray}
								onClick={() => openTemporaryModal(!temporayModal)}
							/>
						</button>
					</div>
					<div className="type__button--box">
						{/* <button
							type="button"
							className={
								type === 'temporary' ? 'type__button select' : 'type__button'
							}
							onClick={() => {
								setType('temporary');
								setPaging(1);
							}}
						>
							임시저장
						</button> */}
						<button
							type="button"
							className={
								type === 'history' ? 'type__button select' : 'type__button'
							}
							onClick={() => {
								setType('history');
								setPaging(1);
							}}
						>
							개최한 리그
						</button>
					</div>
					{type === 'temporary' && (
						<ul className="modal--inner">
							{leagueTemporaryList.length > 0
								? leagueTemporaryList.map((item, index) => {
										return (
											index >= paging * perPage - perPage &&
											index < paging * perPage && (
												<li className="list" key={index}>
													<button
														className="selectList"
														type="button"
														onClick={() => {
															selectLeagueTemporary(item.league_id);
															openTemporaryModal(!temporayModal);
														}}
													>
														<h2>{item.league_title}</h2>
														<b>{item.updatedAt.substring(0, 10)}</b>
													</button>
													<button
														type="button"
														onClick={() => deleteTempLeague(item)}
													>
														<img className="listCloseBtn" src={closeBtnGray} />
													</button>
												</li>
											)
										);
								  })
								: ''}
							<div className="page--box">
								{leagueTemporaryList.length > 0 && (
									<Pagination
										perPage={perPage}
										status={paging}
										listCnt={leagueTemporaryList.length}
										changePage={page => setPaging(page)}
									/>
								)}
							</div>
						</ul>
					)}
					{type === 'history' && (
						<ul className="modal--inner">
							{hostLeagueList.length > 0
								? hostLeagueList.map((item, index) => {
										return (
											index >= paging * perPage - perPage &&
											index < paging * perPage && (
												<li className="list" key={index}>
													<button
														className="selectList"
														type="button"
														onClick={() => {
															getSelectLeagueInfo(item.league_id);
															openTemporaryModal(!temporayModal);
														}}
													>
														<h2>{item.league_title}</h2>
														<b>{item.start_date.substring(0, 10)}</b>
													</button>
													{/* <button
														type="button"
														onClick={() => deleteTempLeague(item)}
													>
														<img className="listCloseBtn" src={closeBtnGray} />
													</button> */}
												</li>
											)
										);
								  })
								: ''}
							<div className="page--box">
								{hostLeagueList.length > 0 && (
									<Pagination
										perPage={perPage}
										status={paging}
										listCnt={hostLeagueList.length}
										changePage={page => setPaging(page)}
									/>
								)}
							</div>
						</ul>
					)}
				</article>
			</div>
		</div>
	);
};

export default TemporaryModal;
