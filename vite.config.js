import {defineConfig} from 'vite'
import * as fs from "fs"

export default defineConfig({
    server: {
        hmr: {
            host: '0.0.0.0',
        },
        host: 'groot.lndo.site',
        https: {
            cert: fs.readFileSync('/certs/cert.crt'),
            key: fs.readFileSync('/certs/cert.key'),
        },
        port: 24690,
    },

    plugins: [

    ],
})