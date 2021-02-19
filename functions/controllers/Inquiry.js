/**
 * Review Controller
 *
 * @since   2019-11-01
 * @author  sangheon Kim
 */

const functions = require('firebase-functions');
const async = require('async');

const response = require('../utils/Response');
const validator = require('../utils/validator');

const dbService = require('../services/dbService');
const inquiryService = require('../services/InquiryService');

/**
 * @description 문의 작성
 * @param {*} params
 * @param {*} callback
 */
exports.insertInquiry = functions.https.onRequest((req, res) => {
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.set('Access-Control-Allow-Headers', '*');
	// req.set('Content-type', 'multipart/form-data');

	if (req.method === 'OPTIONS') {
		// Send response to OPTIONS requests
		res.set('Access-Control-Allow-Origin', '*');
		res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
		res.set('Access-Control-Allow-Headers', '*');
		res.status(204).send('');
	} else {
		let params = { body: req.body, headers: req.headers, req: req };

		let makeResponse = (err, params) => {
			if (err) {
				console.error(err);
				response.makeResponseByResult(res, err, null);
				return;
			}

			response.makeResponseByResult(res, err, null);
		};
		async.waterfall(
			[
				async.constant(params),
				dbService.connect,
				inquiryService.inquiryInsert,
				inquiryService.insertSql,
				dbService.disconnect,
			],
			makeResponse,
		);
	}
});

exports.create;
