import React,{ useState,useEffect } from "react";
import { FC } from "react";

import { QuesItem } from './constant';



export interface QuestionProps {
  goBack:()=>void,
  lists:any[]
}

export const Question: FC<QuestionProps> = ({goBack,lists}) => {
  const [current,setCurrent] = useState<number>(0);
 
  return (
  <div className="question-wrap">
    <div className="question-cxt-wrap">
    {
      lists.length>0 && lists.map((item,idx)=>)
    }
    </div>
  </div>
  );
};
