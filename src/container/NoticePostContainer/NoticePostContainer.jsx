import React from 'react';
import './NoticePostContainer.scss';
import { connect } from 'react-redux';
import Title from '../../components/Title/Title';
import { logPageView } from '../../Utils/analytics';
import { Link } from 'react-router-dom';
import { ReactComponent as GreyClock } from '../../static/images/greyClock.svg';
import Media from 'react-media';

import moment from 'moment';

class NoticePostContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		logPageView('플랫폼 페이지');
	}

	render() {
		const { post, match } = this.props;
		const subject =
			post.subject === '0' ? '공지사항' : post.subject === '1' && '점검';

		return (
			<div className="NoticePostContainer">
				<div className="NoticePostContainer--Title">
					<Title border="thick">공지사항</Title>
				</div>
				<div className="NoticePostContainer--Content">
					<Media query={{ maxWidth: 768 }}>
						{matches =>
							matches ? (
								<>
									<div className="title">
										<div className="subject">{subject}</div>
										<div className="title">{post.title}</div>
									</div>
									<div className="dateRow">
										<GreyClock />
										<div className="date">
											{moment(post.updateddAt).format('YYYY.MM.DD')}
										</div>
									</div>
								</>
							) : (
								<div className="title">
									<div className="subject">{subject}</div>
									<div className="title">{post.title}</div>
									<div className="date">
										{moment(post.updateddAt).format('YYYY.MM.DD')}
									</div>
								</div>
							)
						}
					</Media>

					<div
						className="content"
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</div>
				<div className="NoticePostContainer--Button">
					<Link to={'/notice'} className="btn">
						목록
					</Link>
				</div>
			</div>
		);
	}
}
export default NoticePostContainer;
