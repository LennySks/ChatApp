export function MyUserMessage({message}: { message: string }) {
    return (
        <div className="chat chat-end">
            <div className="chat-bubble">{message}</div>
        </div>
    );
}