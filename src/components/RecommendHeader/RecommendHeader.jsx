import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { Link } from 'react-router-dom';
import Title from '../../components/Title/Title';
import communityService from '../../services/curatingService';
import './RecommendHeader.scss';
import Card from '../Card/Card';
import Withdraw from '../../static/images/Home/UnknownDuck.png';
import CuratingSelectCard from '../CuratingSelectCard/CuratingSelectCard';
import Media from 'react-media';

const RecommendHeader = ({ info, className, visible, ...rest }) => {
	const [curatedOther, setOther] = useState(null);
	const [games, setGames] = useState(null);
	const [tagList, setTags] = useState(null);
	// const [ tagCount, setTagCount] = useState(0);
	const [curatingInfo, setInfo] = useState(null);
	useEffect(() => {
		const email = null;

		communityService.reqMainOtherCurating().then(e => {
			setInfo(e.Info.cureated_game_list[0]);
			setGames(e.Info.info);
			setOther(e.Info.other_profile);
			if (e.Info.cureated_game_list[0].curating_tag) {
				const tagLists = e.Info.cureated_game_list[0].curating_tag.split(',');
				setTags(tagLists);
			}
		});
		if (email) {
			communityService.reqMainYourCurating().then(e => {});
		}
	}, [window.location.pathname]);

	return (
		<div className="RecommendHeader--body">
			<div className="Recommend--custom">
				<div className="most--curating">
					<div className="most--curating__headers">
						<div className="header--title">
							<Title>
								<span className="yellow">
									{!!curatedOther && curatedOther.nickname}
								</span>
								님의 큐레이팅
							</Title>
							<Title>{!!curatingInfo && curatingInfo.curating_title}</Title>
						</div>
						<div className="header--more">
							<div className="mmore">더보기</div>
						</div>
					</div>
					<div className="most--curating__tags">
						{!!tagList &&
							tagList.length != 0 &&
							tagList.map((tag, index) => {
								if (index <= 4 && tag.length != 0) {
									return (
										<div className="tag" key={index}>
											#{tag}
										</div>
									);
								}
							})}
					</div>
					<div className="most--curating__cards">
						<Media query={{ minWidth: 769 }}>
							{matches =>
								matches
									? !!games &&
									  games.map((game, index) => {
											return (
												index <= 2 && (
													<Card key={index} info={game} size="recommendCard" />
												)
											);
									  })
									: !!games &&
									  games.map((game, index) => {
											return (
												index <= 1 && (
													<Card key={index} info={game} size="recommendCard" />
												)
											);
									  })
							}
						</Media>
					</div>
				</div>
				<div className="custom--curating">
					<img src={Withdraw} className="none" />
					{/* <>
					<div className="custom--curating__header">
						<Title><span className="yellow">김슈플</span> 플레이어님의 게임도</Title>
						<Title>큐레이팅 해 보세요!</Title>
					</div>
					<div className="custom--curating__cards">
						<div className="card">
							<CuratingSelectCard/>
						</div>
						<div className="card">
							<CuratingSelectCard/>
						</div>
						<div className="card">
							<CuratingSelectCard/>
						</div>
					</div>
					<div className="custom--curating--more">
						<span>큐레이팅 보기</span>
					</div>
					</> */}
				</div>
			</div>
		</div>
	);
};

RecommendHeader.defaultProps = {
	info: null,
};

export default RecommendHeader;
