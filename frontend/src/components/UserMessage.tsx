export function UserMessage({message}: { message: string }) {
    return (
        <div className="chat chat-start">
            <div className="chat-bubble">
                {message}
            </div>
        </div>
    )
}