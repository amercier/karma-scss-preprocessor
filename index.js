var sass = require('node-sass');
var path = require('path');
var chalk = require('chalk');

function formattedScssMessage(error) {
  var relativePath = '',
      filePath = error.file === 'stdin' ? file.path : error.file,
      message = '';

  filePath = filePath ? filePath : file.path;
  relativePath = path.relative(process.cwd(), filePath);

  message += chalk.underline(relativePath) + '\n';
  message += chalk.gray('  ' + error.line + ':' + error.column) + '  ';
  message += error.message
    .replace(/: "([^"]*)"\.$/, ': $1')
    .replace(/: (.*)/, ': ' + chalk.yellow('$1'));

  return message;
}

/**
 * Preprocessor factory
 * @param args   {Object} Config object of custom preprocessor.
 * @param config {Object} Config object of babelPreprocessor.
 * @param logger {Object} Karma's logger.
 * @param helper {Object} Karma's helper functions.
 */
function createScssPreprocessor(args, config, logger, helper) {
  config = config || {};

  var log = logger.create('preprocessor.scss');

  // Options. See https://www.npmjs.com/package/node-sass for details
  var options = helper.merge({
    sourceMap: false,
    transformPath: function (filepath) {
      return filepath.replace(/\.scss$/, '.css');
    }
  }, args.options || {}, config.options || {});

  return function (content, file, done) {
    var result = null;

    log.debug('Processing "%s".', file.originalPath);

    // Transform file.path to .css so Karma serves it as a stylesheet
    file.path = file.originalPath.replace(/\.scss$/, '.css');

    // Clone the options because we need to mutate them
    var opts = helper._.clone(options);

    // Add current file's directory into include paths
    opts.includePaths = [path.dirname(file.originalPath)].concat(opts.includePaths || []);

    // Inline source maps
    if (opts.sourceMap) {
      opts.sourceMap = file.path;
      opts.omitSourceMapUrl = true;
    }

    // Compile using node-sass (synchronously)
    try {
      opts.file = file.originalPath;
      result = sass.renderSync(opts);
    }
    catch (error) {
      var message = formattedScssMessage(error);
      log.error('%s\n  at %s:%d', message, file.originalPath, error.line);
      error.message = chalk.stripColor(message);
      return done(error, null);
    }

    done(null, result.css || result);
  }
}

// Inject dependencies
createScssPreprocessor.$inject = ['args', 'config.scssPreprocessor', 'logger', 'helper'];

// Export preprocessor
module.exports = {
  'preprocessor:scss': ['factory', createScssPreprocessor]
}
