module.exports = {
    context: __dirname + "/front",
    entry: {
        javascript: "./app/index.js",

    },
    output: {
        filename: "app.js",
        path: __dirname + "/dist",
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            }
        ]
    }
};