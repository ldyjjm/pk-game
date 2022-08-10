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

  const [active,setActive] = useState<boolean>(false);

  const [currentAns,setCurrentAns] = useState<number>(-1);
 
  let temp:number = -1;
  const handleChecked = (idx:number)=>{
    setActive(true);
    temp = idx;
    setCurrentAns(idx);
  }

  useEffect(()=>{
    if(active){
       setTimeout(()=>{
        setActive(false);
       },2000);
       console.log('--美滋滋--',active);
    }
    console.log('-wrap-美滋滋--',active,currentAns);
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
                        <div className={ 
                            active ? (
                                currentAns === oIdx ? "question-cxt-option-item-active":"question-cxt-option-item"
                            ):(
                                currentAns === -1  ? "question-cxt-option-item":(
                                    cu ? "question-cxt-option-item":"question-cxt-option-item-wrong"
                                )
                                
                            )
                            // !active && currentAns === -1 ? "question-cxt-option-item":(
                            //     active ? (currentAns === oIdx ?(
                            //         "question-cxt-option-item-active"
                            //     ):("question-cxt-option-item")):(
                            //         currentAns === item.answer && currentAns === oIdx ? "question-cxt-option-item-correct":"question-cxt-option-item-wrong"
                            //     )
                            // )
                        //     active ? (
                        //     currentAns === oIdx ? "question-cxt-option-item-active":"question-cxt-option-item"
                        // ):(
                        //     currentAns === item.answer ? "question-cxt-option-item-correct":
                        //     (currentAns === -1 ? "question-cxt-option-item":"question-cxt-option-item-wrong")
                        // )

                        } key={`${option}-${oIdx}`} onClick={()=>handleChecked(oIdx)}>
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
