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
  questionLists:QuesItem[];
  answerLists:number[];
  mode:number;
  restartStatus:boolean;
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
    answerLists:[],
    mode:ModeType.Default,
    restartStatus:false
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


 const login = ()=>{
  if (!syncState.studentId) {
    setSyncState({ studentId: memberID });
  } else if (!syncState.teacherId) {
    setSyncState({ teacherId: memberID,mode:ModeType.Input });
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
}

const collectAnswer = (lists:number[])=>{
  const res = [...lists];
  setSyncState({ answerLists: res });
}

// const [syncState.restartStatus,setRestartStatus] = useState<boolean>(false);

const isRestarting = useMemo(()=>{
  if(!!syncState.teacherId  && !!syncState.studentId && !!syncState.questionLists.length && 
    !!syncState.answerLists.length && (syncState.questionLists.length === syncState.answerLists.length)){
       return true;
  }
  return false;
},[syncState.teacherId,syncState.studentId,syncState.questionLists,syncState.answerLists])

const goBack = ()=>{
  setSyncState({ restartStatus:true });
}

const restart = ()=>{
  setSyncState({ answerLists: [],questionLists:[],restartStatus:false});
  if(syncState.teacherId === memberID){
    setSyncState({ mode:ModeType.Input });
  }
}

const isShowAddQuesBtn = useMemo(()=>{
if(syncState.teacherId === memberID && !isEntering){
return true;
}
return false;
},[syncState.teacherId, memberID,isEntering])

const isShowRestartBtn = useMemo(()=>{
  if(isRestarting && syncState.restartStatus){
    return true;
  }
  return false;
},[isRestarting,syncState.restartStatus])

const isShowWaitingCondition = useMemo(()=>{
  if(!syncState.restartStatus && isShowWaiting){
    return true;
  }
  return false;
},[syncState.restartStatus,isShowWaiting])

const isShowAddQuesCondition = useMemo(()=>{
  if(!syncState.restartStatus &&  (syncState.mode === ModeType.Input) && (syncState.teacherId === memberID) && !isEntering    ) return true;
  return false;
},[syncState.restartStatus,syncState.mode,syncState.teacherId,memberID,isEntering])

const isShowMonitorCondition = useMemo(()=>{
  if(!syncState.restartStatus && syncState.teacherId === memberID  && isEntering) return true;
  return false;
},[syncState.restartStatus,syncState.teacherId,memberID,isEntering])

const isShowAnswerCondition = useMemo(()=>{
  if(!syncState.restartStatus && syncState.studentId === memberID && isEntering) return true;
  return false;
},[syncState.restartStatus,syncState.studentId,memberID,isEntering])

  return (
  <div className="questionwrap">
     {
      syncState.mode === ModeType.Default && (
        <>
          { isShowLogin && <div className="common-btn" onClick={login}>你问我答</div>}
          { isShowAddQuesBtn && <div className="common-btn" onClick={()=>setSyncState({ mode: ModeType.Input })}>添加题目</div>}
        </>
      )
    }
    { isShowRestartBtn && <div className="common-btn" onClick={restart}>重新开始</div>}
    {
      isShowWaitingCondition && <Waiting />
    }
    {
      isShowAddQuesCondition && (<AddQues goBack={finishedAdd}/>)
    } 
    {
      isShowMonitorCondition && <Monitor lists={syncState.questionLists} anLists={syncState.answerLists} 
      goBack={goBack} />
    }
    {
      isShowAnswerCondition && (
      <Answer data={syncState.questionLists} handleChecked={collectAnswer}
        goBack={goBack}/>)
    }
  </div>  
  ) 
  
}
