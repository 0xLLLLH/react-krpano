import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';

import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'auto',
        },
        {
            file: pkg.module,
            format: 'es',
            sourcemap: true,
            exports: 'auto',
        },
    ],
    plugins: [
        // typescript(),
        external(),
        url(),
        nodeResolve({
            extensions,
        }),
        babel({
            extensions,
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
        }),
        commonjs({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
    ],
    external: [/@babel\/runtime/, 'react', 'react-dom'],
};
