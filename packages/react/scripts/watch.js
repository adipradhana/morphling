#!/usr/bin/env node
const esbuild = require("esbuild");
const { baseConfig } = require("./config");

(async () => {
  await esbuild.build({
    ...baseConfig,
    minify: false,
    watch: true,
    bundle: true,
  });
})();
