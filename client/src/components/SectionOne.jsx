import React, {useState,useEffect} from 'react'
import "../CssComponents/SectionOne.css"
import { useSelector, useDispatch } from "react-redux"
import {  resetPais, getACtivities } from "../action" 
import { Pagination } from './Pagination'
import { Cards } from './Cards'
import { Loader } from './Loader'



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

// const[pag,setpag]=useState({
//   desde:1,
//   hasta:10,
// })


const[pag,setpag]=useState({
  desde:0,
  hasta:9,
})

// const indexOfLastCountry = pag.desde * pag.hasta;
// const indexOfFirstCountry = indexOfLastCountry - pag.hasta;
// const currentCountry = pais?pais.slice(indexOfFirstCountry, indexOfLastCountry):console.log("A la carga")


const indexOfLastCountry = pag.hasta + pag.desde; // 28
const indexOfFirstCountry = indexOfLastCountry - pag.hasta; //-9
const currentCountry = pais?pais.slice(pag.desde, pag.hasta):console.log("A la carga")

const paginate=(pageNumber) =>{
  if(pageNumber === 1){
    setpag({
      desde:0,
      hasta:9
    })
  }
  else{
    setpag({
      desde: (10 * (pageNumber-1) ) -1,
      hasta: (9*pageNumber) + (pageNumber -1)
    })
  }
  
}

  useEffect(()=>{
    if(country){
      console.log("PAIS EN ESPECIAL")
      // console.log(country)
      setPais(country)
      // dispatch(resetPais())
    }
    else{
      // console.log("SOY EL USSEFECT")
      setPais(countries)
    }
  }, [country])

  
  useEffect(()=>{
    console.log("TODOS LOS PAISES")
    // console.log(countries)
    setPais(countries)
    dispatch(getACtivities())
    dispatch(resetPais())
  },[countries])


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
        {!country && <Pagination countryPerPage={10}  allCountries={pais.length} Paginate={paginate}/>}
        <Cards countries={currentCountry}/>
      </>
      :
      <Loader/>
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
