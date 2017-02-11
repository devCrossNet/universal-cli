<% if(!universal) { %>
import { BrowserModule } from '@angular/platform-browser';<% } %>
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';<% if (routing) { %>
import { AppRoutingModule } from './app-routing.module';<% } %>

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [<% if(!universal) { %>
    BrowserModule,<% } %>
    FormsModule,
    HttpModule<% if (routing) { %>,
    AppRoutingModule<% } %>
  ],
  providers: [],<% if(universal) { %>
  exports: [AppComponent]<% } else { %>
  bootstrap: [AppComponent]<% } %>
})
export class AppModule { }
