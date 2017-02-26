import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    BrowserModule,
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
