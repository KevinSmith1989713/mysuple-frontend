import React, { useState } from 'react';
import './SettingPosts.scss';
import CommunitySettingHeader from '../../../components/CommunitySettingHeader/CommunitySettingHeader';
import CheckBox from '../../../components/CheckBox/CheckBox';
import { changeCommunityPage } from '../../../store/Community/Community.store';

const test = [
	{ title: 'd', createdAt: 'd' },
	{ title: 'd', createdAt: 'd' },
	{ title: 'd', createdAt: 'd' },
];
const SettingPosts = ({ onClickSetting, postList }) => {
	const [allCheck, setAllCheck] = useState(false);
	const HeaderButtons = [
		{
			key: 'delete',
			name: '삭제',
			onClick: () => null,
		},
		{
			key: 'posting',
			name: '글쓰기',
			onClick: () => {
				onClickSetting();
			},
		},
	];
	return (
		<div className="SettingPosts">
			<div className="SettingPosts--header">
				<CommunitySettingHeader
					title="글 관리"
					button={HeaderButtons}
				></CommunitySettingHeader>
			</div>
			<div className="SettingPosts--filter">
				<CheckBox
					className="checkbox"
					value={allCheck}
					onChange={() => setAllCheck(true)}
					onClick={() => setAllCheck(true)}
				/>{' '}
				<select className="select">
					<option>카테고리</option>
				</select>
			</div>
			<div className="SettingPosts--list">
				{test.map(postRow => {
					return (
						<div className="row">
							<CheckBox />
							<div className="row--category">개발노트</div>
							<div className="row--info">
								<div className="title">{postRow.title}</div>
								<div className="date">{postRow.createdAt}</div>
							</div>
							<div className="row--UD">
								<div className="update">수정</div>
								<div className="delete">삭제</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SettingPosts;
