import React from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox"
import { loadState } from "../../../../localStorage"
import EditModal from "../../Common/EditModal/EditModal"
const Wrapper = styled.div`
  width: 100%;
  background: #202334;
  padding: 10px;
  border-radius: 10px;
`
const Title = styled.div`
  display: flex;
  align-items: center;
  button{
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
  }
  h4{
    margin: 0;
    padding: 0;

  }
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
    <Wrapper>
    <Title><h4>Co muszę robić codziennie?</h4><button onClick={openModal}>Edit</button></Title>
        {generateInputs()}
        {open ? <EditModal data={data} closeModal={closeModal} /> : null}
    </Wrapper>
  );
}