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
  if(!/^[a-z ,.'-]+$/.test(formu.name) && formu.name !== ""){error.name = "This field can only contain alphabetic characters"}

  if((formu.dificulty > 5 || formu.dificulty < 1) && formu.dificulty !== ""){error.dificulty = "The value must be greater than 1 and less than 5"}

  if(!/([0-9]+[.,]*)+/.test(formu.duration) && formu.duration !== ""){
    error.duration = "This field only accepts decimal and integer numbers"
  }
  
  if(!/^[a-z ,.'-]+$/.test(formu.season) && formu.season !== ""){error.season = "The season can only caontain alphabetic characters"}

  return error
}


const validate = (e)=>{
  e.preventDefault()
  console.log(error.hasOwnProperty("name"))
  if(!formu.name.trim() || !formu.dificulty.trim() || !formu.duration.trim() || !formu.season.trim()){
    setValidation({
            ...validation,
            boton: "Please, complete all fields" 
          })
          return
  }
  if(error.hasOwnProperty("name") || error.hasOwnProperty("dificulty") || error.hasOwnProperty("duration") || error.hasOwnProperty("season")){
    setValidation({
      ...validation,
      boton: "Please check to errors" 
    })
    return
  }
let { name, dificulty, duration, season} = formu
dispatch(createActivity({name,dificulty, duration,season}))
dispatch(getACtivities())
}



  return (
      <div>
          <form className='activity'>
                <h1>Create the Activity</h1>
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
                <button onClick={validate}>Create</button>
                {/* {create && <span>{create}</span>} */}
                {create && <div><p>{create}</p></div>}
                {validation.boton && <div><p>{validation.boton}</p></div>}
              </div>
            </form>
      </div>
  )
}