import React, { useState, Fragment } from 'react';
import classNames from 'classnames';
import Modal from '../Modal/Modal';

import './SearchModal.scss';
import Title from '../Title/Title';
import Button from '../Button/Button';
import Input from '../Input/Input';
import moment from 'moment'; //

const SearchModal = ({ close, isOpen, reqAllSearch }) => {
	const [text, setText] = useState('');

	const recentSearch = JSON.parse(localStorage.getItem('searchRecord'));
	const [delet, setDelet] = useState(false);

	const search = keyword => {
		var searchArr = [];
		var searchObj = { keyword: keyword, date: moment().format('MM[.]DD') };
		if (keyword.length != 0) {
			if (!localStorage.getItem('searchRecord')) {
				searchArr.push(searchObj);
				localStorage.setItem('searchRecord', JSON.stringify(searchArr));
			} else {
				searchArr = JSON.parse(localStorage.getItem('searchRecord'));
				searchArr.push(searchObj);
				localStorage.setItem('searchRecord', JSON.stringify(searchArr));
			}
		}
		if (!!keyword) {
			reqAllSearch(keyword);
		} else {
			reqAllSearch('');
		}
	};

	const onChange = e => {
		setText(e.target.value);
	};

	const removeData = () => {
		setDelet(!delet);
		const result = JSON.parse(localStorage.removeItem('searchRecord'));

		return result;
	};
	return (
		<Modal className="SearchModal" close={close} isOpen={isOpen}>
			<div className="SearchModal--Title">
				<Title size="large" border="thick">
					슈플 통합검색
				</Title>
			</div>
			<div className="SearchModal--input">
				<Input
					view="search"
					placeholder="검색어를 입력하세요"
					name="text"
					onChange={e => {
						onChange(e);
					}}
					onClick={() => {
						search(text), close();
					}}
				/>
			</div>
			{!!recentSearch ? (
				<div className="SearchModal--Recent">
					<div className="header">최근 검색어</div>
					<div className="search">
						{recentSearch.map((recent, index) => {
							const txt = recent.keyword;
							return (
								<div
									className="search--row"
									key={index}
									onClick={() => {
										search(txt);
										close();
									}}
								>
									{txt}
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<div className="SearchModal--NoRecent">검색 기록이 없습니다.</div>
			)}
			<div className="SearchModal--DeleteRecent" onClick={removeData}>
				{!!recentSearch && <span>최근 검색기록 삭제</span>}
			</div>
		</Modal>
	);
};
export default SearchModal;
