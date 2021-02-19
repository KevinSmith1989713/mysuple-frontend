import React, { useState } from 'react';
import './JoinFinalCrad.scss';

import Media from 'react-media';

import HeartActive from '../../static/images/JoinCard/heart.png';
import HeartInActive from '../../static/images/JoinCard/heartNotFill.png';
import GoodActive from '../../static/images/JoinCard/good-blue.png';
import GoodInActive from '../../static/images/JoinCard/good-blue-notfill.png';

const JoinFinalCard = ({
	game,
	heart = false,
	like = false,
	onClickFun,
	onClickLike,
}) => {
	const [exampleFold, setExampleFold] = useState(false);
	return (
		<div className="JoinFinalCard">
			<div className="JoinFinalCard--Img">
				<img src={game.img_src} alt="poster" />
			</div>
			<div
				className="JoinFinalCard--Box"
				onClick={() => {
					setExampleFold(!exampleFold);
				}}
			>
				<div className="Box--top">
					<div className="description">
						<p className="title">{game.game_title}</p>
						<div className="text--box">
							<p className="calendar--img img--size" />
							<span className="release">{game.game_release_date}</span>
						</div>
						<div className="text--box">
							<p className="tag--img img--size" />
							<span className="tag">{game.game_tag}</span>
						</div>
					</div>
					<Media query={{ maxWidth: 768 }}>
						{matches =>
							matches && (
								<div className="explain">
									<p
										className={
											exampleFold ? 'explain__visible' : 'explain__none'
										}
									>
										{game.about ? game.about : 'Sorry, no description'}
									</p>
								</div>
							)
						}
					</Media>
					<div className="buttons">
						<div
							className="button"
							onClick={e => {
								e.stopPropagation();
								onClickLike(game.game_id);
							}}
						>
							<img
								src={heart ? HeartActive : HeartInActive}
								alt="HeartIcon"
								className="JoinFinalCard-imageGroup--image__icon"
							/>
							<p>하고싶어요</p>
						</div>
						<div
							className="button"
							onClick={e => {
								e.stopPropagation();
								onClickFun(game.game_id);
							}}
						>
							<img
								src={like ? GoodActive : GoodInActive}
								alt="GoodIcon"
								className="JoinFinalCard-imageGroup--image__icon"
							/>
							<p>재미있어요</p>
						</div>
					</div>
				</div>
				<Media query={{ minWidth: 769 }}>
					{matches =>
						matches && (
							<div className="Box--bottom">
								<p className={exampleFold ? 'explain' : 'explain__none'}>
									{game.game_desc ? game.game_desc : 'Sorry, no description'}
								</p>
							</div>
						)
					}
				</Media>
			</div>
		</div>
	);
};

export default JoinFinalCard;
