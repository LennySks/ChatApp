import {Server} from "socket.io"
import http from "http"
import express from "express"

export const app = express()
export const server = http.createServer(app)
export const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

// used to store online users
const userSocketMap = new Map<string, string>() // {userId: socketId}

export function getReceiverSocketId(userId: string) {
    return userSocketMap.get(userId)
}

io.on("connection", (socket) => {
    console.log("User connected: ", socket.id)
    const userId = socket.handshake.query.userId as string;
    if (userId && userId !== 'undefined') {
        userSocketMap.set(userId, socket.id);
    }
    // io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id)
        userSocketMap.forEach((value, key) => {
            if (value === socket.id) {
                userSocketMap.delete(key);
            }
        })
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})
