import app from './app.js';
import config from './config.js';
import https from 'https';
import http from 'http';

const httpListenerPort  = process.env.PORT || config.httpPort || 80;
const httpsListenerPort = process.env.PORT || config.httpsPort || 443;

const OPTIONS = {};

const httpServer = http.createServer(app).listen(httpListenerPort, () => {
    console.log(`app is listening at localhost: ${httpListenerPort}`);
});

const httpsServer = https.createServer(OPTIONS, app).listen(httpsListenerPort, () => {
    console.log(`app is listening at localhost: ${httpsListenerPort}`);
});

process.on('SIGTERM', () => {
    httpServer.close(() => {
        console.log('SIGTERM issued...app is shutting down');
        process.exit(0);
    });
    httpsServer.close(() => {
        console.log('SIGTERM issued...app is shutting down');
        process.exit(0);
    });
});
