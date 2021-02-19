import React, { Fragment } from 'react';
import './StepProgressBar.scss';

export const StepProgressBar = ({ type, step, count }) => {
	const arr = [1, 2, 3, 4];
	const arrLeague = [1, 2, 3];
	const percentage = (100 / 15) * 6; //count = 6
	// console.log(window.location.pathname.substr(12, 4));
	// console.log(window.location.pathname ==="/league")
	return (
		<div className="StepProgressBar">
			{type === 'normal' ? (
				<>
					{window.location.pathname.substr(12, 4) === 'step' ? (
						<ul className="progressbarLeague">
							{arrLeague.map((ele, index) => {
								if (step === ele) {
									return (
										<li key={index}>
											{' '}
											<span className="active">{step}</span>{' '}
										</li>
									);
								}
								if (step > ele) {
									return (
										<li className="li--done" key={index}>
											<span className="done">L</span>
										</li>
									);
								}
								if (step < ele) {
									return (
										<li key={index}>
											<span>{step}</span>
										</li>
									);
								}
							})}
						</ul>
					) : (
						<ul className="progressbar">
							{arr.map((ele, index) => {
								if (step === ele) {
									return (
										<li key={index}>
											{' '}
											<span className="active">{step}</span>{' '}
										</li>
									);
								}
								if (step > ele) {
									return (
										<li className="li--done" key={index}>
											<span className="done">L</span>
										</li>
									);
								}
								if (step < ele) {
									return (
										<li key={index}>
											<span>{step}</span>
										</li>
									);
								}
							})}
						</ul>
					)}
				</>
			) : (
				<ul className="progressbar--step">
					<li>
						<span className="active">4</span>
					</li>
					<li className="step--bar">
						<div className="step--grey" />
						<div className="step--blue" />
					</li>
					<li className={percentage < 100 ? 'li--notDone' : 'li--done'}>
						<span>L</span>
					</li>
				</ul>
			)}
		</div>
	);
};

StepProgressBar.defaultProps = {
	step: 1,
	type: 'normal',
};

export default StepProgressBar;
