import React, { useState, useEffect } from "react"
import styled from "styled-components";
import { loadState, saveState } from '../../localStorage'


const InputItem = () => {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState()
    useEffect(() => {
        if(loadState("winHistory")){
            let data = loadState("winHistory")
            setState(data)
        }else{
            let data = ["Wpisz coś"]
            saveState("winHistory", data)
        }
      },[])
   
  
  return(
    <>
        <input value={state}></input>
    </>
    )
  }
  
  export default InputItem