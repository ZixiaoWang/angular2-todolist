import { Input, Component, OnInit, OnChanges} from '@angular/core';
import { Router } from '@angular/router';

import { Memo } from './interface.memo';
import { SearchResults } from './service.searchResults';

@Component({
    selector:'results-list',
    templateUrl:'dist/templates/results.html'
})

export class ResultsListComponent implements OnInit {
    private memoList:Array<any> = [];

    constructor(private searchResults : SearchResults, private router : Router){ }

    ngOnInit(){
        this.searchResults.resultsList$.subscribe( item => {
            this.memoList = item;
        })
     }

     gotoMemoDetail(timestamp:number){
        this.router.navigate(['todolist', timestamp]);
     }
}