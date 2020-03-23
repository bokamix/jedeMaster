import React from "react"
import styled from "styled-components"
import { loadState } from "../../../localStorage"
import LogItemComponent from "./LogsComponents/LogItemComponent"
import moment from "moment";

const MainWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
`
const ChalenngeWrapper = styled.div`
  margin: 20px;
`

const Paper = styled.div`
 background: #2023348f;
 padding: 20px;
 margin: 10px;
 border-radius: 20px;
 width: 95%;
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 display: flex;
 flex-wrap: wrap;
 align-items: center;
 &:last-of-type {
  margin-bottom: 76px;
}`

export default function AboutChallenge() {
  const [logItems] = React.useState(loadState("dayLogs"))
  
  const logItemsMap = () => {
   if(logItems){
     logItems.reverse()
     return logItems.map((item, num) => {
      return (
        <LogItemComponent key={num} item={item} num={num}/>
      )      
    })}
  }

  const mapChalanges =()=>{
    if(loadState("challengesLogs")){
      let challengesLogs = loadState("challengesLogs")
      console.log("challenge", challengesLogs)
      return challengesLogs.map((item, number)=>{
       return(
        <ChalenngeWrapper key={number}>
          <h2>{item.goal}</h2>
          <p>End Data: {moment(item.endDate).format("DD-MM-YYYY")}</p>
          <p>Start Data {moment(item.startDate).format("DD-MM-YYYY")}</p>
        </ChalenngeWrapper>
       ) 
      })
    }
  }

  return (
    <MainWrapper>
      <Paper>{ mapChalanges() }</Paper>
      <Paper>{ logItemsMap() }</Paper>
    </MainWrapper>
  )
}
