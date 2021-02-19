import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import './CommunitySettingHeader.scss';

const CommunitySettingHeader = ({ title, button }) => {
	return (
		<div className="CommunitySettingHeader">
			<div className="CommunitySettingHeader--title">{title}</div>
			{button.length != 0 &&
				button.map(btn => {
					return (
						<div
							className="CommunitySettingHeader--button"
							onClick={btn.onClick}
						>
							{btn.name}
						</div>
					);
				})}
		</div>
	);
};

CommunitySettingHeader.defaultProps = {
	button: [],
};
export default CommunitySettingHeader;
