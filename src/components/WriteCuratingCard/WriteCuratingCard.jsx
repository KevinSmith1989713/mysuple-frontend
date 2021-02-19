import React, { useState, useEffect } from 'react';
import './WriteCuratingCard.scss';
import WhiteSearch from '../../static/images/Card/WhiteSearch.png';

import { connect } from 'react-redux';
import { reqSearchGame } from '../../store/Curating/Curating.store';

import tag from '../../static/images/Card/tag@3x.png';
import Input from '../Input/Input';
import useDebounce from '../../hooks/useDebounce';

const WriteCuratingCard = ({
	onChangeCurating,
	reqSearchGame,
	searchResult,
}) => {
	const [gameId, setId] = useState(null);
	const [results, setResult] = useState([]);
	const [searchText, setSearchText] = useState('');
	const [nameList, setNameList] = useState([]);

	const debouncedSearch = useDebounce(searchText, 500);

	const [content, setContent] = useState('');
	const [tagString, setTag] = useState('');

	useEffect(() => {
		onChangeCurating({ game_id: gameId, text: content, tag: tagString });
	}, [gameId, content, tagString, searchText]);

	useEffect(() => {
		if (debouncedSearch) {
			reqSearchGame(searchText);
		}
	}, [debouncedSearch]);

	React.useEffect(() => {
		if (results.length > 0) {
			setNameList(
				results.map(item => {
					return {
						id: item[`_id`],
						title: item[`_source`].game_title,
						_score: Math.round(item[`_score`], 1),
						tag: item[`_source`].game_tag_kr,
						image: item[`_source`].img_src,
					};
				}),
			);
		} else {
			setNameList([]);
		}
	}, [results]);

	useEffect(() => {
		setResult(searchResult);
	}, [searchResult]);

	useEffect(() => {}, [gameId]);

	return (
		<div className="WriteCuratingCard">
			{gameId ? (
				<div className="WriteCuratingCard--SearchGame">
					<img src={gameId.image} alt="game-image" />
				</div>
			) : (
				<div className="WriteCuratingCard--SearchGame">
					<img />
					<div className="SearchGame--Bar">
						<img src={WhiteSearch} alt="search" />
						<Input
							placeholder="게임 검색"
							onChange={e => {
								setSearchText(e.target.value);
								setResult([]);
							}}
						/>
					</div>
					{!!results.length && (
						<div className="SearchGame--Result">
							{nameList.length > 0 &&
								nameList.map(item => (
									<li key={item.id} onClick={() => setId(item)}>
										{item.title}
									</li>
								))}
						</div>
					)}
				</div>
			)}
			<div className="WriteCuratingCard--ExplainGame">
				<textarea
					className="ExplainGame--textarea"
					placeholder="게임 설명을 써주세요"
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
				<div className="ExplainGame--tag">
					<img src={tag} alt="tag" />
					<Input
						size="small"
						className="input--tag"
						placeholder="태그는 스페이스바로 구분합니다."
						value={tagString}
						onChange={e => setTag(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		searchResult: state.curating.searchResult,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		reqSearchGame: text => dispatch(reqSearchGame(text)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteCuratingCard);
