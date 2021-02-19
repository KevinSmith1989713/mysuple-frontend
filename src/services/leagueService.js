import { url } from '../constants/apiUrl.js';
import Api from './api';

const getUserInfo = JSON.parse(localStorage.getItem('data'));
class leagueService extends Api {
	URL = url.suple;
	URL2 = url.file;
	URL3 = url.elastic;

	constructor() {
		super();
		this.api = new Api();
	}

	/**
	 * @description  리그 리스트, 검색
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */

	searchLeague = data => {
		const param = {};

		param.count = data.count;
		data.league_type[0] === undefined
			? ''
			: (param.league_type = String(data.league_type));
		data.game_id.length < 1 ? '' : (param.game_id = data.game_id);
		data.text === '' ? '' : (param.text = String(data.text));
		data.join_pass === null ? '' : (param.join_pass = data.join_pass);
		data.date_tag[0] === undefined
			? ''
			: (param.date_tag = String(data.date_tag));
		data.ban.age === undefined &&
		data.ban.broadcast === undefined &&
		data.ban.tier === undefined
			? ''
			: (param.ban = data.ban);

		try {
			return this.ajax('post', this.URL2, '/LeagueSearch', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 리그 만들기
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */

	insertLeague = data => {
		const ban = JSON.stringify(data.ban);
		const formData = new FormData();
		formData.append('league_title', data.league_title);
		formData.append('game_id', data.game_id);
		formData.append('game_title', data.game_title);
		formData.append('game_title_kr', data.game_title_kr);
		formData.append('reward', '0');
		formData.append('id', getUserInfo.id);
		formData.append('league_type', data.league_type);
		formData.append('auto_join', data.auto_join);
		formData.append('outsourcing', data.outsourcing);
		formData.append('limit_people', data.limit_people);
		formData.append('member_count', data.member_count);
		formData.append('waiting_people', data.waiting_people);
		formData.append('league_main_img', data.league_main_img);
		formData.append('league_sub_img', data.league_sub_img);
		formData.append('apply_start', data.apply_start);
		formData.append('apply_end', data.apply_end);
		formData.append('start_date', data.start_date);
		formData.append('desc', data.desc);
		(data.ban && data.ban.info === null) || data.ban == undefined
			? ''
			: formData.append('ban', ban);
		formData.append('join_pass', data.join_pass);
		formData.append('sponsor_pass', data.sponsor_pass);
		formData.append('reward_ratio', data.reward_ratio);
		formData.append('question', data.question);
		formData.append('dev', '/LeagueInsert');

		const options = {
			headers: {
				'content-type': 'multipart/form-data',
				bucket_name: 'league',
			},
		};

		try {
			return this.ajax(
				'post',
				this.URL2,
				'/LeagueInsert',
				formData,
				options,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 업데이트
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	updateLeague = data => {
		const formData = new FormData();
		formData.append('id', getUserInfo.id);
		formData.append('league_id', data.league_id);
		formData.append('league_main_img', data.league_main_img);
		formData.append('desc', data.desc);
		const options = {
			headers: {
				'content-type': 'multipart/form-data',
			},
		};

		try {
			return this.ajax(
				'post',
				this.URL2,
				'/LeagueUpdate',
				formData,
				options,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 임시 저장
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */

	temporaryInsertLeague = data => {
		const ban = JSON.stringify(data.ban);
		const question = JSON.stringify(data.question);
		const reward_ratio = JSON.stringify(data.reward_ratio);
		const formData = new FormData();
		data.league_id === null || data.league_id <= data.league_id2
			? ''
			: formData.append('league_id', data.league_id);
		data.league_id2 === undefined
			? ''
			: formData.append('league_id', data.league_id2);
		data.league_title === null
			? ''
			: formData.append('league_title', data.league_title);
		formData.append('game_id', data.game_id);
		data.game_title === undefined
			? ''
			: formData.append('game_title', data.game_title);
		data.game_title_kr === undefined
			? ''
			: formData.append('game_title_kr', data.game_title_kr);
		formData.append('reward', '0');
		formData.append('id', getUserInfo.id);
		data.league_type === undefined
			? ''
			: formData.append('league_type', data.league_type);
		data.auto_join === undefined
			? ''
			: formData.append('auto_join', data.auto_join);
		formData.append('outsourcing', data.outsourcing);
		data.limit_people === 'undefined'
			? ''
			: formData.append('limit_people', data.limit_people);
		data.member_counte === 'undefined'
			? ''
			: formData.append('member_count', data.member_count);
		formData.append('waiting_people', data.waiting_people);
		data.league_main_img === null
			? ''
			: formData.append('league_main_img', data.league_main_img);
		data.league_sub_img === null
			? ''
			: formData.append('league_sub_img', data.league_sub_img);
		data.apply_start === undefined
			? ''
			: formData.append('apply_start', data.apply_start);
		data.apply_end === undefined
			? ''
			: formData.append('apply_end', data.apply_end);
		data.start_date === undefined
			? ''
			: formData.append('start_date', data.start_date);
		data.desc === null ? '' : formData.append('desc', data.desc);
		data.ban === null ? '' : formData.append('ban', ban);
		formData.append('join_pass', data.join_pass);
		formData.append('sponsor_pass', data.sponsor_pass);
		formData.append('reward_ratio', reward_ratio);
		data.question === null ? '' : formData.append('question', question);

		const options = {
			headers: {
				'content-type': 'multipart/form-data',
				bucket_name: 'league',
			},
		};

		try {
			return this.ajax(
				'post',
				this.URL2,
				'/LeagueInsertTemp',
				formData,
				options,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  임시저장 목록
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	getLeagueTempList = () => {
		const param = {
			id: getUserInfo && getUserInfo.id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueTempList', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  임시저장 목록 선택
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	selectLeagueTemporay = data => {
		try {
			return this.ajax('post', this.URL2, '/LeagueSelectTemp', data).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  임시저장 삭제
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	deleteLeagueTemporay = data => {
		try {
			return this.ajax('post', this.URL2, '/LeagueDeleteTemp', data).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 상세 페이지
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	selectLeague = date => {
		const param = {
			league_id: date,
			dev: '/LeagueSelect',
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueSelect', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 참가하기
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */

	joinLeague = data => {
		const param = {
			dev: '/LeagueJoinInsert',
			id: getUserInfo && getUserInfo.id,
			league_id: data.league_id,
		};
		const param2 = {
			dev: '/LeagueJoinInsert',
			id: getUserInfo && getUserInfo.id,
			league_id: data.league_id,
			team_id: data.team_id,
		};
		try {
			return this.ajax(
				'post',
				this.URL2,
				'/LeagueJoinInsert',
				data.team_id === null ? param : param2,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 참가 취소
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */

	joinLeagueCancel = data => {
		const param = {
			dev: '/LeagueJoinWithdrawal',
			id: getUserInfo && getUserInfo.id,
			league_id: data.league_id,
			league_join_id: data.league_join_id,
		};

		try {
			return this.ajax('post', this.URL2, '/LeagueJoinWithdrawal', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 참가하기 질문
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */

	joinLeagueAnswer = data => {
		const param = {
			dev: '/LeagueJoinAnswer',
			id: getUserInfo && getUserInfo.id,
			league_id: data.league_id,
			answer: data.answer,
		};

		try {
			return this.ajax('post', this.URL2, '/LeagueJoinAnswer', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 팀전 생성
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	makeLeagueTeam = data => {
		const param = {
			dev: '/LeagueTeamInsert',
			id: getUserInfo && getUserInfo.id,
			team_name: data.team_name,
			league_id: data.league_id,
			team_type: data.team_type,
			password: data.password,
		};

		try {
			return this.ajax('post', this.URL2, '/LeagueTeamInsert', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 팀전 리스트
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	getLeagueTeamList = data => {
		const param = {
			dev: '/LeagueTeamSelect',
			id: getUserInfo && getUserInfo.id,
			league_id: data.league_id,
			my_team: true,
			complete_only: data.complete,
		};

		try {
			return this.ajax('post', this.URL2, '/LeagueTeamSelect', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};
	/**
	 * @description  참가 리그
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */

	participatingLeague = () => {
		const param = {
			dev: '/LeagueJoinedList',
			id: getUserInfo && getUserInfo.id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueJoinedList', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  주최 리그
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	hostLeagueList = () => {
		const param = {
			dev: '/LeagueHostedList',
			id: getUserInfo && getUserInfo.id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueHostedList', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 댓글 리스트
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */

	leagueCommentsList = data => {
		const param = {
			league_id: data.league_id,
			id: getUserInfo && getUserInfo.id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueCommentSelect', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 댓글 쓰기
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	writeLeagueComments = data => {
		const param = {
			id: getUserInfo && getUserInfo.id,
			league_id: data.league_id,
			content: data.comments,
			private: data.secret,
		};
		const param2 = {
			id: getUserInfo && getUserInfo.id,
			league_id: data.league_id,
			content: data.comments,
			cmt_group: data.cmt_group,
			private: data.secret,
		};

		try {
			return this.ajax(
				'post',
				this.URL2,
				'/LeagueCommentInsert',
				data.cmt_group === null ? param : param2,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 댓글 수정
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	updateLeagueComments = data => {
		const param = {
			id: getUserInfo && getUserInfo.id,
			league_id: data.league_id,
			league_cmt_id: data.league_cmt_id,
			content: data.comments,
			private: data.secret,
		};

		try {
			return this.ajax('post', this.URL2, '/LeagueCommentUpdate', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 댓글 삭제
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	deleteLeagueComments = data => {
		const param = {
			dev: '/LeagueCommentDelete',
			id: getUserInfo && getUserInfo.id,
			league_id: data.league_id,
			league_cmt_id: data.league_cmt_id,
		};
		try {
			return this.ajax('post', this.URL2, '/LeagueCommentDelete', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};
	/**
	 * @description  리그 팀원 모집
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	recruitTeam = data => {
		const param = { league_id: data.league_id, dev: '/LeagueDetailCrew' };

		try {
			return this.ajax('post', this.URL2, '/LeagueDetailCrew', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description  리그 참가자
	 * @param {*} data
	 * @returns
	 * @memberof leagueService
	 */
	getParticipants = data => {
		try {
			return this.ajax(
				'post',
				this.URL2,
				'/LeagueDetailParticipants',
				data,
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};
}

export default new leagueService();
