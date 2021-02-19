const paging = require('../utils/paging');

/**
 * Review Service
 *
 * @since   2019-11-06
 * @author  sangheon Kim
 */

module.exports = {
	selectGameDetail(params, callback) {
		let sql = 'SELECT * from game_info where game_id ="' + params.body.id + '"';

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			params['gameDetail'] = results[0];

			callback(null, params);
		});
	},
};
