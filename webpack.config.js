const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/main.jsx',
	},
	mode: 'production',
	plugins: [
		new webpack.ProvidePlugin({
            $: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			React: 'react',
			ReactDOM: 'react-dom',
			Component: ['react','Component'],
			$conf: path.resolve('./config.yml')
        }),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: '留给岁月一点空间',
			template: 'src/production.html',
		}),
		// Static file copy 
		// new CopyWebpackPlugin([
		// 	{from: 'src/lib/vditor',to: 'plugins/vditor'},
		// 	{from: 'src/favicon.ico',to: 'favicon.ico'}
		// ]),
		new webpack.HotModuleReplacementPlugin(),
		// OccurrenceOrderPlugin is needed for webpack 1.x only
		new webpack.optimize.OccurrenceOrderPlugin(),
		// Use NoErrorsPlugin for webpack 1.x
		new webpack.NoEmitOnErrorsPlugin(),
	],
	output: {
		path: path.resolve(__dirname,'dist'),
		// filename: "main.js",
		filename: 'js/[name].bundle.js',
		publicPath: '/'
	},
	node: {
		fs: 'empty'
	},
	devServer: {
		contentBase: './dist',
		compress: true,
		port: 9000,
		hot: true,
	},
	resolve: {
		extensions: ['.js', '.jsx'],
    },
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				exclude: /(node_modules)/,
				resolve: {
				  extensions: [".jsx",".js"]
				},
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-transform-react-jsx'],
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader','css-loader']
			},
			{
				test: /\.scss$/,
				use: ['style-loader','css-loader','sass-loader']
			},
			{
				test: /\.yml$/,
				use: [
					{
						loader: 'json-loader'
					},
					{
						loader: path.resolve('./tools/yaml-loader.js')
					}
				]
			}
		],
	},
}

