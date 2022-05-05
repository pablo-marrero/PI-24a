import React from 'react'
import { useSelector, useDispatch } from "react-redux"

export const SectionTwo = () => {
  
  
  const { countries } = useSelector((state) => state)

  console.log(countries)
  return (
    <>
      <div>SectionTwo</div>
      <button onClick={()=> console.log(countries)}>pruea</button>
    </>
  )
}
