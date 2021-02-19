import React from "react";
import classNames from "classnames";

import "./VideoCard.scss";

import Tag from '../../static/images/Card/tag@3x.png';

const VideoCard = ({ children, videoUrl, thumbnail, title, tag}) => {
  return (
    <div className={classNames("VideoCard", videoUrl, thumbnail, title, tag)}>
      <div className="VideoCard--card">
        <div className="card--bg"/>
        <img className="card--thumbnail"/>
        <img className="card--playbtn"/>
      </div>
      <div className="VideoCard--info">
        <div className="info-title">{title}</div>
        <div className="info-tag">
          <img src={Tag} alt="tag"/>
          {tag}
        </div>
      </div>


    </div>
  );
};

VideoCard.defaultProps = {
  size: "small",
  border: "none"
};

export default VideoCard;
