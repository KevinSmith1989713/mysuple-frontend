import React, { useState } from 'react';
import './CommunityDevNote.scss';
import EventCard from '../../../components/EventCard/EventCard'
import Media from 'react-media';

import { connect } from 'react-redux';
import Pagination from '../../../components/Pagination/Pagination'

// const communityDevNote = [
// 	{
// 		id:1,
// 		title: '[개발노트] 악몽 모드 추가',
// 		date:'2019.12.22'
// 	},
// 	{
// 		id:2,
// 		title: '[개발노트] 아이템 오류 수정',
// 		date:'2019.12.15'
// 	},
// 	{
// 		id:3,
// 		title: '[개발노트] 새 캐릭터 개발과정',
// 		date:'2019.11.28'
// 	},
// 	{
// 		id:4,
// 		title: '[개발노트] 밸런스의 고충',
// 		date:'2019.10.02'
// 	},
// 	{
// 		id:5,
// 		title: '[개발노트] 밸런스의 고충',
// 		date:'2019.10.02'
// 	},
// 	{
// 		id:1,
// 		title: '[개발노트] 악몽 모드 추가',
// 		date:'2019.12.22'
// 	},
// 	{
// 		id:2,
// 		title: '[개발노트] 아이템 오류 수정',
// 		date:'2019.12.15'
// 	},
// 	{
// 		id:3,
// 		title: '[개발노트] 새 캐릭터 개발과정',
// 		date:'2019.11.28'
// 	},
// 	{
// 		id:4,
// 		title: '[개발노트] 밸런스의 고충',
// 		date:'2019.10.02'
// 	},
// 	{
// 		id:5,
// 		title: '[개발노트] 밸런스의 고충',
// 		date:'2019.10.02'
// 	},
// ]

const CommunityDevNote = ({ match, communityDevNote }) => {
	const [ paging, setPaging ] = useState(1);
	const perPage = 9;


	return (
		<div className="CommunityDevNote">
			<div className="CommunityDevNote--header">
				<div className="title">
					개발노트
				</div>
				
				<Media query={{ minWidth: 769 }}>
					{matches => matches && (
						<>
							<div className="newPost--btn">삭제</div>
							<div className="newPost--btn">새글쓰기</div>
						</>
					)}
				</Media>
			</div>
			<div className="CommunityDevNote--list">
				{/* {
					communityDevNote.map(note => {
						return 
					})
				} */}
				{
					!!communityDevNote && communityDevNote.length > 0 ? (
						communityDevNote.map((note, index) => {
							if(index >= (paging * perPage - perPage) && index < (paging * perPage)){
								return (
									<EventCard info={note} key={index} type="dev" match={match}/>
									)
								}
							}
						)
					) : (
						<div className="no-review"></div>
					)
				}
			</div>
			<div className="CommunityDevNote--pagination">
				{
					!!communityDevNote && communityDevNote.length > 0 && 
					<Pagination
						perPage={perPage}
						status={paging}
						listCnt={communityDevNote.length}
						changePage={(page)=>setPaging(page)}
					/>
				}
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		communityDevNote: state.community.communityDevNote,
	};
};

export default connect(mapStateToProps, null)(CommunityDevNote);
