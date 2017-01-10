var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: './app.js',
    output: {
        path: "./build",
        filename: "app-ui.js"
    },
    postcss: [
        require('autoprefixer')({
            browsers: [
                'ie >= 8',
                'ie_mob >= 10',
                'ff >= 26',
                'chrome >= 30',
                'safari >= 6',
                'opera >= 23',
                'ios >= 5',
                'android >= 2.3',
                'bb >= 10'
            ]
        })
    ],
    module: {
        loaders: [
            { test: /\.(png|jpe?g|gif|svg|swf|eot|ttf|woff)(\?.*)?$/, loader: 'url?limit=50000' },
            { test: /\.js$/, loader: "babel", exclude: /node_modules/ },
            { test: /\.scss/, loader: "style!css!sass!postcss" }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-2'],
        plugins: ['transform-runtime']
    },
    resolve: {
        extensions: ['', '.js', 'css', 'scss']
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.output.path = "./dist";
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        })
    ];
} else {
    module.exports.devtool = '#source-map'
}