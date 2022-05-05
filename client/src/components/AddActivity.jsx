import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {updateActivity} from "../action"
import "../CssComponents/AddActivity.css"
import { CheckboxAct } from './CheckboxAct'

export const AddActivity = ({id}) => {

  let initialForm = {
    id: [],
    name:"",
    dificulty:"",
    duration:"",
    season:""
  }

const [formu, setFormu] = useState(initialForm)
const [error, setError] = useState({})
const [changeStateButton, setChangeStateButton] = useState(false)
const { countries } = useSelector((state) => state)


const dispatch = useDispatch()


const handelChange = (e)=>{
  setFormu({
      ...formu,
      [e.target.name] : e.target.value
  })
}

const handelBlur = (e)=>{
  handelChange(e)
  setError(validateForm(formu))
}


const changeTab = (e)=>{
  e.preventDefault()
  if(!formu.name || !formu.dificulty || !formu.duration || !formu.season){
          alert("Datos incompletos")
          return
  }
setChangeStateButton(true)
console.log("cambi2")
}



const getID = (valor)=>{
  setFormu({
    ...formu,
    // id: [...formu.id,valor]
    id: formu.id.concat(valor)
  })
}

  const sendActivity = (e)=>{
    e.preventDefault()
    // console.log(formu)
    if(formu.id.length == 0){
      alert("Elige un pais para agregar habilidad")
      return
    }
    else{
      dispatch(updateActivity(formu))
    }
  }

  const validateForm = (formu)=>{
    if(!formu.name.trim()){
      error.name = "El campo Nombre es requerido"
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
                </div>

                <div>
                    <label htmlFor="dificulty"></label>
                        <input type="email" id="dificulty" name='dificulty' placeholder="Dificulty"
                         onChange={handelChange} onBlur={handelBlur} value={formu.dificulty}/>                   
                </div>

                <div>
                    <label htmlFor="duration"></label>
                        <input type="duration" id="pass" name='duration' placeholder="Duration"
                         onChange={handelChange} onBlur={handelBlur} value={formu.duration}/>                   
                </div>

                <div>
                    <label htmlFor="season"></label>
                        <input type="text" id="season" name='season' placeholder='Season'
                         onChange={handelChange} onBlur={handelBlur} value={formu.season}/>
                </div>

                <button onClick={changeTab}>Siguiente</button>
            </form>
            :
            <div className='divActivity'>
              <div>
                <h2>Datos actividad</h2>
                <p>{formu.name}</p>
                <p>{formu.dificulty}</p>
                <p>{formu.duration}</p>
                <p>{formu.season}</p>
              </div>
              <form >
              <button onClick={sendActivity}>Crear</button>
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

              </form>
            </div>
          }
      </>
  )
}
