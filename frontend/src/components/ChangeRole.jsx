import React from 'react'
import { useRef, useEffect, useState } from 'react'
import MonLabel from './MonLabel'
import MonBouton from './MonBouton'

function ChangeRole({users, updateUserRole}){
    const selectedUserRef = useRef()
    const ref1 = useRef()
    const ref0 = useRef()
    const [selectedOption, setSelectedOption] = useState("0"); 
    // par défaut, c'est "Utilisateur" qui est sélectionné

    useEffect(()=>{
        
    }, [users])

    async function handleSubmit(){
        const selectedUser = selectedUserRef.current.value 
        updateUserRole(selectedUser, +selectedOption)
    }

    function handleOptionChange(){
        setSelectedOption(ref0.current.value)
    }

    function handleOptionChange1(){
        setSelectedOption(ref1.current.value)
    }

    return (
        <fieldset id='changerole'>
            <legend>Changer le role</legend>
            <select style={{marginRight:"20px"}} ref={selectedUserRef}>
                {users.map(user => (
                    <option key={user.id} value={user.id}>{user.email}</option>
                ))}
            </select>
            <div style={{margin:"10px 0"}}>
                <label style={{marginRight:"10px"}}>
                    <input type="radio" name="option" value="1" 
                    checked={selectedOption === "1"} 
                    onChange={handleOptionChange1}
                    ref={ref1}/> Administrateur
                </label>
                <label>
                    <input type="radio" name="option" value="0"
                    checked={selectedOption === "0"}
                    onChange={handleOptionChange}
                    ref={ref0}/> Utilisateur
                </label>
            </div>
            <div>
                <MonBouton
                    clickFonction={handleSubmit}
                    title="Editer"
                />
            </div>
        </fieldset>
    )
}

export default ChangeRole