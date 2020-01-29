import React, { useEffect, useState } from "react"
import ModalWithData from './ModalWithData'
import styled from "styled-components";



const ModalWrapper = (data) => {
    const [open, setOpen] = useState(false)
    
    const closeModal =()=>{
      setOpen(false)
    }
    
    const openModal =()=>{
      setOpen(true)
    }
  
  return(
    <>
        <button onClick={openModal}>Open Modal</button>
        { open ? <ModalWithData closeModal={closeModal} data={data} /> : null }
    </>
    )
  }
  
  export default ModalWrapper