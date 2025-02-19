import express, {Request, Response} from 'express';
import {Server} from 'socket.io'
import {createServer} from "node:http";

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3001;

const io = new Server(httpServer, {});

let messages: [] = [];

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log(`User with id ${socket.id} has connected`);

    socket.on('newMessage', (msg) => {
        console.log('new message', msg);
        messages.push(msg);
        io.emit('newMessage', msg);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
