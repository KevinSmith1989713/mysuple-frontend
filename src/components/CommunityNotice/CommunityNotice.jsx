
import React from 'react';
import { Link } from 'react-router-dom';
import './CommunityNotice.scss';
import moment from 'moment'

const CommunityNotice = ({ NoticeList, match }) => {
	return (
		<div className="CommunityNotice" style={{background:'#242424'}}>
			<div className="CommunityNotice--Header">
				<div className="title">공지사항</div>
				{
					!!NoticeList && NoticeList.length>4 && 
						<Link to={`/community/official/${match.params.id}/notice`} className="more">더보기</Link>
				}
			</div>
				{
					!!NoticeList && NoticeList.length != 0 
					? (
						<div className="CommunityNotice--Section">
							<div className="newest--img">
								<img src={NoticeList[0].thumbnail}/>
							</div>
							<div className="list">
								{
									NoticeList.map((notice,index) => {
										if(index<4){ return makeNoticeRow(notice, match)	}
									})
								}
							</div>
						</div>
					) : (
						<div className="CommunityNotice--Section__none">
							등록된 글이 없습니다.
						</div>
					)
				}
		</div>
	);
};

const makeNoticeRow = (notice, match) => {
	return (
		<div className="notice--row" key={notice.official_page_notice_id}>
			<Link to ={`/community/official/${match.params.id}/notice/${notice.official_page_notice_id}`}>
			<div className="title">
				{notice.title}
				{/* {isNew && <span className="new">N</span>} */}
			</div>
			<div className="date">{moment(notice.createdAt).format('YYYY.MM.DD')}</div>
			</Link>
		</div>
	)

}
export default CommunityNotice;
