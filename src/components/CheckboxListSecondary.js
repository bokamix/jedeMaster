import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import EditTextInput from "./EditTextInput";
import styled from "styled-components";
import moment from "moment";
import EditIcon from '@material-ui/icons/Edit';
import { loadState, saveState } from '../localStorage'
import { CircularProgressbar } from 'react-circular-progressbar';

const InputeSucces = styled.input`
  
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
    <List dense >
      <span><EditIcon onClick={handleOpen}/></span>
      {listOfCheckTask.map((element, value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem key={value} button >
            {open ? (
              <EditTextInput
                inputValue={element.item}
                saveChanges={handleClose}
                itemNumber={value}
              />
            ) : (
              <>              
                <ListItemText id={labelId} primary={`${element.item}`} />
                <ListItemSecondaryAction>
                  
                  <label class="container">
                    <input
                     onChange={handleToggle(value)}
                     checked={checked.indexOf(value) !== -1}
                     type="checkbox" 
                     name="unput"
                    />
                    <span class="checkmark"></span>
                  </label>
                
                </ListItemSecondaryAction>
              </>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
