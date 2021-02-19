import { url } from '../constants/apiUrl.js';
import Api from './api';

const getUserInfo = JSON.parse(localStorage.getItem('data'));
class editorService extends Api {
	URL = url.suple;
	URL2 = url.file;
	URL3 = url.elastic;

	constructor() {
		super();
		this.api = new Api();
	}

	/**
	 * @description 검색 게임 정보 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof colleague
	 */
	gameCheck = data => {
		const param = {
			text: data.text,
		};
		try {
			return this.ajax('post', this.URL2, '/crewGameSearch', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};
	/**
	 * @description 빠른 매칭 게임 만들기
	 * @param {*} data
	 * @returns
	 * @memberof colleague
	 */
	makeGame = data => {
		const param = {
			id: getUserInfo.id,
			crew_title: data.crew_title,
			id: getUserInfo.id,
			open: data.open,
			type: data.type,
			crew_image: '',
			crew_desc: '',
			crew_tag: '',
			game_id: data.game_id,
			game_title: data.game_title_kr,
			game_title_kr: data.game_title_kr,
			link: data.link,
			link_title: '',
			deletedAt: 'false',
			game_class: data.game_class,
			league_id: data.league_id,
			auto_link: data.auto_link,
		};

		try {
			return this.ajax('post', this.URL2, '/InsertFastmatch', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 크루 매칭 게임 만들기
	 * @param {*} data
	 * @returns
	 * @memberof colleague
	 */
	makeCrewGame = data => {
		const param = {
			id: getUserInfo.id,
			crew_title: data.crew_title,
			email: data.email,
			open: data.open,
			type: data.type,
			crew_image: data.crewImg,
			crew_desc: data.crew_desc,
			crew_tag: data.crew_tag,
			game_id: [...data.game_id],
			game_title: [...data.game_title],
			game_title_kr: [...data.game_title_kr],
			link: data.link,
			link_title: '',
			deletedAt: 'false',
			game_class: data.game_class,
		};

		try {
			return this.ajax('post', this.URL2, '/InsertCrew', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 빠른 매칭 리스트
	 * @param {*} data
	 * @returns
	 * @memberof colleague
	 */

	fastCrewList = data => {
		const param = {
			text: data.text,
			game_id: data.game_id,
			count: data.count,
			search_tags: data.search_tags,
		};
		try {
			return this.ajax('post', this.URL2, '/FastmatchSearch', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 크루 매칭 리스트
	 * @param {*} data
	 * @returns
	 * @memberof colleague
	 */

	crewList = data => {
		const param = {
			text: data.text,
			game_id: data.game_id,
			count: data.count,
			search_tags: data.search_tags,
		};
		try {
			return this.ajax('post', this.URL2, '/crewSearch', param).then(res => {
				return res.data;
			});
		} catch (e) {}
	};
}

/**
 * @description 크루 이미지 업로드
 * @param {*} data
 * @returns
 * @memberof colleague
 */

export default new editorService();
