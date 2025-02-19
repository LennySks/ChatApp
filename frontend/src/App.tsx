function App() {
    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center p-4">
                <div className="w-full max-w-[500px] border rounded-lg shadow-md flex flex-col bg-white">
                    <h1 className="text-2xl font-bold text-center p-4">Anonymous Chat</h1>

                    {/* Chat Box - Scrollable */}
                    <div className="flex flex-col flex-grow overflow-y-auto p-4 h-[400px] border-b">
                        <div className="chat chat-start">
                            <div className="chat-bubble">
                                It's over Anakin,
                                <br/>
                                I have the high ground.
                            </div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-bubble">You underestimate my power!</div>
                        </div>
                        {/* Add more messages here to test scrolling */}
                    </div>

                    {/* Input Bar - Stays at the bottom */}
                    <div className="flex items-center gap-2 p-4">
                        <input type="text" placeholder="Type here" className="input flex-grow"/>
                        <button className="btn btn-soft btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="size-5">
                                <path
                                    d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
