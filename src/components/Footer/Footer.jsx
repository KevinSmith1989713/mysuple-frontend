// @flow
import * as React from 'react';
import './Footer.scss';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Rocket from '../../static/images/Footer/Rocket.png';
import Share from '../../static/images/Footer/Share.png';
import Person from '../../static/images/Footer/Person.png';
import SuplerPlayerGray from '../../static/images/Footer/Logo_superplayer_grayscale.png';

import {
	changeMenu,
	changeProfileSubMenu,
} from '../../store/Layout/Layout.store';

import { ReactComponent as Facebook } from '../../static/images/Footer/Facebook.svg';
import { ReactComponent as Youtube } from '../../static/images/Footer/Youtube.svg';

const Footer = ({
	changeMenu,
	changeProfileSubMenu,
	userInfo,
	menu,
	layoutText,
	...rest
}) => {
	const eraseHeader = ['fourth', 'fifth', 'sixth'];
	const footer = eraseHeader.indexOf(menu);
	return (
		<React.Fragment>
			<div className="Footer">
				<div className="Footer-top">
					<div className="top-menus">
						<Link to={'/notice'} className="top-mypage">
							<img src={Person} alt="alert" />
							공지사항
						</Link>
						<Link to={'/faq'} className="top-sns">
							<img src={Share} alt="calendar" />
							FAQ
						</Link>
						<Link to={'/inquiry'} className="top-company">
							<img src={Rocket} alt="chart" />
							고객센터
						</Link>
					</div>
				</div>
				<div className="Footer-bot">
					<Media query={{ maxWidth: 768 }}>
						{matches =>
							matches ? (
								<div className="bot-menus">
									<div className="contact-line">
										<img src={SuplerPlayerGray} />
										<div className="span">
											<span>
												<Youtube />
												Youtube
											</span>
											<a href="https://www.facebook.com/suple.superplayer/?__tn__=kC-R&eid=ARBZQ6TvRPeSQ8kbW9BB-1-0-EMA07EDD7O94Iv7hHGImyyh1sQUcQkET-zpr5X3o6UfM2roV1SPZSQ8&hc_ref=ARQd52FVG-p0e9f8IrpFVhIo_A24a_GrXh_ZTJxwXZaiwhP02zIPkCBHLp-ymS10XoE&fref=nf&__xts__[0]=68.ARCfcdKqmHBG83YjBMyBxdEMBvZLz_6vTjW-3Ilj9_EIxOVOxtlV7cfS5DFGtS6odhEwl16ayVHNgFcDCexAen1bFAjifRhamHdTKLyjPjszpZrn993KW_MdaWyUQ8KTw-GjOL-y0mJuuw6_H24siSV4MEm3mxOags-rGjfE8ZcS81A8p4dnr5Dn0AkMzKRG91liT_kaX1zzqk57GnIjibcEywmR5oLMPIKTcuhEkrBXZbdio7x9YgX1zHkTZXu1jRGH8qK6lT3AgfA5GejhAf5I6BtB8B0O2NWbHnFAD9cdUCVK3ddjOLoHCpnaKbz9ZZgN_jQ0rSsSTiJPNY5bFxY">
												<span>
													<Facebook />
													Facebook
												</span>
											</a>
											{/* <span>contact us</span> */}
										</div>
									</div>
									<div className="terms-line">
										<Link to="/terms">
											<span className="term">이용약관 / 개인정보 처리방침</span>
										</Link>
										<div className="last">
											사업자번호 : 757-88-01307 <br />
											대표: 김수연 <br />
											연락처 :070-8064-4210
										</div>
										<span className="last">
											주소 : 서울시 서대문구 연세로 5나길 49 304
										</span>
										<span className="last">
											COPYRIGHT@(주)원더베리 ALL RIGHTS RESERVED
										</span>
									</div>
								</div>
							) : (
								<div className="bot-menus">
									<img src={SuplerPlayerGray} />
									<div className="bot-menu">
										<div className="contact-line">
											<span>
												<Youtube />
												Youtube
											</span>
											<a href="https://www.facebook.com/suple.superplayer/?__tn__=kC-R&eid=ARBZQ6TvRPeSQ8kbW9BB-1-0-EMA07EDD7O94Iv7hHGImyyh1sQUcQkET-zpr5X3o6UfM2roV1SPZSQ8&hc_ref=ARQd52FVG-p0e9f8IrpFVhIo_A24a_GrXh_ZTJxwXZaiwhP02zIPkCBHLp-ymS10XoE&fref=nf&__xts__[0]=68.ARCfcdKqmHBG83YjBMyBxdEMBvZLz_6vTjW-3Ilj9_EIxOVOxtlV7cfS5DFGtS6odhEwl16ayVHNgFcDCexAen1bFAjifRhamHdTKLyjPjszpZrn993KW_MdaWyUQ8KTw-GjOL-y0mJuuw6_H24siSV4MEm3mxOags-rGjfE8ZcS81A8p4dnr5Dn0AkMzKRG91liT_kaX1zzqk57GnIjibcEywmR5oLMPIKTcuhEkrBXZbdio7x9YgX1zHkTZXu1jRGH8qK6lT3AgfA5GejhAf5I6BtB8B0O2NWbHnFAD9cdUCVK3ddjOLoHCpnaKbz9ZZgN_jQ0rSsSTiJPNY5bFxY">
												<span>
													<Facebook />
													Facebook
												</span>
											</a>
											{/* <span>contact us</span> */}
										</div>
										<div className="terms-line">
											<Link to="/terms">
												<span className="term">
													이용약관 / 개인정보 처리방침
												</span>
											</Link>
											<div>
												<div className="host">
													사업자번호 : 757-88-01307 대표: 김수연 연락처
													:070-8064-4210
												</div>
												<span className="host">
													주소 : 서울시 서대문구 연세로 5나길 49 304
												</span>
												<div className="last">
													COPYRIGHT@(주)원더베리 ALL RIGHTS RESERVED
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						}
					</Media>
				</div>
			</div>
			{/* ) : (null)} */}
		</React.Fragment>
	);
};

export default connect(
	({ auth, layout }) => ({
		userInfo: auth.userInfo,
		menu: layout.joinSubMenu,
		layoutText: layout.menu,
	}),
	{ changeMenu, changeProfileSubMenu },
)(Footer);
