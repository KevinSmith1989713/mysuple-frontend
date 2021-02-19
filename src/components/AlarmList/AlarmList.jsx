import React from 'react';
import './AlarmList.scss';

const AlarmList = ({ alarmList }) => {
  return (
    <div className="AlarmList">
      <div className="small--title">알림</div>
      <div className="Alarm--list">
        {
          alarmList.map((alarm, index) => {
            const typeText = alarm.alarm_type;
            const alarmType = alarm.alarm_type === 'invite' ? '초대' : alarm.alarm_type === "answer" ? '답변' : alarm.alarm_type === "comment" ? "댓글" : null;
            return (
              <div className="Alarm--row" key={index}>
                <span className="type">[{alarmType}]</span>
                <span className="infoText">
                  { typeText === 'invite' &&(`${alarm.nickname} 님이 `) }
                  { typeText === 'answer' &&( "1:1 문의하신 질문에 답변이 달렸습니다. ")}
                  { typeText === 'comment' && (`${alarm.nickname} 님이 댓글을 달렸습니다 ` ) }
                </span>
                <span className="infoBlue">
                  { typeText === 'invite' &&(`${alarm.colleague_name} `)}
                  { typeText === 'answer' &&("'"+alarm.question_title+"'")}
                  { typeText === 'comment' && ("'"+alarm.comment+"'")}
                </span>
                <span className="infoText">
                  { typeText === 'invite' &&("에 초대하셨습니다.") }
                </span>
                <div className="time--ago">
                  {alarm.createdAt}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AlarmList;