import React from 'react'
import "../CssComponents/Pagination.css"

export function Pagination({countryPerPage,allCountries,Paginate}){
    const pageNumbers=[]
    for(let i=1; i<=Math.ceil(allCountries/countryPerPage); i++){
        pageNumbers.push(i)
    }

    return(

        <div className="pagination">
            
                {pageNumbers.map(number=>(
                    // <p  className='pagNum'>
                    <div key={number}>
                        <button onClick={()=> Paginate(number)} className="pageLink" >
                            {number}
                        </button>
                    </div>
                ))}
            
        </div>
    )
}