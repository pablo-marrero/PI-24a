import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteActivity, getACtivities } from '../../action/actionCountries/index'

export const CrudTableRow = ({id,name,dificulty,duration,season}) => {
  const [isClass, setIsClass] = useState(null)
  const dispatch = useDispatch()

  const disp = {
    display : "none"
  }

  const deleteActivities = ()=>{
    try {
      dispatch(deleteActivity(name))
      dispatch(getACtivities)
      setIsClass(true)
    } catch (error) {
      console.log(error)
    }
  }

//className={isClass && disp}

  return (
    <ul style={isClass && {display:"none"}}>
        <li>{name}</li>
        <li>{dificulty}</li>
        <li>{duration}</li>
        <li>{season}</li>
        <div>
            <button>Editar</button>
            <button onClick={()=>deleteActivities()}>Eliminar</button>
            <Link to={`/AddActCountry/:${name}`}>Add Country</Link>
        </div>
    </ul>
  )
}
