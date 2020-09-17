const path = require('path');

module.exports = {
    name: 'Mine-Searc-Setting',
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: ['./client'],
    },

    module: {
        rules: [
            // rule for jsx
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        // 1
                        ['@babel/preset-env', {
                            targets: {
                                browsers: ['> 5% in KR'],
                            },
                            debug: true,
                        }],
                        // 2
                        '@babel/preset-react',
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties',
                        'react-hot-loader/babel',
                    ],
                },
            }
        ],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    }
};