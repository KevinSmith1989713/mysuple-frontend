import React from 'react';
import './QuesitionTitle.scss';

const QuesitionTitle = ({ number, children, miniTitle }) => {
	return (
		<div className="QuestionTitle">
			<div className="QuestionTitle--number">
				0{number}
			</div>
			<div className="QuestionTitle--title">
				<div className="title--top">{children}</div>
				{
					number != 4 && (
						<div className="title--bot">(중복 선택 가능)</div>
					)
				}
			</div>
		</div>
	);
};

export default QuesitionTitle;
