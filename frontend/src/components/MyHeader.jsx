import React from 'react'
import { MyHeaderStyle } from '../assets/MyHeaderStyle'
import "../assets/MyHeader.css"
import { AppContext } from '../AppContext'
import { useContext } from 'react'

function MyHeader({title}){
  const {setToken} = useContext(AppContext)

  function handleClick(){
    setToken(undefined) // déconnexion
  }

  return (
    <p className='deconnexion' id='deconnexion' onClick={handleClick}>{title}</p>
  )
}

export default MyHeader