var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var paths = require('../config/paths.js')

var config = require(paths.webpackConfig)
// config.entry.unshift('webpack-dev-server/client?http://localhost:8080/')
var compiler = webpack(config)
var server = new WebpackDevServer(compiler, {
	contentBase: paths.build
})
server.listen(8080)
