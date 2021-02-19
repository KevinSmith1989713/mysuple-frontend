import React, { useState, useEffect } from 'react';

import Button from '../../../components/Button/Button';

import myInfoPath from '../../../static/images/MobileMenu/mobileMenuImg2.svg';
import closeBtnGray from '../../../static/images/closeBtnGray.svg';

import './LeagueSupportModal.scss';

const selectPathInfo = [
	{ text: '패스 1장', value: 1 },
	{ text: '패스 10장', value: 10 },
	{ text: '패스 100장', value: 100 },
	{ text: '패스 1000장', value: 1000 },
];

const dummyUsetdata = [
	{ name: 12 },
	{ name: 34 },
	{ name: 56 },
	{ name: 78 },
	{ name: 99 },
];

const LeagueSupportModal = ({ supportModal, setSupportModal, passCount }) => {
	const [flag, setFlag] = useState(false);

	const [selectType, setSelectType] = useState('league');
	const [pathCount, setPathCount] = useState(0);
	const [selectUser, setSelectUser] = useState('');
	const [userTabpanel, setUserTabpanel] = useState('');

	const selectPath = e => {
		setPathCount(pathCount + e.value);
	};

	const numberWithCommas = x => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	useEffect(() => {}, [flag]);

	return (
		<div className="support--container">
			<div
				className="background"
				onClick={() => setSupportModal(!supportModal)}
			/>
			<article className="support--box">
				<div className="title--box">
					<h1>후원 하기</h1>
					<button type="button">
						<img
							className="closeBtn"
							src={closeBtnGray}
							onClick={() => setSupportModal(!supportModal)}
						/>
					</button>
				</div>
				<header className="select--box" role="tab-list">
					<button
						role="tab"
						id="tab-1"
						tabIndex={selectType === 'league' ? '0' : '-1'}
						aria-controls="panel-1"
						aria-selected={selectType ? 'league' : 'player'}
						type="button"
						className={selectType === 'league' ? 'tag select' : 'tag'}
						onClick={() => {
							setSelectType('league');
							setSelectUser('');
							setPathCount(0);
						}}
					>
						리그에 후원하기
					</button>
					<button
						role="tab"
						id="tab-2"
						tabIndex={selectType === 'player' ? '-1' : '0'}
						aria-controls="panel-2"
						aria-selected={selectType ? 'player' : 'league'}
						type="button"
						className={selectType === 'player' ? 'tag select' : 'tag '}
						onClick={() => {
							setSelectType('player');
							setPathCount(0);
						}}
					>
						플레이어에게 후원하기
					</button>
				</header>
				{selectType === 'player' && (
					<div
						className="supportPlayer--box"
						id="panel-2"
						aria-labelledby="tab-2"
						tabIndex="0"
					>
						<div className="user--box" role="tap--list">
							<p className="user__count">
								참여자 <b>{dummyUsetdata.length}</b>
							</p>
							{dummyUsetdata.map((item, index) => {
								return (
									<button
										type="button"
										key={index}
										role="tap"
										id={`tab-${item.name}`}
										aria-controls={item.name}
										aria-selected={item.name && true}
										onClick={() => {
											setSelectUser(item.name);
											setUserTabpanel(item.name);
										}}
									>
										<img className="userImg" src={myInfoPath} alt="userImg" />
										{item.name}
									</button>
								);
							})}
						</div>
						{selectUser && (
							<div
								className="select__user"
								id={userTabpanel}
								tabIndex="0"
								role="tabpanel"
								aria-labelledby={`tab-${userTabpanel}`}
							>
								<img className="userImg" src={myInfoPath} alt="userImg" />
								{selectUser}
							</div>
						)}
					</div>
				)}
				<div
					id="panel-1"
					aria-labelledby="tab-1"
					tabIndex="1"
					className="supportLeague--box"
				>
					<div className="myPath--box">
						<div className="inner--box">
							<img className="pathImg" src={myInfoPath} alt="path" />
							나의 보유 패스
						</div>
						<div className="inner--box">
							<b>{passCount}</b>개
						</div>
					</div>
					<div className="select__path--box" role="tap-list">
						{selectPathInfo.map((item, index) => {
							return (
								<button
									className="path"
									key={index}
									type="button"
									role="tap"
									aria-selected={item.text && true}
									onClick={() => {
										selectPath(item);
									}}
								>
									<img className="myPathImg" src={myInfoPath} alt="path" />{' '}
									{item.text}
								</button>
							);
						})}
					</div>
					<div className="total--box">
						<b>TOTAL</b>
						{pathCount > 0 && (
							<div className="count">
								x {numberWithCommas(pathCount)}{' '}
								<button
									type="button"
									onClick={() => {
										setPathCount(0);
									}}
								>
									x
								</button>
							</div>
						)}
					</div>
					<Button size="medium" className="btn">
						후원하기
					</Button>
				</div>
			</article>
		</div>
	);
};

export default LeagueSupportModal;
