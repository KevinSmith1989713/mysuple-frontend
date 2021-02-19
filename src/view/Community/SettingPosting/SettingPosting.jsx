import React, { useState } from 'react';
import './SettingPosting.scss';

import { connect } from 'react-redux';
import { insertOfficialDevNote } from '../../../store/Community/Community.store';

import CommunitySettingHeader from '../../../components/CommunitySettingHeader/CommunitySettingHeader';
import FroalaEditor from '../../../components/FroalaEditor/FroalaEditor';
import Card from '../../../static/images/Card/Calendar.png';

const postTypes = [
	{
		key: 'notice',
		name: '공지사항',
	},
	{
		key: 'devNote',
		name: '개발노트',
	},
	{
		key: 'event',
		name: '이벤트',
	},
];

const SettingPosting = ({ match, insertOfficialDevNote }) => {
	const [postType, setPostType] = useState('devNote');
	const [title, setTitle] = useState('');
	const [editor, setEditor] = useState(null);
	const [thumbnail, setThumbnail] = useState(null);

	const postContent = () => {
		if (title.length <= 2) {
			alert('제목을 최소 두 글자 이상 적어주세요');
			return;
		}
		if (!editor) {
			alert('게시글을 적어주세요');
			return;
		}
		if (!thumbnail) {
			alert('썸네일을 첨부해 주세요');
			return;
		}
		if (postType === 'devNote') {
			insertOfficialDevNote({
				file: thumbnail,
				pageId: match.params.id,
				title: title,
				content: editor,
			});
		}
	};

	return (
		<div className="SettingPosting">
			<div className="SettingPosting--header">
				<CommunitySettingHeader title="글 쓰기" />
			</div>
			<div className="SettingPosting--title">
				<div className="filter">
					<select
						className="category"
						value={postType}
						onChange={e => setPostType(e.target.value)}
					>
						{postTypes.map(type => {
							return <option value={type.key} label={type.name} />;
						})}
					</select>
				</div>
				<input
					type="text"
					placeholder="제목"
					onChange={e => setTitle(e.target.value)}
					value={title}
				/>
			</div>
			<div className="SettingPosting--editor">
				<FroalaEditor form={editor} onChangeForm={e => setEditor(e)} />
			</div>
			{postType === 'event' && (
				<div className="SettingPosting--eventCal">
					<img src={Card} />
					<input
						className="eventCal--input"
						type="text"
						placeholder="시작날짜"
					/>
					~
					<input
						className="eventCal--input"
						type="text"
						placeholder="종료날짜"
					/>
				</div>
			)}
			<div className="SettingPosting--thumbnail">
				<div className="text">
					<div className="text--top">썸네일 이미지</div>
					<div className="text--bottom">
						{!!thumbnail
							? thumbnail.name
							: '(권장 : 240px*200px / gif, jpeg, png)'}
					</div>
				</div>
				<div className="upload--btn">
					<label for="uploadBtn" className="btn_file">
						찾아보기
					</label>
					<input
						type="file"
						id="uploadBtn"
						className="uploadBtn"
						accept="image/gif,image/jpeg,image/png"
						onChange={e => setThumbnail(e.target.files[0])}
					/>
				</div>
			</div>
			<div className="SettingPosting--postBtn">
				{/* <div className="previewBtn">미리보기</div> */}
				<div className="postingBtn" onClick={() => postContent()}>
					글 쓰기
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		insertOfficialDevNote: ({ file, pageId, title, content }) =>
			dispatch(insertOfficialDevNote({ file, pageId, title, content })),
	};
};

export default connect(null, mapDispatchToProps)(SettingPosting);
