module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
          @use "sass:math";
          @import "@/assets/scss/foundation/variables.scss";
          @import "@/assets/scss/foundation/functions.scss";
          @import "@/assets/scss/foundation/mixins.scss";
        `
            }
        }
    },
    pwa: {
        name: 'Waqas Ishaque',
        themeColor: '#1b191c',
        msTileColor: '#1b191c',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black'
    },
    configureWebpack: {
        module: {
            rules: [{
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(glsl|fs|vs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'glslify-import-loader'
                    }
                },
                {
                    test: /\.(glsl|fs|vs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'raw-loader'
                    }
                },
                {
                    test: /\.(glsl|fs|vs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'glslify-loader'
                    }
                },
                {
                    test: /\.(obj)$/,
                    use: {
                        loader: 'file-loader'
                    }
                }
            ]
        }
    },
    chainWebpack(config) {
        config.plugins.delete('prefetch');
    }
};