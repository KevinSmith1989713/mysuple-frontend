/**
 * Review Controller
 *
 * @since   2019-11-01
 * @author  sangheon Kim
 */

const functions = require('firebase-functions');
const async = require('async');

const dbService = require('../services/dbService');
const response = require('../utils/Response');
const validator = require('../utils/validator');
const tasteService = require('../services/TasteService');
const reviewService = require('../services/ReviewService');

exports.createTaste = functions.https.onRequest((req, res) => {
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
			validator.validGameId,
			dbService.connect,
			tasteService.tasteInsert,
			tasteService.tasteReister,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.showTaste = functions.https.onRequest((req, res) => {
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
			list: params.tasteList,
		};
		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };

	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			dbService.connect,
			tasteService.showJoinTaste,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.showJoinTable = functions.https.onRequest((req, res) => {
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
			list: params.tasteList,
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
			tasteService.showJoinTaste,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.joinTaste = functions.https.onRequest((req, res) => {
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
			tasteService.updateUserTaste,
			tasteService.circleArray,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.myTaste = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}
		const info = {
			list: params.myGameList,
			tasteId: params.tasteId,
			reviewList: params.reviewList,
		};
		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };

	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			dbService.connect,
			tasteService.myGameTaste,
			reviewService.selectReview,
			tasteService.selectMyGameInfo,
			dbService.disconnect,
		],
		makeResponse,
	);
});
