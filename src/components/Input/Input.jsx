import React, { useState } from 'react';
import './Input.scss';
import classNames from 'classnames';
import BlueSearch from '../../static/images/iconbox/blueSearch.png';
import Search from '../../static/images/Chatting/search.svg';

const Input = ({
	children,
	className,
	selected,
	value,
	onChange,
	placeholder,
	name,
	type,
	size,
	view,
	onClick,
	...rest
}) => {
	const [keyword, setKeyword] = useState('');

	const handleEnter = e => {
		if (e.charCode === 13) {
			onClick(keyword);
		}
	};

	return (
		<div className="c-Input">
			{view === 'search-left' && (
				<img
					src={Search}
					onClick={() => {
						onClick(keyword);
					}}
				/>
			)}
			{/* <form> */}
			<input
				className={classNames('Input', className, size, view)}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={e => {
					onChange(e);
				}}
				type={type}
				onKeyPress={e => {
					// view === 'search' ||
					// 'search-left' &&
					handleEnter(e);
				}}
				autoComplete={view === 'search' ? 'off' : 'on'}
				{...rest}
			/>
			{/* </form> */}
			{view === 'search' && (
				<img src={BlueSearch} onClick={() => onClick(keyword)} />
			)}
		</div>
	);
};

Input.defaultProps = {
	size: 'large',
	view: 'login',
};

export default Input;
