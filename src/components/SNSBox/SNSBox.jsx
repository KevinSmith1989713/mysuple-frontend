import React, { useState } from 'react';

import './SNSBox.scss';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import KaKaoLogin from 'react-kakao-login';

import Google_L from '../../static/images/SNSLogin/google.png';
import Facebook_L from '../../static/images/SNSLogin/Facebook.png';
import KakaoTalk_L from '../../static/images/SNSLogin/Kakaotalk.png';

const SNSBox = ({
	type,
	children,
	className,
	selected,
	emailCheck,
	reqSocialSignIn,
	signUp,
	...rest
}) => {
	const responseGoogle = e => {
		const email = e.profileObj.email;
		const name = e.profileObj.name;
		const avatar_url = e.profileObj.imageUrl;
		const platform = 'g';

		reqSocialSignIn(email, platform, name, avatar_url);
	};

	const loginWithFacebook = e => {
		const email = e.email;
		const name = e.name;
		// const avatar_url = e.picture.data.url;
		const platform = 'f';

		reqSocialSignIn(email, platform, name);
	};

	const responseKaKao = res => {
		const email = res.profile.kakao_account.email;
		const name = res.profile.kakao_account.profile.nickname;
		const avatar_url = res.profile.kakao_account.profile.profile_image_url;
		const platform = 'k';

		reqSocialSignIn(email, platform, name, avatar_url);
	};

	return (
		<div className={`SNSBox-${type}`}>
			<div className={`SNSBox-login--section`}>
				<GoogleLogin
					clientId="309525468507-aq28dan5mr3h9j5atd93qpiagrrc1qpe.apps.googleusercontent.com"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={'single_host_origin'}
					// disabled
				>
					{type !== 'join' ? '구글로 로그인' : '구글 연동'}
				</GoogleLogin>
				<img className="logo" alt="facebook" src={Google_L} />
			</div>
			<div className={`SNSBox-login--section`}>
				<FacebookLogin
					// appId="555155165191369"
					appId="2864841633736729"
					autoLoad={false}
					fields="name,email,picture"
					icon={Facebook_L}
					textButton={type !== 'join' ? '페이스북으로 로그인' : '페이스북 연동'}
					callback={loginWithFacebook}
				/>
				<img className="logo" alt="facebook" src={Facebook_L} />
			</div>
			<div className={`SNSBox-login--section`}>
				<KaKaoLogin
					jsKey="2104391f817f495da19cdd1b00cfac6a"
					buttonText={type !== 'join' ? '카카오로 로그인' : '카카오 연동'}
					onSuccess={responseKaKao}
					onFailure={err => console.error(err)}
					getProfile={true}
				/>
				<img className="logo" alt="kakaotalk" src={KakaoTalk_L} />
			</div>
		</div>
	);
};

export default SNSBox;
