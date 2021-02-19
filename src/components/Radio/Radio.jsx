import React, { Fragment } from 'react';
import './Radio.scss';

const Radio = ({ gender, onChange, radioOptions, radioPosition }) => {
	return (
		<div className="radioGroup">
			{radioOptions.map(item => {
				return (
					<>
					{
						radioPosition === "right" ? (
							<div className="Radio" key={item.id}>
								<span>{item.title}</span>
								<input
									type={item.type}
									name={item.name}
									value={item.value}
									checked={item.value === gender}
									onChange={e => onChange(e)}
								/>
							</div>
						) : (
							<div className="Radio" key={item.id}>
								<input
									type={item.type}
									name={item.name}
									value={item.value}
									checked={item.value === gender}
									onChange={e => onChange(e)}
								/>
								<span>{item.title}</span>
							</div>
						)
					}
					</>
				);
			})}
		</div>
	);
};

Radio.defaultProps = {
	radioPosition:"right"
}
export default Radio;
