import React,{ useEffect,useState } from "react";
import { FC } from "react";

import {
  HomeTwoTone,FrownTwoTone
} from '@ant-design/icons';
import { QuesItem } from './constant';
import { convertOptions } from './utils';

export interface MonitorProps {
  goBack:()=>void,
  lists:QuesItem[],
  anLists:number[]
}

export const Monitor: FC<MonitorProps> = ({goBack,lists,anLists}) => {
  const [score,setScore] = useState<number>(0)
  useEffect(()=>{
    if(lists.length && anLists.length){
      let count = 0,len = lists.length;
      lists.map((item,idx)=>{
        if(item.answer === anLists[idx]){
            count += 1;
        }
      })
      const temp = Math.floor(count/len)*100;
      setScore(temp);
    }
  },[lists,anLists])
  return (
  <div className="monitor-wrap">
   <div className="question-res-btn">
        <HomeTwoTone onClick={goBack}/>
    </div> 
    <div className="monitor-table"> 
    <div className="monitor-table-item">
        <div className="monitor-title">题目</div>
        <div className="monitor-ans  bRight">选择答案</div>
        <div className="monitor-ans">正确答案</div>
    </div>
    {
        lists && lists.length>0 && lists.map((item,idx)=>(
            <div className="monitor-table-item" key={`${item.topic}-${idx}`}>
             <div className="monitor-title">{idx+1}{'.'}{item.topic}</div>
             <div className="monitor-ans bRight">{ anLists[idx] != -1? convertOptions(anLists[idx]):''}</div>
             <div className="monitor-ans">{convertOptions(item.answer)}</div>
            </div>
        ))
    }
    <div className="monitor-table-item-last">
    <div className="monitor-title">
        <span>正确率:</span>
        <span className="monitor-per">{score}%</span>
    </div>
    </div>
    </div>
  </div>
  );
};
