import React from 'react';
import { Link } from 'react-router-dom';
import Media from 'react-media';

import { ReactComponent as NoteIcon } from '../../static/images/Community/NoteIcon.svg'

import './CommunityDevNote.scss';
const CommunityDevNote = ({ devNote, match }) => {
	return (
		<div className="CommunityDevNote">
			<div className="CommunityDevNote--Header">
				개발노트
				{
					!!devNote && devNote.length>6 && 
					<Link to={`/community/official/${match.params.id}/devNote`} className="more">더보기</Link>
				}
			</div>
				{!!devNote && devNote.length!=0 
					? (
						<div className="CommunityDevNote--List">
							<Media query={{ maxWidth: 768 }}>
								{
									matches =>
										matches 
										? devNote.map((note,index) => { if(index<3){ return DevNote(note, match) }})
										: devNote.map((note,index) => { if(index<6){ return DevNote(note, match) }})
								}
							</Media>
						</div>
					) : (
						<div className="CommunityDevNote--List__none">
							등록된 노트가 없습니다.
						</div>
					)
				}
		</div>
	);
};

const DevNote = (note, match) => {
	return(
		<Link to={`/community/official/${match.params.id}/devNote/${note.official_page_dev_note_id}`} className="row--note">
			
				{
					!!note && !!note.thumbnail 
					? (	<div className="thumbnail"><img src={note.thumbnail}/></div> )
					: ( <div className="thumbnail__none"><NoteIcon/></div> )
				}
			
			<div className="explain">
				<div className="devnote">개발노트</div>
				<div className="devnote--title">{note.title}</div>
				<div className="devnote--date">{note.date}</div>
			</div>
		</Link>
	)

}

export default CommunityDevNote;
