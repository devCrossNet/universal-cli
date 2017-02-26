const Blueprint   = require('../../ember-cli/lib/models/blueprint');
const getFiles = Blueprint.prototype.files;

export default Blueprint.extend({
  description: '',

  availableOptions: [
    { name: 'source-dir', type: String, default: 'src', aliases: ['sd'] },
    { name: 'universal', type: Boolean, default: false, aliases: ['u'] }
  ],

  locals: function(options: any) {
    return {
      sourceDir: options.sourceDir,
      universal: options.universal
    };
  },

  files: function() {
    let fileList = getFiles.call(this) as Array<string>;

    return fileList;
  },

  fileMapTokens: function (options: any) {
    // Return custom template variables here.
    return {
      __path__: () => {
        return options.locals.sourceDir;
      }
    };
  }
});
