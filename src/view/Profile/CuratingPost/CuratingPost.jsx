import React from 'react';
import './CuratingPost.scss';
import Button from '../../../components/Button/Button';
import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import calendar from '../../../static/images/Card/Calendar@3x.png';
import tag from '../../../static/images/Card/tag@3x.png';
import './CuratingPost.scss';

import CuratingPostedCard from '../../../components/CuratingPostedCard/CuratingPostedCard';

const CuratingPost = (curatingInfo, onClick) => {
	return (
		<div className="CuratingPost">
			<ProfileTitle>나의 큐레이팅</ProfileTitle>
			<div className="CuratingPost--buttonGroup">
				<Button size="medium" color="gray">
					삭제
				</Button>
				<Button size="medium" color="gray">
					수정
				</Button>
			</div>

			<div className="CuratingPost--Header">
				<div className="title">title</div>
				<div className="tag">
					<img src={tag} />
					tag
				</div>
				<div className="date">
					<img src={calendar} />
					date
				</div>
			</div>
			{
				<div className="CuratingPost--Card">
					<CuratingPostedCard />
				</div>
			}
		</div>
	);
};

export default CuratingPost;
