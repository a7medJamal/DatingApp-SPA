import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// tslint:disable-next-line: import-spacing
import{HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './Value/Value.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent
   ],
   imports: [
      BrowserModule,
// tslint:disable-next-line: deprecation
      HttpModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
