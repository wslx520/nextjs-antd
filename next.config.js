// next.config.js
const withOptimizedImages = require('next-optimized-images');
// module.exports = withOptimizedImages(withCSS({
//     cssModules: true
// }));
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
const isProd = process.env.NODE_ENV === 'production'
console.log('isProd' , isProd);
console.log(process.env.NODE_ENV);

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.css'] = (file) => {}
}
let otherConfig = {};


const config = Object.assign({
    webpack(config, options) {
        const {dev} = options;
        config.module.rules.push({
            test: /\.(sa|sc|c)ss$/,
            use: ['extracted-loader'].concat(ExtractTextPlugin.extract({
                use: [
                    "babel-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                            minimize: !isDev,
                            sourceMap: isDev,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: isDev,
                            plugins: [
                                require('autoprefixer')({
                                    /* options */
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev
                        }
                    }
                ]
            }))
        });

        config.plugins.push(new ExtractTextPlugin({
            filename: 'static/styles/index.css',
            allChunks: true
        }));
        return config;
    }
}, otherConfig);

module.exports = withOptimizedImages(config);