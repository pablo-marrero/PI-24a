import React from 'react'
import "./Card.css"
import { getCountry } from '../../action/actionCountries/index'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

export const Card = ({id,name,imgFlags,continent,capital,population,subregion}) => {
    
    let dispatch = useDispatch()
    
    let bigCard = ()=>{
        dispatch(getCountry(id))
    }

    return (
    <NavLink className="link-card" to={`/country/:${id}`} onClick={()=>bigCard()}>
    <article >
        <picture>
            <img src={imgFlags} alt="img-pais" />
        </picture>

            <p>{id}</p>
        <div>
            <div>
                <p>- Name:</p>
                <span>{name[0].toUpperCase() + name.slice(1)}</span>
            </div>
            
            <p><span>- Continent: </span>{continent}</p>
        </div>
    </article>
    </NavLink>
  )
}
