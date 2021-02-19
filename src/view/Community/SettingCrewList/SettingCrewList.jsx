import React, { useState } from 'react';
import './SettingCrewList.scss';
import CommunitySettingHeader from '../../../components/CommunitySettingHeader/CommunitySettingHeader';
import { ReactComponent as HappyFace } from '../../../static/images/Community/BlueHappyFace.svg'
import { ReactComponent as Peoples } from '../../../static/images/Community/BlueHappyFace.svg'

const SettingCrewList = ({  }) => {

	return (
		<div className="SettingCrewList">
			<div className="SettingCrewList--Header">
				<CommunitySettingHeader title="크루 리스트"></CommunitySettingHeader>
			</div>
			<div className="SettingCrewList--List">


				<div className="row">
					<HappyFace/>
					<div className="row--info">
						<div className="title">왈랄라 게임 사랑단</div>
						<div className="sub--title">'해치지 않아요'</div>
					</div>
					<div className="row--crewCnt">234234명</div>
				</div>

				
			</div>
		</div>
	);
};

export default SettingCrewList;
