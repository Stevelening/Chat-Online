import React from 'react'
import { useRef, useEffect } from 'react'
import MonBouton from './MonBouton'

function DeleteGroup({groups, deleteGroup}){
    const selectedGroupRef = useRef()

    useEffect(()=>{
        
    }, [groups])

    async function handleSubmit(){
        const id = selectedGroupRef.current.value 
        deleteGroup(id)
    }

    return (
        <fieldset id='deletegroup'>
            <legend>Supprimer un groupe</legend>
            {
                (groups && groups.length > 0) ? <select style={{marginRight:"20px"}} ref={selectedGroupRef}>
                    {groups.map(group => (
                        <option key={group.id} id={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select> :
                <p>Il n'y a pas de groupe</p>
            } 
            {(groups && groups.length > 0) && 
            <div style={{margin:"20px 0"}}>
                <MonBouton
                    clickFonction={handleSubmit}
                    title="Supprimer"
                />
            </div>}
        </fieldset>
    )
}

export default DeleteGroup