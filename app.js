// content of index.js
const http = require('http');
const port = 3000;

const requestHandler = (request, response) => {
    if (request.url == '/') {
        var magnet = require('./newsagencysample');
        magnet.RUN();
        response.end('Request Ended - Check Console for results.');
    }
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
    if (err) {
        return console.log('An error occured', err);
    }
    console.log(`server is listening on ${port}`);
})