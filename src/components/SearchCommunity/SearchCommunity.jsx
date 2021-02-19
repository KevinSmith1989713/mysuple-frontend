import React, { useState, Fragment } from 'react';
import './SearchCommunity.scss';


const SearchCommunity = ({ keyword, info }) => {
	return (
		<div className="SearchCommunity">
		  <div className="SearchCommunity--Title">
        <div className="title">{getHighlightedText(info.title, keyword)}</div>
        <div className="date">{info.date}</div>
      </div>
      <div className="SearchCommunity--desc">
        {getHighlightedText(info.desc, keyword)}
      </div>
		</div>
	);
};

export default SearchCommunity;

const getHighlightedText = (text, keyword) => {
    let parts = text.split(new RegExp(`(${keyword})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === keyword.toLowerCase() ? { color:'#1e59ea',fontWeight:'bold' } : {} }>
            { part }
        </span>)
    } </span>;
}