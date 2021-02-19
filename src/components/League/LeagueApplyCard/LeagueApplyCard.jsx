import React, {useState} from 'react';
import './LeagueApplyCard.scss';
import { connect } from 'react-redux';

const LeagueApplyCard = ({}) => {
		return (
				<div className="LeagueApplyCard">
					<div className="LeagueApplyCard--Title">
						신청기간
					</div>
					<div className="LeagueApplyCard--DueDate">
						2020.03.18 부터  2020.03.23 까지
					</div>
					<div className="LeagueApplyCard--Apply">
						참여하기
					</div>
					<div className="LeagueApplyCard--MyPocket">
						<div className="text">나의 보유 패스 </div>	
						12
					</div>
					<div className="LeagueApplyCard--TicketCost">
						<div className="text">참여 시 소모되는 티켓</div>	
						<div className="ticket--cost">1</div>개
					</div>
					
				</div>
		);
}

export default LeagueApplyCard;
