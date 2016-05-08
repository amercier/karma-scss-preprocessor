import { join } from 'path';
import { expect } from 'chai';
import karmaMocha from 'karma-mocha';
import karmaChai from 'karma-chai';
import karmaPhantomjsLauncher from 'karma-phantomjs-launcher';
import { revert, runKarma } from './helpers';
import karmaScssPreprocessor from '../../src/lib/index';

function run(files, options = {}) {
  return runKarma({
    port: 9876,
    singleRun: true,
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai'],
    files: files.map(path => join('specs', 'fixture', path)),
    preprocessors: { '**/*.scss': ['scss'] },
    scssPreprocessor: { options },
    plugins: [karmaMocha, karmaChai, karmaPhantomjsLauncher, karmaScssPreprocessor],
    logLevel: 'ERROR', // LOG_ERROR
  });
}

describe('karmaScssPreprocessor', () => {
  it('exists', () => expect(karmaScssPreprocessor).to.exist);
  it('is an object', () => expect(karmaScssPreprocessor).to.be.an.object);

  it('processes .scss files', () => run(['red.spec.js', 'red.spec.scss']));

  it('generates source maps', () => run(
    ['red.spec.js', 'red.spec.scss'],
    { sourceMap: true }
  ));

  it('allows including external paths', () => run(
    ['lib-blue.spec.js', 'lib-blue.spec.scss'],
    { includePaths: ['specs/fixture/lib'] }
  ));

  it('fails when a syntax error is found', () => revert(run(['error-syntax-error.scss'])));
  it('fails when a an import is not found', () => revert(run(['error-import-not-found.scss'])));
});
