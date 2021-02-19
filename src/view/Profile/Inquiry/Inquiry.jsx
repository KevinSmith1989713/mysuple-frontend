import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { url } from '../../../constants/apiUrl.js';

import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import Button from '../../../components/Button/Button';
import ListHead from '../../../components/ListHead/ListHead';
import ListBody from '../../../components/ListBody/ListBody';
import moment from 'moment';

import './Inquiry.scss';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

const heads = [
	{
		id: 1,
		name: '문의 일자',
		key: 'date',
	},
	{
		id: 2,
		name: '카테고리',
		key: 'category',
	},
	{
		id: 3,
		name: '제목',
		key: 'title',
	},
	{
		id: 4,
		name: '처리상태',
		key: 'isProcess',
	},
];

const Inquiry = ({ onClick }) => {
	const [contents, setContents] = useState([]);
	const [select, setSelect] = useState('');
	useEffect(() => {
		try {
			axios
				.post(`${url.file}/SelectUserQA`, {
					id: getUserInfo === null ? '' : getUserInfo.id,
				})
				.then(res => {
					if (res.data.Status === 'OK') {
						setContents(res.data.Info.qa_content.reverse());
					}
				});
		} catch (e) {
			console.error(e);
		}
	}, []);

	return (
		<div className="Inquiry">
			<ProfileTitle>1:1 문의 내역</ProfileTitle>
			<div className="Inquiry--buttonGroup">
				<Button size="medium" onClick={() => onClick('writeInquiry')}>
					1:1 문의하기
				</Button>
			</div>
			<ListHead heads={heads} />
			{contents.length != 0 ? (
				contents.map(item => {
					return (
						<>
							<div
								className="Info"
								type="button"
								onClick={() => {
									setSelect(item.q_id);
								}}
							>
								<div className="date">
									{moment(item.createdAt).format('YYYY.MM.DD')}
								</div>
								<div className="category">{item.q_category}</div>
								<div className="title">{item.q_title}</div>
								<div className={item.status === '0' ? 'state color' : 'state'}>
									{item.status === '0' ? '접수중' : '답변완료'}
								</div>
							</div>
							{item.q_id === select && (
								<div className="Detail--info">
									<div className="header--info">
										<div className="title--box">
											<div className="type">
												<div className="type--state">{item.q_category}</div>
											</div>
											<div className="title">
												<b>Q</b>. {item.q_title}
											</div>
										</div>
										<div className="date">
											{moment(item.createdAt).format('YYYY.MM.DD')}
										</div>
									</div>
									<div className="contents">{item.q_content}</div>
									{item.status === '0' ? (
										''
									) : (
										<div className="respond">
											<div className="host">관리자</div>
											<div className="respond__title">A. {item.q_title}</div>
											<div className="respond__contents">{item.a_content}</div>
										</div>
									)}
								</div>
							)}
						</>
					);
				})
			) : (
				<div className="noResult">1:1 문의 내역이 없습니다</div>
			)}
		</div>
	);
};

export default Inquiry;
