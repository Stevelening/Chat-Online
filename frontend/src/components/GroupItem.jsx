import React from 'react'

function GroupItem({id, name, selectedItem, type, index}){
    function handleClick(){
        selectedItem(id, name, type)
    }
    return (<li onClick={handleClick} 
            style={{ fontWeight: index === id+":"+type ? 'bold' : 'normal' }}
            >{name}</li>)
}

export default GroupItem