import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { SearchComponent } from './components/search';
import { CalendarComponent } from './components/calendar';
import { InputComponent } from './components/input';
import { ResultsListComponent } from './components/results';
import { TodolistComponent } from './components/todolist';

@NgModule({
  imports:      [ 
    BrowserModule,
    RouterModule.forRoot([
      { 
        path:'', 
        redirectTo:'/calendar',
        pathMatch:'full'
      },
      { 
        path:'calendar',
        component:CalendarComponent,
      },
      { 
        path:'results', 
        component:ResultsListComponent,
      },
      { 
        path:'todolist',
        component:TodolistComponent
      }
    ])
  ],
  declarations: [ 
    AppComponent,
    SearchComponent,
    CalendarComponent,
    InputComponent,
    ResultsListComponent,
    TodolistComponent,
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
