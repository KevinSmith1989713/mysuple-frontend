import { url } from '../constants/apiUrl.js';
import Api from './api';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

class infoService extends Api {
	// URL = url.suple;
	URL = url.suple;
	URL2 = url.file;
	URL3 = url.elastic;

	constructor() {
		super();
		this.api = new Api();

		this.gameSelect = this.gameSelect.bind(this);
		this.gamePrice = this.gamePrice.bind(this);
		this.gameDetail = this.gameDetail.bind(this);
		this.upsertTaste = this.upsertTaste.bind(this);
		this.insertReview = this.insertReview.bind(this);
		this.makeCurating = this.makeCurating.bind(this);
		this.gameSearch = this.gameSearch.bind(this);
		this.reportReview = this.reportReview.bind(this);
		this.reqCurrency = this.reqCurrency.bind(this);
	}

	/**
	 * @description 정보 페이지 게임 전체 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof infoService
	 */
	gameSearch(data) {
		const param = {
			dev: '/GameInfoSearch',

			// email: data.email,
			count: data.count,
			text: data.text,
		};
		try {
			return this.ajax('post', this.URL2, '/GameInfoSearch', param).then(
				res => {
					console.log(res.data);
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	gameSelect(data) {
		const param = {
			id: getUserInfo === null ? '' : getUserInfo.id,
			dev: '/GameInfoBasic',
			count: data.count,
		};

		try {
			return this.ajax('post', this.URL2, '/GameInfoBasic', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}
	gamePrice(data) {
		const PRICE_URL = 'https://api.isthereanydeal.com/v01/game/prices/?';
		const detailUrl = `key=${data.key}&plains=${data.plain}`;
		try {
			return this.ajax('get', PRICE_URL, detailUrl, null).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 정보 페이지 게임 상세 페이지 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof infoService
	 */
	gameDetail(data) {
		const param = {
			id: getUserInfo === null ? '' : getUserInfo.id,
			dev: '/GameInfoDetail',
			game_id: data.id,
			count: 1,
		};
		try {
			return this.ajax('post', this.URL2, '/GameInfoDetail', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	upsertTaste(data) {
		const param = {
			id: getUserInfo.id,
			game_taste: data.game_taste,
		};

		try {
			return this.ajax('post', this.URL2, '/UpsertTaste', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	insertReview(data) {
		const param = {
			dev: '/InsertReview',
			id: getUserInfo.id,
			game_id: data.game_id,
			fun_score: data.fun_score,
			complete_score: data.complete_score,
			difficulty_score: data.difficulty_score,
			operation_score: data.operation_score,
			total_score: data.total_score,
			evaluation_content: data.evaluation_content,
		};

		try {
			return this.ajax('post', this.URL2, '/InsertReview', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	insertReviewUpdate = data => {
		const param = {
			dev: '/UpdateReview',
			id: getUserInfo.id,
			review_id: data.review_id,
			fun_score: data.fun_score,
			complete_score: data.complete_score,
			difficulty_score: data.difficulty_score,
			operation_score: data.operation_score,
			total_score: data.total_score,
			evaluation_content: data.evaluation_content,
		};

		try {
			return this.ajax('post', this.URL2, '/UpdateReview', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	makeCurating(data) {
		const param = {
			id: getUserInfo.id,
			curating_title: data.curating_name,
			curating_tag: data.curating_tag,
		};

		try {
			return this.ajax('post', this.URL2, '/MakeCurating', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}
	/**
	 * @description 정보 페이지 게임 전체 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof infoService
	 */
	reportReview(data) {
		const param = {
			id: getUserInfo.id,
			review_id: data.review_id,
			review_report_type: data.review_report_type,
			review_report_content: data.review_report_content,
		};

		try {
			return this.ajax('post', this.URL2, '/GameReviewReport', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}
	reqCurrency() {
		try {
			return this.ajax(
				'get',
				'https://earthquake.kr:23490/query/USDKRW',
				'',
				null,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}
}

export default new infoService();
