import React from 'react'
import "../CssComponents/LookActivity.css"

export const LookActivity = ({datos, index}) => {
    console.log(datos)
  return (
        <div className="desplegable-uno">
            
            <label htmlFor=""><a href={`#target${index}`}>{datos.name}</a></label>
			
            <div id={`target${index}`}>
                <p>{datos.dificulty}</p>
                <p>{datos.duration}</p>
                <p>{datos.season}</p>
            </div>
		</div>
  )
}
