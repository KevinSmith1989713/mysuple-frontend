import React, { Component, useState, useEffect } from 'react';
import './PlatformTable.scss';
import { connect } from 'react-redux';

const PlatformTable = ({ info, price, currency, url, classNo }) => {
	const array2 = [];
	const [more, setMore] = useState(false);

	if (!!url) {
		const array = url.split(',');

		array.map(item => array2.push(item.split(' : ')));
	}

	const device = {
		'1': 'PC',
		'3': 'Console',
		'31': 'Playstation',
		'32': 'nintendo',
		'33': 'xbox',
	};

	return (
		<div className="PlatformTable">
			<table>
				<tbody>
					<tr className="PlatformTable__Header">
						<th className="row--platform"> 스토어 </th>
						<th className="row--lowprice"> 가격(달러/원) </th>
						<th className="row--percent"> 할인율(%) </th>
						<th className="row--price"> DRM </th>
					</tr>
					{!!url &&
						array2.map((item, index) => {
							return (
								<tr className="PlatformTable__Row" key={index}>
									<a
										href={
											classNo === '2' ? item[1].replace(/['"]+/g, '') : item
										}
										target="_blank"
									>
										<td className="row--platform">
											{classNo === '2'
												? item[0] === 'ios'
													? '앱스토어'
													: '플레이스토어'
												: device[classNo]}
										</td>
										<td className="row--price">
											{classNo === '2' ? item[0] : '바로가기'}
										</td>
										<td className="row--lowprice">-</td>
										<td className="row--percent">-</td>
									</a>
								</tr>
							);
						})}

					{!!info &&
						info.constructor === Array &&
						info.map((row, index) => {
							if (more) {
								return (
									<tr className="PlatformTable__Row" key={index}>
										<a href={row.url} target="_blank">
											<td className="row--platform">
												{!!row.shop.name ? row.shop.name : '-'}
											</td>
											<td className="row--price">
												{!!row.drm ? row.drm : '-'}
											</td>
											<td className="row--lowprice">
												{row.price_new}$ / 약{' '}
												{Math.round(
													(row.price_new * Math.floor(currency)) / 100,
												) * 100}
												₩
											</td>
											<td className="row--percent">{row.price_cut}%</td>
										</a>
									</tr>
								);
							} else {
								if (window.innerWidth < 769 ? index : index <= 2) {
									return (
										<tr className="PlatformTable__Row" key={index}>
											<a href={row.url} target="_blank">
												<td className="row--platform">{row.shop.name}</td>
												<td className="row--lowprice">
													{row.price_new}$ / 약{' '}
													{Math.round(
														(row.price_new * Math.floor(currency)) / 100,
													) * 100}
													₩
												</td>
												<td className="row--percent">{row.price_cut}%</td>
												<td className="row--price">{row.drm}</td>
											</a>
										</tr>
									);
								}
							}
						})}
				</tbody>
			</table>
			{window.innerWidth < 769 ? (
				''
			) : (
				<>
					<div className="price--explanation">
						실시간 환율 변동으로 인해 실제 가격과 약간의 오차가 발생 할 수
						있습니다.
					</div>
					<div className="more" onClick={() => setMore(!more)}>
						<div className="btn">{more ? '접기' : '더보기'}</div>
					</div>
				</>
			)}
		</div>
	);
};

// export default PlatformTable;

const mapStateToProps = state => {
	return {
		currency: state.gameInfo.currency,
	};
};

export default React.memo(connect(mapStateToProps, null)(PlatformTable));
