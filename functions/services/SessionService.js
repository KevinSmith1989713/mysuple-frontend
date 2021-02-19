/**
 * Session Service
 *
 * @since   2019-10-20
 * @author  sangheon Kim
 */

const uuidv4 = require('uuid/v4');

module.exports = {
	create(params, callback) {
		params['sessionKey'] = uuidv4();
		callback(null, params);
	},

	read(params, callback) {
		let sql =
			'SELECT id, sessionKey, TIMESTAMPDIFF(minute, updatedAt, NOW()) AS diffMinutes' +
			' FROM AdminSession' +
			" WHERE id = '" +
			params.body.id +
			"'";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (!results || results.length < 1) {
				callback('No user.', params);
				return;
			}

			params['adminSession'] = results[0];
			callback(null, params);
		});
	},

	upsertSession(params, callback) {
		let sql =
			'INSERT INTO AdminSession' +
			' (id, sessionKey)' +
			' VALUES' +
			" ('" +
			params.body.id +
			"', '" +
			params.sessionKey +
			"')" +
			' ON DUPLICATE KEY UPDATE' +
			"  sessionKey = '" +
			params.sessionKey +
			"'";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			callback(null, params);
		});
	},
};
