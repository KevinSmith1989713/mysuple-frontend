import React, { useState } from 'react';
import classNames from 'classnames';
import './ContentBox.scss';

import BATTLEGROUND from '../../static/images/GamePoster/battleground.jpg';
import DEADBYDAYLIGHT from '../../static/images/GamePoster/deadbydaylight.jpg';
import DONTSTARVE from '../../static/images/GamePoster/dontstarve.jpg';
import GTA5 from '../../static/images/GamePoster/gta5.jpg';
import MAPLESTORY from '../../static/images/GamePoster/maplestory.jpg';
import MINECRAFT from '../../static/images/GamePoster/minecraft.jpg';
import MONSTERHUNTER from '../../static/images/GamePoster/monsterhunter.jpg';
import OVERWATCH from '../../static/images/GamePoster/overwatch.jpeg';
import RAINBOWSIXSEIGE from '../../static/images/GamePoster/rainbowsixseige.jpg';
import SIMS4 from '../../static/images/GamePoster/sims4.jpg';
import WHITEDAY from '../../static/images/GamePoster/whiteday.jpeg';
import WITCHER from '../../static/images/GamePoster/witcher.jpg';
import Media from 'react-media';

const example = [
	{
		genra: '샌드박스',
		games: [
			{
				id: 1,
				title: '마인크래프트',
				tag: ['생존', '오픈월드', '광질'],
				poster: MINECRAFT,
				likes: 2000,
			},
			{
				id: 2,
				title: 'GTA5',
				tag: ['액션', '범죄', '뱅뱅뱅'],
				poster: GTA5,
				likes: 2000,
			},
			{
				id: 3,
				title: '심즈4',
				tag: ['시뮬레이션', '커스텀', '스토리'],
				poster: SIMS4,
				likes: 2000,
			},
		],
	},
	{
		genra: '공포',
		games: [
			{
				id: 1,
				title: '바이오하자드',
				tag: ['fps', '슈팅', '1인칭'],
				poster:
					'https://www.arthipo.com/image/cache/catalog/genel-tasarim/all-posters/oyun/0087-civilization6-1000x1000.jpg',
				likes: 2000,
			},
			{
				id: 2,
				title: '데바데',
				tag: ['호러', '생존', '데린이'],
				poster: DEADBYDAYLIGHT,
				likes: 2000,
			},
			{
				id: 3,
				title: '화이트데이',
				tag: ['갑툭튀', '탈출', '학원물'],
				poster: WHITEDAY,
				likes: 2000,
			},
		],
	},
	{
		genra: '생존',
		games: [
			{
				id: 1,
				title: '돈스타브 투게더',
				tag: ['fps', '슈팅', '1인칭'],
				poster: DONTSTARVE,
				likes: 2000,
			},
			{
				id: 2,
				title: '러스트',
				tag: ['생존', '멀티', '오픈월드'],
				poster:
					'http://cultureposters.com/wp-content/uploads/2019/08/fortnite.jpg',
				likes: 2000,
			},
			{
				id: 3,
				title: '위쳐',
				tag: ['오픈월드', 'RPG', '어드벤처'],
				poster: WITCHER,
				likes: 2000,
			},
		],
	},
	{
		genra: 'RPG',
		games: [
			{
				id: 1,
				title: '메이플스토리',
				tag: ['fps', '슈팅', '1인칭'],
				poster: MAPLESTORY,
				likes: 2000,
			},
			{
				id: 2,
				title: '로스트아크',
				tag: ['fps', '슈팅', '1인칭'],
				poster:
					'https://www.arthipo.com/image/cache/catalog/genel-tasarim/all-posters/oyun/0087-civilization6-1000x1000.jpg',
				likes: 2000,
			},
			{
				id: 3,
				title: '몬스터헌터',
				tag: ['액션', '오픈월드', 'RPG'],
				poster: MONSTERHUNTER,
				likes: 2000,
			},
		],
	},
	{
		genra: '캐주얼',
		games: [
			{
				id: 1,
				title: '캐치마인드',
				tag: ['fps', '슈팅', '1인칭'],
				poster:
					'http://cultureposters.com/wp-content/uploads/2019/08/fortnite.jpg',
				likes: 2000,
			},
			{
				id: 2,
				title: '캔디크러시사가',
				tag: ['fps', '슈팅', '1인칭'],
				poster:
					'http://cultureposters.com/wp-content/uploads/2019/08/fortnite.jpg',
				likes: 2000,
			},
			{
				id: 3,
				title: '쿠키런',
				tag: ['스피드', '슈팅', '1인칭'],
				poster:
					'http://cultureposters.com/wp-content/uploads/2019/08/fortnite.jpg',
				likes: 2000,
			},
		],
	},
	{
		genra: 'FPS',
		games: [
			{
				id: 1,
				title: '배틀그라운드',
				tag: ['생존', '슈팅', '배틀로얄'],
				poster: BATTLEGROUND,
				likes: 2000,
			},
			{
				id: 2,
				title: '레인보우식스시즈',
				tag: ['fps', '슈팅', '1인칭'],
				poster: RAINBOWSIXSEIGE,
				likes: 2000,
			},
			{
				id: 3,
				title: '오버워치',
				tag: ['fps', '슈팅', '1인칭'],
				poster: OVERWATCH,
				likes: 2000,
			},
		],
	},
];

const ContentBox = ({}) => {
	const [selected, setSelected] = useState(0);

	return (
		<div className={classNames('ContentBox')}>
			<div className="titles">
				{example.map((row, index) => {
					return index === 0 ? (
						<div
							className={`start-title ${
								selected === index ? ' selected-title' : 'title'
							} `}
							key={index}
							onClick={() => setSelected(index)}
						>
							#{row.genra}
						</div>
					) : index === example.length - 1 ? (
						<div
							className={`end-title ${
								selected === index ? ' selected-title' : 'title'
							} `}
							key={index}
							onClick={() => setSelected(index)}
						>
							#{row.genra}
						</div>
					) : (
						<div
							className={selected === index ? 'selected-title' : 'title'}
							key={index}
							onClick={() => setSelected(index)}
						>
							#{row.genra}
						</div>
					);
				})}
			</div>
			<div className="content">
				{example[selected].games.map((content, index) => {
					if (index === 0) {
						return (
							<Media query={{ minWidth: 769 }}>
								{matches =>
									matches && (
										<div className="long-partition" key={index}>
											<img className="poster" src={content.poster} />
											<div className="long-partition-bg" />
											<div className="title">
												<div className="long-main-title">{content.title}</div>
												<div className="long-sub-title">
													{content.tag.map(t => {
														return `#${t} `;
													})}
												</div>
												<div className="long-like">
													<span className="heart">♥</span>
													{content.likes}
												</div>
											</div>
										</div>
									)
								}
							</Media>
						);
					}
				})}
				<div className="puzzle-partition">
					{example[selected].games.map((content, index) => {
						if (index === 1) {
							return (
								<div className="square-partition" key={index}>
									<img className="square-partition__img" src={content.poster} />
									<div className="square-partition__texts">
										<div className="title">{content.title}</div>
										<div className="tag">
											{content.tag.map(t => {
												return `#${t} `;
											})}
										</div>
										<div className="like">
											<span className="heart">♥</span>
											{content.likes}
										</div>
									</div>
								</div>
							);
						}
					})}
					{example[selected].games.map((content, index) => {
						if (index === 2) {
							return (
								<div className="square-partition" key={index}>
									<div className="square-partition__texts">
										<div className="title">{content.title}</div>
										<div className="tag">
											{content.tag.map(t => {
												return `#${t} `;
											})}
										</div>
										<div className="like">
											<span className="heart">♥</span>
											{content.likes}
										</div>
									</div>
									<img className="square-partition__img" src={content.poster} />
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
};

ContentBox.defaultProps = {};

export default ContentBox;
