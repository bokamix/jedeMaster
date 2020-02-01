import React from 'react';
import { Link } from "gatsby"
import styled from "styled-components";
import { openNetlifyModal } from "../../pages/index"
import ChallengeIcon from "../../images/golf_course-24px.svg"
import CalendarIcon from "../../images/calendar_today-24px.svg"
import PersonIcon from "../../images/assignment_ind-24px.svg"

const Wrapper = styled.div`
  position:fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  background: #202334;
  border-radius: 10px;
  z-index: 995;
  display:flex;
  justify-content: space-evenly;
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

const Icons = styled.img`
  width: 30px;
  color: white;
  margin: 0;
  padding-top: 5px;
`


export default function MenuPanel() {

  return (
    <>
      
      <Wrapper>
        <Link to="/"><MenuItem><Icons src={ChallengeIcon} /></MenuItem></Link>
        <Link to="/challenges"><MenuItem><Icons src={CalendarIcon} /></MenuItem></Link>
        <Icons src={PersonIcon} alt="login" onClick={()=>openNetlifyModal()} />
      </Wrapper>
    </>
  );
}