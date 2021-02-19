module.exports = {
	/**
	 *
	 * @description 폰 포맷으로 변경
	 * @param {*} phone
	 * @returns
	 */
	phoneFormat(phone) {
		if (!!phone) {
			if (/^([0-9]{3})-([0-9]{4})-([0-9]{4})$/.test(phone)) {
				return phone;
			} else {
				return phone
					.toString()
					.replace(/^([0-9]{3})([0-9]{4})([0-9]{4})$/, '$1-$2-$3');
			}
		}
	},

	blindEmail(email) {
		const id = email.split('@')[0];
		const domain = email.split('@')[1];

		if (id.length <= 4) {
			return (
				id
					.toString()
					.replace(
						/^([A-Za-z0-9_\.\-]{2})([A-Za-z0-9_\.\-]{0,})$/gi,
						`$1${module.exports.makeWild(id.length - 2)}`,
					) +
				'@' +
				domain
			);
		} else {
			return (
				id
					.toString()
					.replace(
						/^([A-Za-z0-9_\.\-]{4})([A-Za-z0-9_\.\-]{0,})$/gi,
						`$1${module.exports.makeWild(id.length - 4)}`,
					) +
				'@' +
				domain
			);
		}
	},

	makeWild(index) {
		let array = [];
		for (let i = 0; i < index; i++) {
			array.push('*');
		}

		return array.join('');
	},

	left(str, n) {
		if (n <= 0) return '';
		else if (n > String(str).length) return str;
		else return String(str).substring(0, n);
	},

	right(str, n) {
		if (n <= 0) return '';
		else if (n > String(str).length) return str;
		else {
			var iLen = String(str).length;

			return String(str).substring(iLen, iLen - n);
		}
	},

	parseDate(date) {
		if (!!date) {
			const list = date.split('-');
			let dateList = [];
			list.map((item, idx) => {
				let n = Number(item);
				idx < 1
					? dateList.push(n)
					: n > 10
					? dateList.push(n)
					: dateList.push(`0${n}`);
			});

			return dateList.join('-');
		} else {
			return '';
		}
	},
};
