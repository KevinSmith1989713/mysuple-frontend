import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';

import closeBtnGray from '../../static/images/closeBtnGray.svg';
import pc from '../../static/images/Colleague/pc.svg';
import mobile from '../../static/images/Colleague/mobile.svg';
import consol from '../../static/images/Colleague/consol.svg';
import BlueTag from '../../static/images/Card/tag.png';
import NoImage from '../../static/images/Card/no_image@3x.png';

import './ColleagueCrewModal.scss';

const ColleagueModal = ({ isOpen, close, crewInfo }) => {
	
	return (
		<>
			<Modal className="crewInfo--container" close={close} isOpen={isOpen}>
				<div className="title--box">
					<div className="title">{crewInfo.crew_title}</div>
					<img src={closeBtnGray} onClick={() => close()} />
				</div>
				<div className="contents--wrapper">
					<img
						className="img"
						src={crewInfo.crew_image ? crewInfo.crew_image : NoImage}
					/>
					<div className="contents--box">
						<div className="contents__text">
							{crewInfo.game_title_kr &&
								crewInfo.game_title_kr
									.toString()
									.split(',')
									.map((item, index) => {
										return (
											<Fragment key={index}>
												<img
													// src={crewInfo.game_class.map(item => {
													// 	console.log("번로가",item);
													// 	return (item === '0' || 0
													// 		? pc
													// 		: '' || item === '1' || 1
													// 		? pc
													// 		: '' || item === '2' || 2
													// 		? mobile
													// 		: consol)
													// })}
													src={pc}
												/>
												{item}
											</Fragment>
										);
									})}
						</div>
						<div className="contents__tag--box">
							<img src={BlueTag} />
							<div className="contents__tag">
								{crewInfo.crew_tag &&
									crewInfo.crew_tag.split(',').map(item => {
										return `${item} `;
									})}
								{crewInfo.crew_tag}
							</div>
						</div>
						<div className="explain">{crewInfo.crew_desc}</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

const mapStateToProps = state => {
	return {
		crewInfo: state.colleague.crewInfo,
	};
};

export default connect(mapStateToProps, null)(ColleagueModal);
// crewInfo.game_class
