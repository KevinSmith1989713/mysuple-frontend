import React from 'react';
import { useHistory } from 'react-router-dom';

import './Forbidden.scss';

const Forbidden = () => {
	let history = useHistory();

	return (
		<div className="container-contents__boo">
			<div className="area__boo">
				<div className="boo">
					<div className="face"></div>
				</div>
				<div className="shadow"></div>
				<h1>접근 권한이 없습니다.</h1>
				<button type="button" onClick={() => history.push('/')}>
					돌아기기
				</button>
			</div>
		</div>
	);
};

export default Forbidden;
