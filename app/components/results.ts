import { Input, Component, OnInit} from '@angular/core';

import { Memo } from './interface.memo';
import { SearchResults } from './service.searchResults';

@Component({
    selector:'results-list',
    templateUrl:'app/templates/results.html'
})

export class ResultsListComponent implements OnInit {
    private memoList:Array<any>;

    constructor(private searchResults : SearchResults){ }

     ngOnInit(){
        this.searchResults.resultsList$.subscribe( item => {
            this.memoList = item;
        })
     }
}