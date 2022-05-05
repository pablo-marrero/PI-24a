import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import { resetPais } from '../action'
import "../CssComponents/MostrarPais.css"

export const MostrarPais = () => {
  const { country } = useSelector((state) => state)
  let dispatch= useDispatch()

  // country?console.log(country):console.log("no cargue todavia")

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     console.log("ACA VA EL LOADER")
  //   },10)
  // })

  // const [pais, setPais] = useState(country)
// console.log(pais)
let reset = ()=>{
  dispatch(resetPais())
}

  return (
    <section>
        <Link className='volver' to="/home" onClick={()=>reset()}>Volver</Link>
    {country
      ?<div>
        
          <div>
            <picture>
              <img src={country.imgFlags} alt="" />
            </picture>
            <h2>{country.name.toUpperCase()}</h2>
            <p><span>Capital:</span>{country.capital.substring(1,country.capital.length -1)}</p>
            <p><span>Continent:</span>{country.continent}</p>
            <p><span>Population:</span>{country.population}</p> 
            <p><span>Subregion:</span>{country.subregion}</p>
          </div>
        </div>
      :
      console.log("cargando")
    }
    </section>
  )
}
