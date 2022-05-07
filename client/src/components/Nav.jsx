import React, { useState, useEffect} from 'react'
// import { NavLink } from "react-router-dom";
import "../CssComponents/Nav.css"
import {useDispatch, useSelector} from "react-redux"
import { ortherBy, updateFilter } from '../action'
import { resetPais } from '../action' 
// import axios from 'axios'

export const Nav = () => {

  // let initialForm = {
  //   name:""
  // }
  // const [formu, setFormu] = useState(initialForm)

  // const handelChange = (e)=>{
  //   setFormu({
  //       ...formu,
  //       [e.target.name] : e.target.value
  //   })
  // }
  
  // let [filter, setFilter] = useState("");
  //   const handelSubmit = (e)=>{
     //   if(!filter.name){
    //     e.preventDefault()
    //     alert("Datos incompletos")
    //     return
    //   }
    //   else{e.preventDefault()
        
    //       console.log(response)
    //   }
    
    // const { country } = useSelector((state) => state)
    const dispatch = useDispatch()
    
   
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

  return (
    <nav>
      <ul className="menu">
			{/* <li><a href="#">Ejemplo 1</a></li> */}
      
			  <li>Continentes
			  	<ul onClick={captureContinent}>
			  		<li>Africa</li>
			  		<li>Americas</li>
			  		<li>Antarctic</li>
			  		<li>Asia</li>
			  		<li>Europe</li>
			  		<li>Oceania</li>
			  		<li>All Continents</li>
			  		{/* <li><a href="#">Orther by</a></li> */}
			  	</ul>
			  </li>	
      
			  <li>Orther By
              <ul onClick={captureOrther}>
                <li >A to Z</li>
                <li>Z to A</li>
                <li>Ascending Population</li>
                <li>Descending Population</li>
                <li>Unfiltered</li>
              </ul>
        </li>
      
			  {/* <li><a href="#">Ejemplo 4</a></li> */}
		  </ul>
      
    </nav>
  )
}
