import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
            <div class="app-container">
                <search-box></search-box>
                <router-outlet></router-outlet>
            </div>
  `
})
export class AppComponent  { 
  constructor( private router : Router ) { }
}
