const path = require("path");
const packageJson = require("../package.json");

exports.baseConfig = {
  entryPoints: [path.resolve(__dirname, "../src/index.tsx")],
  // external: Object.keys(packageJson.dependencies),
  // bundle: true,
  // minify: true,
  platform: "browser",
  sourcemap: true,
  absWorkingDir: path.resolve(__dirname, "../"),
  tsconfig: path.resolve(__dirname, "../tsconfig.json"),
  outfile: path.resolve(__dirname, "../dist/index.js"),
};
