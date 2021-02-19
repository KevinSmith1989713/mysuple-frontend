import React from 'react';
import './CommunityOfficialContainer.scss';
import { connect } from 'react-redux';
import { reqOfficialNotice, reqOfficialDevNote, reqOfficialEvent, reqOfficialSkin, communitySkin} from '../../store/Community/Community.store'
import CommunityHeader from '../../components/CommunityHeader/CommunityHeader'
import CommunityHeaderMenu from '../../components/CommunityHeaderMenu/CommunityHeaderMenu'
import CommunityMain from '../../view/Community/CommunityMain/CommunityMain'
import CommunityFAQ from '../../view/Community/CommunityFAQ/CommunityFAQ'
import CommunityEvent from '../../view/Community/CommunityEvent/CommunityEvent'
import CommunityDevNote from '../../view/Community/CommunityDevNote/CommunityDevNote'
import CommunityNotice from '../../view/Community/CommunityNotice/CommunityNotice'
import CommunityDetail from '../../view/Community/CommunityDetail/CommunityDetail'
import CommunityReport from '../../view/Community/CommunityReport/CommunityReport'
import CommunitySetting from '../../view/Community/CommunitySetting/CommunitySetting'

import { Route, withRouter } from 'react-router-dom';
import { logPageView } from "../../Utils/analytics";
import Media from 'react-media';

const example = {
  logo: 'http://pluspng.com/img-png/league-of-legends-png-png-file-name-league-of-legends-999.png',
  community_title: "리그 오브 레전드",
  isOfficial: true,
	community_join_cnt:0
}

class CommunityOfficialContainer extends React.Component {
	constructor(props) {
		super(props);
		const { match, reqOfficialNotice, reqOfficialDevNote, reqOfficialEvent, reqOfficialSkin } = this.props;
		reqOfficialNotice(match.id)
		reqOfficialDevNote(match.id)
		reqOfficialEvent(match.id)
		reqOfficialSkin(match.id)
	}

	componentDidMount() {
		window.scrollTo(0, 0)
    logPageView("플랫폼 페이지");
	}
	render() {
		const headerMenu = [
			{
				name:'메인',
				key:'main',
			},{
				name:'공지사항',
				key:'notice',
			},{
				name:'개발노트',
				key:'devNote',
			},{
				name:'이벤트',
				key:'event',
			},{
				name:'FAQ',
				key:'faq',
			},{
				name:'버그신고/제안요청',
				key:'report',
			}
		]

		const { match, communitySkin } = this.props;
		return (
			<div className="CommunityOfficialContainer">
				{match.tab!='setting' && 
					<Media query={{maxWidth: 769}}>
						{matches => matches 
							? (
								<div className="CommunityOfficialContainer--Header">
									<CommunityHeaderMenu menus={headerMenu} match={match}/>
									{match.tab === undefined && <CommunityHeader 
										headerBackImg={'https://i.pinimg.com/originals/4c/a5/3b/4ca53bff154cec9e97d3d6d362456e19.jpg'} 
										communityInfo = {example}
										match={match}
									/>}
								</div>
							)
							: (
								<div className="CommunityOfficialContainer--Header">
									<CommunityHeader 
										headerBackImg={'https://i.pinimg.com/originals/4c/a5/3b/4ca53bff154cec9e97d3d6d362456e19.jpg'} 
										communityInfo = {example}
										match={match}
									/>
									<CommunityHeaderMenu menus={headerMenu} match={match}/>
								</div>
							)
						}
					</Media>
					
				}
				<div className="CommunityOfficialContainer--Main">
					<Route exact path="/community/official/:id" component={CommunityMain}/>
					<Route exact path="/community/official/:id/notice" component={CommunityNotice}/>
					<Route exact path="/community/official/:id/devNote" component={CommunityDevNote}/>
					<Route exact path="/community/official/:id/event" component={CommunityEvent}/>
					<Route exact path="/community/official/:id/faq" component={CommunityFAQ}/>
					<Route exact path="/community/official/:id/report" component={CommunityReport}/>
					<Route exact path="/community/official/:id/setting" component={CommunitySetting}/>
					<Route exact path="/community/official/:id/:tab/:postId" component={CommunityDetail}/>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => {
	return {
		communitySkin: state.community.communitySkin,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reqOfficialNotice: pageId => dispatch(reqOfficialNotice(pageId)),
		reqOfficialDevNote: pageId => dispatch(reqOfficialDevNote(pageId)),
		reqOfficialEvent: pageId => dispatch(reqOfficialEvent(pageId)),
		reqOfficialSkin: pageId => dispatch(reqOfficialSkin(pageId)),
	};
};

export default connect(mapStateToProps,mapDispatchToProps)(CommunityOfficialContainer);
