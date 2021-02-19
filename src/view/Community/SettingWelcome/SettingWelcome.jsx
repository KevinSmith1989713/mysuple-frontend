import React, { useState } from 'react';
import './SettingWelcome.scss';
import CommunitySettingHeader from '../../../components/CommunitySettingHeader/CommunitySettingHeader';
import FroalaEditor from '../../../components/FroalaEditor/FroalaEditor.jsx';

// import CommunitySettingCard from '../../../components/CommunitySettingCard/CommunitySettingCard';


const SettingWelcome = ({  }) => {

	return (
		<div className="SettingWelcome">
			<div className="SettingWelcome--Header">
				<CommunitySettingHeader title="웰컴 페이지 변경">웰컴 페이지 변경</CommunitySettingHeader>
			</div>
			<div className="SettingWelcome--BackgroundImage">
				<div className="text">
					<div className="text--top">웰컴 페이지 배경 이미지</div>
					<div className="text--bottom">(가로 845px 세로 최대 1000px)</div>
				</div>
				<div className="attach">
					<label for="uploadBtn" className="btn_file">찾아보기</label>
					<input type="file" id="uploadBtn" className="uploadBtn"/>
				</div>
			</div>
			<div className="SettingWelcome--Editor">
				<FroalaEditor />
			</div>
		</div>
	);
};

export default SettingWelcome;
