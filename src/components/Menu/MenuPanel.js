import React from 'react';
import { Link } from "gatsby"
import styled from "styled-components";
import { openNetlifyModal } from "../../pages/index"

const Wrapper = styled.div`
  position:fixed;
  bottom: 0;
  left:0;
  width: 100%;
  background: #3f3570;
  z-index: 995;
  display:flex;
  justify-content: space-evenly;
  box-shadow: 0 4px 8px 0 rgba(101, 245, 255, 0.2), 0 6px 20px 0 rgba(101, 245, 255, 0.5);
  div{
    font-size: 15px;
  }
  button{
    background: transparent;
    border: none;
  }
`
const Modal = styled.div`
  position:absolute;
  width:300px;
  top:50%;
  background:red;
  left:50%;
  z-index:999;
`
const MenuItem = styled.div`
  padding:10px;
  text-transform: uppercase;
  color: white;

`
export default function MenuPanel() {
  const [openModal, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const resetData =()=>{
    localStorage.clear();
    setOpen(false);
  }

  return (
    <>
     {openModal ? <Modal>
        <p>Zresetować?</p>
        <button onClick={resetData}>No pewex</button><button onClick={handleClose}>Niet!</button>
      </Modal> :null}
    <Wrapper>
      <Link to="/"><MenuItem>Home</MenuItem></Link>
      <Link to="/challenges"><MenuItem>Challenges</MenuItem></Link>
      <button onClick={()=>openNetlifyModal()}><MenuItem>Login</MenuItem></button>
    </Wrapper>
    </>
  );
}