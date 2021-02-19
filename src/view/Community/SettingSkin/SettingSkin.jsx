import React, { useState, useEffect, useRef } from 'react';
import './SettingSkin.scss';
import CommunitySettingHeader from '../../../components/CommunitySettingHeader/CommunitySettingHeader';
import { TwitterPicker } from 'react-color';

import useOutsideClick from '../../../hooks/useOutsideClick';

const backgroundData = [
	{
		key: 'backgroundImg',
		name: '커뮤니티 상단 배경 이미지 (1920x520)',
		src: '12321',
	},
	{
		key: 'backgroundColor',
		name: '커뮤니티 바탕 배경 색상',
		color: '#aaaaaa',
	},
	{
		key: 'ContentBackgroundColor',
		name: '커뮤니티 컨텐츠 배경 색상',
		color: '#444444',
	},
];
const contentData = [
	{
		key: 'mainTextColor',
		name: '본문 폰트 색상',
		color: '#aaaaaa',
	},
	{
		key: 'detailContentBackground',
		name: '세부 컨텐트 배경 색상',
		color: '#aaaaaa',
	},
	{
		key: 'mainPointColor',
		name: '주 포인트 컬러 색상',
		color: '#444444',
	},
	{
		key: 'subPointColor',
		name: '부 포인트 컬러 색상',
		color: '#444444',
	},
	{
		key: 'lineColor',
		name: '라인 색상 및 버튼 색상',
		color: '#444444',
	},
];

const SettingSkin = ({}) => {
	const [background, setBackground] = useState(backgroundData);
	const [content, setContent] = useState(contentData);
	const [twitPalette, setPalette] = useState(null);
	const [flag, setFlag] = useState(true);

	const ref = useRef();

	useEffect(e => {}, [flag]);

	useOutsideClick(ref, e => {
		console.error(e);
		if (twitPalette) {
			setPalette(null);
		}
	});

	const editBtn = [
		{
			key: 'preview',
			name: '미리보기',
			onClick: () => null,
		},
	];

	const showPalette = paletteKey => {
		if (twitPalette === paletteKey) {
			setPalette(null);
		} else {
			setPalette(paletteKey);
		}
	};

	const setTwitPalette = (type, palette, index, color) => {
		let newArr = null;
		if (type === 'background') {
			newArr = background;
			newArr[index] = {
				key: palette.key,
				name: palette.name,
				color: color.hex,
			};
			setBackground(newArr);
		}
		if (type === 'content') {
			newArr = content;
			newArr[index] = {
				key: palette.key,
				name: palette.name,
				color: color.hex,
			};
			setContent(newArr);
		}
		setFlag(!flag);
	};

	return (
		<div className="SettingSkin">
			<div className="SettingSkin--Header">
				<CommunitySettingHeader title="스킨 관리" />
			</div>
			<div className="SettingSkin--Background">
				<div className="title">Background</div>
				<div className="list">
					{background.map((palette, index) => {
						return (
							<div className="row" key={index}>
								<div className="row--name">{palette.name}</div>
								{palette.color && (
									<div
										className="row--palette"
										onClick={() => {
											showPalette(palette.key);
										}}
										style={{ backgroundColor: [palette.color] }}
									/>
								)}
								{palette.color && twitPalette === palette.key && (
									<div className="row--colorpicker" ref={(ref, palette.key)}>
										<TwitterPicker
											color={palette.color}
											onChangeComplete={color =>
												setTwitPalette('background', palette, index, color)
											}
											triangle="top-right"
										/>
									</div>
								)}
								{palette.src && (
									<div className="row--src">
										<label for="uploadBtn" className="btn_file">
											찾아보기
										</label>
										<input type="file" id="uploadBtn" className="uploadBtn" />
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<div className="SettingSkin--Content">
				<div className="title">Content</div>
				<div className="list">
					{content.map((palette, index) => {
						return (
							<div className="row">
								<div className="row--name">{palette.name}</div>
								{palette.color && (
									<div
										className="row--palette"
										onClick={() => {
											showPalette(palette.key);
										}}
										style={{ backgroundColor: [palette.color] }}
									/>
								)}
								{palette.color && twitPalette === palette.key && (
									<div className="row--colorpicker" ref={ref}>
										<TwitterPicker
											color={palette.color}
											onChangeComplete={color =>
												setTwitPalette('content', palette, index, color)
											}
											triangle="top-right"
										/>
									</div>
								)}
								{palette.src && (
									<div className="row--src">
										<label for="uploadBtn" className="btn_file">
											찾아보기
										</label>
										<input type="file" id="uploadBtn" className="uploadBtn" />
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<div className="SettingSkin--Etc">
				<div className="title">Etc</div>
				<div className="list">
					<div className="row">
						<div className="row--name">관리자 아이콘 (20x20)</div>
						<div className="row--src">
							<label for="uploadBtn" className="btn_file">
								찾아보기
							</label>
							<input type="file" id="uploadBtn" className="uploadBtn" />
						</div>
					</div>
				</div>
			</div>
			<div className="SettingSkin--Btns">
				<div className="preview--btn">미리보기</div>
				<div className="apply--btn">적용</div>
			</div>
		</div>
	);
};

export default SettingSkin;
