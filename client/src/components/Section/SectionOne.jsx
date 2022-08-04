import React, {useState,useEffect} from 'react'
import "./SectionOne.css"
import { useSelector, useDispatch } from "react-redux"
import {  resetPais, getACtivities } from "../../action/actionCountries/index" 
import { Pagination } from '../Pagination/Pagination'
import { Cards } from '../Cards/Cards'
import { Loader } from '../Loader/Loader.jsx'



export const SectionOne = () => {
  const { countries, country } = useSelector((state) => state.reducer)

  
  const [pais, setPais] = useState(countries)
  let dispatch = useDispatch()



const[pag,setpag]=useState({
  desde:0,
  hasta:9,
})

// const indexOfLastCountry = pag.hasta + pag.desde; // 28
// const indexOfFirstCountry = indexOfLastCountry - pag.hasta; //-9
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

const hadelClick = (e)=>{
  e.preventDefault()
  dispatch(resetPais())
}

  useEffect(()=>{
    if(country){
      setPais(country)
    }
    else{
      setPais(countries)
    }
  }, [country, countries, pais])

  
  useEffect(()=>{
    setPais(countries)
    dispatch(resetPais())
    setpag({
      desde:0,
      hasta:9
    })
  },[countries, dispatch])


  useEffect(()=>{
    dispatch(getACtivities())
    }, [dispatch])
  
    
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
    </section>
    </>
  )
}
