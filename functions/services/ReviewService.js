/**
 * Review Service
 *
 * @since   2019-10-29
 * @author  sangheon Kim
 * 
 * @modified 2020-03-26
 * @author  gh lee
 * @description evaluation_date 삭제
 */

module.exports = {
	/**
	 * @description Review INSERT SQL 생성
	 * @param {*} params
	 * @param {*} callback
	 */

	reviewInsert(params, callback) {
		// console.log(params);
		let sql = 'INSERT INTO review_info' + '(game_id, email';

		if (params.body.total_score) sql = sql + ', total_score';
		if (params.body.fun_score) sql = sql + ', fun_score';
		if (params.body.difficulty_score) sql = sql + ', difficulty_score';
		if (params.body.complete_score) sql = sql + ', complete_score';
		if (params.body.operation_score) sql = sql + ', operation_score';
		if (params.body.evaluation_content) sql = sql + ', evaluation_content';
	
		sql = sql + ')';

		params['sql'] = sql;
		callback(null, params);
	},

	/**
	 * @description VALUE 값 입력 (Review)
	 * @param {*} params
	 * @param {*} callback
	 */

	reviewReister(params, callback) {
		// console.log('reviewReister');
		let sql =
			params.sql +
			"VALUES ('" +
			params.body.game_id +
			"','" +
			params.body.email;

		if (params.body.total_score) sql = sql + "','" + params.body.total_score;
		if (params.body.fun_score) sql = sql + "','" + params.body.fun_score;
		if (params.body.difficulty_score)
			sql = sql + "','" + params.body.difficulty_score;
		if (params.body.complete_score)
			sql = sql + "','" + params.body.complete_score;
		if (params.body.operation_score)
			sql = sql + "','" + params.body.operation_score;
		if (params.body.evaluation_content) {
			sql = sql + "','" + params.body.evaluation_content + "')";
		} else{
		sql = sql + "', NULL)";
		}

		params.dbPool.query(sql, (err, results) => {
			// console.log(sql);
			if (err) {
				callback(err, params);
				return;
			}

			// if (results) console.log('upserted count=' + results.affectedRows);
			if (results && results.length)
				// console.log('results.length=' + results.length);

			// console.log("results=" + JSON.stringify(results));
			params['reviewData'] = results;

			callback(null, params);
		});
	},

	selectReview(params, callback) {
		let sql =
			"SELECT * FROM review_info WHERE email='" + params.body.email + "'";

		params.dbPool.query(sql, (err, results) => {
			// console.log(sql);
			if (err) {
				callback(err, params);
				return;
			}

			if (results.length < 1) {
				params['reviewList'] = [];
				// callback('No Like Game', null);
			} else {
				params['reviewList'] = results;
			}

			callback(null, params);
		});
	},
};
