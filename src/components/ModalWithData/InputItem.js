import React, { useState } from "react"
import styled from "styled-components";


const InputItem = () => {
    const [open, setOpen] = useState(false)
  
    const closeModal =()=>{
      setOpen(false)
    }
    
    const openModal =()=>{
      setOpen(true)
    }
  
  return(
    <>
        <input value="daniel"></input>
    </>
    )
  }
  
  export default InputItem