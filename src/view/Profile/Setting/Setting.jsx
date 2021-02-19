import React, { Component } from 'react';
import './Setting.scss';
import Button from '../../../components/Button/Button';
import ProfileTitle from '../../../components/ProfileTitle/ProfileTitle';
import IosSwitch from '../../../components/IosSwitch/IosSwitch';

class Setting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alarm_main: true,
		};
		this.onChangeAlarm = this.onChangeAlarm.bind(this);
	}
	onChangeAlarm(e) {
		console.error(e);
		// this.setState({
		// 	[alarm.id]:Boolean(alarm.value)
		// })
	}
	render() {
		const { onClick } = this.props;
		const { alarm_main } = this.state;

		return (
			<div className="Setting">
				<ProfileTitle>설정</ProfileTitle>
				<div className="Setting--body">
					<div className="my-setting__alarm">
						<div className="alarm-main">
							<div className="main-title">알림</div>
							<IosSwitch
								id="alarm_main"
								size="large"
								value={alarm_main}
								onChange={e => this.onChangeAlarm(e)}
							/>
						</div>
						<div className="alarm-sub-main">
							<div className="sub-title__blue">게임정보</div>
							<IosSwitch size="small" />
						</div>
						<div className="alarm-sub">
							<div className="sub-title">선호게임</div>
							<IosSwitch size="small" />
						</div>
						<div className="alarm-sub">
							<div className="sub-title">세일정보</div>
							<IosSwitch size="small" />
						</div>
						<div className="alarm-sub">
							<div className="sub-title">업데이트 및 패치정보</div>

							<IosSwitch size="small" />
						</div>
						<div className="alarm-sub-main">
							<div className="sub-title__blue">커뮤니티</div>

							<IosSwitch size="small" />
						</div>
						<div className="alarm-sub">
							<div className="sub-title">내 글의 댓글 </div>
							<IosSwitch size="small" />
						</div>

						<div className="alarm-sub">
							<div className="sub-title">내 댓글의 댓글 </div>
							<IosSwitch size="small" />
						</div>
					</div>

					<div className="my-setting__interlock">
						<div className="alarm-main">
							<div className="main-title">연동</div>
							<IosSwitch size="large" />
						</div>
						<div className="alarm-sub-main">
							<div className="sub-title__blue">라이브러리 연동</div>
							<IosSwitch size="small" />
						</div>
					</div>

					<div className="my-setting__out">
						<div className="alarm-main">
							<div className="sub-title" onClick={() => onClick('withdraw')}>
								회원 탈퇴
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Setting;
