import React from 'react';
import './CommunityContainer.scss';
import { connect } from 'react-redux';

import { changeMenu } from '../../store/Layout/Layout.store';
import Header from '../../components/Header/Header';
import ContentBoard from '../../components/ContentBoard/ContentBoard';

import FixingPenguine from '../../static/images/Community/Fixing@3x.png'
import Title from '../../components/Title/Title';
import { logPageView } from "../../Utils/analytics";

class CommunityContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
    logPageView("플랫폼 페이지");
	}
	
	render() {
		const { changeMenu } = this.props;
		return (
			<div className="CommunityContainer2">
				<img src={FixingPenguine}/>
				<Title size="large" color="blue">준비중인 페이지입니다!</Title>
				<div className="wait">조금만 기다려주세요!</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CommunityContainer);
