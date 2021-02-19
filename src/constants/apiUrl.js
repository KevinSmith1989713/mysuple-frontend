export const url = {
	suple:
		process.env.NODE_ENV === 'development'
			? 'https://us-central1-react-suple-main.cloudfunctions.net'
			: 'https://us-central1-react-suple-main.cloudfunctions.net',

	file:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:4000'
			: 'https://spp.life',
	// 'https://spp.life'
	// https://suple.gg
	// http://localhost:4000

	elastic:
		process.env.NODE_ENV === 'development'
			? 'http://34.82.14.41:9200'
			: 'http://34.82.14.41:9200',
};

console.log(
	'this app is Service',
	`${process.env.NODE_ENV.substr(0, 2)}-${url.suple.substr(21, 4)}`,
);
