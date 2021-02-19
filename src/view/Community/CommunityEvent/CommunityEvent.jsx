import React, { useState, useEffect } from 'react';
import './CommunityEvent.scss';
import EventCard from '../../../components/EventCard/EventCard'
import Pagination from '../../../components/Pagination/Pagination'

import { connect } from 'react-redux';
import moment from 'moment';

const eventHeaders = [
	{
		id:'status',
		name: '진행중인 이벤트'
	},{
		id:'ended',
		name: '종료된 이벤트'
	}
]

const CommunityEvent = ({ match, communityEvent }) => {
	const [header, setHeader] = useState('status');
	const [paging, setPaging] = useState(1);
	const [events, setLists] = useState(communityEvent.RunningEvent);
	const perPage = 5;

	useEffect(()=>{ 
		if(header === 'status'){
			setLists(communityEvent.RunningEvent)
		}else{
			setLists(communityEvent.EndedEvent)
		}
	},[header])
	return (
		<div className="CommunityEvent">
			<div className="CommunityEvent--header">
				이벤트
				<div className="newPost--btn">새글쓰기</div>
			</div>
			<div className="Event--header">
				{
					eventHeaders.map((event)=>{
						return (
							<div 
								className={header===event.id ? "Event--header__tab--selected" : "Event--header__tab"}
								onClick={()=>{setHeader(event.id); setPaging(1);}}>
								{event.name}
								{header===event.id && <div className="border--bottom"/>}
							</div>
						)
					})
				}
			</div>
			<div className="Event--postList">
				{
					!!events && events.length>0 ? (
						events.map((event, index) => {
							if(index >= (paging * perPage - perPage) && index < (paging * perPage)){
								return (
									<EventCard info={event} key={index} size='large' match={match}/>
								)
							}
						})
					) : (
						<div className="no-reivew">
							{ header=== 'status' ? "진행중인 이벤트가 없습니다" : "종료된 이벤트가 없습니다"}
						</div>
					)
				}
			</div>
			<div className="Event--paging">
				{
					!!events && events.length > 0 && 
					<Pagination 
						perPage={perPage}
						status={paging} 
						listCnt={events.length} 
						changePage={(page)=>setPaging(page)}
					/>
				}
			</div>
		</div>
	);
};


const mapStateToProps = state => {
	return {
		communityEvent: state.community.communityEvent,
	};
};

export default connect(mapStateToProps, null)(CommunityEvent);
