const proxy = [{
    context: ['/api'],
    target: 'http://127.0.0.1:8000/',
    secure: false,
    logLevel: false,
    pathRewrite: { '^/api': '' }
}];
module.exports = proxy;