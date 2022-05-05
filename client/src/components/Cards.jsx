import React from 'react'
import { Card } from './Card';
import '../CssComponents/Cards.css';



export const Cards = ({countries}) => {

    return (
        <div className="cards">
        {countries &&
          countries.map((e) => (
                    <Card
                        key={e.id}
                        id={e.id}
                        name={e.name}
                        imgFlags={e.imgFlags}
                        continent={e.continent}
                        capital={e.capital}
                        population={e.population}
                        subregion={e.subregion}
                    />
          ))}
      </div>
    )
}