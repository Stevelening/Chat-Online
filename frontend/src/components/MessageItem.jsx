import React from 'react'
import { MessageStyle } from '../assets/MessageStyle'
import { useState, useEffect } from 'react'

function MessageItem({id, content, username, login}){
    const [type, setType] = useState()

    useEffect(()=>{
        getMessageType()
    },[])

    async function getMessageType(){
        if(login == username){
            setType(1)
        }
        else{
            setType(2)
        }
    }

    return (
        <div style={(type == 1) ? MessageStyle.div1 : MessageStyle.div2}>
            <label style={MessageStyle.label}>{content}</label>
            {(type == 2) && <label>{username}</label>}
        </div>
    )
}

export default MessageItem