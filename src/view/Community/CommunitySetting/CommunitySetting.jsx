import React, { useState, useEffect } from 'react';
import './CommunitySetting.scss';
import Title from '../../../components/Title/Title';
import CrewList from '../SettingCrewList/SettingCrewList'
import Posts from '../SettingPosts/SettingPosts'
import Skin from '../SettingSkin/SettingSkin'
import Statistics from '../SettingStatistics/SettingStatistics'
import Welcome from '../SettingWelcome/SettingWelcome'
import Posting from '../SettingPosting/SettingPosting'
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { reqOfficialDevNote } from '../../../store/Community/Community.store';
import { ReactComponent as LinkChain } from '../../../static/images/Community/BlueLink.svg'

const settingHeader = [
	{
		key: 'skin',
		name: '스킨 관리'
	},{
		key: 'welcome',
		name: '웰컴 페이지 변경'
	},{
		key: 'text',
		name: '글 관리'
	},{
		key: 'statistics',
		name: '통계'
	},{
		key: 'crewList',
		name: '크루 리스트'
	},
]

const CommunitySetting = ({ match, communityPosts, reqOfficialDevNote }) => {

	const [settingH, selectedSettingH] = useState('skin');
	
	const makePage = () =>{
		switch(settingH){
			case 'skin' : return <Skin/>;
			case 'welcome' : return <Welcome/>;
			case 'text' : return <Posts postList={communityPosts} onClickSetting={()=>selectedSettingH('posting')}/>;
			case 'statistics' : return <Statistics/>;
			case 'crewList' : return <CrewList/>;
			case 'posting' : return <Posting match={match}/>;
		}
	}
	useEffect(()=>{
		reqOfficialDevNote(match.params.id)
	},[])

	return (
		<div className="CommunitySetting">
			<div className="CommunitySetting--Header">
				<div className="Header--title">
					<Title size="largest">관리</Title>
					<div className="underline"/>
					<Link to={`/community/official/${match.params.id}`} className="link"><LinkChain/>내 커뮤니티</Link>
				</div>
				<div className="Header--row">
					{
						settingHeader.map(header => {
							return (
								<div className={`${settingH === header.key ? "row--selected" : "row"} ${header.key==='text' && settingH ==="posting" && "row--selected"}`} 
									onClick={()=>selectedSettingH(header.key)}>{header.name}</div>
							)
						})
					}
				</div>
			</div>
			<div className={settingH === 'statistics'? "CommunitySetting--Container__statistics" : "CommunitySetting--Container"}>
				{makePage()}
			</div>
		</div>
	);
};



const mapStateToProps = state => {
	return {
		communityPosts: state.community.communityPosts,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reqOfficialDevNote: (pageId) => dispatch(reqOfficialDevNote(pageId))
	};
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CommunitySetting))


