import React from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox"
import { loadState } from "../../localStorage"
import EditModal from "../EditModal/EditModal"
const Wrapper = styled.div`
`
let data
if(loadState("listOfCheckTask")){
  data = loadState("listOfCheckTask")
}

export default function CheckboxesWrapper({makeRegress, makeProgress, checkItemDone}) {
  const [open, setOpen] = React.useState(false);
    
const closeModal =()=>{
  setOpen(false)
}
const openModal =()=>{
  setOpen(true)
}
const generateInputs =()=>{
    if(loadState("listOfCheckTask")){
        let listCheck = loadState("listOfCheckTask")
        return listCheck.map((item, number)=>{
            return(
                <Checkbox key={number} checkItemDone={checkItemDone} makeRegress={makeRegress} makeProgress={makeProgress} index={number} checkStatus={item.done} label={item.item} />
            )
        })
    }
}
  return (
    <>
     <Wrapper>
       <button onClick={openModal}>Edit</button>
         {generateInputs()}
     </Wrapper>
     {open ? <EditModal data={data} closeModal={closeModal} /> : null}
    </>
  );
}
