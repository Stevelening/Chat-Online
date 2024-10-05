import React from 'react'
import { NotificationStyle } from '../assets/NotificationStyle'

function Notification({type}){
  return (
    <div style={(type == "success") ? NotificationStyle.success : NotificationStyle.error}>
        <span style={{ color: (type == "success") ? "green" : "red" }}> {(type == "success") ? "Compte créé avec succes." : "Erreur lors de la création du compte."} </span>
    </div>
  )
}

export default Notification