import React from 'react';
import './CommunityReportCard.scss';

import BlueTag from '../../static/images/Card/tag.png'
import { ReactComponent as Locker } from '../../static/images/Community/Locker.svg'
const CommunityReportCard = ({ secret, comment }) => {
	return (
		<div className="CommunityReportCard">
			{
				secret ? (
					<div className="CommunityReportCard--secret">
						<Locker/>
						관리자만 볼 수 있는 비밀글 입니다.
					</div>
				) : (
					<>
						<div className="CommunityReportCard--info">
							<div className="info--profile">
								<img />
							</div>
							<div className="info--report">
								<div className="info--top">
									<div className="type">[버그신고]</div>
									<div className="nickname">닉네임</div>
									<div className="date">2020.01.03</div>
									<div className="delete">12321</div>
								</div>
								<div className="info--bottom">
									당근 레벨 증가를 멕스로 다 채웠으면 단계를 설정할 수 있도록만 더 추가해주시면 완벽한 게임 같습니다. 당근레벨 증가가 한번 올리면 제가 열심히 찾아봤는데 그냥 끝인 것 같아요. 그게 제일 아쉽네요. 그래도 게임 잘하고 있습니다 !!!
								</div>
							</div>
						</div>
						{
							comment && (
								<div className="CommunityReportCard--answer">
									<div className="answer--title">
										<img src={BlueTag}/>
										<span className="answer--name">GM 햄스터</span>
									</div>
									<div className="answer--text">
										당근 레벨 증가를 멕스로 다 채웠으면 단계를 설정할 수 있도록만 더 추가해주시면 완벽한 게임 같습니다. 당근레벨 증가가 한번 올리면 제가 열심히 찾아봤는데 그냥 끝인 것 같아요. 그게 제일 아쉽네요. 그래도 게임 잘하고 있습니다 !!!
									</div>
								</div>
							)
						}
					</>
				)
			}
		</div>
	);
};

export default CommunityReportCard;
