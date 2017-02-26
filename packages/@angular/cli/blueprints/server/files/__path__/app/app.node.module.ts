import { ServerModule } from '@angular/platform-server';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppNodeModule { }
