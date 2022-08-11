import React,{ useState,useEffect } from "react";
import { FC } from "react";
import {
    HomeTwoTone
  } from '@ant-design/icons';
import { Col, Row } from 'antd';


export interface QuestionProps {
  goBack:()=>void,
  lists:boolean[]
}

export const Result: FC<QuestionProps> = ({goBack,lists}) => {
  return (
    <div className="question-res-wrap">
        <div className="question-res-btn">
         <HomeTwoTone onClick={goBack}/>
        </div>
        <div className="question-res-header">
        作答详情
        </div>
        <Row className="question-res-flag-wrap ">
            <Col span={4} offset={2}>
            <span className="question-res-correct question-res-flag"></span>
            <span>正确</span>
            </Col>
            <Col span={4} offset={2}>
            <span className="question-res-wrong question-res-flag"></span>
            <span>错误</span>
            </Col>
        </Row>
        <div className="question-list">
            {
                lists.length >0 && lists.map((item,idx)=>(
                        <div key={`${item}-${idx}`} className={item ? "question-res-correct":"question-res-wrong"}>{idx+1}</div>      
                )
                )
            }
        </div>
    </div>
  );
};
