import {defineConfig} from 'vite'
import {resolve} from 'path'

const vite = require('vite');
const AssetsVersionPlugin = require('./js/webpack-plugins/assets-version-plugin.js')
const DeleteAfterBuildPlugin = require('./js/webpack-plugins/delete-after-build-plugin.js')
const getThemePath = require('./js/webpack-plugins/get-theme-path.js');

export default defineConfig({
    build: {
        lib: {
            entry: {
                'common': resolve(__dirname, './js/src/common.js'),
                'editor-style': resolve(__dirname, './less/editor-style.less'),
                'style': resolve(__dirname, './less/style.less'),
                'style-print': resolve(__dirname, './less/style-print.less'),
            },
            name: 'LibraryName',
            fileName: '[name]',
        },
        assetsDir: '../',
        cssMinify: true,
        cssCodeSplit: true,
        // manifest: true,
        minify: true,
    },
    plugins: [
        // can't use the following without refactoring the plugin since it hooks into Webpack.
        // current error: TypeError: Cannot read property 'done' of undefined
        // new AssetsVersionPlugin({
        //     versionFile: 'scripts.version',
        //     useHash: true,
        // }),
    ],
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
                rewriteUrls: true,
                additionalData: `@theme-path: ${getThemePath()};`,
            },
        },
    },
})