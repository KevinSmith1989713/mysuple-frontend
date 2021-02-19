import React from 'react';
import './CommunityFAQRow.scss';

import {ReactComponent as YellowLowerArrow} from '../../static/images/Community/YellowLowerArrow.svg'
const CommunityFAQRow = ({ info, isFold, onClick }) => {
	
	return (
		<div className="CommunityFAQRow">
			<div className="CommunityFAQRow--question" onClick={onClick}>
				<span className="alpha-Q">Q.</span>
				<span className="title">클라이언트 오류 남</span>
				<span className="isFold">
					<YellowLowerArrow/>
				</span>
			</div>
			{isFold && 
				<div className="CommunityFAQRow--answer">
					<div className="answer--title">
						<span className="title--a">A.</span>
						<span className="title--text">[답변] 클라이언트 오류가 납니다. 어떻게 하죠? </span>
					</div>
					<div className="answer--text">
					등록하신 휴대폰 번호가 확인되지 않는다면, <br/>
					[피망 홈 → 비밀번호 찾기]의 [본인확인 → 휴대폰 인증]을 이용해 주시기 바랍니다.<br/>
					<br/>
					단, [본인확인 → 휴대폰 인증]은 고객님 명의의 휴대폰일 때에만 가능합니다.<br/>
					<br/>
					참고로 휴대폰의 이동통신사 서비스의 일시적인 장애나 지연에 따라<br/>
					정상적으로 임시 비밀번호가 전송되지 않을 수 있으니 잠시 후 다시 이용해 주시기 바랍니다.<br/>
					</div>
				</div>
			}
			
			
		</div>
	);
};

export default CommunityFAQRow;
