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


let reset = ()=>{
  dispatch(resetPais())
}

let turn = ()=>{
  if(!haveClass){
    setStyleClass("turn")
    sethaveClass(true)
  }
  if(haveClass){
    setStyleClass("")
    sethaveClass(false)
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
          <button onClick={turn}>Dar vuelta</button>

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
