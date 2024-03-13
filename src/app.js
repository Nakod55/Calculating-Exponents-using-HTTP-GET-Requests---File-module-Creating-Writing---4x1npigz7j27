const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
      const obj = JSON.parse(chunks)
      const value1 = obj.num1;
      const value2 = obj.num2;
      if(value1<=0||value2<0)
      {
        res.writeHead(404,{"Content-Type":"plain/text"});
        res.end("The operation cannot be performed");
      }
      else if(!isNaN(value1)&&!isNaN(value2)){
        res.writeHead(200,{"Content-Type":"plain/text"});
        res.end(`The result is ${value1**value2}`);
      }
      else{
        res.writeHead(400,{"Content-Type":"plain/text"});
        res.end("Bad Request");
      }


      // Write code here to calculate power of a number
      
    });
    }
});

module.exports = server;
      