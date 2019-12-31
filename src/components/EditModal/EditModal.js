import React from 'react';
import styled from "styled-components";
import EditTextInput from "../EditTextInput"
import { saveState } from "../../localStorage"


const Modal = styled.div`
  z-index: 999px;
  width:80%;
  position: absolute;
  top: 100px;
  text-align:center;
`
const InputsWrapper = styled.div`
  input{
    width:80%;
  }
  button{
    background: red;
  }
`

export default function EditModal({ data, closeModal }) {
  const [value, setValue] = React.useState();
  
console.log("data data ", data)

const saveChanges =(e)=>{
  console.log(data)
  console.log(e.target.id)
  console.log(e.target.value)
  data[e.target.id].item = e.target.value
  console.log(data)
  setValue(true)
}
console.log("rerender", data)
const saveValue = () =>{
  saveState("listOfCheckTask", data)
  closeModal()
}

const generateInputs =()=>{
  return data.map((item, itemNumber)=>{
    return(
     <EditTextInput key={itemNumber} inputValue={item.item} itemNumber={itemNumber} saveChanges={saveChanges}/>
    )
  })
}

  
console.log("data", data)
  return (
    <Modal>
      <InputsWrapper >
        {generateInputs()}
        <button onClick={saveValue}>Zapisz zmiany</button>
      </InputsWrapper>
    </Modal>   
  );
}