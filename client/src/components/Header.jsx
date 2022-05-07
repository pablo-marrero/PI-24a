import React, {useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import "../CssComponents/Header.css"
import { useDispatch, useSelector } from 'react-redux' 
import { resetPais, searchByName } from '../action' 

export const Header = () => {
 let initialForm = {
    name:""
  }


  const [formu, setFormu] = useState(initialForm)
  const { errores } = useSelector((state) => state)
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
    setFormu({
      ...formu,
      name: ""
    })
  }

//Control de error del reducer. Renderiza error
  useEffect(()=>{
    if(errores){
      setError(errores.errores)
    }
    // else{setError("")}
  },[errores])

  return (
    <header>
    <div> 
        <NavLink
            activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
            className='img-Header' to='/home'  onClick={resetCountry}>
            <span ></span>
        </NavLink>

        <div className='img-busca'>   
             <form onSubmit={HandelSubmit}> 
               <div>
                 <label htmlFor="">
                   <input type="text" name="name" placeholder='Busca el país...' onChange={handelChange} value={formu.name}/>
                   {errores && <span>{error}</span>}
                </label>
                   <input type="submit" value="Buscar" name='botoncito'/>
               </div>
             </form>
         </div>


        <div>
          <NavLink
              // activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
              className="Link" to='/home' onClick={resetCountry}>
              <span>Home</span>
          </NavLink>
          <NavLink
             // activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
             className="Link" to='/add' >
             <span>Add Activity</span>
          </NavLink>

          <NavLink
              // activeStyle={{ color: '#b3b3b3', fontWeight: 'bold' }}
              className="Link" to='/about' onClick={resetCountry}>
              <span>About</span>
          </NavLink> 
        </div>
    </div>
    </header>
  )
}
