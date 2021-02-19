const { override, disableEsLint, addBabelPlugins } = require("customize-cra");

module.exports = override(
  disableEsLint(),
  ...addBabelPlugins([
    "@babel/plugin-proposal-decorators",
    {
      legacy: true
    }
  ])
);
