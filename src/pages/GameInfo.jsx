import React from 'react';
import { connect } from 'react-redux';

import { changeMenu } from '../store/Layout/Layout.store';
import { Helmet } from 'react-helmet';
import Header from '../components/Header/Header';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import GameInfoContainer from '../container/GameInfoContainer/GameInfoContainer';
import Loading from '../components/Loading/Loading';
import {
	reqGameDetail,
	reqGamePrice,
	reqCurrency,
	resGamePriceInit,
} from '../store/GameInfo/GameInfo.store';

class GameInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		const {
			match,
			reqGameDetail,
			reqGamePrice,
			reqCurrency,
			gameInfo,
			resGamePriceInit,
		} = this.props;

		const id = match.params.id.replace(/^\D+/g, '');
		reqGameDetail(id);
		resGamePriceInit();

		if (!!gameInfo.info && gameInfo.info.game_class === 0) {
			reqGamePrice(
				'c4dd806e2e4ebcd066ababe41f02230631752489',
				gameInfo.info.game_refer_id,
			);
		}
		reqCurrency();
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { gameInfo, reqGamePrice } = this.props;
		if (gameInfo != nextProps.gameInfo) {
			if (
				!!nextProps.gameInfo.info &&
				nextProps.gameInfo.info.game_class === '0'
			) {
				reqGamePrice(
					'c4dd806e2e4ebcd066ababe41f02230631752489',
					nextProps.gameInfo.info.game_refer_id,
				);
			}
		}
		return true;
	}

	render() {
		const { gameInfo, plain } = this.props;
		return (
			<div className="GameInfo">
				<Helmet>
					<title>슈퍼플레이어 | 게임 상세</title>
				</Helmet>
				<ContentBoard>
					<GameInfoContainer gameInfo={gameInfo} />
				</ContentBoard>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.layout.isLoading,
		gameInfo: state.gameInfo.gameInfo,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
		reqGameDetail: id => dispatch(reqGameDetail(id)),
		reqGamePrice: (id, plain) => dispatch(reqGamePrice(id, plain)),
		reqCurrency: () => dispatch(reqCurrency()),
		resGamePriceInit: () => dispatch(resGamePriceInit()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(GameInfo);
