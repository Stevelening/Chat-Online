import React from 'react'
import MonBouton from './MonBouton'

function MemberItem({id, email, deleteUser}){
    async function removeUserFromGroup(){
        deleteUser(id)
    }

    return (
        <div style={{display:"flex", justifyContent:"space-between", margin:"10px"}}>
            <label>{email}</label>
            <MonBouton
                clickFonction={removeUserFromGroup}
                title="Supprimer"
            />
        </div>
    )
}

export default MemberItem