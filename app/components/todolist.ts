import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { TodoList } from './service.todoList';
import { Memo } from './interface.memo';

@Component({
    selector:'todo-list',
    templateUrl:'app/templates/todolist.html'
})

export class TodolistComponent {
    private todolist:any;
    private memo:Memo;
    private memoTime:number;
    private timestamp:number;
    private currentDate:any;
    private year:string;
    private month:string;
    private date:string;
    private ifShowBox:boolean = false;

    constructor(private todolistProvider : TodoList, private router : Router){
        console.log(this.router.url);
        this.timestamp = parseInt(this.router.url.replace(/\/todolist\/(\d*)/g, '$1'));
        this.currentDate = new Date(this.timestamp);
        this.year = this.currentDate.getFullYear() + '';
        this.month = this.currentDate.getMonth() + '';
        this.date = this.currentDate.getDate() + '';

        this.todolist = this.todolistProvider.getMemoHash();
        this.memo = this.todolist[this.year][this.month][this.date];
    }

    ngOnInit(){
        this.todolistProvider.todolistHash$.subscribe( (hashList) => {
            this.todolist = hashList;
        })
    }

    ngOnChange(){
        if(this.memo == undefined){
            this.router.navigate(['calendar']);
        }
    }

    showBox(){
        this.ifShowBox = true;
        this.memoTime = this.currentDate.getTime();
    }

    allDone(){
        this.memo.urgent.forEach((m) => {
            m.status = true;
        });
        this.memo.normal.forEach((m) => {
            m.status = true;
        })
    }

    deleteAllMemo(){
        var continueDeletion = confirm('Are you sure you want to delete all memoes?\nThis operation cannot be undo.');
        if(continueDeletion){
            delete this.memo;
            this.todolistProvider.deleteMemo(this.year, this.month, this.date);
            this.router.navigate(['calendar']);
        }
    }

    closeBox(ifShowBox:boolean){
        this.ifShowBox = ifShowBox;
    }

    togglePriority(index:number, isUrgent:boolean, content:any){
        if(isUrgent){
            this.memo.normal.push(content);
            this.memo.urgent.splice(index, 1);
        }else{
            this.memo.urgent.push(content);
            this.memo.normal.splice(index, 1);
        }
    }

    deleteUrgentItem(index:number){
        if(confirm('Are you certain about this?\nYou will not find it back')){
            this.memo.urgent.splice(index, 1);            
        }
    }

    deleteNormalItem(index:number){
        if(confirm('Are you certain about this?\nYou will not find it back')){
            this.memo.normal.splice(index, 1);            
        }
    }

    returnToCalendar(){
        this.router.navigate(['calendar']);
    }
}