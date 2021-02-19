/**
 * Common Class: Making Responses
 *
 * @since   2019-03-23
 * @author  ywkim
 */

const utils = require('../utils/utils');

let index = 0;
module.exports = {
	makeHttpResponse(res, statusCode, result) {
		res.status(statusCode).json(result);
	},

	makeResponse(res, statusCode, status, msg, info) {
		let result = {
			Status: status,
			Msg: msg,
		};

		let isInfo = Boolean(info);
		if (isInfo) result['Info'] = info;

		return module.exports.makeHttpResponse(res, statusCode, result);
	},

	makeSuccessResponse(res, info) {
		return module.exports.makeResponse(res, 200, 'OK', 'success', info);
	},

	makeSimpleSuccessResponse(res) {
		return module.exports.makeSuccessResponse(res, null);
	},

	makeErrorResponse(res, statusCode, msg) {
		return module.exports.makeResponse(res, statusCode, 'ERROR', msg, null);
	},

	makeResponseByResult(res, err, info) {
		if (err) {
			if (err === 'err_unknown_error') {
				console.error(err);
				return module.exports.makeErrorResponse(res, 500, 'err_unknown_error');
			}
			console.error(err);

			return module.exports.makeErrorResponse(res, 200, err);
		}
		return module.exports.makeSuccessResponse(res, info);
	},
	insertUserGameTaste(params, callback) {
		let sql =
			'INSERT INTO taste_info (game_id, email, taste_funny, taste_wanna, taste_like, taste_date) values ("';

		sql = sql + params.body.game_taste[params.index].game_id + '"';
		sql = sql + ', "' + params.body.email + '"';
		sql = sql + ', "' + params.body.game_taste[params.index].taste_funny + '"';
		sql = sql + ', "' + params.body.game_taste[params.index].taste_wanna + '"';
		sql = sql + ', "1"';
		sql = sql + ', "' + utils.parseDateNow() + '")';

		params.dbPool.query(sql, params, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results) index += 1;

			if (index === params.body.game_taste.length) {
				index = 0;
				callback(null, params);
				return;
			}
		});
	},

	insertUserGameLike(params, callback) {
		let sql =
			"INSERT INTO taste_info (game_id, email, taste_funny, taste_wanna, taste_like, taste_date) values ('";

		sql = sql + params.body.game_like[params.index].game_id;
	},
};
