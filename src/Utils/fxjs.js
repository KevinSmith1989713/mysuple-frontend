class Fxjs {
	curry = f => (a, ...rest) =>
		rest.length ? f(a, ...rest) : (...rest) => f(a, ...rest);

	sum = this.curry((f, iter) => {
		return this.go(iter, this.map(f), this.reduce(this.add));
	});

	add = (a, b) => a + b;

	map = this.curry((f, iter) => {
		let res = [];

		for (let a of iter) {
			res.push(f(a));
		}

		return res;
	});

	filter = this.curry((f, iter) => {
		let res = [];

		for (let a of iter) {
			if (f(a)) {
				res.push(a);
			}
		}

		return res;
	});

	reduce = this.curry((f, acc, iter) => {
		if (!iter) {
			iter = acc[Symbol.iterator]();
			acc = iter.next().value;
		}

		for (const a of iter) {
			acc = f(acc, a);
		}

		return acc;
	});

	go = (...args) => this.reduce((a, f) => f(a), args);

	pipe = (f, ...fs) => (...as) => this.go(f(...as), ...fs);

	add = (a, b) => a + b;
}

export default Fxjs;
