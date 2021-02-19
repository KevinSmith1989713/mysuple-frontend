import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import ContentBoard from '../components/ContentBoard/ContentBoard';
import RePassSettingContainer from '../container/RePassSettingContainer/RePassSettingContainer';
import { resetPassword } from '../store/Auth/Auth.store';

const RePassSetting = ({ resetPassword ,isLoading}) => {
	return (
		<>
			<Helmet>
				<title>슈퍼플레이어 | 비밀번호 설정</title>
			</Helmet>
			<ContentBoard>
				<RePassSettingContainer
					resetPassword={resetPassword}
					isLoading={isLoading}
				/>
			</ContentBoard>
		</>
	);
};
const mapStateToProps = state => {
	return {
		faqList: state.administer.faqList,
		isLoading: state.layout.isLoading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		resetPassword: (password, token) =>
			dispatch(resetPassword(password, token)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RePassSetting);
