import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import { getLeagueBanList } from '../../../store/League/League.store';

import './TierSlider.scss';

const settingCategory1 = [
	{ label: '아이언', value: 'iron', id: 1 },
	{ label: '브론즈', value: 'bronze', id: 2 },
	{ label: '실버', value: 'silver', id: 3 },
	{ label: '골드', value: 'gold', id: 4 },
	{ label: '플래티넘', value: 'platinum', id: 5 },
	{ label: '다이아몬드', value: 'diamond', id: 6 },
	{ label: '마스터', value: 'master', id: 7 },
	{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
];
const settingCategory2 = [
	{ label: '브론즈', value: 'bronze', id: 1 },
	{ label: '실버', value: 'silver', id: 2 },
	{ label: '골드', value: 'gold', id: 3 },
	{ label: '플래티넘', value: 'platinum', id: 4 },
	{ label: '다이아몬드', value: 'diamond', id: 5 },
	{ label: '마스터', value: 'master', id: 6 },
	{ label: '그랜드마스터', value: 'grandmaster', id: 7 },
	{ label: '챌린저', value: 'challenger', id: 8 },
];
const selectText = [{ label: '선택' }];

const TierSlider = ({ getTierList, insertLeagueInfo, getLeagueBanList }) => {
	const [flag, setFlag] = useState(false);
	const [selectTierNum, setSelectTierNum] = useState(0);
	const [selectTierNum2, setSelectTierNum2] = useState(8);
	const getSelectTier =
		insertLeagueInfo &&
		insertLeagueInfo.ban &&
		insertLeagueInfo.ban.tier.split(',').map(item => {
			return {
				value: item,
				label:
					(item === 'iron' && '아이언') ||
					(item === 'bronze' && '브론즈') ||
					(item === 'silver' && '실버') ||
					(item === 'gold' && '골드') ||
					(item === 'platinum' && '플래티넘') ||
					(item === 'diamond' && '다이아몬드') ||
					(item === 'master' && '마스터') ||
					(item === 'grandmaster' && '그랜드마스터') ||
					(item === 'challenger' && '챌린저'),
			};
		});
	const [selectTier, setSelctTier] = useState(
		[
			{ label: '아이언', value: 'iron', id: 1 },
			{ label: '브론즈', value: 'bronze', id: 2 },
			{ label: '실버', value: 'silver', id: 3 },
			{ label: '골드', value: 'gold', id: 4 },
			{ label: '플래티넘', value: 'platinum', id: 5 },
			{ label: '다이아몬드', value: 'diamond', id: 6 },
			{ label: '마스터', value: 'master', id: 7 },
			{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
			{ label: '챌린저', value: 'challenger', id: 9 },
		] || getSelectTier,
	);

	useEffect(() => {
		getTierList(selectTier, getSelectTier);
		selectTierNum > 0 &&
			getLeagueBanList({ tier: String(selectTier.map(item => item.value)) });
	}, [selectTier, selectTierNum, selectTierNum2]);

	const addCategory = e => {
		setSelectTierNum(e.id);
		const itemToFind = selectTier.find(function(item) {
			return item.id === e.id;
		});

		const idx = selectTier.indexOf(itemToFind);

		if (idx > -1) {
			setSelctTier(selectTier.splice(idx, 10));
		} else if (idx === -1 && e.id < selectTierNum2) {
			if (e.id === 6 && selectTierNum - e.id === 2) {
				selectTier.unshift(
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 5 && selectTierNum - e.id === 3) {
				selectTier.unshift(
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 4 && selectTierNum - e.id === 4) {
				selectTier.unshift(
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 3 && selectTierNum - e.id === 5) {
				selectTier.unshift(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 2 && selectTierNum - e.id === 6) {
				selectTier.unshift(
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 1 && selectTierNum - e.id === 7) {
				selectTier.unshift(
					{ label: '아이언', value: 'iron', id: 1 },
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 5 && selectTierNum - e.id === 2) {
				selectTier.unshift(
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
				);
			} else if (e.id === 4 && selectTierNum - e.id === 3) {
				selectTier.unshift(
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
				);
			} else if (e.id === 3 && selectTierNum - e.id === 4) {
				selectTier.unshift(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
				);
			} else if (e.id === 2 && selectTierNum - e.id === 5) {
				selectTier.unshift(
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
				);
			} else if (e.id === 1 && selectTierNum - e.id === 6) {
				selectTier.unshift(
					{ label: '아이언', value: 'iron', id: 1 },
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
				);
			} else if (e.id === 4 && selectTierNum - e.id === 2) {
				selectTier.unshift(
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
				);
			} else if (e.id === 3 && selectTierNum - e.id === 3) {
				selectTier.unshift(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
				);
			} else if (e.id === 2 && selectTierNum - e.id === 4) {
				selectTier.unshift(
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
				);
			} else if (e.id === 1 && selectTierNum - e.id === 5) {
				selectTier.unshift(
					{ label: '아이언', value: 'iron', id: 1 },
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
				);
			} else if (e.id === 3 && selectTierNum - e.id === 2) {
				selectTier.unshift(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
				);
			} else if (e.id === 2 && selectTierNum - e.id === 3) {
				selectTier.unshift(
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
				);
			} else if (e.id === 1 && selectTierNum - e.id === 4) {
				selectTier.unshift(
					{ label: '아이언', value: 'iron', id: 1 },
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
				);
			} else if (e.id === 2 && selectTierNum - e.id === 2) {
				selectTier.unshift(
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
				);
			} else if (e.id === 1 && selectTierNum - e.id === 3) {
				selectTier.unshift(
					{ label: '아이언', value: 'iron', id: 1 },
					{ label: '브론즈', value: 'bronze', id: 2 },
					{ label: '실버', value: 'silver', id: 3 },
				);
			} else if (e.id === 1 && selectTierNum - e.id === 2) {
				selectTier.unshift(
					{ label: '아이언', value: 'iron', id: 1 },
					{ label: '브론즈', value: 'bronze', id: 2 },
				);
			} else {
				selectTier.unshift({ label: e.label, value: e.value, id: e.id });
				setFlag(!flag);
			}
		}
		getTierList(selectTier);
	};

	const addCategory2 = e => {
		setSelectTierNum2(e.id);
		const itemToFind = selectTier.find(function(item) {
			return item.id === e.id;
		});

		const idx = selectTier.indexOf(itemToFind);
		if (selectTierNum - 1 <= e.id) {
			if (e.id === 3 && selectTierNum2 - e.id === -2) {
				selectTier.push(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
				);
			} else if (e.id === 4 && selectTierNum2 - e.id === -3) {
				selectTier.push(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
				);
			} else if (e.id === 5 && selectTierNum2 - e.id === -4) {
				selectTier.push(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
				);
			} else if (e.id === 6 && selectTierNum2 - e.id === -5) {
				selectTier.push(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 7 && selectTierNum2 - e.id === -6) {
				selectTier.push(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
				);
			} else if (e.id === 8 && selectTierNum2 - e.id === -7) {
				selectTier.push(
					{ label: '실버', value: 'silver', id: 3 },
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
					{ label: '챌린저', value: 'challenger', id: 9 },
				);
			} else if (e.id === 4 && selectTierNum2 - e.id === -2) {
				selectTier.push(
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
				);
			} else if (e.id === 5 && selectTierNum2 - e.id === -3) {
				selectTier.push(
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
				);
			} else if (e.id === 6 && selectTierNum2 - e.id === -4) {
				selectTier.push(
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 7 && selectTierNum2 - e.id === -5) {
				selectTier.push(
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
				);
			} else if (e.id === 8 && selectTierNum2 - e.id === -6) {
				selectTier.push(
					{ label: '골드', value: 'gold', id: 4 },
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
					{ label: '챌린저', value: 'challenger', id: 9 },
				);
			} else if (e.id === 5 && selectTierNum2 - e.id === -2) {
				selectTier.push(
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
				);
			} else if (e.id === 6 && selectTierNum2 - e.id === -3) {
				selectTier.push(
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 7 && selectTierNum2 - e.id === -4) {
				selectTier.push(
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
				);
			} else if (e.id === 8 && selectTierNum2 - e.id === -5) {
				selectTier.push(
					{ label: '플래티넘', value: 'platinum', id: 5 },
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
					{ label: '챌린저', value: 'challenger', id: 9 },
				);
			} else if (e.id === 6 && selectTierNum2 - e.id === -2) {
				selectTier.push(
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
				);
			} else if (e.id === 7 && selectTierNum2 - e.id === -3) {
				selectTier.push(
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
				);
			} else if (e.id === 8 && selectTierNum2 - e.id === -4) {
				selectTier.push(
					{ label: '다이아몬드', value: 'diamond', id: 6 },
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
					{ label: '챌린저', value: 'challenger', id: 9 },
				);
			} else if (e.id === 7 && selectTierNum2 - e.id === -2) {
				selectTier.push(
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
				);
			} else if (e.id === 8 && selectTierNum2 - e.id === -3) {
				selectTier.push(
					{ label: '마스터', value: 'master', id: 7 },
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
					{ label: '챌린저', value: 'challenger', id: 9 },
				);
			} else if (e.id === 8 && selectTierNum2 - e.id === -2) {
				selectTier.push(
					{ label: '그랜드마스터', value: 'grandmaster', id: 8 },
					{ label: '챌린저', value: 'challenger', id: 9 },
				);
			} else if (selectTierNum2 < e.id && selectTierNum < e.id) {
				selectTier.push(e);
			} else if (idx > -1) {
				selectTier.splice(idx + 2);
				setFlag(!flag);
			}
			getTierList(selectTier);
		}
	};
	useEffect(() => {}, [flag]);
	return (
		<div className="TierSlider">
			<Select
				className="select-form"
				// defaultValue={getSelectTier || settingCategory1[0]}
				defaultValue={selectText[0]}
				options={settingCategory1}
				onChange={addCategory}
			/>
			부터
			<Select
				className="select-form"
				// defaultValue={
				// 	(getSelectTier &&
				// 		getSelectTier[getSelectTier && getSelectTier.length - 1]) ||
				// 	settingCategory2[7]
				// }
				defaultValue={selectText[0]}
				options={settingCategory2}
				onChange={addCategory2}
			/>
			까지
		</div>
	);
};

const mapStateToProps = state => {
	return {
		// leagueFilterGameList: state.league.leagueFilterGameList,
		// leagueList: state.league.leagueList,
		// gameId: state.colleague.gameId,
		// leagueFilterType: state.league.leagueFilterType,
		// leagueFilterState: state.league.leagueFilterState,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		getLeagueBanList: info => dispatch(getLeagueBanList(info)),
		// 	leagueFilterGame: info => dispatch(leagueFilterGame(info)),
		// 	deleteLeagueInfo: () => dispatch(deleteLeagueInfo()),
		// 	searchLeague: (
		// 		count,
		// 		league_type,
		// 		game_id,
		// 		text,
		// 		join_pass,
		// 		date_tag,
		// 		ban,
		// 	) =>
		// 		dispatch(
		// 			searchLeague(
		// 				count,
		// 				league_type,
		// 				game_id,
		// 				text,
		// 				join_pass,
		// 				date_tag,
		// 				ban,
		// 			),
		// 		),
		// 	filterGameID: info => dispatch(filterGameID(info)),
		// 	getLeagueType: info => dispatch(getLeagueType(info)),
		// 	getLeagueState: info => dispatch(getLeagueState(info)),
	};
	getLeagueBanList: info => dispatch(getLeagueBanList(info));
};

export default connect(mapStateToProps, mapDispatchToProps)(TierSlider);
