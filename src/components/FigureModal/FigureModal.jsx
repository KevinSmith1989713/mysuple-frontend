import React, { useState } from 'react';
import classNames from "classnames";
import Modal from '../Modal/Modal'

import './FigureModal.scss';
import Title from '../Title/Title';

const FigureModal = ({ isOpen, close }) => {
  return (
    <Modal className="FigureModal" isOpen={isOpen} close={()=>close()}>
      <div className="FigureModal--Header">
        <Title size="large" border="thick" >나의 진열장</Title>
      </div>
      <div className="FigureModal--Info">
        <img className="figure"/>
        <Title size="large" border="no" className="figure--name">광선검 우주오리</Title>
        <div className="figure--serial">
          <span className="number">No.012</span>
          <span className="rank">Normal</span>
          <span className="type">피규어</span>
        </div>
        <div className="figure--story">
          신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다. 공무원의 신분과 정치적 중립성은 법률이 정하는 바에 의하여 보장된다. 
        </div>
      </div>
    </Modal>
  )
}
export default FigureModal;