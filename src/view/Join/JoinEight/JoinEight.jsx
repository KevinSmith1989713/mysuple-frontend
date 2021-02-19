import React, { useState, useEffect } from 'react';
import './JoinEight.scss';
import Button from '../../../components/Button/Button';
import { ReactComponent as Showcase } from '../../../static/images/Join/showcaseOpen.svg';

const JoinEight = ({ changeJoinSubMenu, tasteList, changeMenu, like }) => {
	

	return (
		<div className="JoinEight">
			<Showcase className="img" />
			<div className="title">
				게임을 {15 - like}개 더 골라주셔야
				<br /> <b>진열장</b>을 구경하실 수 있어요!
			</div>

			<Button onClick={() => changeJoinSubMenu('seventh')}>
				게임 더 선택 하기
			</Button>
			<br />
			<Button
				onClick={() => {
					changeMenu('home');
				}}
			>
				슈플 메인으로 가기
			</Button>
		</div>
	);
};

export default JoinEight;
