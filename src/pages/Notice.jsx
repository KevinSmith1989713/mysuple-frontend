import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import { reqNotices } from '../store/Administer/Administer.store'
import ContentBoard from '../components/ContentBoard/ContentBoard';
import NoticeContainer from '../container/NoticeContainer/NoticeContainer';

class Notice extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	componentDidMount() {
		const { reqNotices, noticeList } = this.props;
		noticeList.length===0 && reqNotices()
	}
	render() {
		const { changeMenu, isLoading, noticeList } = this.props;
		return (
			<div className="Notice">
				<Helmet>
					<title>슈퍼플레이어 | 공지사항</title>
				</Helmet>
				<ContentBoard>
					<NoticeContainer notices={noticeList}/>
				</ContentBoard>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		noticeList: state.administer.noticeList,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reqNotices:()=> dispatch(reqNotices()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
