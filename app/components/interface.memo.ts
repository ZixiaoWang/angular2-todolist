interface MemoItem {
    memo:string,
    status:boolean
}

export interface Memo {
    id:number,
    time:number,
    urgent:Array<MemoItem>
    normal:Array<MemoItem>
}