import React, { useState ,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CheckboxAct } from './CheckboxAct'
import { useParams } from 'react-router-dom'
import {updateActivity} from "../action/actionCountries/index"
import "./FormCreateActivity/AddActivity.css"


export const AddActCountry = () => {
    const { name } = useParams()
    const dispatch = useDispatch()

     let initialForm = {
        idPais:[],
        name:"",
        dificulty:"",
        duration:"",
        season:"",
      }

  const [validation, setValidation] = useState({
    boton: "",
    select:""
  })
    const { countries, create, activities } = useSelector((state) => state.reducer)


    const [rend, setRend] = useState(null)
    const [data, setData] = useState(initialForm)
    let newObj = [] 
    useEffect(()=>{
        if(activities.length){
                if(name){
                  newObj = activities.filter(e => e.name === name.slice(1))
                    setData({
                      ...data,
                      name:newObj[0].name,
                      dificulty:newObj[0].dificulty,
                      duration:newObj[0].duration,
                      season:newObj[0].season
                    })
                }
        }
        setRend(true)
    },[activities])

    const getID = (valor)=>{
            setData({
                ...data,
                idPais: data.idPais.concat(valor)
              })        
        setValidation({
          ...validation,
          select:""
        })
      }



      const sendActivity = (e)=>{
        e.preventDefault()
        console.log(data)
        if(data.idPais.length === 0){
          setValidation({
            ...validation,
            select: "Se debe agregar habilidad a un pais para poder enviar el formu" 
          })
          return
        }
        else{
          let {idPais, name, dificulty, duration, season} = data
          dificulty = parseInt(dificulty)
          duration = parseInt(duration)
          dispatch(updateActivity({idPais,name,dificulty, duration,season}))  
        }
      }
    

  return (
    <div className='divActivity'>
              <div>
                <h2>Data of activity</h2>
                <div>
                    <div>
                      <p>Name:</p>
                      <p>Dificulty:</p>
                      <p>Duration:</p>
                      <p>Season:</p>
                    </div>
                    {rend && <div>
                      <p>{data.name}</p>
                      <p>{data.dificulty}</p>
                      <p>{data.duration}</p>
                      <p>{data.season}</p>
                    </div>}
                    
                  </div>
              </div>

              <form >
                <div>
                      <h2>Select to countries</h2>
                    <div>
                     {countries&&countries.map(e=> <CheckboxAct 
                                   key={e.id}
                                   id={e.id}
                                   name={e.name}
                                   getID={getID}
                             />)       
                     }
                    </div>
                </div>
                <div className='botonCrear'>
                   <button 
                   onClick={sendActivity}>Add activity</button>
                   {validation.select  && <span>{validation.select}</span>}
                   {create && <span>{create}</span>}
                </div>
              </form>
            </div>
  )
}
