import React,{ useState,useEffect } from "react";
import { FC } from "react";

import { QuesItem,Clock } from './constant';



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
        return prevCount + 1;
      });
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  
  作者：前端狗都不学
  链接：https://juejin.cn/post/7020776405751300132
  来源：稀土掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
  })
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
