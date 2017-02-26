/** For now this is from https://github.com/FrozenPandaz/ng-universal-demo
 * Hm maybe this can be a package in @ngtools?
 */

const fs = require('fs');
import { Request } from 'express';
import { NgModuleFactory, NgZone, Type, ApplicationRef } from '@angular/core';
import { platformServer, PlatformState, INITIAL_CONFIG } from '@angular/platform-server';

const templateCache = {};
export function ngExpressEngine(setupOptions) {

  return function (filePath, options, callback) {
    const moduleFactory = setupOptions.bootstrap[0];
    const document = templateCache[filePath] ||
      (templateCache[filePath] = fs.readFileSync(filePath));

    handleRequest(options.req, document, moduleFactory, callback);
  };
}

function handleRequest(
  req: Request, document: string, module: Type<{}>,
  callback: (err, html) => any) {

  const platform = platformServer([
    {
      provide: INITIAL_CONFIG,
      useValue: {
        document: document,
        url: req.url
      }
    }
  ]);

  platform.bootstrapModule(module)
    .then(moduleRef => {
      const state = moduleRef.injector.get(PlatformState);
      const appRef = moduleRef.injector.get(ApplicationRef);

      appRef.isStable
        .filter((isStable: boolean) => isStable)
        .first()
        .subscribe((stable) => {
          callback(null, state.renderToString());
          platform.destroy();
        });
    });
}
