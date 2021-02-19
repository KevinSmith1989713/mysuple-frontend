/**
 * DB Service
 *
 * @since   2019-10-01
 * @author  Sangheon Kim
 */

const mysql = require('mysql');

const dbInfo = {
	dev: {
		host: 'suple-270111:asia-northeast3:suple',
		name: 'suple',
	},
	prod: {
		host: 'suple-270111:asia-northeast3:suple',
		name: 'suple',
	},
};

const gameInfo = {
	dev: {
		host: 'super-player-260406:us-central1:suple',
		name: 'game_info',
	},
	prod: {
		host: 'super-player-260406:us-central1:suple',
		name: 'game_info',
	},
};

const runMode = 'dev';

module.exports = {
	/**
	 *
	 * @description db 연결
	 * @param {*} params
	 * @param {*} callback
	 * @returns
	 */
	connect(params, callback) {
		if (params.dbPool) {
			callback(null, params);
			return;
		}

		const config = {
			connectionLimit: 1,
			user: "root",
			password: "JxEbk7ir2mB4bKN9",
			host: "34.64.158.163",
			// port: 3306,
			database: "suple"
		};

		const connectionName =
			process.env.INSTANCE_CONNECTION_NAME || dbInfo[runMode].host;
		if (process.env.NODE_ENV === 'production')
			config.socketPath = `/cloudsql/${connectionName}`;

		params['dbPool'] = mysql.createPool(config);
		callback(null, params);
	},

	/**
	 *
	 * @description db 연결
	 * @param {*} params
	 * @param {*} callback
	 * @returns
	 */
	gameInfoConnect(params, callback) {
		if (params.dbPool) {
			callback(null, params);
			return;
		}

		const config = {
			connectionLimit: 1,
			user: 'root',
			password: 'F12pO8dzrC0MMJpw',
			host: process.env.DB_ADDRESS,
			// port: 3306,
			database: 'game_info',
		};

		const connectionName =
			process.env.INSTANCE_CONNECTION_NAME || gameInfo[runMode].host;
		if (process.env.NODE_ENV === 'production')
			config.socketPath = `/cloudsql/${connectionName}`;

		params['dbPool'] = mysql.createPool(config);
		callback(null, params);
	},

	/**
	 *
	 * @description db 연결 해제
	 * @param {*} params
	 * @param {*} callback
	 * @returns
	 */
	disconnect(params, callback) {
		params.dbPool.end(err => {
			if (err) {
				callback(err, params);
				return;
			}
			callback(null, params);
		});
	},
};
