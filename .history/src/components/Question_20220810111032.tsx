import React,{ useState,useEffect } from "react";
import { FC } from "react";

import { QuesItem } from './constant';



export interface QuestionProps {
  goBack:()=>void,
  lists:any[]
}

export const Question: FC<QuestionProps> = ({goBack,lists}) => {
 
  return (
  <div className="question-wrap">
    {
        lists.length>0 &&
    }
    
  </div>
  );
};
