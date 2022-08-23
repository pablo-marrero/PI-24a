import React from 'react'
import "../CssComponents/LookActivity.css"

export const LookActivity = ({datos, index}) => {
    // console.log(datos)
  return (
        <div className="desplegable-uno">
            <p>{datos.name}</p>
            <p>{datos.dificulty}</p>
            <p>{datos.duration}</p>
            <p>{datos.season}</p>
		  </div>
  )
}
