import React,{ useState } from 'react';
import './Withdraw.scss';

import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import CheckBox from '../../../components/CheckBox/CheckBox';
import { withdrawRadioOption } from '../../../assets/dummyData/ProfileData'
import Radio from '../../../components/Radio/Radio';
const Withdraw = ({ userInfo, onClick }) => {
	const [withdraw, setWithdraw] = useState(false);

	const checkWithdraw = () => {
		if(withdraw){
			onClick('withdrawConfirm')
		}
		else{
			alert('회원 탈퇴 동의를 체크해주세요')
		}
	}
	return (
		<div className="Withdraw">
			<ProfileTitle>회원 탈퇴</ProfileTitle>
			<div className="withdraw--row">
				<div className="withdraw--title">탈퇴 안내</div>
				<div className="withdraw--explain">탈퇴 안내</div>
			</div>
			<div className="withdraw--row">
				<div className="withdraw--title">개인정보 약관 알림</div>
				<div className="withdraw--explain">탈퇴 안내</div>
			</div>
			<div className="withdraw--row">
				<div className="withdraw--title">탈퇴 이유</div>
				<div className="withdraw--explain">
					<Radio radioPosition={'left'}radioOptions={withdrawRadioOption}/>
				</div>
			</div>
			<div className="withdraw--last-row">
				<div className="allow-all">위 시안에 모두 동의하십니까? </div>
				<div className="allow-all-check">
					<CheckBox checked={withdraw} onClick={()=>setWithdraw(!withdraw)}>예, 동의합니다</CheckBox>
				</div>
			</div>
			<div className="withdraw--confirm">
				<div className="withdraw--confirm__btn" 
						 onClick={()=>checkWithdraw()}>회원탈퇴</div>
			</div>
		</div>
	);
};

export default Withdraw;

