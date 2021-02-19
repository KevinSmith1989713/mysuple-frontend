import React from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import { changeMenu } from '../store/Layout/Layout.store';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import SearchContainer from '../container/SearchContainer/SearchContainer';

class Taste extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { changeMenu, isLoading } = this.props;
		const keyword = this.props.match.params.id;
		return (
			<div className="Search">
				<Helmet>
					<title>슈퍼플레이어 | 취향선택</title>
				</Helmet>
				<ContentBoard>
					<SearchContainer search={keyword} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Taste);
