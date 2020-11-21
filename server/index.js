const md5File = require('md5-file');
const path = require('path');

const ignoreStyles = require('ignore-styles');
const register = ignoreStyles.default;

require("@babel/polyfill");
require("@babel/register")({
    ignore: [/\/(build|node_modules)\//],
    presets: ["@babel/preset-env", "@babel/preset-react"],
    plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "dynamic-import-node",
        "react-loadable/babel"
    ]
});

require("./app.js");
