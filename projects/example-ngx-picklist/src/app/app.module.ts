import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NgxPicklistModule} from "ngx-picklist";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPicklistModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
