import React from 'react'
import Messages from '../components/Messages'
import { useState, useEffect,useContext } from 'react'
import SendMessage from '../components/SendMessage'
import { AppContext } from '../AppContext'

function MessagesView({gid, name, login, invalid}){
    const {token, refresh} = useContext(AppContext)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState(false)

    useEffect(()=>{
        getMessages()

        const timerID = setInterval(getMessages, 5000, gid) // actualisation chaque 5s
        return (()=>clearInterval(timerID))
    },[newMessage, gid, refresh])

    async function getMessages(){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/messages/'+gid,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during get all messages : ', error);
        }))

        let data = await response.json()
        if(data.status){
            if(data.data.length > 0){
                let newMessages = await addUserNames(data.data)
                setMessages(newMessages)
            }
            else{
                setMessages([])
            }
        }
        else{
            invalid()
            //setMessages([])
        }
    }

    async function addUserNames(liste){
        // we get all users
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/users',
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            }
        })
        .catch(error => {
            console.error('An error occured during get all users : ', error);
        }))

        let data = await response.json()
        if(data){
            for(let l of liste){
                for(let d of data.data){
                    if(l.senderId == d.id){
                        l.username = d.name
                    }
                }
            }
            return liste
        }
        else{
            return []
        }
    }

    async function sendAMessage(content){
        const response = await (await fetch('https://web-project.osc-fr1.scalingo.io/api/messages/'+gid,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "x-access-token": token
            },
            body: JSON.stringify({ content })
        })
        .catch(error => {
            console.error('An error occured during post a message : ', error);
        }))

        let data = await response.json()
        if(data){
            setNewMessage(!newMessage)
        } 
    }

    return (
        <fieldset style={{width: "40%", padding:"0"}}>
            <legend style={{marginLeft:"20px"}}>Discussion sur le groupe <label style={{fontWeight:"bold"}}>{name}</label></legend>
            <Messages liste={messages} login={login}/>
            <SendMessage sendAMessage={sendAMessage}/>
        </fieldset>
    )
}

export default MessagesView