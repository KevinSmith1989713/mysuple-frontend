import { url } from '../constants/apiUrl.js';
import Api from './api';

const getUserInfo = JSON.parse(localStorage.getItem('data'));

class myPageService extends Api {
	URL = url.suple;
	URL2 = url.file;

	constructor() {
		super();
		this.api = new Api();

		this.fileUpload = this.fileUpload.bind(this);
		this.profileUpdate = this.profileUpdate.bind(this);
		this.getMyGame = this.getMyGame.bind(this);
		this.getMyCurating = this.getMyCurating.bind(this);
	}

	/**
	 * @Instance
	 * @description 1:1 문의하기 (인스턴스 서버)
	 * @param {*} data
	 * @returns
	 * @memberof myPageService
	 */
	fileUpload(data) {
		formData.append('file', data.file);
		formData.append('category', data.category);
		formData.append('title', data.title);
		formData.append('content', data.content);
		formData.append('email', data.email);

		const options = {
			headers: {
				'content-type': 'multipart/form-data',
				bucket_name: 'inquiry-image',
			},
		};

		try {
			return this.ajax(
				'post',
				this.URL2,
				'/InsertInquiry',
				formData,
				options,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	profileUpdate(data) {
		const formData = new FormData();

		formData.append('profile', data.file);
		formData.append('id', data.id);
		formData.append('new_nickname', data.newNickname);
		formData.append('new_avatar_desc', data.new_avatar_desc);

		const options = {
			headers: {
				'content-type': 'multipart/form-data',
				bucket_name: 'user_profile_suple',
			},
		};

		try {
			return this.ajax(
				'post',
				this.URL2,
				'/UpdateProfile',
				formData,
				options,
			).then(res => {
				getUserInfo.avatarDesc = res.data.Info.avatarDesc;
				getUserInfo.avatarUrl = res.data.Info.avatarUrl;
				getUserInfo.nickName = res.data.Info.nickName;
				localStorage.setItem('data', JSON.stringify(getUserInfo));
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 마이 페이지 나의 게임 정보 얻기
	 * @param {*} data
	 * @returns
	 * @memberof myPageService
	 */
	getMyGame(data) {
		const param = {
			dev: '/MyGames',
			id: getUserInfo.id,
		};

		try {
			return this.ajax('post', this.URL2, '/MyGames', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 낙내암 업데이트
	 * @param {*} data
	 * @returns
	 * @memberof myPageService
	 */

	/**
	 * @description 큐레이팅 담기
	 * @param {*} data
	 * @returns
	 * @memberof myPageService
	 */

	getMyCurating(data) {
		const param = {
			id: getUserInfo.id,
		};

		try {
			return this.ajax('post', this.URL2, '/SelectCurating', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}
	/**
	 * @description 내가 쓴 글, 내가 쓴 댓글 리스트
	 * @param {*} data
	 * @returns
	 * @memberof myPageService
	 */

	myContentsList = data => {
		const param = {
			id: getUserInfo.id,
		};

		try {
			return this.ajax('post', this.URL2, '/MyWritings', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 큐레이팅 담기
	 * @param {*} data
	 * @returns
	 * @memberof myPageService
	 */

	myContentsDelete = data => {
		const param = {
			dev: '/DeleteCrew',
			id: getUserInfo.id,
			crew_id: data.crew_id,
		};

		try {
			return this.ajax('post', this.URL2, '/DeleteCrew', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 마이페이지 질문  선택
	 * @param {*} data
	 * @returns
	 * @memberof myPageService
	 */

	getmyLeagueQuestion = data => {
		const param = {
			dev: '/MyLeagueQASelect',
			league_id: data.league_id,
			id: getUserInfo.id,
		};

		try {
			return this.ajax('post', this.URL2, '/MyLeagueQASelect', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 마이페이지 리그 질문 수정
	 * @param {*} data
	 * @returns
	 * @memberof myPageService
	 */

	reviseMyLeagueQuestion = data => {
		const param = {
			dev: '/MyLeagueQAUpdate',
			league_id: data.league_id,
			id: getUserInfo.id,
			update_answer: data.update_answer,
		};
		try {
			return this.ajax('post', this.URL2, '/MyLeagueQAUpdate', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 마이페이지 리그 팀 변경
	 * @param {*} data
	 * @returns
	 * @memberof myPageService
	 */

	reviseMyLeagueTeam = data => {
		const param = {
			dev: '/LeagueTeamChange',
			league_id: data.league_id,
			id: getUserInfo.id,
			team_id: data.team_id,
			new_team_id: data.new_team_id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueTeamChange', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};
}

export default new myPageService();
