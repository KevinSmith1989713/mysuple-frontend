import React from 'react';
import './ProfileTitle.scss';

const ProfileTitle = ({ children, sub }) => {
	return (
		<div className="ProfileTitle">
			{children}
		</div>);
};

export default ProfileTitle;
