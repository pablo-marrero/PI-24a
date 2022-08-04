import React from 'react'
import "./Pagination.css"

export function Pagination({countryPerPage,allCountries,Paginate}){
    const pageNumbers=[]
    for(let i=1; i<=Math.ceil(allCountries/countryPerPage); i++){
        pageNumbers.push(i)
    }

    return(

        <div className="pagination">
            
                {pageNumbers.map(number=>(
                    <div key={number}>
                        <button onClick={()=> Paginate(number)} className="pageLink" >
                            {number}
                        </button>
                    </div>
                ))}
            
        </div>
    )
}