import sass from 'node-sass';
import path from 'path';
import chalk from 'chalk';
import { clone, merge } from 'lodash';
import stripAnsi from 'strip-ansi';

function formattedScssMessage(error, file) {
  const filePath = !error || !error.file || error.file === 'stdin' ? file.path : error.file;
  const relativePath = path.relative(process.cwd(), filePath);

  return `${chalk.underline(relativePath)}\n` // eslint-disable-line prefer-template
    + chalk.gray(` ${error.line}:${error.column} `)
    + error.message
      .replace(/: "([^"]*)"\.$/, ': $1')
      .replace(/: (.*)/, `: ${chalk.yellow('$1')}`);
}

/**
 * Preprocessor factory
 * @param args   {Object} Config object of custom preprocessor.
 * @param config {Object} Config object of scssPreprocessor.
 * @param logger {Object} Karma's logger.
 */
function createScssPreprocessor(args, config = {}, logger) {
  const log = logger.create('preprocessor.scss');

  // Options. See https://www.npmjs.com/package/node-sass for details
  const options = merge({
    sourceMap: false,
    transformPath(filepath) {
      return filepath.replace(/\.scss$/, '.css');
    },
  }, args.options || {}, config.options || {});

  return function processFile(content, file, done) {
    let result = null;

    log.debug('Processing "%s".', file.originalPath);

    // Transform file.path to .css so Karma serves it as a stylesheet
    file.path = file.originalPath.replace(/\.scss$/, '.css'); // eslint-disable-line

    // Clone the options because we need to mutate them
    const opts = clone(options);

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
    } catch (error) {
      const message = formattedScssMessage(error, file);
      log.error('%s\n  at %s:%d', message, file.originalPath, error.line);
      error.message = stripAnsi(message);
      return done(error, null);
    }

    done(null, result.css || result);
    return undefined;
  };
}

// Inject dependencies
createScssPreprocessor.$inject = ['args', 'config.scssPreprocessor', 'logger'];

// Export preprocessor
export default {
  'preprocessor:scss': ['factory', createScssPreprocessor],
};
