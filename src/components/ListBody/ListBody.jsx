import React from 'react';
import './ListBody.scss';

const ListBody = ({ contents, type }) => {
	console.log(contents);
	const makeColumn = () => {
		let array = [];
		for (let key in contents) {
			console.log(contents[key]);
			if (key !== 'id') {
				if (key !== 'isProcess') {
					array.push(
						<span className={`ListBody-text ${type} ${key}`} key={key}>
							{contents[key]}
						</span>,
					);
				} else {
					array.push(
						<span
							className={`ListBody-text ${key} ${
								contents['isProcess'] === '접수중' ? 'selected' : 'complete'
							}`}
							key={key}
						>
							{contents[key]}
						</span>,
					);
				}
			}
		}

		return array.map((item, index) => {
			return item;
		});
	};

	return <div className="ListBody">{makeColumn()}</div>;
};

export default ListBody;
