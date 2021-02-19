import React from 'react';
import './SearchContainer.scss';
import { connect } from 'react-redux';

import { changeMenu } from '../../store/Layout/Layout.store';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Card from '../../components/Card/Card';
import { reqAllSearch } from '../../store/GameInfo/GameInfo.store';
import { Link } from 'react-router-dom';
import { logPageView } from "../../Utils/analytics";


const SearchContainer = ({gameList, reqAllSearch, onChange, keyword}) => {
	const [list, setList] = React.useState([])	

	React.useEffect(() => {
		logPageView("플랫폼 페이지");

		return () => {
			setList([])
		}
	}, []);

	React.useEffect(() => {
		setList(gameList)
	}, [gameList])

	

	return (
		<div className="SearchContainer">
				<div className="SearchContainer--Title">
					<Title size="large" border="thick">
						검색
					</Title>
				</div>
				<div className="SearchContainer--SearchBar">
					<Input
						view="search"
						placeholder="검색어를 입력하세요"
						name="text"
						value={keyword}
						onChange={e => onChange(e)}
						onClick={() => reqAllSearch(keyword)}
					/>
				</div>
				<div className="SearchContainer--GameInfo">
					<div className="result--Title">
						<Title size="small" border="thin">
							게임정보
						</Title>
					</div>
					{list.length > 0 ? (
						<div className="result--list__game">
							{
								list.slice(0, 4).map((game, index) => {
									
									return (
										<Link
											className="SearchContainer--Link"
											to={`/info/${game.game_id}`}
											key={index}
										>
											<Card className="SearchContainer--Card" info={game} />
										</Link>
									);
								})
							}
						</div>
					) : (
						'검색 결과가 없습니다'
					)}
					<div className="result--more">
						{!!list && list.length > 4 && (
							<Link to ={'/info'}>
								게임 더 보기
							</Link>
						)}
					</div>
				</div>
				<div className="SearchContainer--Recommend">
					<div className="result--Title">
						<Title size="small" border="thin">
							리그
						</Title>
					</div>
					{/* <div className="result--list recommend">
						{!!example.result.recommend.length
							? example.result.recommend.map((recommend, index) => {
									return <CuratingCard className="SearchContainer--Curating" />;
							  })
							: '검색된 결과가 없습니다'}
					</div>
					<div className="result--more">
						{example.result.recommend.length > 4 && '추천 더 보기'}
					</div>*/}
					준비중인 페이지입니다.
				</div>
				<div className="SearchContainer--Community">
					<div className="result--Title">
						<Title size="small" border="thin">
							동료찾기
						</Title>
					</div>
					{/* <div className="result--list">
						<Community
							keyword="마라"
							info={{
								title: '마라 맛집좀',
								date: '2019.10.23',
								desc:
									'파주 근처로.. 나는 마라마라못찾겠던데 누구 찾은 사람 있어?? ',
							}}
						/>
						<Community
							keyword="마라"
							info={{
								title: '마라 맛집좀',
								date: '2019.10.23',
								desc:
									'파주 근처로.. 나는 마라마라못찾겠던데 누구 찾은 사람 있어?? ',
							}}
						/>
						<Community
							keyword="마라"
							info={{
								title: '마라 맛집좀',
								date: '2019.10.23',
								desc:
									'파주 근처로.. 나는 마라마라못찾겠던데 누구 찾은 사람 있어?? ',
							}}
						/>
					</div>

					<div className="result--more">
						{example.result.community.length > 3 && '커뮤니티 더 보기'}
						</div> */}
					준비중인 페이지입니다.
				</div>
			</div>
	)
}

export default connect(
	({gameInfo}) => ({
		searchText: gameInfo.searchText
	}),
	{
		changeMenu,
		reqAllSearch
	}
)(SearchContainer);