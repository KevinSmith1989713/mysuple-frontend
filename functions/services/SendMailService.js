/**
 * Send email service
 *
 * [Install]
 *  npm install nodemailer
 *
 * @since   2019-03-23
 * @author  shkim
 */

const emailSender = require('nodemailer');

module.exports = {
	send(params, callback) {
		const sender = {
			auth: {
				user: 'ksj8367@gmail.com',
				pass: '@rlatjs@wns1',
			},
			email: 'info@wondervari.com', // 메일에 표기될 주소
		};

		let toEmail = params.user.email;

		let transporter = emailSender.createTransport({
			service: 'gmail',
			auth: sender.auth,
		});

		// 메일 제목
		let subject = '테스트 이메일입니다.';
		let content = '테스트 이메일입니다.';
		// 본문 HTML에 바꿀 부분을 {header}, {body} 로 표기하고 아래와 같이 replace
		// content = content
		// 	.replace('{header}', messages.content.header)
		// 	.replace('{body}', messages.content.body)
		// 	.replace('{valueTitle}', messages.content.valueTitle)
		// 	.replace('{tempPassword}', params.tempPassword)
		// 	.replace('{footer}', messages.content.footer + ' ' + String(thisYear));
		let options = {
			from: 'ksj8367@gmail.com',
			to: toEmail,
			subject: subject,
			text: content, // text 보낼 때
			// html: params.email.content, // HTML 보낼 때
		};

		return transporter
			.sendMail(options)
			.then(res => {
				return callback(null, params);
			})
			.catch(err => {
				throw err;
				// return callback(err, params);
			});
	},
};
