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

const Paper = styled.div`
 background: #202334;
 padding:30px;
 border-radius: 20px;
 width: 95%;
 box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
 display: flex;
 flex-wrap: wrap;
 align-items: center;
`

export default function AboutChallenge() {
  const [logItems, setlogItems] = React.useState(loadState("dayLogs"))
  
  const [edit, setEdit] = React.useState(false)
  // const EditLog =()=>{
  //   setEdit(true)
  // }
  // const saveChanges =(e)=>{
  //   setEdit(false)
  // }

  const logItemsMap = () => {
   if(logItems){return logItems.map((item, num) => {
      return (
        <LogItemComponent key={num} item={item} num={num}/>
      )      
    })}
  }

  const mapChalanges =()=>{
    if(loadState("challengesLogs")){
      let challengesLogs = loadState("challengesLogs")
      return challengesLogs.map((item, number)=>{
       return(
        <div key={number}>
          <h2>{item.goal}</h2>
          <p>{item.endDate}</p>
          <p>{item.startDate}</p>
        </div>
       ) 
      })
    }
  }

  return (
    <MainWrapper>
      <Paper>{mapChalanges()}</Paper>
      <Paper>{logItemsMap()}</Paper>
    </MainWrapper>
  )
}
