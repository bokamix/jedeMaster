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
z-index:997;
background:#00000094;
width:100%;
height:100%;
@media ${device.laptop} {
   
  }
`
// const WrapperClose = styled.div`
//   position:fixed;
//   left:0;
//   top:0;
//   z-index:999;
//   background:#00000094;
//   width:100%;
//   height:100%;
// `
const Modal = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
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

export default function ModalWithData({ data, closeModal }) {
  const [value, setValue] = React.useState();
  
console.log("data data ", data)

const saveChanges =(e)=>{
  setValue(true)
}

const saveValue = () =>{
  closeModal()
  
}
  
  return (
    <>
    <Wrapper onClick={closeModal} />
    <Modal>
        <InputsWrapper >
          <button onClick={saveValue}>Zapisz zmiany</button>
        </InputsWrapper>
    </Modal>  
    </>
  );
}