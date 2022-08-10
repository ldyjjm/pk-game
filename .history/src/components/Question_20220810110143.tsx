import React,{ useState,useEffect } from "react";
import { FC } from "react";

import { QuesItem } from './constant';



export interface QuestionProps {
  goBack:()=>void
}

export const Question: FC<QuestionProps> = ({goBack}) => {
  const [lists,setLists] = useState<Array<QuesItem>>([]);
  useEffect(()=>{
    const storage = localStorage.getItem('question');
    if(storage){
        const res = JSON.parse(storage);
       setLists([...res]);
    }
  },[])
  return (
  <div className="answer-wrap">
    {
        lists.length === 0 ? (
            <div className="answer-no-data">
            <p className="answer-no-data-txt">题库为空，请先添加题目</p>
            <div className="common-btn" onClick={goBack}>返回首页</div>
          </div>
        ):(
            <div className="answer-wrap">
                
            </div>
        )
    }  
  </div>
  );
};