import React from 'react'


export const CheckboxAct = ({ id , name, getID }) => {

    // const [captureValue, setCaptureValue] = useState("")

    const handelCheckBox = (e)=>{
      console.log([e.target.value])
        getID([e.target.value])
    }

  return (
    <div>
        <input type="checkbox" id={id} name={name} value={id} onChange={handelCheckBox}/>
        <label htmlFor={id}> {name}</label>
    </div>
  )
}
