import React, { useState, useEffect } from "react"
import styled from "styled-components";
import { loadState, saveState } from '../../../localStorage'


const InputItem = ({value, addToList, num}) => {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState(value)
    
    const changeValue =(e)=>{
        setState(e.target.value)
    }
   
  
  return(
    <>
        <input id={ num } onChange={ changeValue } value={ state } onBlur={ addToList }></input>
    </>
    )
  }
  
  export default InputItem