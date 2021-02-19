import React from 'react';
import './RecommendContainer.scss';
import { connect } from 'react-redux';

import { changeMenu } from '../../store/Layout/Layout.store';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import ContentBoard from '../../components/ContentBoard/ContentBoard';
import RecommendHeader from '../../components/RecommendHeader/RecommendHeader';
import EditorCard from '../../components/EditorCard/EditorCard';
import BroadcastCard from '../../components/BroadcastCard/BroadcastCard';
import FixingPenguine from '../../static/images/Recommend/Fixing.png';
import { logPageView } from "../../Utils/analytics";

class RecommendContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
    logPageView("플랫폼 페이지");
	}
	
	render() {
		return (
			<div className="RecommendContainer">
			
				<img src={FixingPenguine}/>
				<Title size="large" color="blue">준비중인 페이지입니다!</Title>
				<div className="wait">조금만 기다려주세요!</div>
			
				{/* <div className="RecommendContainer--header">
					<Title size="large" border="thick">추천</Title>	
				</div>	
				<div className="RecommendContainer--CustomHeader">
					<RecommendHeader/>
				</div>
				<div className="RecommendContainer--Recommend">
					<div className="Recommend--Editor">
						<div className="editor">
							<EditorCard/>
						</div>
						<div className="editor">
							<EditorCard/>
						</div>
					</div>
					<div className="Recommend--VOD">
						<div className="vod--title">
							<Title size="small">트위치 실시간 방송 순위</Title>
						</div>
						<div className="vod">
							<BroadcastCard/>
						</div>
						<div className="vod">
							<BroadcastCard/>
						</div>
						<div className="vod">
							<BroadcastCard/>
						</div>

					</div>
				</div> */}
			</div>)
	}
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendContainer);
