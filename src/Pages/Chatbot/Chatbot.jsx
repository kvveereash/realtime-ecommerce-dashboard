import React, { useState } from "react";
import "./Chatbot.css";

function ChatBot(){
    const [open,setOpen] = useState(false);
    const [message,setMessage] = useState("");
    const [chat,setChat] = useState([]);


    const sendMessage = async()=>{

        if(message.trim()==="")
            return;

        const userMessage = {
            sender:"user",
            text:message
        };

        setChat((prev)=>[
            ...prev,
            userMessage
        ]);

        try{
            const res = await fetch(
                "https://realtime-ecommerce-dashboard-1.onrender.com/ai",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        message
                    })
                }
            );

            const data = await res.json();
            console.log(data);
            const botMessage = {
                sender:"bot",
                text:data.reply || "AI failed to respond"
            };
            setChat((prev)=>[
                ...prev,
                botMessage
            ]);
        }
        catch(error){
            console.log(error.message);
        }
        setMessage("");
    }

    return(
        <>

        <button className="chat-toggle"onClick={()=>setOpen(!open)} >💬</button>
        {open && (
            <div className="chatbot">
                <div className="chat-header">AI Food Assistant </div>
                <div className="chat-body">
                    {chat.map((c,index)=>(
                        <div key={index}className={c.sender==="user" ? "user-message": "bot-message"}>{c.text}</div>
                    ))}
                </div>
                <div className="chat-footer">
                    <input type="text"placeholder="Ask something..." value={message} onChange={(e)=>setMessage(e.target.value)}/>
                    <button onClick={sendMessage}> Send </button>
                </div>
            </div>
        )}
        </>
    )
}

export default ChatBot;