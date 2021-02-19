import React from 'react';
import './CuratingContainer.scss';
import { connect } from 'react-redux';
import { changeMenu } from '../../store/Layout/Layout.store';
import Title from '../../components/Title/Title';
import WriteCuratingCard from '../../components/WriteCuratingCard/WriteCuratingCard';
import Button from '../../components/Button/Button';
import { logPageView } from '../../Utils/analytics';

class CuratingContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gameInfo: [
				{ game_id: null, text: '', tag: '' },
				{ game_id: null, text: '', tag: '' },
			],
		};
	}
	componentDidMount() {
		logPageView('플랫폼 페이지');
	}
	setEachCurating = (id, change) => {};
	addGame = () => {
		const newInfo = this.state.gameInfo;
		newInfo.push({ game_id: null, text: '', tag: '' });
		this.setState({ gameInfo: newInfo });
	};

	render() {
		const { gameInfo } = this.state;

		return (
			<div className="CuratingContainer">
				<Title border="thick" size="large">
					게임 큐레이팅 만들기
				</Title>
				<div className="CuratingContainer--Header">
					<input
						type="text"
						className="input--title"
						placeholder="제목을 입력하세요"
					/>
					<input
						type="text"
						className="input--tag"
						placeholder="태그는 띄어쓰기로 구분됩니다"
					/>
				</div>
				{gameInfo.map((info, index) => {
					return (
						<div className="CuratingContainer--Card" key={index}>
							<WriteCuratingCard
								onChangeCurating={cu => {
									this.setEachCurating(index, cu);
								}}
							/>
						</div>
					);
				})}
				<div className="CuratingContainer--Add">
					{gameInfo.length < 30 && (
						<div className="btn" onClick={() => this.addGame()}>
							<img />
							{`게임 추가 (${gameInfo.length}/30)`}
						</div>
					)}
				</div>
				<div className="CuratingContainer--Submit">
					<Button size="medium">완료</Button>
				</div>
			</div>
		);
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

export default connect(mapStateToProps, mapDispatchToProps)(CuratingContainer);
