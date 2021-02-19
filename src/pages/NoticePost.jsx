import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';

import { reqNoticePost } from '../store/Administer/Administer.store'
import ContentBoard from '../components/ContentBoard/ContentBoard';
import AdministerPostContainer from '../container/AdministerPostContainer/AdministerPostContainer';
import NoticePostContainer from '../container/NoticePostContainer/NoticePostContainer';

class Notice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		const { match, reqNoticePost } = this.props;
		reqNoticePost(match.params.id)
	}
	componentDidMount() {
	}
	render() {
		const { changeMenu, isLoading, noticePost } = this.props;
		return (
			<div className="Notice">
				<Helmet>
					<title>슈퍼플레이어 | 공지사항</title>
				</Helmet>
				<ContentBoard>
					<NoticePostContainer post={noticePost}/>
				</ContentBoard>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		noticePost: state.administer.noticePost,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reqNoticePost: (id)=> dispatch(reqNoticePost(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
