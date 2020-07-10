module.exports = {
    "env": {
        "browser": true,
        "node" : true,
        "es2020": true
    },
    "parser": "babel-eslint",
    "extends": [
        "react-app",
        "prettier",
        "airbnb",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:jsx-a11y/recommended",
        "plugin:sonarjs/recommended",
        "plugin:promise/recommended",
    ],
    "plugins": ["react",  "jsx-a11y", "optimize-regex", "sonarjs", "no-loops", "no-use-extend-native", "promise"],
    "rules": {
        "template-curly-spacing" : "off",
        "indent": ["error", 4, {
            "ignoredNodes": ["TemplateLiteral"]
        }],
        "jsx-quotes": [
            1,
            "prefer-double"
        ],
        "react/jsx-filename-extension": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "import/no-extraneous-dependencies": [
            "error",
            {
                "packageDir": "./"
            }
        ],
        "allowTernary": 1,
        "optimize-regex/optimize-regex": "warn",
        "sonarjs/cognitive-complexity": ["error", 30],
        "no-loops/no-loops": 2,
        "no-use-extend-native/no-use-extend-native": 2,
    }
};
