import React, { useEffect } from 'react';
import { ReactComponent as Person } from '../../static/images/MyPage/Person.svg';
import { ReactComponent as Inquirey } from '../../static/images/MyPage/Inquirey.svg';
import { ReactComponent as Exit } from '../../static/images/MyPage/Exit.svg';

import { useHistory } from 'react-router-dom';
import './ModalBullon.scss';

const ModalBullon = ({
	visible,
	changeMenu,
	signOut,
	setMenuOpen,
	changeProfileSubMenu,
	sessionKey,
	// userInfo,
}) => {
	let history = useHistory();

	const menuList = [
		{
			id: 1,
			name: '마이페이지',
			key: 'profile',
			functions: () => {
				history.push('/');
				changeProfileSubMenu('account');
				setMenuOpen(false);
				changeMenu('profile');
			},
		},
		{
			id: 2,
			name: '1:1 문의하기',
			key: 'inquiry',
			functions: () => {
				history.push('/');
				setMenuOpen(false);
				changeProfileSubMenu('inquiry');
				changeMenu('profile');
			},
		},
		{
			id: 3,
			name: '로그아웃',
			key: 'login',
			functions: () => {
				setMenuOpen(false);
				signOut();
				history.push('/');
				changeMenu('login');
				localStorage.removeItem('data');
				localStorage.removeItem('data2');
				localStorage.clear();
			},
		},
	];
	return (
		<div
			className="ModalBullon"
			style={{ display: visible ? 'inherit' : 'none' }}
		>
			<ul>
				{menuList.map(item => {
					return (
						<li key={item.id} onClick={() => item.functions()}>
							{item.key === 'profile' && <Person className="LOGO" />}
							{item.key === 'inquiry' && <Inquirey className="LOGO" />}
							{item.key === 'login' && <Exit className="LOGO" />}
							{item.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ModalBullon;
