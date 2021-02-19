import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import Button from '../../../components/Button/Button';
import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import Input from '../../../components/Input/Input';
import Textarea from '../../../components/Textarea/Textarea';
import AttachFile from '../../../components/AttachFile/AttachFile';
import AuthService from '../../../services/authService';

import { changeProfileSubMenu } from '../../../store/Layout/Layout.store';

import './WriteInquiry.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
const buttons = [
	{
		id: 1,
		title: '계정/개인정보',
		key: 'account',
	},
	{
		id: 2,
		title: '서비스',
		key: 'service',
	},
	{
		id: 3,
		title: '신고',
		key: 'report',
	},
	{
		id: 4,
		title: '기타',
		key: 'others',
	},
];

const WriteInquiry = ({ email, changeProfileSubMenu }) => {
	const getUserInfo = JSON.parse(localStorage.getItem('data'));
	const [category, setCategory] = useState('');
	const [inputs, setInputs] = useState({
		title: '',
		content: '',
	});
	const [file, setFile] = useState([]);

	const { title, content } = inputs;

	const onChange = e => {
		const { name, value } = e.target;

		setInputs({
			...inputs,
			[name]: value,
		});
	};

	async function onChangeFile(e) {
		setFile(e.target.files[0]);
		const formData = new FormData();
		formData.append('file', file);
		const options = {
			headers: {
				'content-type': 'multipart/form-data',
				bucket_name: 'img',
			},
		};
		const res = await axios.post(
			`${url.file}/ImageOnEditor`,
			formData,
			options,
		);
		setFile([...file, res]);
	}
	// console.log(file);

	const onClick = () => {
		const formData = new FormData();

		formData.append('id', getUserInfo === null ? '' : getUserInfo.id);
		formData.append('q_title', title);
		formData.append('q_content', content);
		formData.append('q_category', category);
		formData.append('attachment', file);

		AuthService.insertQA(formData).then(res => {
			if (res.Msg === 'success') {
				changeProfileSubMenu('inquiry');
			}
		});
	};
	return (
		<div className="WriteInquiry">
			<ProfileTitle>1:1 문의하기</ProfileTitle>
			<p className="WriteInquiry--text">카테고리</p>
			<div className="WriteInquiry--btnGroup">
				{buttons.map(item => {
					return (
						<div
							className={`box ${category === item.key && 'selected'}`}
							onClick={() => {
								setCategory(item.key);
							}}
							key={item.id}
						>
							{item.title}
						</div>
					);
				})}
			</div>
			<Input
				type="custom"
				placeholder="제목"
				onChange={onChange}
				value={title}
				name="title"
			/>
			<Textarea
				className="custom-textarea"
				placeholder="내용을 입력해주세요"
				onChange={onChange}
				value={content}
				name="content"
			/>
			<AttachFile onChange={onChangeFile} />
			<div className="WriteInquiry--submit">
				<Button size="medium" onClick={() => onClick()}>
					문의 남기기
				</Button>
			</div>
		</div>
	);
};

export default connect(({ auth }) => ({ email: auth.userInfo.email }), {
	changeProfileSubMenu,
})(WriteInquiry);
