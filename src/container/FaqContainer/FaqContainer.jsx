import React, { useEffect, useState } from 'react';
import './FaqContainer.scss';
import Title from '../../components/Title/Title';
import { logPageView } from '../../Utils/analytics';
import { Link } from 'react-router-dom';
import { ReactComponent as YellowLowerArrow } from '../../static/images/Community/YellowLowerArrow.svg';

const categoryList = [
	{
		name: '전체',
	},
	{
		name: '리그',
	},
	{
		name: '커뮤니티',
	},
	{
		name: '게임정보',
	},
	{
		name: '동료찾기',
	},
	{
		name: '계정',
	},
	{
		name: '기타',
	},
];
const FaqContainer = ({ list }) => {
	const [selected, setSelected] = useState(null);
	const [categorySelect, setCategorySelect] = useState('전체');
	useEffect(() => {
		logPageView('플랫폼 페이지');
	}, []);

	const onClickRow = index => {
		if (selected === index) {
			setSelected(null);
		} else {
			setSelected(index);
		}
	};
	return (
		<div className="FaqContainer">
			<div className="FaqContainer--Title">
				<Title border="thick">FAQ</Title>
			</div>
			<div className="category--box">
				<div className="inner">
					{categoryList.map((item, idx) => {
						return (
							<button
								className={
									categorySelect === item.name
										? 'category selected'
										: 'category'
								}
								key={idx}
								onClick={() => setCategorySelect(item.name)}
							>
								{item.name}
							</button>
						);
					})}
				</div>
			</div>
			<div className="FaqContainer--List">
				{!!list &&
					(list.length != 0
						? list.map((faq, index) => {
								return (
									<div className="FaqContainer--Row" key={index}>
										<div className="header" onClick={() => onClickRow(index)}>
											<div className="q">Q. </div>
											<div className="title">{faq.title}</div>
											<div className="arrow">
												<YellowLowerArrow />
											</div>
										</div>
										{index === selected && (
											<div className="content">
												<div className="content--title">
													<span>A. </span> {faq.title}
												</div>
												<div
													className="content--text"
													dangerouslySetInnerHTML={{ __html: faq.content }}
												/>
											</div>
										)}
									</div>
								);
						  })
						: '등록된 FAQ가 없습니다')}
			</div>
			<div className="FaqContainer--Pagination"></div>
		</div>
	);
};

// const mapStateToProps = state => {
// 	return {
// 		isLoading: state.layout.isLoading,
// 		noticeList: state.administer.noticeList,
// 	};
// };

// // const mapDispatchToProps = dispatch => {
// // 	return {
// // 		changeMenu: menu => dispatch(changeMenu(menu)),
// // 	};
// // };

// export default connect(mapStateToProps, null)(FaqContainer);
export default FaqContainer;
