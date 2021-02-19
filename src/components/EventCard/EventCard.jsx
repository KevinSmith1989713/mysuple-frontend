import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import { ReactComponent as NoteIcon} from '../../static/images/Community/NoteIcon.svg';

import './EventCard.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';

const EventCard = ({
  info,
  size,
  type,
  match,
  ...rest
}) => {
  const id = info.official_page_event_id || info.official_page_dev_note_id || info.official_page_notice_id || undefined;
	return (
    <Link to={type==='event' ? `${match.url}/event/${id}` : `${match.url}/${id}`}  className={classNames(`EventCard--${size}`, `EventCard--${type}`)}>
      {
        type === 'dev' ? (
          <>
            <div className="EventCard--Title">
              <div className="title">{info.title}</div>
              <div className="date">{info.createdAt && moment(info.createdAt).format('YYYY.MM.DD')}</div>
            </div>
            <div className="EventCard--Image">
              {
                !!info.thumbnail 
                  ? <div className="EventCard--Image">
                      <img src={info.thumbnail}/>
                    </div> 
                  : <div className="EventCard--Image__none">
                      <NoteIcon/>
                    </div>
              }
            </div>
          </>
        ) : (
          <>
            {
              !!info.thumbnail 
                ? <div className="EventCard--Image">
                    <img src={info.thumbnail}/>
                  </div> 
                : <div className="EventCard--Image__none">
                    <NoteIcon/>
                  </div>
            }
            <div className="EventCard--Title">
              <div className="title">{info.title}</div>
              <div className="date">{info.createdAt && moment(info.createdAt).format('YYYY.MM.DD')}</div>
            </div>
          </>
        )
      }
    </Link>
	);
};

export default EventCard;
