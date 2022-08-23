import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
import "./Inicio.css"
import { loginWithGoogle } from '../../action/actionLogin&Register/action'

export const Welcome = ({cambioEstado}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { uid } = useSelector((state) => state.auth)

  const handelLoginWithGoogle = async (e)=>{
    e.preventDefault()
    try {
      if(!uid){
        dispatch(await loginWithGoogle())
        history.push("/home")
      }
      else history.push("/home")
    } catch (error) {
      console.log(error)
    }
  }

  return (
     <section className='inicio'>
        <div>
            <div className='earth'>

            </div>
        </div>


       <div>
         <div>
         <h1>Welcome</h1>
         <p>Log in to access the platform</p>
         {/* <button onClick={()=>cambioEstado(false)}>Ir a pagina principal</button> */}
         {/* <NavLink className="ingreso" to="/home"><button>Ingresar</button></NavLink> */}
         <button className="income" onClick={handelLoginWithGoogle}>Come on</button>
         </div>
       </div>
     </section> 
  )
}
