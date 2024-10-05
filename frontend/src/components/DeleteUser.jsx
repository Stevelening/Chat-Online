import React from 'react'
import { useRef, useEffect } from 'react'
import MonBouton from './MonBouton'

function DeleteUser({users, deleteUser}){
    const selectedUserRef = useRef()

    useEffect(()=>{

    }, [users])

    async function handleSubmit(){
        const id = selectedUserRef.current.value 
        deleteUser(id)
    }

    return (
        <fieldset id='deleteuser'>
            <legend>Supprimer un utilisateur</legend>
            <select style={{marginRight:"20px"}} ref={selectedUserRef}>
                {users.map(user => (
                    <option key={user.id} id={user.id} value={user.id}>{user.email}</option>
                ))}
            </select>
            <div style={{margin:"20px 0"}}>
                <MonBouton
                    clickFonction={handleSubmit}
                    title="Supprimer"
                />
            </div>
        </fieldset>
    )
}

export default DeleteUser