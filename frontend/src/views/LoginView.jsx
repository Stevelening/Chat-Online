import { useState, useRef, useEffect } from 'react'

import MonBouton from '../components/MonBouton'
import MonLabel from '../components/MonLabel'
import RegisterView from './RegisterView'
import Notification from '../components/Notification'

function LoginView({isInfoValid}) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [erreurMessage, setErreurMessage] = useState("")
    const [userCreated, setUserCreated] = useState(false)
    const [printNotif, setPrintNotif] = useState(0)

    useEffect(()=>{
        // on met a jour le message d'erreur au fur et a mesure de la saisie
        verifie();
    },[email, password])

    function validEmail(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    function validPassword (password) {
        return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password) 
                || (password === "admin123") // an exception for the admin
    }

    function verifie() {
        let message = ""
        if (!validEmail(emailRef.current.value)) {
            message += "Email invalide. "
        }
        if (!validPassword(passwordRef.current.value)) {
            message += "Mot de passe faible."
        }
        setErreurMessage(message)
    }

    function verifyAndSubmit(){
        if (erreurMessage.length === 0)
            isInfoValid(emailRef.current.value, passwordRef.current.value)
    }

    function emailChanged(){
        setEmail(emailRef.current.value)
    }

    function passwordChanged(){
        setPassword(passwordRef.current.value)
    }

    async function createUser(name, email, password) {
        let data
        const response = await(
            await fetch("https://web-project.osc-fr1.scalingo.io/register",
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            }).catch(error => {
                console.error('An error occured during register : ', error);
              })
        )

        data = await response.json()

        if(data.status){
            //alert("Votre compte a été créé avec succes")
            emailRef.current.value = email
            setEmail(email)
            setUserCreated(!userCreated)
            setPrintNotif(1) // succes
        }
        else{
            setPrintNotif(2) // error
        }
    }

    return (
        <div>
            {(printNotif != 0) && <Notification type={(printNotif == 1) ? "success" : "error"}/>}
            <fieldset>
                <legend>Se connecter</legend>
                <div className="card">
                    <MonLabel title="Email" />
                    <input type="text" ref={emailRef} onChange={emailChanged} />
                </div>
                <div className="card">
                    <MonLabel title="Mot de passe" />
                    <input type="password" ref={passwordRef} onChange={passwordChanged} />
                </div>
                <div className="card1">
                    <MonBouton
                        clickFonction={verifyAndSubmit}
                        title="OK"
                    />
                </div>
                <div className="card">
                    <span style={{ color: "red" }}> {erreurMessage} </span>
                </div>
            </fieldset>
            <RegisterView createUser={createUser} userCreated={userCreated}/>
        </div>
    )
}

export default LoginView
