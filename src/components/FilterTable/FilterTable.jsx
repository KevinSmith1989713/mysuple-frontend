import React, { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames';

import { FilterTableData } from '../../assets/dummyData/FilterTableData';

import pc from '../../static/images/Colleague/pc.svg';
import mobile from '../../static/images/Colleague/mobile.svg';
import consol from '../../static/images/Colleague/consol.svg';

import './FilterTable.scss';

const FilterTable = ({
	filterGame,
	filteredList,
	bringData,
	gameId,
	filterGameID,
	selectGameName,
	isSelctGameName,
	searchCrewList,
	searchFastCrewList,
}) => {
	const [expandList, setExpandList] = useState([]);
	const [flag, setFlag] = useState(false);

	const onClickTag = (e, tag) => {
		if (filteredList.indexOf(tag.name) != -1) {
			const newArr = filteredList;
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
			const newArr = filteredList;
			newArr.push(tag.name);
			filterGame(newArr);
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

		if (selectGameName.indexOf(tag.tag) != -1) {
			const newArr = selectGameName;
			const itemToFind = newArr.find(function(item) {
				return item === tag.tag;
			});
			const idx = newArr.indexOf(itemToFind);
			if (idx > -1) newArr.splice(idx, 1);
		} else {
			const newArr = selectGameName;
			if (tag.tag === undefined) {
				newArr.push();
			} else {
				newArr.push(tag.tag);
			}
			isSelctGameName(newArr);
		}
		setFlag(!flag);

		bringData([...filteredList], [...gameId], [...selectGameName]);

		searchCrewList(null, gameId, 1, selectGameName);
		searchFastCrewList(null, gameId, 1, selectGameName);
	};

	useEffect(() => {}, [flag]);
	return (
		<>
			<div className="FilterTable">
				<table className="FilterTable--table">
					<tbody>
						{FilterTableData.map((th, index) => {
							return (
								<Fragment key={index}>
									<tr className={`tr-` + th.header.key}>
										<th
											className={classNames(
												th.data.length > 7 && 'th-cursor',
												expandList.includes(th.header.key) && 'th-expand',
											)}
											id={th.header.key}
										>
											{th.header.name}
										</th>
										<td
											className={classNames(
												`td-` + th.header.key,
												'td-cursor',
												expandList.includes(th.header.key) && 'td-expand',
											)}
										>
											{th.data.map((tag, index) => {
												return (
													<span
														className={
															filteredList.indexOf(tag.name) != -1
																? 'span-selected-tag'
																: 'span-tag'
														}
														id={tag.name}
														gaemeId={tag.game_id}
														key={index}
														onClick={e => {
															onClickTag(e, tag);
														}}
													>
														{tag.id >= 1 ? (
															<img
																src={
																	tag.id === 0
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
												);
											})}
										</td>
									</tr>
									{th.data.length >= 7 && expandList.includes(th.header.key) && (
										<tr>
											<th className="th-below" />
											<td className="td-below">
												{FilterTableData.map((th, thIndex) => {
													thIndex != 2 &&
														th.data.map((tag, tagIndex) => {
															if (tagIndex > 7) {
																return (
																	<span
																		className={
																			filteredList.includes(tag.key)
																				? 'span-selected-tag'
																				: 'span-tag'
																		}
																		id={tag.key}
																		key={tagIndex}
																	>
																		{tag.name}
																	</span>
																);
															}
														});
												})}
											</td>
										</tr>
									)}
								</Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default FilterTable;


