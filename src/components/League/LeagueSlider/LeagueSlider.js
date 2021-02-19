import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

import time from '../../../static/images/time.svg';
import pc from '../../../static/images/Colleague/pc.svg';

import './LeagueSlider.scss';

const LeagueSlider = ({}) => {
	const settings = {
		// centerMode: true,
		infinite: true,
		slidesToShow: 4,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
	};
	const settingsMobile = {
		centerMode: true,
		// infinite: true,
		centerPadding: '-20px',
		// slidesToShow: 2.1,
		// slidesToScroll: 1,
		// autoplay: true,
		// speed: 1000,
		// autoplaySpeed: 5000,

		infinite: true,
		slidesToShow: 2.5,
		autoplay: true,
		speed: 1000,
		autoplaySpeed: 5000,
	};
	const crewList = [{}, {}, {}, {}, {}, {}];
	return (
		<div className="Slider--container">
			<div className="title--box">
				<div className="title">인기리그</div>
				<button className="more-text">더보기</button>
			</div>
			{window.outerWidth < 768 ? (
				<Slider {...settingsMobile}>
					{crewList.map((item, index) => {
						return (
							<div className="Slider" key={index}>
								<div className="Slider--box">
									<img className="pathImg" src={pc} />
									{item.link === '' ? (
										<img className="img" src={pc} />
									) : (
										<a href={item.link} target="blank">
											<img className="img" src={pc} />
										</a>
									)}
									<div className="text--box">
										<div className="box__time">
											<img src={time} />
											{/* {item.crew_title.length > 20
                  ? `${item.crew_title.substring(0, 21)}...`
                  : item.crew_title} */}
											03.23 PM 20:00
										</div>
										<div className="box__title">
											{/* {item.game_title_kr.map(item => {
                  return item.split(',').map(item => {
                    return `*${item}`;
                  });
                })} */}
											만원빵 경쟁전
										</div>
										<div className="box__gameName">
											{/* {item.crew_tag.split(',').map(item => {
                  return `${item} `;
                })} */}
											오버워치
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</Slider>
			) : (
				<Slider {...settings}>
					{crewList.map((item, index) => {
						return (
							<div className="Slider" key={index}>
								<div className="Slider--box">
									<img className="pathImg" src={pc} />
									{item.link === '' ? (
										<img className="img" src={pc} />
									) : (
										<a href={item.link} target="blank">
											<img className="img" src={pc} />
										</a>
									)}
									<div className="text--box">
										<div className="box__time">
											<img src={time} />
											{/* {item.crew_title.length > 20
                  ? `${item.crew_title.substring(0, 21)}...`
                  : item.crew_title} */}
											03.23 PM 20:00
										</div>
										<div className="box__title">
											{/* {item.game_title_kr.map(item => {
                  return item.split(',').map(item => {
                    return `*${item}`;
                  });
                })} */}
											만원빵 경쟁전
										</div>
										<div className="box__gameName">
											{/* {item.crew_tag.split(',').map(item => {
                  return `${item} `;
                })} */}
											오버워치
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</Slider>
			)}
		</div>
	);
};

export default LeagueSlider;
