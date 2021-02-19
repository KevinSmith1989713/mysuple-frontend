import { url } from '../constants/apiUrl.js';
import Api from './api';

class communityService extends Api {
	URL = url.suple;
	URL2 = url.file;

	constructor() {
		super();
		this.api = new Api();

		this.insertOfficialDevNote = this.insertOfficialDevNote.bind(this);
		this.reqOfficialNotice = this.reqOfficialNotice.bind(this);
		this.reqOfficialDevNote = this.reqOfficialDevNote.bind(this);
		this.reqSelectOfficialNotice = this.reqSelectOfficialNotice.bind(this);
		this.reqOfficialRunningEvent = this.reqOfficialRunningEvent.bind(this);
		this.reqOfficialEndedEvent = this.reqOfficialEndedEvent.bind(this);
		this.reqOfficialPost = this.reqOfficialPost.bind(this);
		this.reqOfficialSkin = this.reqOfficialSkin.bind(this);
	}

	/**
	 * @description 개발노트 새 게시물
	 * @param {*} data
	 * @returns
	 * @memberof communityService(insertDevNote)
	 */
	insertOfficialDevNote(data) {
		const formData = new FormData();

		formData.append('file', data.file);
		formData.append('pageId', data.pageId);
		formData.append('email', data.email);
		formData.append('title', data.title);
		formData.append('content', data.content);

		const options = {
			headers: {
				'content-type': 'multipart/form-data',
				bucket_name: 'official_community',
			},
		};
		try {
			return this.ajax(
				'post',
				this.URL2,
				'/InsertDevNote',
				formData,
				options,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 공지 모두 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqNotice)
	 */
	reqOfficialNotice(data) {
		const param = {
			pageId: data.pageId,
		};
		try {
			return this.ajax('post', this.URL2, '/SelectNoticeList', param).then(
				res => {
					return res;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 개발노트 모두 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqDevNote)
	 */
	reqOfficialDevNote(data) {
		const param = { pageId: data.pageId };
		try {
			return this.ajax('post', this.URL2, '/SelectDevNoteList', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}
	/**
	 * @description 진행중인 이벤트 모두 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqRunningEvent)
	 */
	reqOfficialRunningEvent(data) {
		const param = { pageId: data.pageId };
		try {
			return this.ajax(
				'post',
				this.URL2,
				'/SelectEventRunningList',
				param,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 종료된 이벤트 모두 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqEndedEvent)
	 */
	reqOfficialEndedEvent(data) {
		const param = {
			pageId: data.pageId,
		};
		try {
			return this.ajax('post', this.URL2, '/SelectEventEndList', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 공지 하나만 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqDevNote)
	 */
	reqSelectOfficialNotice(data) {
		const param = {
			pageId: data.pageId,
			noticeId: data.noticeId,
		};
		try {
			return this.ajax('post', this.URL2, '/SelectNoticePost', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 스킨 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqDevNote)
	 */
	reqOfficialSkin(data) {
		const param = {
			pageId: data.pageId,
		};
		try {
			return this.ajax('post', this.URL2, '/CustomOfficialPage', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 포스트 하나만 불러오기
	 * @param {*} data
	 * @returns
	 * @memberof communityService(reqDevNote)
	 */
	reqOfficialPost(data) {
		const param = { pageId: data.pageId };
		switch (data.type) {
			case 'notice':
				param.noticeId = data.postId;

				try {
					return this.ajax('post', this.URL2, '/SelectNoticePost', param).then(
						res => {
							return res.data;
						},
					);
				} catch (e) {
					console.error(e);
					return;
				}

			case 'devNote':
				param.devId = data.postId;
				try {
					return this.ajax('post', this.URL2, '/SelectDevNotePost', param).then(
						res => {
							return res.data;
						},
					);
				} catch (e) {
					console.error(e);
					return;
				}

			case 'event':
				param.eventId = data.postId;
				try {
					return this.ajax('post', this.URL2, '/SelectNoticePost', param).then(
						res => {
							return res.data;
						},
					);
				} catch (e) {
					console.error(e);
					return;
				}
		}
	}
}

export default new communityService();
