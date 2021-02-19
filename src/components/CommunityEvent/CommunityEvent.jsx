
import React from 'react';
import './CommunityEvent.scss';
import { Link } from 'react-router-dom';
import EventCard from '../EventCard/EventCard'

import Media from 'react-media'


const CommunityEvent = ({ eventList, match }) => {	
	return (
		<div className="CommunityEvent">
			
			<div className="CommunityEvent--Header">
				이벤트
				{!!eventList && eventList.length>4 && <Link to={`/community/official/${match.params.id}/event`} className="more">더보기</Link>}
			</div>
			{
			eventList ? (
			<Media query={{ maxWidth: 768 }}>
				{matches =>
					matches ? (
						eventList.map((event, index)=> {
							return (
								index < 3 && <EventCard info = {event} size="large" match={match} key={index} type="event" />
							)
						})
					) : (
						<>
						<div className="CommunityEvent--Newest">
							<EventCard info = {eventList[0]} size="large" match={match} type="event" />
						</div>
						<div className="CommunityEvent--Bottom">
							{
								eventList.map((event, index)=> {
									return (
										index > 0 && index < 4 && 
											<EventCard info = {event} size="medium" match={match} type="event" />
									)
								})
							}
						</div>
						</>
					)
				}
			</Media>
			) : (
				<div className="CommnnityEvent--None">
					진행중인 이벤트가 없습니다. 
				</div>
			)
			}
		</div>
	);
};

export default CommunityEvent;
