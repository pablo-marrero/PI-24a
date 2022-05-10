import React, { useState, useEffect} from 'react'
// import { NavLink } from "react-router-dom";
import "../CssComponents/Nav.css"
import {useDispatch, useSelector} from "react-redux"
import { getCountryAct, ortherBy, updateFilter } from '../action'
import { resetPais, getACtivities } from '../action' 
import { Link } from 'react-router-dom'
import { LiActivity } from './LiActivity'
// import axios from 'axios'

export const Nav = () => {


    const { activities } = useSelector((state) => state)
    const dispatch = useDispatch()
    
   
    // useEffect(()=>{
    //   if(activities.length === 0){
    //     dispatch(getACtivities()) 
    //   }
    // }, [activities])


    const captureOrther = (e)=>{
      // console.log(e)
      e.stopPropagation()
      dispatch(resetPais())
      // console.log(e.target.textContent)
      if(e.target.textContent == "A to Z"){
        dispatch(ortherBy("asce-name"))
      }
      if(e.target.textContent == "Z to A"){
        dispatch(ortherBy("desc-name"))
      }
      if(e.target.textContent == "Ascending Population"){
        dispatch(ortherBy("asce-pob"))
      }
      if(e.target.textContent == "Descending Population"){
        dispatch(ortherBy("desc-pob"))
      }
      if(e.target.textContent == "Unfiltered"){
        dispatch(ortherBy("all"))
      }
    }

    const captureContinent = (e)=>{
      e.stopPropagation()
      dispatch(resetPais())
      // dispatch(updateFilter(e.target.textContent))
      // continent = countries.filter(pais => pais.continent == e.target.textContent)
      if(e.target.textContent == "All Continents"){
        dispatch(ortherBy("all"))
      // console.log(e.target.textContent)
      }
      else{
        dispatch(updateFilter(e.target.textContent))
      }
    }

    const captureActivity = (e)=>{
      e.stopPropagation()
      dispatch(resetPais())
      dispatch(getCountryAct(e.target.textContent))
    }

  return (
    <nav>
      <ul className="menu">
			{/* <li><a href="#">Ejemplo 1</a></li> */}
      
			  <li>Continentes
			  	<ul onClick={captureContinent}>
			  		<li><Link to="/home">Africa</Link></li>
			  		<li><Link to="/home">Americas</Link></li>
			  		<li><Link to="/home">Antarctic</Link></li>
			  		<li><Link to="/home">Asia</Link></li>
			  		<li><Link to="/home">Europe</Link></li>
			  		<li><Link to="/home">Oceania</Link></li>
			  		<li><Link to="/home">All Continents</Link></li>
			  		{/* <li><a href="#">Orther by</a></li> */}
			  	</ul>
			  </li>	
      
			  <li>Orther By
              <ul onClick={captureOrther}>
                <li><Link to="/home">A to Z</Link></li>
                <li><Link to="/home">Z to A</Link></li>
                <li><Link to="/home">Ascending Population</Link></li>
                <li><Link to="/home">Descending Population</Link></li>
                <li><Link to="/home">Unfiltered</Link></li>
              </ul>
        </li>

        <li>Activities
              <ul onClick={captureActivity}>
                {activities? activities.map(e=>(
                  <LiActivity key={e.id} name = {e.name} />
                )): console.log("No hay actividades")}
              </ul>
        </li>
      
			  {/* <li><a href="#">Ejemplo 4</a></li> */}
		  </ul>
      
    </nav>
  )
}
