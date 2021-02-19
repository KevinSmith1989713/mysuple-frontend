import React,{ useState } from 'react';
import './WriteCurating.scss';
import Title from '../../../components/Title/Title';
import WriteCuratingCard from '../../../components/WriteCuratingCard/WriteCuratingCard';

const WriteCurating = ({ userInfo, onClick }) => {
	return (
		<div className="WriteCurating">
  		<div className="WriteCurating--Header">
				<WriteCuratingCard/>
      </div>

		</div>
	);
};

export default WriteCurating;

