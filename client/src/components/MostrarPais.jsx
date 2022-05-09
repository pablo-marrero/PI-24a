import React, { useEffect }  from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { resetPais } from '../action'
import "../CssComponents/MostrarPais.css"
import { Loader } from './Loader'
import { LookActivity } from './LookActivity'

export const MostrarPais = () => {
  const { country } = useSelector((state) => state)
  let dispatch= useDispatch()

  // country?console.log(country):console.log("no cargue todavia")

  // useEffect(()=>{
  //   if(country){
  //     console.log(country[0].activities.length)
  //   }
  //   else{console.log("prueba")}
  //   // dispatch(resetPais())
  // }, [country])

  // const [pais, setPais] = useState(country)
// console.log(pais)
let reset = ()=>{
  dispatch(resetPais())
}

  return (
    <section className='sectionPaisId'>
        <Link className='volver' to="/home" onClick={()=>reset()}>X</Link>
        
    {(country && country.length)
    ?
    // console.log(country[0])
    <div className='mostraPais'>
            <picture>
              <img src={country[0].imgFlags} alt={`img-${country[0].name}`}/>
            </picture>
          <div>
            <div>
            <h2>{country[0].name.toUpperCase()}</h2>
              <div className='datosParr'>
                <p><span>Capital:</span>{country[0].capital.substring(1,country[0].capital.length -1)}</p>
                <p><span>Continent:</span>{country[0].continent}</p>
                <p><span>Population:</span>{country[0].population}</p> 
                <p><span>Subregion:</span>{country[0].subregion}</p>
              </div>
            </div>

            <div>
               <h3>ACTIVITIES:</h3>
               <div className='actividadesBase'>
                 {country[0].activities.length > 0? country[0].activities.map((e, index)=>(
                   <LookActivity key={index} datos={e} index={index}/>
                  ))
                 :<p>El país no cuenta con actividades asignadas</p>}
              </div>
            </div>

          </div>
    </div>
      : 
      <Loader />
      // <div className='mostraPais'>      
      //     <div>
      //       <picture>
      //         <img src={country.imgFlags} alt="" />
      //       </picture>
      //       <h2>{country.name.toUpperCase()}</h2>
      //       <p><span>Capital:</span>{country.capital.substring(1,country.capital.length -1)}</p>
      //       <p><span>Continent:</span>{country.continent}</p>
      //       <p><span>Population:</span>{country.population}</p> 
      //       <p><span>Subregion:</span>{country.subregion}</p>
      //     </div>
      //   </div>
    }
    </section>
  )
}
