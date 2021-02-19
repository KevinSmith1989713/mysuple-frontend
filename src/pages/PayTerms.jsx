import React from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import { changeMenu } from '../store/Layout/Layout.store';
import Header from '../components/Header/Header';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import PayTermsContainer from '../container/PayTermsContainer/PayTermsContainer';
import Loading from '../components/Loading/Loading';

class Terms extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { changeMenu, isLoading } = this.props;

		return (
			<div className="Terms">
				<Helmet>
					<title>슈퍼플레이어 | 이용약관</title>
				</Helmet>
				<ContentBoard>
					 <PayTermsContainer />
				</ContentBoard>
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

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
