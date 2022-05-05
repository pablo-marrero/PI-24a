import React from 'react'
import { NavLink } from 'react-router-dom'
import "../CssComponents/Inicio.css"

export const Inicio = ({cambioEstado}) => {

  return (
     <section className='inicio'>
        <div>
            <div className='earth'>

            </div>
        </div>


       <div>
         <div>
         <h1>Bienvenido</h1>
         <p>Ingresa para realizar busqueda por país</p>
         {/* <button onClick={()=>cambioEstado(false)}>Ir a pagina principal</button> */}
         <NavLink className="ingreso" to="/home"><button>Ingresar</button></NavLink>
         </div>
       </div>
     </section> 
  )
}
