const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString(); 
    });

    req.on('end', () => {
      try {
        const obj = JSON.parse(body); 
        const value1 = parseInt(obj.num1, 10);
        const value2 = parseInt(obj.num2, 10);

        if (value1 <= 0 || value2 < 0) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("The operation cannot be performed");
        } else if (!isNaN(value1) && !isNaN(value2)) {
          res.writeHead(200, { "Content-Type": "text/plain" });
          const result = Math.pow(value1, value2);
          res.end(`The result is ${result}`);
        } else {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Bad Request");
        }
      } catch (error) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request");
      }
    });
  }
});

module.exports = server;
