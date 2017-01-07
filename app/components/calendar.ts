import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TodoList } from './service.todoList';
import { Memo } from './interface.memo';

@Component({
    selector:'calendar',
    templateUrl:'dist/templates/calendar.html'
})

export class CalendarComponent implements OnInit {
    public ifShowBox:boolean = false;
    public memoTime:number;
    public today:any = new Date();
    public targetDate:any = new Date();
    public year:number = new Date().getFullYear();
    public month:number = new Date().getMonth();
    public date:number = new Date().getDate();
    public todoList:Array<Memo>;
    public calendarList:Array<Array<any>> = [[],[],[],[],[],[]];

    private theFocusedCell:number = -1;

    constructor(public todolistProvider : TodoList, private router : Router) {
        this.todoList = this.todolistProvider.getMemoHash();
        this.updateDate(this.today);
    }

    ngOnInit(){
        this.todolistProvider.todolistHash$.subscribe( (hashList:any) => {
            this.todoList = hashList;
            this.updateDate(this.today);
        })
    }

    showBox(timestamp?:number):void{
        this.ifShowBox = true;
        if(timestamp){
            this.memoTime = timestamp;
        }else{
            let _now = new Date();
            this.memoTime = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate()).getTime();
        }
    }

    closeBox(ifShowBox:boolean){
        this.ifShowBox = ifShowBox;
    }

    updateDate(date:any):void{
        this.theFocusedCell = -1;

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
        var daysInMonth = new Date(this.year, this.month+1, 0).getDate();
        var firstDayIsWhatDate = new Date(this.year, this.month, 1).getDay();
        if(firstDayIsWhatDate == 0){ firstDayIsWhatDate = 7; }
        let row = 0; let cell = 0;
        for(row=0; row<6; row++){
            for(cell = 0; cell<7; cell++){
                // logic part start
                if(
                    (7*row+cell+1 < firstDayIsWhatDate) || 
                    (7*row+cell+1 > daysInMonth+firstDayIsWhatDate-1)
                ){ 
                    this.calendarList[row][cell] = { urgent:false, normal:false, date:'', active:false, branch:1, timestamp:0};
                }else{
                    let actualDate:number =  row*7+cell+2-(firstDayIsWhatDate);
                    let obj = { urgent:false, normal:false, date:7*row+cell+2-firstDayIsWhatDate+'', active:false, branch:2, timestamp:new Date(this.year, this.month, actualDate).getTime()};
                    if(
                        this.year == this.today.getFullYear() &&
                        this.month == this.today.getMonth() &&
                        this.today.getDate() == actualDate
                    ){ obj.active = true; }
                    if (
                        this.todoList[this.year] &&
                        this.todoList[this.year+''][this.month+''] &&
                        this.todoList[this.year+''][this.month+''][actualDate+'']
                    ){
                        if(this.todoList[this.year+''][this.month+''][actualDate+''].urgent.length>0){ obj.urgent = true; }
                        if(this.todoList[this.year+''][this.month+''][actualDate+''].normal.length>0){ obj.normal = true; }
                        this.calendarList[row][cell] = obj;
                    }else{
                        this.calendarList[row][cell] = obj;
                    }

                }
                // -- logic part end
            }
        }
    }

    gotoDetail(day:any){
        if(day.branch == 1){
            // Do nothing here
        }else if(day.urgent || day.normal){
            this.router.navigate(['todolist',day.timestamp]);   
        }else{
            this.showBox(day.timestamp);
        }
    }

    focusOnThisCell(r:number, c:number){
        this.theFocusedCell = r*7+c;
    }
}