import {defineConfig} from 'vite'
import * as fs from "fs"

export default defineConfig({
    server: {
        hmr: {
            host: 'localhost',
            protocol: "ws"
        },
        host: true,
        https: "false",
        port: 24690,
    },

    plugins: [

    ],
})