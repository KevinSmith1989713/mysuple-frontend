/**
 * Auth Controller
 *
 * @since   2019-10-19
 * @author  sangheon Kim
 */

const functions = require('firebase-functions');
const async = require('async');

const dbService = require('../services/dbService');
const response = require('../utils/Response');
const validator = require('../utils/validator');
const authService = require('../services/AuthService');
const tasteService = require('../services/TasteService');
const sendMailService = require('../services/SendMailService');
const profileService = require('../services/ProfileService');

exports.socialLogin = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		let info = {
			email: params.user.email,
			nickName: params.user.nickname,
			joinDate: params.user.createdAt,
			sessionKey: params.sessionKey,
			avatarUrl: params.user.avatar_url,
			compensation: params.compensation,
		};

		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			validator.validEmail,
			dbService.connect,
			authService.read,
			authService.matchEmail,
			tasteService.updateAttendance,
			authService.insertLastLogin,
			tasteService.selectUser,
			authService.create,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.localLogin = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		let info = {
			email: params.user.email,
			nickName: params.user.nickname,
			joinDate: params.user.createdAt,
			avatarUrl: params.user.avatar_url,
			sessionKey: params.sessionKey,
			compensation: params.compensation,
		};

		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			validator.validEmail,
			validator.validPassword,
			dbService.connect,
			authService.read,
			authService.hashPassword,
			authService.matchPassword,
			tasteService.updateAttendance,
			authService.insertLastLogin,
			tasteService.selectUser,
			authService.create,
			dbService.disconnect,
		],
		makeResponse,
	);
});

// delete from user where email="ksj8367@gmail.com";
exports.withdrawal = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		response.makeResponseByResult(res, err, null);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			validator.validEmail,
			dbService.connect,
			profileService.withdrawal,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.myPage = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		let info = {
			email: params.user.email,
			nickName: params.user.nickname,
			joinDate: params.user.createdAt,
		};

		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			validator.validEmail,
			dbService.connect,
			profileService.selectMyProfile,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.findEmail = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		let info = {
			user: {
				email: params.user.email,
				name: params.user.name,
				passwd_q: params.user.passwd_q,
				passwd_a: params.user.passwd_a,
			},
		};

		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			dbService.connect,
			authService.selectEmail,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.nicknameUpdate = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		let info = {
			email: params.user.email,
			nickName: params.user.nickname,
		};

		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			validator.validEmail,
			validator.validNewNickname,
			dbService.connect,
			profileService.updateProfile,
			authService.read,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.join = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		let info = {
			email: params.user.email,
			nickName: params.user.nickname,
			joinDate: params.user.createdAt,
		};

		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			validator.validEmail,
			validator.validNickName,
			dbService.connect,
			authService.hashPassword,
			authService.userInsert,
			authService.join,
			tasteService.insertCompensation,
			authService.read,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.sameEmailCheck = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		let info = {
			message: params.result,
			code: params.code,
		};

		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			validator.validEmail,
			dbService.connect,
			authService.sameEmailCheck,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.resetPasswordMailSend = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		let info = {};

		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			validator.validEmail,
			dbService.connect,
			authService.beforeSendEmail,
			sendMailService.send,
			dbService.disconnect,
		],
		makeResponse,
	);
});
