import React, { useState } from "react";
import classNames from "classnames";

import window from '../../static/images/OSTable/Window.png'
import mac from '../../static/images/OSTable/Mac.png'
import linux from '../../static/images/OSTable/Linux.png'

import "./OSTable.scss";

const OSTable = ({ info }) => {
  
  const [OS, selectedOS] = useState('Windows');


  return (
    <div className='OSTable'>
      <div className="OSTable--Header">
        {
          info.map(( os, index) => {
            return(
              <div className={ OS === os.id ? "Header--OS__selected" : "Header--OS"} 
                   onClick={()=>selectedOS(os.id)}>
                {os.id}
              </div>
            )
          })
        }
      </div>
      <div className="OSTable--Data">
        <div className="Data-low">
          <div className="Data-title">최소</div>
          <div className="Data">
            <div className="sub-title">지원사양</div>
            <div className="spec">
              {
                info.map(os => {
                  if(OS===os.id){
                    return (!!os.min ? os.min : '등록된 정보가 없습니다')
                  }
                })
              }
            </div>
          </div>
        </div>
        <div className="Data-stable">
          <div className="Data-title">최적</div>
          <div className="Data">
            <div className="sub-title">지원사양</div>
            <div className="spec">
              {
                info.map(os => {
                  if(OS===os.id){
                    return (!!os.stable ? os.stable : '등록된 정보가 없습니다')
                  }
                })
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OSTable;