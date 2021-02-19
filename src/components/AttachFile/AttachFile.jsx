import React from 'react';
import './AttachFile.scss';

const AttachFile = ({ onChange }) => {
	return (
		<div className="AttachFile">
			<div className="AttachFile--text">첨부파일</div>
			<input
				type="file"
				className="AttachFile--file"
				onChange={e => onChange(e)}
			/>
		</div>
	);
};

AttachFile.defaultProps = {};

export default AttachFile;
