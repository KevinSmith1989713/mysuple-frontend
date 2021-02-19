import settingImg from '../../static/images/League/leageSetting.svg';

export const profileMenus = [
	{
		id: 1,
		name: '계정',
		key: 'account',
	},
	{
		id: 2,
		name: '나의 패스',
		key: 'myPass',
	},
	{
		id: 3,
		name: '내가 쓴 글',
		key: 'myWriting',
	},
	{
		id: 4,
		name: '나의 게임',
		key: 'myGame',
	},
	{
		id: 5,
		name: '나의 리그',
		key: 'myLeague',
	},
	{
		id: 6,
		name: '나의 매치',
		key: 'myMatche',
	},
	// {
	// 	id: 4,
	// 	name: '나의 큐레이팅',
	// 	key: 'curating',
	// },
	// {
	// 	id: 5,
	// 	name: '설정',
	// 	key: 'setting',
	// },
];

export const loginInputs = [
	{
		id: 1,
		name: 'email',
		placeholder: '이메일',
		type: 'text',
	},
	{
		id: 2,
		name: 'password',
		placeholder: '비밀번호',
		type: 'password',
	},
];

export const loginMenu = [
	{
		id: 1,
		name: '회원가입',
		key: 'join',
	},
	{
		id: 2,
		name: '이메일 찾기',
		key: 'findEmail',
	},
	{
		id: 3,
		name: '비밀번호 초기화',
		key: 'resetPwd',
	},
];

export const joinTerm = [
	{
		id: 1,
		name: '이용약관',
		key: 'use',
	},
	{
		id: 2,
		name: '개인정보 처리방침',
		key: 'person',
	},
	{
		id: 3,
		name: '마케팅 수신 안내',
		key: 'marketing',
	},
];
export const joinCheckboxes = [
	{
		id: 1,
		title: '슈퍼플레이어 이용약관 (필수)',
		name: 'use',
	},
	{
		id: 2,
		title: '개인정보 수집 및 이용 동의 (필수)',
		name: 'person',
	},
	{
		id: 3,
		title: '만 14세 이상 (필수)',
		name: 'age',
	},
	{
		id: 4,
		title: '마케팅 수신 동의 (선택)',
		name: 'marketing',
	},
	{
		id: 5,
		title: '평생 회원가입 동의 (선택)',
		name: 'member',
	},
];

export const questionOptions = [
	{ value: 'myprecious', label: '가장 아끼는 물건은 무엇인가요?' },
	{ value: 'cook', label: '처음 해본 요리는 무엇인가요?' },
	{ value: 'movie', label: '처음으로 영화관에서 본 영화는 무엇인가요?' },
	{ value: 'mother', label: '어머니의 이름은 무엇인가요?' },
	{ value: 'father', label: '아버지의 이름은 무엇인가요?' },
	{ value: 'pet', label: '우리집 반려 동물 이름은 무엇인가요?' },
	{ value: 'present', label: '가장 받고 싶은 선물은 무엇인가요?' },
	{ value: 'friend', label: '가장 친한 친구의 이름은 무엇인가요?' },
	{ value: 'music', label: '좋아하는 음반의 제목은 무엇인가요?' },
	{ value: 'dream', label: '어떤 꿈을 가지고 있나요?' },
];

export const phoneOptions = [
	{ value: '010', label: '010' },
	{ value: '011', label: '011' },
	{ value: '017', label: '017' },
	{ value: '019', label: '019' },
];

export const radioOptions = [
	{
		id: 1,
		name: 'gender',
		title: '남자',
		value: '1',
		type: 'radio',
	},
	{
		id: 2,
		name: 'gender',
		title: '여자',
		value: '2',
		type: 'radio',
	},
	{
		id: 3,
		name: 'gender',
		title: '기타',
		value: '3',
		type: 'radio',
	},
];

export const makeArray = () => {
	let array = [];
	let array1 = [];
	let array2 = [];

	const year = new Date().getFullYear();

	for (let i = 1930; i < year - 13; i++) {
		array.push({
			value: `${i}`,
			label: `${i}`,
			id: 'birth1',
		});
	}
	for (let i = 1; i <= 12; i++) {
		if (i < 10) {
			array1.push({
				value: `0${i}`,
				label: `0${i}`,
				id: 'birth2',
			});
		} else {
			array1.push({
				value: `${i}`,
				label: `${i}`,
				id: 'birth2',
			});
		}
	}
	for (let i = 1; i <= 31; i++) {
		if (i < 10) {
			array2.push({
				value: `0${i}`,
				label: `0${i}`,
				id: 'birth3',
			});
		} else {
			array2.push({
				value: `${i}`,
				label: `${i}`,
				id: 'birth3',
			});
		}
	}

	return { array, array1, array2 };
};

export const JoinInputs1 = [
	{
		id: 1,
		title: '이메일',
		name: 'email',
		isRequired: true,
	},
	{
		id: 2,
		title: '비밀번호',
		name: 'password',
		isRequired: true,
		placeholder: '비밀번호',
		type: 'password',
		isTrue: false,
		falseMessage: '*영문 숫자 특수기호 3가지 조합 6자 이상',
		trueMessage: '안전한 패스워드입니다.',
	},
	{
		id: 3,
		title: '비밀번호 확인',
		name: 'pwdCheck',
		isRequired: true,
		isTrue: false,
		placeholder: '비밀번호 한번더 입력해주세요',
		type: 'password',
		falseMessage: '비밀번호가 같지 않습니다.',
		trueMessage: '비밀번호가 같습니다.',
	},
];

export const path = [
	{ value: 1, path: 1, pathText: '패스 1장', money: '1000원' },
	{ value: 5, path: 5, pathText: '패스 5장', money: '5,000원' },
	{ value: 50, path: 50, pathText: '패스 50장', money: '50,000원' },
];

export const selectPayWayOption = [
	{ value: 'creditCard', label: '신용카드' },
	{ value: 'realTimeBank ', label: '실시간 계좌이체' },
	{ value: 'virtualAccount', label: '가상계좌' },
	{ value: 'mobilePayment', label: '휴대폰 소액결제' },
	{ value: 'happyMoney', label: '해피머니' },
	{ value: 'kakaoPay', label: '카카오 페이' },
	{ value: 'samsungPay', label: '삼성 페이' },
	{ value: 'KPay', label: 'KPay' },
	{ value: 'giftCard', label: '문화상품권' },
	{ value: 'smartCard', label: '스마트 문상' },
];

// 동료찾기

export const tabs = [
	{
		id: 'fastMatch',
		name: '빠른 매칭 만들기',
	},
	{
		id: 'makeCrew',
		name: '크루 만들기',
	},
];

export const recommendGames = [
	{
		game_class: '1',
		name: '리그오브레전드',
		img_src: 'https://storage.googleapis.com/game_info/game_image/343564.png',
		game_title: 'League of Lengends',
		game_title_kr: '리그 오브 레전드',
		game_id: 343564,
		id: 343564,
	},
	{
		game_class: '1',
		name: '배틀그라운드',
		img_src: 'https://storage.googleapis.com/game_info/game_image/343648.png',
		game_title: "PlayerUnknown's Battlegrounds",
		game_title_kr: '배틀그라운드',
		game_id: 343648,
		id: 343648,
	},
	{
		game_class: '1',
		name: '오버워치',
		img_src: 'https://storage.googleapis.com/game_info/game_image/343664.png',
		game_title: null,
		game_title_kr: '오버워치',
		game_id: 343664,
		id: 343664,
	},

	{
		game_class: '32',
		name: '모여봐요 동물의 숲',
		img_src: 'https://storage.googleapis.com/game_info/game_image/343672.png',
		game_title: '모여봐요 동물의 숲',
		game_title_kr: '모여봐요 동물의 숲',
		game_id: 343672,
		id: 343672,
	},

	{
		game_class: '0',
		name: '데드 바이 데이라이트',
		img_src: 'https://storage.googleapis.com/game_info/game_image/194874.png',
		game_title: 'Dead by Daylight',
		game_title_kr: '데드 바이 데이라이트',
		game_id: 194874,
		id: 194874,
	},
];

// 리그 step 1
export const auto = [
	{ name: '허용', value: 'permit' },
	{ name: '비허용', value: 'notAllowed' },
];

export const type = [
	{ name: '개인전', value: 'single' },
	{ name: '팀전', value: 'multy' },
];

const timeFunc = () => {
	for (let i = 0; text < 13; i++) {
		// return console.log(i);
	}
};

export const step1Time = [
	{ time: '오전 12:00', value: 'T00:00:00', id: 0 },
	{ time: '오전 12:15', value: 'T00:15:00', id: 1 },
	{ time: '오전 12:30', value: 'T00:30:00', id: 2 },
	{ time: '오전 12:45', value: 'T00:45:00', id: 3 },
	{ time: '오전 01:00', value: 'T01:00:00', id: 4 },
	{ time: '오전 01:15', value: 'T01:15:00', id: 5 },
	{ time: '오전 01:30', value: 'T01:30:00', id: 6 },
	{ time: '오전 01:45', value: 'T01:45:00', id: 7 },
	{ time: '오전 02:00', value: 'T02:00:00', id: 8 },
	{ time: '오전 02:15', value: 'T02:15:00', id: 9 },
	{ time: '오전 02:30', value: 'T02:30:00', id: 10 },
	{ time: '오전 02:45', value: 'T02:45:00', id: 11 },
	{ time: '오전 03:00', value: 'T03:00:00', id: 12 },
	{ time: '오전 03:15', value: 'T03:15:00', id: 13 },
	{ time: '오전 03:30', value: 'T03:30:00', id: 14 },
	{ time: '오전 03:45', value: 'T03:45:00', id: 15 },
	{ time: '오전 04:00', value: 'T04:00:00', id: 16 },
	{ time: '오전 04:15', value: 'T04:15:00', id: 17 },
	{ time: '오전 04:30', value: 'T04:30:00', id: 18 },
	{ time: '오전 04:45', value: 'T04:45:00', id: 19 },
	{ time: '오전 05:00', value: 'T05:00:00', id: 20 },
	{ time: '오전 05:15', value: 'T05:15:00', id: 21 },
	{ time: '오전 05:30', value: 'T05:30:00', id: 22 },
	{ time: '오전 05:45', value: 'T05:45:00', id: 23 },
	{ time: '오전 06:00', value: 'T06:00:00', id: 24 },
	{ time: '오전 06:15', value: 'T06:15:00', id: 25 },
	{ time: '오전 06:30', value: 'T06:30:00', id: 26 },
	{ time: '오전 06:45', value: 'T06:45:00', id: 27 },
	{ time: '오전 07:00', value: 'T07:00:00', id: 28 },
	{ time: '오전 07:15', value: 'T07:15:00', id: 29 },
	{ time: '오전 07:30', value: 'T07:30:00', id: 30 },
	{ time: '오전 07:45', value: 'T07:45:00', id: 31 },
	{ time: '오전 08:00', value: 'T08:00:00', id: 32 },
	{ time: '오전 08:15', value: 'T08:15:00', id: 33 },
	{ time: '오전 08:30', value: 'T08:30:00', id: 34 },
	{ time: '오전 08:45', value: 'T08:45:00', id: 35 },
	{ time: '오전 09:00', value: 'T09:00:00', id: 36 },
	{ time: '오전 09:15', value: 'T09:15:00', id: 37 },
	{ time: '오전 09:30', value: 'T09:30:00', id: 38 },
	{ time: '오전 09:45', value: 'T09:45:00', id: 39 },
	{ time: '오전 10:00', value: 'T10:00:00', id: 40 },
	{ time: '오전 10:15', value: 'T10:15:00', id: 41 },
	{ time: '오전 10:30', value: 'T10:30:00', id: 42 },
	{ time: '오전 10:45', value: 'T10:45:00', id: 43 },
	{ time: '오전 11:00', value: 'T11:00:00', id: 44 },
	{ time: '오전 11:15', value: 'T11:15:00', id: 45 },
	{ time: '오전 11:30', value: 'T11:30:00', id: 46 },
	{ time: '오전 11:45', value: 'T11:45:00', id: 47 },
	{ time: '오후 12:00', value: 'T12:00:00', id: 48 },
	{ time: '오후 12:15', value: 'T12:10:00', id: 49 },
	{ time: '오후 12:30', value: 'T12:30:00', id: 50 },
	{ time: '오후 12:45', value: 'T12:45:00', id: 51 },
	{ time: '오후 01:00', value: 'T13:00:00', id: 52 },
	{ time: '오후 01:15', value: 'T13:15:00', id: 53 },
	{ time: '오후 01:30', value: 'T13:30:00', id: 54 },
	{ time: '오후 01:45', value: 'T13:45:00', id: 55 },
	{ time: '오후 02:00', value: 'T14:00:00', id: 56 },
	{ time: '오후 02:15', value: 'T14:15:00', id: 57 },
	{ time: '오후 02:30', value: 'T14:30:00', id: 58 },
	{ time: '오후 02:45', value: 'T14:45:00', id: 59 },
	{ time: '오후 03:00', value: 'T15:00:00', id: 60 },
	{ time: '오후 03:15', value: 'T15:15:00', id: 61 },
	{ time: '오후 03:30', value: 'T15:30:00', id: 62 },
	{ time: '오후 03:45', value: 'T15:45:00', id: 63 },
	{ time: '오후 04:00', value: 'T16:00:00', id: 64 },
	{ time: '오후 04:15', value: 'T16:15:00', id: 65 },
	{ time: '오후 04:30', value: 'T16:30:00', id: 66 },
	{ time: '오후 04:45', value: 'T16:45:00', id: 67 },
	{ time: '오후 05:00', value: 'T17:00:00', id: 68 },
	{ time: '오후 05:15', value: 'T17:15:00', id: 69 },
	{ time: '오후 05:30', value: 'T17:30:00', id: 70 },
	{ time: '오후 05:45', value: 'T17:45:00', id: 71 },
	{ time: '오후 06:00', value: 'T18:00:00', id: 72 },
	{ time: '오후 06:15', value: 'T18:15:00', id: 73 },
	{ time: '오후 06:30', value: 'T18:30:00', id: 74 },
	{ time: '오후 06:45', value: 'T18:45:00', id: 75 },
	{ time: '오후 07:00', value: 'T19:00:00', id: 76 },
	{ time: '오후 07:15', value: 'T19:15:00', id: 77 },
	{ time: '오후 07:30', value: 'T19:30:00', id: 78 },
	{ time: '오후 07:45', value: 'T19:45:00', id: 79 },
	{ time: '오후 08:00', value: 'T20:00:00', id: 80 },
	{ time: '오후 08:15', value: 'T20:15:00', id: 81 },
	{ time: '오후 08:30', value: 'T20:30:00', id: 82 },
	{ time: '오후 08:45', value: 'T20:45:00', id: 83 },
	{ time: '오후 09:00', value: 'T21:00:00', id: 84 },
	{ time: '오후 09:15', value: 'T21:15:00', id: 85 },
	{ time: '오후 09:30', value: 'T21:30:00', id: 86 },
	{ time: '오후 09:45', value: 'T21:45:00', id: 87 },
	{ time: '오후 10:00', value: 'T22:00:00', id: 88 },
	{ time: '오후 10:15', value: 'T22:15:00', id: 89 },
	{ time: '오후 10:30', value: 'T22:30:00', id: 90 },
	{ time: '오후 10:45', value: 'T22:45:00', id: 91 },
	{ time: '오후 11:00', value: 'T23:30:00', id: 92 },
	{ time: '오후 11:15', value: 'T23:15:00', id: 93 },
	{ time: '오후 11:30', value: 'T23:30:00', id: 94 },
	{ time: '오후 11:45', value: 'T23:45:00', id: 95 },
];

// 리그 step 2
export const settingCategory = [
	{ label: '나이', value: 'age' },
	{ label: '점수', value: 'score' },
	{ label: '티어', value: 'tier' },
	{ label: '프로', value: 'pro' },
	{ label: '마이크/채팅', value: 'mic' },
	{ label: '방송', value: 'broadcast' },
	{ label: '직접입력', value: '1' },
];

export const questionAnswer = [
	{ label: '단답형', value: 'short' },
	{ label: '객관식형', value: 'long' },
];

// 리그 상세 페이지
export const leagueHeaders = [
	{
		name: '리그정보',
		id: 'leagueInfo',
	},
	{
		name: '공지사항',
		id: 'notice',
	},
	{
		name: '참가자',
		id: 'participant',
		member: true,
	},
	{
		name: '배치도',
		id: 'layout',
	},
	{
		name: '팀원모집',
		id: 'recruit',
	},
];

export const leagueHeadersMobile = [
	{
		name: '리그정보',
		id: 'leagueInfo',
	},
	{
		name: '공지사항',
		id: 'notice',
	},
	{
		name: '참가자',
		id: 'participant',
		member: true,
	},
	// {
	// 	name: '배치도',
	// 	id: 'layout',
	// },
	{
		name: '팀원모집',
		id: 'recruit',
	},
];

export const system = [
	{ label: '3판2선승제', value: 'semifinal' },
	// { name: '팀전', value: 'multy' },
];

export const bankData = [
	{ label: 'NH농협' },
	{ label: '국민은행' },
	{ label: '기업은행' },
	{ label: '산업은행' },
	{ label: '신한은행' },
	{ label: '우리은행' },
	{ label: '하나은행' },
	{ label: 'SC은행' },
	{ label: '경남은행' },
	{ label: '광주은행' },
	{ label: '도이치은행' },
	{ label: '대구은행' },
	{ label: '부산은행' },
	{ label: '뱅크오브아메리카' },
	{ label: '수협은행' },
	{ label: '전북은행' },
	{ label: '중국공상은행' },
	{ label: '중국건설은행' },
	{ label: '제주은행' },
	{ label: '카카오뱅크' },
	{ label: '케이뱅크' },
	{ label: '한국씨티은행' },
	{ label: 'BNP파리바은행' },
	{ label: 'HSBC은행' },
	{ label: 'JP모건체이스은행' },
	{ label: '산림조합중앙회' },
	{ label: '저축은행' },
	{ label: '신협중앙회' },
	{ label: '새마을금고' },
	{ label: '우체국' },
];
