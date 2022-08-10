import React,{ useState,useEffect } from "react";
import { FC } from "react";

import { QuesItem } from './constant';
import { convertOptions } from './utils';



export interface QuestionProps {
  goBack:()=>void,
  lists:any[]
}

export const Question: FC<QuestionProps> = ({goBack,lists}) => {
  const [current,setCurrent] = useState<number>(0);

  const [active,setActive] = useState<number>(-1);

  const handleChecked = ()=>{
    
  }

  useEffect(()=>{
    if(active){
       setTimeout(()=>{
        setActive();
       },1000)
    }

  },[active])
 
  return (
  <div className="question-wrap">
    <div className="question-cxt-wrap">
    {
      lists.length > 0 && lists.map((item,idx:number)=>(
        current === idx && <div className="question-cxt-item" key={`${item.topic}-${idx}`}>
            <div className="question-cxt-title">{idx+1}{'.'}{item.topic}</div>
            <div className="question-cxt-option">
                {
                    item.options?.length > 0 && item.options.map((option:string,oIdx:number)=>(
                        <div className={ active ? "question-cxt-option-item-active":(


                        )} key={`${option}-${oIdx}`} onClick={()=>setActive(oIdx)}>
                            <>
                            <div className="question-cxt-option-sel">{convertOptions(oIdx)}{'.'}</div>
                            <div className="question-cxt-option-inner">{option}</div>
                            </>
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
