import React from 'react';
import styled from "styled-components";
const Wrapper = styled.div`
    margin: 10px;
    p{
        margin-block-start: 0em;
        margin-block-end: 0em;
       }
`
function CustomLinkItem({itemText, link}) {
  return(
    <Wrapper>
       <a href={link}><p>{itemText}</p></a>
    </Wrapper>    
  )
}
export default CustomLinkItem;
