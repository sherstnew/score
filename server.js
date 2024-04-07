const http = require("http");
const express = require("express");
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on('connection', ws => {
   ws.on('message', m => {
        webSocketServer.clients.forEach(client => client.send(m.toString()));
   });

   ws.on("error", e => ws.send(e));
});

app.get('/', (req, res) => {
   res.send('200');
});

server.listen(8999, () => console.log("Server started"))