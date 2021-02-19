import { url } from '../constants/apiUrl.js';
import Api from './api';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

class communityService extends Api {
	URL_FIREBASE = url.suple;
	URL_SQL = url.file;
	URL_ELASTIC = url.elastic;

	constructor() {
		super();
		this.api = new Api();
		this.reqGameSearch = this.reqGameSearch.bind(this);
		this.reqMainOtherCurating = this.reqMainOtherCurating.bind(this);
		this.reqMainYourCurating = this.reqMainYourCurating.bind(this);
	}

	/**
	 * @description 검색된 게임 가져오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqNotice)
	 */
	reqGameSearch(data) {
		const param = {
			size: 200,
			query: {
				multi_match: {
					query: data.text,
					fields: ['game_title', 'game_title_kr'],
				},
			},
		};
		try {
			return this.ajax(
				'post',
				this.URL_ELASTIC,
				'/game_data_new/_search',
				param,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 검색된 게임 가져오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqNotice)
	 */
	reqMainOtherCurating() {
		try {
			return this.ajax('post', 'https://spp.life', '/OtherCurating').then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}
	/**
	 * @description 검색된 게임 가져오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqNotice)
	 */
	reqMainYourCurating(email) {
		try {
			return this.ajax('post', 'https://spp.life', '/YourCurating').then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	reqInsertCuratingGame({ id, g_id }) {
		try {
			return this.ajax('post', this.URL_SQL, '/InsertCuratingGame', {
				dev: 'InsertCuratingGame',
				id: getUserInfo.id,
				curating_id: id,
				game_id: g_id,
			}).then(res => {
				res.data.Status === 'OK'
					? alert('담겼습니다.')
					: alert('이미 큐레이팅 목록에 존재합니다.');
			});
		} catch (e) {
			console.error(e);
		}
	}
}

export default new communityService();
