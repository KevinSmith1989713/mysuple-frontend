import React, { Fragment } from 'react';
import './App.scss';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider, connect } from 'react-redux';
import Media from 'react-media';
import styled from 'styled-components';
// 컨테이너 모듈
import Community from './pages/Community';
import Community2 from './pages/Community2';
import CommunityOfficial from './pages/CommunityOfficial';
import Info from './pages/Info';
import Recommend from './pages/Recommend';
import Colleague from './pages/Colleague';
import League from './pages/League';
import MakeLeaguePage from './pages/MakeLeaguePage';
import LeaguePage from './pages/LeaguePage';
import LeagueManagePage from './pages/LeagueManagePage';
import home from './pages/home';
import GameInfo from './pages/GameInfo';
import Curating from './pages/Curating';
import Inquirey from './pages/Inquirey';
import Search from './pages/Search';
import Terms from './pages/Terms';
import PayTerms from './pages/PayTerms';
import EditorPick from './pages/EditorPick';
import Notice from './pages/Notice';
import NoticePost from './pages/NoticePost';
import Faq from './pages/Faq';
import RePassSetting from './pages/RePassSetting';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HamburgerBox from './components/HamburgerBox/HamburgerBox';
import SearchModal from './components/SearchModal/SearchModal';
import pay from './container/League/MakeLeaguePayPage/MakeLeaguePayPage';

import Loading from './components/Loading/Loading';

import { changeWindow } from './store/Layout/Layout.store';
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			scroll: 0,
			htmlWidth: window.innerWidth,
		};
	}

	componentWillUnmount() {}
	componentDidMount() {
		const width = window.innerWidth;
		const { htmlWidth } = this.state;
		if (width != htmlWidth) {
			window.addEventListener('resize', e => {
				this.setState({
					htmlWidth: window.innerWidth,
				});
			});
		} else {
			window.removeEventListener('resize', () => {});
		}
		// if (width <= 768) {
		// 	window.addEventListener('scroll', e => {
		// 		this.setState({
		// 			scroll: window.pageYOffset,
		// 		});
		// 	});
		// } else {
		// 	window.removeEventListener('scroll', () => {});
		// }
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { scroll, htmlWidth } = this.state;
		const { history, windowSize, changeWindow } = this.props;

		const header = document.querySelector('.header');
		const container = document.querySelector('.container');
		const subHeader = document.querySelector('.SubHeader');

		changeWindow();
		if (scroll !== nextState.scroll) {
			if (scroll <= nextState.scroll) {
				header.style.position = 'relative';
				header.style.top = 0;
				header.style.zIndex = 9999;
				container.style.marginTop = 0;
			} else {
				if (nextState.scroll > 134) {
					if (document.location.pathname !== '/') {
						if (nextState.scroll > 117) {
							header.style.position = 'fixed';
							header.style.top = 0;
							header.style.zIndex = 9999;
							container.style.marginTop = '117px';
						}
					} else {
						if (nextState.scroll > 117) {
							header.style.position = 'fixed';
							header.style.top = 0;
							header.style.zIndex = 9999;
							container.style.marginTop = '117px';
							// subHeader.style.display = 'flex';
						} else {
							header.style.position = 'relative';
							header.style.top = 0;
							header.style.zIndex = 9999;
							container.style.marginTop = 0;
							subHeader.style.display = 'none';
						}
					}
				} else {
					header.style.position = 'relative';
					header.style.top = 0;
					header.style.zIndex = 9999;
					container.style.marginTop = 0;
					if (document.location.pathname === '/') {
						// subHeader.style.display = 'none';
					}
				}
			}
			return true;
		} else {
			return true;
		}
	}

	handleResize = () => {
		this.setState({ ...this.state, width: window.innerWidth });
	};

	render() {
		const { store, history } = this.props;
		const { changeWindow } = this.props;

		return (
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<RoutesComponent />
				</ConnectedRouter>
			</Provider>
		);
	}
}
console;
const RoutesComponent = () => {
	return (
		<Fragment>
			<div className="header">
				<Header />
			</div>
			<Media query={{ maxWidth: 768 }}>
				{matches => matches && <HamburgerBox />}
			</Media>
			{/* <SearchModal/> */}
			<div className="container">
				{/* 홈 */}
				<Route exact path="/" component={home} />

				{/* 게임 */}
				<Route exact path="/info" component={Info} />
				<Route exact path="/info/:id" component={GameInfo} />

				{/* 검색 */}
				<Route exact path="/search/:id" component={Search} />

				{/* 추천 */}
				{/* <Route exact path="/recommend" component={Recommend} /> */}

				{/* 리그 */}
				{/* <Route exact path="/league" component={Recommend} /> */}
				<Route exact path="/league" component={League} />
				<Route exact path="/makeLeague/step1" component={MakeLeaguePage} />
				<Route exact path="/makeLeague/step2" component={MakeLeaguePage} />
				<Route exact path="/makeLeague/step3" component={MakeLeaguePage} />
				<Route exact path="/league/:id" component={LeaguePage} />

				{/* 리그 관리자 페이지*/}
				<Route exact path="/leagueManage" component={LeagueManagePage} />
				{/* <Route exact path="/leagueManage/:id" component={LeagueManagePage} /> */}
				<Route
					exact
					path="/leagueManage/:id/:id"
					component={LeagueManagePage}
				/>
				<Route
					exact
					path="/leagueManage/:id/leagueNotice/:id"
					component={LeagueManagePage}
				/>

				{/* 페이페이지 */}
				<Route exact path="/pay" component={pay} />

				{/* 동료찾기*/}
				<Route exact path="/colleague" component={Colleague} />
				{/* <Route exact path="/colleague" component={Community2} /> */}
				<Route exact path="/community/:id" component={Community} />
				{/* <Route
					exact
					path={[
						'/community/official/:id',
						'/community/official/:id/:tab',
						'/community/official/:id/:tab/:tab_id',
					]}
					component={CommunityOfficial} */}

				{/* 커뮤니티*/}
				{/* <Route exact path="/community" component={Community2} /> */}
				<Route exact path="/community" component={Community} />
				{/* 큐레이팅 */}
				<Route exact path="/curating" component={Curating} />

				{/* 1:1 관리자 문의 */}
				<Route exact path="/inquiry" component={Inquirey} />

				{/* 약관 */}
				<Route exact path="/terms" component={Terms} />

				{/* 결제 약관 */}
				<Route exact path="/paidterms" component={PayTerms} />

				{/* 에디터픽 */}
				<Route exact path="/editor-pick/:id" component={EditorPick} />

				{/* 공지사항, faq */}
				<Route exact path="/notice" component={Notice} />
				<Route exact path="/notice/:id" component={NoticePost} />

				{/* 비밀번호 설정 */}
				<Route exact path="/resetpassword/:id" component={RePassSetting} />

				<Route exact path="/faq" component={Faq} />
			</div>
			<Loading />
			<div className="footer" />
			<Footer />
		</Fragment>
	);
};

export default connect(({ layout }) => ({ windowSize: layout.windowSize }), {
	changeWindow,
})(hot(module)(App));
