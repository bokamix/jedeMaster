import React from 'react';
import { Link } from "gatsby"
import styled from "styled-components";
import { openNetlifyModal } from "../../pages/index"
import IconPerson from "../../images/account_circle-24px.svg"

const Wrapper = styled.div`
  position:fixed;
  bottom: 0;
  left:0;
  width: 100%;
  background: #2023348f;
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

const MenuItem = styled.div`
  padding:10px;
  text-transform: uppercase;
  color: white;
`

const LoginIcon = styled.img`
  width: 30px;
  color: white;
  margin: 0;
  padding-top: 5px;
`

export default function MenuPanel() {

  return (
    <>
      
      <Wrapper>
        <Link to="/"><MenuItem>Strona główna</MenuItem></Link>
        <Link to="/challenges"><MenuItem>Dane</MenuItem></Link>
        <LoginIcon src={IconPerson} alt="login" onClick={()=>openNetlifyModal()} />
      </Wrapper>
    </>
  );
}