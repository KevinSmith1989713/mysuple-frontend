import React from 'react';

import Speaker from '../../static/images/Slider/SpeakerCarousel.png';

import GrayCal from '../../static/images/Slider/calendar-gray.png';
import BetaBanner from '../../static/images/Slider/Beta-Banner.png';
import BetaBanner_mob from '../../static/images/Slider/Beta-Banner_mob.png';

export const carousel = [
	{
		id: 1,
		imgClassName: 'Carousel-list-image',
		src: BetaBanner,
		src_mob: BetaBanner_mob,
		buttonClassName: 'Carousel-button button1 selected',
		dataValue: '1',
		innerValue: question => {
			return (
				<div className="button-box">
					<img src={question ? Speaker : GrayCal} alt="calendar" />
					<div className="button-box-text">
						<p className="button-box-text--title">베타서비스 오픈!</p>
						<p className="button-box-text--content">
							슈플 서비스가 오픈했습니다!
						</p>
					</div>
				</div>
			);
		},
	},
	{
		id: 2,
		imgClassName: 'Carousel-list-image',
		src: BetaBanner,
		src_mob: BetaBanner_mob,
		buttonClassName: 'Carousel-button button2 nextTarget',
		dataValue: '2',
		innerValue: question => (
			<div className="button-box">
				<img src={question ? Speaker : GrayCal} alt="calendar" />
				<div className="button-box-text">
					<p className="button-box-text--title">베타서비스 오픈!</p>
					<p className="button-box-text--content">
						슈플 서비스가 오픈했습니다!
					</p>
				</div>
			</div>
		),
	},
	{
		id: 3,
		imgClassName: 'Carousel-list-image',
		src: BetaBanner,
		src_mob: BetaBanner_mob,
		buttonClassName: 'Carousel-button button3 prevTarget',
		dataValue: '3',
		innerValue: question => (
			<div className="button-box">
				<img src={question ? Speaker : GrayCal} alt="calendar" />
				<div className="button-box-text">
					<p className="button-box-text--title">베타서비스 오픈!</p>
					<p className="button-box-text--content">
						슈플 서비스가 오픈했습니다!
					</p>
				</div>
			</div>
		),
	},
];
