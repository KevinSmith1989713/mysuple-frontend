import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { changeMenu } from '../store/Layout/Layout.store';
import Header from '..//components/Header/Header';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import CommunityOfficialContainer from '../container/CommunityOfficialContainer/CommunityOfficialContainer';
import Loading from '../components/Loading/Loading';

class CommunityOfficial extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { isLoading, match } = this.props;
		return (
			<div className="CommunityOfficial">
				<Helmet>
					<title>슈퍼플레이어 | 커뮤니티</title>
				</Helmet>
				<ContentBoard>
					<CommunityOfficialContainer match={match.params} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CommunityOfficial);
