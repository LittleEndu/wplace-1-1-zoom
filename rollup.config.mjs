import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import pkg from './package.json' with {type: 'json'};

export default defineConfig({
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'module',
    },
    plugins: [
        {
            name: 'generate-manifest',
            buildStart() {
                const manifest = {
                    id: pkg.name,
                    name: '1:1 Zoom Button',
                    version: pkg.version,
                    authors: [...pkg.author.split(',').map((a) => a.trim())],
                    versions: {
                        framework: '>=0.1.0-beta'
                    }
                };

                this.emitFile({
                    type: 'asset',
                    fileName: 'manifest.json',
                    source: JSON.stringify(manifest, null, '\t'),
                });
            }
        },
        resolve({ browser: false, extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'] }),
        commonjs(),
        {
            name: 'patches',
            async resolveId(id) {
                if (id === 'plugin:patches') return id;
                return null;
            },
            async load(id) {
                if (id === 'plugin:patches') {
                    return "export default []";
                }
            }
        },
        esbuild({ minify: true })
    ],
});
