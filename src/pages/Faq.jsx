import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import { reqFaq } from '../store/Administer/Administer.store';
import ContentBoard from '../components/ContentBoard/ContentBoard';

import FaqContainer from '../container/FaqContainer/FaqContainer';

class Faq extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {
		const { reqFaq, faqList } = this.props;
		faqList.length === 0 && reqFaq();
	}
	render() {
		const { changeMenu, isLoading, faqList } = this.props;

		return (
			<div className="Faq">
				<Helmet>
					<title>슈퍼플레이어 | FAQ</title>
				</Helmet>
				<ContentBoard>
					<FaqContainer list={faqList} />
				</ContentBoard>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		faqList: state.administer.faqList,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reqFaq: () => dispatch(reqFaq()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
