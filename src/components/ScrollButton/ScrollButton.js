import React from 'react';
import './ScrollButton.scss';

import TopBtn from '../../static/images/iconbox/TopBtn.png'

class ScrollButton extends React.Component {
	constructor() {
		super();

		this.state = {
			intervalId: 0,
		};
	}

	scrollStep() {
		if (window.pageYOffset === 0) {
			clearInterval(this.state.intervalId);
		}
		window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
	}

	scrollToTop() {
		let intervalId = setInterval(
			this.scrollStep.bind(this),
			this.props.delayInMs,
		);
		this.setState({ intervalId: intervalId });
	}

	render() {
		return (
			<button
				title="Back to top"
				className="scroll"
				onClick={() => {
					this.scrollToTop();
				}}
			>
				<img src={TopBtn}/>
			</button>
		);
	}
}

export default ScrollButton;