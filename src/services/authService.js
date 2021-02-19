import { url } from '../constants/apiUrl.js';
import Api from './api';

const getUserInfo = !!JSON && JSON.parse(localStorage.getItem('data'));

class authService extends Api {
	// URL = url.suple;
	URL = url.file;
	URL2 = url.file;

	constructor() {
		super();
		this.api = new Api();

		this.sameEmailCheck = this.sameEmailCheck.bind(this);
		this.socialSignIn = this.socialSignIn.bind(this);
		this.join = this.join.bind(this);
		this.updateNickname = this.updateNickname.bind(this);
		this.withDrawal = this.withDrawal.bind(this);
		this.findEmail = this.findEmail.bind(this);
		this.sendMail = this.sendMail.bind(this);
		this.insertQA = this.insertQA.bind(this);
		this.smsAuthenticate = this.smsAuthenticate.bind(this);
		this.smsResultCheck = this.smsResultCheck.bind(this);
	}

	smsAuthenticate() {
		const param = {};

		try {
			return this.ajax('get', 'http://localhost:8888', '/', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	smsResultCheck() {
		const param = {};

		try {
			return this.ajax(
				'get',
				'http://localhost:8888',
				'/checkplus_success',
			).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 이메일 인증
	 * @param {*} data
	 * @returns
	 * @memberof authService (JoinSecond)
	 */
	sameEmailCheck(data) {
		const param = {
			email: data.email,
		};

		try {
			return this.ajax('post', this.URL, '/SameEmailCheck', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 로컬 로그인
	 * @param {*} { email, nickname }
	 * @returns
	 * @memberof authService (joinSecond)
	 */
	signIn = data => {
		const param = {
			email: data.email,
			password: data.password,
			platform: data.platform,
		};

		try {
			return this.ajax('post', this.URL, '/LocalLogin', param).then(res => {
				if (res.data.Status === 'OK') {
					localStorage.setItem('data', JSON.stringify(res.data.Info));
				}

				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 소셜 로그인
	 * @param {*} { email }
	 * @returns
	 * @memberof authService (joinSecond)
	 */
	socialSignIn(data) {
		const param = {
			email: data.email,
			platform: data.platform,
		};

		try {
			return this.ajax('post', this.URL, '/SocialLogin', param).then(res => {
				if (res.data.Status === 'OK') {
					localStorage.setItem('data', JSON.stringify(res.data.Info));
				}
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 회원가입하기
	 * @param {*} data
	 * @returns
	 * @memberof authService (joinThird)
	 */
	join(data) {
		const param = {
			email: data.email,
			name: data.name,
			nickname: data.nickname,
			password: data.password,
			phone: data.phone,
			passwd_q: data.passwd_q,
			passwd_a: data.passwd_a,
			gender: data.gender,
			birth: data.birth,
			marketing_consent: data.marketing_consent,
			permanent_member: data.permanent_member,
			avatar_url: data.avatar_url,
			platform: data.platform,
		};

		try {
			return this.ajax('post', this.URL, '/Join', param).then(res => {
				// console.log(res.data);
				if (res.data.Status === 'OK') {
					localStorage.setItem('data', JSON.stringify(res.data.Info));
				}
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 취향 등록하기
	 * @param {*} data
	 * @returns
	 * @memberof authService (joinSixth)
	 */
	showJoinTaste = data => {
		const param = {
			single: data.single,
			multi: data.multi,
			pc: data.pc,
			mobile: data.mobile,
			console1: data.console1,
			shooting: data.shooting,
			sports: data.sports,
			horror: data.horror,
			gore: data.gore,
			daily: data.daily,
			music: data.music,
			racing: data.racing,
			strategy: data.strategy,
			adventure: data.adventure,
			rpg: data.rpg,
			love: data.love,
			puzzle: data.puzzle,
			fantasy: data.fantasy,
			movie: data.movie,
			casual: data.casual,
			survival: data.survival,
			vr: data.vr,
			indie: data.indie,
			action: data.action,
			fight: data.fight,
			violence: data.violence,
			simulation: data.simulation,
			moba: data.moba,
			ps: data.ps,
			nin: data.nin,
			xbox: data.xbox,
		};

		try {
			return this.ajax('post', this.URL, '/ShowJoinTaste', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 닉네임 변경
	 * @param {*} data
	 * @returns
	 * @memberof authService
	 */
	updateNickname(data) {
		const param = {
			email: data.email,
			newNickname: data.newNickname,
		};

		try {
			return this.ajax('post', this.URL, '/NicknameUpdate', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 회원탈퇴
	 * @param {*} data
	 * @returns
	 * @memberof authService
	 */
	withDrawal(data) {
		const param = {
			email: data.email,
		};

		try {
			return this.ajax('post', this.URL, '/WithDrawal', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 이메일 찾기
	 * @param {*} data
	 * @returns
	 * @memberof authService
	 */
	findEmail(data) {
		const param = {
			name: data.name,
			telNumber: data.telNumber,
		};

		try {
			return this.ajax('post', this.URL, '/FindEmail', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 비밀번호 초기화
	 * @returns
	 * @memberof authService
	 */

	sendMail(data) {
		const param = {
			email: data.email,
		};
		try {
			return this.ajax('post', this.URL2, '/ResetPasswordMailSend', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 비밀번호 초기화 설정
	 * @returns
	 * @memberof authService
	 */

	settingPass = data => {
		const param = {
			password: data.password,
			token: data.token,
		};

		try {
			return this.ajax('post', this.URL2, '/ResetPassword', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};

	insertQA(data) {
		try {
			return this.ajax('post', this.URL2, '/InsertUserQA', data).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @description 패스 결제 및사용
	 * @returns
	 * @memberof authService
	 */

	insertPass = data => {
		const param = {
			id: getUserInfo && getUserInfo.id,
			history_type: data.type,
			refer_id: data.refer_id,
			account: data.account,
			history_desc: data.desc,
		};
		try {
			return this.ajax('post', this.URL2, '/PassHistoryInsert', param).then(
				res => {
					return res.data;
				},
			);
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * @description 패스 수량
	 * @returns
	 * @memberof authService
	 */

	passCount = () => {
		const param = {
			id: getUserInfo && getUserInfo.id,
		};
		try {
			return this.ajax('post', this.URL2, '/PassCount', param).then(res => {
				return res.data;
			});
		} catch (e) {
			console.error(e);
		}
	};
}

export default new authService();
