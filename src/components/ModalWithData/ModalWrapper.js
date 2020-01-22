import React, { useEffect, useState } from "react"
import ModalWithData from './ModalWithData'

let data;
const ModalWrapper = () => {
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