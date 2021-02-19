import React, { useState, useEffect } from 'react';

import closeBtnGray from '../../../static/images/closeBtnGray.svg';
import faceBook from '../../../static/images/League/faceBook.svg';
import kakaoTalk from '../../../static/images/League/kakaoTalk.svg';
import twitter from '../../../static/images/League/twitter.svg';
import link from '../../../static/images/League/link.svg';

import DocumentMeta from 'react-document-meta';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import $ from 'jquery';
window.$ = window.jQuery = jQuery;

// import './TemporaryModal.scss';

const LeagueShareModal = ({ shareModal, setShareModal, insertLeagueInfo }) => {
	const url = window.location.href;
	const [copied, setCopied] = useState(false);

	const snsShare = (snsName, link, title) => {
		if (title === null) return false;
		var snsPopUp;
		var _width = '500';
		var _height = '550';
		var _left = Math.ceil((window.screen.width - _width) / 2);
		var _top = Math.ceil((window.screen.height - _height) / 2);

		switch (snsName) {
			case 'facebook':
				snsPopUp = window.open(
					'http://www.facebook.com/sharer/sharer.php?u=' +
						encodeURIComponent(link),
					'',
					'width=' +
						_width +
						', height=' +
						_height +
						', left=' +
						_left +
						', top=' +
						_top,
				);
				break;

			case 'twitter':
				snsPopUp = window.open(
					'http://twitter.com/intent/tweet?url=' + link + '&text=' + title,
					'',
					'width=' +
						_width +
						', height=' +
						_height +
						', left=' +
						_left +
						', top=' +
						_top,
				);
				break;

			case 'kakao':
				snsPopUp = window.open(
					'https://story.kakao.com/share?url=' + link,
					'',
					'width=' +
						_width +
						', height=' +
						_height +
						', left=' +
						_left +
						', top=' +
						_top,
				);
				break;
		}
	};
	const sendLink = () => {
		try {
			if (Kakao) {
				window.Kakao.init('2104391f817f495da19cdd1b00cfac6a');
			}
		} catch (e) {}

		window.Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
				title: insertLeagueInfo.league_title,
				imageUrl: insertLeagueInfo.league_main_img, // 썸네일 이미지
				link: {
					mobileWebUrl: window.location.href, // 모바일 카카오톡에서 사용하는 웹 링크 URL
					webUrl: window.location.href, // PC버전 카카오톡에서 사용하는 웹 링크 URL
				},
			},
			// buttons: [
			// 	{
			// 		title: '게시글 확인', // 버튼 제목
			// 		link: {
			// 			mobileWebUrl: 'http://magic.wickedmiso.com/', // 모바일 카카오톡에서 사용하는 웹 링크 URL
			// 			webUrl: 'http://magic.wickedmiso.com/', // PC버전 카카오톡에서 사용하는 웹 링크 URL
			// 		},
			// 	},
			// ],
		});
		window.Kakao.API.cleanup();
	};

	const meta = {
		title: 'Samvikshana - New Perspective of Exploration',
		meta: {
			property: {
				'fb:app_id': '1968599903270931',
				'og:title': insertLeagueInfo.league_title,
				'og:url': 'https://samvikshana.weebly.com/',
				'og:image': insertLeagueInfo.league_main_img,
				'og:description': 'New Perspective of Exploration',
				'twitter:card': 'summary_large_image',
				'twitter:title': insertLeagueInfo.league_title,
				'twitter:description': 'New Perspective of Exploration',
				'twitter:image': insertLeagueInfo.league_main_img,
			},
		},
	};
	// console.log(meta);

	return (
		<DocumentMeta {...meta}>
			<div className="modal--container">
				<button
					className="background"
					type="button"
					onClick={() => setShareModal(!shareModal)}
				/>
				<article className="modal--box">
					<div className="modal__title">
						<h1>공유하기</h1>
						<button type="button" onClick={() => setShareModal(!shareModal)}>
							<img className="closeBtn" src={closeBtnGray} />
						</button>
					</div>
					<ul className="modal--inner share">
						<li className="share--box">
							<button
								className="snsBtn"
								onClick={() => snsShare('facebook', url, '리그제목')}
							>
								<img src={faceBook} />
							</button>
							<p>페이스북</p>
						</li>
						<li className="share--box">
							<button className="snsBtn kakaoTalk" onClick={() => sendLink()}>
								<img src={kakaoTalk} />
							</button>
							<p>카카오톡</p>
						</li>
						<li className="share--box">
							<button
								className="snsBtn twitter"
								onClick={() =>
									snsShare('twitter', url, insertLeagueInfo.league_title)
								}
							>
								<img src={twitter} />
							</button>
							<p>트위터</p>
						</li>
						<CopyToClipboard
							text={url}
							onCopy={() => {
								setCopied(true);
								setTimeout(() => {
									setCopied(false);
								}, 1000);
							}}
						>
							<li className="share--box">
								<button className="snsBtn copy">
									<img src={link} />
								</button>
								<p>URL 복사</p>
							</li>
						</CopyToClipboard>
					</ul>
					<div className={`box__alert${copied ? ' alert' : ''}`}>
						<strong>복사 되었습니다.</strong>
					</div>
				</article>
			</div>
		</DocumentMeta>
	);
};

export default LeagueShareModal;
