const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
	plugins: [
		new MonacoWebpackPlugin({
			'main.css': '/monaco-editor/min/vs/editor/editor.main.css',
		}),
	],
};
