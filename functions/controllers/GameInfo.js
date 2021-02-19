/**
 * GameInfo Controller
 *
 * @since   2019-11-06
 * @author  sangheon Kim
 */

const functions = require('firebase-functions');
const async = require('async');

const dbService = require('../services/dbService');
const response = require('../utils/Response');
const validator = require('../utils/validator');

const gameInfoService = require('../services/GameInfoService');
const tasteService = require('../services/TasteService');
const reviewService = require('../services/ReviewService');

exports.gameInfoDetail = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');

	let makeResponse = (err, params) => {
		if (err) {
			console.error(err);
			response.makeResponseByResult(res, err, null);
			return;
		}

		let info = params.gameDetail;

		response.makeResponseByResult(res, err, info);
	};

	let params = { body: req.body };
	async.waterfall(
		[
			async.constant(params),
			validator.validReqBody,
			dbService.connect,
			gameInfoService.selectGameDetail,
			dbService.disconnect,
		],
		makeResponse,
	);
});
