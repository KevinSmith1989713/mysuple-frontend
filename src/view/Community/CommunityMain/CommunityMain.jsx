import React from 'react';
import './CommunityMain.scss';
import MainIntro from '../../../components/CommunityIntro/CommunityIntro'
import MainNotice from '../../../components/CommunityNotice/CommunityNotice'
import MainDevNote from '../../../components/CommunityDevNote/CommunityDevNote'
import MainEvent from '../../../components/CommunityEvent/CommunityEvent'
import { connect } from 'react-redux'
import { communityNotice, communityDevNote, communityEvent } from '../../../store/Community/Community.store'
import { useEffect } from 'react';

const eventExample=[
	{
		id:'event-1',
		title:'프리시즌 파랑 정수 상점을 찾아주세요',
		date: '2019.12.22'
	},{
		id:'event-2',
		title:'프리시즌 파랑 정수 상점을 찾아주세요',
		date: '2019.12.22'
	},{
		id:'event-3',
		title:'프리시즌 파랑 정수 상점을 찾아주세요',
		date: '2019.12.22'
	},{
		id:'event-4',
		title:'프리시즌 파랑 정수 상점을 찾아주세요',
		date: '2019.12.22'
	},{
		id:'event-5',
		title:'프리시즌 파랑 정수 상점을 찾아주세요',
		date: '2019.12.22'
	},{
		id:'event-6',
		title:'프리시즌 파랑 정수 상점을 찾아주세요',
		date: '2019.12.22'
	}
	
]

const CommunityMain = ({ match, communityNotice, communityDevNote, communityEvent }) => {
	return (
		<div className="CommunityMain">			
			<div className="MainIntro">
				<MainIntro
					titleTop="리그 오브 레전드에 오신 것을" 
					titleBot="환영합니다" 
					embed={"https://www.youtube.com/embed/NQIeAbFT4Kc"}
					backImg={'https://i.pinimg.com/originals/4c/a5/3b/4ca53bff154cec9e97d3d6d362456e19.jpg'}
					explain="리그 오브 레전드를 처음 플레이하시는 경우 어려움을 느낄 수 있습니다. 특히 리그 오브 레전드를 완전히 처음 플레이 하시는 경우, 이 비디오를 먼저 보신 후 시작하세요.
					영상을 다 보신 후에는 본 가이드에 있는 역할군과 챔피언, 주요 목표물에 관한 정보를 통해 게임에 숙련도를 높여보세요!"
					/>
			</div>
			<div className="MainNotice">
				<MainNotice NoticeList={communityNotice} match={match} />
			</div>
			<div className="MainDev">
				<MainDevNote devNote={communityDevNote}  match={match} />
			</div>
			<div className="MainEvent">
				<MainEvent eventList={communityEvent.RunningEvent}  match={match} />
			</div>
		</div>
	);
};


const mapStateToProps = state => {
	return {
		communityNotice: state.community.communityNotice,
		communityDevNote: state.community.communityDevNote,
		communityEvent: state.community.communityEvent,
	};
};

export default connect(mapStateToProps,null)(CommunityMain);
