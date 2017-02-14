import { ng } from '../../utils/process';
import { expectFileToMatch } from '../../utils/fs';
import { getClientDist } from '../../utils/utils';

export default function () {
  return ng('build', '--aot')
    .then(() => expectFileToMatch(`${getClientDist()}client.bundle.js`,
      /bootstrapModuleFactory.*\/\* BrowserAppModuleNgFactory \*\//));
}
