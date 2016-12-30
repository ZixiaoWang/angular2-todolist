import { Input, Output, Component, EventEmitter } from '@angular/core';

import { TodoList } from './service.todoList';
import { Memo } from './interface.memo';

@Component({
    selector:'input-box',
    templateUrl:'app/templates/input.html'
})

export class InputComponent {
    private urgent:boolean = false;
    private memoContent:string = '';

    constructor(private todolistProvider : TodoList) {}

    @Input() showBox:boolean;
    @Input() memoTime:number;
    @Output() closeBox = new EventEmitter<boolean>();

    closeInputBox():void{
        this.showBox = false;
        this.closeBox.emit(this.showBox);
    }

    toggleUrgent():void{
        this.urgent = !this.urgent;
    }

    pushMemo():void{
        var _memo:Memo = {
            id:null,
            time:null,
            urgent:[],
            normal:[]
        }

        _memo.id = this.todolistProvider.getLatestId() + 1;
        _memo.time = this.memoTime;
        if(this.urgent){
            _memo.urgent.push({memo:this.memoContent, status:false});
        }else{
            _memo.normal.push({memo:this.memoContent, status:false});
        }
        this.todolistProvider.addMemo(_memo);
        this.memoContent = '';
        this.urgent = false;
    }
}