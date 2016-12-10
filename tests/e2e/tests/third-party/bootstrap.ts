import { npm, ng } from '../../utils/process';
import { updateJsonFile } from '../../utils/project';
import { expectFileToMatch } from '../../utils/fs';
import { oneLineTrim } from 'common-tags';
import { getAppMain, getClientDist } from '../../utils/utils';


export default function () {
  return Promise.resolve()
    .then(() => npm('install', 'bootstrap@next'))
    .then(() => updateJsonFile('angular-cli.json', configJson => {
      const app = configJson['apps'][0];
      app['styles'].push(`../node_modules/bootstrap/${getClientDist()}/css/bootstrap.css`);
      app['scripts'].push(
        `../node_modules/jquery/${getClientDist()}/jquery.js`,
        `../node_modules/tether/${getClientDist()}/js/tether.js`,
        `../node_modules/bootstrap/${getClientDist()}/js/bootstrap.js`
      );
    }))
    .then(() => ng('build'))
    .then(() => expectFileToMatch(`${getClientDist()}/scripts.bundle.js`, '* jQuery JavaScript'))
    .then(() => expectFileToMatch(`${getClientDist()}/scripts.bundle.js`, '/*! tether '))
    .then(() => expectFileToMatch(`${getClientDist()}/scripts.bundle.js`, '* Bootstrap'))
    .then(() => expectFileToMatch(`${getClientDist()}/styles.bundle.css`, '* Bootstrap'))
    .then(() => expectFileToMatch(`${getClientDist()}/index.html`, oneLineTrim`
      <script type="text/javascript" src="inline.bundle.js"></script>
      <script type="text/javascript" src="scripts.bundle.js"></script>
      <script type="text/javascript" src="vendor.bundle.js"></script>
      <script type="text/javascript" src="${getAppMain()}.bundle.js"></script>
    `));
}
