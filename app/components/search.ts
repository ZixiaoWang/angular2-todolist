import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Memo } from './interface.memo';
import { SearchResults } from './service.searchResults';
import { TodoList } from './service.todoList';

@Component({
    selector:'search-box',
    templateUrl:'app/templates/search.html'
})

export class SearchComponent implements OnInit {
    private todothings:Array<Memo> = [];
    private keyword:string;
    private filteredTodoThings:Array<any> = [];

    constructor(private router : Router, private location : Location, private searchResults : SearchResults, private todoListProvider : TodoList) {
        this.todothings = this.todoListProvider.getMemoArray();
        console.log(this.todothings);
    }

    ngOnInit(){
        this.todoListProvider.todolistArray$.subscribe( (list) => {
          this.todothings = list;
        })
    }

    findMemo(event:any){
        this.filteredTodoThings = [];
        let keywordRegex = new RegExp('(' + this.keyword + ')');
        this.todothings.forEach((todoitem) => {
            // 遍历 urgent
            todoitem.urgent.forEach((urgentItem) => {
                if(urgentItem.memo.includes(this.keyword)){
                    this.filteredTodoThings.push({
                        id:todoitem.id,
                        content:urgentItem.memo.replace(keywordRegex, '<b>$1</b>'),
                        time:todoitem.time
                    });
                }
            })
            // 遍历 normal
            todoitem.normal.forEach((normalItem) => {
                if(normalItem.memo.includes(this.keyword)){
                    this.filteredTodoThings.push({
                        id:todoitem.id,
                        content:normalItem.memo.replace(keywordRegex, '<b>$1</b>'),
                        time:todoitem.time
                    });
                }
            })
        })
        this.searchResults.setResultList(this.filteredTodoThings);
    }

    focusOnSearch(){
        this.router.navigate(['/results']);
    }

    backToHome(){
        this.keyword = '';
        this.router.navigate(['calendar']);
    }
}