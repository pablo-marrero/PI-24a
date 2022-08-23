import React, { useState } from 'react'
import "./Pagination.css"
// import Carousel from 'react-bootstrap/Carousel';
// import 'bootstrap/dist/css/bootstrap.min.css';

export function Paginations({countryPerPage,allCountries,Paginate}){

  let [left, setLeft] = useState(0)
  let [middle, setMiddle] = useState(1)
  let [right, setRight] = useState(2)

  const [rotate, setRotate] = useState(0)

    const pageNumbers=[]
    for(let i=1; i<=Math.ceil(allCountries/countryPerPage); i++){
        pageNumbers.push(i)
    }

    let degreeX = {
      transform: `rotateX(${rotate}deg)`,
      transition: "transform 0.8s"
    }

    let degreeY = {
      transform: `rotateY(${rotate}deg)`,
      transition: "transform 0.8s"
    }

    const prev = ()=>{
      setLeft(--left)
      setMiddle(--middle)
      setRight(--right)
      Paginate(middle)
      activeAnimation()
    }

    const prox = ()=>{
      setRight(++right)
      setMiddle(++middle)
      setLeft(++left)
      Paginate(middle)
      activeAnimation()
    }

    const handelButton = async (e)=>{
      if(e.target.textContent > middle){
        return prox()
      }

      if(e.target.textContent < middle){
        return prev()
      }
    }

    const activeAnimation = ()=>{
      setRotate(-90 * (middle -1))
    }

    return(
    <div className="pagination">
      <div>
      {left !== 0 && <button onClick={()=>prev()}  className="prev-next">{"<"}</button>}

      {
      left !== 0 && <button onClick={handelButton} className="squere-button rotateY" style={degreeY}>
        <span>{left}</span> {/*back*/}
        <span>{left}</span> {/*up*/}
        <span>{left}</span> {/*front*/}
        <span>{left}</span> {/*down*/}
       </button>
      }
     
      <button className="squere-button btn-pag-select" style={degreeX}>
         <span>{middle}</span>{/* front */}
         <span>{middle}</span>{/* up */}
         <span>{middle}</span>{/* back */}
         <span>{middle}</span>{/* down */}
      </button> 
      
      {
      right !== pageNumbers.length+1 &&<button onClick={handelButton} className="squere-button rotateY" style={degreeY}>
        <span>{right}</span> {/*back*/}
        <span>{right}</span> {/*up*/}
        <span>{right}</span> {/*front*/}
        <span>{right}</span> {/*down*/}
      </button>
      }

      {right !== pageNumbers.length+1 && <button onClick={()=> prox()} className="prev-next">{">"}</button>}
                
                
                {/* {pageNumbers.map(number=>(
                    <div key={number}>
                        <button onClick={(e)=> Paginate(number,e)} className="pageLink" name={`button${number}`}>
                            {number}
                        </button>
                    </div>
                ))} */}
    </div>

  </div>
        );
}