import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Helmet } from 'react-helmet';

import { changeMenu } from '../store/Layout/Layout.store';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import InfoContainer from '../container/InfoContainer/InfoContainer';
import ScrollButton from '../components/ScrollButton/ScrollButton';
import {
	reqGameInfo,
	reqGamePrice,
	upsertMyTaste,
	searchGame,
	initIsMore,
	initCount,
} from '../store/GameInfo/GameInfo.store';
import { reqGetMyCurating } from '../store/MyPage/MyPage.store';

// const styles = {
// 	WebkitTransform: 'translateZ(1px)',
// 	MozTransform: 'translateZ(1px)',
// 	OTransform: 'translateZ(1px)',
// 	transform: 'translateZ(1px)',
// 	position: 'fixed',
// 	width: '55px',
// 	height: '55px',
// 	bottom: '3%',
// 	right: '3%',
// 	zIndex: '100',
// };

// const Info = ({
// 	gameInfo,
// 	isMore,
// 	reqGameInfo,
// 	count,
// 	// searchGame,
// 	// isSearch,
// 	searchText,
// 	// sessionKey,
// 	// reqGetMyCurating,
// 	modalState,
// }) => {
// 	const [height, setHeight] = useState(scroll);

// 	useEffect(() => {
// 		if (!isMore) {
// 			// window.addEventListener('resize', function() {
// 			// 	if (window.innerWidth >= 765 && window.innerWidth <= 771) {
// 			// 		reqGameInfo(1, 16);
// 			// 	}
// 			// });
// 			reqGameInfo(1, 16);
// 		} else {
// 			reqGameInfo(count);
// 		}
// 	}, [count]);

// 	return (
// 		<div className="Info">
// 			<Helmet>
// 				<title>슈퍼플레이어 | 게임 정보</title>
// 			</Helmet>
// 			<ContentBoard>
// 				<InfoContainer gameInfo={gameInfo} />
// 			</ContentBoard>

// 			<div className="top-button" style={styles}>
// 				{height !== 0 ? (
// 					<ScrollButton scrollStepInPx="100" delayInMs="3.66" />
// 				) : null}
// 			</div>
// 		</div>
// 	);
// };

class Info extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width: 0,
		};
	}

	componentDidMount() {
		const {
			reqGameInfo,
			reqGamePrice,
			count,
			isMore,
			sessionKey,
			initIsMore,
		} = this.props;

		if (!isMore) {
			// window.addEventListener('scroll', () => {
			// 	let scroll = window.scrollY;

			// 	this.setState({
			// 		height: scroll,
			// 	});
			// });

			window.addEventListener('resize', function() {
				if (this.window.innerWidth >= 765 && this.window.innerWidth <= 771) {
					reqGameInfo(1, 16);
				}
			});
			reqGameInfo(1, 16);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const {
			gameInfo,
			reqGameInfo,
			count,
			searchGame,
			isSearch,
			searchText,
			isMore,
			sessionKey,
			reqGetMyCurating,
		} = this.props;

		if (count !== nextProps.count) {
			if (searchText.length !== 0) {
				searchGame(searchText, nextProps.count);
			} else {
				if (!isMore) {
					reqGameInfo(nextProps.count);
				}
			}
		}

		return true;
	}

	componentWillUnmount() {
		const {
			taste,
			upsertMyTaste,
			gamePrice,
			initIsMore,
			initCount,
		} = this.props;
		if (taste.length > 0) {
			upsertMyTaste();
			initCount();
		} else {
			initCount();
		}

		window.removeEventListener('resize', function() {
			this.setState({
				height: window.innerWidth,
			});

			if (this.window.innerWidth >= 767 && this.window.innerWidth <= 769) {
				reqGameInfo(1, 16);
			}
		});
	}

	render() {
		const { gameInfo, myCuratingList, sessionKey } = this.props;
		const { height } = this.state;
		const styles = {
			WebkitTransform: 'translateZ(1px)',
			MozTransform: 'translateZ(1px)',
			OTransform: 'translateZ(1px)',
			transform: 'translateZ(1px)',
			position: 'fixed',
			width: '55px',
			height: '55px',
			bottom: '3%',
			right: '3%',
			zIndex: '100',
		};

		if (!!sessionKey) {
			reqGetMyCurating();
		}
		return (
			<div className="Info">
				<Helmet>
					<title>슈퍼플레이어 | 게임 정보</title>
				</Helmet>
				<ContentBoard>
					<InfoContainer gameInfo={gameInfo} />
				</ContentBoard>

				<div className="top-button" style={styles}>
					{height !== 0 ? (
						<ScrollButton scrollStepInPx="100" delayInMs="3.66" />
					) : null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		modalState: state.gameInfo.modalState,
		gameInfo: state.gameInfo.gameInfoList,
		gamePrice: state.gameInfo.gamePrice,
		count: state.gameInfo.count,
		taste: state.gameInfo.taste,
		sessionKey: state.auth.sessionKey,
		myCuratingList: state.myPage.myCuratingList,
		isSearch: state.gameInfo.isSearch,
		searchText: state.gameInfo.searchText,
		isMore: state.gameInfo.isMore,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		reqGameInfo: count => dispatch(reqGameInfo(count)),
		reqGamePrice: (key, plain) => dispatch(reqGamePrice(key, plain)),
		upsertMyTaste: () => dispatch(upsertMyTaste()),
		searchGame: text => dispatch(searchGame(text)),
		reqGetMyCurating: () => dispatch(reqGetMyCurating()),
		initIsMore: () => dispatch(initIsMore()),
		initCount: () => dispatch(initCount()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Info);
