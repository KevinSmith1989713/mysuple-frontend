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
const reviewService = require('../services/ReviewService');

/**
 * @description 게임 후기 작성
 * @param {*} params
 * @param {*} callback
 */
exports.createReview = functions.https.onRequest((req, res) => {
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
			reviewService.reviewInsert,
			reviewService.reviewReister,
			dbService.disconnect,
		],
		makeResponse,
	);
});

exports.create;
