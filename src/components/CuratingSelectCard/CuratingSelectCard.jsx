import React from 'react';
import './CuratingSelectCard.scss';
import { connect } from 'react-redux';

import { changeMenu } from '../../store/Layout/Layout.store';
import Header from '../../components/Header/Header';
import Title from '../../components/Title/Title';
import Checkbox from '../../components/CheckBox/CheckBox';
import ContentBoard from '../../components/ContentBoard/ContentBoard';
import RecommendHeader from '../../components/RecommendHeader/RecommendHeader';

const CuratingSelectCard = ({}) => {
		return (
			<div className="CuratingSelectCard">
        <img className="poster" src="https://cdn.shopify.com/s/files/1/1513/6238/products/bioshock-infinite-poster-video-game-poster-booker-dewitt-elizabeth_1024x1024.jpg?v=1496321086"/>
        <div className="game--info">
          <div className="title">바이오쇼크 인피니트</div>
          <div className="rel-date">2019</div>
        </div>
        <div className="game--checked">
          <Checkbox/>
        </div>
      </div>
  )
}

const mapStateToProps = state => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		changeMenu: menu => dispatch(changeMenu(menu)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CuratingSelectCard);
