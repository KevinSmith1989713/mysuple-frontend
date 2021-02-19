import { url } from '../constants/apiUrl.js';
import Api from './api';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

class ChattingService extends Api {
	URL = url.suple;
	URL2 = url.file;

	constructor() {
		super();
		this.api = new Api();
	}

	/**
	 * @Instance
	 * @description 친구 추가
	 * @param {*} data
	 * @returns
	 * @memberof chattingService
	 */
	searchFriend = data => {
		const param = {
			id: getUserInfo.id,
			friend_nickname: data.to_user,
		};
		try {
			return this.ajax('post', this.URL2, '/FriendSearch', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	addFriend = data => {
		const param = {
			id: getUserInfo.id,
			friend_nickname: data.to_user,
		};

		try {
			return this.ajax('post', this.URL2, '/FriendInsert', param).then(res => {
				console.log(res);
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};
	friendList = data => {
		const param = {
			id: getUserInfo.id,
		};

		try {
			return this.ajax('post', this.URL2, '/FriendList', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};
}

export default new ChattingService();
