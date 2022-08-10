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
      lists.length > 0 && lists.map((item,idx)=>(
        <div className="question-cxt-item" key={`${item.topic}-${idx}`}>
            <div className="question-cxt-title">{idx+1}{'.'}{item.topic}</div>
            <div className="question-cxt-option">
                {
                    item.options?.length > 0 && item.options.map((option,oIdx)=>(
                        <div className="question-cxt-option" key={`${option}-${oIdx}`}>
                            <span className="">{oIdx}{'.'}</span>{option}
                        </div>
                    ))
                }
            </div>
        </div>
      ))
    }
    </div>
  </div>
  );
};
