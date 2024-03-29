import React, {useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import "./Header.css"
import { useDispatch, useSelector } from 'react-redux' 
import { resetPais, searchByName, ortherBy } from '../../action/actionCountries/index' 
import { startGoogleLogout } from "../../action/actionLogin&Register/action"

export const Header = () => {
 let initialForm = {
    name:""
  }


  const [formu, setFormu] = useState(initialForm)
  const { errores } = useSelector((state) => state.reducer)
  const [error, setError] = useState(errores)
  const dispatch = useDispatch()
  //Captura cambios Form
  const handelChange = (e)=>{
    setFormu({
        ...formu,
        [e.target.name] : e.target.value
    })

    // setError("")
  }

  //Captura boton buscar pais
  const HandelSubmit = (e)=>{
    e.preventDefault()
    if(!formu.name){
      setError("Ingresa el pais que desas buscar")
      return
    }
        dispatch(searchByName(formu.name.toLowerCase()))
    }


  //Reset el country del reducer
  const resetCountry = ()=>{
    dispatch(resetPais())
    dispatch(ortherBy("all"))
    setFormu({
      ...formu,
      name: ""
    })
  }
  const handelLogout = ()=>{
    dispatch(startGoogleLogout())
  }

//Control de error del reducer. Renderiza error
  useEffect(()=>{
    if(errores){
      setError(errores.errores)
    }
  },[errores])

  return (
    <header>
    <div className='content-nav'> 
        <NavLink
            activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
            className='img-Header' to='/home'  onClick={resetCountry}>
            <span ></span>
        </NavLink>

        <div className='img-busca'>   
             <form onSubmit={HandelSubmit}> 
               <div>
                 <label htmlFor="">
                   <input type="text" name="name" placeholder='Search country...' onChange={handelChange} value={formu.name}/>
                   {errores && <span>{error}</span>}
                </label>
                <input type="submit" value="Buscar" name='botoncito'/>
               </div>
             </form>
         </div>

        <label htmlFor="sdc" className='apretame'>
        </label>
          <input type="checkbox" name="cheaBurger" id="sdc"/>
        <div className='content-link'> 

          <NavLink
              className="Link" to='/home' onClick={resetCountry}>
              <span>Home</span>
          </NavLink>
          

          <NavLink
              className="Link" to='/TableActivities' onClick={resetCountry}>
              <span>Table Activities</span>
          </NavLink>

          <div className='Link' onClick={handelLogout}>
            <span>Logout</span>
          </div>
        </div>

    </div>

    </header>
  )
}
