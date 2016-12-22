import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
            <div class="app-container">
                <search-box></search-box>
                <calendar></calendar>
            </div>
  `
})
export class AppComponent  { name = 'Angular'; }
