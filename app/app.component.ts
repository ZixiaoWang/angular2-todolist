import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { SearchResults } from './components/service.searchResults';
import { Memo } from './components/interface.memo';

const todoList : Array<Memo> = [
  {
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
]

@Component({
  selector: 'my-app',
  template: `
            <div class="app-container">
                <search-box [todothings]="todoList" (keywordChange)="searchKeyWord($event)"></search-box>
                <router-outlet></router-outlet>
            </div>
  `,
  providers:[SearchResults]
})
export class AppComponent  { 
  constructor( private router : Router ) { }
  private todoList:Array<Memo> = todoList;

  searchKeyWord(arg:any){
    
  }
}
