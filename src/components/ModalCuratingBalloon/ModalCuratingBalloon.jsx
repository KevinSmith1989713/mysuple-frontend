import React, { useState, useEffect, Fragment } from 'react';
import './ModalCuratingBalloon.scss';
import CuratingFold from '../../static/images/Card/CuratingFold.png';
import CuratingLong from '../../static/images/Card/CuratingLong.png';
import BluePlus from '../../static/images/BluePlus@3x.png';
import { connect } from 'react-redux';
import { makeCurating } from '../../store/GameInfo/GameInfo.store';
import CheckBox from '../CheckBox/CheckBox';

import CuratingService from '../../services/curatingService';
import { startLoading, endLoading } from '../../store/Layout/Layout.store';

const ModalCuratingBalloon = ({
	// userInfo,
	curatingList,
	makeCurating,
	game_id,
	close,
}) => {
	const getUserInfo = JSON.parse(localStorage.getItem('data'));

	const [makeCuration, setMakeCurating] = useState(false);
	const [title, setTitle] = useState('');
	const [tag, setTag] = useState('');
	const [checked1, setChecked1] = useState(false);
	const [list, setList] = useState(null);

	const [flag, setFalg] = useState(false);
	const handleChange = e => {
		// console.log(e.target.checked);
	};

	useEffect(() => {
		// setChecked1(false);
	}, [game_id]);

	const [selectCuration, setSelectCuration] = useState(['4']);

	const curating = () => {
		if (!!title) {
			makeCurating(title, tag);
			setMakeCurating(false);
			setTitle('');
			setTag('');
			setFalg(!flag);
		} else alert('큐레이팅 제목을 적어주세요!');
	};

	const addCurating = (e, id, g_id) => {
		const { checked } = e.target;

		if (checked) {
			setChecked1(true);
			setList({
				...list,
				id,
				g_id,
			});
		} else {
			setChecked1(false);
			setList(null);
		}
	};

	const onClickRequest = () => {
		if (!!list) {
			startLoading();
			CuratingService.reqInsertCuratingGame(list).then(res => {
				endLoading();
			});
		} else {
			alert('담을 큐레이팅을 선택하세요');
		}
	};

	const checkedFunc = id => {
		if (curatingList.length != 0) {
			const dfdf = curatingList.indexOf(id);
			return dfdf === -1 ? false : true;
		} else {
			return false;
		}
	};

	return (
		<div className="ModalCuratingBalloon">
			<img
				src={makeCuration ? CuratingLong : CuratingFold}
				className="BG--Balloon"
			/>
			<div className="ModalCuratingBalloon--Curating">
				<div className="ModalCuratingBalloon--Title">큐레이팅 담기</div>
				<div className="ModalCuratingBalloon--List">
					{!!getUserInfo && !!getUserInfo.id && !!curatingList ? (
						<div className="curatingList">
							{curatingList.map((curating, index) => {
								const idNum = Number.parseInt(curating.curating_id, 10);

								return (
									<div className="row--checkCurating" key={index}>
										<input
											// className="styled-checkbox"
											type="checkbox"
											id={curating.curating_id}
											onClick={e => {
												addCurating(e, idNum, game_id);
											}}
											// checked={checked1}
											// onChange={e => handleChange(e)}
											// checked={e => e.target.id}
										/>
										<label for={curating.curating_id}>
											{curating.curating_title}
										</label>
										{/* <CheckBox
											id={curating.curating_id}
											onClick={e => addCurating(e, idNum, game_id)}
											checked={checked1}
										>
											{curating.curating_title}
										</CheckBox> */}
									</div>
								);
							})}
						</div>
					) : (
						<div className="curatingList--none">큐레이팅 목록이 없습니다.</div>
					)}
				</div>
				{makeCuration && (
					<div className="ModalCuratingBalloon--AddCurating">
						<div className="title">
							제목<span className="blue">*</span>
						</div>
						<input
							type="text"
							className="input--title"
							onChange={e => setTitle(e.target.value)}
						/>
						<div className="under--text">0/50</div>

						<div className="title">태그</div>
						<input
							type="text"
							className="input--tag"
							onChange={e => setTag(e.target.value)}
						/>
						<div className="under--text">띄어쓰기로 구분됩니다</div>
					</div>
				)}
				<div className="ModalCuratingBalloon--Button">
					{makeCuration ? (
						<Fragment>
							<div className="btn" onClick={() => curating()}>
								추가
							</div>
							<div className="btn" onClick={() => setMakeCurating(false)}>
								취소
							</div>
						</Fragment>
					) : !!curatingList ? (
						<Fragment>
							<div
								className="btn"
								onClick={() => {
									onClickRequest();
									close();
								}}
							>
								담기
							</div>
							<div className="btn" onClick={() => setMakeCurating(true)}>
								큐레이팅 만들기
							</div>
						</Fragment>
					) : (
						<Fragment>
							<div className="btn" onClick={() => setMakeCurating(true)}>
								추가
							</div>
						</Fragment>
					)}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		menu: state.layout.menu,
		isLoading: state.layout.isLoading,
		// userInfo: state.auth.userInfo,
		isSuccess: state.layout.isSuccess,
		curatingList: state.myPage.myCuratingList,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		makeCurating: (curating_name, curating_tag) =>
			dispatch(makeCurating(curating_name, curating_tag)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ModalCuratingBalloon);
