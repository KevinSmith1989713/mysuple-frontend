import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import './EditorPickGameSec.scss';
import Title from '../Title/Title';
import Card from '../Card/Card';
import Fxjs from '../../Utils/fxjs';

let fn = new Fxjs();
const EditorLongCard = info => {
	return (
		<Fragment>
			<Card info={12321} isBtn={false} />
			<div className="EditorLongCard--introduce">12321</div>
		</Fragment>
	);
};
const EditorPickGameSec = ({ info }) => {
	let content = React.createRef();
	const editorContent = document.querySelector('.EditorPickGameSec');

	if (!!editorContent) {
		const imageArray = fn.filter(
			a => a.nodeName === 'IMG',
			editorContent.querySelectorAll('*'),
		);
		let result = [];

		for (let key of imageArray) {
			key.parentNode.classList.add('image');
		}
	}

	useEffect(() => {
		content.current.innerHTML = `
    
      <h1 class="main-title">${info.main.editor_title}</h1>
      <h4 class="sub-title">${info.main.editor_subTitle}</h4>
      <div class="under-line"></div>
      <div class="test">
        ${info.main.editor_mainContent}
      </div>
      ${fn.go(
				info.sub,
				fn.sum(
					p =>
						`
            <h1 class="main-title">${p.game_title}</h1>
            <div class="under-line"></div>
            <div class="test">
              ${p.editor_content}
            </div>
            ${fn.go(
							p.gameInfo,
							fn.sum(
								info => `
                <a href=/info/${info.game_id} class="card-link">
                  <div class="card">
                    <img src=${info.image_src} class="game-image"/>
                  </div>
                </a>    
              `,
							),
						)}
            
            `,
				),
			)}`;
	}, []);

	return (
		<div className="EditorPickGameSec">
			<div className="dangerous--html" ref={content} />
			<Link to="/">링크</Link>
		</div>
	);
};

export default EditorPickGameSec;
