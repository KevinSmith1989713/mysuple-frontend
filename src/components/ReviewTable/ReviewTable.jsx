import React, { useState, useEffect } from 'react';

import ThumbUp from '../../static/images/ReviewCard/upThumb@3x.png';
import ThumbDown from '../../static/images/ReviewCard/downThumb@3x.png';
import GreyThumb from '../../static/images/ReviewCard/GreyThumb@3x.png';
import NoReview from '../../static/images/GameInfo/NoReview.png';
import './ReviewTable.scss';

import ReviewCard from '../../components/ReviewCard/ReviewCard';
import Pagination from '../Pagination/Pagination';

const ReviewTable = ({ gameInfo, reviews }) => {
	const [paging, setPaging] = useState(1);
	const perPage = 4;
	return (
		<div className="ReviewTable">
			<div className="ReviewTable--Header">상세리뷰</div>
			<div className="ReviewTable--Cards">
				{!!reviews && reviews.length > 0 ? (
					reviews.map((item, index) => {
						
						return (
							index >= paging * perPage - perPage &&
							index < paging * perPage && (
								<ReviewCard
									key={index}
									gameId={gameInfo.game_id}
									review={item}
								/>
							)
						);
					})
				) : (
					<div className="no-review">
						<img src={NoReview} />
					</div>
				)}
			</div>
			<div className="ReviewTable--Pagination">
				{!!reviews && reviews.length > 0 && (
					<Pagination
						perPage={perPage}
						status={paging}
						listCnt={reviews.length}
						changePage={page => setPaging(page)}
					/>
				)}
			</div>
		</div>
	);
};
export default ReviewTable;
