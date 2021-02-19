/**
 * Common Class: Validator
 *
 * @since   2019-10-19
 * @author  sangheon Kim
 */

module.exports = {
	/**
	 * Request Body
	 *
	 * @param {*} params		request body
	 * @param {*} callback
	 * @returns
	 */
	validReqBody(params, callback) {
		if (!params || !params.body) {
			callback('No request parameter.');
			return;
		}

		callback(null, params);
	},

	/**
	 *
	 * @description 파라미터 안에 ID 값 존재 확인
	 * @returns
	 */
	validId(params, callback) {
		if (!params.body.id || params.body.id.length > 24) {
			callback('No id.');
			return;
		}

		callback(null, params);
	},

	/**
	 *
	 * @description 파라미터 안에 game_id 값 존재 확인
	 * @returns
	 */
	validGameId(params, callback) {
		if (!params.body.game_id || params.body.game_id.length > 20) {
			callback('No game id.');
			return;
		}

		callback(null, params);
	},

	/**
	 *
	 * @description 파라미터 안에 newNickname 값 존재 확인
	 * @returns
	 */
	validNewNickname(params, callback) {
		if (!params.body.newNickname || params.body.newNickname > 20) {
			callback('No game newNickname.');
			return;
		}

		callback(null, params);
	},

	/**
	 *
	 * @description 파라미터 안에 curating_id 값 존재 확인
	 * @returns
	 */
	validCuratingId(params, callback) {
		if (!params.body.curating_id || params.body.curating_id.length > 11) {
			callback('No game id.');
			return;
		}

		callback(null, params);
	},

	/**
	 *
	 * @description 파라미터 안에 ID 값 존재 확인
	 * @returns
	 */
	validEmail(params, callback) {
		if (!params.body.email) {
			callback('No Email.', params);
			return;
		}

		callback(null, params);
	},

	/**
	 *
	 * @description 파라미터 안에 닉네임 확인
	 * @returns
	 */
	validNickName(params, callback) {
		if (!params.body.nickname || params.body.nickname > 100) {
			callback('No NickName');
			return;
		}

		callback(null, params);
	},

	/**
	 *
	 * @description 파라미터 안에 Password 존재 확인
	 * @returns
	 */
	validPassword(params, callback) {
		if (!params.body.password || params.body.password.length > 512) {
			callback('No Password');
			return;
		}

		callback(null, params);
	},

	/**
	 *
	 * @description 헤더 값안에 Session 키 존재 여부 확인
	 * @returns
	 */
	validSessionKey(params, callback) {
		if (!params.sessionKey || params.sessionKey.length > 255) {
			callback('No Session Key');
			return;
		}

		callback(null, params);
	},

	/**
	 *
	 * @description 세션키 일치 여부 확인
	 * @returns
	 */
	matchSessionKey(params, callback) {
		if (
			!params.adminSession ||
			params.adminSession.diffMinutes > 30 ||
			params.sessionKey !== params.adminSession.sessionKey
		) {
			callback('Not matched Session Key');
			return;
		}

		callback(null, params);
	},

	validDeviceTypeId(params, callback) {},
};
