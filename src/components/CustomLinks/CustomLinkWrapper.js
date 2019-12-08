import React from 'react';
import styled from "styled-components";
import CustomLinkItem from "./CustomLinkItem"

const Wrapper = styled.div`
    width: 100%;
    min-height: 50px;
    background: #202334;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
   
`
function CustomLinkWrapper() {
  return(
    <Wrapper>
        <CustomLinkItem itemText={"Trello"} link={"https://trello.com/"}/>
        <CustomLinkItem itemText={"Messenger"} link={"https://www.messenger.com/"}/>
        <CustomLinkItem itemText={"YtMusic"} link={"https://music.youtube.com/"}/>
        <CustomLinkItem itemText={"Asana"} link={"https://app.asana.com/"} />
    </Wrapper>    
  )
}
export default CustomLinkWrapper;
