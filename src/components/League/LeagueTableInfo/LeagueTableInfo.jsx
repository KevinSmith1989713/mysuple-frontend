import React, { useState } from 'react';

import mic from '../../../static/images/League/mic.svg';
import micNotAllowed from '../../../static/images/League/micNotAllowed.svg';
import progamer from '../../../static/images/League/progamer.svg';
import progamerNotAllowed from '../../../static/images/League/progamerNotAllowed.svg';
import broadcast from '../../../static/images/League/broadcast.svg';
import broadcastNotAllowed from '../../../static/images/League/broadcastNotAllowed.svg';
import leagueCustermImg from '../../../static/images/League/leagueCustermImg.svg';

import './LeagueTableInfo.scss';

const LeagueTableInfo = ({ insertLeagueInfo }) => {
	const tierString =
		insertLeagueInfo.ban &&
		insertLeagueInfo.ban.tier &&
		insertLeagueInfo.ban.tier.split(',');

	const isTierFirstIndex = () => {
		return (
			(tierString && tierString[0] === 'iron' && '아이언') ||
			(tierString && tierString[0] === 'bronze' && '브론즈') ||
			(tierString && tierString[0] === 'silver' && '실버') ||
			(tierString && tierString[0] === 'gold' && '골드') ||
			(tierString && tierString[0] === 'platinum' && '플래티') ||
			(tierString && tierString[0] === 'diamond' && '다이아') ||
			(tierString && tierString[0] === 'master' && '마스터') ||
			(tierString && tierString[0] === 'grandmaster' && '그마')
		);
	};

	const isTierLastIndex = () => {
		return (
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'bronze' &&
				'브론즈') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'silver' &&
				'실버') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'gold' &&
				'골드') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'platinum' &&
				'플래티') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'diamond' &&
				'다이아') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'master' &&
				'마스터') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'grandmaster' &&
				'그마') ||
			(tierString &&
				tierString[insertLeagueInfo.ban.tier.split(',').length - 1] ===
					'challenger' &&
				'챌린저')
		);
	};

	// console.log(
	// 	realArray.forEach(element => {
	// 		console.log(element);
	// 	}),
	// );

	// const realArray = insertLeagueInfo.ban;
	// realArray.length = insertLeagueInfo.ban.length;
	const realArray = insertLeagueInfo.ban;

	return (
		<div className="LeagueTableInfo">
			<div className="LeagueTableInfo--Rule">
				<div className="bold--title">리그 제한</div>
				{insertLeagueInfo && insertLeagueInfo.ban !== null ? (
					<ul className="attend__info">
						{/* {insertLeagueInfo.ban && insertLeagueInfo.ban.age !== undefined && (
							<li className="info--box">
								<p className="info">
									<b>12</b>명
								</p>
								<div className="info__subTitle">인원제한</div>
							</li>
						)} */}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.score !== undefined && (
							<li className="info--box">
								<p className="info column">
									{insertLeagueInfo.ban.tier === undefined ? (
										'제한 없음'
									) : (
										<>
											<b className="blue">
												{(insertLeagueInfo.ban &&
													insertLeagueInfo.ban.score.gte) ||
													insertLeagueInfo.ban.score.lte}
											</b>
											점 {insertLeagueInfo.ban.score.gte ? '이상' : '이하'}
										</>
									)}
								</p>
								<div className="info__subTitle">점수</div>
							</li>
						)}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.mic !== undefined && (
							<li className="info--box">
								<div className="info">
									{insertLeagueInfo.ban && insertLeagueInfo.ban.mic === '1' ? (
										<>
											<img className="infoImg" src={mic} />
										</>
									) : (
										<>
											<img className="infoImg" src={micNotAllowed} />
										</>
									)}
								</div>
								<div className="info__subTitle">
									마이크/채팅{' '}
									{insertLeagueInfo.ban && insertLeagueInfo.ban.mic === '1'
										? '허용'
										: '비허용'}
								</div>
							</li>
						)}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.pro !== undefined && (
							<li className="info--box">
								<div className="info">
									{insertLeagueInfo.ban && insertLeagueInfo.ban.pro === '1' ? (
										<img className="infoImg progamer" src={progamer} />
									) : (
										<img
											className="infoImg progamer"
											src={progamerNotAllowed}
										/>
									)}
								</div>
								<div className="info__subTitle">
									프로게이머
									<br />{' '}
									{insertLeagueInfo.ban && insertLeagueInfo.ban.pro === '1'
										? '허용'
										: '금지'}
								</div>
							</li>
						)}
						{insertLeagueInfo.ban &&
							insertLeagueInfo.ban.broadcast !== undefined && (
								<li className="info--box">
									<div className="info">
										{insertLeagueInfo.ban &&
										insertLeagueInfo.ban.broadcast === '1' ? (
											<img className="infoImg" src={broadcast} />
										) : (
											<img className="infoImg" src={broadcastNotAllowed} />
										)}
									</div>
									<div className="info__subTitle">
										방송{' '}
										{insertLeagueInfo.ban &&
										insertLeagueInfo.ban.broadcast === '1'
											? '허용'
											: '비허용'}
									</div>
								</li>
							)}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.age !== undefined && (
							<li className="info--box">
								<div className="info">
									<b>
										{(insertLeagueInfo.ban && insertLeagueInfo.ban.age.gte) ||
											insertLeagueInfo.ban.age.lte}
									</b>
									세{' '}
									{(insertLeagueInfo.ban &&
										insertLeagueInfo.ban.age.gte &&
										'이상') ||
										(insertLeagueInfo.ban.age.lte && '이하')}
								</div>
								<div className="info__subTitle">나이</div>
							</li>
						)}
						{insertLeagueInfo.ban && insertLeagueInfo.ban.tier !== undefined && (
							<li className="info--box">
								<div className="info column">
									<div className="tier--box">
										<b className="blue">{isTierFirstIndex()}</b>
										이상
									</div>
									<div>
										<b>{isTierLastIndex()}</b>
										이하
									</div>
								</div>
								<div className="info__subTitle">티어</div>
							</li>
						)}
						{insertLeagueInfo.ban &&
							insertLeagueInfo.ban.manualKey !== null && (
								<li className="info--box">
									<div className="info column">
										<img className="infoImg" src={leagueCustermImg} />
										<div className="manualText">
											{insertLeagueInfo.ban && insertLeagueInfo.ban.manualKey}
										</div>
									</div>
									<div className="info__subTitle">
										{insertLeagueInfo.ban && insertLeagueInfo.ban.manualValue}
									</div>
								</li>
							)}
					</ul>
				) : (
					<div className="text--value">리그 규칙이 없습니다.</div>
				)}
			</div>
			<div className="LeagueTableInfo--Limit">
				<div className="bold--title">리그 소개</div>
				{(insertLeagueInfo && insertLeagueInfo.desc === 'null') ||
				(insertLeagueInfo && insertLeagueInfo.desc === null) ||
				(insertLeagueInfo && insertLeagueInfo.desc === undefined) ? (
					<div className="text--value">리그 소개가 없습니다.</div>
				) : (
					<div
						className="desc"
						dangerouslySetInnerHTML={{
							__html: insertLeagueInfo && insertLeagueInfo.desc,
						}}
					/>
				)}
			</div>
		</div>
	);
};
export default LeagueTableInfo;
