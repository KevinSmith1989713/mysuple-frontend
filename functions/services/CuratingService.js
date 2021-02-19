/**
 * Curating Service
 *
 * @since   2019-11-01
 * @author  sangheon Kim
 */

module.exports = {
	/**
	 * @description curating INSERT SQL 생성
	 * @param {*} params
	 * @param {*} callback
	 */

	curatingInsert(params, callback) {
		let sql =
			'INSERT INTO curating ' + '(email, curating_title, curating_tag) ';

		params['sql'] = sql;
		callback(null, params);
	},

	/**
	 * @description VALUE 값 입력 (curating)
	 * @param {*} params
	 * @param {*} callback
	 */

	curatingReister(params, callback) {
		let sql = params.sql + "VALUES ('" + params.body.email;

		if (!!params.body.curating_title) {
			sql = sql + "','" + params.body.curating_title + "'";
		} else {
			sql = sql + "', NULL";
		}
		if (!!params.body.curating_tag) {
			sql = sql + ",'" + params.body.curating_tag + "')";
		} else {
			sql = sql + ', NULL)';
		}

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			params['curatingData'] = results;

			callback(null, params);
		});
	},

	/**
	 * @description curatingGame INSERT SQL 생성
	 * @param {*} params
	 * @param {*} callback
	 */

	curatingGameInsert(params, callback) {
		let sql =
			'INSERT INTO curating_games ' +
			'(curating_id, game_id, curating_content, tag) ';

		params['sql'] = sql;
		callback(null, params);
	},

	/**
	 * @description VALUE 값 입력 (curatingGame)
	 * @param {*} params
	 * @param {*} callback
	 */

	curatingGameReister(params, callback) {
		/*
		const date = new Date();
		const year = date.getFullYear();
		const month =
			date.getMonth() + 1 >= 10
				? `${date.getMonth() + 1}`
				: `0${date.getMonth() + 1}`;
		const day =
			date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;

		const parseDate = `${year}-${month}-${day}`;
		*/
		let sql =
			params.sql +
			'VALUES (' +
			params.body.curating_id +
			",'" +
			params.body.game_id;
		// + "','" + parseDate;

		if (!!params.body.curating_content) {
			sql = sql + "', '" + params.body.curating_content + "'";
		} else {
			sql = sql + "', NULL";
		}
		if (!!params.body.tag) {
			sql = sql + ", '" + params.body.tag + "')";
		} else {
			sql = sql + ', NULL)';
		}
		// sql = sql + " ON DUPLICATE KEY UPDATE" +
		// " curating_id = " + params.body.curating_id;

		// let sql = 'select * from user';

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			params['curatingGameData'] = results;

			callback(null, params);
		});
	},
};
