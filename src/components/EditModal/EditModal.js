import React from 'react';
import styled from "styled-components";
import EditTextInput from "../EditTextInput"
import { saveState } from "../../localStorage"
import { saveToFire, loadFromFire } from "../../../firebase"
import { device } from '../Composition/Breakpoints';


const Wrapper = styled.div`
position:fixed;
left:0;
top:0;
z-index:999;
background:#00000094;
width:100%;
height:100%;
@media ${device.laptop} {
   
  }
`
const Modal = styled.div`
  position: fixed;
  z-index: 999;
  background:#202334;
  padding: 150px 20px;
  @media ${device.laptop} {
    width:50%;
    height:100%;
    right: 0;
    text-align:center;
    padding:30px;
    box-shadow: 0 4px 8px 0 rgba(101,245,255,0.2), 0 6px 20px 0 rgba(101,245,255,0.5);
  }
`
const InputsWrapper = styled.div`
  input{
    width:95%;
    background:#202334;
    color:white;
    border: 1px dotted black;
    border-radius:15px;
    padding:15px;
    margin:10px;
  }
  
  button{
    background: white;
    color:black;
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
  saveToFire()
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
    <Wrapper>
      <Modal>
        <InputsWrapper >
          {generateInputs()}
          <button onClick={saveValue}>Zapisz zmiany</button>
        </InputsWrapper>
      </Modal>  
    </Wrapper> 
  );
}