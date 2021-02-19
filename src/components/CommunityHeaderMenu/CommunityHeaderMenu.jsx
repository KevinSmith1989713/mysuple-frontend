
import * as React from 'react';
import { withRouter, Link } from "react-router-dom"

import './CommunityHeaderMenu.scss';
import Title from '../Title/Title';
import People from '../../static/images/GameInfo/player@3x.png'
import Media from 'react-media';

const CommunityHeaderMenu = ({ menus, match }) => {
	return (
		<div className="CommunityHeaderMenu">
      <Media query={{ maxWidth: 768 }}>
        {
          matches => matches 
          ? (
            menus.map((menu)=>{
              if(menu.key === 'main'){
                return (
                  <Link to = {`/community/official/${match.id}`}
                        key = {menu.key} 
                        className={match.tab===undefined ? "menu__selected" : "menu"}>
                    <span>{menu.name}</span>
                  </Link>
                )
              }else{
                return (
                  <Link to = {`/community/official/${match.id}/${menu.key}`} 
                        key = {menu.key} 
                        className={match.tab===menu.key ? "menu__selected" : "menu"}>
                    <span>{menu.name}</span>
                  </Link>
                )
              }
            })
          )
          : (
            menus.map((menu)=>{
              if(menu.key != 'main'){
                return (
                  <Link to = {`/community/official/${match.id}/${menu.key}`} className="menu" key={menu.key}>
                    <span>{menu.name}</span>
                    {
                      match.tab===menu.key && 
                        <div className={`selected--bar`}/>
                    }
                  </Link>
                )
              }
            })
          )
        }
			</Media>
    </div>
	);
};
export default CommunityHeaderMenu;