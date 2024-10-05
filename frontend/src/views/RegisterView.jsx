import { useState, useRef, useEffect, useContext } from 'react'

import MonBouton from '../components/MonBouton'
import MonLabel from '../components/MonLabel'

function RegisterView({createUser, userCreated}) {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [erreurMessage, setErreurMessage] = useState("")

    useEffect(()=>{
        // on met a jour le message d'erreur au fur et a mesure de la saisie
        verifie();
    },[name, email, password, confirmPassword])

    useEffect(()=>{
        // vider le formulaire d'enregistrement
        nameRef.current.value = ""
        setName("")
        emailRef.current.value = ""
        setEmail("")
        passwordRef.current.value = ""
        setPassword("")
        confirmPasswordRef.current.value = ""
        setConfirmPassword("")
    },[userCreated])

    function validEmail(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    function validPassword (password) {
        return /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(password)
    }

    function verifie() {
        let message = ""
        if(nameRef.current.value.length == 0){
            message += "Nom trop court. "
        }
        if (!validEmail(emailRef.current.value)) {
            message += "Email invalide. "
        }
        if (!validPassword(passwordRef.current.value)) {
            message += "Mot de passe faible. "
        }
        if(passwordRef.current.value != confirmPasswordRef.current.value){
            message += "Les mots de passes sont différents."
        }
        setErreurMessage(message)
    }

    async function verifyAndSubmit(){
        if (erreurMessage.length === 0)
            await createUser(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
    }

    function nameChanged(){
        setName(nameRef.current.value)
    }

    function emailChanged(){
        setEmail(emailRef.current.value)
    }

    function passwordChanged(){
        setPassword(passwordRef.current.value)
    }

    function confirmPasswordChanged(){
        setConfirmPassword(confirmPasswordRef.current.value)
    }

    return (
        <fieldset>
            <legend>Pas encore de compte Enregistrez vous</legend>
            <div className="card">
                <MonLabel title="Nom" />
                <input type="text" ref={nameRef} onChange={nameChanged}/>
            </div>
            <div className="card">
                <MonLabel title="Email" />
                <input type="text" ref={emailRef} onChange={emailChanged}/>
            </div>
            <div className="card">
                <MonLabel title="Mot de passe" />
                <input type="password" ref={passwordRef} onChange={passwordChanged}/>
            </div>
            <div className="card">
                <MonLabel title="Confirmez votre Mot de Passe" />
                <input type="password" ref={confirmPasswordRef} onChange={confirmPasswordChanged}/>
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
    )
}

export default RegisterView
