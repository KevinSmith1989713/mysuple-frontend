import React from 'react';
import './MyComment.scss';

import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import ListHead from '../../../components/ListHead/ListHead';
import ListBody from '../../../components/ListBody/ListBody';

const heads = [
	{
		id: 1,
		name: '댓글',
		key: 'comment',
	},
	{
		id: 2,
		name: '작성자',
		key: 'author',
	},
	{
		id: 3,
		name: '작성일',
		key: 'date',
	},
	{
		id: 4,
		name: '조회수',
		key: 'seeCount',
	},
	{
		id: 5,
		name: '추천수',
		key: 'recommendCount',
	},
];

const contents = [
	{
		id: 1,
		comment:
			'졸려서 헤드스핀 어쩌고 졸려서 헤드스핀 어쩌고 졸려서 헤드스핀 어쩌고 졸려서 헤드스핀 어쩌고 …',
		author: '말랑이',
		date: '2019-10-23',
		seeCount: 10,
		recommendCount: 5,
	},
	{
		id: 2,
		comment: '졸려서 헤드스핀',
		author: '말랑이짱이얌',
		date: '2019-10-23',
		seeCount: 199,
		recommendCount: 100,
	},
];

const MyComment = () => {
	return (
		<div className="MyComment">
			<ProfileTitle>내가 쓴 댓글</ProfileTitle>
			<div className="MyComment--buttonGroup"></div>
			<ListHead heads={heads} background />
			{contents.map(item => {
				return <ListBody contents={item} key={item.id} />;
			})}
		</div>
	);
};

export default MyComment;
