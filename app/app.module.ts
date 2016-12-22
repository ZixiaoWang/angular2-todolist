import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SearchComponent } from './components/search';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ SearchComponent ],
  bootstrap:    [ SearchComponent ]
})
export class AppModule { }
