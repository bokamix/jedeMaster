import React from "react"
import styled from "styled-components"
// import EditLogStatus from "./EditLogStatus"
// import { loadState, saveState } from "../../localStorage"
import DayLogAccordion from "./Accordion/DayLogAccordion"

const Wrapper = styled.div`
  width:90%;
`
export default function LogItemComponent({item, num}) {
  // const [edit, setEdit] = React.useState(false)
  // const [value, setValue] = React.useState(item.isDone)

  // const EditLog =()=>{
  //   setEdit(true)
  // }

  // const saveChanges =(e)=>{
  //   let allLogs = loadState("dayLogs")
  //   allLogs[num].isDone = e.target.value
  //   saveState("dayLogs", allLogs)
  //   setEdit(false)
  //   setValue(e.target.value)
  // }

  return (
    <Wrapper>
        <DayLogAccordion dayData={item} />
    </Wrapper>
  )
}
