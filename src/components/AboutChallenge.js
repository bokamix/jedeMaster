import React from "react"
import styled from "styled-components"
import { loadState } from "../localStorage"

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

  // const logItemsMap = () => {
  //   if(loadState("dayLogs")){logItems.map((item, num) => {
  //     return (
  //       <div key={num}>
  //         <p>{item.date}</p>
  //         <p>{item.isDone}</p>
  //       </div>
  //     )
  //   })}
  // }

  return (
    <MainWrapper>
      <Papper></Papper>
    </MainWrapper>
  )
}
