/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            node: true,
        },
    },
    settings: {
        react: {
            version: '16',
        },
    },
    plugins: ['react-hooks'],
    rules: {
        // typescript
        '@typescript-eslint/no-parameter-properties': 'off',
        // 不限制
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/array-type': ['warn', { 'array-simple': true }],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/no-object-literal-type-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': [
            'off',
            { allowExpressions: true, allowTypedFunctionExpressions: true },
        ],

        // hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        // misc
        'no-implicit-coercion': 'off',
        'no-useless-escape': 'off',
        'array-callback-return': 'off',
        'no-useless-constructor': 'off',
        'no-empty-function': ['error', { allow: ['constructors'] }],
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        'no-undef': 'off',
    },
    overrides: [
        {
            files: ['**/*.js'],
            excludedFiles: ['node_modules', './dist/**/*'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/no-var-requires': 'off',
                '@typescript-eslint/camelcase': 'off',
            },
        },
        {
            files: ['**/*.test.tsx'],
            excludedFiles: ['node_modules', './dist/**/*'],
            env: {
                node: true,
            },
        },
    ],
};
