import React from 'react'
import MonBouton from './MonBouton'
import { useRef } from 'react'

function SendMessage({sendAMessage}){
    const messageRef = useRef()

    async function send(){
        if(messageRef.current.value){
            sendAMessage(messageRef.current.value)
        }
    }

    return (
        <div id='send' style={{border:"1px solid #213547", padding:"10px"}}>
            <input ref={messageRef} type="text" placeholder='Saisir le message' style={{height:"30px", width:"80%", marginRight:"10px"}}/>
            <MonBouton
                clickFonction={send}
                title="Envoyer"
            />
        </div>
    )
}

export default SendMessage