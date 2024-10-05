import React from 'react'
import { UpdatePasswordStyle } from '../assets/UpdatePasswordStyle'
import MonBouton from './MonBouton'
import { useRef, useState, useContext } from 'react'
import { AppContext } from '../AppContext'

function UpdatePassword(){
    const {token} = useContext(AppContext)
    const passwordRef = useRef()
    const [password, setPassword] = useState("")
    const [weak, setWeak] = useState(0)

    async function handleSubmit(){
        // we edit password here
        let data
        const response = await(
            await fetch("https://web-project.osc-fr1.scalingo.io/api/password",
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    "x-access-token": token
                },
                body: JSON.stringify({ password })
            }).catch(error => {
                console.error('An error occured during updating password : ', error);
              })
        )

        data = await response.json()
        if(data){
            console.log(data)
        }
        // we empty the field
        passwordRef.current.value = ""
        setPassword("")
    }

    function passwordChanged(){
        if(!validPassword(passwordRef.current.value) && (passwordRef.current.value != "")){
            setWeak(1) // too weak
        }
        else{
            setWeak(2) // ok or empty
        }
        setPassword(passwordRef.current.value) // update password
    }

    function validPassword (password) {
        return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
    }

    return (
        <div style={UpdatePasswordStyle.div}>
            <div style={{display:"flex"}} id='updatepassword'>
                <label>Changer votre mot de passe</label>
                <input type="password" ref={passwordRef} onChange={passwordChanged} style={UpdatePasswordStyle.input}/>
                <MonBouton
                    clickFonction={handleSubmit}
                    title="Modifier"
                />
            </div>
            {(weak == 1) && <span style={{ color: "red" }}>Mot de passe faible. </span>}
        </div>
    )
}

export default UpdatePassword