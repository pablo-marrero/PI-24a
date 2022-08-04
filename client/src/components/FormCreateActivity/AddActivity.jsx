import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {createActivity, getACtivities} from "../../action/actionCountries/index"
import "./AddActivity.css"

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
const { create } = useSelector((state) => state)


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
let { name, dificulty, duration, season} = formu
dispatch(createActivity({name,dificulty, duration,season}))
console.log("cambi2")
dispatch(getACtivities())
}

//Tomar el id de Pais seleccionado
// const getID = (valor)=>{
//   setFormu({
//     ...formu,
//     idPais: formu.idPais.concat(valor)
//   })
//   setValidation({
//     ...validation,
//     select:""
//   })
// }

  return (
  // <div>Hola</div>
      <div>
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
                {/* {create && <span>{create}</span>} */}
                {create && <div><p>{create}</p></div>}
                {validation.boton && <div><p>{validation.boton}</p></div>}
              </div>
            </form>
      </div>
  )
}