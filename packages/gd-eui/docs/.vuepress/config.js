const path = require('path');
const fs = require('fs');
const Config = require('webpack-chain');
const webpack = require('webpack');

const rootPath = path.join(__dirname, '../');
function getDocs(dirPath) {
    const docs = [];
    dirPath = path.resolve(rootPath, dirPath);
    fs.readdirSync(dirPath).forEach((file) => {
        if (path.extname(file).toUpperCase() === '.MD') {
            docs.push(path.relative(rootPath, path.resolve(dirPath, file)));
        }
    });
    return docs;
}

const baseComponentsDocs = getDocs('components/base');
const containerDocs = getDocs('components/container');
const highLevelDocs = getDocs('components/high-level');
const modulesDocs = getDocs('components/modules');
const startDocs = getDocs('start');
const demandDocs = getDocs('demand');
const themesDocs = getDocs('themes');

class MyPlugin {
    /**
     *
     * @param {webpack.Compiler} compiler
     */
    apply(compiler) {
        compiler.hooks.watchRun.tap('MyPlugin', (comp) => {
            const changedFiles = Object.keys(comp.watchFileSystem.watcher.mtimes).map((file) =>
                `\n  ${file}`.trim(),
            );
            if (changedFiles.length) {
                const file = changedFiles[0];
                let component = file.substring(file.lastIndexOf('/') + 1);
                if (
                    component.lastIndexOf('.vue') === -1 ||
                    file.lastIndexOf('src/components/') === -1
                ) {
                    return;
                }
                component = component.replace('.vue', '');
                const componentsDir = path.resolve(__dirname, '../components');
                fs.readdirSync(componentsDir).filter((baePath) => {
                    if (!baePath.length) {
                        return;
                    }
                    const fpDir = path.join(componentsDir, baePath);
                    fs.readdirSync(fpDir).forEach((filePath) => {
                        const targetPath = path.join(fpDir, filePath);
                        if (filePath.indexOf(component) === -1) {
                            return;
                        }
                        // ??????????????????
                        const content = fs.readFileSync(targetPath);
                        fs.writeFileSync(targetPath, content);
                    });
                });
            }
        });
    }
}

module.exports = {
    devtool: 'source-map',
    title: 'gd-eui',
    themeConfig: {
        contributors: true,
        contributorsText: '?????????',
        nav: [
            { text: '??????', link: '/' },
            { text: '??????', link: '/start/1-start.html' },
            { text: 'github', link: 'https://git.gaoding.com/gaoding/editor/tree/f_gd_eui_master' },
        ],
        sidebar: [
            {
                title: '????????????',
                children: startDocs,
            },
            {
                title: '????????????',
                children: demandDocs,
            },
            {
                title: '????????????',
                children: themesDocs,
            },
            {
                title: '????????????',
                children: baseComponentsDocs,
            },
            {
                title: '????????????',
                children: containerDocs,
            },
            {
                title: '????????????',
                children: highLevelDocs,
            },
            {
                title: '????????????',
                children: modulesDocs,
            },
        ],
    },
    head: [],
    less: {
        javascriptEnabled: true,
    },
    dest: path.resolve(__dirname, '../../../../docs/public/docs/gd-eui'),
    base: '/pages/gaoding/editor/docs/gd-eui/',
    // base: '/docs/gd-eui/',
    plugins: [
        [
            'vuepress-plugin-typescript',
            {
                tsLoaderOptions: {
                    // ts-loader ??????????????????
                    happyPackMode: true
                },
            },
        ],
        [
            require('./plugins/code-box'),
            {
                componentsDir: [
                    path.resolve(__dirname, '../examples'),
                    path.resolve(__dirname, '../../demo/components'),
                ],
            },
        ],
        [
            require('./plugins/api'),
            {
                baseDir: path.resolve(__dirname, '../../src/components'),
                name: 'gd-eui-api',
            },
        ],
    ],
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    postcss: {
        plugins: () => [
            require('postcss-inline-svg')({
                removeFill: false,
                encode: function (code) {
                    return encodeURIComponent(code);
                },
            }),
            require('postcss-cssnext')(),
            require('autoprefixer'),
        ],
    },
    /**
     * @type {webpack.Configuration}
     */
    configureWebpack: {
        devServer: {
            hot: true,
            // liveReload: true,
            // onListening(server) {
            //     server.listen()
            // }
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                },
                {
                    test: /\.wasm$/,
                    type: 'javascript/auto',
                },
            ],
        },
        resolve: {
            alias: {
                vue: 'vue/dist/vue.common.js',
            },
        },
        plugins: [new MyPlugin()],
    },
    /**
     *
     * @param {Config} webpackConfig
     */
    chainWebpack(webpackConfig) {
        webpackConfig.resolve.alias.set('@', path.resolve(__dirname, '../../src/'));
        webpackConfig.module
            .rule('js')
            .test(/\.jsx?$/)
            .use('babel-loader')
            .tap((options) => {
                options.configFile = path.resolve(__dirname, '../../babel.config.js');
                return options;
            });
    },
};
