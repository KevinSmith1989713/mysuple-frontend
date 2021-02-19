import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { setSearchKeyword,reqAllSearch } from '../store/GameInfo/GameInfo.store';
import Header from '../components/Header/Header';
import ContentBoard from '../components/ContentBoard/ContentBoard';
import SearchContainer from '../container/SearchContainer/SearchContainer';
import Loading from '../components/Loading/Loading';

const Search = ({reqAllSearch, setSearchKeyword, gameInfoList}) => {
	const [gameList, setGameList] = React.useState([]);
	const [keyword, setKeyword] = React.useState(decodeURIComponent(window.location.href.split("/")[4]));
	
	React.useEffect(() => {
		setSearchKeyword(window.location.href.split("/")[4])
		reqAllSearch(window.location.href.split("/")[4])
	}, [])

	React.useEffect(() => {
		setGameList(gameInfoList)
	}, [gameInfoList])

	const onChange = (e) => {
		setKeyword(e.target.value)
	}

	
	return (
		<div className="Search">
				<Helmet>
					<title>슈퍼플레이어 | 검색</title>
				</Helmet>
				<ContentBoard>
					{!!gameList && <SearchContainer gameList={gameList} onChange={onChange} keyword={keyword}/>}
				</ContentBoard>
			</div>
	)
}

export default connect(
	({gameInfo}) => ({
		gameInfoList: gameInfo.gameInfoList,
		searchText: gameInfo.searchText
	}),
	 {
		setSearchKeyword,
		reqAllSearch
	 }
)(Search);

 