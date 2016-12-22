import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import { enableProdMode } from '@angular/core';

import './style/main.scss';

platformBrowserDynamic().bootstrapModule(AppModule);
