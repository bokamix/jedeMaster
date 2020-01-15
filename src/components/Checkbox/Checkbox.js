import React from "react";
import styled from "styled-components";
import { loadState, saveState } from "../../localStorage";
import DoneIcon from "../../images/done-24px.svg"
import NoDoneIcon from "../../images/remove_circle-24px.svg"
import { saveToFire, loadFromFire } from "../../../firebase"

const CheckboxWrapper = styled.div`
  cursor: pointer;
  margin-bottom:5px;
  p{
    margin:6px;
    padding:0;
  }
  img{
    margin:6px;
    padding:0;
  }
`
const NoSucces = styled.div`
  margin:6px;
  display:flex;
  border: 1px dashed #171926;
  border-radius:10px;
  align-items: center;
  &:hover{
    background: #151b3c; 
  }
`
const Succes = styled.div`
  margin: 6px;
  display:flex;
  align-items: center ;
  background:#185d5a;
  border: 1px dashed #46929e;
  border-radius:10px;
`

export default function Checkbox({label, checkStatus, index, makeProgress, makeRegress, checkItemDone}) {
    const [check, setCheck] = React.useState((checkStatus == true))
    let data = loadState("listOfCheckTask")
    const onCheck =(e)=>{
            // let clickedElement = e.target
            // clickedElement.style.cssText = "color: blue; border: 1px solid black"; 
            saveToFire()
            setTimeout(() => {
              setCheck(!check)
              data[index].done = !check
              console.log(data)
              let AllLogs = loadState("dayLogs")
              console.log("all logs",AllLogs[AllLogs.length - 1])
              console.log(data)
              AllLogs[AllLogs.length - 1].details = data
              console.log("alllogs before", AllLogs)
              saveState("dayLogs", AllLogs)
              saveState("listOfCheckTask", data)
              if(!check){
                  makeProgress()
              }else{
                  makeRegress()
              }
              checkItemDone()
            }, 50);
            setTimeout(() => {
              saveToFire()
            }, 100);
            setTimeout(() => {
              saveToFire()
            }, 1000);
            setTimeout(() => {
              saveToFire()
            }, 3000);
    }

  return (
    <>
     <CheckboxWrapper onClick={onCheck}>
        {check ? 
          <Succes><img src={DoneIcon} /><p>{label}</p></Succes> 
          : 
          <NoSucces><img src={NoDoneIcon} /><p>{label}</p></NoSucces>
        }
     </CheckboxWrapper>
    </>
  );
}
