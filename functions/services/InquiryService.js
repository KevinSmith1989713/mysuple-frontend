/**
 * Inquiry Service
 *
 * @since   2019-11-24
 * @author  sangheon Kim
 */

const Busboy = require('busboy');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { Storage } = require('@google-cloud/storage');
const moment = require('moment');

module.exports = {
	inquiryInsert(params, callback) {
		const busboy = new Busboy({ headers: params.headers });
		params.req.pipe(busboy);
		const URL = `https://storage.googleapis.com/${params.headers.bucket_name}/`;
		const fileds = {};
		const uploads = {};
		let resultFileName = '';
		const tmpdir = os.tmpdir();
		const bucket_name = params.headers.bucket_name;
		const date = moment().format('YYYYMMDDHHmmss');

		busboy.on('field', (fieldname, val) => {
			fileds[fieldname] = val;
		});

		let fileWrites = [];

		busboy.on('file', (fieldname, file, filename) => {
			let extension = '';

			if (filename.indexOf('.jpg' || '.jpeg') > -1) {
				extension = '.jpg';
			} else if (filename.indexOf('.mp4') > -1) {
				extension = '.mp4';
			} else if (filename.indexOf('.png') > -1) {
				extension = '.png';
			} else {
				res.send(
					JSON.stringify(
						error.get_error_description(
							undefined,
							415,
							`The extension of the file ${filename} is not supported. Only mp4, jpg and png. Contact support`,
						),
					),
				);
			}

			const filepath = path.join(
				tmpdir,
				date +
					filename
						.split('.')[0]
						.split(' ')
						.join('') +
					extension,
			);

			resultFileName =
				date +
				filename
					.split('.')[0]
					.split(' ')
					.join('') +
				extension;
			uploads[fieldname] = filepath;

			const writeStream = fs.createWriteStream(filepath);
			file.pipe(writeStream);

			const promise = new Promise((resolve, reject) => {
				file.on('end', () => {
					writeStream.end();
					//res.send(JSON.stringify(successful.get_success_description(error, 200, "File uploaded")));
				});
				writeStream.on('finish', resolve);
				writeStream.on('error', reject);
			});

			fileWrites.push(promise);
		});

		const storage = new Storage();

		try {
			busboy.on('finish', () => {
				Promise.all(fileWrites).then(() => {
					let errors = [];
					for (const name in uploads) {
						const file = uploads[name];

						storage
							.bucket(params.headers.bucket_name)
							.upload(file)
							.then(() => {
								params['fileds'] = fileds;
								params['resultUrl'] = URL + resultFileName;

								callback(null, params);
							})
							.catch(err => {
								errors[err];

								console.error('ERROR:', err);
								callback(err, params);
								return;
							});
					}
				});
			});

			params['busboy'] = busboy;
			// callback(null, params);
		} catch (err) {}
	},

	insertSql(params, callback) {
		let sql =
			'INSERT INTO qa (email, q_category, q_title, q_content, attachment ) VALUES(' +
			parseInt(params.fileds.email) +
			",'" +
			params.fileds.category +
			"'," +
			"'" +
			params.fileds.title +
			"'," +
			"'" +
			params.fileds.content +
			"'," +
			"'" +
			params.resultUrl +
			"')";

		params.dbPool.query(sql, (err, results) => {
			if (err) {
				console.error(err);
				return;
			}

			callback(null, params);
		});
	},
};
