const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const options = {
	target: 'https://gandalf-backend.herokuapp.com/',
	changeOrigin: true,
};

const apiProxy = createProxyMiddleware(options);

const app = express();

app.use('/api', apiProxy);

app.use(express.static(__dirname + '/dist/gandalf'));

app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname + '/dist/gandalf/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);