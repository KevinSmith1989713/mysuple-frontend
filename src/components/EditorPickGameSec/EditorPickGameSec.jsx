import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import './EditorPickGameSec.scss';
import Title from '../Title/Title';
import Card from '../Card/Card';
import Fxjs from '../../Utils/fxjs';

let fn = new Fxjs();

const EditorLongCard = info => {
	const desc = info.game_desc_kr
		? info.game_desc_kr
		: info.game_desc
		? info.game_desc
		: '게임 설명이 없습니다';
	return (
		<div className="EditorLongCard">
			<Card info={info} isBtn={false} />
			<div className="EditorLongCard--introduce">{desc}</div>
		</div>
	);
};

function createMarkup(text) {
	return { __html: text };
}

const EditorPickGameSec = ({ info, index }) => {
	// console.log(info);
	const editorContent = document.querySelector('.EditorPickGameSec--Tags');

	if (!!editorContent) {
		const imgArray = fn.filter(
			a => a.nodeName === 'IMG',
			editorContent.querySelectorAll('*'),
		);
		for (let key of imgArray) {
			key.parentNode.classList.add('image');
		}
	}

	return (
		<div className="EditorPickGameSec">
			<div className="EditorPickGameSec--Title">
				<Title size="largest">{`${index + 1}. ${info.game_title}`}</Title>
				<div className="underline" />
			</div>
			<div
				className="EditorPickGameSec--Tags"
				dangerouslySetInnerHTML={createMarkup(info.editor_content)}
			/>
			<div className="EditorPickGameSec--GameCard">
				{Array.isArray(info) &&
					info.gameInfo.map(info => {
						return (
							<Link to={`/info/${info.game_id}`}>{EditorLongCard(info)}</Link>
						);
					})}
			</div>
		</div>
	);
};

export default EditorPickGameSec;
