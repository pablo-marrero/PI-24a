import React, {useState,useEffect} from 'react'
import "../CssComponents/SectionOne.css"
import { useSelector, useDispatch } from "react-redux"
import {  resetPais } from "../action" 
import { Pagination } from './Pagination'
import { Cards } from './Cards'



export const SectionOne = () => {
  const { countries, country } = useSelector((state) => state)
  
  const [pais, setPais] = useState(countries)
  let dispatch = useDispatch()

  // useEffect(()=>{
  //   if(countries){console.log("ya estoy cargado")}
    
  //   else{
  //     dispatch(getCountries())
  //     setPais(countries)
  //   }
  // },[])
  

  // useEffect(()=>{
  //   // console.log(country)
  //   setPais(country)
  // },[country])

const[pag,setpag]=useState({
  desde:1,
  hasta:10,
})

const indexOfLastCountry = pag.desde * pag.hasta;
const indexOfFirstCountry = indexOfLastCountry - pag.hasta;
const currentCountry = pais?pais.slice(indexOfFirstCountry, indexOfLastCountry):console.log("A la carga")

const paginate=(pageNumber) =>setpag({
  ...pag,
  desde:pageNumber
})

  useEffect(()=>{
    if(country){
      console.log("PAIS EN ESPECIAL")
      setPais(country)
    }
    else{
      console.log("TODOS LOS PAISES")
      setPais(countries)
    }
  }, [country])

  const hadelClick = (e)=>{
    e.preventDefault()
    dispatch(resetPais())
  }   
  
  return (
    <>
    <section className='sectionFather'>
      {country && <div className='divButton'><button onClick={hadelClick}>X</button></div>}
      {pais
      ?<>
        {!country && <Pagination countryPerPage={pag.hasta}  allCountries={pais.length} Paginate={paginate}/>}
        <Cards countries={currentCountry}/>
      </>
      :console.log("cargando")
    }
      {/* Pasarlo a Cards */}
      {/* {pais?pais.map(e=> <Card 
          key={e.id}
          id={e.id}
          name={e.name}
          imgFlags={e.imgFlags}
          continent={e.continent}
          capital={e.capital}
          population={e.population}
          subregion={e.subregion}
      />)

      
      :console.log("cargando")} */}
      
    </section>
    </>
  )
}
