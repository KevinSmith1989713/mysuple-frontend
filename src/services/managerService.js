import { url } from '../constants/apiUrl.js';
import Api from './api';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));
class manageService extends Api {
	URL = url.suple;
	URL2 = url.file;
	URL3 = url.elastic;

	constructor() {
		super();
		this.api = new Api();
	}

	getParticipantsList = data => {
		try {
			return this.ajax(
				'post',
				this.URL2,
				'/LeagueAdminParticipants',
				data,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	writeLeagueNotice = data => {
		const info = {
			id: getUserInfo.id,
			league_id: data.league_id,
			title: data.title,
			content: data.content,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueNoticeInsert', info).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	getLeagueNoticeList = data => {
		const info = {
			league_id: data.league_id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueNoticeList', info).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	getLeagueNoticeDetail = data => {
		const info = {
			league_id: data.league_id,
			league_notice_id: data.league_notice_id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueNoticePost', info).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	reviseLeagueNoticeList = data => {
		const info = {
			id: getUserInfo.id,
			league_id: data.league_id,
			title: data.title,
			content: data.content,
			league_notice_id: data.league_notice_id,
		};

		try {
			return this.ajax('post', this.URL2, '/LeagueNoticeUpdate', info).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	deleteLeagueNoticeList = data => {
		const info = {
			league_id: data.league_id,
			league_notice_id: data.league_notice_id,
			id: getUserInfo.id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueNoticeDelete', info).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	approveLeague = data => {
		const info = {
			dev: '/LeagueJoinApproval',
			id: getUserInfo.id,
			league_id: data.league_id,
			league_join_id: data.league_join_id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueJoinApproval', info).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	rejectParticipant = data => {
		const info = {
			dev: '/LeagueJoinRejection',
			id: getUserInfo.id,
			league_id: data.league_id,
			league_join_id: data.league_join_id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueJoinRejection', info).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};
}

export default new manageService();


