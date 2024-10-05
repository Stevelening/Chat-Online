import React from 'react'
import MemberItem from './MemberItem'

function Members({liste, deleteUser}){
    async function deleteUser1(id){
        deleteUser(id)
    }

    return (
        <div id='members'>
            {
                (liste && liste.length > 0) ?
                (liste.map( (m)=> 
                <MemberItem key={m.id} id={m.id} email={m.email} deleteUser={deleteUser1}/>
                )): "Aucun membre"
            }
        </div>
    )
}

export default Members