import React from 'react';
import './AdministerPostContainer.scss';
import { connect } from 'react-redux';
import Title from '../../components/Title/Title';
import { logPageView } from "../../Utils/analytics";
import { Link } from 'react-router-dom';

import moment from 'moment'
const post = {};
class AdministerPostContainer extends React.Component {
	constructor(props) {
		super(props);

		
	}

	componentDidMount() {
    	logPageView("플랫폼 페이지");
	}
	
	render() {
		const { noticeList, match } = this.props;
		return (
			<div className="AdministerPostContainer">
				<div className="AdministerPostContainer--Title">
					<Title border="thick">공지사항</Title>
				</div>
				<div className="AdministerPostContainer--List">
					
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.layout.isLoading,
		noticeList: state.administer.noticeList,
	};
};


// const mapDispatchToProps = dispatch => {
// 	return {
// 		changeMenu: menu => dispatch(changeMenu(menu)),
// 	};
// };

export default connect(mapStateToProps, null)(AdministerPostContainer);
