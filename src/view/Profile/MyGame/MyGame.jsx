import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button/Button';
import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import './MyGame.scss';
import MypageSubHeader from '../../../components/MypageSubHeader/MypageSubHeader';
import MyGameCard from '../../../components/MyGameCard/MyGameCard';
import { MyGameData } from '../../../assets/dummyData/MyGame';

const MyGame = ({ myGameList, reqMyContantsList }) => {
	const [nav, setNav] = useState(0);
	const callback = count => setNav(count);

	useEffect(() => {
		reqMyContantsList();
	}, []);

	return (
		<div className="MyGame">
			{window.innerHeight > 768 ? (
				<ProfileTitle>
					나의 게임
					<div className="ProfileTitle--sub">
						{/* 좋아요, 할인 알림을 켜 둔 게임이 표시됩니다 */}
					</div>
				</ProfileTitle>
			) : (
				''
			)}

			<MypageSubHeader
				parentCallback={callback}
				tabs={[
					{ id: 'prefer', title: '선호게임' },
					// { id: 'library', title: '라이브러리' },
				]}
			/>
			{nav === 0 && (
				<div className="ProfileTitle--body prefer">
					{myGameList &&
						myGameList.map(myGame => {
							return <MyGameCard cardInfo={myGame} key={myGame.id} />;
						})}
				</div>
			)}

			{/* {nav === 1 && (
				<div className="ProfileTitle--body library">준비중입니다!</div>
			)} */}
		</div>
	);
};

export default MyGame;
