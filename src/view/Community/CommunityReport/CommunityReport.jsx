import React, { useState } from 'react';
import './CommunityReport.scss';
import CommunityReportCard from '../../../components/CommunityReportCard/CommunityReportCard';

const reportTypes = [
	{
		key:'bug',
		name:'버그 신고'
	},
	{
		key:'suggestion',
		name:'제안 요청'
	},
	{
		key:'block',
		name:'유저 제재'
	},
	{
		key:'service',
		name:'서비스'
	}
]


const CommunityReport = ({  }) => {
	const [ myReport, setMyReport ] = useState('bug')
	return (
		<div className="CommunityReport">
			<div className="CommunityReport--header">
				버그신고/제안요청
			</div>
      <div className="CommunityReport--write">
        <div className="selector">
					{
						reportTypes.map(report => {
							return (
								<div className={report.key===myReport ? "selector--btn__selected" : "selector--btn"} 
									onClick={()=>setMyReport(report.key)}>
									{report.name}
								</div>)

						})
					}
				</div>
        <div className="write--section">
					<textarea/>
					<div className="write--btn">작성</div>
				</div>
      </div>
			<div className="CommunityReport--list">
				<CommunityReportCard secret={false} comment/>
				<CommunityReportCard secret={true}/>
				<CommunityReportCard secret={false} comment={true}/>
				<CommunityReportCard secret={false} comment={true}/>
				<CommunityReportCard secret={false} comment={true}/>
			</div>
		</div>
	);
};

export default CommunityReport;
