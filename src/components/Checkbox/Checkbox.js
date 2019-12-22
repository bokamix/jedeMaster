import React from "react";
import styled from "styled-components";
import { loadState, saveState } from "../../localStorage";
const CheckboxWrapper = styled.div`
`

export default function Checkbox({label, checkStatus, index, makeProgress, makeRegress, checkItemDone}) {
    const [check, setCheck] = React.useState((checkStatus == true))
    let data = loadState("listOfCheckTask")
    console.log("valid ->",(checkStatus == true))
    console.log("check status",checkStatus)
    console.log("check ->",check)
    const onCheck =()=>{
            console.log('onCheck')
            console.log("check->", check)
            console.log("data->",data)
            console.log("index ->",index)
            console.log("data index ->",data[index].done)
            setCheck(!check)
            data[index].done = !check
            saveState("listOfCheckTask", data)
            if(!check){
                makeProgress()
            }else{
                makeRegress()
            }
            checkItemDone()
    }

  return (
    <>
     <CheckboxWrapper onClick={onCheck}>
        {check ? <p>done</p> : <p>{label}</p>}
     </CheckboxWrapper>
    </>
  );
}
