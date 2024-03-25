module.exports = {
    // publicPath: './',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:7001',
                pathRewrite: {'^/api':''}
            }
        }
        },
        lintOnSave: false
    }