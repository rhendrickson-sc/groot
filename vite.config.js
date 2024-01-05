import {defineConfig} from 'vite'
import {resolve} from 'path'

const vite = require('vite');
const AssetsVersionPlugin = require('./js/webpack-plugins/assets-version-plugin.js')
const DeleteAfterBuildPlugin = require('./js/webpack-plugins/delete-after-build-plugin.js')
const getThemePath = require('./js/webpack-plugins/get-theme-path.js');

export default defineConfig({
    build: {
        rollupOptions: {
            external: [
                // 'jquery',
                // 'magnific-popup'
            ],
            output: {
                // expose jQuery as a global variable
                globals: {
                    jquery: 'jQuery'
                }
            }
        },
        lib: {
            entry: resolve(__dirname, './js/src/common.js'),
            name: 'CommonJS',
            fileName: 'vite-common'
        }
    },
    plugins: [

    ],
})