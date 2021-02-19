import React from 'react';
import './RewardList.scss';

import FigureImage from '../../static/images/RewardList/group-126.png';
import fillFigure from '../../static/images/RewardList/group-255.png';
import FillStamp from '../../static/images/RewardList/group-86.png';
import EmptyStamp from '../../static/images/RewardList/path-362.png';

import stampIcon from '../../static/images/RewardList/stamp.png';
import Media from 'react-media';

const RewardList = ({ count, attendance }) => {
	let array = [];
	const renderStamp = count => {
		for (let i = 0; i < count; i++) {
			array.push(<img src={FillStamp} alt="stamp" key={i + 'fill'} />);
		}
		for (let i = 0; i < 10 - count; i++) {
			array.push(<img src={EmptyStamp} alt="stamp" key={i + 'empty'} />);
		}

		return array.map(item => {
			return item;
		});
	};

	return (
		<div className="RewardList">
			<div className="RewardList--top">
				<div className="RewardList--top__left">{renderStamp(count)}</div>
				<div className="RewardList--top__right">
					<Media query={{ minWidth: 769 }}>
						{matches =>
							matches && (
								<img
									src={count >= 10 ? fillFigure : FigureImage}
									alt="figure-image"
								/>
							)
						}
					</Media>
					
					<span className={count >= 10 ? 'active' : null}>
						랜덤 피규어 받기
					</span>
				</div>
			</div>
			<div className="RewardList--down">
				<div className="RewardList--down__attendance">
					<div className="RewardList--down__attendance--left">
						<span>출석체크</span>
						<div className="attendance-bar">
							<div className={`progress progress${attendance}`}></div>
						</div>
						<span className="count-number">({attendance} / 10)</span>
					</div>
					<button
						className="RewardList--down__attendance--right"
						disabled={attendance < 10}
					>
						<img src={stampIcon} alt="icon" />
						<span>외계우표 받기</span>
					</button>
				</div>
				<div className="RewardList--down__buttonbox">
					<div className="box">
						<div className="square"></div> 내 진열장
					</div>
					<div className="box">
						<div className="square"></div> 내 외계우표
					</div>
					<div className="box">
						<div className="square"></div> 내 보상내역
					</div>
				</div>
			</div>
		</div>
	);
};

RewardList.defaultProps = {
	count: 0,
	attendance: 0,
};

export default RewardList;
