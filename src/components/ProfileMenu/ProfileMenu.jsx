import React from 'react';
import './ProfileMenu.scss';
import Title from '../Title/Title';
import Media from 'react-media';

const ProfileMenu = ({ menus, menu, onClick, profileSubMenu }) => {
	return (
		<div className="ProfileMenu">
			<Media query={{ minWidth: 769 }}>
				{matches =>
					matches && (
						<div className="ProfileMenu--title">
							<Title border="thick" size="large" className={'title'}>
								나의 계정
							</Title>
						</div>
					)
				}
			</Media>
			<ul className="ProfileMenu--list">
				{menus.map((item, idx) => {
					return (
						<li
							className={
								profileSubMenu === item.key ? 'ProfileMenu--list__item' : null
							}
							key={idx}
							onClick={() => onClick(item.key)}
						>
							{item.name}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ProfileMenu;
