var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/app/client/js/index.jsx'),
        module: {
            rules: [
                {
                    test: /sinon\.js$/,
                    loader: "imports?define=>false,require=>false"
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(sinon|chai)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(html?|css|json|svg)$/,
                    exclude: path.resolve(__dirname, "src/app/client/index.html"),
                    loader: 'raw-loader'
                }
            ]
    },
    output: {
        path: path.resolve(__dirname, 'src/app/build'),
        filename: 'demo.js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ '.js', '.jsx' ]
    },
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000/api'
        },
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
    },
};
