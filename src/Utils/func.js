export const choose = (type, value, cb) => {
	cb(type, value);
};

export const makeGroup = (user, num, team) => {
	const groupList = [];
	for (let i = 0; i < num; i++) {
		groupList.push({ group: [{ group: user[i] }] });
		user[i + num] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num] });
		user[i + num * 2] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 2] });
		user[i + num * 3] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 3] });
		user[i + num * 4] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 4] });
		user[i + num * 5] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 5] });
		user[i + num * 6] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 6] });
		user[i + num * 7] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 7] });
		user[i + num * 8] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 8] });
		user[i + num * 9] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 9] });
		user[i + num * 10] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 10] });
		user[i + num * 11] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 11] });
		user[i + num * 12] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 12] });
		user[i + num * 13] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 13] });
		user[i + num * 14] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 14] });
		user[i + num * 15] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 15] });
		user[i + num * 16] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 16] });
		user[i + num * 17] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 17] });
		user[i + num * 18] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 18] });
		user[i + num * 19] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 19] });
		user[i + num * 20] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 20] });
		user[i + num * 21] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 21] });
		user[i + num * 22] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 22] });
		user[i + num * 23] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 23] });
		user[i + num * 24] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 24] });
		user[i + num * 25] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 25] });
		user[i + num * 26] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 26] });
		user[i + num * 27] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 27] });
		user[i + num * 28] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 28] });
		user[i + num * 29] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 29] });
		user[i + num * 30] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 30] });
		user[i + num * 31] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 31] });
		user[i + num * 32] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 32] });
		user[i + num * 33] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 33] });
		user[i + num * 34] === undefined
			? null
			: groupList[i].group.push({ group: user[i + num * 34] });
	}

	const groupUser = groupList.map((item, idx) => {
		const result = item.group.map(item2 => {
			return {
				group: {
					nickname: item2.group && item2.group.nickname,
					score:
						item2.group && item2.group.score === undefined
							? 0
							: item2.group && item2.group.score,
					group_name: idx + 1,
				},
			};
		});
		return { group: result, group_name: idx + 1 };
	});
	return groupUser;
};

export const timeForToday = value => {
	const today = new Date();
	const timeValue = new Date(value);

	const betweenTime = Math.floor(
		(today.getTime() - timeValue.getTime()) / 1000 / 60,
	);
	if (betweenTime < 1) return '방금전';
	if (betweenTime < 60) {
		return `${betweenTime}분전`;
	}

	const betweenTimeHour = Math.floor(betweenTime / 60);
	if (betweenTimeHour < 24) {
		return `${betweenTimeHour}시간전`;
	}

	const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
	if (betweenTimeDay < 365) {
		return `${betweenTimeDay}일전`;
	}
	return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const makeTimeValu = e => {
	
	return (
		(e.split('T')[1].substring(0, 5) === '00:00' && {
			time: '오전 12:00',
			value: 'T00:00:00',
			id: 0,
		}) ||
		(e.split('T')[1].substring(0, 5) === '00:15' && {
			time: '오전 12:15',
			value: 'T00:15:00',
			id: 1,
		}) ||
		(e.split('T')[1].substring(0, 5) === '00:30' && {
			time: '오전 12:30',
			value: 'T00:30:00',
			id: 2,
		}) ||
		(e.split('T')[1].substring(0, 5) === '00:45' && {
			time: '오전 12:45',
			value: 'T00:45:00',
			id: 3,
		}) ||
		(e.split('T')[1].substring(0, 5) === '01:00' && {
			time: '오전 01:00',
			value: 'T01:00:00',
			id: 4,
		}) ||
		(e.split('T')[1].substring(0, 5) === '01:15' && {
			time: '오전 01:15',
			value: 'T01:15:00',
			id: 5,
		}) ||
		(e.split('T')[1].substring(0, 5) === '01:30' && {
			time: '오전 01:30',
			value: 'T01:30:00',
			id: 6,
		}) ||
		(e.split('T')[1].substring(0, 5) === '01:45' && {
			time: '오전 01:45',
			value: 'T01:45:00',
			id: 7,
		}) ||
		(e.split('T')[1].substring(0, 5) === '02:00' && {
			time: '오전 02:00',
			value: 'T02:00:00',
			id: 8,
		}) ||
		(e.split('T')[1].substring(0, 5) === '02:15' && {
			time: '오전 02:15',
			value: 'T02:15:00',
			id: 9,
		}) ||
		(e.split('T')[1].substring(0, 5) === '02:30' && {
			time: '오전 02:30',
			value: 'T02:30:00',
			id: 10,
		}) ||
		(e.split('T')[1].substring(0, 5) === '02:45' && {
			time: '오전 02:45',
			value: 'T02:45:00',
			id: 11,
		}) ||
		(e.split('T')[1].substring(0, 5) === '03:00' && {
			time: '오전 03:00',
			value: 'T03:00:00',
			id: 12,
		}) ||
		(e.split('T')[1].substring(0, 5) === '03:30' && {
			time: '오전 03:30',
			value: 'T03:30:00',
			id: 14,
		}) ||
		(e.split('T')[1].substring(0, 5) === '03:45' && {
			time: '오전 03:45',
			value: 'T03:45:00',
			id: 15,
		}) ||
		(e.split('T')[1].substring(0, 5) === '04:00' && {
			time: '오전 04:00',
			value: 'T04:00:00',
			id: 16,
		}) ||
		(e.split('T')[1].substring(0, 5) === '04:15' && {
			time: '오전 04:15',
			value: 'T04:15:00',
			id: 17,
		}) ||
		(e.split('T')[1].substring(0, 5) === '04:30' && {
			time: '오전 04:30',
			value: 'T04:30:00',
			id: 18,
		}) ||
		(e.split('T')[1].substring(0, 5) === '04:45' && {
			time: '오전 04:45',
			value: 'T04:45:00',
			id: 19,
		}) ||
		(e.split('T')[1].substring(0, 5) === '05:00' && {
			time: '오전 05:00',
			value: 'T05:00:00',
			id: 20,
		}) ||
		(e.split('T')[1].substring(0, 5) === '05:15' && {
			time: '오전 05:15',
			value: 'T05:15:00',
			id: 21,
		}) ||
		(e.split('T')[1].substring(0, 5) === '05:30' && {
			time: '오전 05:30',
			value: 'T05:30:00',
			id: 22,
		}) ||
		(e.split('T')[1].substring(0, 5) === '05:45' && {
			time: '오전 05:45',
			value: 'T05:45:00',
			id: 23,
		}) ||
		(e.split('T')[1].substring(0, 5) === '06:00' && {
			time: '오전 06:00',
			value: 'T06:00:00',
			id: 24,
		}) ||
		(e.split('T')[1].substring(0, 5) === '06:15' && {
			time: '오전 06:15',
			value: 'T06:15:00',
			id: 25,
		}) ||
		(e.split('T')[1].substring(0, 5) === '06:30' && {
			time: '오전 06:30',
			value: 'T06:30:00',
			id: 26,
		}) ||
		(e.split('T')[1].substring(0, 5) === '06:45' && {
			time: '오전 06:45',
			value: 'T06:45:00',
			id: 27,
		}) ||
		(e.split('T')[1].substring(0, 5) === '07:00' && {
			time: '오전 07:00',
			value: 'T07:00:00',
			id: 28,
		}) ||
		(e.split('T')[1].substring(0, 5) === '07:15' && {
			time: '오전 07:15',
			value: 'T07:15:00',
			id: 29,
		}) ||
		(e.split('T')[1].substring(0, 5) === '07:30' && {
			time: '오전 07:30',
			value: 'T07:30:00',
			id: 30,
		}) ||
		(e.split('T')[1].substring(0, 5) === '07:45' && {
			time: '오전 07:45',
			value: 'T07:45:00',
			id: 31,
		}) ||
		(e.split('T')[1].substring(0, 5) === '08:00' && {
			time: '오전 08:00',
			value: 'T08:00:00',
			id: 32,
		}) ||
		(e.split('T')[1].substring(0, 5) === '08:15' && {
			time: '오전 08:15',
			value: 'T08:15:00',
			id: 33,
		}) ||
		(e.split('T')[1].substring(0, 5) === '08:30' && {
			time: '오전 08:30',
			value: 'T08:30:00',
			id: 34,
		}) ||
		(e.split('T')[1].substring(0, 5) === '08:45' && {
			time: '오전 08:45',
			value: 'T08:45:00',
			id: 35,
		}) ||
		(e.split('T')[1].substring(0, 5) === '09:00' && {
			time: '오전 09:00',
			value: 'T09:00:00',
			id: 36,
		}) ||
		(e.split('T')[1].substring(0, 5) === '09:15' && {
			time: '오전 09:15',
			value: 'T09:15:00',
			id: 37,
		}) ||
		(e.split('T')[1].substring(0, 5) === '09:30' && {
			time: '오전 09:30',
			value: 'T09:30:00',
			id: 38,
		}) ||
		(e.split('T')[1].substring(0, 5) === '09:45' && {
			time: '오전 09:45',
			value: 'T09:45:00',
			id: 39,
		}) ||
		(e.split('T')[1].substring(0, 5) === '10:00' && {
			time: '오전 10:00',
			value: 'T10:00:00',
			id: 40,
		}) ||
		(e.split('T')[1].substring(0, 5) === '10:15' && {
			time: '오전 10:15',
			value: 'T10:15:00',
			id: 41,
		}) ||
		(e.split('T')[1].substring(0, 5) === '10:30' && {
			time: '오전 10:30',
			value: 'T10:30:00',
			id: 42,
		}) ||
		(e.split('T')[1].substring(0, 5) === '10:45' && {
			time: '오전 10:45',
			value: 'T10:45:00',
			id: 43,
		}) ||
		(e.split('T')[1].substring(0, 5) === '11:00' && {
			time: '오전 11:00',
			value: 'T11:00:00',
			id: 44,
		}) ||
		(e.split('T')[1].substring(0, 5) === '11:15' && {
			time: '오전 11:15',
			value: 'T11:15:00',
			id: 45,
		}) ||
		(e.split('T')[1].substring(0, 5) === '11:30' && {
			time: '오전 11:30',
			value: 'T11:30:00',
			id: 46,
		}) ||
		(e.split('T')[1].substring(0, 5) === '11:45' && {
			time: '오전 11:45',
			value: 'T11:45:00',
			id: 47,
		}) ||
		(e.split('T')[1].substring(0, 5) === '12:00' && {
			time: '오후 12:00',
			value: 'T12:00:00',
			id: 48,
		}) ||
		(e.split('T')[1].substring(0, 5) === '12:15' && {
			time: '오후 12:15',
			value: 'T12:10:00',
			id: 49,
		}) ||
		(e.split('T')[1].substring(0, 5) === '12:30' && {
			time: '오후 12:30',
			value: 'T12:30:00',
			id: 50,
		}) ||
		(e.split('T')[1].substring(0, 5) === '12:45' && {
			time: '오후 12:45',
			value: 'T12:45:00',
			id: 51,
		}) ||
		(e.split('T')[1].substring(0, 5) === '13:00' && {
			time: '오후 01:00',
			value: 'T13:00:00',
			id: 52,
		}) ||
		(e.split('T')[1].substring(0, 5) === '13:15' && {
			time: '오후 01:15',
			value: 'T13:15:00',
			id: 53,
		}) ||
		(e.split('T')[1].substring(0, 5) === '13:30' && {
			time: '오후 01:30',
			value: 'T13:30:00',
			id: 54,
		}) ||
		(e.split('T')[1].substring(0, 5) === '13:45' && {
			time: '오후 01:45',
			value: 'T13:45:00',
			id: 55,
		}) ||
		(e.split('T')[1].substring(0, 5) === '14:00' && {
			time: '오후 02:00',
			value: 'T14:00:00',
			id: 56,
		}) ||
		(e.split('T')[1].substring(0, 5) === '14:10' && {
			time: '오후 02:15',
			value: 'T14:15:00',
			id: 57,
		}) ||
		(e.split('T')[1].substring(0, 5) === '14:30' && {
			time: '오후 02:30',
			value: 'T14:30:00',
			id: 58,
		}) ||
		(e.split('T')[1].substring(0, 5) === '14:45' && {
			time: '오후 02:45',
			value: 'T14:45:00',
			id: 59,
		}) ||
		(e.split('T')[1].substring(0, 5) === '15:00' && {
			time: '오후 03:00',
			value: 'T15:00:00',
			id: 60,
		}) ||
		(e.split('T')[1].substring(0, 5) === '15:15' && {
			time: '오후 03:15',
			value: 'T15:15:00',
			id: 61,
		}) ||
		(e.split('T')[1].substring(0, 5) === '15:30' && {
			time: '오후 03:30',
			value: 'T15:30:00',
			id: 62,
		}) ||
		(e.split('T')[1].substring(0, 5) === '15:45' && {
			time: '오후 03:45',
			value: 'T15:45:00',
			id: 63,
		}) ||
		(e.split('T')[1].substring(0, 5) === '16:00' && {
			time: '오후 04:00',
			value: 'T16:00:00',
			id: 64,
		}) ||
		(e.split('T')[1].substring(0, 5) === '16:15' && {
			time: '오후 04:15',
			value: 'T16:15:00',
			id: 65,
		}) ||
		(e.split('T')[1].substring(0, 5) === '16:30' && {
			time: '오후 04:30',
			value: 'T16:30:00',
			id: 66,
		}) ||
		(e.split('T')[1].substring(0, 5) === '16:45' && {
			time: '오후 04:45',
			value: 'T16:45:00',
			id: 67,
		}) ||
		(e.split('T')[1].substring(0, 5) === '17:00' && {
			time: '오후 05:00',
			value: 'T17:00:00',
			id: 68,
		}) ||
		(e.split('T')[1].substring(0, 5) === '17:15' && {
			time: '오후 05:15',
			value: 'T17:15:00',
			id: 69,
		}) ||
		(e.split('T')[1].substring(0, 5) === '17:30' && {
			time: '오후 05:30',
			value: 'T17:30:00',
			id: 70,
		}) ||
		(e.split('T')[1].substring(0, 5) === '17:45' && {
			time: '오후 05:45',
			value: 'T17:45:00',
			id: 71,
		}) ||
		(e.split('T')[1].substring(0, 5) === '18:00' && {
			time: '오후 06:00',
			value: 'T18:00:00',
			id: 72,
		}) ||
		(e.split('T')[1].substring(0, 5) === '18:15' && {
			time: '오후 06:15',
			value: 'T18:15:00',
			id: 73,
		}) ||
		(e.split('T')[1].substring(0, 5) === '18:30' && {
			time: '오후 06:30',
			value: 'T18:30:00',
			id: 74,
		}) ||
		(e.split('T')[1].substring(0, 5) === '18:45' && {
			time: '오후 06:45',
			value: 'T18:45:00',
			id: 75,
		}) ||
		(e.split('T')[1].substring(0, 5) === '19:00' && {
			time: '오후 07:00',
			value: 'T19:00:00',
			id: 76,
		}) ||
		(e.split('T')[1].substring(0, 5) === '19:15' && {
			time: '오후 07:15',
			value: 'T19:15:00',
			id: 77,
		}) ||
		(e.split('T')[1].substring(0, 5) === '19:30' && {
			time: '오후 07:30',
			value: 'T19:30:00',
			id: 78,
		}) ||
		(e.split('T')[1].substring(0, 5) === '19:45' && {
			time: '오후 07:45',
			value: 'T19:45:00',
			id: 79,
		}) ||
		(e.split('T')[1].substring(0, 5) === '20:00' && {
			time: '오후 08:00',
			value: 'T20:00:00',
			id: 80,
		}) ||
		(e.split('T')[1].substring(0, 5) === '20:15' && {
			time: '오후 08:15',
			value: 'T20:15:00',
			id: 81,
		}) ||
		(e.split('T')[1].substring(0, 5) === '20:30' && {
			time: '오후 08:30',
			value: 'T20:30:00',
			id: 82,
		}) ||
		(e.split('T')[1].substring(0, 5) === '20:45' && {
			time: '오후 08:45',
			value: 'T20:45:00',
			id: 83,
		}) ||
		(e.split('T')[1].substring(0, 5) === '21:00' && {
			time: '오후 09:00',
			value: 'T21:00:00',
			id: 84,
		}) ||
		(e.split('T')[1].substring(0, 5) === '21:15' && {
			time: '오후 09:15',
			value: 'T21:15:00',
			id: 85,
		}) ||
		(e.split('T')[1].substring(0, 5) === '21:30' && {
			time: '오후 09:30',
			value: 'T21:30:00',
			id: 86,
		}) ||
		(e.split('T')[1].substring(0, 5) === '21:45' && {
			time: '오후 09:45',
			value: 'T21:45:00',
			id: 87,
		}) ||
		(e.split('T')[1].substring(0, 5) === '22:00' && {
			time: '오후 10:00',
			value: 'T22:00:00',
			id: 88,
		}) ||
		(e.split('T')[1].substring(0, 5) === '22:15' && {
			time: '오후 10:15',
			value: 'T22:15:00',
			id: 89,
		}) ||
		(e.split('T')[1].substring(0, 5) === '22:30' && {
			time: '오후 10:30',
			value: 'T22:30:00',
			id: 90,
		}) ||
		(e.split('T')[1].substring(0, 5) === '22:45' && {
			time: '오후 10:45',
			value: 'T22:45:00',
			id: 91,
		}) ||
		(e.split('T')[1].substring(0, 5) === '23:00' && {
			time: '오후 11:00',
			value: 'T23:30:00',
			id: 92,
		}) ||
		(e.split('T')[1].substring(0, 5) === '23:15' && {
			time: '오후 11:15',
			value: 'T23:15:00',
			id: 93,
		}) ||
		(e.split('T')[1].substring(0, 5) === '23:30' && {
			time: '오후 11:30',
			value: 'T23:30:00',
			id: 94,
		}) ||
		(e.split('T')[1].substring(0, 5) === '23:45' && {
			time: '오후 11:45',
			value: 'T23:45:00',
			id: 95,
		})
	);
};
