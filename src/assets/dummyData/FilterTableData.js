export const FilterTableData = [
	{
		id: 1,
		header: {
			name: '종류',
			key: 'genre',
		},
		data: [
			{
				key: 'fastMatching',
				name: '빠른매칭',
			},
			{
				key: 'crew',
				name: '크루',
			},
		],
	},
	{
		id: 2,
		header: {
			name: '게임',
			key: 'keyword',
		},
		data: [
			{ id: 1, key: 'sport', name: '리그 오브 레전드', game_id: 343564 },
			{ id: 1, key: 'racing', name: '오버워치', game_id: 343664 },
			{ id: 1, key: 'adventure', name: '배틀그라운드', game_id: 343648 },
			{ id: 3, key: 'fear', name: '모여봐요 동물의 숲', game_id: 343672 },
			{
				id: 1,
				key: 'open-world',
				name: '데드 바이 데이라이트',
				game_id: 194874,
			},
			{ id: 1, key: 'sandbx', name: '서든어택', game_id: 343592 },
			{ id: 2, key: 'sandbox', name: '배틀그라운드 M' },
			{ id: 1, key: 'sport-2', name: '워존', game_id: 343703 },
			{ id: 1, key: 'racing-2', name: '레인보우 식스 시즈', game_id: 202932 },
			{ id: 1, key: 'fear', name: '발로란트', game_id: 343746 },
		],
	},
	{
		id: 3,
		header: {
			name: '태그',
			key: 'media',
		},
		data: [
			{
				tag: '빡겜',
				name: '빡겜',
			},
			{
				tag: '디스코드',
				name: '디스코드',
			},
			{
				tag: '즐겜',
				name: '즐겜',
			},
			{
				tag: '랭겜',
				name: '랭겜',
			},
			{
				tag: '골드',
				name: '골드',
			},
			{
				tag: '브론즈',
				name: '브론즈',
			},
			{
				tag: '실버',
				name: '실버',
			},
			{
				tag: '마이크',
				name: '마이크',
			},
			{
				tag: '자랭',
				name: '자랭',
			},
			{
				tag: '고정',
				name: '고정',
			},
			{
				tag: '300++',
				name: '300++',
			},
			{
				tag: '200++',
				name: '200++',
			},
		],
	},
];

export const LeagueFilterTableData = [
	{
		id: 1,
		header: {
			name: '종류',
			key: 'genre',
		},
		data: [
			{
				type: '0',
				name: '개인전',
			},
			{
				type: '1',
				name: '팀전',
			},
		],
	},
	{
		id: 2,
		header: {
			name: '진행사항',
			key: 'state',
		},
		data: [
			{
				state: 'apply',
				name: '모집중',
			},
			{
				state: 'running',
				name: '진행중',
			},
			// {
			// 	state: 'expected',
			// 	name: '모집 예정',
			// },
			{
				state: 'finished',
				name: '종료',
			},
		],
	},
	{
		id: 3,
		header: {
			name: '게임',
			key: 'keyword',
		},
		data: [
			{ id: 1, name: '리그 오브 레전드', game_id: 343564 },
			{ id: 2, name: '카트라이더 러쉬플러스', game_id: 343749 },
			{ id: 1, name: '배틀그라운드', game_id: 343648 },
			{ id: 1, name: '오버워치', game_id: 343664 },
			{ id: 2, name: '브롤스타즈', game_id: 31670 },
			{ id: 1, name: '발로란트', game_id: 343746 },
			{ id: 1, name: '스타크래프트 2', game_id: 343663 },
		],
	},
	{
		id: 4,
		header: {
			name: '티어',
			key: 'tier',
		},
		data: [{ tier: 'tier' }],
	},
	{
		id: 5,
		header: {
			name: '제한',
			key: 'limit',
		},
		data: [
			{
				tag: 'broadcast',
				name: '방송허용',
			},
			// {
			// 	tag: 'pro',
			// 	name: '프로게이머 금지',
			// },
			{
				tag: 'minor',
				name: '15세',
			},

			{
				tag: 'adult',
				name: '19세',
			},
		],
	},
];
