import React, { Fragment } from 'react';
import './Header.scss';

import { connect } from 'react-redux';
import { changeMenu } from '../../store/Layout/Layout.store';
import styled from 'styled-components';

const CommunityHeaderBg = styled.div`
	@media (min-width: 768px) {
		position: absolute;
		z-index: -10;
		width: 100%;
		height: 520px;
		min-width: 1050px;
		/* background: ${props =>
			props.url
				? `linear-gradient(180deg, rgba(51, 51, 51, 0.9) 3%, rgba(51, 51, 51, 0.8) 7%, rgba(51, 51, 51, 0) 25%) fixed, url(${props.url})`
				: '#1e59ea'}
			center; */
			background: ${props => (props.url ? '#1e59ea' : '#1e59ea')};
		background-size: cover;
	}
	@media (max-width: 768px) {
		position: absolute;
		z-index: -10;
		width: 100%;
		height: 70px;
		/* background: ${props => (props.url ? `url(${props.url})` : '#1e59ea')}; */
		background: ${props => (props.url ? '#1e59ea' : '#1e59ea')};
		background-size: cover;
	}
`;
import HeaderMenu from '../HeaderMenu/HeaderMenu';
const Header = ({ changeMenu, pathname, url, menu, layout }) => {
	const gameCommunityId = pathname.split('/')[3];
	const eraseHeader = ['fourth', 'fifth', 'sixth'];
	const header = eraseHeader.indexOf(menu);
	return (
		<Fragment>
			<Fragment>
				{!gameCommunityId ? (
					window.location.pathname === '/' ? (
						<div className="header-bg header-bg-blue" />
					) : (
						<div className="header-bg " />
					)
				) : (
					<CommunityHeaderBg url={url} />
				)}
				<div className="Header">
					<div
						className={
							window.location.pathname.split('/')[2] > 1
								? 'Header--menu info'
								: 'Header--menu'
						}
						// className="Header--menu"
					>
						<HeaderMenu changeMenu={changeMenu} />
					</div>
				</div>
			</Fragment>
		</Fragment>
	);
};

Header.defaultProps = {
	url:
		'https://i.pinimg.com/originals/4c/a5/3b/4ca53bff154cec9e97d3d6d362456e19.jpg',
};

const mapStateToProps = state => {
	return {
		layout: state.layout.menu,
		menu: state.layout.joinSubMenu,
		pathname: state.router.location.pathname,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
