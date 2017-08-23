var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    var url = require('url').parse(request.url);
    var filename = url.pathname.substring(1);
    
    var type;
    switch (filename.substring(filename.lastIndexOf('.') + 1)) {
        case 'html':
        case 'htm': type = 'text/html; charset=UTF-8'; break;
        case 'js': type = 'application/javascript; charset=UTF-8'; break;
        case 'css': type = 'text/css; charset=UTF-8'; break;
        case 'txt': type = 'text/plain; charset=UTF-8'; break;
        case 'manifest': type = 'text/cache-manifest; charset=UTF-8'; break;
        default: type = 'application/octet-stream'; break;
    }
    fs.readFile(filename, function (err, content) {
        if (err) {
            response.writeHead(404, {
                'Content-Type': 'text/plain; charset=UTF-8'
            });
            response.write(err.message);
            response.end();
        } else {
            response.writeHead(200, { 'Content-Type': type });
            response.write(content);
            response.end();
        }
    });
}).listen(process.env.PORT || 5000);
console.log('the server is started.');















