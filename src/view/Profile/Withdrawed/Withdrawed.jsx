import React,{ useState } from 'react';
import './Withdrawed.scss';
import Title from '../../../components/Title/Title';
import WithdrawImage from '../../../static/images/Withdraw/withdrawPoster.png';

const Withdrawed = ({ userInfo, onClick }) => {
	const name = userInfo.nickName;

	return (
		<div className="Withdrawed">
			<div className="Goodbye">안녕히 가세요, <span>{name}</span>님! </div>
			<div className="txtTop-top">광활한 우주에서 만나서 반가웠어요</div>
			<div className="txtTop-bot">다시 만나는 그날까지 건강하고 행복하세요!</div>
			<div className="txtBot-top">G O O D  B Y E</div>
			<div className="txtBot-bot">그동안 슈플을 이용해 주셔서 감사합니다</div>
		</div>
	);
};

export default Withdrawed;

