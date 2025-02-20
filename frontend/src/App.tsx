import {MyUserMessage} from "./components/MyUserMessage.tsx";
import {UserMessage} from "./components/UserMessage.tsx";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

const socket = io("http://localhost:3001")

interface UserMessage {
    sessionId: string;
    message: string;
}

function App() {
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])


    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected with ID:", socket.id);
        });

        return () => {
            socket.off("connect");
        };
    }, []);


    function sendMessage() {
        console.log("Sending message", message);
        if (message.trim().length === 0) {
            return;
        }
        if (socket.id === undefined) {
            console.error("Socket ID is undefined");
            return;
        }
        const userMessage: UserMessage = {
            sessionId: socket.id,
            message: message
        }
        socket.emit("newMessage", {
            userMessage
        })
    }

    function handleInputChange(event) {
        setMessage(event.target.value)
    }

    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-[500px] border rounded-lg shadow-md flex flex-col bg-white">
                    <h1 className="text-2xl font-bold text-center p-4">Anonymous Chat</h1>

                    <div className="flex flex-col flex-grow overflow-y-auto p-4 h-[400px] border-b">
                        <MyUserMessage message="Hello there!"/>
                        <UserMessage message="Hi!"/>
                    </div>

                    <div className="flex items-center gap-2 p-4">
                        <input value={message} onChange={handleInputChange} type="text" placeholder="Type here"
                               className="input flex-grow"/>
                        <button onClick={sendMessage} className="btn btn-soft btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="size-5">
                                <path
                                    d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z"/>
                            </svg>
                        </button>
                    </div>

                </div>
                <div>
                    5 users connected
                </div>
            </div>
        </>
    );
}

export default App;
