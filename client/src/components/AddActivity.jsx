import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getCountryActSelec,updateActivity} from "../action"
import "../CssComponents/AddActivity.css"
import { CheckboxAct } from './CheckboxAct'

export const AddActivity = ({id}) => {

  let initialForm = {
    idPais: [],
    name:"",
    dificulty:"",
    duration:"",
    season:"",
    
  }

  const [validation, setValidation] = useState({
    boton: "",
    select:""
  })

const [formu, setFormu] = useState(initialForm)
const [error, setError] = useState({})
const [changeStateButton, setChangeStateButton] = useState(false)
const { countries, create, activities } = useSelector((state) => state)


const dispatch = useDispatch()

//Capturar datos input
const handelChange = (e)=>{
  setFormu({
      ...formu,
      [e.target.name] : e.target.value
  })
}


//Funcion para blur en input
const handelBlur = (e)=>{
  handelChange(e)
  setError(validateForm(formu))
}



//Validar form
const validateForm = (formu)=>{
  let error = {}

  setValidation({
    ...validation,
    boton: "" 
  })
  if(!/^[a-z ,.'-]+$/.test(formu.name) && formu.name !== ""){error.name = "El nombre solo puede contener caracteres alfabeticos"}

  if((formu.dificulty > 5 || formu.dificulty < 1) && formu.dificulty !== ""){error.dificulty = "El valor ingresado debe ser mayor a 1 y menor a 5"}

  if(!/([0-9]+[.,]*)+/.test(formu.duration) && formu.duration !== ""){
    error.duration = "El formato debe ser entero , decimal (90,10)"
  }
  
  if(!/^[a-z ,.'-]+$/.test(formu.season) && formu.season !== ""){error.season = "La temporada solo puede contener caracteres alfabeticos"}

  return error
}



//Funcion para boton pasar Siguiente pagina
const changeTab = (e)=>{
  e.preventDefault()
  console.log(error.hasOwnProperty("name"))
  if(!formu.name.trim() || !formu.dificulty.trim() || !formu.duration.trim() || !formu.season.trim()){
    setValidation({
            ...validation,
            boton: "Por favor completa todos los campos" 
          })
          return
  }
  if(error.hasOwnProperty("name") || error.hasOwnProperty("dificulty") || error.hasOwnProperty("duration") || error.hasOwnProperty("season")){
    setValidation({
      ...validation,
      boton: "Por favor verifica los errores" 
    })
    return
  }
setChangeStateButton(true)
dispatch(getCountryActSelec(formu.name))
console.log("cambi2")
}



//Tomar el id de Pais seleccionado
const getID = (valor)=>{
  setFormu({
    ...formu,
    idPais: formu.idPais.concat(valor)
  })
  setValidation({
    ...validation,
    select:""
  })
}


//Realiza post
  const sendActivity = (e)=>{
    e.preventDefault()
    // console.log(formu)
    if(formu.idPais.length == 0){
      setValidation({
        ...validation,
        select: "Se debe agregar habilidad a un pais para poder enviar el formu" 
      })
      return
    }
    else{
      console.log(activities)
      let {idPais, name, dificulty, duration, season} = formu
      dificulty = parseInt(dificulty)
      duration = parseInt(duration)
      dispatch(updateActivity({idPais,name,dificulty, duration,season}))  
    }
  }

 
// const handelSubmit = (e)=>{
//   e.preventDefault()
//   if(!formu.name || !formu.dificulty || !formu.duration || !formu.season){
//       alert("Datos incompletos")
//       return
//   }
//   // dispatch(sendCountry([{id},{formu}]))
//   setFormu(initialForm)
// }
 


  return (
      <>
          {(!changeStateButton)?
          <form className='activity'>
                <h1>Creación de Actividad</h1>
                <div>
                    <label htmlFor="Name"></label>
                        <input type="text" id="name" name='name' placeholder="Name"
                         onChange={handelChange} onBlur={handelBlur} value={formu.name}/>
                         {error.name && <div> <span></span><p>{error.name}</p></div>}
                </div>

                <div>
                    <label htmlFor="dificulty"></label>
                        <input type="number" id="dificulty" name='dificulty' placeholder="Dificulty"
                         onChange={handelChange} onBlur={handelBlur} value={formu.dificulty}/>   
                         {error.dificulty && <div> <span></span><p>{error.dificulty}</p></div>}                
                </div>

                <div>
                    <label htmlFor="duration"></label>
                        <input type="text" id="pass" name='duration' placeholder="Duration"
                         onChange={handelChange} onBlur={handelBlur} value={formu.duration}/>   
                         {error.duration && <div> <span></span><p>{error.duration}</p></div>}                
                </div>

                <div>
                    <label htmlFor="season"></label>
                        <input type="text" id="season" name='season' placeholder='Season'
                         onChange={handelChange} onBlur={handelBlur} value={formu.season}/>
                         {error.season && <div> <span></span><p>{error.season}</p></div>}
                </div>

              <div id='botonCambio'>
                <button onClick={changeTab}>Siguiente</button>
                {validation.boton && <div><p>{validation.boton}</p></div>}
              </div>
            </form>
            :
            <div className='divActivity'>
              <div>
                <h2>Datos actividad</h2>
                <div>
                    <div>
                      <p>Name:</p>
                      <p>Dificulty:</p>
                      <p>Duration:</p>
                      <p>Season:</p>
                    </div>

                    <div>
                      <p>{formu.name}</p>
                      <p>{formu.dificulty}</p>
                      <p>{formu.duration}</p>
                      <p>{formu.season}</p>
                    </div>
                  </div>
              </div>

              <form >
                <div>
                      <h2>Selecciona los paises</h2>
                    <div>
                     {countries?countries.map(e=> <CheckboxAct 
                                   key={e.id}
                                   id={e.id}
                                   name={e.name}
                                   // imgFlags={e.imgFlags}
                                   // continent={e.continent}
                                   // capital={e.capital}
                                   // population={e.population}
                                   // subregion={e.subregion}
                                   getID={getID}
                             />)
                               :console.log("cargando")
                     }
                    </div>
                </div>
                <div className='botonCrear'>
                   <button onClick={sendActivity}>Crear</button>
                   {validation.select  && <span>{validation.select}</span>}
                   {create && <span>{create}</span>}
                </div>



              </form>
            </div>
          }
      </>
  )
}
