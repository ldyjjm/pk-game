import type { AppContext } from "@netless/window-manager";

import React, { useEffect, useState,useMemo } from "react";

import {
  PlayerIDType,
  useStorage,
  useMembers,
  useMemberID,
  useWritable
} from "./hooks";

import { ModeType } from './constant'

import { AddQues } from './AddQues';
import {}

export interface SyncState {

}

export interface AppProps {
  context: AppContext;
}


export function App({ context }: AppProps) {

 const [syncState,setSyncState] = useStorage<SyncState>(
  context,
  'question',
  ()=>({
  })
 )
 const [mode,setMode] = useState<number>(ModeType.Default);

  return (
  <div className="questionwrap">
    {
      mode === ModeType.Default && (
        <>
          <div className="common-btn" onClick={()=>setMode(ModeType.Input)}>添加题目</div>
          <div className="common-btn"onClick={()=>setMode(ModeType.Answer)}>参与答题</div>
        </>
      )
    }
    {
      mode === ModeType.Input && (<AddQues goBack={()=>setMode(ModeType.Default)}/>)
    }
    {
      mode === ModeType.Answer && (<AddQues goBack={()=>setMode(ModeType.Default)}/>)
    }
  </div>  
  ) 
  
}
