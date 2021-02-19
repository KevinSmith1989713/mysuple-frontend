/**
 * Profile Service
 *
 * @since   2019-11-24
 * @author  sangheon Kim
 */

module.exports = {
	/**
	 * @description 내 프로필 조회
	 * @param {*} params
	 * @param {*} callback
	 */

	// select nickname, email, createdAt from  user where email="pjs8367@nate.com";
	selectMyProfile(params, callback) {
		let sql = "SELECT nickname, email, createdAt FROM user WHERE email = '";

		sql = sql + params.body.email + "'";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (!results || results.length < 1) {
				callback('No user to match email', params);
				return;
			}

			params['user'] = results[0];
			callback(null, params);
		});
	},

	// update user set nickname="수정 닉네임" where email="pjs8367@nate.com";

	/**
	 * @description 닉네임 수정
	 * @param {*} params
	 * @param {*} callback
	 */

	updateProfile(params, callback) {
		let sql = 'UPDATE user SET nickname="';

		sql = sql + params.body.newNickname + '"';
		sql = sql + ' WHERE email="';
		sql = sql + params.body.email + '"';

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results && results.length) params['user'] = results;

			callback(null, params);
		});
	},

	// delete from user where email="ksj8367@gmail.com"
	withdrawal(params, callback) {
		let sql = 'DELETE FROM user WHERE email="';

		sql = sql + params.body.email + '"';

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results && results.length) params['user'] = results;

			callback(null, params);
		});
	},
};
