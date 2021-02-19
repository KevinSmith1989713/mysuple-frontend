import React from 'react';
import './ListHead.scss';
import classNames from 'classnames';

const ListHead = ({ heads, background, type }) => {
	return (
		<div className={classNames('ListHead', type, { background })}>
			{heads.map(item => {
				return (
					<span key={item.id} className={`ListHead-text ${item.key}`}>
						{item.name}
					</span>
				);
			})}
		</div>
	);
};

export default ListHead;
