import React from 'react';
import './NoticeContainer.scss';
import { connect } from 'react-redux';
import Title from '../../components/Title/Title';
import { logPageView } from '../../Utils/analytics';
import { Link } from 'react-router-dom';
import Media from 'react-media';

import moment from 'moment';

class NoticeContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		logPageView('플랫폼 페이지');
	}

	render() {
		const { notices, match } = this.props;

		return (
			<div className="NoticeContainer">
				<div className="NoticeContainer--Title">
					<Title border="thick">공지사항</Title>
				</div>
				<div className="NoticeContainer--List">
					{!!notices.adminNotice &&
						(notices.adminNotice.length != 0
							? notices.adminNotice.map((notice, index) => {
									return NoticeRow(notice, index);
							  })
							: '등록된 공지가 없습니다')}
				</div>
				<div className="NoticeContainer--Pagination"></div>
			</div>
		);
	}
}

const NoticeRow = (row, index) => {
	const subject =
		(row.subject === '0' && '공지사항') ||
		(row.subject === '1' && '점검') ||
		(row.subject === '2' && '	업데이트');
	return (
		<Link to={`/notice/${row.id}`} className="NoticeContainer--Row" key={index}>
			<Media query={{ maxWidth: 768 }}>
				{matches =>
					matches ? (
						<>
							<div className="subject">{subject}</div>
							<div className="info">
								<div className="title">{row.title}</div>
								<div className="date">
									{moment(row.createdAt).format('YYYY.MM.DD')}
								</div>
							</div>
						</>
					) : (
						<>
							<div className="subject">{subject}</div>
							<div className="title">{row.title}</div>
							<div className="date">
								{moment(row.createdAt).format('YYYY.MM.DD')}
							</div>
						</>
					)
				}
			</Media>
		</Link>
	);
};

// const mapStateToProps = state => {
// 	return {
// 		isLoading: state.layout.isLoading,
// 		noticeList: state.administer.noticeList,
// 	};
// };

// // const mapDispatchToProps = dispatch => {
// // 	return {
// // 		changeMenu: menu => dispatch(changeMenu(menu)),
// // 	};
// // };

// export default connect(mapStateToProps, null)(NoticeContainer);
export default NoticeContainer;
