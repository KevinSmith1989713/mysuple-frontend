import React, { useState } from 'react';
import { connect } from 'react-redux';

import { agreeTerm } from '../../../store/Auth/Auth.store';

import CheckBox from '../../../components/CheckBox/CheckBox';

import Upper from '../../../static/images/iconbox/UpperArrow.svg';
import Lower from '../../../static/images/iconbox/LowerArrow.svg';

import './JoinFIrst.scss';

import { joinTerm, joinCheckboxes } from '../../../assets/dummyData/AuthData';

class JoinFirst extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			use: false,
			person: false,
			marketing: false,
			member: false,
			age: false,
		};

		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	onChangeChecked = e => {
		const { name, checked } = e.target;

		if (name !== 'all' && checked) {
			this.setState({
				[name]: true,
			});
		} else if (name !== 'all' && !checked) {
			this.setState({
				[name]: false,
			});
		} else if (name === 'all' && checked) {
			this.setState({
				use: true,
				person: true,
				marketing: true,
				member: true,
				age: true,
			});
		} else if (name === 'all' && !checked) {
			this.setState({
				use: false,
				person: false,
				marketing: false,
				member: false,
				age: false,
			});
		}
	};

	onClickSubmit() {
		const { use, person, age } = this.state;
		const { agreeTerm } = this.props;
		const info = { use, person, age };
		agreeTerm(info);
	}

	componentDidUpdate(prevState) {
		const { use, person, age } = this.state;
		if (prevState.use !== use) {
			this.props.bringTerms(use, person, age);
		} else if (prevState.person !== person) {
			this.props.bringTerms(use, person, age);
		} else if (prevState.age !== age) {
			this.props.bringTerms(use, person, age);
		}
	}

	render() {
		const { use, person, marketing, member, age } = this.state;
		const { termsOpen, setTermsOpen } = this.props;

		return (
			<>
				<div className="JoinFirst">
					<div className="JoinFirst--checkboxGroup">
						<div
							className="JoinFirst--checkboxGroup__allCheck"
							onClick={() => setTermsOpen(!termsOpen)}
						>
							<CheckBox
								allCheck
								name="all"
								onChange={e => this.onChangeChecked(e)}
								checked={use && person && marketing && member && age}
								onClick={this.onClickSubmit}
							>
								회원가입 약관 전체동의
							</CheckBox>
							<img src={termsOpen ? Upper : Lower} />
						</div>
						{termsOpen ? (
							<>
								<div>
									{joinCheckboxes.map(item => {
										return (
											<div
												className="JoinFirst--checkboxGroup__personCheck"
												key={item.id}
											>
												<CheckBox
													name={item.name}
													onChange={e => this.onChangeChecked(e)}
													checked={this.state[item.name]}
												>
													<div
														className="text"
														onClick={() =>
															window.open(
																'http://www.mysuple.com/terms ',
																'_blank',
															)
														}
													>
														{item.title}
													</div>
												</CheckBox>
											</div>
										);
									})}
								</div>
								<ul className="JoinFirst--list">
									{/* {joinTerm.map(item => {
										return (
											<li
												key={item.id}
												onClick={() =>
													window.open('http://www.mysuple.com/terms ', '_blank')
												}
											>
												<span>{item.name}</span>
											</li>
										);
									})} */}
								</ul>
							</>
						) : (
							''
						)}
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		agreeTerm: info => dispatch(agreeTerm(info)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinFirst);
