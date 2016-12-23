import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Memo } from './interface.memo';
import { SearchResults } from './service.searchResults';

@Component({
    selector:'search-box',
    templateUrl:'app/templates/search.html'
})

export class SearchComponent {
    constructor(private router : Router, private location : Location, private searchResults : SearchResults) {}

    @Input() todothings:Array<Memo>;

    private keyword:string;
    private filteredTodoThings:Array<any> = [];

    findMemo(event:any){
        this.filteredTodoThings = [];
        let keywordRegex = new RegExp('(' + this.keyword + ')');
        this.todothings.forEach((todoitem) => {
            // 遍历 urgent
            todoitem.urgent.forEach((urgentItem) => {
                if(urgentItem.memo.includes(this.keyword)){
                    this.filteredTodoThings.push({
                        id:todoitem.id,
                        content:urgentItem.memo.replace(keywordRegex, '<b>$1</b>')
                    });
                }
            })
            // 遍历 normal
            todoitem.normal.forEach((normalItem) => {
                if(normalItem.memo.includes(this.keyword)){
                    this.filteredTodoThings.push({
                        id:todoitem.id,
                        content:normalItem.memo.replace(keywordRegex, '<b>$1</b>')
                    });
                }
            })
        })
        this.searchResults.setResultList(this.filteredTodoThings);
        this.keywordChange.next(this.filteredTodoThings);
    }

    focusOnSearch(){
        this.router.navigate(['/results']);
    }

    backToPreviousPage(){
        this.location.back()
    }

    @Output() keywordChange : EventEmitter<any> = new EventEmitter();
}