import { url } from '../constants/apiUrl.js';
import Api from './api';

class administerService extends Api {
	URL = url.suple;
	URL2 = url.file;
	URL3 = url.elastic;

	constructor() {
		super();
		this.api = new Api();

		this.noticeList = this.noticeList.bind(this);
		this.noticePost = this.noticePost.bind(this);
		this.faqList = this.faqList.bind(this);
	}

	/**
	 * @description 정보 페이지 게임 전체 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof administerService
	 */
	noticeList() {
		try {
			return this.ajax('post', this.URL2, '/SelectAdminNoticeList', null).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 정보 페이지 게임 전체 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof administerService
	 */
	noticePost(data) {
		try {
			return this.ajax('post', this.URL2, '/SelectAdminNoticePost', data).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 정보 페이지 게임 전체 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof administerService
	 */
	faqList() {
		try {
			return this.ajax('post', this.URL2, '/SelectAdminFAQList', null).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	getMainBanner() {
		try {
			return this.ajax('post', this.URL2, '/SelectAdminBanner', {
				location: 'main',
			}).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}
}

export default new administerService();
