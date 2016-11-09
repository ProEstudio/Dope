module.exports = {
    devtool: 'source-map',
    entry: {
        'main': './src/app/main.ts'
    },
    output: {
        filename: './dist/public/build/bundle/[name].js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts'
            }
        ]
    }
}