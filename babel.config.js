/**
 * @type {import('@babel/core').ConfigFunction}
 */
module.exports = api => {
    api.cache(true);

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                    modules: false,
                },
            ],
            '@babel/preset-react',
            ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
        ],
        plugins: [
            ['@babel/transform-runtime'],
            [`@babel/plugin-proposal-decorators`, { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            `@babel/plugin-proposal-optional-chaining`,
            `@babel/plugin-proposal-object-rest-spread`,
        ],
    };
};
