import React from "react";
import styled from "styled-components";
import Checkbox from "./Checkbox"
import { loadState } from "../../localStorage"
const Wrapper = styled.div`
`



export default function CheckboxesWrapper({makeRegress, makeProgress, checkItemDone}) {
  const [open, setOpen] = React.useState(false);
    

const generateInputs =()=>{
    if(loadState("listOfCheckTask")){
        let listCheck = loadState("listOfCheckTask")
        return listCheck.map((item, number)=>{
            return(
                <Checkbox checkItemDone={checkItemDone} makeRegress={makeRegress} makeProgress={makeProgress} index={number} checkStatus={item.done} label={item.item} />
            )
        })
    }
}
  return (
    <>
     <Wrapper >
         {generateInputs()}
     </Wrapper>
    </>
  );
}
