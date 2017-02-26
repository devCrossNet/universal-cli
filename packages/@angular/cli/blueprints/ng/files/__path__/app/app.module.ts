<% if (!universal) { %>import { BrowserModule } from '@angular/platform-browser';<% } %>
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';<% if (routing) { %>
import { AppRoutingModule } from './app-routing.module';<% } %>

@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [
    AppComponent
  ],
  imports: [<% if (!universal) { %>
    BrowserModule,<% } %>
    FormsModule,
    HttpModule<% if (routing) { %>,
    AppRoutingModule<% } %>
  ],
  providers: []<% if (!universal) { %>,
  bootstrap: [AppComponent]<% } %>
})
export class AppModule { }
