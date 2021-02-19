const async = require('async');
const response = require('../utils/Response');
/**
 * Taste Service
 *
 * @since   2019-11-01
 * @author  sangheon Kim
 */

module.exports = {
	/**
	 * @description 가입떄 취향 보여지기
	 * @param {*} params
	 * @param {*} callback
	 */
	showJoinTaste(params, callback) {
		let sql =
			'SELECT game_id, game_release_date, game_title, img_src FROM game_info WHERE img_src IS NOT NULL ORDER BY rand() LIMIT 64';

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results && results.length) params['tasteList'] = results;

			callback(null, params);
		});
	},

	/**
	 * @description taste INSERT SQL 생성
	 * @param {*} params
	 * @param {*} callback
	 */

	tasteInsert(params, callback) {
		let sql = 'INSERT INTO taste_info' + '(game_id, email';

		if (params.body.taste_funny) sql = sql + ', taste_funny';
		if (params.body.taste_wanna) sql = sql + ', taste_wanna';
		if (params.body.taste_like) sql = sql + ', taste_like';
		if (params.body.price_alarm) sql = sql + ', price_alarm';
		sql = sql + ', taste_date';
		sql = sql + ')';

		params['sql'] = sql;
		callback(null, params);
	},

	/**
	 * @description VALUE 값 입력 (taste)
	 * @param {*} params
	 * @param {*} callback
	 */

	// insert into taste_info (game_id, email, taste_funny, taste_wanna, taste_like, taste_date)
	//  value ("3", "pjs8367@nate.com", "1", "0", "1", "2019-10-23");
	tasteReister(params, callback) {
		const date = new Date();
		const year = date.getFullYear();
		const month =
			date.getMonth() + 1 >= 10
				? `${date.getMonth() + 1}`
				: `0${date.getMonth() + 1}`;
		const day =
			date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;

		const parseDate = `${year}-${month}-${day}`;

		let sql =
			params.sql +
			"VALUES ('" +
			params.body.game_id +
			"','" +
			params.body.email;

		if (params.body.taste_funny) sql = sql + "','" + params.body.taste_funny;
		if (params.body.taste_wanna) sql = sql + "','" + params.body.taste_wanna;
		if (params.body.taste_like) sql = sql + "','" + params.body.taste_like;
		if (params.body.price_alarm) sql = sql + "','" + params.body.price_alarm;
		sql = sql + "','" + parseDate;
		sql =
			sql +
			"')" +
			' ON DUPLICATE KEY UPDATE' +
			" email  = '" +
			params.body.email +
			"'";

		// let sql = 'select * from user';

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results && results.length) params['tasteData'] = results;

			callback(null, params);
		});
	},

	// update user set game_with="1", game_media="3", game_like_count="5" where email="pjs8367@nate.com";
	updateUserTaste(params, callback) {
		let sql = 'UPDATE user SET game_with="';
		sql = sql + params.body.game_with + '"';
		sql = sql + ', game_media="';
		sql = sql + params.body.game_media + '"';
		sql = sql + ', game_like_count="';
		sql = sql + params.body.like_count + '"';
		sql = sql + ' WHERE email="';
		sql = sql + params.body.email + '"';

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results && results.length) params['sql'] = results;

			callback(null, params);
		});
	},

	circleArray(params, callback) {
		let makeResponse = (err, params) => {
			if (err) {
				console.error(err);
				return;
			}

			callback(null, params);
		};
		let length = params.body.game_taste.length;
		async.waterfall(
			[
				function() {
					for (let i = 0; i < length; i++) {
						params['index'] = i;
						response.insertUserGameTaste(params, callback);
						if (i === length - 1) {
						}
					}
				},
			],
			makeResponse,
		);
	},

	/**
	 * @description 가입시에 보상리스트 생성
	 * @param {*} params
	 * @param {*} callback
	 */
	insertCompensation(params, callback) {
		let sql =
			"insert into compensation_system (email, attendance) values ('" +
			params.body.email +
			"', 0)";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			callback(null, params);
		});
	},

	/**
	 * @description 로그인시에 마지막 로그인 날짜와 비교해서 출석체크
	 * @param {*} params
	 * @param {*} callback
	 */
	updateAttendance(params, callback) {
		const date = new Date();
		const year = date.getFullYear();
		const month =
			date.getMonth() + 1 >= 10
				? `${date.getMonth() + 1}`
				: `0${date.getMonth() + 1}`;
		const day =
			date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;

		const parseDate = `${year}-${month}-${day}`;

		let sql =
			"UPDATE compensation_system SET attendance = attendance + 1 WHERE email='" +
			params.body.email +
			"'";

		if (params.user.last_login !== parseDate) {
			params.dbPool.query(sql, (err, results) => {
				if (err) {
					callback(err, params);
					return;
				}

				callback(null, params);
			});
		} else {
			callback(null, params);
			return;
		}
	},

	selectUser(params, callback) {
		let sql =
			"SELECT * FROM compensation_system WHERE email='" +
			params.user.email +
			"'";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			params['compensation'] = results[0];

			callback(null, params);
		});
	},

	myGameTaste(params, callback) {
		let sql =
			"SELECT * FROM taste_info WHERE email='" + params.body.email + "'";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results.length < 1) {
				params['tasteId'] = [];
				// callback('No Like Game', null);
			} else {
				params['tasteId'] = results;
			}

			callback(null, params);
		});
	},

	// select game_id, game_title from game_info
	//  where game_id="p108" OR game_id="p151";

	selectMyGameInfo(params, callback) {
		let sql = '';
		if (params.tasteId.length > 0) {
			sql =
				sql +
				'SELECT game_title, img_src FROM game_info WHERE game_id="' +
				params.tasteId[0].game_id +
				'"';

			if (params.tasteId.length > 1) {
				params.tasteId.slice(1, params.tasteId.length).map(item => {
					sql = sql + " OR game_id='" + item.game_id + "'";
				});
			}
		} else {
			sql = sql + 'SELECT game_title, img_src FROM game_info';
		}

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results.length < 1) {
				callback('No Like Game', null);
				return;
			}

			params['myGameList'] = results;

			callback(null, params);
		});
	},
};
