require('ignore-styles');
require('@babel/register')({
    ignore: [ /\/(build|node_modules)\// ],
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    plugins: [
        ['@babel/transform-runtime'],
        [
            '@babel/plugin-proposal-class-properties',
            {
              "loose": true
            }
        ]
    ]
});

require('./ssrServer');