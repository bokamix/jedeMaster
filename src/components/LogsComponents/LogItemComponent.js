import React from "react"
import styled from "styled-components"
import EditLogStatus from "./EditLogStatus"
import { loadState, saveState } from "../../localStorage"


export default function LogItemComponent({item, num}) {
  const [edit, setEdit] = React.useState(false)
  const [value, setValue] = React.useState(item.isDone)

  const EditLog =()=>{
    setEdit(true)
  }
  const saveChanges =(e)=>{
    let allLogs = loadState("dayLogs")
    allLogs[num].isDone = e.target.value
    saveState("dayLogs", allLogs)
    setEdit(false)
    setValue(e.target.value)
    
  }

  return (
    <div onClick={EditLog}>
        <p>{item.date}</p>
        {!edit ? <p>{value}</p> : <EditLogStatus inputValue={value} saveChanges={saveChanges} />}
    </div>
  )
}
