import React from 'react'
import MessageItem from './MessageItem'

function Messages({liste, login}){

    return (
        <div id='messages' style={{height:"300px", overflow:"scroll", border:"1px solid #213547"}}>
            {
                (liste.length > 0) ?
                (liste.map( (m)=> 
                <MessageItem key={m.id} id={m.id} content={m.content} username={m.username} login={login}/>
                )): ""
            }
        </div>
    )
}

export default Messages