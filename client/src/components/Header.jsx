import React, {useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../CssComponents/Header.css"
import { useDispatch } from 'react-redux' 
import { resetPais, searchByName } from '../action' 

export const Header = () => {
 let initialForm = {
    name:""
  }

  const [formu, setFormu] = useState(initialForm)
  // const { country } = useSelector((state) => state)
  const dispatch = useDispatch()

  const handelChange = (e)=>{
    setFormu({
        ...formu,
        [e.target.name] : e.target.value
    })
  }

  const HandelSubmit = (e)=>{
    e.preventDefault()
    if(!formu.name){
      alert("Datos incompletos")
      return
    }
      dispatch(searchByName(formu.name))
  }


  // useEffect(()=>{
  //   if(country){
  //     console.log("CARGUE")
  //   }
  //   else{console.log("SIGO CARGANDO")}
  // }, [country])

  const resetCountry = ()=>{
    dispatch(resetPais())
  }

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
                   </label>
                   <input type="submit" value="Buscar"/>
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
              className="Link" to='/about' >
              <span>About</span>
          </NavLink> 
        </div>
    </div>
    </header>
  )
}
