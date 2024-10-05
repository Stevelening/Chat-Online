import React from 'react'
import GroupItem from './GroupItem'

function Groups({liste, selectedItem, type, index}){
    function selectedItem1(key, name){
        selectedItem(key, name, type)
    }

    return (
        <ul>
            {
            (liste && liste.length > 0) ?
                (liste.map( (g)=> 
                <GroupItem key={g.id} id={g.id} 
                name={g.name} selectedItem={selectedItem1} 
                type={type} index={index}/>
                ))
            : "Aucun groupe"
            }
        </ul>
    )
}

export default Groups