import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteActivity, getACtivities } from '../../action/actionCountries/index'
import "./TableActivity.css"

export const CrudTableRow = ({id,name,dificulty,duration,season,number}) => {
  const [isClass, setIsClass] = useState(null)
  const dispatch = useDispatch()

  const deleteActivities = ()=>{
    try {
      dispatch(deleteActivity(name))
      dispatch(getACtivities)
      setIsClass(true)
    } catch (error) {
      console.log(error)
    }
  }


  return (
        <tr style={isClass && {display:"none"}}>
          <td>{number}</td>
          <td>{name}</td>
          <td>{dificulty}</td>
          <td>{duration}</td>
          <td>{season}</td>
          
          <td>
            
            <div className='content-botton-activity'>
              <button className='btn-activity-action'>Edit</button>
              <button className='btn-activity-action' onClick={()=>deleteActivities()}>Delete</button>
              <button className='btn-activity-action'>
                <Link to={`/AddActCountry/:${name}`}>Add Country</Link>
              </button>
            </div>
          </td>
          
        </tr>
  )
}
