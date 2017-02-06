/**
 * This file and `main.browser.ts` are identical, at the moment(!)
 * By modifying the uniqueTo* definitions, you're able to create logic,
 * imports, etc that are "Platform" specific.
 *
 * If you want your code to be completely Universal and don't need that
 * You can also modiy just the commonModule definition
 *
 */

import { NgModule } from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './index';
// import { RouterModule } from '@angular/router';
// import { appRoutes } from './app/app.routing';

const commonModule = {
  /** Root App Component */
  bootstrap: [AppComponent],
  /** Our Components */
  declarations: [AppComponent],
  imports: [
    /**
     * NOTE: Needs to be your first import (!)
     * NodeModule, NodeHttpModule, NodeJsonpModule are included
     */
    UniversalModule,
    FormsModule,
    /**
     * using routes
     */
    // RouterModule.forRoot(appRoutes)
  ],
  providers: []
};

const uniqueToClientModule = {
  bootstrap: [],
  declarations: [],
  imports: [],
  providers: []
};

const uniqueToServerModule = {
  bootstrap: [],
  declarations: [],
  imports: [],
  providers: []
};

/**
 * Top-level NgModule "container"
 */
@NgModule({
  bootstrap: [...commonModule.bootstrap, uniqueToClientModule.bootstrap],
  declarations: [...commonModule.declarations, uniqueToClientModule.declarations],
  imports: [...commonModule.imports, uniqueToClientModule.imports],
  providers: [...commonModule.providers, uniqueToClientModule.providers]
})
export class AppModule {

}

@NgModule({
  bootstrap: [...commonModule.bootstrap, uniqueToServerModule.bootstrap],
  declarations: [...commonModule.declarations, uniqueToServerModule.declarations],
  imports: [...commonModule.imports, uniqueToServerModule.imports],
  providers: [...commonModule.providers, uniqueToServerModule.providers]
})
export class AppNodeModule {

}
