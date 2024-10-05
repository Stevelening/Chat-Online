import React from 'react'
import { MonLabelStyle } from '../assets/MonLabelStyle'

function MonLabel({title}){
  return (
    <label style={ MonLabelStyle.label }>{title}</label>
    //<label style={ {marginRight: "20px"} }>{title}</label>
  )
}

export default MonLabel