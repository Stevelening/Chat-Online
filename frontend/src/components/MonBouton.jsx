import React from 'react'

function MonBouton({clickFonction, title}){
  return (
    <button onClick={clickFonction}>
      {title}
    </button>
  )
}

export default MonBouton