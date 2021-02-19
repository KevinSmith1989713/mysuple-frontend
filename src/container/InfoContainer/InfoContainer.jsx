import React from 'react';
import './InfoContainer.scss';
import { connect } from 'react-redux';
import TitleClass from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import FilterTable from '../../components/FilterTable/FilterTable';
import ShowHide from '../../components/ShowHide/ShowHide';
import CommercialImage from '../../static/images/Info/Commercial.png';
import CommercialImage_mob from '../../static/images/Info/Commercial_mob.png';
import Media from 'react-media';
import { logPageView } from '../../Utils/analytics';

import Lower from '../../static/images/iconbox/LowerArrow.svg';
import {
	upCount,
	resetCount,
	selectLikeGame,
	selectAlarmGame,
	insertReview,
	searchGame,
} from '../../store/GameInfo/GameInfo.store';

import infoService from '../../services/infoService';
import GameInfo from '../../view/GameInfo/GameInfo';

class InfoContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			rowStateIndex: -1,
			cardStateIndex: -1,
			selectedItem: null,
			count: 0,
			text: this.props.searchText.length != 0 ? this.props.searchText : '',
		};

		this.onClickShowInfo = this.onClickShowInfo.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onClickSubmit = this.onClickSubmit.bind(this);
	}

	componentDidMount() {
		logPageView('플랫폼 페이지');
	}

	onClickShowInfo(parentIndex, cardIndex, item) {
		const { rowStateIndex, cardStateIndex } = this.state;
		if (parentIndex === rowStateIndex && cardIndex === cardStateIndex) {
			this.setState({
				rowStateIndex: -1,
				cardStateIndex: -1,
			});
		} else {
			this.setState({
				rowStateIndex: parentIndex,
				cardStateIndex: cardIndex,
				selectedItem: item,
			});
		}
	}
	updateDimensions = () => {
		this.setState({ width: window.innerWidth });
	};
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
		this.setState({ ...this.state, text: this.props.searchText });
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}

	onChange(e) {
		const { name, value } = e.target;

		this.setState({
			[name]: value,
		});
	}

	onClickSubmit() {
		const { sessionKey } = this.props;
		this.props.searchGame(this.state.text);
		this.props.resetCount();
		if (!!sessionKey) {
		} else {
			return;
		}
	}

	render() {
		const {
			page,
			rowStateIndex,
			cardStateIndex,
			selectedItem,
			count,
		} = this.state;
		const {
			upCount,
			gameInfo,
			selectLikeGame,
			selectAlarmGame,
			userInfo,
			pathname,
			sessionKey,
			insertReview,
			isSearch,
			searchText,
			isMore,
		} = this.props;
		
		return (
			<div className="InfoContainer">
				<div className="InfoContainer--TitleClass">
					<TitleClass border="thick" size="large">
						게임 정보
					</TitleClass>
				</div>
				<div className="InfoContainer--input">
					<Input
						view="search"
						placeholder="검색어를 입력하세요"
						onChange={this.onChange}
						value={this.state.text}
						name="text"
						onClick={this.onClickSubmit}
					/>
				</div>
				<div className="InfoContainer--ShowHide">
					{/* <ShowHide arrowPosition="right" fold={false} text="게임 필터검색">
						<div className="InfoContainer--Filter">
							<FilterTable />
						</div>
					</ShowHide> */}
				</div>
				{/* <div className="InfoContainer--Commercial">
					<Media query={{ maxWidth: 768 }}>
						{matches =>
							matches ? (
								<img src={CommercialImage_mob} />
							) : (
								<img src={CommercialImage} />
							)
						}
					</Media>
				</div> */}
				<div className="InfoContainer--Cards">
					<GameInfo
						page={page}
						rowStateIndex={rowStateIndex}
						cardStateIndex={cardStateIndex}
						selectedItem={selectedItem}
						gameInfo={gameInfo}
						onClickShowInfo={this.onClickShowInfo}
						count={count}
						selectLikeGame={selectLikeGame}
						selectAlarmGame={selectAlarmGame}
						userInfo={userInfo}
						pathname={pathname}
						sessionKey={sessionKey}
						insertReview={insertReview}
						isSearch={isSearch}
						searchText={searchText}
						isMore={isMore}
					/>
				</div>
				{300 > page && (
					<div
						className="more"
						onClick={() => {
							upCount();
							this.setState({ count: this.state.count + 1 });
						}}
					>
						<div>더보기</div>
						<img src={Lower} />
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.auth.userInfo,
		pathname: state.router.location.pathname,
		sessionKey: state.auth.sessionKey,
		isSearch: state.gameInfo.isSearch,
		searchText: state.gameInfo.searchText,
		isMore: state.gameInfo.isMore,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		upCount: () => dispatch(upCount()),
		resetCount: () => dispatch(resetCount()),
		selectLikeGame: (selected, like, alarm) =>
			dispatch(selectLikeGame(selected, like, alarm)),
		selectAlarmGame: (selected, like, alarm) =>
			dispatch(selectAlarmGame(selected, like, alarm)),
		insertReview: (
			game_id,
			fun_score,
			complete_score,
			difficulty_score,
			operation_score,
			total_score,
			evaluation_content,
		) =>
			dispatch(
				insertReview(
					game_id,
					fun_score,
					complete_score,
					difficulty_score,
					operation_score,
					total_score,
					evaluation_content,
				),
			),
		searchGame: text => dispatch(searchGame(text)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoContainer);
