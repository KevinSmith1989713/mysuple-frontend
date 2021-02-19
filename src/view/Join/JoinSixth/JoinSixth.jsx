import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './JoinSixth.scss';
import { ReactComponent as Logo } from '../../../static/images/Superplayer_L.svg';
import { ReactComponent as LogoS } from '../../../static/images/Logo_S.svg';
import Title from '../../../components/Title/Title';
import QuesitionTitle from '../../../components/QuesitionTitle/QuesitionTitle';
import Button from '../../../components/Button/Button';
import Media from 'react-media';
import StepProgressBar from '../../../components/StepProgressBar/StepProgressBar';
import { tags } from './JoinSixthTags';
import { choose } from '../../../Utils/func';

//TODO: 선택 count
const JoinSixth = ({
	changeJoinSubMenu,
	showJoinTaste,
	userTaste,
	userTypeTaste,
	selectTypeQuestion,
	changeMenu,
}) => {
	const [selected, setSelected] = useState([]);
	const [flag, setFlag] = useState(false);

	const addTag = id => {
		if (selected.indexOf(id) != -1) {
			const newArr = selected;
			const itemToFind = newArr.find(function(item) {
				return item === id;
			});
			const idx = newArr.indexOf(itemToFind);
			if (idx > -1) newArr.splice(idx, 1);
			setSelected(newArr);
		} else {
		
			const newArr = selected;
			
			newArr.push(id);
			setSelected(newArr);
		}
	};
	useEffect(() => {}, [flag]);
	const onClicFun = id => {
		showJoinTaste(
			userTaste.single,
			userTaste.multi,
			userTaste.pc,
			userTaste.mobile,
			userTaste.console1,
			userTypeTaste.shooting,
			userTypeTaste.sports,
			userTypeTaste.horror,
			userTypeTaste.gore,
			userTypeTaste.daily,
			userTypeTaste.music,
			userTypeTaste.racing,
			userTypeTaste.strategy,
			userTypeTaste.adventure,
			userTypeTaste.rpg,
			userTypeTaste.love,
			userTypeTaste.puzzle,
			userTypeTaste.fantasy,
			userTypeTaste.movie,
			userTypeTaste.casual,
			userTypeTaste.survival,
			userTypeTaste.vr,
			userTypeTaste.indie,
			userTypeTaste.action,
			userTypeTaste.fight,
			userTypeTaste.violence,
			userTypeTaste.simulation,
			userTypeTaste.moba,
			userTypeTaste.ps,
			userTypeTaste.nin,
			userTypeTaste.xbox,
		);
	};
	// console.log(selected);
	return (
		<Media query={{ maxWidth: 768 }}>
			{matches =>
				matches ? (
					//************************
					// 모바일
					//************************/
					<div className="JoinSixth">
						<header className="header--wrapper">
							<Link to="/" className="Logos" onClick={() => changeMenu('home')}>
								<LogoS className="LOGOS logos" />
								<Logo className="LOGOS logo" />
							</Link>
							<Button
								size="radius"
								color="butaet"
								onClick={() => changeJoinSubMenu('seventh')}
							>
								다음
							</Button>
						</header>
						<div className="JoinSixth--Header">
							<div className="skip" />
							<div className="title">취향선택</div>
							<div className="skip" onClick={() => changeMenu('home')}>
								skip
							</div>
						</div>
						<div className="JoinSixth--Body">
							<QuesitionTitle number={3}>
								플레이어님이 좋아하는 태그를 선택해주세요!
							</QuesitionTitle>
							<div className="body">
								<StepProgressBar step={3} />
								<div className="tags">
									{tags.map((tag, index) => {
										return (
											<div
												className="tag"
												key={index}
												onClick={() => {
													addTag(tag.id);
													setFlag(!flag);
													choose(
														tag.type,
														userTypeTaste[`${tag.type}`] === '0' ? '1' : '0',
														selectTypeQuestion,
													);
												}}
											>
												<div className="tag--img">
													{selected.indexOf(tag.id) != -1 ? (
														<tag.img />
													) : (
														<tag.grey_img />
													)}
												</div>
												<div className="tag--name">#{tag.name}</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						{/* <div className="JoinSixth--Footer">
							<div className="back" onClick={() => changeJoinSubMenu('fifth')}>
								뒤로
							</div>
							<div
								className="next"
								onClick={() => changeJoinSubMenu('seventh')}
							>
								선택완료
							</div>
						</div> */}
					</div>
				) : (
					//************************
					// 데스크
					//************************/
					<div className="JoinSixth">
						
						<header className="header--wrapper">
							<Link to="/" className="Logos" onClick={() => changeMenu('home')}>
								<LogoS className="LOGOS logos" />
								<Logo className="LOGOS logo" />
							</Link>
							<div className="button--wrapper">
								<Button
									className="back"
									size="radius"
									color="butaet"
									outline
									onClick={() => changeJoinSubMenu('fifth')}
								>
									이전으로
								</Button>
								<Button
									size="radius"
									color="butaet"
									outline
									onClick={() => changeJoinSubMenu('seventh')}
								>
									다음
								</Button>
							</div>
						</header>
						<div className="JoinSixth-title">
							{/* <Title border="thick" size="large">
								취향선택
							</Title> */}
						</div>
						<div className="JoinSixth--progressBar">
							<StepProgressBar step={3} />
							<div className="JoinSixth--Tags">
								<div className="title--box">
									<QuesitionTitle number={3}>
										플레이어님이 좋아하는 태그를 선택해주세요!
									</QuesitionTitle>{' '}
									<Button
										size="small"
										color="only-gray"
										onClick={() => changeMenu('home')}
									>
										skip
									</Button>
								</div>
								<div className="tags">
									{tags.map((tag, index) => {
										console.log(tag.id);
										// console.log('이게궁금', selected.indexOf(tag.id));
										return (
											<div
												className="tag"
												key={index}
												onClick={() => {
													addTag(tag.id);
													setFlag(!flag);
													choose(
														tag.type,
														userTypeTaste[`${tag.type}`] === '0' ? '1' : '0',
														selectTypeQuestion,
													);
												}}
											>
												<div className="tag--img">
													{selected.indexOf(tag.id) != -1 ? (
														<tag.img />
													) : (
														<tag.grey_img />
													)}
												</div>
												<div className="tag--name">#{tag.name}</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				)
			}
		</Media>
	);
};

export default JoinSixth;
