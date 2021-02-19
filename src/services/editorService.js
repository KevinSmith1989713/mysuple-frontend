import { url } from '../constants/apiUrl.js';
import Api from './api';

class editorService extends Api {
	URL = url.suple;
	URL2 = url.file;
	URL3 = url.elastic;

	constructor() {
		super();
		this.api = new Api();

		this.editorSearch = this.editorSearch.bind(this);
		this.reqMainEditorPick = this.reqMainEditorPick.bind(this);
	}

	/**
	 * @description 정보 페이지 게임 전체 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof infoService
	 */
	editorSearch(data) {
		const param = {
			id: data.id,
		};
		try {
			return this.ajax('post', this.URL2, '/SelectEditor', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 메인 에디터스픽 두 개
	 * @param {*} data
	 * @returns
	 * @memberof infoService
	 */
	reqMainEditorPick() {
		try {
			return this.ajax('post', this.URL2, '/EditorMain', null).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}
}

export default new editorService();
