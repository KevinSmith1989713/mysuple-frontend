import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';

import TierSlider from '../../../components/League/TierSlider/TierSlider';
import { LeagueFilterTableData } from '../../../assets/dummyData/FilterTableData';

import pc from '../../../static/images/Colleague/pc.svg';
import mobile from '../../../static/images/Colleague/mobile.svg';
import pc_gray from '../../../static/images/Colleague/pc_gray.svg';
import mobile_gray from '../../../static/images/Colleague/mobile_gray.svg';
import consol from '../../../static/images/Colleague/consol.svg';
import Search from '../../../static/images/Chatting/search_sky.svg';
import tool from '../../../static/images/League/tool.svg';

import './LeagueFilterTable.scss';

const LeagueFilterTable = ({
	leagueFilterGameList,
	leagueFilterGame,
	renderFilter,
	searchLeague,
	text,
	gameId,
	filterGameID,
	getLeagueType,
	getLeagueState,
	leagueFilterType,
	leagueFilterState,
	getTierInfo,
	bringFilterData,
	getLeagueBanList,
	leagueFilterBanList,
	filterState,
	setFilterState,
	onChange,
	setCount,
	count,
}) => {
	const [flag, setFlag] = useState(false);
	const [tier, setTier] = useState([]);

	const getTierList = (e, getSelectTier) => {
		e.length < 9 ? getTierInfo(e) : getTierInfo(getSelectTier);

		const tier1 = e.map(key => {
			return key.value;
		});
		tier.push(tier1);
	};

	const onClickTag = (e, tag) => {
		bringFilterData(tag);

		if (leagueFilterGameList.indexOf(tag.name) != -1) {
			const newArr = leagueFilterGameList;
			const itemToFind = newArr.find(function(item) {
				return item === tag.name;
			});
			const idx = newArr.indexOf(itemToFind);

			if (idx > -1) {
				newArr.splice(idx, 1);
			} else {
				newArr = [];
			}
		} else {
			const newArr = leagueFilterGameList;
			newArr.push(tag.name);
			leagueFilterGame(newArr);
		}

		const typeSingle = leagueFilterGameList.indexOf('개인전');
		if (typeSingle > -1 && tag.type === '1') {
			leagueFilterGameList.splice(typeSingle, 1);
		}
		const typeTeam = leagueFilterGameList.indexOf('팀전');
		if (typeTeam > -1 && tag.type === '0') {
			leagueFilterGameList.splice(typeTeam, 1);
		}
		const stateApply = leagueFilterGameList.indexOf('모집중');
		if (stateApply > -1 && tag.state === 'running') {
			leagueFilterGameList.splice(stateApply, 1);
		} else if (stateApply > -1 && tag.state === 'expected') {
			leagueFilterGameList.splice(stateApply, 1);
		} else if (stateApply > -1 && tag.state === 'finished') {
			leagueFilterGameList.splice(stateApply, 1);
		}
		const stateRunning = leagueFilterGameList.indexOf('진행중');
		if (stateRunning > -1 && tag.state === 'apply') {
			leagueFilterGameList.splice(stateRunning, 1);
		} else if (stateRunning > -1 && tag.state === 'expected') {
			leagueFilterGameList.splice(stateRunning, 1);
		} else if (stateRunning > -1 && tag.state === 'finished') {
			leagueFilterGameList.splice(stateRunning, 1);
		}
		const stateExpected = leagueFilterGameList.indexOf('모집 예정');
		if (stateExpected > -1 && tag.state === 'apply') {
			leagueFilterGameList.splice(stateExpected, 1);
		} else if (stateExpected > -1 && tag.state === 'running') {
			leagueFilterGameList.splice(stateExpected, 1);
		} else if (stateExpected > -1 && tag.state === 'finished') {
			leagueFilterGameList.splice(stateExpected, 1);
		}
		const stateFinished = leagueFilterGameList.indexOf('종료');
		if (stateFinished > -1 && tag.state === 'apply') {
			leagueFilterGameList.splice(stateFinished, 1);
		} else if (stateFinished > -1 && tag.state === 'running') {
			leagueFilterGameList.splice(stateFinished, 1);
		} else if (stateFinished > -1 && tag.state === 'expected') {
			leagueFilterGameList.splice(stateFinished, 1);
		}
		const ageAdlut = leagueFilterGameList.indexOf('성인');
		if (ageAdlut > -1 && tag.tag === 'minor') {
			leagueFilterGameList.splice(ageAdlut, 1);
		}
		const ageMinor = leagueFilterGameList.indexOf('미성년자');
		if (ageMinor > -1 && tag.tag === 'adult') {
			leagueFilterGameList.splice(ageMinor, 1);
		}

		if (leagueFilterType.indexOf('0') > -1 && tag.type === '0') {
			getLeagueType([]);
		} else if (leagueFilterType.indexOf('1') > -1 && tag.type === '1') {
			getLeagueType([]);
		} else if (tag.type === '0' && leagueFilterType.indexOf('0') === -1) {
			getLeagueType([tag.type]);
		} else if (tag.type === '1' && leagueFilterType.indexOf('1') === -1) {
			getLeagueType([tag.type]);
		}

		if (leagueFilterState.indexOf('apply') > -1 && tag.state === 'apply') {
			getLeagueState([]);
		} else if (
			leagueFilterState.indexOf('running') > -1 &&
			tag.state === 'running'
		) {
			getLeagueState([]);
		} else if (
			leagueFilterState.indexOf('expected') > -1 &&
			tag.state === 'expected'
		) {
			getLeagueState([]);
		} else if (
			leagueFilterState.indexOf('finished') > -1 &&
			tag.state === 'finished'
		) {
			getLeagueState([]);
		} else if (
			tag.state === 'apply' &&
			leagueFilterState.indexOf('apply') === -1
		) {
			getLeagueState([tag.state]);
		} else if (
			tag.state === 'running' &&
			leagueFilterState.indexOf('running') === -1
		) {
			getLeagueState([tag.state]);
		} else if (
			tag.state === 'expected' &&
			leagueFilterState.indexOf('expected') === -1
		) {
			getLeagueState([tag.state]);
		} else if (
			tag.state === 'finished' &&
			leagueFilterState.indexOf('finished') === -1
		) {
			getLeagueState([tag.state]);
		}

		if (gameId.indexOf(tag.game_id) != -1) {
			const newArr = gameId;
			const itemToFind = newArr.find(function(item) {
				return item === tag.game_id;
			});
			const idx = newArr.indexOf(itemToFind);
			if (idx > -1) newArr.splice(idx, 1);
		} else {
			const newArr = gameId;
			if (tag.game_id === undefined) {
				newArr.push();
			} else {
				newArr.push(tag.game_id);
			}
			filterGameID(newArr);
		}

		if (tag.tag === 'broadcast' && leagueFilterBanList.broadcast !== true) {
			getLeagueBanList({ broadcast: true });
		} else if (tag.tag === 'pro' && leagueFilterBanList.broadcast !== true) {
			getLeagueBanList({ pro: true });
		} else if (
			leagueFilterBanList.age &&
			leagueFilterBanList.age[0] === 'adult' &&
			tag.tag === 'adult'
		) {
			delete leagueFilterBanList.age;
		} else if (tag.tag === 'adult') {
			getLeagueBanList({ age: ['adult'] });
		} else if (
			leagueFilterBanList.age &&
			leagueFilterBanList.age[0] === 'minor'
		) {
			delete leagueFilterBanList.age;
		} else if (tag.tag === 'minor') {
			getLeagueBanList({ age: ['minor'] });
		} else if (leagueFilterBanList.broadcast === true) {
			delete leagueFilterBanList.broadcast;
		}

		setFlag(!flag);
		renderFilter(!flag);
	};

	useEffect(() => {
		searchLeague(
			1,
			leagueFilterType,
			gameId,
			text,
			null,
			leagueFilterState,
			leagueFilterBanList,
		);
	}, [flag, leagueFilterBanList]);

	const submit = () => {
		searchLeague(
			count,
			leagueFilterType,
			gameId,
			text,
			null,
			leagueFilterState,
			leagueFilterBanList,
		);
		setCount(1);
		setFilterState(false);
	};
	

	return (
		<>
			<div className="LeagueFilterTable">
				<div className="header">
					<button className="back" onClick={() => setFilterState(!filterState)}>
						{'<'}
					</button>
					<div className="header__title">{'리그 검색'}</div>
					<div />
				</div>
				<div className="input__box">
					<input
						className="search"
						placeholder="검색어를 입력하세요"
						onChange={onChange}
						value={text}
						onKeyPress={e => {
							if (e.charCode === 13) {
								submit();
							}
						}}
					/>
					<div className="img--box">
						<img
							className="img"
							src={tool}
							onClick={() => setFilterState(!filterState)}
							type="button"
						/>
						<img className="img" src={Search} onClick={submit} type="button" />
					</div>
				</div>
				<table className="FilterTable--table">
					<tbody>
						{LeagueFilterTableData.map((th, index) => {
							return (
								<Fragment key={index}>
									<tr className={`tr-` + th.header.key}>
										<th id={th.header.key}>{th.header.name}</th>
										<td>
											{th.data.map((tag, index) => {
												return (
													<>
														<span
															className={
																leagueFilterGameList.indexOf(tag.name) !== -1
																	? 'span-selected-tag'
																	: `span-tag ${th.header.key}`
															}
															id={tag.name}
															key={index}
															onClick={e => {
																onClickTag(e, tag);
															}}
														>
															{tag.id >= 1 ? (
																<img
																	src={
																		window.innerWidth < 769
																			? tag.id === 0
																				? pc_gray
																				: '' || tag.id === 1
																				? pc_gray
																				: '' || tag.id === 2
																				? mobile_gray
																				: consol
																			: tag.id === 0
																			? pc
																			: '' || tag.id === 1
																			? pc
																			: '' || tag.id === 2
																			? mobile
																			: consol
																	}
																/>
															) : (
																''
															)}
															{tag.name}
														</span>
														<div className="tier">
															{tag.tier === 'tier' && (
																<TierSlider
																	getTierList={getTierList}
																	// getLeagueBanList={getLeagueBanList}
																/>
															)}
														</div>
													</>
												);
											})}
										</td>
									</tr>
								</Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default LeagueFilterTable;
