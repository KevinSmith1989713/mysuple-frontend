import React from 'react';
import './InquireyContainer.scss';
import { connect } from 'react-redux';
import axios from 'axios';

import ProfileTitle from '../../components/ProfileTitle/ProfileTitle';
import Lower from '../../static/images/iconbox/LowerArrow.svg';
import {
	upCount,
	selectLikeGame,
	selectAlarmGame,
	insertReview,
} from '../../store/GameInfo/GameInfo.store';
import GameInfo from '../../view/GameInfo/GameInfo';
import AttachFile from '../../components/AttachFile/AttachFile';
import Button from '../../components/Button/Button';
import { logPageView } from '../../Utils/analytics';

const categoryList = [
	{
		id: '계정 / 개인정보',
		key: 1,
		name: '계정 / 개인정보',
	},
	{
		id: '비즈니스',
		key: 2,
		name: '비즈니스',
	},
	{
		id: '서비스',
		key: 3,
		name: '서비스',
	},
	{
		id: '기타',
		key: 4,
		name: '기타',
	},
];

class InquieryContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: null,
			title: null,
			textarea: null,
			res_email: null,
			attach: null,
			email: null,
		};

		//Ref
		this.titleInput = React.createRef();
		this.textAreaInput = React.createRef();

		this.onClickCategory = this.onClickCategory.bind(this);
		this.onChangeTexts = this.onChangeTexts.bind(this);
	}

	componentDidMount() {
		logPageView('플랫폼 페이지');
	}

	onClickSubmit = () => {
		const { email, title, category, textarea } = this.state;

		if (
			email === null ||
			title === null ||
			category === null ||
			textarea === null
		) {
			// console.log('이건 안될거니?');
			alert('모두 입력해 주세요.');
		} else {
			// console.log('보내져라');
			try {
				axios.post('https://spp.life/CSMail', {
					user_mail: email,
					subject: title,
					category: category,
					content: textarea,
				});
			} catch (e) {
				console.error(e);
			}
			// this.setState({
			// 	email: null,
			// 	title: null,
			// 	category: null,
			// 	textarea: null,
			// });
			alert('완료되었습니다.');
		}
	};

	onClickCategory(e) {
		if (this.state.category === e.target.id) {
			this.setState({
				category: null,
			});
		} else {
			this.setState({
				category: e.target.id,
			});
		}
	}

	onChangeTexts(e) {
		this.setState({
			[e.target.id]: e.target.value,
		});
	}

	render() {
		const { category } = this.state;
		// console.log(
		// this.state.email,
		// &&
		// 	this.state.title &&
		// 	this.state.category &&
		// 	this.state.textarea,
		// );
		// console.log(this.state.title);
		// console.log(this.state.category);
		// console.log(this.state.textarea);
		return (
			<div className="InquireyContainer">
				<div className="InquireyContainer--Headerx">
					<ProfileTitle>관리자에게 문의</ProfileTitle>
				</div>
				<div className="InquireyContainer--Txt--title">카테고리</div>
				<div className="InquireyContainer--Category">
					{categoryList.map(menu => {
						// console.log(menu);
						return (
							<div
								className={
									category === menu.id
										? 'Category--btn__select'
										: 'Category--btn'
								}
								key={menu.key}
								id={menu.id}
								onClick={e => this.onClickCategory(e)}
							>
								{menu.name}
							</div>
						);
					})}
				</div>
				<div className="InquireyContainer--Title">
					<input
						className="Title--input"
						placeholder="제목"
						id="title"
						inputref={ref => {
							this.titleInput;
						}}
						onChange={this.onChangeTexts}
					/>
				</div>
				<div className="InquireyContainer--Textarea">
					<textarea
						placeholder="내용을 입력하세요"
						id="textarea"
						onChange={this.onChangeTexts}
					></textarea>
				</div>
				<div className="InquireyContainer--AttachFile">
					{/* <AttachFile onChange={e => console.error(e)} /> */}
				</div>

				<div className="InquireyContainer--Txt--title">답변 받을 이메일</div>
				<div className="InquireyContainer--Email">
					<input
						className="Email--input"
						id="email"
						onChange={this.onChangeTexts}
					/>
				</div>

				<div className="InquireyContainer--Submit">
					<Button size="medium" onClick={() => this.onClickSubmit()}>
						1:1문의하기
					</Button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		userInfo: state.auth.userInfo,
		pathname: state.router.location.pathname,
		sessionKey: state.auth.sessionKey,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		upCount: () => dispatch(upCount()),
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(InquieryContainer);
