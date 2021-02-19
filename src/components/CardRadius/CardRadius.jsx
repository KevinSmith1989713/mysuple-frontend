import React, { useState } from "react";
import classNames from "classnames";
import "./CardRadius.scss";

const CardRadius = ({ 
  size,
  className,
  img,
  gradient,
  deco,
  textTop,
  textBot,
  ...rest 
}) => {

  return (
    <div className={classNames("CardRadius--component", size)}>
      <div className={classNames("CardRadius", size, className, gradient, deco )}>
        <div className={gradient ? `${size}-gradient gradient-${gradient}` : 'CardRadius--none'}/>
        <img className={`${size}-poster`} src={img}/>
        {textTop && makeTextLine(size, textTop, textBot)}
      </div>
    </div>
  );
};

const makeTextLine = (size, textTop, textBot) => {
  return (
    <div className={classNames("Inner--text", size, textTop, textBot )}>
      <div className="top">{textTop}</div>
      <div className="bot">{textBot}</div>
    </div>
  )
}

CardRadius.defaultProps = {
  size: "medium",
  img: null,
  gradient: null,
  textTop:null,
  textBot:null,
};

export default CardRadius;
