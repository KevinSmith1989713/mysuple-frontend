import React, { useState } from 'react';
import Button from '../../../components/Button/Button';
import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import './Curating.scss';
import { Link } from 'react-router-dom';

import { CuratingList } from '../../../assets/dummyData/ProfileData';
import CuratingCard from '../../../components/CuratingCard/CuratingCard';
import WriteCuratingCard from '../../../components/WriteCuratingCard/WriteCuratingCard';

const Curating = ({ userInfo, curatingList, onClick }) => {
	let CuratingRowList = [];
	const [curatingL, setCuratingL] = useState(null);
	const Curating4Row = curating => {
		return new Promise(function(resolve, reject) {
			if (CuratingRowList.length === 0) {
				if (innerWidth > 768) {
					for (var i = 0; i <= curating.length / 3 + 1; i++) {
						if (curating.length < 3) {
							CuratingRowList.push(curating.splice(0, CuratingRowList.length));
						} else {
							CuratingRowList.push(curating.splice(0, 3));
						}
					}
				}
				if (innerWidth <= 768) {
					for (var i = 0; i <= curating.length / 2 + 1; i++) {
						CuratingRowList.push(curating.splice(0, 2));
					}
				}
			}
			resolve(CuratingRowList);
		});
	};

	// Curating4Row(curatingList).then(()=>{ setCuratingL(CuratingRowList) })
	return (
		<div className="Curating">
			<ProfileTitle>나의 큐레이팅 </ProfileTitle>
			<div className="Curating--buttonGroup">
				<Link to="/curating">
					<Button size="medium">새 큐레이팅</Button>
				</Link>
			</div>
			<div className="CuratingList">
				{curatingList.map((curating, idx) => {
					console.log(curating);
					return (
						<CuratingCard
							key={idx}
							className="curating__card"
							info={curating}
							onClick={() => onClick('curatingPost')}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Curating;
