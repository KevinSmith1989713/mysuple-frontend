import React, { useState } from 'react';
import './SettingStatistics.scss';

const visitor = [
	{
		key:'daily',
		name:'일간 방문자',
		data:{
			
		}
	},{
		key:'weekly',
		name:'주간 방문자',
		data:{
			
		}
	},{
		key:'monthly',
		name:'월간 방문자',
		data:{
			
		}
	},
]

const subscriber = [{
		key:'weekly',
		name:'주간 구독자',
		data:{
			
		}
	},{
		key:'monthly',
		name:'월간 구독자',
		data:{
			
		}
	},
]


const SettingStatistics = ({  }) => {
	const [visitTab, setVisitTab] = useState('daily')
	const [subTab, setSubTab] = useState('weekly')
	
	return (
		<div className="SettingStatistics">
			<div className="SettingStatistics--Visitor">
				<div className="header">
					{
						visitor.map( tab => {
							return(
								<div className={tab.key===visitTab ? 'tab__selected' : 'tab'} 
										 onClick={()=>setVisitTab(tab.key)}> 
									{tab.name}
									{tab.key===visitTab && <div className="underline"/>}
								</div>
							)
						})
					}
				</div>
			</div>
			<div className="SettingStatistics--Subscriber">
				<div className="header">
					{
						subscriber.map( tab => {
							return(
								<div className={tab.key===subTab ? 'tab__selected' : 'tab'} 
											onClick={()=>setSubTab(tab.key)}> 
									{tab.name}
									{tab.key===subTab && <div className="underline"/>}
								</div>
							)
						})
					}
				</div>
			</div>
			<div className="SettingStatistics--Subscriber__Gametype">
				<div className="header">
					<div className='tab__selected'>
						구독자 게임취향 <div className="underline"/>
					</div>
				</div>
			</div>
			<div className="SettingStatistics--Subscriber__Analyze">
				<div className="header">
					<div className='tab__selected'>
						구독자 분석 <div className="underline"/>
					</div>
				</div>
			</div>
			<div className="SettingStatistics--Review__Word">
				<div className="header">
					<div className='tab__selected'>
						리뷰 워드 클라우드 <div className="underline"/>
					</div>
				</div>
			</div>
			<div className="SettingStatistics--Review__OurGame">
				우리 게임 평가
			</div>
		</div>
	);
};

export default SettingStatistics;
