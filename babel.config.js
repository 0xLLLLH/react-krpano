/**
 * @type {import('@babel/core').ConfigFunction}
 */
module.exports = api => {
    const isTest = api.env('test');
    const isScript = api.env('script');

    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        node: 'current',
                    },
                    modules: isTest || isScript ? 'auto' : false,
                },
            ],
            '@babel/preset-react',
            ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
        ],
        plugins: [
            [
                '@babel/transform-runtime',
                {
                    regenerator: true,
                    // 测试环境使用commonjs
                    useESModules: !isTest,
                },
            ],
            [`@babel/plugin-proposal-decorators`, { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            `@babel/plugin-proposal-optional-chaining`,
            `@babel/plugin-proposal-object-rest-spread`,
        ],
    };
};
