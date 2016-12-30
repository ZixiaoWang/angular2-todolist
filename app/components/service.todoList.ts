import { Injectable } from '@angular/core';
import { Memo } from './interface.memo';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class TodoList{
    private latestId:number = 1;

    private _todolistArray:Array<Memo> = [];
    private _todolistHash:any = {
        "2016":{
            "11":{
                "30":{
                    id:1,
                    time:1482471947398,
                    urgent:[
                        { memo:'I will do something', status:true },
                        { memo:'Buy apples while on the way home', status:true }
                    ],
                    normal:[
                        { memo:'Watch angular 2 tutorial before going to bed', status:true }
                    ]
                }
            }
        }
    };
    public todolistHash = new Subject<any>();
    public todolistArray = new Subject<Array<Memo>>();
    public todolistArray$ = this.todolistArray.asObservable();
    public todolistHash$ = this.todolistHash.asObservable();

    constructor(){
        this._todolistArray.push(
            this._todolistHash['2016']['11']['30']
        )
        this.todolistArray.next(this._todolistArray);
    }

    getMemoHash():any{
        return this._todolistHash;
    }

    getMemoArray():Array<Memo>{
        return this._todolistArray;
    }

    getLatestId():number{
        return this.latestId;
    }

    addMemo(memo:Memo):void{
        let memoMoment = new Date(memo.time);
        let memoYear = memoMoment.getFullYear();
        let memoMonth = memoMoment.getMonth();
        let memoDate = memoMoment.getDate();

        if( 
            this._todolistHash[memoYear]  &&
            this._todolistHash[memoYear][memoMonth] &&
            this._todolistHash[memoYear][memoMonth][memoDate]
        ){
            if(memo.urgent.length > 0){
                this._todolistHash[memoYear][memoMonth][memoDate].urgent = 
                this._todolistHash[memoYear][memoMonth][memoDate].urgent.concat(memo.urgent);
            }
            if(memo.normal.length > 0){
                this._todolistHash[memoYear][memoMonth][memoDate].normal = 
                this._todolistHash[memoYear][memoMonth][memoDate].normal.concat(memo.normal);
            }
        }else{
            if( !this._todolistHash[memoYear] ){ this._todolistHash[memoYear] = {}; }
            if( !this._todolistHash[memoYear][memoMonth] ){ this._todolistHash[memoYear][memoMonth] = {}; }
            if( !this._todolistHash[memoYear][memoMonth][memoDate] ){ this._todolistHash[memoYear][memoMonth][memoDate] = {}; }

            this._todolistHash[memoYear][memoMonth][memoDate] = memo;
            this.latestId = memo.id;
        }
        this.updateArray();
        this.todolistHash.next(this._todolistHash);
        window.todolistarray = this._todolistArray;
        window.todolistHash = this._todolistHash;
    }

    updateArray():void{
        this._todolistArray = [];
        for(let year in this._todolistHash){
            for(let month in this._todolistHash[year]){
                for(let day in this._todolistHash[year][month]){
                    this._todolistArray.push(this._todolistHash[year][month][day]);
                }
            }
        }
        this.todolistArray.next(this._todolistArray);
    }
}