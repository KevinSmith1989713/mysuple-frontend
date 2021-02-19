import React, { useState } from "react";
import classNames from "classnames";

import Company from '../../static/images/Card/company@3x.png';
import calendar from '../../static/images/Card/Calendar@3x.png';
import tag from '../../static/images/Card/tag@3x.png';
import language from '../../static/images/GameInfo/Language@3x.png';
import player from '../../static/images/GameInfo/player@3x.png';

import "./TextWithIcon.scss";

const TextWithIcon = ({ icon, children, className }) => {
  return (
    <div className={classNames('TextWithIcon', className)}>
      <img src={icon}/>
      <div className="icon--info">
        { children }
      </div>
    </div>
  );
};


export default TextWithIcon;

