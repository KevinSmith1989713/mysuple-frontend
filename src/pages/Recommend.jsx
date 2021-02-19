import React from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import { changeMenu } from '../store/Layout/Layout.store';
import Header from '../components/Header/Header';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import RecommendContainer from '../container/RecommendContainer/RecommendContainer';
import Loading from '../components/Loading/Loading';

class Recommend extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { changeMenu, isLoading } = this.props;

		return (
			<div className="Recommend">
				<Helmet>
					<title>슈퍼플레이어 | 추천</title>
				</Helmet>
				<ContentBoard>
					<RecommendContainer />
				</ContentBoard>
				<Loading isVisible={isLoading} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.layout.isLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
