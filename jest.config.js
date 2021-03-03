const { defaults } = require('jest-config');

/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
    transformIgnorePatterns: ['/node_modules/(?!@babel/runtime)'],
    testURL: 'https://styled.link',

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['/node_modules/'],

    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],

    // setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    // mock
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
};
