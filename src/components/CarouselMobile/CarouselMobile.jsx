import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import './CarouselMobile.scss';

import ReactDom from 'react-dom';

class CarouselClass extends Component {
	constructor(props) {
		super(props);
		// autobind(this)
		this.state = {
			index: 1,
		};
		this.slide = this.slide.bind(this);
		this.measureElement = this.measureElement.bind(this);
	}

	componentDidMount() {
		const slider = document.querySelector('#slider');
		const sliderItems = document.querySelector('#items');
		const prev = document.querySelector('#prev');
		const next = document.querySelector('#next');
		const sliderSize = this.measureElement(slider);

		// const slide1 = items.getElementsByClassName('slide')[0]
		// const slide2 = items.getElementsByClassName('slide')[1]
		// const slide3 = items.getElementsByClassName('slide')[2]
		// slide1.style.width = "70%"

		// sliderItems.style.width = slide1.style.width * 3
		// slide1.style.width = "70%"

		this.slide(slider, sliderItems, prev, next);
	}

	measureElement(ele) {
		const DOMNode = ReactDom.findDOMNode(ele);
		return {
			width: DOMNode.offsetWidth,
			height: DOMNode.offsetHeight,
		};
	}
	slide(wrapper, items, prev, next) {
		var posX1 = 0,
			posX2 = 0,
			posInitial,
			posFinal,
			threshold = 100,
			slides = items.getElementsByClassName('slide'),
			slidesLength = slides.length,
			slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
			firstSlide = slides[0],
			lastSlide = slides[slidesLength - 1],
			cloneFirst = firstSlide.cloneNode(true),
			cloneLast = lastSlide.cloneNode(true),
			index = 0,
			allowShift = true,
			width = 600,
			left = 0,
			allowLeft = true;

		// Clone first and last slide
		//items.appendChild(cloneFirst);
		//items.insertBefore(cloneLast, firstSlide);
		wrapper.classList.add('loaded');

		// Mouse and Touch events
		items.onmousedown = dragStart;

		// Touch events
		items.addEventListener('touchstart', dragStart);
		items.addEventListener('touchend', dragEnd);
		items.addEventListener('touchmove', dragAction);

		// Transition events
		items.addEventListener('transitionend', checkIndex);

		function dragStart(e) {
			e = e || window.event;
			e.preventDefault();
			posInitial = items.offsetLeft;

			if (e.type == 'touchstart') {
				posX1 = e.touches[0].clientX;
			} else {
				posX1 = e.clientX;
				document.onmouseup = dragEnd;
				document.onmousemove = dragAction;
			}
		}

		function dragAction(e) {
			e = e || window.event;

			if (e.type == 'touchmove') {
				posX2 = posX1 - e.touches[0].clientX;
				posX1 = e.touches[0].clientX;
			} else {
				posX2 = posX1 - e.clientX;
				posX1 = e.clientX;
			}
			items.style.left = items.offsetLeft - posX2 + 'px';
		}

		function dragEnd(e) {
			posFinal = items.offsetLeft;
			if (posFinal - posInitial < -threshold) {
				shiftSlide(1, 'drag');
			} else if (posFinal - posInitial > threshold) {
				shiftSlide(-1, 'drag');
			} else {
				items.style.left = posInitial + 'px';
			}

			document.onmouseup = null;
			document.onmousemove = null;
		}

		function shiftSlide(dir, action) {
			items.classList.add('shifting');

			if (allowShift) {
				if (!action) {
					posInitial = items.offsetLeft;
				}

				if (dir == 1) {
					index++;
					items.style.left = posInitial - slideSize + getLeft() + 'px';
				} else if (dir == -1) {
					index--;
					items.style.left = posInitial + slideSize - getLeft() + 'px';
				}
			}

			allowShift = false;
			allowLeft = false;
		}

		function checkIndex() {
			items.classList.remove('shifting');

			if (index >= slidesLength - 1) {
				index = slidesLength - 1;
				items.style.left = -((slidesLength - 1) * slideSize) + getLeft() + 'px';
				allowLeft = true;
			}

			if (index <= 0) {
				index = 0;
				items.style.left = 0 + getLeft() + 'px';
				allowLeft = true;
			}

			allowShift = true;
		}

		function getLeft() {
			if (index <= 0) {
				left = 0;
			} else if (index >= slidesLength - 1) {
				left = width - slideSize;
			} else {
				left = allowLeft ? (width - slideSize) / 2 : 0;
			}

			return left;
		}
	}

	render() {
		const { carousel, children } = this.props;
		const { index } = this.state;

		return (
			<div id="slider" className="slider">
				<div className="wrapper">
					<div id="items" className="items">
						<span className="slide">{slideCard(1)}</span>
						<span className="slide">{slideCard(2)}</span>
						<span className="slide">{slideCard(3)}</span>
					</div>
				</div>
			</div>
		);
	}
}

const slideCard = () => {
	return (
		<div className="SlideCard">
			<img />
			<div className="SlideCard--Info">1</div>
		</div>
	);
};
export default CarouselClass;
