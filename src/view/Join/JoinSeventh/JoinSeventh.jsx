import React, { useState, useEffect } from 'react';
import './JoinSeventh.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../static/images/Superplayer_L.svg';
import { ReactComponent as LogoS } from '../../../static/images/Logo_S.svg';
import Title from '../../../components/Title/Title';
import QuesitionTitle from '../../../components/QuesitionTitle/QuesitionTitle';
import Button from '../../../components/Button/Button';
import JoinFinalCard from '../../../components/JoinFinalCard/JoinFinalCrad';
import Media from 'react-media';
import { connect } from 'react-redux';
import StepProgressBar from '../../../components/StepProgressBar/StepProgressBar';
// import { selectWhatTaste } from '../../../store/Layout/Layout.store';

//TODO: 선택 count
const JoinSeventh = ({
	changeJoinSubMenu,
	email,
	tasteList,
	userTastem,
	changeMenu,
	putLikeGame,
	like,
}) => {
	const [example, setExample] = useState([
		{
			game_id: 1,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 2,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 3,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 4,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 5,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 6,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 7,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 8,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 9,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 10,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 11,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 12,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 13,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 14,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
		{
			game_id: 15,
			img_src: 'https://storage.googleapis.com/game_info/game_image/1.png',
			game_title: 'Mega Man Zero/ZX Legacy Collection',
			game_release_date: '2020-2-26',
			game_tag: '액션, RPG',
			game_desc:
				'미리 다운로드(예약구입) 상품입니다."Mega Man Zero" 시리즈 4작품"Mega Man ZX" 시리즈 2작품총 6작품에 새로운 게임 모드도 갖추어 등장!"Mega Man Zero", "Mega Man Zero 2", "Mega Man Zero 3", "Mega Man Zero 4", "Mega Man ZX", "Mega Man ZX Advent"의 6개의 타이틀이 하나로!스토리를 즐기고 싶은 분을 위해 \'Casual Mode\'와 \'Save-Assist\'등의 기능도 준비되어있습니다.또한, 이번 작품을 위해 새롭게 만들어진 게임 모드 \'Z Chaser\'도 즐기실 수 있습니다.',
			game_developer: 'CAPCOM',
		},
	]);

	const onClickLike = id => {
		const filterExample = example.map(game =>
			!game.fun
				? game.game_id === id
					? {
							...game,
							like: !game.like,
					  }
					: game
				: game.game_id === id
				? { ...game, fun: !game.fun, like: !game.like }
				: game,
		);
		setExample(filterExample);
	};

	const onClicFun = id => {
		const filterExample = example.map(game =>
			!game.like
				? game.game_id === id
					? { ...game, fun: !game.fun }
					: game
				: game.game_id === id
				? { ...game, fun: !game.fun, like: !game.like }
				: game,
		);
		setExample(filterExample);
	};

	const filterArray = example.filter(game => game.like || game.fun);

	putLikeGame(filterArray.length);

	const onClickSubmit = () => {
		if (like < 15) {
			changeJoinSubMenu('eight');
		} else {
			changeMenu('home');
		}
	};
	
	return (
		<Media query={{ maxWidth: 768 }}>
			{matches =>
				matches ? (
					//************************
					// 모바일
					//************************/
					<div className="JoinSeventh">
						<header className="header--wrapper">
							<Link to="/" className="Logos" onClick={() => changeMenu('home')}>
								<LogoS className="LOGOS logos" />
								<Logo className="LOGOS logo" />
							</Link>
							<Button
								size="radius"
								color="butaet"
								onClick={() => changeJoinSubMenu('eight')}
							>
								다음
							</Button>
						</header>
						<div className="JoinSeventh--Header">
							<div className="skip" />
							<div className="title">취향선택</div>
							<div className="skip">skip</div>
						</div>
						<div className="JoinSeventh--Body">
							<QuesitionTitle number={4}>
								플레이어님의 취향을 알려주세요!
								<p className="miniTitle">
									<b>{15}</b> 개를 달성하시면 <span>보상 시스템</span>이
									오픈돼요!
									<br />
									<b>{15 - like}</b> 개 남았습니다!
								</p>
							</QuesitionTitle>
							<div className="body">
								<StepProgressBar step={4} type="count" />
								<div className="games">
									{example.map(item => {
										return (
											<JoinFinalCard
												game={item}
												heart={item.like}
												like={item.fun}
												onClickFun={onClicFun}
												onClickLike={onClickLike}
											/>
										);
									})}
								</div>
							</div>
						</div>
						{/* <div className="JoinSeventh--Footer">
							<div className="back" onClick={() => changeJoinSubMenu('fifth')}>
								뒤로
							</div>
							<div className="next" onClick={() => changeJoinSubMenu('eight')}>
								선택완료
							</div>
						</div> */}
					</div>
				) : (
					//************************
					// 데스크
					//************************/
					<div className="JoinSeventh">
						<header className="header--wrapper">
							<Link to="/" className="Logos" onClick={() => changeMenu('home')}>
								<LogoS className="LOGOS logos" />
								<Logo className="LOGOS logo" />
							</Link>
							<Button
								size="radius"
								color="butaet"
								outline
								onClick={() => changeJoinSubMenu('eight')}
							>
								다음
							</Button>
						</header>
						<div className="JoinSeventh-title">
							{/* <Title border="thick" size="large">
								취향선택
							</Title> */}
							<div className="JoinSeventh--progressBar">
								<StepProgressBar step={3} type="step" count={3} />
								<div className="JoinSeventh-question">
									<div className="title">
										<QuesitionTitle number={4}>
											플레이어님의 취향을 알려주세요!
											<p className="miniTitle">
												<b>15</b> 개를 달성하시면 <span>보상 시스템</span>이
												오픈돼요!
												<br />
												<b>{15 - like}</b> 개 남았습니다!
											</p>
										</QuesitionTitle>
										<Button
											size="small"
											color="only-gray"
											onClick={() => {
												return changeMenu('home');
											}}
										>
											skip
										</Button>
									</div>

									<div className="JoinSeventh--content-box">
										{example.map(item => {
											return (
												<JoinFinalCard
													game={item}
													heart={item.like}
													like={item.fun}
													onClickFun={onClicFun}
													onClickLike={onClickLike}
												/>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			}
		</Media>
	);
};

export default JoinSeventh;
