import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const messageStr = message.toString(); // Convert Buffer to string
        console.log('Received:', messageStr);
        // Echo the message back to the client
        ws.send(`Server received: ${messageStr}`);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');