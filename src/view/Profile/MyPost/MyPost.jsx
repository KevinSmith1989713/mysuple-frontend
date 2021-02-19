import React from 'react';
import './MyPost.scss';
import Button from '../../../components/Button/Button';
import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import ListHead from '../../../components/ListHead/ListHead';
import ListBody from '../../../components/ListBody/ListBody';

const heads = [
	{
		id: 1,
		name: 'N',
		key: 'number',
	},
	{
		id: 2,
		name: '게시판',
		key: 'boardType',
	},
	{
		id: 3,
		name: '제목',
		key: 'title',
	},
	{
		id: 4,
		name: '작성일',
		key: 'date',
	},
	{
		id: 5,
		name: '조회수',
		key: 'views',
	},
	{
		id: 6,
		name: '추천수',
		key: 'recommends',
	},
];

const contents = [
	{
		id: 1,
		number:12,
		boardType: '커뮤니티',
		title: '으아악 피곤해',
		date: '2019-10-23',
		views: 5,
		recommends: 1,
	},
	{
		id: 2,
		number:8,
		boardType: '커뮤니티',
		title: '으아악 피곤해다구',
		date: '2019-10-23',
		views: 5,
		recommends: 1,
	},
	{
		id: 3,
		number:1,
		boardType: '커뮤니티',
		title: '으아악 피곤햄',
		date: '2019-10-23',
		views: 5,
		recommends: 1,
	},
];

const MyPost = () => {
	return (
		<div className="MyPost">
			<ProfileTitle>내가 쓴 글</ProfileTitle>
			<div className="MyPost--buttonGroup">
				<Button size="medium">글 쓰기</Button>
			</div>
			<ListHead heads={heads} type="my-post" background />
			{contents.map(item => {
				return <ListBody contents={item} key={item.id} type="my-post" />;
			})}
		</div>
	);
};

export default MyPost;



// import React from 'react';
// import './MyComment.scss';

// import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
// import ListHead from '../../../components/ListHead/ListHead';
// import ListBody from '../../../components/ListBody/ListBody';

// const heads = [
// 	{
// 		id: 1,
// 		name: '댓글',
// 		key: 'comment',
// 	},
// 	{
// 		id: 2,
// 		name: '작성자',
// 		key: 'author',
// 	},
// 	{
// 		id: 3,
// 		name: '작성일',
// 		key: 'date',
// 	},
// 	{
// 		id: 4,
// 		name: '조회수',
// 		key: 'seeCount',
// 	},
// 	{
// 		id: 5,
// 		name: '추천수',
// 		key: 'recommendCount',
// 	},
// ];

// const contents = [
// 	{
// 		id: 1,
// 		comment:
// 			'졸려서 헤드스핀 어쩌고 졸려서 헤드스핀 어쩌고 졸려서 헤드스핀 어쩌고 졸려서 헤드스핀 어쩌고 …',
// 		author: '말랑이',
// 		date: '2019-10-23',
// 		seeCount: 10,
// 		recommendCount: 5,
// 	},
// 	{
// 		id: 2,
// 		comment: '졸려서 헤드스핀',
// 		author: '말랑이짱이얌',
// 		date: '2019-10-23',
// 		seeCount: 199,
// 		recommendCount: 100,
// 	},
// ];

// const MyComment = () => {
// 	return (
// 		<div className="MyComment">
// 			<ProfileTitle>내가 쓴 댓글</ProfileTitle>
// 			<div className="MyComment--buttonGroup"></div>
// 			<ListHead heads={heads} background />
// 			{contents.map(item => {
// 				return <ListBody contents={item} key={item.id} />;
// 			})}
// 		</div>
// 	);
// };

// export default MyComment;
