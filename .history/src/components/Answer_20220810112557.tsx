import React,{ useState,useEffect } from "react";
import { FC } from "react";

import { QuesItem,Clock } from './constant';
import { Question } from './Question'



export interface AnswerProps {
  goBack:()=>void
}

export const Answer: FC<AnswerProps> = ({goBack}) => {
  const [lists,setLists] = useState<Array<QuesItem>>([]);
  useEffect(()=>{
    const storage = localStorage.getItem('question');
    if(storage){
        const res = JSON.parse(storage);
       setLists([...res]);
    }
  },[])
  const [count,setCount] = useState<number>(Clock);
  useEffect(()=>{
    const timer = window.setInterval(() => {
      setCount((prevCount) => {
        return prevCount - 1;
      });
    }, 1000);
    if(count === 0 ){
       if(timer){
        clearInterval(timer);
        return;
       }
    }
    return () => {
      clearInterval(timer);
    };
  },[count])
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
              {
                count !== 0 ?(<div className="answer-clock-">
                  <div className="answer-clock">{count}</div>
                  </div>):(
                  <Question lists={lists} goBack={goBack}/>
                )
              }
            </div>
        )
    }  
  </div>
  );
};
