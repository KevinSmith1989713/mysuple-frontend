import React, { useState } from 'react';
import './Bookmark.scss';
import Button from '../../../components/Button/Button';
import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import { bookmarks } from '../../../assets/dummyData/ProfileData';
import BookmarkCard from '../../../components/BookmarkCard/BookmarkCard';

const Bookmark = () => {
	const [mode, setMode] = useState(false);
	const deletedList = [];
	// const [selected, setSelected] = useState([])

	const setCheckedBookmark = e => {
		if (deletedList.includes(e)) {
			for (var i = 0; i < deletedList.length; i++)
				if (deletedList[i] === e) {
					deletedList.splice(i, 1);
					break;
				}
		} else {
			deletedList.push(e);
		}
	};
	return (
		<div className="Bookmark">
			<ProfileTitle>북마크</ProfileTitle>
			<div className="Bookmark--buttonGroup">
				{mode ? (
					<div className="btns">
						<Button size="medium" color="gray" onClick={() => setMode(false)}>
							취소
						</Button>
						<Button size="medium" onClick={() => null}>
							삭제
						</Button>
					</div>
				) : (
					<Button size="medium" onClick={() => setMode(true)}>
						북마크 편집
					</Button>
				)}
			</div>
			<div className="Bookmark--Recommend">
				{bookmarks.map(bookmark => {
					return (
						<BookmarkCard
							info={bookmark}
							mode={mode}
							selected={e => setCheckedBookmark(e)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Bookmark;
