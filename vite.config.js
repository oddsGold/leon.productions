import { createRequire } from 'node:module';
const require = createRequire( import.meta.url );
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import path from 'path';


export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                assetFileNames: ({ name }) => {
                    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
                    const fontExtensions = ['woff', 'woff2', 'eot', 'ttf', 'otf'];
                    const extension = path.extname(name).slice(1);

                    const imageWithoutHash = ['android-chrome-192x192.png', 'android-chrome-512x512.png'];
                    if (imageWithoutHash.includes(path.basename(name))) {
                        return 'assets/[name][extname]';
                    }

                    if (imageExtensions.includes(extension)) {
                        return 'images/[name]-[hash][extname]';
                    }
                    if (fontExtensions.includes(extension)) {
                        return 'assets/fonts/[name]-[hash][extname]';
                    }

                    return 'assets/[name]-[hash][extname]';
                }
            }
        }
    },
    plugins: [
        laravel({
            //buildDirectory: 'bundles',
            input: [
                'resources/assets/admin/style/index.sass',
                'resources/assets/admin/js/index.jsx',

                'resources/assets/site/style/index.sass',
                'resources/assets/site/js/index.jsx',
            ],
            refresh: true,
        }),
        react(),
        ckeditor5({theme: require.resolve('@ckeditor/ckeditor5-theme-lark')})
    ],
});
