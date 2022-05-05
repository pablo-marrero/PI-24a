import React from 'react'


export const CheckboxAct = ({ id , name, getID }) => {

    // const [captureValue, setCaptureValue] = useState("")

    const handelCheckBox = (e)=>{
        getID([e.target.value])
    }

  return (
    <div>
        <input type="checkbox" id={id} name={name} value={id} onChange={handelCheckBox}/>
        <label htmlFor={name}> {name}</label>
    </div>
  )
}