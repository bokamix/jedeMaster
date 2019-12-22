import React from "react";
import EditTextInput from "./EditTextInput";
import styled from "styled-components";
import moment from "moment";
import { loadState, saveState } from '../localStorage'

const Label = styled.div`
  display:flex;
  align-items: baseline;
  input{
    margin-right:10px;
  }
 
`


export default function CheckboxListSecondary({ CheckItems, checkItemDone, makeProgress, makeRegress }) {
  const [checked, setChecked] = React.useState(CheckItems);
  const [open, setOpen] = React.useState(false);
  let listOfCheckTask;
  if (!loadState("listOfCheckTask")) {
    listOfCheckTask = [
      { item: "Pościeliłem rano łóżko", done: "false", lastActivity:"2019-11-05T10:26:09.491Z", },
      { item: "Zrobiłem ćwiczenia", done: "false", lastActivity:"2019-11-05T10:26:09.491Z", },
      { item: "Nie piłem alkoholu", done: "false", lastActivity:"2019-11-05T10:26:09.491Z", },
      { item: "Nie jadłem słodyczy", done: "false", lastActivity:"2019-11-05T10:26:09.491Z", }
      
    ];
    saveState( "listOfCheckTask",  listOfCheckTask );
  } else {
    listOfCheckTask = loadState("listOfCheckTask");
 
  }
  const syncFunction = () => {
    saveState(  "listOfCheckTask", listOfCheckTask);
  };



  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = e => {
    setOpen(false);
    let ItemId = e.target.id.replace("InputNumber", "");
    listOfCheckTask[ItemId].item = e.target.value;
    syncFunction();
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (currentIndex === -1) {
      listOfCheckTask[value].done = "true";
      listOfCheckTask[value].lastActivity = moment() 
      makeProgress()
    } else {
      listOfCheckTask[value].done = "false";  
      makeRegress()

    }
    saveState( "listOfCheckTask",listOfCheckTask);
    let dayLogs = loadState("dayLogs");
   
    dayLogs[dayLogs.length-1].doneStatus = listOfCheckTask
    saveState( "dayLogs",dayLogs);
    setChecked(newChecked);
    checkItemDone()
  };


  return (
    <div>
      <span><p onClick={handleOpen}>edit</p></span>
      {listOfCheckTask.map((element, value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <div key={value} button >
            {open ? (
              <EditTextInput
                inputValue={element.item}
                saveChanges={handleClose}
                itemNumber={value}
              />
            ) : (
              <>              
                <div>
                  
                  <Label>
                    <input
                     onChange={handleToggle(value)}
                     checked={checked.indexOf(value) !== -1}
                     type="checkbox" 
                     name="unput"
                    />
                    <label><p>{element.item}</p></label>
                  </Label>
                
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
