#!/usr/bin/env node
const esbuild = require('esbuild');
const { baseConfig } = require('./config');
const execa = require('execa');

(async () => {
  await execa('yarn', ['build:types'], {
    cwd: __dirname,
  }).stdout.pipe(process.stdout);
  await esbuild.build({
    ...baseConfig,
    minify: false,
    watch: true,
    bundle: true,
  });
})();
