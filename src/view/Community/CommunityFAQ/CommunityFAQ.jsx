import React, { useState } from 'react';
import './CommunityFAQ.scss';

import CommunityFAQRow from '../../../components/CommunityFAQRow/CommunityFAQRow';

const CommunityFAQ = ({  }) => {

	const [spreadRow, setSpreadRow] = useState('');

	const setRow = (id) => {
		if(spreadRow===id){
			setSpreadRow('')
		}
		else{
			setSpreadRow(id)
		}
	}

	return (
		<div className="CommunityFAQ">
			<div className="CommunityFAQ--header">
				FAQ
			</div>
			<div className="CommunityFAQ--list">
				<div className="CommunityFAQ--row">
					<CommunityFAQRow info="12321" isFold={spreadRow===1 ? true : false} onClick={()=>setRow(1)}/>
					<CommunityFAQRow info="12321" isFold={spreadRow===2 ? true : false} onClick={()=>setRow(2)}/>
					<CommunityFAQRow info="12321" isFold={spreadRow===3 ? true : false} onClick={()=>setRow(3)}/>
					<CommunityFAQRow info="12321" isFold={spreadRow===4 ? true : false} onClick={()=>setRow(4)}/>
				</div>
			</div>
		</div>
	);
};

export default CommunityFAQ;
