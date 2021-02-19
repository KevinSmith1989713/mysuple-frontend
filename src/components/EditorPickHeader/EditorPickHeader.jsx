import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { ReactComponent as GrayBookmark} from '../../static/images/Header/GrayBookmark.svg'
import { ReactComponent as BlueBookmark} from '../../static/images/Header/BlueBookmark.svg'
import { ReactComponent as GrayCalendar} from '../../static/images/Header/GrayCalendar.svg'

import './EditorPickHeader.scss';

import moment from 'moment'

const EditorPickHeader = ({ info }) => {

	return (
		<div className="EditorPickHeader">
      <div className="EditorPickHeader--title">
      <div className="bookmark--img">
        <GrayBookmark/>
      </div>
      <div className="titles--info">
        <div className="subTitle">
          {info.main.editor_subTitle}
        </div>
        <div className="title">
          {info.main.editor_title}
        </div>
        <div className="date">
          <GrayCalendar/>
            {moment(info.main.createdAt).format("YYYY.MM.DD")}
        </div>
      </div>
    </div>
    <div className="EditorPickHeader--tags">
      {info.main.editor_tag.split(' ').map( (tag, index) => {
        return (
          <span className="tag" key={index}>{tag}</span>
        )
      })
      }    
    </div>
  </div>
	);
};

export default EditorPickHeader;