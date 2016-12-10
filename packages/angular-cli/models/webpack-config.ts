import {
  getWebpackAotConfigPartial,
  getWebpackNonAotConfigPartial
} from './webpack-build-typescript';
const webpackMerge = require('webpack-merge');
import { CliConfig } from './config';
import { getWebpackCommonConfig } from './webpack-build-common';
import { getWebpackDevConfigPartial } from './webpack-build-development';
import { getWebpackProdConfigPartial } from './webpack-build-production';
import {
  getWebpackMobileConfigPartial,
  getWebpackMobileProdConfigPartial,
  getWebpackNodeConfig
} from './';

export class NgCliWebpackConfig {
  // TODO: When webpack2 types are finished lets replace all these any types
  // so this is more maintainable in the future for devs
  public configs: any[] = [];

  constructor(
    public ngCliProject: any,
    public target: string,
    public environment: string,
    outputDir?: string,
    baseHref?: string,
    isAoT = false,
    sourcemap = true,
    vendorChunk = false,
    verbose = false,
    progress = true
  ) {
    const config: CliConfig = CliConfig.fromProject();
    const appConfig = config.config.apps[0];

    appConfig.outDir = outputDir || appConfig.outDir;

    if (appConfig.universal === true && isAoT === true) {
      throw new Error('AoT is not supported in universal yet.');
    }

    let baseConfig = getWebpackCommonConfig(
      this.ngCliProject.root,
      environment,
      appConfig,
      baseHref,
      sourcemap,
      vendorChunk,
      verbose,
      progress
    );
    let targetConfigPartial = this.getTargetConfig(
      this.ngCliProject.root, appConfig, sourcemap, verbose
    );
    const typescriptConfigPartial = isAoT
      ? getWebpackAotConfigPartial(this.ngCliProject.root, appConfig)
      : getWebpackNonAotConfigPartial(this.ngCliProject.root, appConfig);

    if (appConfig.mobile) {
      let mobileConfigPartial = getWebpackMobileConfigPartial(this.ngCliProject.root, appConfig);
      let mobileProdConfigPartial = getWebpackMobileProdConfigPartial(this.ngCliProject.root,
                                                                      appConfig);
      baseConfig = webpackMerge(baseConfig, mobileConfigPartial);
      if (this.target == 'production') {
        targetConfigPartial = webpackMerge(targetConfigPartial, mobileProdConfigPartial);
      }
    }

    this.configs.push(webpackMerge(
      baseConfig,
      targetConfigPartial,
      typescriptConfigPartial
    ));

    if (appConfig.universal === true) {
      this.configs.push(getWebpackNodeConfig(this.ngCliProject.root, environment, appConfig));
    }
  }

  getTargetConfig(projectRoot: string, appConfig: any, sourcemap: boolean, verbose: boolean): any {
    switch (this.target) {
      case 'development':
        return getWebpackDevConfigPartial(projectRoot, appConfig);
      case 'production':
        return getWebpackProdConfigPartial(projectRoot, appConfig, sourcemap, verbose);
      default:
        throw new Error("Invalid build target. Only 'development' and 'production' are available.");
    }
  }
}
