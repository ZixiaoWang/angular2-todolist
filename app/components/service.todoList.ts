import { Injectable, OnInit } from '@angular/core';
import { Memo } from './interface.memo';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class TodoList implements OnInit{
    private latestId:number = 1;
    public todolistHash:any = {
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
    }
    private _todolistArray:Array<Memo> = [];
    public todolistArray = new Subject<Array<Memo>>();
    public todolistArray$ = this.todolistArray.asObservable()

    ngOnInit(){
        this._todolistArray.push(
            this.todolistHash['2016']['11']['30']
        )
        this.todolistArray.next(this._todolistArray);
    }

    getMemoHash():any{
        return this.todolistHash;
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
            this.todolistHash[memoYear]  &&
            this.todolistHash[memoYear][memoMonth] &&
            this.todolistHash[memoYear][memoMonth][memoDate]
        ){
            if(memo.urgent.length > 0){
                this.todolistHash[memoYear][memoMonth][memoDate].urgent = 
                this.todolistHash[memoYear][memoMonth][memoDate].urgent.concat(memo.urgent);
            }
            if(memo.normal.length > 0){
                this.todolistHash[memoYear][memoMonth][memoDate].normal = 
                this.todolistHash[memoYear][memoMonth][memoDate].normal.concat(memo.normal);
            }
        }else{
            if( !this.todolistHash[memoYear] ){ this.todolistHash[memoYear] = {}; }
            if( !this.todolistHash[memoYear][memoMonth] ){ this.todolistHash[memoYear][memoMonth] = {}; }
            if( !this.todolistHash[memoYear][memoMonth][memoDate] ){ this.todolistHash[memoYear][memoMonth][memoDate] = {}; }

            this.todolistHash[memoYear][memoMonth][memoDate] = memo;
            this.latestId = memo.id;
        }
        this.updateArray();
        window.todolistarray = this._todolistArray;
        window.todolisthash = this.todolistHash;
    }

    updateArray():void{
        this._todolistArray = [];
        for(let year in this.todolistHash){
            for(let month in this.todolistHash[year]){
                for(let day in this.todolistHash[year][month]){
                    this._todolistArray.push(this.todolistHash[year][month][day]);
                }
            }
        }
        this.todolistArray.next(this._todolistArray);
    }
}