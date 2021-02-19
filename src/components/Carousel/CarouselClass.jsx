import React, { Component } from 'react';
import './Carousel.scss';
import Media from 'react-media';
import Speaker from '../../static/images/Slider/SpeakerCarousel.png';

import GrayCal from '../../static/images/Slider/calendar-gray.png';

class CarouselClass extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 1,
		};

		this.timer = this.timer.bind(this);
		this.counter = this.counter.bind(this);
		this.clear = this.clear.bind(this);
	}

	componentDidMount() {
		this.timer();
	}

	componentWillUnmount() {
		this.clear();
	}

	shouldComponentUpdate(nextProps, nextState) {
		const targetButton = document.querySelector(`.button${nextState.index}`);

		const sibling = targetButton.parentNode.previousSibling;

		const { index } = this.state;

		if (index !== nextState.index) {
			this.onChangeBoard(nextState.index, sibling, targetButton);
		}
		return true;
	}

	timer() {
		this.interval = setInterval(() => {
			this.counter();
		}, 4000);
	}

	counter() {
		const { index } = this.state;

		if (index === 3) {
			this.setState({
				index: 1,
			});
		} else {
			this.setState({
				index: index + 1,
			});
		}
	}

	clear() {
		clearInterval(this.interval);
		this.setState({
			minute: 0,
			second: 0,
		});
	}

	onClick = (e, value, tag) => {
		if (e) {
			var elem = e.target;

			while (!elem.classList.contains('Carousel-button')) {
				elem = elem.parentNode;

				if (elem.nodeName === 'BODY') {
					elem = null;
					return;
				}
			}

			this.setState({
				index: elem.dataset.value,
			});

			var sibling = elem.parentNode.previousSibling;

			this.onChangeBoard(parseInt(elem.dataset.value), sibling, elem);
		}
	};

	onChangeBoard(index, sibling, child) {
		let next = '';
		let prev = '';
		if (!!child.previousSibling && !!child.nextSibling) {
			prev = child.previousSibling;
			next = child.nextSibling;
		} else if (!!child.previousSibling && !child.nextSibling) {
			prev = child.previousSibling;
			next = child.previousSibling.previousSibling;
		} else if (!!child.nextSibling && !child.previousSibling) {
			next = child.nextSibling;
			prev = child.nextSibling.nextSibling;
		}

		child.classList.remove('nextTarget');
		child.classList.remove('prevTarget');
		child.classList.add('selected');
		prev.classList.remove('selected');
		prev.classList.remove('nextTarget');
		prev.classList.add('prevTarget');
		next.classList.remove('selected');
		next.classList.remove('prevTarget');
		next.classList.add('nextTarget');

		switch (index) {
			case 1:
				this.setState({
					index: 1,
				});
				sibling.className = 'Carousel-board board1';

				break;
			case 2:
				this.setState({
					index: 2,
				});
				sibling.className = 'Carousel-board board2';

				break;
			case 3:
				this.setState({
					index: 3,
				});
				sibling.className = 'Carousel-board board3';
				break;
			default:
				break;
		}
	}

	render() {
		const { children, carousel2 } = this.props;

		const { index } = this.state;
		return (
			<div className="container-board">
				<div className="Carousel">
					<div className="Carousel-board ">
						{carousel2.map(item => {
							return (
								<li className="Carousel-list" key={item.id}>
									<Media query={{ maxWidth: 768 }}>
										{matches =>
											matches ? (
												<a href={item.link} target="_blank">
													<img
														src={item.image_url_mobile}
														alt="carousel-image"
														className={'Carousel-list-image'}
													/>
													<div className="desc">
														<img
															src={
																Number(item.dataValue) === index
																	? Speaker
																	: GrayCal
															}
															alt="calendar"
														/>
														<div className="desc-text">
															<p className="title">{item.title}</p>
															<p className="content">{item.descr}</p>
														</div>
													</div>
												</a>
											) : (
												<a href={item.link} target="_blank">
													<img
														src={item.image_url_pc}
														alt="carousel-image"
														className={'Carousel-list-image'}
													/>
												</a>
											)
										}
									</Media>
								</li>
							);
						})}
					</div>
					<div className="Carousel-switch" onClick={e => this.onClick(e)}>
						{carousel2.map(item => {
							return (
								<div
									className={item.buttonClassName}
									data-value={item.dataValue}
									key={item.id}
								>
									<div className="button-box">
										<img
											src={Number(item.dataValue) === index ? Speaker : GrayCal}
											alt="calendar"
										/>
										<div className="button-box-text">
											<p className="button-box-text--title">{item.title}</p>
											<p className="button-box-text--content">{item.descr}</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}

export default CarouselClass;
