import React,{ useState,useEffect } from "react";
import { FC } from "react";

import { QuesItem } from './constant';



export interface QuestionProps {
  goBack:()=>void
}

export const Question: FC<QuestionProps> = ({goBack}) => {
 
  return (
  <div className="answer-wrap">
    
  </div>
  );
};
