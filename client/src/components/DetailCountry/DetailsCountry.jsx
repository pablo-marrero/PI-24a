import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { resetPais } from '../../action/actionCountries/index'
import { Loader } from '../Loader/Loader'
import { LookActivity } from '../LookActivity'
import "./DetailsCountry.css"
import { SectionMap } from '../SectionMap/SectionMap.jsx'

export const DetailsCountry = () => {
  const { country } = useSelector((state) => state.reducer)
  let dispatch= useDispatch()
  const [styleClass, setStyleClass] = useState("")
  const [haveClass, sethaveClass] = useState(false)
  const [flagMaps, setFlagMaps] = useState("View Maps")


let reset = ()=>{
  dispatch(resetPais())
}

let turn = ()=>{
  if(!haveClass){
    setStyleClass("turn")
    sethaveClass(true)
    setFlagMaps("View Flag")
  }
  if(haveClass){
    setStyleClass("")
    sethaveClass(false)
    setFlagMaps("View Map")
  }
}

  return (
    <section className='sectionPaisId'>
        <Link className='volver' to="/home" onClick={()=>reset()}>X</Link>
        
    {(country && country.length)
    ?
<>
    <div className='mostraPais'>
      <div>
            <button onClick={turn}>{flagMaps}</button>
          <div className={`card-country ${styleClass}`}>
            <SectionMap
              lat={country[0].location[0]}
              lng={country[0].location[1]}
            />
            <picture>
              <img src={country[0].imgFlags} alt={`img-${country[0].name}`}/>
            </picture>
                   
          </div>
        </div>

          <div className='container-data-country'>
            <div>
            <h2>{country[0].name.toUpperCase()}</h2>
              <div className='datosParr'>
                <p><span>Capital:</span>{country[0].capital.substring(1,country[0].capital.length -1)}</p>
                <p><span>Continent:</span>{country[0].continent}</p>
                <p><span>Population:</span>{country[0].population}</p> 
                <p><span>Subregion:</span>{country[0].subregion}</p>
              </div>
            </div>

          </div>
    </div>

    <div className='actividadesBase'>
       <h3>ACTIVITIES:</h3>
       <div className='title-data-table'>
        <p>Name</p>
        <p>Dificulty</p>
        <p>Duration</p>
        <p>Season</p>
       </div>
       
       <div>
         {country[0].activities.length > 0? country[0].activities.map((e, index)=>(
           <LookActivity key={index} datos={e} index={index}/>
           ))
           :<p>This country it hasn't assigned activities</p>}
      </div>
    </div>
          </>
      : 
      <Loader />
    }
    </section>
  )
}
