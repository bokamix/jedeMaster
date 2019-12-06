import React from "react"
import styled from "styled-components"
import { loadState } from "../localStorage"
import LogItemComponent from "./LogsComponents/LogItemComponent"

const MainWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
`
const Papper = styled.div`
  margin: 30px;
  width: 100%;

  border-radius: 30px;
  padding: 30px;
  div {
    display: flex;
    margin: 20px;
    width: 100%;
    p {
      margin: 10px;
    }
  }
`

export default function AboutChallenge() {
  const [logItems, setlogItems] = React.useState(loadState("dayLogs"))
  const [edit, setEdit] = React.useState(false)
  const EditLog =()=>{
    setEdit(true)
  }
  const saveChanges =(e)=>{
    setEdit(false)
  }

  const logItemsMap = () => {
   if(logItems){return logItems.map((item, num) => {
      return (
        <LogItemComponent key={num} item={item} num={num}/>
      )      
    })}
  }

  return (
    <MainWrapper>
      <Papper>{ logItemsMap()}</Papper>
    </MainWrapper>
  )
}
