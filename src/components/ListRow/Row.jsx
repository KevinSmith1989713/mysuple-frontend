import React, { useState } from "react";
import classNames from "classnames";
import "./Row.scss";
import NoImg from "../../static/images/Card/no_image@3x.png"
import Title from "../Title/Title";
import CardRadius from "../CardRadius/CardRadius";

const Row = ({ 
  type,
  img,
  rank,
  upDown,
  title,
  author,
  commentCnt,
  last,
  ...rest 
}) => {
  // type 
  // game : 인기게임
  // community 
  return (
    <div className={classNames("Row--component", img )}>
      {
        type==="game" && (
          <div className={classNames(type, last )}>
            <CardRadius size="thumbnail" deco="none" img={img}/>
            <div className={rank<=3 ? 'rank-high' : 'rank-low'}>{rank}</div>
            <div className='title'>{title}</div>
            <div className={upDown>0 ?'up' : upDown<0 ? 'down' : 'zero' }>
              {
                 upDown>0 && `▲ ${Math.abs(upDown)}`
              }
              {
                 upDown===0 && "─"
              }
              {
                 upDown<0 && `▼ ${Math.abs(upDown)}`
              }
            </div>
          </div>
        )
      }
      {
        type==="community" && (
          <div className={classNames(type, last )}>
            <div className="dot">·</div>
            <div className="title">{title}</div>
            <div className="commentCnt">{commentCnt}</div>
            <div className="author">{author}</div>
          </div>
        )
      }
    </div>
  );
};

Row.defaultProps = {
  type:'game',
  img: NoImg,
  
};

export default Row;
