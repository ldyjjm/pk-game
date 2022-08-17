export enum ModeType {
    Default,
    Input,
    Answer
}

export const DefaultOptionValue = {
    topic:'',
    options:['','',''],
    answer:0
}

export const DefaultOptionsNum:number = 3

export const MaxOptionsNum:number = 26

// 题目
export interface QuesItem {
    topic:string;
    options:string[];
    answer:number;
}

export const Clock:number