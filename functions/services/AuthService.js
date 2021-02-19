/**
 * Auth Service
 *
 * @since   2019-10-20
 * @author  sangheon Kim
 */
const crypto = require('crypto');
const uuidv4 = require('uuid/v4');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	/**
	 *
	 * @description 로그인 세션키 생성함수
	 * @param {*} params
	 * @param {*} callback
	 */
	create(params, callback) {
		params['sessionKey'] = uuidv4();
		callback(null, params);
	},

	/**
	 * @description 파라미터로 들어온 이메일 유저 정보 읽어오기
	 * @param {*} params
	 * @param {*} callback
	 */
	read(params, callback) {
		let sql =
			"SELECT email, password, nickname, createdAt, avatar_url, IFNULL(last_login,'0') AS last_login" +
			' FROM user ' +
			" WHERE email = '" +
			params.body.email +
			"'";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (!results || results.length < 1) {
				callback('No user to match id.', params);
				return;
			}

			params['user'] = results[0];
			callback(null, params);
		});
	},

	/**
	 * @description 이메일 인증
	 * @param {*} params
	 * @param {*} callback
	 */
	sameEmailCheck(params, callback) {
		let sql = "SELECT * FROM user WHERE email='" + params.body.email + "'";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (!results || results.length < 1) {
				params['result'] = 'No user to match id.';
				params['code'] = 0;
				callback(null, params);
				return;
			} else {
				params['result'] = 'There is a same email in DB';
				params['code'] = -1;
				callback(null, params);
				return;
			}
		});
	},

	/**
	 * @description 라스트 로그인 시간
	 * @param {*} params
	 * @param {*} callback
	 */
	insertLastLogin(params, callback) {
		const date = new Date();
		const year = date.getFullYear();
		const month =
			date.getMonth() + 1 >= 10
				? `${date.getMonth() + 1}`
				: `0${date.getMonth() + 1}`;
		const day =
			date.getDate() >= 10 ? `${date.getDate()}` : `0${date.getDate()}`;

		const parseDate = `${year}-${month}-${day}`;

		let sql = 'UPDATE user SET last_login="';
		sql = sql + parseDate + '" WHERE email="';
		sql = sql + params.body.email + '"';

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			callback(null, params);
		});
	},

	/**
	 * @description SHA-512 방식으로 암호화 : 88 bytes
	 * @param {*} params
	 * @param {*} callback
	 * @returns
	 */
	hashPassword(params, callback) {
		if (params.body.password) {
			return crypto.pbkdf2(
				params.body.password,
				process.env.PASSWORD_KEY,
				100000,
				64,
				'sha512',
				(err, key) => {
					if (err) return callback('err_hash_password', params);

					params['hashPassword'] = key.toString('base64');
					return callback(null, params);
				},
			);
		} else {
			return callback(null, params);
		}
	},

	/**
	 * @description 이메일 확인 (소셜 로그인)
	 * @param {*} params
	 * @param {*} callback
	 * @returns
	 */
	matchEmail(params, callback) {
		if (params.user.email !== params.body.email) {
			callback('Not match Email', params);
			return;
		}

		callback(null, params);
	},

	/**
	 * @description 로컬 로그인 시 비밀번호 체크
	 * @param {*} params
	 * @param {*} callback
	 * @returns
	 */
	matchPassword(params, callback) {
		if (params.hashPassword !== params.user.password) {
			callback('Not match password.', params);
			return;
		}

		callback(null, params);
	},

	/**
	 * @description 비밀번호 포기화 시에 해당 이메일 확인
	 * @param {*} params
	 * @param {*} callback
	 * @returns
	 */
	beforeSendEmail(params, callback) {
		let sql =
			"SELECT email, name FROM user WHERE email='" + params.body.email + "'";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results && results.length > 0) {
				params['user'] = results[0];
			} else {
				callback('No User', params);
				return;
			}
			callback(null, params);
		});
	},

	/**
	 * @description 이메일 찾기 시에 사용
	 * @param {*} params
	 * @param {*} callback
	 * @returns
	 */
	selectEmail(params, callback) {
		let sql =
			"SELECT email, name, passwd_q, passwd_a FROM user WHERE phone='" +
			params.body.telNumber +
			"' AND name='" +
			params.body.name +
			"'";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results && results.length > 0) {
				params['user'] = results[0];
				callback(null, params);
				return;
			} else {
				callback('No User', params);
				return;
			}
		});
	},

	/**
	 * @description Join INSERT SQL 생성
	 * @param {*} params
	 * @param {*} callback
	 */
	userInsert(params, callback) {
		let sql =
			'INSERT INTO user (email, nickname, password, name, phone, passwd_q, passwd_a, gender, birth, game_with, game_media, game_like_count, marketing_consent, permanent_member, avatar_url) ';

		params['sql'] = sql;
		callback(null, params);
	},

	/**
	 * @description VALUE 값 입력
	 * @param {*} params
	 * @param {*} callback
	 */
	join(params, callback) {
		/* const date = new Date();
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
			"VALUES ('" +
			params.body.email +
			"', '" +
			params.body.nickname +
			"'";

		if (!!params.hashPassword) {
			sql = sql + ", '" + params.hashPassword + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.name) {
			sql = sql + ", '" + params.body.name + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.phone) {
			sql = sql + ", '" + params.body.phone + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.passwd_q) {
			sql = sql + ", '" + params.body.passwd_q + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.passwd_a) {
			sql = sql + ", '" + params.body.passwd_a + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.gender) {
			sql = sql + ", '" + params.body.gender + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.birth) {
			sql = sql + ", '" + params.body.birth + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.game_with) {
			sql = sql + ", '" + params.body.game_with + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.game_media) {
			sql = sql + ", '" + params.body.game_media + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.game_like_count) {
			sql = sql + ", '" + params.body.game_like_count + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.marketing_consent) {
			sql = sql + ", '" + params.body.marketing_consent + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.permanent_member) {
			sql = sql + ", '" + params.body.permanent_member + "'";
		} else {
			sql = sql + ', NULL';
		}
		if (!!params.body.avatar_url) {
			sql =
				sql +
				", '" +
				params.body.avatar_url +
				"') ON DUPLICATE KEY UPDATE email  = '" +
				params.body.email +
				"'";
		} else {
			sql =
				sql +
				", NULL) ON DUPLICATE KEY UPDATE email  = '" +
				params.body.email +
				"'";
		}

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				callback(err, params);
				return;
			}

			if (results && results.length) {
				params['userData'] = results;
			}

			callback(null, params);
		});
	},
};
