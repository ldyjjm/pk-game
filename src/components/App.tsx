import type { AppContext } from "@netless/window-manager";
import React, { useEffect, useState,useMemo } from "react";

import {
  MemberIDType,
  useStorage,
  useMemberID
} from "./hooks";

import { ModeType,QuesItem } from './constant'

import { AddQues } from './AddQues';
import { Answer } from './Answer';
import { Waiting } from './Waiting';
import { Monitor } from './Monitor';

export interface SyncState {
  studentId: MemberIDType | null;
  teacherId: MemberIDType | null;
  questionLists:QuesItem[],
  answerLists:number[]
}

export interface AppProps {
  context: AppContext;
}



export function App({ context }: AppProps) {

 const [syncState,setSyncState] = useStorage<SyncState>(
  context,
  'question',
  ()=>({
    teacherId:null,
    studentId:null,
    questionLists:[],
    answerLists:[]
  })
 )
 const memberID = useMemberID(context);


 const isEntering = useMemo(()=>{
  if(syncState.questionLists.length > 0){
       return true;
  }
  return false
},[syncState.questionLists])
 
 const isShowWaiting = useMemo(() => {
  console.log(syncState,isEntering,syncState.teacherId === memberID && syncState.studentId === memberID && !isEntering);
  if (syncState.studentId === memberID && !syncState.teacherId) {
    return true;
  }
  if (syncState.teacherId === memberID && !syncState.studentId) {
    return true;
  }
  if (syncState.studentId === memberID  && !isEntering) {
    return true;
  }
  return false;
}, [syncState.teacherId, syncState.studentId, memberID,isEntering]);

 const [mode,setMode] = useState<number>(ModeType.Default);

 const login = ()=>{
  if (!syncState.studentId) {
    setSyncState({ studentId: memberID });
  } else if (!syncState.teacherId) {
    setSyncState({ teacherId: memberID });
  }
 }

 const isShowLogin = useMemo(() => {
  if (syncState.teacherId === memberID || syncState.studentId === memberID) {
    return false;
  }
  return !syncState.teacherId || !syncState.studentId;
}, [syncState.studentId, syncState.teacherId, memberID]);



// 获取题目列表
const finishedAdd = (lists:QuesItem[])=>{
  const len = lists.length;
  setSyncState({ questionLists: lists });
  // 为答案设置默认值
  const res = [];
  for(let i = 0;i<len;i++){
   res.push(-1);
  }
  setSyncState({ answerLists: res });
}

const collectAnswer = (lists:number[])=>{
  const len = syncState.answerLists.length;
  const res = [...lists,syncState.answerLists].slice(0,len);
  console.log('--collectAnswer-answerLists-',res);
  setSyncState({ answerLists: res });
}


  return (
  <div className="questionwrap">
     {
      mode === ModeType.Default && (
        <>
          {isShowLogin && <div className="common-btn" onClick={login}>你问我答</div>}
          {syncState.teacherId === memberID && <div className="common-btn" onClick={()=>setMode(ModeType.Input)}>添加题目</div>}
        </>
      )
    }
    {
      isShowWaiting && <Waiting />
    }
    {
      mode === ModeType.Input && !isEntering && (<AddQues goBack={finishedAdd}/>)
    } 
    {
      syncState.teacherId === memberID  && isEntering && <Monitor lists={syncState.questionLists} anLists={syncState.answerLists} goBack={()=>setMode(ModeType.Default)} />
    }
    {
      syncState.studentId === memberID && isEntering && (
      <Answer data={syncState.questionLists} handleChecked={collectAnswer}
        goBack={()=>setMode(ModeType.Default)}/>)
    }
  </div>  
  ) 
  
}
