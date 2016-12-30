import { Component, OnInit } from '@angular/core';

import { TodoList } from './service.todoList';
import { Memo } from './interface.memo';

@Component({
    selector:'calendar',
    templateUrl:'app/templates/calendar.html'
})

export class CalendarComponent {
    public ifShowBox:boolean = false;
    public memoTime:number;
    private today:any = new Date();
    private targetDate:any = new Date();
    private year:number = this.today.getFullYear();
    private month:number = this.today.getMonth();
    private date:number = this.today.getDate();
    private todoList:Array<Memo>;
    private calendarList:Array<any> = new Array(7).fill(new Array(7).fill({}));

    constructor(private todolistProvider : TodoList) {}

    ngOnInit(){
        this.todoList = this.todolistProvider.getMemoArray();
        this.todolistProvider.todolistArray$.subscribe( (list) => {
            this.todoList = list;
        })
        this.updateDate(this.today);
    }

    showBox():void{
        this.ifShowBox = true;
        let _now = new Date();
        this.memoTime = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate()).getTime();
    }

    closeBox(ifShowBox:boolean){
        this.ifShowBox = ifShowBox;
    }

    updateDate(date:any):void{
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.date = date.getDate();
        this.generateCalendar();
    }
    nextMonth(){
        this.targetDate = new Date(this.year, this.month+1);
        this.updateDate(this.targetDate);
    }
    previousMonth(){
        this.targetDate = new Date(this.year, this.month-1);
        this.updateDate(this.targetDate);
    }
    generateCalendar(){
        let daysInMonth = new Date(this.year, this.month+1, 0).getDate();
        for(let row = 0; row<7; row++){
            window.calendar = this.calendarList;
            for(let cell = 0; cell<7; cell++){
                // logic part start
                if(7*row+cell < this.targetDate.getDay()-1 || 7*row+cell > daysInMonth-1) { 
                    this.calendarList[row][cell] = { urgent:false, normal:false, date:'', active:false };
                }else{
                    let obj = { urgent:false, normal:false, date:'', active:false };
                    if (
                        this.todoList[this.year] &&
                        this.todoList[this.year+''][this.month+''] &&
                        this.todoList[this.year+''][this.month+''][7*row+cell+1+'']
                    ){
                        obj.date = 7*row+cell+1+'';
                        if(this.todoList[this.year+''][this.month+''][7*row+cell+1+''].urgent.length>0){ obj.urgent = true; }
                        if(this.todoList[this.year+''][this.month+''][7*row+cell+1+''].normal.length>0){ obj.normal = true; }
                        if(
                            this.year == this.today.getFullYear() &&
                            this.month == this.today.getMonth() &&
                            this.date == this.today.getDate()
                        ){ obj.active = true; }
                    }else{
                        this.calendarList[row][cell] = obj; 
                    }
                }
                // -- logic part end
            }
        }
    }
}