import express, {Request, Response} from 'express';
import {Server} from 'socket.io'
import {createServer} from "node:http";

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3001;

const io = new Server(httpServer, {});

interface UserMessage {
    sessionId: string;
    message: string;
    timeStamp: Date;
}

type IncomingUserMessage = Omit<UserMessage, 'timeStamp'>

let messages: UserMessage[] = [];

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log(`User with id ${socket.id} has connected`);

    socket.on('newMessage', (data: { userMessage: IncomingUserMessage }) => {
        const msg = data.userMessage;
        console.log('new message', msg);
        messages.push({
            sessionId: msg.sessionId,
            message: msg.message,
            timeStamp: new Date()
        });
        io.emit('newMessage', msg);
        console.log("Chat Logs: ", messages)
    })

    socket.on('disconnect', () => {
        console.log(`User with id ${socket.id} disconnected`);
    });
})

httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
