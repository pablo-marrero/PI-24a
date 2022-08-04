import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getACtivities } from '../../action/actionCountries/index'
import { CrudTableRow } from './CrudTableRow'
import "./TableActivity.css"

export const TableActivities = () => {

  const { activities } = useSelector((state) => state.reducer)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    // if(!activities.length) 
    dispatch(getACtivities())
    }, [activities.length,dispatch])
  

  return (
    <div className='container-table-activity'>
    <h3>Table of Activities</h3>

    {activities.length ?
    <ul>
      <li className='container-ul-tableActivity'>
        <ul>
          <li>Name</li>
          <li>Dificulty</li>
          <li>Duration</li>
          <li>Season</li>
        </ul>
      </li>
      <li className='container-ul-tableActivity'>
        {activities.length&&
                (activities.map(el=> 
                  <CrudTableRow
                     key={el.id}
                     id={el.id}
                     name={el.name}
                     dificulty = {el.dificulty}
                     duration = {el.duration}
                     season = {el.season}
                  />
                ))          
        }    
      </li>
    </ul>
          :<p> No Activities Created</p> 
          }
          <NavLink
             className="Link-addActivity" to='/add'>
             <span>Create Activity</span>
          </NavLink>
   </div>
  )
}
