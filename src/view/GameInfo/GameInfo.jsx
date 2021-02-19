import React, { useEffect, useState, Fragment } from 'react';
import './GameInfo.scss';
import Card from '../../components/Card/Card';
import LargeCard from '../../components/LargeCard/LargeCard';

var rowIndex = 0;
let gameRowArray = [];
const GameInfo = React.memo(
	({
		rowStateIndex,
		cardStateIndex,
		selectedItem,
		gameInfo,
		onClickShowInfo,
		selectLikeGame,
		selectAlarmGame,
		userInfo,
		pathname,
		sessionKey,
		insertReview,
		isSearch,
		searchText,
		isMore,
	}) => {
		const [array, setArray] = useState([]);
		useEffect(() => {
			gameRowArray = [];
			setArray(gameInfo);

			return () => {
				setArray([]);
				gameRowArray = [];
			};
		}, [searchText, isMore]);

		useEffect(() => {
			setArray(gameInfo);

			return () => {
				// setArray([]);
			};
		}, [gameInfo]);

		useEffect(() => {
			return () => {
				gameRowArray = [];
			};
		}, [pathname]);

		if (window.innerWidth > 769 && array != null) {
			for (var i = 0; array.length != 0; i++) {
				gameRowArray.push(array.splice(0, 4));
				if (gameRowArray.length <= 4) {
					let length = gameRowArray[gameRowArray.length - 1].length;
					for (var i = 0; i < 4 - length; i++) {
						gameRowArray[gameRowArray.length - 1].push(null);
					}
				}
			}
		}

		if (window.innerWidth < 768 && !!array) {
			for (var i = 0; array.length != 0; i++) {
				gameRowArray.push(array.splice(0, 2));
				if (gameRowArray.length <= 2) {
					let length = gameRowArray[gameRowArray.length - 1].length;
					for (var i = 0; i < 2 - length; i++) {
						gameRowArray[gameRowArray.length - 1].push(null);
					}
				}
			}
		}

		return gameRowArray.map((row, index) => {
			rowIndex = index;
			return (
				<div className="Cards--with--Detail" key={index}>
					<div className="Cards--row" key={index}>
						{row.map((card, index) => {
							const parentIndex = rowIndex;
							return card ? (
								<Card
									size="medium"
									info={card}
									clickCursor="pointer"
									tag={5}
									onClick={() => onClickShowInfo(parentIndex, index, card)}
									key={index}
									selectLikeGame={selectLikeGame}
									selectAlarmGame={selectAlarmGame}
									selected={
										rowStateIndex === rowIndex && cardStateIndex === index
									}
									userInfo={userInfo}
									sessionKey={sessionKey}
								/>
							) : (
								<Card
									size="medium"
									info={card}
									key={index}
									selectLikeGame={selectLikeGame}
									selectAlarmGame={selectAlarmGame}
									selected={
										rowStateIndex === rowIndex && cardStateIndex === index
									}
									userInfo={userInfo}
								/>
							);
						})}
					</div>
					<div
						className={rowStateIndex === index ? 'selected' : 'none'}
						index={index}
					>
						<LargeCard
							info={selectedItem}
							selectLikeGame={selectLikeGame}
							selectAlarmGame={selectAlarmGame}
							insertReview={insertReview}
							userInfo={userInfo}
						/>
					</div>
				</div>
			);
		});
	},
);

export default GameInfo;
