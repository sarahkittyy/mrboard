const { resolve } = require('path');
require('dotenv').config();

module.exports = {
	outputDir: 'dist/frontend',
	publicPath: process.env.PUBLIC_PATH,
	pages: {
		index: {
			entry: 'src/frontend/index.js',
			template: 'src/frontend/index.html',
			title: 'MRBoard',
		},
	},
	runtimeCompiler: true,
	devServer: {
		port: process.env.VUE_APP_PORT,
		public: `${process.env.VUE_APP_URL}:${process.env.VUE_APP_PORT}`,
		watchOptions: {
			poll: 1000,
			aggregateTimeout: 500,
		},
		https: true,
		key: resolve(__dirname, 'server.key'),
		cert: resolve(__dirname, 'server.cert'),
		proxy: {
			'/': {
        target: `http://0.0.0.0:${process.env.BACKEND_PORT}`,
			},
		},
		writeToDisk: true,
	},
	configureWebpack: {
		resolve: {
			alias: {
				'~': resolve(__dirname, 'src/frontend/components'),
				'@': resolve(__dirname, 'src/frontend/styles'),
			}
		}
	},
};
